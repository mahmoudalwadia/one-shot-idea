import { Course } from './types';

export const fundamentalsCourse: Course = {
  id: 'fundamentals',
  title: 'Chess Fundamentals',
  description: 'Master the essential concepts every chess player must know',
  icon: '♟',
  color: '#22c55e',
  lessons: [
    // ==================== LESSON 1: HOW THE PIECES MOVE ====================
    {
      id: 'piece-movement',
      title: 'How the Pieces Move',
      description: 'Learn how each chess piece moves across the board',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      tags: ['basics', 'piece-movement', 'rules'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Welcome to Chess!',
          explanation: `Welcome to your chess journey! In this lesson, you'll learn how each piece moves.

**The chessboard:**
• 64 squares arranged in an 8×8 grid
• Alternating light and dark squares
• **Files** (columns): labeled a-h from left to right
• **Ranks** (rows): numbered 1-8 from White's side

**The pieces:**
Each side starts with 16 pieces:
• 1 King (♔/♚) - the most important piece
• 1 Queen (♕/♛) - the most powerful piece
• 2 Rooks (♖/♜) - powerful straight-line movers
• 2 Bishops (♗/♝) - diagonal specialists
• 2 Knights (♘/♞) - the only pieces that can jump
• 8 Pawns (♙/♟) - the foot soldiers

Let's learn how each piece moves!`,
          highlights: [
            { square: 'e1', color: 'green' },
            { square: 'd1', color: 'blue' },
            { square: 'a1', color: 'yellow' },
            { square: 'h1', color: 'yellow' },
          ],
        },
        {
          id: 'pawn-movement',
          type: 'explanation',
          fen: '7k/8/8/8/8/8/4P3/K7 w - - 0 1',
          title: 'The Pawn',
          explanation: `Pawns are the most numerous pieces - you start with 8 of them!

**Basic movement:**
• Pawns move **forward only** - they can never move backward
• They move **one square** at a time
• On their **first move**, they can choose to move **two squares**

**Capturing:**
• Pawns capture **diagonally** - one square forward-left or forward-right
• They cannot capture pieces directly in front of them

**Special rules:**
• If a pawn reaches the opposite end of the board, it **promotes** to any piece (usually a Queen!)
• There's also a special capture called "en passant" (we'll cover this later)

The highlighted pawn can move to e3 (one square) or e4 (two squares on first move).`,
          highlights: [
            { square: 'e2', color: 'green' },
          ],
          arrows: [
            { from: 'e2', to: 'e3', color: 'green' },
            { from: 'e2', to: 'e4', color: 'blue' },
          ],
        },
        {
          id: 'pawn-capture',
          type: 'interactive',
          fen: '7k/8/8/3p4/4P3/8/8/K7 w - - 0 1',
          title: 'Pawn Capture Practice',
          explanation: `Your White pawn on e4 can capture the Black pawn on d5.

Remember: Pawns capture **diagonally forward**, not straight ahead!

**Capture the Black pawn!**`,
          correctMoves: ['exd5'],
          successMessage: 'Excellent! You captured diagonally. Pawns are the only pieces that capture differently than they move.',
          failureMessage: 'Remember: Pawns capture diagonally, not straight ahead. Try capturing the pawn on d5!',
          arrows: [
            { from: 'e4', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'knight-movement',
          type: 'explanation',
          fen: '7k/8/8/8/4N3/8/8/K7 w - - 0 1',
          title: 'The Knight',
          explanation: `The Knight is the trickiest piece to learn - but also the most fun!

**The "L-shape" movement:**
• Two squares in one direction, then one square perpendicular
• Or: one square, then two squares perpendicular
• Think of it as moving in an "L" shape

**Special ability: JUMPING!**
• Knights are the **only** pieces that can jump over other pieces
• They can hop over both friendly and enemy pieces
• The pieces jumped over are not affected

**Capturing:**
• Knights capture on the square they land on
• If an enemy piece is there, it's captured

From the center, a Knight can reach up to **8 squares**. From a corner, only 2!

**Remember:** "A Knight on the rim is dim" - Knights are best near the center.`,
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'd6', color: 'blue' },
            { square: 'f6', color: 'blue' },
            { square: 'g5', color: 'blue' },
            { square: 'g3', color: 'blue' },
            { square: 'f2', color: 'blue' },
            { square: 'd2', color: 'blue' },
            { square: 'c3', color: 'blue' },
            { square: 'c5', color: 'blue' },
          ],
          arrows: [
            { from: 'e4', to: 'd6', color: 'blue' },
            { from: 'e4', to: 'f6', color: 'blue' },
            { from: 'e4', to: 'g5', color: 'blue' },
            { from: 'e4', to: 'g3', color: 'blue' },
          ],
        },
        {
          id: 'knight-practice',
          type: 'interactive',
          fen: '7k/8/3p4/8/4N3/8/8/K7 w - - 0 1',
          title: 'Knight Capture Practice',
          explanation: `Your Knight on e4 can capture the Black pawn on d6.

Remember the L-shape: two squares up, one square left (or any other L-pattern).

**Capture the pawn with your Knight!**`,
          correctMoves: ['Nxd6'],
          successMessage: 'Perfect! The Knight jumped to d6 in its L-shaped pattern and captured the pawn.',
          failureMessage: 'Try moving your Knight in an L-shape to capture the pawn on d6.',
          highlights: [
            { square: 'd6', color: 'red' },
          ],
        },
        {
          id: 'bishop-movement',
          type: 'explanation',
          fen: '7k/8/8/8/4B3/8/8/K7 w - - 0 1',
          title: 'The Bishop',
          explanation: `Bishops are the diagonal specialists of chess.

**Movement:**
• Bishops move **diagonally** any number of squares
• They cannot jump over pieces
• They cannot change the color of square they're on!

**The "color complex":**
• A Bishop that starts on a light square stays on light squares forever
• A Bishop that starts on a dark square stays on dark squares forever
• This is why having both Bishops (the "Bishop pair") is valuable

**Capturing:**
• Bishops capture by landing on an enemy piece's square

**Range:**
From the center, a Bishop can reach up to **13 squares**.
From a corner, only **7 squares**.

The arrows show the Bishop's range from e4.`,
          highlights: [
            { square: 'e4', color: 'green' },
          ],
          arrows: [
            { from: 'e4', to: 'h7', color: 'blue' },
            { from: 'e4', to: 'a8', color: 'blue' },
            { from: 'e4', to: 'h1', color: 'blue' },
            { from: 'e4', to: 'b1', color: 'blue' },
          ],
        },
        {
          id: 'rook-movement',
          type: 'explanation',
          fen: '7k/8/8/8/4R3/8/8/K7 w - - 0 1',
          title: 'The Rook',
          explanation: `Rooks are powerful pieces that control straight lines.

**Movement:**
• Rooks move **horizontally** (along ranks) or **vertically** (along files)
• They can move any number of squares in a straight line
• They cannot jump over pieces

**Capturing:**
• Rooks capture by landing on an enemy piece's square

**Power:**
• From any square, a Rook can reach **14 squares**
• Rooks are most powerful on **open files** (columns with no pawns)
• Two Rooks working together are extremely dangerous

**Special move:**
Rooks are also involved in **castling** - a special King move we'll learn later.

The arrows show how the Rook controls both the rank and file.`,
          highlights: [
            { square: 'e4', color: 'green' },
          ],
          arrows: [
            { from: 'e4', to: 'e8', color: 'blue' },
            { from: 'e4', to: 'e1', color: 'blue' },
            { from: 'e4', to: 'a4', color: 'blue' },
            { from: 'e4', to: 'h4', color: 'blue' },
          ],
        },
        {
          id: 'queen-movement',
          type: 'explanation',
          fen: '7k/8/8/8/4Q3/8/8/K7 w - - 0 1',
          title: 'The Queen',
          explanation: `The Queen is the most powerful piece on the board!

**Movement:**
• The Queen combines the powers of the Rook AND the Bishop
• She moves in **straight lines** (like a Rook): horizontally and vertically
• She also moves **diagonally** (like a Bishop)
• She can move any number of squares in these directions
• She cannot jump over pieces

**Power:**
• From the center, the Queen can reach up to **27 squares**!
• This makes her extremely dangerous for attacks
• But also valuable to protect - losing your Queen is usually devastating

**Warning:**
• Don't bring your Queen out too early in the game
• She can be chased around by less valuable pieces
• Develop your other pieces first!

The Queen truly is the "powerhouse" of the chess army.`,
          highlights: [
            { square: 'e4', color: 'green' },
          ],
          arrows: [
            { from: 'e4', to: 'e8', color: 'blue' },
            { from: 'e4', to: 'h4', color: 'blue' },
            { from: 'e4', to: 'h7', color: 'yellow' },
            { from: 'e4', to: 'a8', color: 'yellow' },
          ],
        },
        {
          id: 'king-movement',
          type: 'explanation',
          fen: '7k/8/8/8/4K3/8/8/8 w - - 0 1',
          title: 'The King',
          explanation: `The King is the most important piece - if it's checkmated, you lose!

**Movement:**
• The King moves **one square** in any direction
• Horizontally, vertically, or diagonally
• Just one square at a time

**Restrictions:**
• The King can **never** move to a square where it would be in check
• The King can **never** move next to the enemy King

**Capturing:**
• The King can capture enemy pieces on adjacent squares
• But only if doing so doesn't put it in check!

**Special move:**
• The King has a special move called **castling** (with a Rook)
• We'll learn this important move in a later lesson

**Remember:** The King is not just a piece to protect - in the endgame, the King becomes a powerful attacker!`,
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'd5', color: 'blue' },
            { square: 'e5', color: 'blue' },
            { square: 'f5', color: 'blue' },
            { square: 'd4', color: 'blue' },
            { square: 'f4', color: 'blue' },
            { square: 'd3', color: 'blue' },
            { square: 'e3', color: 'blue' },
            { square: 'f3', color: 'blue' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Piece Movement Summary',
          explanation: `**Congratulations!** You now know how all the pieces move.

**Quick reference:**

| Piece | Movement | Special |
|-------|----------|---------|
| ♟ Pawn | Forward 1 (2 on first move), captures diagonally | Promotes at end |
| ♞ Knight | L-shape (2+1 squares) | Can jump! |
| ♝ Bishop | Diagonal, any distance | Stuck on one color |
| ♜ Rook | Straight lines (horizontal/vertical) | Used in castling |
| ♛ Queen | Combines Rook + Bishop | Most powerful |
| ♚ King | One square any direction | Can castle |

**Key principles:**
• Only the Knight can jump over other pieces
• The King must never move into check
• Pawns are the only pieces that capture differently than they move

**Next up:** Learn about check, checkmate, and stalemate - the core concepts of winning chess!`,
        },
      ],
    },
    // ==================== LESSON 2: CHECK, CHECKMATE & STALEMATE ====================
    {
      id: 'check-and-mate',
      title: 'Check, Checkmate & Stalemate',
      description: 'Understand the core concepts of winning and drawing',
      difficulty: 'beginner',
      estimatedMinutes: 8,
      tags: ['basics', 'check', 'checkmate', 'stalemate'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'The Goal of Chess',
          explanation: `The goal of chess is simple: **trap the enemy King so it cannot escape capture.**

This is called **checkmate** - and it wins the game instantly!

**Key terms:**
• **Check**: When a King is under attack
• **Checkmate**: When a King is under attack AND cannot escape
• **Stalemate**: When a player has no legal moves but is NOT in check (draw!)

Understanding these concepts is essential. Let's explore each one!

**The King's importance:**
• The King can never actually be captured
• If your King is attacked, you MUST get out of check
• If you can't get out of check, it's checkmate and you lose`,
        },
        {
          id: 'what-is-check',
          type: 'explanation',
          fen: 'rnb1kbnr/pppp1ppp/8/4p3/4P2q/5P2/PPPP2PP/RNBQKBNR w KQkq - 1 3',
          title: 'What is Check?',
          explanation: `**Check** means the King is under attack by an enemy piece.

In this position (after 1. e4 e5 2. f3?? Qh4+), the Black Queen on h4 is attacking the White King on e1. This is check!

**When you're in check, you MUST respond.** You have only three options:

**1. Move the King** to a safe square

**2. Block the check** with another piece

**3. Capture the attacking piece**

If you can do any of these, you escape check. If you can't do any of them, it's checkmate!

**Important rules:**
• You cannot ignore check - it's illegal!
• You cannot castle while in check
• You cannot move into check`,
          highlights: [
            { square: 'e1', color: 'red' },
            { square: 'h4', color: 'yellow' },
          ],
          arrows: [
            { from: 'h4', to: 'e1', color: 'red' },
          ],
        },
        {
          id: 'escape-check',
          type: 'interactive',
          fen: 'rnb1kbnr/pppp1ppp/8/4p3/4P2q/5P2/PPPP2PP/RNBQKBNR w KQkq - 1 3',
          title: 'Escape from Check!',
          explanation: `The White King is in check from the Queen on h4!

This position can happen after 1. e4 e5 2. f3?? Qh4+ - a classic blunder!

Find a way to escape the check. Remember your three options:
1. Move the King
2. Block the check
3. Capture the attacker

**Get out of check!**`,
          correctMoves: ['Ke2', 'g3'],
          successMessage: 'Great escape! You got out of check by moving the King or blocking with g3.',
          failureMessage: 'You must escape check! Try moving the King to safety or blocking with a pawn.',
          wrongMoveHints: {
            'Qe2': 'The Queen blocks, but then Qxe2 is checkmate! Find another way.',
          },
        },
        {
          id: 'what-is-checkmate',
          type: 'explanation',
          fen: 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 4',
          title: 'What is Checkmate?',
          explanation: `**Checkmate** is when the King is in check AND there's no way to escape!

Look at this position carefully:
• The White King on e1 is in check from the Queen on h4
• The King cannot move - all squares are attacked or blocked
• No piece can block the check
• No piece can capture the Queen

**This is checkmate! Black wins.**

This specific pattern is called **"Scholar's Mate"** - one of the quickest checkmates possible.

**Checkmate ends the game immediately:**
• The King is never actually captured
• The game stops as soon as checkmate occurs
• The player who delivers checkmate wins`,
          highlights: [
            { square: 'e1', color: 'red' },
            { square: 'h4', color: 'green' },
            { square: 'e2', color: 'red' },
            { square: 'f2', color: 'red' },
            { square: 'f1', color: 'red' },
          ],
          arrows: [
            { from: 'h4', to: 'e1', color: 'red' },
          ],
        },
        {
          id: 'find-checkmate',
          type: 'interactive',
          fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
          title: 'Deliver Checkmate!',
          explanation: `Now it's your turn to deliver checkmate!

White to play. The Black King is trapped on the back rank by its own pawns.

**Find the move that checkmates the Black King!**

Hint: Use your Rook to attack the King on a square it cannot escape from.`,
          correctMoves: ['Re8#'],
          successMessage: 'Checkmate! The King cannot escape - blocked by its own pawns. This is the famous "back rank mate"!',
          failureMessage: 'Look for a Rook move that gives check where the King has no escape.',
          arrows: [
            { from: 'e1', to: 'e8', color: 'green' },
          ],
        },
        {
          id: 'what-is-stalemate',
          type: 'explanation',
          fen: '7k/8/5KQ1/8/8/8/8/8 b - - 0 1',
          title: 'What is Stalemate?',
          explanation: `**Stalemate** is when a player has NO legal moves but is NOT in check.

**Result: The game is a DRAW!**

Look at this position - it's Black's turn:
• The Black King is NOT in check (Queen on g6 doesn't attack h8)
• But every square around it is attacked: g8, g7 by Queen; h7 by Queen
• Black has no legal moves!

This is **stalemate** - a draw, even though White has a huge advantage!

**Stalemate is different from checkmate:**
• Checkmate: King IS in check, no escape → attacker WINS
• Stalemate: King is NOT in check, no moves → DRAW

**Why this matters:**
• If you're winning, avoid stalemating your opponent
• If you're losing, try to reach stalemate to save the game!`,
          highlights: [
            { square: 'h8', color: 'yellow' },
            { square: 'g8', color: 'red' },
            { square: 'h7', color: 'red' },
            { square: 'g7', color: 'red' },
          ],
          arrows: [
            { from: 'g6', to: 'g8', color: 'red' },
            { from: 'g6', to: 'h7', color: 'red' },
          ],
        },
        {
          id: 'stalemate-vs-checkmate',
          type: 'interactive',
          fen: 'k7/8/K7/8/8/8/8/6Q1 w - - 0 1',
          title: 'Checkmate or Stalemate?',
          explanation: `White wants to checkmate Black, not stalemate!

The Black King is trapped in the corner by the White King. Choose your Queen move carefully:
• One move gives checkmate (win!)
• Another move gives stalemate (draw!)

**Find the move that delivers CHECKMATE, not stalemate!**

Hint: Qb1 would block the b8 escape square but NOT give check - that's stalemate!`,
          correctMoves: ['Qg8#', 'Qg8', 'Qa7#', 'Qa7'],
          wrongMoveHints: {
            'Qb1': 'Stalemate! The King is NOT in check but has no legal moves. The game is a draw!',
            'Qa1+': 'Check! But the King can escape to b8. Try another move.',
            'Qa1': 'Check! But the King can escape to b8. Try another move.',
          },
          successMessage: 'Checkmate! Both Qg8 and Qa7 deliver checkmate - the King is in check and has no escape squares (a7 and b7 blocked by your King, b8 blocked by your Queen).',
          failureMessage: 'Make sure your move puts the King in CHECK while also cutting off all escape squares.',
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Check, Checkmate & Stalemate Summary',
          explanation: `**Key concepts:**

| Situation | King in Check? | Has Legal Moves? | Result |
|-----------|----------------|------------------|--------|
| Check | Yes | Yes | Game continues |
| Checkmate | Yes | No | Attacker WINS |
| Stalemate | No | No | DRAW |

**Escaping check (3 options):**
1. **Move** the King to safety
2. **Block** the check with another piece
3. **Capture** the attacking piece

**Remember:**
• Check = King under attack (must respond!)
• Checkmate = Check with no escape (game over, you lose!)
• Stalemate = No moves but not in check (draw!)

**Pro tip:** When you have a winning position, always check that your move doesn't accidentally stalemate your opponent!

Now you understand the fundamental goal of chess: deliver checkmate while avoiding stalemate!`,
        },
      ],
    },
    // ==================== LESSON 3: PIECE VALUES (existing) ====================
    {
      id: 'piece-values',
      title: 'Piece Values',
      description: 'Understanding the relative worth of each piece',
      difficulty: 'beginner',
      estimatedMinutes: 8,
      tags: ['basics', 'piece-values'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'The Value of Pieces',
          explanation: `Understanding piece values is **fundamental** to making good decisions in chess. Every piece has a relative point value that helps you evaluate trades and positions.

The standard piece values, developed over centuries of chess play, are:
• **Pawn** = 1 point (the basic unit of measurement)
• **Knight** = 3 points (tricky piece with unique movement)
• **Bishop** = 3 points (long-range diagonal control)
• **Rook** = 5 points (powerful on open files)
• **Queen** = 9 points (combines Rook + Bishop powers)
• **King** = Infinite (the game ends if checkmated!)

**Why do these values matter?** They help you answer crucial questions like:
- Should I trade my Bishop for their Knight?
- Is sacrificing a Rook for an attack worth it?
- Am I ahead or behind in material?

**Key insight**: These values are guidelines, not absolute rules! A well-placed Knight can dominate a passive Rook. Always consider the position.`,
          highlights: [
            { square: 'd1', color: 'green' },
            { square: 'a1', color: 'blue' },
            { square: 'c1', color: 'yellow' },
            { square: 'b1', color: 'yellow' },
            { square: 'e2', color: 'red' },
          ],
        },
        {
          id: 'queen-value',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'The Mighty Queen',
          explanation: `The Queen is worth **9 points** - by far the most powerful piece on the board!

She combines the powers of both the Rook (horizontal and vertical movement) and the Bishop (diagonal movement), making her incredibly versatile.

**Queen facts:**
• Can move any number of squares in 8 directions
• Can control up to 27 squares from the center
• Worth almost as much as two Rooks (10 points)
• More valuable than three minor pieces (9 points)

**Critical warning**: Losing your Queen early without compensation usually means losing the game. Many beginners lose their Queen by:
- Moving her out too early and getting attacked
- Forgetting about threats to her
- Trading her for a Rook (losing 4 points!)

**Remember**: Protect your Queen like the treasure she is!`,
          highlights: [
            { square: 'd1', color: 'green' },
            { square: 'd8', color: 'green' },
          ],
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
            { from: 'd1', to: 'h5', color: 'green' },
            { from: 'd1', to: 'a4', color: 'green' },
          ],
        },
        {
          id: 'rooks-value',
          type: 'explanation',
          fen: 'r5kr/8/8/8/8/8/8/R4K1R w - - 0 1',
          title: 'The Power of Rooks',
          explanation: `Rooks are worth **5 points** each - the second most valuable pieces after the Queen.

**Rook characteristics:**
• Move any number of squares horizontally or vertically
• Extremely powerful on open files (no pawns blocking)
• Two Rooks working together can deliver checkmate easily
• Rooks are strongest in the endgame when the board opens up

**Important concepts:**
• **Open file**: A file with no pawns - Rooks love these!
• **Connected Rooks**: When your Rooks defend each other on the same rank
• **Doubled Rooks**: Two Rooks on the same file = massive power

**Common mistake**: Leaving Rooks passive in the corners. Always look to activate your Rooks on open files or the 7th rank (where they attack pawns from behind).`,
          highlights: [
            { square: 'a1', color: 'blue' },
            { square: 'h1', color: 'blue' },
            { square: 'a8', color: 'blue' },
            { square: 'h8', color: 'blue' },
          ],
          arrows: [
            { from: 'a1', to: 'a8', color: 'blue' },
            { from: 'h1', to: 'a1', color: 'blue' },
          ],
        },
        {
          id: 'minor-pieces',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Minor Pieces: Knights & Bishops',
          explanation: `Knights and Bishops are called **"minor pieces"** and are each worth about **3 points**.

**Knights** (3 points):
• Jump in an "L" shape - the only piece that can jump over others
• Excel in **closed positions** with many pawns blocking
• Strong when placed on "outpost" squares (protected by pawns)
• Can reach any square on the board regardless of color

**Bishops** (3 points):
• Move diagonally any number of squares
• Excel in **open positions** with clear diagonals
• Each Bishop is limited to one color forever
• The **"bishop pair"** (both Bishops) gives ~0.5 point bonus

**Knight vs Bishop debate:**
• Closed positions → Knights better
• Open positions → Bishops better
• Bishop pair → Usually worth more than Knight pair

**Pro tip**: Don't trade your Bishops for Knights without reason!`,
          highlights: [
            { square: 'b1', color: 'yellow' },
            { square: 'g1', color: 'yellow' },
            { square: 'c1', color: 'blue' },
            { square: 'f1', color: 'blue' },
          ],
          arrows: [
            { from: 'g1', to: 'f3', color: 'yellow' },
            { from: 'c1', to: 'h6', color: 'blue' },
          ],
        },
        {
          id: 'pawns-value',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'The Humble Pawn',
          explanation: `Pawns are worth only **1 point** each, but never underestimate them!

**Why pawns matter more than their points:**
• **Promotion**: A pawn reaching the other side becomes a Queen (or any piece)!
• **Structure**: Pawns define the position and control key squares
• **Passed pawns**: A pawn with no enemy pawns blocking it is very dangerous
• **Endgames**: A single extra pawn often wins the game

**Pawn weaknesses to avoid:**
• **Doubled pawns**: Two pawns on the same file (hard to advance)
• **Isolated pawns**: A pawn with no friendly pawns on adjacent files
• **Backward pawns**: A pawn that cannot be protected by other pawns

**Key insight**: Winning "just a pawn" is often enough to win the game! Grand masters rarely let pawns go without compensation.`,
          highlights: [
            { square: 'e2', color: 'green' },
            { square: 'd2', color: 'green' },
            { square: 'c2', color: 'yellow' },
            { square: 'f2', color: 'yellow' },
          ],
          arrows: [
            { from: 'e2', to: 'e4', color: 'green' },
            { from: 'e4', to: 'e8', color: 'blue' },
          ],
        },
        {
          id: 'trade-example',
          type: 'demonstration',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
          title: 'Good Trade vs Bad Trade',
          explanation: `Let's look at potential trades in this position.

**Bad trade for Black**: ...exd4, Nxd4 - Black trades a center pawn for White's d-pawn, but White gets a powerful Knight on d4.

**Equal trade**: If Black plays ...Nxe4, White takes Nxe4, that's Knight for Knight (3=3). Perfectly fair.

**Good trade for Black**: If Black could win the Bishop on c4 for a Knight, that would be equal material but might damage White's structure.

**Positional factors to consider:**
• Is the piece I'm capturing well-placed or passive?
• What will recapture? Will their position improve?
• Will my position be better or worse after?`,
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'f6', color: 'green' },
            { square: 'd4', color: 'blue' },
          ],
          arrows: [
            { from: 'e5', to: 'd4', color: 'red' },
            { from: 'f6', to: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'trade-quiz',
          type: 'interactive',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Make the Right Trade Decision',
          explanation: `White can capture the knight on f6 with the bishop (Bxf6). Black would recapture with the g-pawn.

**Analyze the trade:**
• White gives: Bishop (3 points)
• White gets: Knight (3 points)
• Material: Equal!

But is it a good idea? What should White do instead?

**Think about:**
• Is White's Bishop well-placed on c4?
• What happens to Black's kingside after ...gxf6?
• Are there better developing moves?

Find the best move for White!`,
          correctMoves: ['O-O', 'd3', 'Nc3', 'd4'],
          failureMessage: 'Trading bishop for knight is equal material, but keeps your pieces undeveloped. Look for a move that improves your position!',
          successMessage: 'Excellent! Development and castling are more important than making equal trades in the opening.',
          arrows: [
            { from: 'c4', to: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Piece Values Summary',
          explanation: `**Key takeaways from this lesson:**

**Standard values:**
• Queen = 9 • Rook = 5 • Bishop = 3 • Knight = 3 • Pawn = 1

**When to trade:**
✓ When you win material (take more than you give)
✓ When it improves your position significantly
✓ When exchanging relieves pressure on your position

**When NOT to trade:**
✗ Just because you can
✗ When your piece is more active
✗ When it helps your opponent's development

**Remember**: Piece values are guidelines! A Knight on a strong outpost might be worth more than a passive Rook. Always evaluate the specific position.

**Practice**: In your games, before every trade ask: "Will I be better off after this exchange?"`,
        },
      ],
    },
    {
      id: 'castling',
      title: 'Castling',
      description: 'Learn when and how to castle for King safety',
      difficulty: 'beginner',
      estimatedMinutes: 8,
      tags: ['opening', 'king-safety', 'castling'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r3kbnr/pppqpppp/2n5/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 1',
          title: 'Why Castling is Essential',
          explanation: `Castling is the only move in chess where you move **two pieces at once** - the King and a Rook!

**Two huge benefits:**
1. **King Safety**: Tucks your King behind a wall of pawns
2. **Rook Activation**: Brings your Rook toward the center

**How castling works:**
• **Kingside (O-O)**: King goes g1/g8, Rook goes f1/f8
• **Queenside (O-O-O)**: King goes c1/c8, Rook goes d1/d8

**Castling is written:**
• O-O = Kingside castling (short)
• O-O-O = Queenside castling (long)

**Historical note:** Castling was invented around 500 years ago to speed up the game and protect the King. Before that, Kings were much more vulnerable!`,
          arrows: [
            { from: 'e1', to: 'g1', color: 'green' },
            { from: 'h1', to: 'f1', color: 'green' },
          ],
          highlights: [
            { square: 'e1', color: 'yellow' },
            { square: 'h1', color: 'yellow' },
          ],
        },
        {
          id: 'kingside-vs-queenside',
          type: 'explanation',
          fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
          title: 'Kingside vs Queenside Castling',
          explanation: `You can castle to either side. Each has advantages!

**Kingside Castling (O-O)** - Most common:
• Faster to set up (only 2 pieces to move: Knight + Bishop)
• King ends up behind 3 pawns
• Safer in most positions

**Queenside Castling (O-O-O)** - More aggressive:
• Takes longer (3 pieces to move: Queen, Bishop, Knight)
• Rook lands on more central d-file
• King might be slightly more exposed
• Often signals an attacking game!

**Opposite castling** (you castle kingside, opponent castles queenside):
• Creates very sharp, attacking games
• Both sides race to attack the enemy King
• Pawn storms become powerful weapons

**Choose based on:** Where is your King safest? Where will your Rook be most useful?`,
          arrows: [
            { from: 'e1', to: 'g1', color: 'green' },
            { from: 'e1', to: 'c1', color: 'blue' },
          ],
        },
        {
          id: 'castle-kingside',
          type: 'interactive',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
          title: 'Time to Castle',
          explanation: `White has developed the Knight and Bishop, clearing the path to castle.

The King is still in the center - dangerous! Any tactics on the e-file could be deadly.

**Look at the position:**
• The f1-square is empty (Bishop moved to c4)
• The g1-square is empty (Knight moved to f3)
• The path is clear!

**What should White do?** Get the King to safety!`,
          correctMoves: ['O-O'],
          successMessage: 'Perfect! Your King is now safely tucked away, and your Rook is activated on f1!',
          highlights: [
            { square: 'e1', color: 'red' },
            { square: 'g1', color: 'green' },
          ],
        },
        {
          id: 'castle-queenside',
          type: 'interactive',
          fen: 'r3kbnr/pppqpppp/2n5/3p4/3P1B2/2N2N2/PPP1PPPP/R3KB1R w KQkq - 0 1',
          title: 'Queenside Castling (O-O-O)',
          explanation: `Sometimes queenside castling is the better choice! In this position, White has developed pieces and the queenside is clear.

**Queenside castling (O-O-O) is different:**
• King moves TWO squares toward the a-file Rook (e1 → c1)
• Rook jumps to d1 - immediately centralizing it!
• The Rook becomes active right away

**When to castle queenside:**
• When kingside is under attack
• When you want an aggressive game
• When your Rook will be useful on the d-file

**In this position:**
• The b1, c1, d1 squares are empty
• Neither the King's path nor landing square is attacked
• Queenside castling activates the Rook on the d-file!

**Castle queenside now!**`,
          correctMoves: ['O-O-O'],
          successMessage: `Excellent! O-O-O! Your King is safe on c1, and the Rook on d1 is immediately active on the open d-file. Queenside castling often leads to more aggressive games - your Rook is ready to support the d-pawn or join an attack!`,
          failureMessage: 'Remember: O-O-O means queenside castling. Move the King two squares toward the a-file Rook!',
          highlights: [
            { square: 'e1', color: 'red' },
            { square: 'c1', color: 'green' },
            { square: 'd1', color: 'blue' },
          ],
          arrows: [
            { from: 'e1', to: 'c1', color: 'green' },
            { from: 'a1', to: 'd1', color: 'blue' },
          ],
        },
        {
          id: 'castling-rules',
          type: 'explanation',
          fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
          title: 'Castling Requirements',
          explanation: `You **CANNOT** castle if:

**Permanent restrictions:**
• Your King has already moved (even if it moved back)
• The Rook you want to castle with has moved

**Temporary restrictions:**
• You are currently in check (castle OUT of check)
• Your King would pass through an attacked square
• Your King would land on an attacked square

**Important clarifications:**
• The Rook CAN pass through an attacked square
• You CAN castle if the Rook is attacked
• You CAN castle after being in check (if King didn't move)

**Notation:**
• O-O means kingside castling
• O-O-O means queenside castling
• Different from zeros (0-0)!`,
          highlights: [
            { square: 'e1', color: 'yellow' },
            { square: 'f1', color: 'blue' },
            { square: 'g1', color: 'green' },
          ],
        },
        {
          id: 'cant-castle',
          type: 'demonstration',
          fen: 'r3k2r/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1qPP/RNBQK2R w KQkq - 0 1',
          title: 'When You Cannot Castle',
          explanation: `In this position, **White cannot castle!**

**Why not?**
• Black's Queen on f2 attacks the f1 square
• The King would have to pass through f1 to castle
• This is illegal!

**White's options:**
• Defend the threat first (Rf1, Qe2)
• Block the check if one comes
• Wait until the Queen moves

**Key lesson:** Before planning to castle, check:
1. Is my King in check?
2. Is any square between King and Rook attacked?
3. Is my castling square (g1/c1) attacked?

If any answer is "yes", you cannot castle yet!`,
          highlights: [
            { square: 'f2', color: 'red' },
            { square: 'f1', color: 'red' },
            { square: 'e1', color: 'yellow' },
          ],
          arrows: [
            { from: 'f2', to: 'f1', color: 'red' },
          ],
        },
        {
          id: 'castle-into-attack',
          type: 'explanation',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          title: 'Castle - But Where?',
          explanation: `You CAN castle doesn't mean you SHOULD!

**Ask yourself:**
• Where is my King safer - kingside or queenside?
• Where are my opponent's pieces aiming?
• Will castling put my King in front of an attack?

**Warning signs NOT to castle kingside:**
• Opponent has pieces aimed at g7/h7 (or g2/h2)
• The h-file is open or opening
• Opponent has a strong Bishop on the diagonal

**Warning signs NOT to castle queenside:**
• Opponent has pieces aimed at the a-file or c-file
• The a and b pawns are weak
• Your Queen isn't ready to leave the queenside

**Sometimes waiting is best!** If both sides look dangerous, develop more pieces first and keep options open.`,
          arrows: [
            { from: 'c5', to: 'f2', color: 'yellow' },
          ],
        },
        {
          id: 'castle-quiz',
          type: 'interactive',
          fen: 'r3k2r/ppp2ppp/2n5/3q4/3P4/4BN2/PP3PPP/R2QK2R w KQkq - 0 1',
          title: 'Should You Castle?',
          explanation: `White wants to castle, but should check first...

**Analyze:**
• Is the King in check? (Look for enemy pieces attacking e1)
• Is f1 attacked? (King passes through)
• Is g1 attacked? (King lands here)

If castling is legal and safe, do it!
If not, find an alternative move.`,
          correctMoves: ['O-O', 'Qe2', 'Qd2'],
          successMessage: 'Correct! Castling is legal here, or you could prepare it with a Queen move.',
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 1',
          title: 'Castling Summary',
          explanation: `**Castling Checklist:**

**Before you castle, verify:**
✓ King hasn't moved
✓ Rook hasn't moved
✓ Not currently in check
✓ King doesn't pass through check
✓ King doesn't land in check

**Strategic considerations:**
✓ Castle toward safety, not toward attack
✓ Castle early (usually by move 10)
✓ Castle where pawns protect the King
✓ Don't castle into an open file attack

**Rules of thumb:**
• Kingside castling = safer, faster
• Queenside castling = fighting, Rook on d-file
• Opposite castling = sharp attacking chess

**Priority:** Castle before launching attacks. A safe King lets you play aggressively!`,
        },
      ],
    },
    // ==================== LESSON 5: SPECIAL PAWN MOVES ====================
    {
      id: 'special-pawn-moves',
      title: 'Special Pawn Moves',
      description: 'Master pawn promotion and the mysterious en passant capture',
      difficulty: 'beginner',
      estimatedMinutes: 6,
      tags: ['basics', 'pawns', 'promotion', 'en-passant'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '7k/4P3/8/8/8/8/8/K7 w - - 0 1',
          title: 'Pawns Have Superpowers!',
          explanation: `Pawns may seem like the weakest pieces, but they have two special abilities no other piece has!

**1. Promotion:**
When a pawn reaches the opposite end of the board, it transforms into a more powerful piece!

**2. En Passant:**
A special capture that can only happen under very specific conditions - many beginners don't even know it exists!

Both of these rules can completely change a game. Understanding them is essential for every chess player.

**Fun fact:** The word "pawn" comes from the Latin "pedo" meaning foot soldier. Just like real soldiers, pawns can be promoted for their bravery!`,
          highlights: [
            { square: 'e7', color: 'green' },
          ],
          arrows: [
            { from: 'e7', to: 'e8', color: 'green' },
          ],
        },
        {
          id: 'promotion-explained',
          type: 'explanation',
          fen: '8/4P3/8/8/8/8/8/4K2k w - - 0 1',
          title: 'Pawn Promotion',
          explanation: `When a pawn reaches the last rank (8th for White, 1st for Black), it **MUST** promote to another piece.

**You can promote to:**
• **Queen** (♕) - Almost always the best choice
• **Rook** (♖) - Rarely chosen
• **Bishop** (♗) - Rarely chosen
• **Knight** (♘) - Sometimes useful for special tactics!

**Important rules:**
• Promotion happens immediately when the pawn reaches the last rank
• You MUST promote - you can't leave it as a pawn
• You can have multiple Queens! (Up to 9 total)
• The promoted piece acts immediately

**When NOT to choose Queen:**
• Sometimes promoting to Knight gives checkmate when Queen doesn't (called "underpromotion")
• Occasionally Rook prevents stalemate when Queen would cause it`,
          highlights: [
            { square: 'e7', color: 'green' },
            { square: 'e8', color: 'blue' },
          ],
          arrows: [
            { from: 'e7', to: 'e8', color: 'green' },
          ],
        },
        {
          id: 'promotion-practice',
          type: 'interactive',
          fen: '8/4P3/8/8/8/8/8/4K2k w - - 0 1',
          title: 'Promote Your Pawn!',
          explanation: `Your pawn on e7 is one step away from promotion!

**Your task:** Push the pawn to e8 and promote it to a Queen.

When you move the pawn to e8, it will automatically become a Queen (the most powerful piece on the board).

**Make the move!**`,
          correctMoves: ['e8=Q', 'e8=Q+'],
          successMessage: 'Excellent! Your pawn has transformed into a mighty Queen! This is how games are often won - getting a pawn to the end.',
          failureMessage: 'Move the pawn from e7 to e8 to promote it. The pawn will become a Queen!',
          arrows: [
            { from: 'e7', to: 'e8', color: 'green' },
          ],
        },
        {
          id: 'en-passant-rule',
          type: 'explanation',
          fen: '7k/8/8/3Pp3/8/8/8/K7 w - e6 0 1',
          title: 'En Passant: The Special Capture',
          explanation: `**En passant** (French for "in passing") is the most unusual rule in chess!

**When it applies:**
1. Your pawn must be on the 5th rank (for White) or 4th rank (for Black)
2. An enemy pawn moves **two squares** from its starting position
3. It lands directly beside your pawn
4. You capture it as if it only moved one square!

**In this position:**
• White's pawn is on d5
• Black just played e7-e5 (moving two squares)
• White CAN capture "en passant" with dxe6

**Critical rule:** You must capture en passant on the **very next move** or lose the right forever!

**Why does this rule exist?**
Before the two-square first move was added, pawns could always be intercepted. En passant preserves this original interaction.`,
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'e5', color: 'yellow' },
            { square: 'e6', color: 'blue' },
          ],
          arrows: [
            { from: 'd5', to: 'e6', color: 'green' },
          ],
        },
        {
          id: 'en-passant-practice',
          type: 'interactive',
          fen: '8/8/8/3Pp3/8/8/8/4K2k w - e6 0 1',
          title: 'Capture En Passant!',
          explanation: `Black just played their pawn from e7 to e5, landing beside your d5 pawn.

**This is your only chance to capture en passant!**

Your pawn on d5 can capture the e5 pawn by moving diagonally to e6 - as if the Black pawn had only moved one square.

Remember: If you don't capture now, you lose this opportunity forever!

**Capture en passant!**`,
          correctMoves: ['dxe6'],
          successMessage: 'Perfect! You executed the en passant capture. The Black pawn is removed from e5, and your pawn lands on e6. This rare move can surprise opponents!',
          failureMessage: 'Capture en passant by moving your d5 pawn diagonally to e6, taking the Black pawn that just moved to e5.',
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
          arrows: [
            { from: 'd5', to: 'e6', color: 'green' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Special Pawn Moves Summary',
          explanation: `**Pawn Promotion:**
• Pawn reaches the last rank → must become Q, R, B, or N
• Queen is almost always the best choice
• Look for Knight promotions that give check!

**En Passant:**
• Only when enemy pawn moves two squares
• Must land directly beside your pawn
• Capture must happen immediately (next move only!)
• Your pawn moves diagonally, enemy pawn is removed

**Strategic tips:**
• Push passed pawns toward promotion
• Watch for en passant opportunities - they're rare but important!
• Sometimes threatening promotion is as good as promoting
• Underpromotion (choosing Knight) can create surprise checkmates

**Remember:** These rules are official and used at all levels of chess. Don't let anyone tell you en passant is "cheating" - it's been part of chess for 500 years!`,
        },
      ],
    },
    {
      id: 'development',
      title: 'Piece Development',
      description: 'Get your pieces into the game quickly and effectively',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      tags: ['opening', 'development'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'The Three Goals of the Opening',
          explanation: `The opening phase of chess has **three main goals**:

**1. Control the Center**
The central squares (e4, d4, e5, d5) are the most important. Pieces placed in the center control more squares and can move to either side of the board quickly.

**2. Develop Your Pieces**
Get your Knights and Bishops off the back rank! Undeveloped pieces are useless. Each move should bring a new piece into play.

**3. King Safety (Castle)**
Get your King to safety by castling early. An exposed King in the center is a target.

**The opening formula:**
1. Move one or two center pawns
2. Develop Knights toward the center
3. Develop Bishops
4. Castle
5. Connect your Rooks

Do NOT chase pawns or bring your Queen out early!`,
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'd4', color: 'green' },
            { square: 'e5', color: 'green' },
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'center-control',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
          title: 'Why the Center Matters',
          explanation: `After 1.e4, White already controls key central squares.

**The e4 pawn controls:**
• d5 (prevents Black from easily playing ...d5)
• f5 (limits Black's options)

**Why center control is so important:**
• Central pieces reach more squares
• It's easier to attack on either side
• You can respond to threats faster
• Central pawns restrict opponent's pieces

**Piece activity comparison:**
• A Knight on d4 controls 8 squares
• A Knight on a1 controls only 2 squares!
• A Bishop in the center can attack in all diagonal directions

**Classic principle:** "A Knight on the rim is dim" - keep pieces toward the center!`,
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'd5', color: 'blue' },
            { square: 'f5', color: 'blue' },
          ],
          arrows: [
            { from: 'e4', to: 'd5', color: 'green' },
            { from: 'e4', to: 'f5', color: 'green' },
          ],
        },
        {
          id: 'first-moves',
          type: 'interactive',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Opening Move',
          explanation: `Let's start a game! What's a good first move for White?

**Think about:**
• Which moves control central squares?
• Which moves help develop pieces?
• Which moves open lines for Bishops?

**Best first moves:**
• e4 - "Best by test" (Bobby Fischer)
• d4 - Equally good, different style
• Nf3 - Solid, flexible development
• c4 - English Opening, controls d5

Find a good opening move!`,
          correctMoves: ['e4', 'd4', 'Nf3', 'c4'],
          failureMessage: 'Look for a move that controls central squares or develops a piece toward the center.',
          successMessage: 'Excellent! This is a strong opening move that fights for the center.',
        },
        {
          id: 'knights-before-bishops',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
          title: 'Knights Before Bishops',
          explanation: `**"Knights before Bishops"** is a classic opening principle.

**Why develop Knights first?**
• Knights have fewer good squares - it's clearer where they belong
• Knights on f3/c3 (or f6/c6) are almost always well-placed
• Bishops can wait to see where they'll be most useful

**Best Knight squares:**
• Nf3/Nc3 for White (f6/c6 for Black)
• Control center, prepare castling
• Don't block your own pawns

**Why wait with Bishops?**
• Bishops need open diagonals - pawn structure is still forming
• You might want to fianchetto (g3 + Bg2) depending on the position
• Early Bishop moves can be targets for pawn attacks

**Exception:** If there's a specific reason (like an Italian Game Bc4), Bishops can come out first.`,
          arrows: [
            { from: 'g1', to: 'f3', color: 'green' },
            { from: 'b1', to: 'c3', color: 'green' },
          ],
          highlights: [
            { square: 'f3', color: 'green' },
            { square: 'c3', color: 'green' },
          ],
        },
        {
          id: 'develop-knight',
          type: 'interactive',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
          title: 'Develop a Piece',
          explanation: `After 1.e4 e5, it's White's turn.

**What should White do?**
• Develop a piece toward the center
• Don't move the e-pawn again
• Don't bring the Queen out yet

Find the best developing move!`,
          correctMoves: ['Nf3', 'Nc3', 'Bc4', 'd4'],
          failureMessage: 'Try developing a piece! Knights to f3 or c3 are excellent. Bc4 is also popular.',
          successMessage: 'Great development! You\'re getting your pieces active and controlling the center.',
          arrows: [
            { from: 'g1', to: 'f3', color: 'green' },
          ],
        },
        {
          id: 'dont-move-twice',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: "Don't Move Pieces Twice",
          explanation: `**"Don't move the same piece twice in the opening"** is a crucial rule!

Every time you move the same piece again, your opponent can develop another piece. You fall behind in development!

**Look at this position:**
White has developed Nf3 and Bc4 - good!
But now White should NOT play Ng5 or Bb5 (moving them again).

**Instead, White should:**
• Develop new pieces: Nc3, d3
• Castle: O-O (also develops the Rook!)
• Support the center: d3 or c3

**When CAN you move a piece twice?**
• To avoid losing it (if attacked)
• To deliver checkmate
• To win material
• When all pieces are developed

**Penalty for moving twice:** You lose "tempo" - your opponent gets ahead in development.`,
          highlights: [
            { square: 'f3', color: 'green' },
            { square: 'c4', color: 'green' },
            { square: 'b1', color: 'yellow' },
            { square: 'c1', color: 'yellow' },
          ],
          arrows: [
            { from: 'b1', to: 'c3', color: 'green' },
            { from: 'e1', to: 'g1', color: 'green' },
          ],
        },
        {
          id: 'complete-development',
          type: 'interactive',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
          title: 'Complete Your Development',
          explanation: `White has made good progress: Nf3, Bc4, and d3.

But look at the undeveloped pieces:
• Knight on b1 - still sleeping
• Bishop on c1 - hasn't moved
• King hasn't castled

**What should White do now?**

Choose the move that best continues development!`,
          correctMoves: ['O-O', 'Nc3', 'Bg5', 'Be3'],
          failureMessage: 'Look at your undeveloped pieces! Castle or develop the Knight/Bishop.',
          successMessage: 'Perfect! Castling or developing a new piece is exactly right.',
          arrows: [
            { from: 'e1', to: 'g1', color: 'green' },
            { from: 'b1', to: 'c3', color: 'yellow' },
          ],
        },
        {
          id: 'early-queen',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'Why Not the Queen?',
          explanation: `Beginners love to bring the Queen out early. **Don't do it!**

**Problems with early Queen moves:**
• The Queen gets attacked by minor pieces
• You waste moves running away
• Your other pieces stay undeveloped
• You might lose the Queen!

**Example:** After 1.e4 e5 2.Qh5?!
• Black plays 2...Nc6 (develops AND defends)
• Then 2...Nf6 attacks the Queen
• White must move the Queen AGAIN

**When the Queen SHOULD come out:**
• To deliver checkmate (Scholar's Mate defense)
• When it can't be attacked
• After most pieces are developed
• In specific opening theory

**Remember:** Knights and Bishops come first!`,
          arrows: [
            { from: 'd1', to: 'h5', color: 'red' },
          ],
          highlights: [
            { square: 'd1', color: 'yellow' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Development Summary',
          explanation: `**Opening Checklist:**

✓ **Move 1-2 center pawns** (e4/d4)
✓ **Develop Knights first** (Nf3, Nc3)
✓ **Develop Bishops** (to active diagonals)
✓ **Castle early** (usually kingside)
✓ **Connect your Rooks** (Queen moves to link them)

**Don'ts:**
✗ Don't move the same piece twice
✗ Don't bring the Queen out early
✗ Don't make random pawn moves
✗ Don't chase pawns instead of developing

**Count your developed pieces:**
In a good position by move 10, you should have:
• Both Knights developed
• Both Bishops developed
• Castled (King safe, Rook active)

**Rule of thumb:** If you've developed 5 pieces and opponent has 2, you're winning the opening!`,
        },
      ],
    },
    {
      id: 'captures',
      title: 'Capturing Pieces',
      description: 'When to capture and when to maintain tension',
      difficulty: 'beginner',
      estimatedMinutes: 8,
      tags: ['basics', 'exchanges'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq d3 0 1',
          title: 'The Art of Exchanges',
          explanation: `Just because you CAN capture doesn't mean you SHOULD!

**Before every capture, ask:**
1. **Will I win material?** (Take more than I give)
2. **Will I improve my position?** (My pieces become more active)
3. **What will the recapture do?** (Does it help my opponent?)

**Types of exchanges:**

**Winning exchange:** You capture something worth more than what you lose (e.g., winning a Rook for a Knight)

**Equal exchange:** Fair trade in material (e.g., Knight for Knight)

**Losing exchange:** You lose more than you gain - avoid these!

**Positional exchange:** Equal material, but one side improves their position

**Important concept:** Sometimes NOT capturing (maintaining tension) gives you more options!`,
          arrows: [{ from: 'e5', to: 'd4', color: 'yellow' }],
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'e5', color: 'yellow' },
          ],
        },
        {
          id: 'maintaining-tension',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 4',
          title: 'Maintaining Tension',
          explanation: `**Tension** = when pieces attack each other but neither side captures yet.

**Why maintain tension?**
• Keeps more options open
• Forces opponent to worry about the tension
• You can decide WHEN to capture (timing advantage)
• The threat is often stronger than the execution!

**In this position (1.e4 e5 2.Nf3 Nc6 3.d4):**

If Black plays ...exd4 immediately:
• White recaptures Nxd4
• The tension is gone
• White has a well-placed Knight on d4

If Black waits (plays ...Bb4+ or ...d6 first):
• The tension remains
• Black keeps the option to take OR not take
• White must keep an eye on d4

**Principle:** Capture when it's good for you, not just because you can!`,
          arrows: [
            { from: 'e5', to: 'd4', color: 'yellow' },
            { from: 'f3', to: 'd4', color: 'blue' },
          ],
        },
        {
          id: 'good-capture',
          type: 'interactive',
          fen: 'r1bqkb1r/pppp1ppp/2n5/4n3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          title: 'Win Free Material',
          explanation: `Look at Black's Knight on e5 - it's **undefended**!

No Black piece protects it. White can capture it for FREE.

**Counting attackers and defenders:**
• Attackers on e5: White Knight on f3 (1)
• Defenders on e5: None! (0)

This is a **free piece** - take it!

Find the winning capture.`,
          correctMoves: ['Nxe5'],
          successMessage: 'Excellent! You won a Knight for nothing! Always look for undefended pieces.',
          arrows: [
            { from: 'f3', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'counting-captures',
          type: 'explanation',
          fen: 'r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
          title: 'Counting Attackers and Defenders',
          explanation: `Before capturing, always **count**!

**The Golden Rule:**
• Count attackers on the square
• Count defenders of the square
• Only capture if you come out ahead!

**Example analysis - can White play Bxf7+?**

Attackers on f7: Bishop on c4 (1)
Defenders of f7: King on e8 (1)

Result: White gives Bishop (3), takes Pawn (1)
**Net loss of 2 points!** Bad trade.

**Another example - can White play Nxe5?**

Attackers on e5: Knight (1)
Defenders on e5: d6 pawn, f6 Knight (2)

If Nxe5, dxe5 - White loses a Knight for a pawn.
**Bad trade!** The pawn on d6 protects e5.

**Always count before you capture!**`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
            { from: 'f3', to: 'e5', color: 'red' },
          ],
          highlights: [
            { square: 'e5', color: 'yellow' },
            { square: 'd6', color: 'blue' },
          ],
        },
        {
          id: 'recapture-center',
          type: 'explanation',
          fen: 'r1bqkb1r/ppp2ppp/2n2n2/3pp3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
          title: 'Recapture Toward the Center',
          explanation: `When you have a choice of recaptures, generally **recapture toward the center**!

**In this position, after exd5:**

If Black plays **...Nxd5** (recapturing toward center):
• Knight is beautifully centralized on d5
• Controls important squares
• Ready for action!

If Black plays **...exd5** (pawn recapture):
• Pawn controls c4 and e4 - good!
• But opens the e-file (might be dangerous)
• Knight stays on f6

**General principle:**
• Pieces toward center = more activity
• Pawns toward center = more space

**Exception:** Sometimes recapture away from center to:
• Keep pawn structure intact
• Avoid doubled pawns
• Open a file for your Rook`,
          arrows: [
            { from: 'c6', to: 'd5', color: 'green' },
            { from: 'e5', to: 'd5', color: 'yellow' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'capture-order',
          type: 'explanation',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/1bB5/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
          title: 'The Order of Captures',
          explanation: `When multiple pieces can capture on the same square, **order matters**!

**Rule: Capture with the least valuable piece first!**

**Why?**
• If they recapture, you lose less
• Keeps your stronger pieces on the board
• Gives you flexibility

**Example - can Black win the Knight on e5?**

If Black plays **Bxe5?** (Bishop captures):
• White plays Qxb4 - winning the Bishop on b4!
• Black got Knight (3), but lost Bishop (3)

If Black plays **Nxe5!** (Knight captures):
• Knight takes Knight = equal trade
• Bishop on b4 is still safe!

**The sequence matters!**
• Don't grab material if it loses you something else
• Check what your opponent can capture back`,
          arrows: [
            { from: 'f6', to: 'e5', color: 'green' },
            { from: 'b4', to: 'e5', color: 'red' },
          ],
          highlights: [
            { square: 'e5', color: 'yellow' },
            { square: 'b4', color: 'blue' },
          ],
        },
        {
          id: 'capture-quiz',
          type: 'interactive',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
          title: 'Should You Capture?',
          explanation: `Black to move. The d4 pawn is attacked by the e5 pawn.

**Analyze the capture ...exd4:**
• What does Black gain?
• What can White recapture with?
• Will Black's position improve or worsen?

**Alternative:** What if Black doesn't capture?

Decide: Capture now, or maintain tension with a developing move?`,
          correctMoves: ['exd4', 'd6'],
          successMessage: 'Good choice! Both capturing and developing are reasonable here. The key is that you analyzed before deciding!',
          arrows: [
            { from: 'e5', to: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Capturing Summary',
          explanation: `**Before EVERY capture, ask:**

1. **Material count**: Will I gain or lose points?
2. **Attackers vs Defenders**: Count them!
3. **Recapture**: What happens after they take back?
4. **Position**: Will my pieces be better or worse?

**Capture principles:**
✓ Win free pieces (undefended!)
✓ Trade down when ahead in material
✓ Capture with least valuable piece first
✓ Recapture toward the center when possible

**When NOT to capture:**
✗ When it's an equal trade that helps them
✗ When you have a better developing move
✗ When maintaining tension gives more options
✗ When it opens a file they can use

**Remember:** "To take is a mistake" if you haven't analyzed it first!`,
        },
      ],
    },
    {
      id: 'basic-tactics',
      title: 'Basic Tactics',
      description: 'Learn the fundamental patterns that win pieces: forks, pins, skewers',
      difficulty: 'beginner',
      estimatedMinutes: 12,
      tags: ['tactics', 'forks', 'pins', 'skewers'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
          title: 'Tactics Win Games!',
          explanation: `Chess games are rarely won by slow maneuvering alone - they're won through **tactics**!

**What is a tactic?**
A tactic is a short sequence of moves that gains an advantage, usually by winning material or delivering checkmate.

**The main tactical patterns:**
• **Fork**: Attacking two pieces at once
• **Pin**: A piece can't move without exposing something more valuable
• **Skewer**: Like a pin in reverse
• **Discovered Attack**: Moving one piece reveals an attack by another

**Why tactics matter:**
• They win pieces (material advantage)
• They create checkmate threats
• They punish opponent's mistakes
• They make chess exciting!

**The good news:** These patterns repeat over and over. Learn them once, spot them forever!`,
        },
        {
          id: 'fork-concept',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
          title: 'The Fork: Double Attack',
          explanation: `A **fork** attacks two (or more!) pieces at the same time. Your opponent can only save one!

**Why forks are so powerful:**
• You attack two things, opponent can save one
• You win material (at least one piece)
• Every piece can deliver forks!

**Common fork situations:**
• Knight forks King and Queen (devastating!)
• Pawn forks two pieces
• Queen attacks King and Rook
• Bishop forks Rook and Knight

**In this position:**
The Queen on h5 is forking two targets:
• The f7 pawn (weak square)
• The e5 pawn

This is the famous "Scholar's Mate" setup. Black must be careful!

**Key insight:** Always look for squares where your pieces can attack multiple targets.`,
          highlights: [
            { square: 'h5', color: 'green' },
            { square: 'f7', color: 'red' },
            { square: 'e5', color: 'yellow' },
          ],
          arrows: [
            { from: 'h5', to: 'f7', color: 'red' },
            { from: 'h5', to: 'e5', color: 'yellow' },
          ],
        },
        {
          id: 'knight-fork',
          type: 'interactive',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 0 5',
          title: 'Find the Knight Fork!',
          explanation: `Black has a powerful tactical opportunity here!

Look at the White King on g1 and the White Queen on d1. Is there a square where the Knight could attack BOTH at once?

**Hint:** Knights move in an "L" shape. Look for a square that's an L-shape away from both the King and Queen.

**Find the fork and play it!**`,
          correctMoves: ['Ng4'],
          successMessage: 'Excellent! Ng4 threatens both Nxf2 (forking King and Queen) and puts pressure on the position. The Knight eyes the f2 square for a royal fork!',
          failureMessage: 'Look for a Knight move that threatens to fork the King and Queen. Check squares like g4 or e4 that could lead to a fork on f2.',
          highlights: [
            { square: 'g1', color: 'red' },
            { square: 'd1', color: 'red' },
          ],
        },
        {
          id: 'other-forks',
          type: 'demonstration',
          fen: '4k3/8/8/8/3P4/2K5/8/8 w - - 0 1',
          title: 'Even Pawns Can Fork!',
          explanation: `Every piece can deliver forks - even the humble pawn!

**Pawn forks:**
• Move forward to attack two pieces diagonally
• Often wins a full piece for a pawn
• Watch for central pawn advances that fork

**Bishop forks:**
• Long diagonals let bishops attack distant pieces
• Corner-to-corner forks are especially strong

**Rook forks:**
• Attack pieces on the same rank or file
• X-ray attacks through less valuable pieces

**Queen forks:**
• The Queen is the ultimate forking piece
• Can attack in all directions
• Often forks King + loose pieces

**Remember:** Look for undefended pieces. The more targets, the better chance for a fork!`,
        },
        {
          id: 'pin-concept',
          type: 'explanation',
          fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'The Pin: Stuck in Place',
          explanation: `A **pin** is when a piece is "stuck" because moving it would expose a more valuable piece behind it.

**Types of pins:**

**Absolute Pin:**
• The piece behind is the KING
• The pinned piece CANNOT legally move
• Example: Bishop pins Knight to King

**Relative Pin:**
• The piece behind is valuable (Queen, Rook)
• The pinned piece CAN move, but probably shouldn't
• Moving loses the piece behind it

**Who can pin?**
• Only Bishops, Rooks, and Queens (line pieces)
• Knights and pawns cannot create pins

**How to exploit pins:**
1. Attack the pinned piece with pawns or minor pieces
2. Pile up attackers on the pinned piece
3. The pinned piece can't escape!

**In this position:** The Black Bishop on c5 is eyeing f2, but there's no pin yet. However, if White's Knight were on d4, it could be pinned to the King!`,
          highlights: [
            { square: 'c5', color: 'yellow' },
            { square: 'f2', color: 'yellow' },
          ],
        },
        {
          id: 'pin-practice',
          type: 'interactive',
          fen: 'r2qkb1r/ppp2ppp/2n1bn2/4p3/3PP3/1B3N2/PPP2PPP/RNBQ1RK1 w kq - 0 6',
          title: 'Create a Winning Pin!',
          explanation: `White has a Bishop on b3 aiming at the Black King on e8.

Look at the diagonal b3-f7-e8. The Knight on f6 could be pinned if you attack along this line!

But there's something even better: Can you create an absolute pin that wins material?

**Hint:** Look for a move that attacks a piece that cannot move without exposing the King.

**Find the pin!**`,
          correctMoves: ['Bxe6'],
          successMessage: 'Brilliant! Bxe6 captures the Bishop and creates a pin on the f7 pawn against the King. Black cannot recapture with fxe6 easily as it opens the King. If ...fxe6, the e6 pawn is pinned and weak!',
          failureMessage: 'Look at the b3-g8 diagonal. The Bishop can capture a piece that will create pressure along the diagonal toward the King.',
          highlights: [
            { square: 'b3', color: 'green' },
            { square: 'e6', color: 'red' },
            { square: 'e8', color: 'yellow' },
          ],
          arrows: [
            { from: 'b3', to: 'e6', color: 'green' },
          ],
        },
        {
          id: 'skewer-concept',
          type: 'explanation',
          fen: '4k3/8/8/8/4r3/8/4K3/4R3 w - - 0 1',
          title: 'The Skewer: Reverse Pin',
          explanation: `A **skewer** is like a pin in reverse - the more valuable piece is in FRONT!

**How it works:**
• Attack a valuable piece (King or Queen)
• That piece MUST move
• Then you capture the piece behind it

**Key difference from pins:**
• Pin: Less valuable piece in front, stuck in place
• Skewer: More valuable piece in front, forced to move

**Common skewers:**
• Rook skewers King and Queen on same rank/file
• Bishop skewers King and Rook on diagonal
• Queen skewers two major pieces

**In this position:**
If it were Black's turn and they played ...Re2+, the White King would be in check. After the King moves, Black captures the Rook on e1!

That's a skewer - the King had to move, exposing the Rook.

**Tip:** Look for enemy pieces lined up on the same rank, file, or diagonal!`,
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'e2', color: 'yellow' },
            { square: 'e1', color: 'red' },
          ],
          arrows: [
            { from: 'e4', to: 'e2', color: 'yellow' },
            { from: 'e4', to: 'e1', color: 'red' },
          ],
        },
        {
          id: 'discovered-attack',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Discovered Attack: The Hidden Threat',
          explanation: `A **discovered attack** happens when you move one piece and reveal an attack from a piece behind it!

**How it works:**
1. One piece blocks another piece's line of attack
2. The blocking piece moves away (often with a threat!)
3. The piece behind now attacks something

**Discovered Check:**
• The revealed attack is a check
• Extremely powerful - the moved piece can do anything!
• Even capture a Queen - the King must deal with check first

**Double Check:**
• BOTH the moving piece AND revealed piece give check
• The King MUST move - can't block or capture two pieces!
• Often leads to checkmate

**In this setup:**
Imagine if White's Knight moved from f3, it could reveal an attack from the Queen or a piece behind it.

**Key insight:** When your pieces are lined up with enemy targets, look for discovered attacks!`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'yellow' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'tactics-puzzle',
          type: 'puzzle',
          fen: 'r1bqr1k1/ppp2ppp/2nb1n2/3p4/3P1B2/2NBPN2/PPP2PPP/R2QK2R w KQ - 0 9',
          title: 'Tactics Puzzle: Combine Your Knowledge!',
          explanation: `White to play. Look for a tactic that wins material!

**Think about:**
• Are any Black pieces undefended?
• Can you create a fork, pin, or skewer?
• Is there a discovered attack possibility?

**Take your time and find the best move!**`,
          correctMoves: ['Bxh7+'],
          successMessage: 'Excellent! Bxh7+ is a classic Greek Gift sacrifice! After ...Kxh7, White has Ng5+ (fork/discovered attack on the Queen diagonal). Black must deal with check, and White wins material with the attack.',
          failureMessage: 'Look at the Black King\'s position. Is there a sacrifice that exposes the King and creates multiple threats? Consider Bxh7+!',
          solutionLine: ['Bxh7+', 'Kxh7', 'Ng5+', 'Kg8', 'Qh5'],
          highlights: [
            { square: 'd3', color: 'green' },
            { square: 'h7', color: 'red' },
          ],
          arrows: [
            { from: 'd3', to: 'h7', color: 'green' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Basic Tactics Summary',
          explanation: `**The Core Tactical Patterns:**

**Fork (Double Attack):**
• Attack two pieces at once
• Opponent can only save one
• Knights are famous for forking

**Pin:**
• Piece stuck - moving exposes something valuable
• Absolute pin: Can't move (King behind)
• Relative pin: Shouldn't move (Queen/Rook behind)

**Skewer:**
• Reverse pin - valuable piece in front
• Force it to move, capture piece behind

**Discovered Attack:**
• Move one piece, reveal attack from another
• Discovered check is very powerful
• Double check often leads to mate

**How to improve:**
• Solve tactics puzzles daily
• Look for loose (undefended) pieces
• Check every capture and check
• Ask: "If I move this piece, what does it reveal?"

**Remember:** Tactics flow from good positions. Develop your pieces, control the center, then the tactics will come!`,
        },
      ],
    },
    {
      id: 'avoiding-blunders',
      title: 'Avoiding Blunders',
      description: 'Simple checks to prevent costly mistakes',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      tags: ['basics', 'tactics'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'The Blunder Check',
          explanation: `A **blunder** is a terrible move that loses material or the game. Even strong players blunder when they rush!

**The "CCCT" Blunder Check:**
Before EVERY move, ask yourself:

**C - Checks**: Does my opponent have any checks?
**C - Captures**: Can my opponent capture any of my pieces?
**C - Controlling**: Am I leaving any piece undefended?
**T - Threats**: What is my opponent threatening?

**Taking just 5-10 seconds** for this check prevents 90% of blunders!

**Why do we blunder?**
• Moving too fast
• Not looking at opponent's threats
• Tunnel vision on our own plans
• Fatigue or distraction

**The cure:** Build a habit of checking CCCT every single move.`,
          highlights: [
            { square: 'e4', color: 'yellow' },
            { square: 'c4', color: 'yellow' },
          ],
        },
        {
          id: 'check-first',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 5 4',
          title: 'Always Look for Checks',
          explanation: `**Checks are the most forcing moves!** When your King is in check, you MUST respond - no other move is legal.

**In this position:**
White just played Qh5 (a common beginner trap). What is White threatening?

**The threat:** Qxf7# is CHECKMATE!
• The Queen attacks f7
• f7 is only defended by the King
• If Queen takes, it's checkmate!

**This is the "Scholar's Mate"** - countless beginners have lost to it!

**How to spot it:**
Always ask: "Can my opponent give check next move? And if so, is it dangerous?"

Here Black must defend f7: ...Qe7, ...g6, or ...Nf6-h5 blocks the Queen.`,
          arrows: [
            { from: 'h5', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'h5', color: 'yellow' },
          ],
        },
        {
          id: 'find-defense',
          type: 'interactive',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 5 4',
          title: 'Spot the Threat and Defend',
          explanation: `White has played Qh5, threatening Qxf7#!

You need to find a move that defends against this deadly threat.

**Think:**
• Which moves block the Queen's attack?
• Which moves defend f7?
• Which moves counter-attack the Queen?

Find a move that saves you from checkmate!`,
          correctMoves: ['g6', 'Qe7'],
          wrongMoveHints: {
            'Bc5': 'This doesn\'t stop Qxf7# - the f7 pawn is still hanging!',
            'Nxe4': 'Winning a pawn, but Qxf7# is checkmate! Always look for checks first.',
            'd6': 'This doesn\'t defend f7. After Qxf7+ you lose your Rook!',
            'Be7': 'Close, but Qxf7# is still checkmate!',
          },
          failureMessage: 'Look for the threat to f7! Qxf7 is checkmate. You must defend it!',
          successMessage: 'Great defense! You spotted Scholar\'s Mate threat and stopped it.',
        },
        {
          id: 'look-captures',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n5/4n3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
          title: 'Look for Captures',
          explanation: `**After checks, look at captures!**

In this position, Black has just played Ne5?? (Knight to e5).

**The blunder check reveals:**
• Is the Knight on e5 defended? NO!
• Can White capture it? YES - Nxe5!

**Result:** White wins a free Knight (3 points)!

**Why did Black blunder?**
• Probably focused on attacking the c4 Bishop
• Forgot to check if the Knight was protected
• Didn't ask "What can my opponent capture?"

**The lesson:** Before EVERY move, verify that all your pieces are defended!`,
          arrows: [
            { from: 'f3', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'undefended-pieces',
          type: 'interactive',
          fen: 'r2qkb1r/ppp2ppp/2n1bn2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
          title: 'Find the Weakness',
          explanation: `Look at Black's position carefully.

**Your blunder check:**
• Are all of Black's pieces defended?
• Can you win any material?

Scan the board for undefended pieces and find a winning move!`,
          correctMoves: ['Bxe6'],
          failureMessage: 'Look for an undefended piece! Scan each of Black\'s pieces and check if it\'s protected.',
          successMessage: 'Sharp eyes! The Bishop on e6 was undefended, and you won it for free!',
          highlights: [
            { square: 'e6', color: 'red' },
          ],
        },
        {
          id: 'hanging-pieces',
          type: 'explanation',
          fen: 'r1bqkbnr/pppppppp/2n5/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3',
          title: 'Counting Defenders',
          explanation: `A **"hanging" piece** is one that's undefended or inadequately defended.

**How to count:**
1. Count how many pieces **attack** the square
2. Count how many pieces **defend** the square
3. If attackers > defenders, you can win material!

**Example - the d4 pawn:**
• Attackers: Black Knight on c6 (1)
• Defenders: White pawn on e3... wait, there is none! e-pawn is on e4.

Defenders: Queen on d1 (sort of), nothing else!
If Black plays ...Nxd4, White must use the Queen to recapture.

**Always count!** Attackers vs Defenders = tells you if something is safe.`,
          arrows: [
            { from: 'c6', to: 'd4', color: 'yellow' },
          ],
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'c6', color: 'blue' },
          ],
        },
        {
          id: 'forcing-moves',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
          title: 'Checks and Captures First',
          explanation: `When analyzing a position, always consider **forcing moves** first:

**Order of priority:**
1. **Checks** (opponent MUST respond)
2. **Captures** (usually forces recapture)
3. **Threats** (opponent should respond)

**In this position:**
White has played Qxf7#! This is checkmate because:
• Black's King is in check
• No piece can block
• The King cannot escape

**What went wrong for Black?**
Black played a move without checking what White could capture.
They missed that f7 was only defended by the King!

**The lesson:** Before your move, ask:
"After my move, what checks and captures does my opponent have?"`,
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'e8', color: 'red' },
          ],
        },
        {
          id: 'blunder-quiz',
          type: 'puzzle',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
          title: 'Blunder Check Practice',
          explanation: `Apply your blunder check skills!

Before making a move, analyze:
**C** - Any checks for you or opponent?
**C** - Any captures available?
**C** - Are all pieces defended?
**T** - What are the threats?

Find the best move for White!`,
          correctMoves: ['O-O', 'Nc3', 'Bg5', 'h3', 'a3'],
          successMessage: 'Good job applying the blunder check! You found a safe, useful move.',
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Blunder Prevention Summary',
          explanation: `**The CCCT Blunder Check - Do This EVERY Move!**

**C - Checks**
• Can opponent give check?
• Can I give check?

**C - Captures**
• Can opponent capture anything?
• Can I capture anything?

**C - Controlling**
• Is every piece defended?
• Am I leaving anything hanging?

**T - Threats**
• What is opponent threatening?
• What can I threaten?

**Building the habit:**
• Start with slow games (10+ minutes)
• Force yourself to do CCCT every move
• Eventually it becomes automatic!

**Remember:**
• Checks are most forcing - look at them first!
• Count attackers vs defenders
• The threat is often stronger than the execution
• 5 seconds of checking prevents 90% of blunders!

**Practice makes perfect!**`,
        },
      ],
    },
    // ==================== LESSON 10: BACK RANK MATE ====================
    {
      id: 'checkmate-patterns-1',
      title: 'Back Rank Mate',
      description: 'The most common checkmate pattern in chess',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      tags: ['checkmate', 'tactics', 'back-rank'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1',
          title: 'Understanding Back Rank Weakness',
          explanation: `The **back rank mate** is the most common checkmate pattern in chess, especially among beginners and intermediate players!

**What is it?** A checkmate delivered by a Rook or Queen along the opponent's first rank (8th rank for Black, 1st rank for White) when the King is trapped by its own pieces.

**Why does it happen?**
• Players often castle and leave pawns on f7-g7-h7 (or f2-g2-h2)
• These pawns provide protection but also trap the King
• If the back rank isn't defended, a Rook or Queen can give checkmate

**Look at the diagram:**
Notice how Black's King on g8 is completely boxed in by its own pawns on f7, g7, and h7. If White's Rook reaches a8, it's checkmate!

This pattern appears in **thousands** of games at every level. Even grandmasters have fallen for it!`,
          highlights: [
            { square: 'g8', color: 'red' },
            { square: 'f7', color: 'yellow' },
            { square: 'g7', color: 'yellow' },
            { square: 'h7', color: 'yellow' },
          ],
          arrows: [
            { from: 'a1', to: 'a8', color: 'green' },
          ],
        },
        {
          id: 'deliver-mate',
          type: 'interactive',
          fen: '6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1',
          title: 'Deliver the Checkmate',
          explanation: `Now it's your turn! The position is set up perfectly for a back rank mate.

**Your task:** Move the Rook to deliver checkmate.

**Think about it:**
• Where can the Rook go to attack the King?
• Can the King escape anywhere?
• Are there any pieces that can block?

Find the winning move!`,
          correctMoves: ['Ra8#'],
          successMessage: 'Checkmate! The King has nowhere to run - it\'s trapped by its own pawns. This is the classic back rank mate!',
          arrows: [{ from: 'a1', to: 'a8', color: 'green' }],
        },
        {
          id: 'luft-explanation',
          type: 'explanation',
          fen: '2r3k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',
          title: 'Creating Luft (Air for Your King)',
          explanation: `**"Luft"** is a German word meaning "air" - in chess, it means giving your King an escape square.

**How to create luft:**
• Push h3 (or h6 for Black) - gives the King h2 as an escape
• Push g3 (or g6) - gives the King g2 as an escape
• Move the f-pawn - but this can weaken your King position

**When should you create luft?**
• When your opponent has active Rooks or Queen
• When you've traded pieces and entered the endgame
• When you sense back rank danger
• Proactively before it becomes urgent!

**The cost of luft:**
• Uses one tempo (move)
• Slightly weakens the King position
• But prevents instant checkmate - worth it!

**Pro tip**: Many players create luft with h3/h6 as a "waiting move" when they have nothing better to do.`,
          arrows: [
            { from: 'h2', to: 'h3', color: 'green' },
            { from: 'g2', to: 'g3', color: 'yellow' },
          ],
          highlights: [
            { square: 'h3', color: 'green' },
          ],
        },
        {
          id: 'spot-threat',
          type: 'explanation',
          fen: '2r3k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',
          title: 'Spotting Back Rank Threats',
          explanation: `In this position, let's analyze the back rank situation.

**Black's threat:** Rc1+ would be checkmate! White's King has no escape because:
• f1 is blocked by the f2 pawn
• h1 is not accessible from g1
• The Rook on a1 is not defending c1

**Warning signs to watch for:**
• Enemy Rook or Queen eyeing your back rank
• Your Rook/Queen not defending the first rank
• No "luft" (escape square for your King)

**How to defend:**
1. Create luft (h3 or g3)
2. Move a defender to the back rank
3. Give a counter-threat (distraction)
4. Trade the attacking piece

Always scan for back rank threats before making your move!`,
          highlights: [
            { square: 'c8', color: 'red' },
            { square: 'c1', color: 'red' },
            { square: 'g1', color: 'yellow' },
          ],
          arrows: [
            { from: 'c8', to: 'c1', color: 'red' },
          ],
        },
        {
          id: 'find-defense',
          type: 'interactive',
          fen: '2r3k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',
          title: 'Defend Against the Threat',
          explanation: `Black threatens **Rc1+ checkmate!**

You need to find a move that saves you from this deadly threat.

**Consider your options:**
• Can you create an escape square?
• Can you defend c1?
• Can you give a counter-threat?

Find a move that prevents the back rank mate!`,
          correctMoves: ['h3', 'g3', 'Ra8+'],
          wrongMoveHints: {
            'Kf1': 'This allows Rc1# - the Rook still gives checkmate!',
            'Kh1': 'This still allows Rc1# - you need an escape square!',
            'Kh2': 'Your King can\'t move there - there\'s a pawn on h2!',
          },
          successMessage: 'Excellent defense! h3/g3 creates luft, while Ra8+ gives a counter-attack with check!',
        },
        {
          id: 'advanced-example',
          type: 'demonstration',
          fen: 'r4rk1/5ppp/8/8/8/8/1Q3PPP/R4RK1 w - - 0 1',
          title: 'Advanced Back Rank Themes',
          explanation: `This position shows a more complex back rank situation.

**Analysis:**
• Both players have potential back rank weaknesses
• White has Queen + 2 Rooks = massive firepower
• Black's Rooks defend each other on the 8th rank

**Key question:** If White plays Qb8, is it checkmate?

**No!** Black's Rooks defend each other. After Qb8+, Black plays Rxb8, and after Rxb8+, Rxb8.

**But what about Qb7?** This threatens:
• Qxf7+ (attacking f7)
• Qb8+ (back rank threat)

This is why back rank themes combine with other tactics!

**Lesson:** Back rank mates often work with other threats - forks, pins, or decoys that overload the defenders.`,
          highlights: [
            { square: 'a8', color: 'yellow' },
            { square: 'f8', color: 'yellow' },
            { square: 'b8', color: 'red' },
          ],
          arrows: [
            { from: 'b2', to: 'b8', color: 'red' },
            { from: 'a8', to: 'b8', color: 'green' },
          ],
        },
        {
          id: 'puzzle',
          type: 'puzzle',
          fen: 'r1b2rk1/ppp1qppp/8/4N3/1bB5/8/PPP2PPP/R1BQ1RK1 w - - 0 1',
          title: 'Back Rank Puzzle',
          explanation: `White to play and win using back rank themes!

**Hints:**
• Look at Black's back rank - is it weak?
• Can you deflect the Queen that defends it?
• What happens if the Queen leaves the e-file?

Find the winning move!`,
          correctMoves: ['Qd8+'],
          wrongMoveHints: {
            'Re8': 'Close, but Black can play Qxe8 defending!',
          },
          successMessage: 'Brilliant! After Qd8+!, Black must give up the Queen or get mated: Qxd8 Rxd8+ Rxd8#',
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '6k1/5ppp/8/8/8/7P/5PP1/R5K1 w - - 0 1',
          title: 'Back Rank Mate Summary',
          explanation: `**Key lessons about back rank mates:**

**What creates the weakness:**
• Pawns on f7-g7-h7 trap the King
• No defender on the back rank
• No escape square (no "luft")

**How to exploit it:**
• Get your Rook or Queen to the back rank
• Remove or distract the defenders
• Combine with other threats

**How to defend:**
• Create luft early (h3/h6)
• Keep a piece defending the back rank
• Watch for back rank threats every move

**Warning signs:**
• Opponent's heavy pieces aiming at your back rank
• Your defenders are overloaded or can be deflected
• You haven't created luft yet

**Remember:** Check your back rank before EVERY move in the middlegame and endgame!`,
          highlights: [
            { square: 'h3', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'basic-mate-kq',
      title: 'Checkmate with King & Queen',
      description: 'Learn the fundamental Queen checkmate technique',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      tags: ['endgame', 'checkmate'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/8/4QK2 w - - 0 1',
          title: 'Queen vs Lone King',
          explanation: `When you have a King and Queen versus a lone King, **checkmate is always possible** - if you know the technique!

This is one of the most fundamental skills in chess. You MUST be able to deliver this checkmate, or you'll draw games you should win!

**The basic technique:**
1. Use your Queen to **restrict** the enemy King
2. Bring your own **King closer** to help
3. Push the enemy King to **the edge** of the board
4. Deliver **checkmate** with Queen and King working together

**Key insight:** The Queen alone cannot checkmate - you need your King to help! The King and Queen work as a team.

**How long should it take?**
• With perfect play: under 10 moves
• With good technique: under 15 moves
• The rule: You have 50 moves before it's a draw!`,
        },
        {
          id: 'restrict-king',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/8/4QK2 w - - 0 1',
          title: 'Step 1: Restrict the King',
          explanation: `The first step is to **limit where the enemy King can go**.

**How the Queen restricts:**
• The Queen creates invisible "walls" the King cannot cross
• A Queen on e3 cuts off the King from the entire bottom 3 rows
• A Queen on d5 cuts off the King from many squares

**Avoid giving stalemate!**
• Don't check unnecessarily
• Give the enemy King room to move
• Only give check when it's checkmate!

**Warning:** Many beginners give check after check, chasing the King around the board. This is WRONG! It often leads to stalemate.

**Better approach:** Place the Queen to restrict, then bring your King closer. No checks until mate!`,
          arrows: [
            { from: 'e1', to: 'e8', color: 'green' },
            { from: 'a1', to: 'h1', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'restrict-practice',
          type: 'interactive',
          fen: '8/8/8/4k3/8/8/8/4QK2 w - - 0 1',
          title: 'Restrict the King',
          explanation: `Use your Queen to cut off the Black King's escape.

**Don't give check!** Just place the Queen where it controls many squares, limiting the King's movement.

**Good squares:** Qe3, Qe2, Qd2, Qc3
These all create a barrier the King cannot pass.

Find a move that restricts the King!`,
          correctMoves: ['Qe3', 'Qe2', 'Qd2', 'Qc3'],
          failureMessage: 'Look for a move that limits where the Black King can go - without giving check yet!',
          successMessage: 'Excellent! You restricted the King\'s movement. Now your own King can approach.',
        },
        {
          id: 'bring-king',
          type: 'explanation',
          fen: '8/8/4k3/8/8/4Q3/8/5K2 w - - 0 1',
          title: 'Step 2: Bring Your King',
          explanation: `With the enemy King restricted, **bring your own King into the battle!**

**Why is the King needed?**
• The Queen alone cannot force checkmate
• Your King helps control squares near the enemy King
• King + Queen together create an inescapable net

**The ideal formation:**
• Your King should face the enemy King (opposition)
• Your Queen controls the rank/file the enemy King is on
• Together they push the King to the corner

**King safety:** Your King is completely safe! The enemy has no pieces, so just walk your King toward the center of the board and then toward the enemy King.

**Patience:** Don't rush with checks. Methodically improve your position.`,
          arrows: [
            { from: 'f1', to: 'f2', color: 'green' },
            { from: 'f2', to: 'f3', color: 'green' },
            { from: 'f3', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'f1', color: 'yellow' },
            { square: 'e6', color: 'red' },
          ],
        },
        {
          id: 'king-approach',
          type: 'interactive',
          fen: '8/8/4k3/8/8/4Q3/8/5K2 w - - 0 1',
          title: 'Approach with the King',
          explanation: `The Queen on e3 controls the third rank - the King cannot come below that line.

Now bring your King closer to help!

**Don't check yet** - just improve your King's position.`,
          correctMoves: ['Kf2', 'Ke2', 'Kf1-f2', 'Ke1'],
          failureMessage: 'Bring your King closer! Walk toward the center and toward the enemy King.',
          successMessage: 'Good! Your King is approaching. Keep bringing it closer until you can deliver checkmate.',
        },
        {
          id: 'avoid-stalemate',
          type: 'explanation',
          fen: '7k/5Q2/5K2/8/8/8/8/8 w - - 0 1',
          title: 'Avoid Stalemate!',
          explanation: `**DANGER!** The biggest mistake in K+Q vs K is **stalemate**!

**What is stalemate?**
When the enemy King is NOT in check but has NO legal moves = DRAW!

**In this position:**
If White plays Qf8?? or Qg7?? - it's stalemate! Black's King cannot move, but is not in check. Game drawn!

**How to avoid stalemate:**
• Always give the enemy King at least one square
• Don't give pointless checks
• When the King is on the edge, think carefully!
• Check that the King has a legal move before your move

**Correct technique here:**
Qf6 or Qf7 keeps Black's King trapped but gives it g8 to move to. Then White can approach with the King and deliver mate.`,
          highlights: [
            { square: 'h8', color: 'red' },
          ],
          arrows: [
            { from: 'f7', to: 'g8', color: 'red' },
            { from: 'f7', to: 'f8', color: 'red' },
          ],
        },
        {
          id: 'edge-mate',
          type: 'interactive',
          fen: 'k7/8/1KQ5/8/8/8/8/8 w - - 0 1',
          title: 'Deliver Checkmate',
          explanation: `The Black King is on the edge of the board. Your King supports the Queen perfectly.

**Now it's time for checkmate!**

Find the move that ends the game!

**Remember:** The King must have no escape squares, and must be in check.`,
          correctMoves: ['Qb7#', 'Qc8#'],
          successMessage: 'Checkmate! The King has no escape. You mastered the K+Q checkmate!',
          arrows: [
            { from: 'c6', to: 'b7', color: 'green' },
          ],
        },
        {
          id: 'full-example',
          type: 'demonstration',
          fen: '8/8/8/8/4k3/8/8/4QK2 w - - 0 1',
          title: 'Complete Example',
          explanation: `Let's see the whole technique:

**1. Qe2** - Queen restricts (no check)
**1...Kd4** - King tries to stay in center

**2. Kf2** - White King approaches
**2...Kd5** - King retreats

**3. Kf3** - King keeps coming
**3...Kd4** - King tries to escape

**4. Qd2+** - Now we check, pushing King to edge
**4...Ke5** - Forced

**5. Kf4!** - King takes opposition
**5...Kf6** - Only move

**6. Qd6+** - Check, pushing to edge
**6...Kg7**

**7. Ke5** - King follows
**...and eventually mate!**

Key points: Restrict → King approach → Push to edge → Checkmate!`,
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '7k/8/8/8/8/8/8/4QK2 w - - 0 1',
          title: 'K+Q Checkmate Summary',
          explanation: `**The K+Q Checkmate Technique:**

**Step 1: Restrict**
• Use Queen to cut off the enemy King
• Don't give unnecessary checks

**Step 2: Approach**
• Bring your King toward the enemy King
• Work as a team!

**Step 3: Push to Edge**
• Use checks to force the King to the side
• Avoid stalemate!

**Step 4: Checkmate**
• King + Queen together deliver mate
• Usually on the back rank or in a corner

**Common mistakes to avoid:**
✗ Giving check every move (can lead to stalemate)
✗ Leaving your King far away
✗ Not watching for stalemate
✗ Taking too long (50-move rule!)

**Practice this endgame until it's automatic!**`,
        },
      ],
    },
    {
      id: 'basic-mate-kr',
      title: 'Checkmate with King & Rook',
      description: 'Learn the essential Rook endgame technique',
      difficulty: 'beginner',
      estimatedMinutes: 12,
      tags: ['endgame', 'checkmate'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/8/R3K3 w - - 0 1',
          title: 'Rook vs Lone King',
          explanation: `King and Rook vs King is **harder than K+Q**, but still a forced win!

**Why is it trickier?**
• The Rook isn't as powerful as the Queen
• The enemy King can attack the Rook
• More precise technique is needed

**The "Box Method":**
1. Use the Rook to create a **"box"** - a restricted area
2. **Shrink the box** gradually with Rook checks
3. Use your **King to prevent** the enemy King from escaping
4. **Checkmate** when the King is on the edge

**Time needed:**
• With perfect play: under 16 moves
• With good technique: under 25 moves
• Remember the 50-move rule!

**Key difference from K+Q:** Your King must be much more active and help restrict the enemy King!`,
          highlights: [
            { square: 'e5', color: 'red' },
            { square: 'a1', color: 'green' },
          ],
        },
        {
          id: 'box-method',
          type: 'explanation',
          fen: '8/8/8/4k3/8/R7/8/4K3 w - - 0 1',
          title: 'The Box Method',
          explanation: `The Rook creates invisible **walls** that the King cannot cross!

**Look at this position:**
The Rook on a3 creates a barrier along the third rank.
The Black King CANNOT go to any square on row 1, 2, or 3!

**The "box" concept:**
• Imagine a rectangle from the Rook to the edge of the board
• The enemy King is trapped inside this box
• We'll gradually make the box smaller!

**How to shrink the box:**
• Give check to push the King back one row
• Your King approaches to prevent escape
• Repeat until King is on the edge!

**Warning:** Don't let the enemy King attack your Rook! Keep the Rook safe and out of reach.`,
          arrows: [
            { from: 'a3', to: 'h3', color: 'red' },
          ],
          highlights: [
            { square: 'e5', color: 'yellow' },
          ],
        },
        {
          id: 'create-box',
          type: 'interactive',
          fen: '8/8/8/4k3/8/8/8/R3K3 w - - 0 1',
          title: 'Create the Box',
          explanation: `Use your Rook to cut off the Black King!

Place the Rook on a rank or file that limits the King's movement.

**Remember:** The Rook creates a "wall" along the entire rank or file.

Find a move that restricts the King!`,
          correctMoves: ['Ra4', 'Ra5+', 'Ra3', 'Ra6'],
          successMessage: 'The box is created! The King is trapped in a smaller area.',
          arrows: [
            { from: 'a1', to: 'a5', color: 'green' },
          ],
        },
        {
          id: 'king-helps',
          type: 'explanation',
          fen: '8/8/3k4/8/8/R7/4K3/8 w - - 0 1',
          title: 'The King Must Help',
          explanation: `Unlike K+Q, here your **King does most of the work!**

**The King's role:**
• Prevents the enemy King from escaping the box
• Takes "opposition" to push the King back
• Helps deliver the final checkmate

**"Opposition":**
When Kings face each other with one square between them = the King who must move loses ground.

In this position:
• The Rook controls the 3rd rank
• White's King should approach: Ke2-e3-e4
• When the King reaches the 4th rank, the Rook can check to shrink the box!

**Coordination:**
• King approaches → Rook checks → King approaches → Rook checks
• This pushes the enemy King to the edge!`,
          arrows: [
            { from: 'e2', to: 'e3', color: 'green' },
            { from: 'e3', to: 'e4', color: 'green' },
          ],
        },
        {
          id: 'shrink-box',
          type: 'interactive',
          fen: '8/8/3k4/8/8/R7/4K3/8 w - - 0 1',
          title: 'Shrink the Box',
          explanation: `The Rook controls the 3rd rank - the Black King cannot pass below that line.

Now you need to make the box smaller!

**Options:**
• Bring your King closer
• Check to push the enemy King back one row

Find the best move to make progress!`,
          correctMoves: ['Ra4', 'Ra5', 'Ra6+', 'Kf3', 'Ke3'],
          successMessage: 'Good! Either checking to shrink the box or bringing your King closer works.',
        },
        {
          id: 'waiting-move',
          type: 'explanation',
          fen: '3k4/8/3K4/8/R7/8/8/8 w - - 0 1',
          title: 'The Waiting Move',
          explanation: `Sometimes you need a **waiting move** to put the opponent in "zugzwang"!

**What is zugzwang?**
When any move a player makes worsens their position. They would prefer to pass!

**In this position:**
• White's King is on d6, directly facing Black's King on d8
• If it were Black's move, they must go to c8 or e8
• Then White plays Ra8# - checkmate!

**But it's White's move!**
White needs to "waste" a move while maintaining the position.
**Ra1, Ra2, Ra3** (any move along the a-file) - keeps Rook safe and waits for Black.

This forces Black to move their King, then White delivers mate!`,
          highlights: [
            { square: 'd8', color: 'red' },
            { square: 'd6', color: 'green' },
          ],
          arrows: [
            { from: 'a4', to: 'a1', color: 'yellow' },
          ],
        },
        {
          id: 'final-mate',
          type: 'interactive',
          fen: '3k4/8/3K4/8/8/8/8/R7 w - - 0 1',
          title: 'Deliver Checkmate',
          explanation: `The Black King is on the edge. Your King controls the escape squares.

**This is the final position!**

The Black King is trapped on d8. Your Rook can deliver the checkmate.

Find the winning move!`,
          correctMoves: ['Ra8#'],
          successMessage: 'Checkmate! You mastered the Rook endgame. The King and Rook worked perfectly together!',
          arrows: [
            { from: 'a1', to: 'a8', color: 'green' },
          ],
        },
        {
          id: 'rook-safety',
          type: 'explanation',
          fen: '8/8/4k3/8/8/4R3/4K3/8 w - - 0 1',
          title: 'Keep the Rook Safe!',
          explanation: `**Danger!** The enemy King can attack your Rook!

Unlike the Queen (which can escape in any direction), the Rook only moves along ranks and files. The King can approach along diagonals!

**In this position:**
If the Black King plays Kd5, it attacks the Rook!

**How to keep the Rook safe:**
• Keep the Rook far from the enemy King
• Place the Rook at least 3 squares away
• When the King approaches, move the Rook to the opposite side

**Rule of thumb:** "Rook on the long side, King on the short side"
Keep maximum distance between your Rook and the enemy King!`,
          arrows: [
            { from: 'e6', to: 'd5', color: 'red' },
            { from: 'e3', to: 'a3', color: 'green' },
          ],
          highlights: [
            { square: 'e3', color: 'yellow' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '7k/8/8/8/8/8/8/R3K3 w - - 0 1',
          title: 'K+R Checkmate Summary',
          explanation: `**The K+R Checkmate Technique (Box Method):**

**Step 1: Create the Box**
• Place Rook to cut off the King
• Don't let King attack the Rook!

**Step 2: Bring Your King**
• Your King must help restrict the enemy King
• Approach methodically

**Step 3: Shrink the Box**
• Check to push the King back one row
• King approaches to maintain control
• Repeat!

**Step 4: Waiting Move + Checkmate**
• When the enemy King is trapped on edge
• Use a waiting move to force zugzwang
• Deliver checkmate with Rook on the back rank

**Key reminders:**
✓ Keep Rook safe from the enemy King
✓ Your King does the hard work
✓ Be patient - it takes more moves than K+Q
✓ Watch for stalemate (rare but possible)

**Practice this endgame until you can do it blindfolded!**`,
        },
      ],
    },
  ],
};
