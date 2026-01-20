'use client';

import React, { useMemo } from 'react';

interface MarkdownTextProps {
  content: string;
  className?: string;
}

/**
 * Lightweight markdown renderer for lesson explanations.
 * Supports: **bold**, *italic*, bullet lists (-), numbered lists (1.), paragraphs
 */
const MarkdownText: React.FC<MarkdownTextProps> = ({ content, className = '' }) => {
  const rendered = useMemo(() => {
    if (!content) return null;

    // Split content into paragraphs (double newline) and list sections
    const blocks = content.split(/\n\n+/);

    return blocks.map((block, blockIndex) => {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) return null;

      // Check if this block is a list
      const lines = trimmedBlock.split('\n');
      const isBulletList = lines.every(line => /^\s*[-•]\s/.test(line.trim()) || line.trim() === '');
      const isNumberedList = lines.every(line => /^\s*\d+\.\s/.test(line.trim()) || line.trim() === '');

      if (isBulletList) {
        const items = lines
          .filter(line => /^\s*[-•]\s/.test(line.trim()))
          .map(line => line.replace(/^\s*[-•]\s*/, '').trim());

        return (
          <ul key={blockIndex} className="list-disc list-inside my-2 space-y-1">
            {items.map((item, i) => (
              <li key={i}>{renderInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
      }

      if (isNumberedList) {
        const items = lines
          .filter(line => /^\s*\d+\.\s/.test(line.trim()))
          .map(line => line.replace(/^\s*\d+\.\s*/, '').trim());

        return (
          <ol key={blockIndex} className="list-decimal list-inside my-2 space-y-1">
            {items.map((item, i) => (
              <li key={i}>{renderInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
      }

      // Check for mixed content (paragraph with inline list)
      // Handle lines that might have a list at the end
      const bulletStart = lines.findIndex(line => /^\s*[-•]\s/.test(line.trim()));
      const numberedStart = lines.findIndex(line => /^\s*\d+\.\s/.test(line.trim()));

      if (bulletStart > 0 || numberedStart > 0) {
        const listStart = bulletStart > 0 ? bulletStart : numberedStart;
        const isBullet = bulletStart > 0;

        const paragraphLines = lines.slice(0, listStart);
        const listLines = lines.slice(listStart);

        const listItems = listLines
          .filter(line => isBullet ? /^\s*[-•]\s/.test(line.trim()) : /^\s*\d+\.\s/.test(line.trim()))
          .map(line => isBullet
            ? line.replace(/^\s*[-•]\s*/, '').trim()
            : line.replace(/^\s*\d+\.\s*/, '').trim()
          );

        return (
          <div key={blockIndex}>
            <p className="mb-2">
              {paragraphLines.map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {renderInlineMarkdown(line)}
                </React.Fragment>
              ))}
            </p>
            {isBullet ? (
              <ul className="list-disc list-inside my-2 space-y-1">
                {listItems.map((item, i) => (
                  <li key={i}>{renderInlineMarkdown(item)}</li>
                ))}
              </ul>
            ) : (
              <ol className="list-decimal list-inside my-2 space-y-1">
                {listItems.map((item, i) => (
                  <li key={i}>{renderInlineMarkdown(item)}</li>
                ))}
              </ol>
            )}
          </div>
        );
      }

      // Regular paragraph - preserve single newlines as <br>
      return (
        <p key={blockIndex} className={blockIndex > 0 ? 'mt-3' : ''}>
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {renderInlineMarkdown(line)}
            </React.Fragment>
          ))}
        </p>
      );
    });
  }, [content]);

  return <div className={className}>{rendered}</div>;
};

/**
 * Parse inline markdown: **bold**, *italic*
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Look for **bold**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Look for *italic* (but not **)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

    // Find which comes first
    const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : -1;
    const italicIndex = italicMatch ? remaining.indexOf(italicMatch[0]) : -1;

    let firstMatch: { match: RegExpMatchArray; index: number; type: 'bold' | 'italic' } | null = null;

    if (boldIndex !== -1 && (italicIndex === -1 || boldIndex <= italicIndex)) {
      firstMatch = { match: boldMatch!, index: boldIndex, type: 'bold' };
    } else if (italicIndex !== -1) {
      firstMatch = { match: italicMatch!, index: italicIndex, type: 'italic' };
    }

    if (!firstMatch) {
      // No more matches, add remaining text
      if (remaining) {
        parts.push(remaining);
      }
      break;
    }

    // Add text before the match
    if (firstMatch.index > 0) {
      parts.push(remaining.slice(0, firstMatch.index));
    }

    // Add the formatted element
    if (firstMatch.type === 'bold') {
      parts.push(
        <strong key={keyIndex++} className="font-bold">
          {firstMatch.match[1]}
        </strong>
      );
    } else {
      parts.push(
        <em key={keyIndex++} className="italic">
          {firstMatch.match[1]}
        </em>
      );
    }

    // Continue with the rest
    remaining = remaining.slice(firstMatch.index + firstMatch.match[0].length);
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
}

export default MarkdownText;
