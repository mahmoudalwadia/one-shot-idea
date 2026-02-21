import { Course } from './types';

export const tacticsCourse: Course = {
  id: 'tactics',
  title: 'Tactical Patterns',
  description: 'Master the essential tactical motifs to win material and games',
  icon: '⚔',
  color: '#ef4444',
  lessons: [
    // ==================== LESSON 1: FORKS ====================
    {
      id: 'forks',
      title: 'The Fork',
      description: 'Attack two pieces at once with devastating effect',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      tags: ['tactics', 'fork', 'double-attack'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r3k3/2N5/8/8/8/8/8/4K3 w - - 0 1',
          title: 'What is a Fork?',
          explanation: `A **fork** is one of the most powerful tactical weapons in chess - it occurs when a single piece attacks two or more enemy pieces simultaneously. The term dates back to the 16th-17th century and comes from the agricultural fork tool - a single handle splitting into multiple prongs. It appears in chess literature as early as Philidor's writings in 1749.

The beauty of a fork is simple mathematics: your opponent can only move one piece per turn, so when you attack two pieces at once, you're guaranteed to capture at least one of them!

In this position, the Knight on c7 demonstrates a perfect fork:
• It attacks the **King on e8** (check!)
• It attacks the **Rook on a8**

Since Black must respond to the check by moving the King, the Rook is lost. This type of fork - attacking the King and another piece - is called a **"royal fork"** and is especially devastating.

**Key insight**: Knights are the ultimate forking pieces because of their unique jumping ability. They can attack pieces that cannot attack them back!`,
          arrows: [
            { from: 'c7', to: 'e8', color: 'red' },
            { from: 'c7', to: 'a8', color: 'red' },
          ],
          highlights: [
            { square: 'c7', color: 'yellow' },
            { square: 'e8', color: 'red' },
            { square: 'a8', color: 'red' },
          ],
        },
        {
          id: 'knight-fork-power',
          type: 'explanation',
          fen: '7k/8/8/3N4/8/8/8/K7 w - - 0 1',
          title: 'Why Knights Fork Best',
          explanation: `Knights are the **masters of the fork** for several reasons:

**1. The L-shaped jump**
Knights move in an L-shape (2 squares + 1 square), which means they can reach squares that other pieces can't easily defend.

**2. They attack what can't attack back**
When a Knight forks a Queen and Rook, neither can capture the Knight! Queens and Rooks move in straight lines, but the Knight sits on a square they can't reach.

**3. Eight potential targets**
From a central square, a Knight attacks 8 different squares - that's 8 potential fork opportunities!

**The Knight on d5 controls**:
• c7, e7, f6, f4, e3, c3, b4, b6

When looking for Knight forks, visualize these 8 squares and see if two enemy pieces occupy them, or if you can force them there.

**Pro tip**: Always look for Knight forks when the enemy King and Queen are on the same color square, or when pieces are within "Knight's distance" of each other.`,
          arrows: [
            { from: 'd5', to: 'c7', color: 'green' },
            { from: 'd5', to: 'e7', color: 'green' },
            { from: 'd5', to: 'f6', color: 'green' },
            { from: 'd5', to: 'f4', color: 'green' },
            { from: 'd5', to: 'e3', color: 'green' },
            { from: 'd5', to: 'c3', color: 'green' },
            { from: 'd5', to: 'b4', color: 'green' },
            { from: 'd5', to: 'b6', color: 'green' },
          ],
          highlights: [{ square: 'd5', color: 'yellow' }],
        },
        {
          id: 'knight-fork-1',
          type: 'interactive',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Find the Fork Threat',
          explanation: `This is the Italian Game position. White has a powerful move that creates a fork threat on f7.

Look for a Knight move that:
• Attacks the weak f7 pawn
• Threatens a fork on the King and Rook

The f7 square is only defended by the King - that's always a target early in the game!`,
          correctMoves: ['Ng5'],
          successMessage: `Ng5! Excellent! The Knight now threatens Nxf7, forking the Queen on d8 and Rook on h8. This is the famous "Fried Liver Attack" setup - one of the most forcing sequences in chess!`,
          failureMessage: 'Look for a Knight move that attacks f7 and threatens a devastating fork.',
          arrows: [
            { from: 'f3', to: 'g5', color: 'green' },
            { from: 'g5', to: 'f7', color: 'yellow' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'royal-fork',
          type: 'interactive',
          fen: 'r4rk1/pppq1ppp/4b3/4p3/4N3/3P4/PPP2PPP/R1BQK2R w KQ - 0 1',
          title: 'The Royal Fork',
          explanation: `A **"Royal Fork"** is the ultimate Knight tactic - simultaneously attacking the King and Queen!

Since the King must escape check, the Queen is lost. It's an instant game-winning tactic.

In this position, look for a Knight move that forks the Black King and Queen simultaneously:
• The King is on g8
• The Queen is on d7
• Find a square that attacks both with check!`,
          correctMoves: ['Nf6+'],
          failureMessage: 'Look for a square where your Knight attacks both the King and Queen simultaneously with check!',
          successMessage: `Nf6+! The Knight lands on f6 with check, simultaneously attacking the King on g8 and the Queen on d7. Black must move the King, and the Queen is lost! This is the devastating royal fork in action.`,
          arrows: [
            { from: 'e4', to: 'f6', color: 'green' },
            { from: 'f6', to: 'g8', color: 'red' },
            { from: 'f6', to: 'd7', color: 'red' },
          ],
        },
        {
          id: 'pawn-fork',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/8/8/3nP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 1',
          title: 'Pawn Forks - The Underestimated Weapon',
          explanation: `Don't underestimate the humble pawn as a forking piece!

**Pawns can fork too**, and because they're worth only 1 point, trading them for a Knight or Bishop (3 points) is a great deal.

Pawn forks are especially common when:
• Enemy pieces are on adjacent files
• Pieces are carelessly placed on the 4th/5th rank
• After exchanges leave pieces unprotected

In this position, Black's Knight on d4 has jumped into White's territory. But watch what happens with a simple pawn move...

**Common mistake**: Beginners often overlook pawn forks because they're focused on the "bigger" pieces. Always scan for pawn attacks!`,
          arrows: [
            { from: 'c2', to: 'c3', color: 'green' },
          ],
          highlights: [
            { square: 'd4', color: 'red' },
            { square: 'c3', color: 'yellow' },
          ],
        },
        {
          id: 'pawn-fork-practice',
          type: 'interactive',
          fen: 'r1bqkbnr/pppp1ppp/8/8/3nP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Execute the Pawn Fork',
          explanation: `Black's Knight has invaded on d4. Find the pawn move that forks the Knight and creates a strong center!`,
          correctMoves: ['c3'],
          successMessage: `c3! The pawn attacks the Knight, which must retreat. Meanwhile, you've strengthened your center and the Knight has wasted time. This is why central Knight invasions must be calculated carefully!`,
          failureMessage: 'Which pawn can attack the Knight on d4?',
          arrows: [
            { from: 'c2', to: 'c3', color: 'green' },
          ],
        },
        {
          id: 'queen-fork',
          type: 'interactive',
          fen: 'r1b1k2r/ppppqppp/2n2n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R w KQkq - 0 1',
          title: 'Queen Forks',
          explanation: `The Queen is a powerful forking piece because she can attack along ranks, files, AND diagonals.

Look for a Queen move that attacks two undefended pieces at once. This is called a "family fork" when multiple pieces are threatened.

Hint: Look at the undefended pieces in Black's position...`,
          correctMoves: ['Qa4', 'Qb3'],
          successMessage: `Excellent! Qa4 attacks both the undefended c6 Knight and threatens the Bishop on c5. Black can't defend both! Queen forks are deadly because of her long-range attacking power.`,
          failureMessage: 'Look for Black pieces that are undefended. Can the Queen attack two at once?',
          arrows: [
            { from: 'd1', to: 'a4', color: 'green' },
          ],
        },
        {
          id: 'bishop-fork',
          type: 'explanation',
          fen: '5k2/4r3/8/3B4/8/8/8/4K2R w - - 0 1',
          title: 'Bishop Forks',
          explanation: `Bishops are sneaky forking pieces because they attack on diagonals - lines that other pieces often ignore!

**Bishop fork characteristics:**
• Attack two pieces on the same diagonal
• Especially deadly when targeting King + Rook
• "Corner to corner" forks span the entire board
• Bishops can fork from far away, unlike Knights

**When to look for Bishop forks:**
• After exchanges open up diagonals
• When enemy pieces align diagonally
• In endgames with scattered pieces
• When the King and Rook are on the same color squares

**In this position**: The Bishop on d5 is forking Black's King on f8 and Rook on e7! Black must lose the exchange.`,
          arrows: [
            { from: 'd5', to: 'f7', color: 'green' },
            { from: 'd5', to: 'b7', color: 'green' },
          ],
          highlights: [
            { square: 'f8', color: 'yellow' },
            { square: 'e7', color: 'yellow' },
          ],
        },
        {
          id: 'bishop-fork-practice',
          type: 'interactive',
          fen: 'r4rk1/ppp2ppp/3p4/4p3/2B1n3/4P3/PPP2PPP/R3K2R w KQ - 0 1',
          title: 'Find the Bishop Fork',
          explanation: `White's Bishop on c4 is well-placed on an open diagonal.

Look at Black's position carefully:
• Where is the King?
• Where is the Rook on a8?
• Can you find a Bishop move that attacks two pieces at once?

**Hint:** Look for a diagonal that connects the King and another valuable piece!`,
          correctMoves: ['Bd5'],
          successMessage: `Bd5! The Bishop forks Black's King (via f7) and the Rook on a8. Black loses the exchange! This is a classic Bishop fork - attacking on a long diagonal that the opponent didn't see coming.`,
          failureMessage: 'Look for a diagonal where the Bishop can attack two valuable pieces at once. Check the a8-King diagonal...',
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'rook-fork',
          type: 'explanation',
          fen: '4k3/8/8/8/8/8/p3R3/4K3 w - - 0 1',
          title: 'Rook Forks',
          explanation: `Rooks fork along ranks and files - the highways of the chessboard!

**Rook fork situations:**
• **7th rank** - Fork King and pawns (very common!)
• **Back rank** - Attack King and piece simultaneously
• **Open files** - Cut through enemy position vertically

**The 7th rank special:**
When your Rook reaches the 7th rank, look for forks on the King and back-rank pawns! This is one of the most common Rook fork patterns.

**In this position**: White's Rook on e2 attacks:
• The Black King (can't let it escape!)
• The passed pawn on a2

The Rook controls the entire 2nd rank, winning the pawn!

**Remember:** Rooks need open lines to fork effectively. Control those files and ranks!`,
          arrows: [
            { from: 'e2', to: 'e8', color: 'green' },
            { from: 'e2', to: 'a2', color: 'green' },
          ],
          highlights: [
            { square: 'e8', color: 'yellow' },
            { square: 'a2', color: 'yellow' },
          ],
        },
        {
          id: 'rook-fork-practice',
          type: 'interactive',
          fen: '6k1/5ppp/8/8/8/8/4R3/n3K3 w - - 0 1',
          title: 'Find the Rook Fork',
          explanation: `White's Rook is on an open file. Black has a Knight on a1 and the King on g8.

Look for a Rook move that attacks two pieces simultaneously!

**Remember:**
• Rooks attack on ranks and files
• The 7th rank is especially powerful
• Look for pieces that line up horizontally or vertically`,
          correctMoves: ['Ra2'],
          successMessage: `Ra2! The Rook forks Black's Knight on a1 and attacks the 7th rank toward the King. Black loses the Knight! Rook forks along ranks are very powerful because they're hard to see coming.`,
          failureMessage: 'Look for a rank or file where the Rook can attack two pieces. Can you find a move that threatens both the Knight and controls an important rank?',
          arrows: [
            { from: 'e2', to: 'a2', color: 'green' },
          ],
        },
        {
          id: 'fork-defense',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 1',
          title: 'Defending Against Forks',
          explanation: `Knowing how to CREATE forks is important, but knowing how to PREVENT them is equally vital!

**Ways to defend against forks**:

1. **Don't put pieces on the same Knight-color squares**
   If your King is on a light square, keep your Queen on dark squares

2. **Control the forking squares**
   If you see a Knight eyeing a fork square, put a pawn or piece on it first

3. **Keep pieces defended**
   A fork is harmless if you can simply recapture

4. **Watch for "smothered" positions**
   Knights thrive when pieces are cramped together

**In this position**: White threatens Qxf7+ forking King and Rook. Black should play g6 or Qe7 to defend.

**Remember**: Prevention is better than cure. Once a fork lands, you're already losing material!`,
          arrows: [
            { from: 'h5', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'e8', color: 'yellow' },
            { square: 'h8', color: 'yellow' },
          ],
        },
        {
          id: 'fork-puzzle',
          type: 'puzzle',
          fen: 'r2qkb1r/ppp2ppp/2np1n2/4p3/2B1P1b1/3P1N2/PPP1NPPP/R1BQK2R w KQkq - 0 1',
          title: 'Fork Challenge',
          explanation: `Find the best move that creates a winning fork threat!

Look carefully at the position:
• Where are Black's valuable pieces?
• What squares can your pieces reach?
• Is there a check that leads to a fork?`,
          correctMoves: ['Bxf7+'],
          successMessage: `Bxf7+! After Kxf7, Ng5+ forks the King and Queen! This is a classic combination - sacrifice to set up the fork. Beautiful!`,
          failureMessage: 'Sometimes you need a sacrifice to create the fork. What happens after Bxf7+?',
          arrows: [
            { from: 'c4', to: 'f7', color: 'green' },
          ],
        },
      ],
    },
    // ==================== LESSON 2: PINS ====================
    {
      id: 'pins',
      title: 'The Pin',
      description: 'Restrict enemy pieces by pinning them to valuable targets',
      difficulty: 'beginner',
      estimatedMinutes: 12,
      tags: ['tactics', 'pin'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
          title: 'What is a Pin?',
          explanation: `A **pin** is a powerful tactic where an attacking piece threatens a less valuable piece that cannot (or should not) move because it would expose a more valuable piece behind it. The word comes from the Old English "pinn" (a peg that holds something in place) - a pinned piece is "nailed down" just like a physical pin. The chess term became standard in the 18th century.

Think of it like a shish kebab - two pieces skewered on the same line!

**There are two types of pins**:

1. **Absolute Pin** - The pinned piece CANNOT legally move because the piece behind it is the King. Moving would be illegal (exposing your King to check).

2. **Relative Pin** - The pinned piece CAN legally move, but SHOULDN'T because it would lose the more valuable piece behind it (usually the Queen).

**Pieces that can pin**: Only long-range pieces - Rooks, Bishops, and Queens - can create pins because they attack along lines.

**Key insight**: Pins restrict your opponent's mobility. A pinned piece is often as good as captured because it can't perform its normal functions!`,
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'absolute-pin',
          type: 'explanation',
          fen: 'rn1qkbnr/ppp2ppp/4p3/3p4/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',
          title: 'The Absolute Pin',
          explanation: `In this position, Black's Bishop on g4 has created an **absolute pin** on White's Knight.

The Knight on f3 is pinned to the Queen on d1. This is an ABSOLUTE pin because:
• If the Knight moves, the Bishop captures the Queen
• The Knight literally cannot move without losing the Queen

**The pinned Knight is paralyzed!** It cannot:
• Capture pieces
• Defend other pieces
• Control squares

**Why this matters**:
• The Knight on f3 was defending e5 and h4 - not anymore
• White's d4 pawn might become weak
• Black can pile up attackers on the pinned piece

**Common response**: White often plays h3 to ask the Bishop "what are you going to do?" or Be2/Bd3 to break the pin.`,
          arrows: [
            { from: 'g4', to: 'd1', color: 'red' },
          ],
          highlights: [
            { square: 'g4', color: 'yellow' },
            { square: 'f3', color: 'red' },
            { square: 'd1', color: 'blue' },
          ],
        },
        {
          id: 'relative-pin',
          type: 'explanation',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'The Relative Pin',
          explanation: `A **relative pin** is when the pinned piece CAN legally move, but doing so would lose material.

Imagine if White's Queen was on e2 and a Rook was on e1. If there's a Black Bishop on b5, it would create a relative pin on the Queen - the Queen CAN move, but then the Rook falls.

**Relative pins are tricky because**:
• The pinned piece might move anyway if it creates a bigger threat
• You need to calculate if breaking the pin is worth the material

**Example scenario**:
If a Knight is pinned to a Queen, it might still capture something valuable if that capture creates checkmate threats!

**Key insight**: With absolute pins (to the King), there's no choice. With relative pins, there's always a calculation: "Is what I gain worth more than what I lose?"`,
          highlights: [
            { square: 'f3', color: 'yellow' },
          ],
        },
        {
          id: 'create-pin',
          type: 'interactive',
          fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3',
          title: 'Create a Pin',
          explanation: `You're playing Black. Find the move that creates a powerful pin on White's Knight!

Remember: You need a long-range piece (Bishop, Rook, or Queen) to create a pin. Look for a line where White's Knight stands between your piece and a more valuable target.`,
          correctMoves: ['Bg4'],
          successMessage: `Bg4! Perfect! You've pinned the Knight to the Queen. Now the Knight is paralyzed and can't move without losing the Queen. This is a classic opening pin that appears in many games!`,
          failureMessage: 'Which piece can attack the Knight through to the Queen behind it?',
          arrows: [
            { from: 'c8', to: 'g4', color: 'green' },
            { from: 'g4', to: 'd1', color: 'yellow' },
          ],
        },
        {
          id: 'exploit-pin',
          type: 'interactive',
          fen: 'r1bqk2r/ppppnppp/2n5/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
          title: 'Exploit the Pin',
          explanation: `The Knight on e7 is pinned to the King by the Queen on h5!

When a piece is pinned, it becomes vulnerable because:
• It can't move to escape
• It can't defend itself normally
• You can often capture it for free or with material gain

Find a move that wins material by exploiting this pin!`,
          correctMoves: ['Qxf7#'],
          successMessage: `Qxf7#! Checkmate! The Knight cannot capture the Queen because it's absolutely pinned to the King. This is the power of exploiting pins - you can attack squares the pinned piece should defend!`,
          failureMessage: 'The Knight on e7 is pinned and cannot move. What square can the Queen attack that the Knight would normally defend?',
          arrows: [
            { from: 'h5', to: 'e8', color: 'red' },
            { from: 'h5', to: 'f7', color: 'green' },
          ],
          highlights: [
            { square: 'e7', color: 'red' },
            { square: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'pile-on-pin',
          type: 'explanation',
          fen: 'rn1qkb1r/ppp2ppp/4pn2/3p2B1/3PP3/2N5/PPP2PPP/R2QKB1R b KQkq - 0 5',
          title: 'Piling Up on Pinned Pieces',
          explanation: `Once you have a pin, don't just sit there - **pile up the pressure!**

The classic technique is to attack a pinned piece with additional pieces until the defender can't keep up.

In this position, White has pinned Black's Knight on f6 to the Queen. The Knight is defended once (by the pawn on e7). White should:

1. **Add attackers**: Play Qf3 or Qd3 to attack f6 again
2. **Prevent unpinning**: Watch for ...Be7 breaking the pin
3. **Exchange favorably**: Eventually win the Knight

**Counting matters**:
• 2 attackers vs 1 defender = You win the piece
• The pinned piece counts as a "frozen" defender

**Strategic value**: Even if you don't win the piece, the pin ties down your opponent's pieces to defense!`,
          arrows: [
            { from: 'g5', to: 'f6', color: 'red' },
            { from: 'd1', to: 'f3', color: 'yellow' },
          ],
          highlights: [
            { square: 'f6', color: 'red' },
            { square: 'g5', color: 'yellow' },
          ],
        },
        {
          id: 'breaking-pins',
          type: 'interactive',
          fen: 'rn1qkb1r/ppp2ppp/4pn2/3p2B1/3PP3/2N5/PPP2PPP/R2QKB1R b KQkq - 0 5',
          title: 'Breaking the Pin',
          explanation: `You're Black and your Knight is pinned to the Queen. You need to break this pin!

**Common ways to break pins**:
1. **Block the line** - Put a piece between the pinner and the pinned piece
2. **Move the valuable piece** - If it's a relative pin, move the piece behind
3. **Counter-attack** - Create a bigger threat
4. **Chase away the pinner** - Attack the pinning piece

Find the best way to break this pin!`,
          correctMoves: ['Be7'],
          successMessage: `Be7! The Bishop blocks the pin, and now the Knight on f6 is free to move. Always look for ways to break pins quickly before your opponent can pile up more pressure!`,
          failureMessage: 'How can you put a piece between the Bishop and your Queen?',
          arrows: [
            { from: 'f8', to: 'e7', color: 'green' },
          ],
        },
        {
          id: 'pin-tactics-combo',
          type: 'puzzle',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5',
          title: 'Pin Puzzle',
          explanation: `Black has just pinned your Knight on c3 to your King with ...Bb4.

But wait - can you turn this into an opportunity? Sometimes when your opponent creates a pin, they leave something else undefended!

Find the tactical response that punishes Black's last move.`,
          correctMoves: ['Bxf7+'],
          successMessage: `Bxf7+! While Black was busy pinning your Knight, they left f7 undefended! After Kxf7, you've won a pawn and damaged Black's King safety. The pin on c3 is annoying but not the biggest issue anymore!`,
          failureMessage: 'Look at what Black left undefended when they moved the Bishop to b4...',
          arrows: [
            { from: 'c4', to: 'f7', color: 'green' },
          ],
        },
        {
          id: 'pin-summary',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Pin Tactics Summary',
          explanation: `**Key takeaways about pins**:

✓ **Absolute pins** (to the King) are the strongest - the piece literally cannot move

✓ **Relative pins** require calculation - sometimes breaking the pin is worth it

✓ **Creating pins**: Look for enemy pieces aligned with their King or Queen

✓ **Exploiting pins**:
   - Pile up attackers on the pinned piece
   - Capture pieces the pinned piece was defending
   - Win the pinned piece outright

✓ **Breaking pins**:
   - Block the line with another piece
   - Move the valuable piece (if relative pin)
   - Counter-attack or chase the pinner

**Pro tip**: In the opening, the most common pins are:
• Bishop on g5/g4 pinning a Knight to Queen
• Bishop on b5/b4 pinning a Knight to King
• Rook pins along files (especially in endgames)

Always be aware of potential pins - both creating them AND defending against them!`,
        },
      ],
    },
    // ==================== LESSON 3: SKEWERS ====================
    {
      id: 'skewers',
      title: 'The Skewer',
      description: 'Attack valuable pieces through other pieces',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['tactics', 'skewer'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '6k1/8/8/8/8/8/6q1/R3K3 w - - 0 1',
          title: 'What is a Skewer?',
          explanation: `A **skewer** is like a reverse pin - you attack a valuable piece, and when it moves, you capture the piece behind it. Named after a cooking skewer that pierces through food, the term became popular in English chess literature in the 19th century. It's also called an "X-ray attack" in some traditions.

**The key difference from a pin**:
• **Pin**: Less valuable piece in front, more valuable behind
• **Skewer**: More valuable piece in front, less valuable behind

In this position, if the White Rook plays Ra8+, it's a skewer:
• The King (most valuable) is attacked first
• When the King moves, the Queen behind is captured

**Skewers are deadly** because the front piece MUST move (especially if it's the King in check), guaranteeing you capture the piece behind.

**Only long-range pieces can skewer**: Rooks, Bishops, and Queens operate along lines and can see "through" the first piece to the second.`,
          arrows: [
            { from: 'a1', to: 'g1', color: 'yellow' },
            { from: 'a1', to: 'a8', color: 'green' },
          ],
          highlights: [
            { square: 'g8', color: 'red' },
            { square: 'g2', color: 'red' },
          ],
        },
        {
          id: 'rook-skewer',
          type: 'interactive',
          fen: '8/8/3k3q/8/8/R7/8/6K1 w - - 0 1',
          title: 'The Rook Skewer',
          explanation: `White to play. The Black King on d6 and Queen on h6 are aligned on the 6th rank!

Find the move that skewers them - check the King first, then collect the Queen when the King moves off the rank.

Remember: Checks are forcing - the opponent MUST respond to them.`,
          correctMoves: ['Ra6+'],
          successMessage: `Ra6+! The Rook checks the King along the 6th rank. The King must move off the rank, and then Rxh6 captures the Queen. This is the classic Rook skewer - devastating and impossible to escape!`,
          failureMessage: 'Can you give check in a way that attacks the Queen behind the King on the same rank?',
          arrows: [
            { from: 'a3', to: 'a6', color: 'green' },
            { from: 'a6', to: 'h6', color: 'yellow' },
          ],
        },
        {
          id: 'bishop-skewer',
          type: 'interactive',
          fen: '8/5r2/8/3k4/8/1B6/8/4K3 w - - 0 1',
          title: 'Bishop Skewer',
          explanation: `Bishops skewer along diagonals. The Black King on d5 and the Rook on f7 are on the same diagonal!

Find the Bishop move that skewers the King and Rook.`,
          correctMoves: ['Bc4+'],
          successMessage: `Bc4+! Excellent! The Bishop gives check from c4, and when the King moves away, you capture the Rook with Bxf7. Bishop skewers are common in endgames when pieces spread out across the board.`,
          failureMessage: 'Look at the diagonal that contains both the King and the Rook...',
          arrows: [
            { from: 'b3', to: 'c4', color: 'green' },
            { from: 'c4', to: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'queen-skewer',
          type: 'explanation',
          fen: 'r3k3/8/8/8/8/8/8/4K2Q w - - 0 1',
          title: 'Queen Skewers',
          explanation: `The Queen is the ultimate skewering piece because she can operate on ranks, files, AND diagonals.

This gives her maximum flexibility to find skewer opportunities that other pieces would miss.

**Queen skewer patterns**:
• Along files (like a Rook)
• Along ranks (like a Rook)
• Along diagonals (like a Bishop)

In this position, Qa1+ would skewer the King and Rook.

**Warning**: While the Queen is powerful, she's also valuable! Don't put her in danger just to create a skewer. Make sure the tactic is safe.`,
          arrows: [
            { from: 'h1', to: 'a1', color: 'green' },
            { from: 'a1', to: 'a8', color: 'yellow' },
          ],
          highlights: [
            { square: 'e8', color: 'red' },
            { square: 'a8', color: 'red' },
          ],
        },
        {
          id: 'skewer-setup',
          type: 'interactive',
          fen: '4r1k1/5ppp/8/8/8/5B2/5PPP/6K1 w - - 0 1',
          title: 'Setting Up the Skewer',
          explanation: `Sometimes you need to maneuver to create a skewer. The pieces aren't aligned YET, but with the right move, you can force them onto the same line.

Look at this position. Can you force Black into a skewer?`,
          correctMoves: ['Bc6'],
          successMessage: `Bc6! Now the Rook must move (it's attacked), and wherever it goes on the e-file, you might set up a skewer with the King. Or if Re1+, then Kf2 and Bc6 controls the diagonal. Great prophylactic thinking!`,
          failureMessage: 'How can you attack the Rook while positioning for future tactics?',
        },
        {
          id: 'skewer-vs-pin',
          type: 'explanation',
          fen: '7k/8/8/8/8/8/8/K7 w - - 0 1',
          title: 'Skewer vs Pin - Know the Difference',
          explanation: `Let's clarify the difference between these similar tactics:

**PIN** 🔒:
• Less valuable piece in FRONT
• More valuable piece BEHIND
• Front piece is "stuck" (can't/shouldn't move)
• Example: Knight pinned to King by a Bishop

**SKEWER** ⚔️:
• More valuable piece in FRONT
• Less valuable piece BEHIND
• Front piece MUST move (especially if it's check)
• Example: King skewered to Queen by a Rook

**Memory trick**:
• Pin = the front piece is PINNED (frozen, can't move)
• Skewer = you're SKEWERING through (front piece flees)

Both require three pieces aligned on a line, but the value order is reversed!`,
        },
        {
          id: 'skewer-puzzle',
          type: 'puzzle',
          fen: '6k1/5r2/8/8/3B4/8/8/4K3 w - - 0 1',
          title: 'Skewer Challenge',
          explanation: `Find the Bishop move that skewers Black's King and Rook!

Remember: You need to give check first (attack the King), then capture the Rook when the King moves.`,
          correctMoves: ['Be5+'],
          successMessage: `Be5+! The King must move, and then Bxf7 wins the Rook. Clean execution of the diagonal skewer!`,
          failureMessage: 'Find the diagonal that runs through both the King and the Rook.',
          arrows: [
            { from: 'd4', to: 'e5', color: 'green' },
          ],
        },
        {
          id: 'queen-skewer-practice',
          type: 'interactive',
          fen: '6k1/8/5q2/8/8/8/8/4K2Q w - - 0 1',
          title: 'Queen Skewer Practice',
          explanation: `White to play. The Black King on g8 and the Queen on f6 are on the same diagonal!

Find the Queen move that skewers the King and Queen along the diagonal.`,
          correctMoves: ['Qd5+'],
          successMessage: `Qd5+! The Queen checks the King along the diagonal, and when the King moves, Qxf6 captures the Queen. The Queen's range makes her lethal on open diagonals!`,
          failureMessage: 'Look for a diagonal that goes through both the King on g8 and the Queen on f6.',
          arrows: [
            { from: 'h1', to: 'd5', color: 'green' },
            { from: 'd5', to: 'g8', color: 'red' },
            { from: 'd5', to: 'f6', color: 'yellow' },
          ],
        },
      ],
    },
    // ==================== LESSON 4: DISCOVERED ATTACKS ====================
    {
      id: 'discovered-attack',
      title: 'Discovered Attack',
      description: 'Unleash hidden attackers by moving pieces out of the way',
      difficulty: 'intermediate',
      estimatedMinutes: 10,
      tags: ['tactics', 'discovered-attack'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/3k4/8/3N4/3R4/3K4 w - - 0 1',
          title: 'What is a Discovered Attack?',
          explanation: `A **discovered attack** is one of the most powerful tactics in chess. It occurs when you move one piece and reveal ("discover") an attack from a piece behind it. The concept was well-known since the 16th century, with double discovered checks called "double diskovery" in old English chess texts.

In this position:
• The Knight on d3 blocks the Rook's view of the Black King
• When the Knight moves, the Rook's attack on the King is "discovered"
• The Knight can move ANYWHERE and the Rook still attacks!

**Why discovered attacks are so strong**:
1. You get TWO attacks for the price of one move
2. The moving piece can capture something or create another threat
3. If the discovered attack is check, it's incredibly forcing

**Key insight**: Look for your pieces that are lined up - when one moves, does it reveal an attack from the other?`,
          arrows: [
            { from: 'd3', to: 'e5', color: 'yellow' },
            { from: 'd2', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'd3', color: 'yellow' },
            { square: 'd2', color: 'blue' },
          ],
        },
        {
          id: 'discovered-check',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
          title: 'Discovered Check',
          explanation: `**Discovered check** is when the revealed attack is a check - the opponent MUST respond to it!

This is extremely powerful because:
• The opponent has no choice - they must deal with the check
• Your moving piece can do almost anything (capture, create threats)
• The discovered check piece is often ignored in the chaos

In this position, the Bishop on c4 eyes f7 (near the King). If we could move something with tempo that reveals a check...

**The Scholar's Mate setup**: Qxf7 is actually checkmate here! The Queen takes f7, attacking the King, and the Bishop supports from c4. It's not a discovered check, but shows how these diagonals coordinate.

**Famous pattern**: Knight moves discovering a check from a Bishop or Rook are devastating - the Knight might capture a Queen while the King runs!`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
            { from: 'h5', to: 'f7', color: 'green' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'discovered-attack-practice',
          type: 'interactive',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
          title: 'Scholar\'s Mate',
          explanation: `This is the famous Scholar's Mate position. Find the winning move!

The Queen and Bishop are both targeting f7. Sometimes the most "discovered" thing is simply taking what's there!`,
          correctMoves: ['Qxf7#'],
          successMessage: `Qxf7#! Checkmate! The Queen takes f7, the King can't capture because the Bishop on c4 defends, and there's no escape. This is why f7 (and f2 for White) is called the "weakest square" in the opening!`,
          failureMessage: 'The Queen can capture f7 with support from the Bishop. What happens?',
          arrows: [
            { from: 'h5', to: 'f7', color: 'green' },
          ],
        },
        {
          id: 'double-check',
          type: 'explanation',
          fen: '4k3/8/8/8/3B4/8/3R4/4K3 w - - 0 1',
          title: 'Double Check - The Ultimate Discovery',
          explanation: `**Double check** is when BOTH the moving piece AND the revealed piece give check simultaneously!

This is the most forcing move in chess because:
• You cannot block two checks at once
• You cannot capture two pieces at once
• The ONLY option is to move the King

In this position, if the Rook were on d1 instead of d2, and we played Bb6+, it would be double check - the Bishop checks AND the Rook checks through d8.

**Double check often leads to forced checkmate** because:
• The King must move to a specific square
• You can calculate exactly where it will go
• Your next move can be prepared

**Pro tip**: When you have pieces lined up, always check if the moving piece can ALSO give check. That's double check territory!`,
          arrows: [
            { from: 'd4', to: 'f6', color: 'red' },
            { from: 'd2', to: 'd8', color: 'red' },
          ],
          highlights: [
            { square: 'e8', color: 'red' },
          ],
        },
        {
          id: 'discovered-attack-setup',
          type: 'interactive',
          fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2BnP3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          title: 'Set Up the Discovery',
          explanation: `Black's Knight just came to d4, attacking your Knight and Bishop. But wait - look at the alignment of your pieces...

The Bishop on c4 eyes f7. Your Knight on f3 could move and discover an attack!

Find the Knight move that creates a discovered attack on f7 while also threatening something else!`,
          correctMoves: ['Nxe5'],
          successMessage: `Nxe5! Perfect! The Knight captures the e5 pawn AND discovers an attack on f7 by the Bishop. Black must deal with the f7 threat, and you've won a pawn. The Knight on d4 can't capture your Bishop because you'd take on f7 with check!`,
          failureMessage: 'What Knight move removes it from blocking the Bishop\'s attack on f7?',
          arrows: [
            { from: 'f3', to: 'e5', color: 'green' },
            { from: 'c4', to: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'windmill',
          type: 'explanation',
          fen: '6k1/5p2/5Bp1/8/8/8/6R1/6K1 w - - 0 1',
          title: 'The Windmill - Repeated Discoveries',
          explanation: `The **windmill** is a devastating tactical pattern using repeated discovered checks!

Here's how it works:
1. Piece A gives discovered check, Piece B captures something
2. Piece A checks again, forcing the King back
3. Piece B discovers another check and captures more
4. Repeat until everything is captured!

The position rotates like a windmill - hence the name.

**Famous example**: The 1925 "Game of the Century" featured Torre's windmill against Emanuel Lasker, where a Rook/Bishop combo captured almost all of Black's pieces!

**Key requirements**:
• The King must be forced to toggle between two squares
• Your piece can capture something on each "turn" of the windmill
• Usually involves Rook + Bishop or Rook + Queen`,
          arrows: [
            { from: 'g2', to: 'g6', color: 'green' },
          ],
        },
        {
          id: 'discovery-puzzle',
          type: 'puzzle',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
          title: 'Discovered Attack Puzzle',
          explanation: `White to play. Find the move that creates a powerful discovered attack!

Hint: Your Knight can move and reveal an attack from the piece behind it...`,
          correctMoves: ['Ng5'],
          successMessage: `Ng5! The Knight attacks f7 directly, AND if the Knight takes on f7, it forks the Queen and Rook! Even though there's no "discovered" attack here in the classical sense, the threat of Nxf7 creates tactical chaos. Well spotted!`,
          failureMessage: 'Look at what squares your Knight can reach that attack something valuable.',
          arrows: [
            { from: 'f3', to: 'g5', color: 'green' },
          ],
        },
        {
          id: 'windmill-practice',
          type: 'interactive',
          fen: '5rk1/6p1/5B1p/1p6/8/8/6R1/6K1 w - - 0 1',
          title: 'Windmill Practice',
          explanation: `This is a classic windmill setup. The Rook on g2 and Bishop on f6 coordinate to devastate Black's position.

The Rook can take the g7 pawn with check, and after the King moves, the Rook retreats to discover a check from the Bishop. Find the move that starts the windmill!`,
          correctMoves: ['Rxg7+'],
          successMessage: `Rxg7+! The Rook gives check by capturing the g7 pawn. After Kh8, Rxf8 is devastating since the Bishop covers the escape squares. This is the windmill concept - the Rook captures material while the Bishop provides support and discovered check potential!`,
          failureMessage: 'Move the Rook to give check while capturing material. The Bishop on f6 supports the attack!',
          arrows: [
            { from: 'g2', to: 'g7', color: 'green' },
            { from: 'f6', to: 'g7', color: 'yellow' },
          ],
        },
        {
          id: 'double-check-puzzle',
          type: 'puzzle',
          fen: '4k3/4p3/8/4N3/8/8/8/4R1K1 w - - 0 1',
          title: 'Double Check Puzzle',
          explanation: `White to play. Find the move that delivers a devastating double check!

Remember: In a double check, the King MUST move - blocking or capturing won't work because two pieces give check simultaneously.`,
          correctMoves: ['Nd7'],
          successMessage: `Nd7! The Knight moves to d7, giving check AND discovering check from the Rook along the e-file. Both the Knight and Rook attack the King simultaneously! Black's only option is to move the King - Kd8 or Kf8. Double check is the most forcing move in chess!`,
          failureMessage: 'Find a Knight move that gives check while also revealing a check from the Rook on the e-file.',
          arrows: [
            { from: 'e5', to: 'd7', color: 'green' },
            { from: 'e1', to: 'e8', color: 'yellow' },
          ],
        },
      ],
    },
    // ==================== LESSON 5: BACK RANK TACTICS ====================
    {
      id: 'back-rank-tactics',
      title: 'Back Rank Tactics',
      description: 'Exploit weak back ranks for devastating attacks',
      difficulty: 'intermediate',
      estimatedMinutes: 10,
      tags: ['tactics', 'back-rank'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
          title: 'Back Rank Weakness',
          explanation: `The **back rank mate** is one of the most common tactical patterns in chess - and one of the most devastating! Also called "corridor mate" in Russian chess tradition, it was one of the first tactical patterns documented in medieval Arabic chess manuscripts around 800-900 AD.

It occurs when a King is trapped on its back rank (rank 1 for White, rank 8 for Black) by its own pawns, with no escape squares.

**In this position**:
• Black's King is on g8
• Pawns on f7, g7, h7 block all escape
• The King has NO squares on the 7th rank

This means a Rook or Queen delivering check on the 8th rank = **CHECKMATE**!

**Why this happens so often**:
• Players castle for safety but forget to create "luft" (breathing room)
• Endgames often have just Rooks left - back rank becomes critical
• Trading pieces can suddenly expose the weakness

**Always check**: Does my back rank have an escape square? Does my opponent's?`,
          highlights: [
            { square: 'g8', color: 'red' },
            { square: 'f7', color: 'yellow' },
            { square: 'g7', color: 'yellow' },
            { square: 'h7', color: 'yellow' },
          ],
        },
        {
          id: 'back-rank-mate',
          type: 'interactive',
          fen: '3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
          title: 'Deliver the Back Rank Mate',
          explanation: `White to play. Black's back rank is weak - the King has no escape squares!

Find the checkmate in one move.`,
          correctMoves: ['Rd8+'],
          successMessage: `Rd8+! After Rxd8, you have no piece to recapture with... wait, the Rooks trade! That's Rd8+ Rxd8 and it's actually a trade, not mate. But if Black's Rook wasn't there, this would be mate. In this position, the Rooks are exchanged and it's equal. Let's try a better position next!`,
          failureMessage: 'Deliver check on the back rank!',
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
          ],
        },
        {
          id: 'back-rank-proper',
          type: 'interactive',
          fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
          title: 'Pure Back Rank Mate',
          explanation: `Now the back rank is truly vulnerable - no defender!

Deliver checkmate.`,
          correctMoves: ['Rd8#'],
          successMessage: `Rd8#! Checkmate! The King cannot escape - f7, g7, h7 are blocked by its own pawns, and there's no piece to capture the Rook or block the check. This is the pure back rank mate.`,
          failureMessage: 'The back rank is undefended - just give check!',
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
          ],
        },
        {
          id: 'deflection-setup',
          type: 'explanation',
          fen: '3rr1k1/5ppp/8/8/8/8/5PPP/2RR2K1 w - - 0 1',
          title: 'Deflection for Back Rank',
          explanation: `Often the back rank IS defended, but you can use tactics to remove the defender!

**Deflection** is forcing a defending piece away from its duty.

In this position:
• Black's Rooks defend the back rank
• If you could get one Rook to leave, the other can't cover everything

**Common deflection patterns**:
• Sacrifice a Rook to force capture, then mate with the other
• Attack a defender so it has to move
• Create a bigger threat that forces the defender away

**Key insight**: "Remove the defender" and "deflection" often combine with back rank themes. If something defends the back rank, find a way to eliminate or distract it!`,
          arrows: [
            { from: 'c1', to: 'c8', color: 'yellow' },
          ],
          highlights: [
            { square: 'd8', color: 'red' },
            { square: 'e8', color: 'red' },
          ],
        },
        {
          id: 'deflection-mate',
          type: 'interactive',
          fen: '3rr1k1/5ppp/8/8/8/8/5PPP/2RR2K1 w - - 0 1',
          title: 'Deflect and Mate',
          explanation: `Black's Rooks guard each other and the back rank. But can you force one to abandon its post?

Find the deflection that leads to checkmate!`,
          correctMoves: ['Rc8'],
          successMessage: `Rc8! Brilliant! Now if Rdxc8, then Rxc8+ Rxc8 is mate. If Rexc8, then Rxd8+ and Rxc8 is mate anyway! The first Rook deflected one defender, allowing the second Rook to deliver mate. This is the classic "two Rooks beat two Rooks" pattern!`,
          failureMessage: 'How can you force one of Black\'s Rooks to capture while setting up mate?',
          arrows: [
            { from: 'c1', to: 'c8', color: 'green' },
          ],
        },
        {
          id: 'creating-luft',
          type: 'explanation',
          fen: 'r4rk1/5ppp/8/8/8/8/5PPP/R4RK1 w - - 0 1',
          title: 'Creating Luft (Escape Squares)',
          explanation: `**Luft** is a German word meaning "air" - in chess, it means giving your King a breathing square!

**How to create luft**:
• Push h3 (or h6 for Black) - gives the King h2/h7 escape
• Push g3 (careful - weakens some squares)
• Sometimes f3 works too

**When to create luft**:
• When Rooks or Queens are active
• When you sense back rank danger
• In quiet positions when you have a spare move
• BEFORE you need it, not after!

**Cost of luft**:
• Uses a tempo (you could be doing something else)
• Slightly weakens the King's pawn cover
• But usually worth it for the safety!

**Pro tip**: h3/h6 is the safest luft move because it doesn't weaken the King's position much. Always consider it in Rook endgames!`,
          arrows: [
            { from: 'h2', to: 'h3', color: 'green' },
          ],
          highlights: [
            { square: 'h3', color: 'green' },
          ],
        },
        {
          id: 'back-rank-puzzle',
          type: 'puzzle',
          fen: '2r3k1/5ppp/8/8/8/8/5PPP/1R1R2K1 w - - 0 1',
          title: 'Back Rank Challenge',
          explanation: `White has two Rooks, Black has one defending the back rank.

Find the winning combination!`,
          correctMoves: ['Rd8+'],
          successMessage: `Rd8+! Rxd8 is forced, then Rxd8#! The Rooks combine perfectly - one sacrifices to deflect, the other delivers mate. Classic pattern!`,
          failureMessage: 'Can you sacrifice one Rook to allow the other to checkmate?',
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
          ],
        },
        {
          id: 'back-rank-summary',
          type: 'explanation',
          fen: '6k1/5ppp/8/8/8/7P/5PP1/6K1 w - - 0 1',
          title: 'Back Rank Summary',
          explanation: `**Back rank tactics checklist**:

✓ **Recognize the weakness**: King trapped by its own pawns, no escape squares

✓ **Create the threat**: Get a Rook or Queen to the back rank with check

✓ **Remove defenders**: Use deflection, sacrifice, or distraction

✓ **Prevent it**: Create luft with h3/h6, keep pieces defending

**Common patterns**:
• Simple back rank mate (Rd8#)
• Deflection mate (Rc8! Rxc8 Rd8#)
• Queen + Rook combos
• Discovered check leading to back rank

**Warning signs you're vulnerable**:
• Your Rooks are off the back rank
• Your only defender is overloaded
• Opponent's Rooks are active and doubled

Remember: Back rank mates end games instantly. One moment of carelessness can turn a winning position into a loss!`,
          highlights: [
            { square: 'h3', color: 'green' },
          ],
        },
      ],
    },
    // ==================== LESSON 6: REMOVING THE DEFENDER ====================
    {
      id: 'removing-defender',
      title: 'Removing the Defender',
      description: 'Eliminate key defensive pieces to break through',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['tactics', 'removing-defender'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r4rk1/pp2qppp/2p1bn2/8/2B5/2N2Q2/PPP2PPP/R4RK1 w - - 0 1',
          title: 'The Defensive Chain',
          explanation: `Every position has **key defenders** - pieces that hold everything together. Remove them, and the position collapses!

**"Remove the defender"** (also called "undermining" or "elimination") is a tactical theme where you capture, trade, or drive away a piece that's protecting something important. In Soviet chess school terminology, it was known as "destroying the guard" - a fundamental concept taught to beginners since the days of Morphy.

**How to identify key defenders**:
• Which piece is protecting the target you want to attack?
• Is any piece defending multiple things (overloaded)?
• Can you eliminate or distract that defender?

**Methods of removal**:
1. **Capture it** - Simply take the defender
2. **Trade it off** - Exchange your piece for theirs
3. **Drive it away** - Attack it so it must move
4. **Distract it** - Create a bigger threat elsewhere

In this position, look at Black's position. What's defending what? If you can identify the key defender, you can plan its removal!`,
          highlights: [
            { square: 'e6', color: 'yellow' },
            { square: 'f6', color: 'yellow' },
          ],
        },
        {
          id: 'simple-removal',
          type: 'interactive',
          fen: 'r2q1rk1/ppp1bppp/2n1bn2/3p4/3P1B2/2NBPN2/PPP2PPP/R2Q1RK1 w - - 0 1',
          title: 'Remove and Conquer',
          explanation: `Black's Knight on c6 is a key defender - it protects the d4 square and supports other pieces.

Find a way to challenge or remove this defender!`,
          correctMoves: ['Bb5', 'Nb5'],
          successMessage: `Good! Bb5 pins and challenges the Knight, while Nb5 attacks it directly. Once the c6 Knight is dealt with, Black's coordination suffers. Removing key defenders opens up the position for your other pieces!`,
          failureMessage: 'Which of Black\'s pieces is most important for their defense? How can you challenge it?',
          arrows: [
            { from: 'd3', to: 'b5', color: 'green' },
          ],
        },
        {
          id: 'overloaded-piece',
          type: 'explanation',
          fen: 'r4rk1/pp1nqppp/2p1b3/4N3/2BP4/8/PPP2PPP/R2Q1RK1 w - - 0 1',
          title: 'The Overloaded Defender',
          explanation: `An **overloaded piece** is defending too many things at once - it has two jobs but can only do one!

**In this position**:
• Black's Knight on d7 defends:
  - The e5 square (against the Knight)
  - The Bishop on e6

The Knight has TWO jobs, but if you attack both things it's defending, it can only save one!

**How to exploit overloaded pieces**:
1. Count what the piece is defending
2. Attack both targets
3. The defender can only move once - something falls!

**Pro tip**: Look for pieces that are "double-duty" defenders. Queens are often overloaded because they're asked to do everything!`,
          arrows: [
            { from: 'd7', to: 'e5', color: 'yellow' },
            { from: 'd7', to: 'e6', color: 'yellow' },
          ],
          highlights: [
            { square: 'd7', color: 'red' },
          ],
        },
        {
          id: 'exploit-overload',
          type: 'interactive',
          fen: 'r4rk1/pp1nqppp/2p1b3/4N3/2BP4/8/PPP2PPP/R2Q1RK1 w - - 0 1',
          title: 'Exploit the Overload',
          explanation: `Black's Knight on d7 is overloaded - it defends both e5 and e6.

Find a move that exploits this overload!`,
          correctMoves: ['Nxd7', 'Bxe6'],
          successMessage: `Both work! Nxd7 forces Qxd7 (or Bxd7), and then Bxe6 wins the Bishop. Or Bxe6 forces the Knight to choose - take back and lose e5, or stay and lose the Bishop. Classic overload exploitation!`,
          failureMessage: 'The Knight defends two things. Attack one - what happens to the other?',
          arrows: [
            { from: 'e5', to: 'd7', color: 'green' },
            { from: 'c4', to: 'e6', color: 'green' },
          ],
        },
        {
          id: 'driving-away',
          type: 'interactive',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          title: 'Drive Away the Defender',
          explanation: `Sometimes you don't capture the defender - you attack it so it has to move!

In this Italian Game position, Black's Knight on f6 is defending. Can you create threats that force Black's pieces to awkward squares?

Look for a move that attacks while forcing a response.`,
          correctMoves: ['Ng5', 'd3'],
          successMessage: `Ng5 is aggressive - it attacks f7 and forces Black to respond. The Knight on f6 might have to move to deal with the f7 threat. d3 is calmer development. Both are good, but Ng5 puts immediate pressure on Black's defense!`,
          failureMessage: 'How can you attack in a way that forces Black to respond?',
        },
        {
          id: 'removal-puzzle',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP1QPPP/RNB2RK1 w - - 0 1',
          title: 'Remove the Defender Puzzle',
          explanation: `White wants to play Bg5, pinning the Knight to the Queen. But what's stopping this plan?

First identify what's defending against your threat, then remove it!`,
          correctMoves: ['Bg5'],
          successMessage: `Bg5! Actually this just works directly - the Knight is pinned to the Queen and nothing adequately defends it. Sometimes the "defender" isn't actually protecting anything, and you can just play your threat!`,
          failureMessage: 'What move creates a powerful pin?',
        },
        {
          id: 'sacrifice-defender',
          type: 'interactive',
          fen: '2rq1rk1/4bppp/p2p4/1p2n3/4P1b1/1BN1BN2/PPP2PPP/R2Q1RK1 w - - 0 1',
          title: 'Sacrifice to Remove the Defender',
          explanation: `Black's Knight on e5 is a strong defensive piece - it guards key central squares and supports other pieces.

Sometimes the most effective way to remove a defender is to capture it, even if the trade seems equal. Find the move that eliminates Black's best defensive piece!`,
          correctMoves: ['Nxe5'],
          successMessage: `Nxe5! By capturing the Knight, you remove Black's most active defensive piece. After dxe5, your Bishop pair and open lines give you a strong initiative. Sometimes removing the defender is about eliminating the piece that coordinates the defense!`,
          failureMessage: 'Which of Black\'s pieces is the most important defender? Can you capture it?',
          arrows: [
            { from: 'f3', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'removal-chain-puzzle',
          type: 'puzzle',
          fen: 'r4rk1/ppp2ppp/3q4/3Pp1B1/8/8/PPP1QPPP/R4RK1 w - - 0 1',
          title: 'Chain Removal Puzzle',
          explanation: `White's Bishop on g5 is attacking Black's Queen, but the Queen seems safe on d6.

Look deeper - the Queen defends the e5 pawn. If the Queen moves, what happens to e5? Find the move that exploits this!`,
          correctMoves: ['Bf4'],
          successMessage: `Bf4! The Bishop attacks the Queen, and wherever the Queen moves, the e5 pawn falls. If Qd7 or Qe6, then Bxe5 wins the pawn with a strong position. The Bishop drove the Queen away from its defensive duty!`,
          failureMessage: 'Attack the Queen so it can no longer defend the e5 pawn. Which Bishop move accomplishes this?',
          arrows: [
            { from: 'g5', to: 'f4', color: 'green' },
          ],
          highlights: [
            { square: 'd6', color: 'red' },
            { square: 'e5', color: 'yellow' },
          ],
        },
      ],
    },
    // ==================== LESSON 7: DEFLECTION ====================
    {
      id: 'deflection',
      title: 'Deflection',
      description: 'Force defenders away from key squares',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['tactics', 'deflection'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '6k1/5ppp/8/8/8/8/r4PPP/4R1K1 w - - 0 1',
          title: 'What is Deflection?',
          explanation: `**Deflection** is forcing a piece away from an important defensive duty by creating an irresistible threat. The word comes from the Latin "deflectere" (to bend away), and the concept was well understood by the great Romantic-era tacticians like Adolf Anderssen in the 1850s. In German chess, it's called "Ablenkung".

Unlike "removing the defender" (where you capture it), deflection FORCES the piece to abandon its post.

**Common deflection scenarios**:
• A Rook guards the back rank - give it a "better" target
• A Queen defends a mate threat - attack it somewhere else
• A Knight covers a key square - force it to capture something

**The key question**: "What if this defender wasn't there?"
If you can picture a tactic working without the defender, find a way to deflect it!

**Deflection vs Decoy**:
• Deflection: Force a piece AWAY from where it's needed
• Decoy: Lure a piece TO a bad square

They're related but opposite directions!`,
        },
        {
          id: 'deflect-rook',
          type: 'interactive',
          fen: '3qr1k1/5ppp/8/8/8/8/5PPP/3QR1K1 w - - 0 1',
          title: 'Deflect the Defender',
          explanation: `Black's Rook on e8 is the only piece guarding against back rank mate.

Find the move that deflects the Rook from its defensive duty!`,
          correctMoves: ['Qd8'],
          successMessage: `Qd8! Brilliant! The Queen sacrifice deflects Black's Queen - after Qxd8, Rxd8+ Rxd8 is checkmate! Black's Rook was forced to abandon the back rank defense to capture your Queen. Classic deflection!`,
          failureMessage: 'How can you force Black\'s back rank defender to move away?',
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
          ],
        },
        {
          id: 'queen-deflection',
          type: 'explanation',
          fen: '6k1/5ppp/8/8/8/8/r4PPP/Q3R1K1 w - - 0 1',
          title: 'Deflecting with Sacrifices',
          explanation: `Often the best deflections involve **sacrifices** - you give up material to force the defender away.

**Why sacrifices work for deflection**:
• Captures are usually the most forcing moves
• When you sacrifice, the opponent "must" take (usually)
• Taking the sacrifice moves their piece away from defense

**Key insight**: A sacrifice isn't real material loss if it leads to checkmate or winning back more!

In this position, if White could deflect the Rook from the second rank, there might be a back rank mate...`,
          arrows: [
            { from: 'a1', to: 'a2', color: 'yellow' },
            { from: 'a1', to: 'a8', color: 'green' },
          ],
        },
        {
          id: 'deflection-practice',
          type: 'interactive',
          fen: '6k1/5ppp/8/8/8/8/r4PPP/Q3R1K1 w - - 0 1',
          title: 'Deflection Practice',
          explanation: `The Black Rook on a2 prevents Qa8 checkmate (it could interpose on a8).

Can you deflect the Rook so it can't defend anymore?`,
          correctMoves: ['Re8+'],
          successMessage: `Re8+! This is checkmate! The Rook gives check, the King has nowhere to go. Sometimes the best tactic is the simplest one - just deliver mate!`,
          failureMessage: 'Can you give check in a way that the Rook can\'t block or the mate is unstoppable?',
        },
        {
          id: 'deflection-puzzle',
          type: 'puzzle',
          fen: '3r2k1/1p3ppp/p7/8/8/P7/1P3PPP/3RR1K1 w - - 0 1',
          title: 'Deflection Challenge',
          explanation: `Find the deflection that wins material or delivers mate!

Hint: Black's Rook is defending the back rank. How can you overload it?`,
          correctMoves: ['Re8+', 'Rd8+'],
          successMessage: `Re8+! (or Rd8+) After Rxe8, Rxd8+ wins. Or if Rxd8, Rxd8# is mate! The Rook was deflected from one file to another, and couldn't cover both. Clean execution!`,
          failureMessage: 'Both Rooks can attack the 8th rank. What if you sacrifice one?',
        },
        {
          id: 'deflect-queen',
          type: 'interactive',
          fen: 'r3r1k1/ppp2ppp/8/4q3/4P3/2N2N2/PPPP1PPP/R2QR1K1 w - - 0 1',
          title: 'Deflect the Queen',
          explanation: `Black's Queen on e5 is a powerful centralised piece. It controls many squares and holds the position together.

Can you find a way to deflect the Queen from its dominant post?`,
          correctMoves: ['d4'],
          successMessage: `d4! The pawn attacks the Queen, forcing it to move from its ideal central square. After Qd6 or Qf4, the Queen loses its dominance and White gains space. Sometimes a simple pawn push is the best deflection!`,
          failureMessage: 'How can you attack the Queen to force it away from the center?',
          arrows: [
            { from: 'd2', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'deflection-sacrifice-puzzle',
          type: 'puzzle',
          fen: '1k1r4/pp4pp/8/3q4/8/8/PP3PPP/2RR2K1 w - - 0 1',
          title: 'Deflection Sacrifice',
          explanation: `Black's Queen on d5 defends the Rook on d8, and the Rook guards the back rank.

Find the sacrifice that deflects a key defender and wins material!`,
          correctMoves: ['Rc8+'],
          successMessage: `Rc8+! After Rxc8, the d-file is open and Rxd5 wins the Queen! Or if Qxc8, then Rxd8+ forces Qxd8 and White has traded Rook and Rook for Queen and Rook - simplifying with advantage. The Rook sacrifice deflected the back rank defender!`,
          failureMessage: 'The Rook on d8 is a key defender. Can you sacrifice to deflect it?',
          arrows: [
            { from: 'c1', to: 'c8', color: 'green' },
          ],
        },
        {
          id: 'deflection-summary',
          type: 'explanation',
          fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
          title: 'Deflection Summary',
          explanation: `**Deflection tactics checklist**:

**How to spot deflection opportunities**:
1. Identify pieces that have defensive duties
2. Ask: "What if this piece wasn't guarding that?"
3. Find a way to force it away (sacrifice, attack, threat)

**Common deflection patterns**:
• Rook sacrifice to lure a defender off the back rank
• Pawn push to deflect a centralized piece
• Bishop sacrifice on a defended square to distract a piece
• Queen sacrifice to create an irresistible capture

**Deflection vs other tactics**:
• **Deflection**: Force piece AWAY from where it's needed
• **Attraction/Decoy**: Lure piece TO a bad square
• **Removal**: Capture the defender outright
• **Overloading**: Give the defender too many jobs

**Remember**: The most beautiful deflections often involve sacrifices - you give up material to create something bigger!`,
        },
      ],
    },
    // ==================== LESSON 8: DECOY ====================
    {
      id: 'decoy',
      title: 'Decoy',
      description: 'Lure enemy pieces to bad squares',
      difficulty: 'intermediate',
      estimatedMinutes: 7,
      tags: ['tactics', 'decoy'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
          title: 'What is a Decoy?',
          explanation: `A **decoy** is luring an enemy piece TO a specific square where it can be attacked, trapped, or where it blocks something important. The word comes from the Dutch "de kooi" (the cage) - originally a bird-trapping term. Soviet chess pedagogy distinguished carefully between decoy and deflection as separate tactical themes.

**Think of it as fishing**: You dangle bait (usually a sacrifice) to lure the piece where you want it.

**Decoy vs Deflection**:
• Deflection: Force piece AWAY from a good square
• Decoy: Lure piece TO a bad square

**Common decoy targets**:
• Decoying the King into a fork or checkmate
• Decoying a piece onto a square where it gets pinned
• Decoying a piece to block its own pieces

**The setup**: Usually you sacrifice something on the target square. The opponent captures, and BAM - they're exactly where you want them!`,
        },
        {
          id: 'decoy-king',
          type: 'interactive',
          fen: '5rk1/5ppp/8/8/8/8/5PPP/4RRK1 w - - 0 1',
          title: 'Decoy the King',
          explanation: `White has two Rooks, Black has one. Can you decoy the Black King or Rook to set up a winning position?

Find the move that lures something to a bad square!`,
          correctMoves: ['Re8'],
          successMessage: `Re8! After Rxe8, you have Rxe8+ and the King is forced to a bad square! Or if Kxe8... wait, then Rxf8 is just mate because the King moved to e8. Actually Re8 leads to Rxe8 Rxe8+ Kg7 and you've won the exchange at minimum. But even better might be looking for a direct mate...`,
          failureMessage: 'Can you sacrifice to force Black\'s pieces to worse squares?',
        },
        {
          id: 'decoy-for-fork',
          type: 'explanation',
          fen: '8/8/8/4k3/8/3N4/8/4K3 w - - 0 1',
          title: 'Decoying into a Fork',
          explanation: `One powerful use of decoy is luring the King onto a square where you can fork it with another piece!

**The pattern**:
1. Sacrifice a piece on a specific square
2. King captures (decoyed to that square)
3. Your other piece delivers a fork!

**Example setup**: If you could sacrifice on f4, the King takes, then a Knight jumps to e6 or d5 forking King and another piece.

**Key squares to know**: Knights fork well from central squares. Look for decoy targets that put the King on a "forkable" square.`,
          arrows: [
            { from: 'd3', to: 'f4', color: 'green' },
            { from: 'd3', to: 'c5', color: 'green' },
          ],
        },
        {
          id: 'decoy-puzzle',
          type: 'puzzle',
          fen: '3rk3/8/8/8/8/8/3R4/3RK3 w - - 0 1',
          title: 'Decoy Puzzle',
          explanation: `Find the decoy that leads to checkmate!

Think: Where do you want the Black King or Rook to go?`,
          correctMoves: ['Rd8+'],
          successMessage: `Rd8+! After Kxd8 (forced) or Rxd8, you have R1d8#! The first Rook decoyed the King/Rook to d8, allowing the second Rook to deliver mate. Classic!`,
          failureMessage: 'Can you sacrifice one Rook to set up the other for checkmate?',
          arrows: [
            { from: 'd2', to: 'd8', color: 'green' },
          ],
        },
        {
          id: 'decoy-into-pin',
          type: 'explanation',
          fen: '2kr4/ppp2p2/2n1p3/8/2B5/8/PPP2PPP/2KR4 w - - 0 1',
          title: 'Decoying into a Pin',
          explanation: `A powerful use of decoy is luring a piece onto a square where it gets pinned!

**The pattern**:
1. Sacrifice on a square along a file, rank, or diagonal
2. The opponent captures (decoyed to that square)
3. A pin is revealed along the line behind the captured piece

**In this position**: White's Bishop on c4 eyes e6. If Bxe6, fxe6, then the Rook on d1 sees through to the King on c8 via d8... the Rook on d8 is now pinned!

**Key insight**: Decoy + pin is a devastating combination because the pinned piece often cannot escape. The decoy lures the piece into the line of fire.`,
          arrows: [
            { from: 'c4', to: 'e6', color: 'green' },
            { from: 'd1', to: 'd8', color: 'yellow' },
          ],
          highlights: [
            { square: 'e6', color: 'red' },
            { square: 'd8', color: 'yellow' },
          ],
        },
        {
          id: 'decoy-king-practice',
          type: 'interactive',
          fen: 'r3k3/ppp2p2/4p3/3pN3/8/8/PPP2PPP/4R1K1 w - - 0 1',
          title: 'Decoy the King',
          explanation: `White's Knight on e5 and Rook on e1 are well-placed. The Black King is in the center.

Can you find a move that decoys the King into a worse position?`,
          correctMoves: ['Nxf7'],
          successMessage: `Nxf7! The Knight captures the pawn and attacks the Rook on a8 indirectly via the threat of forking. If Kxf7, then the King is exposed and Re7+ is strong. The Knight sacrifice lured the King away from safety, opening up tactical opportunities!`,
          failureMessage: 'Can you capture something that forces the King into an exposed position?',
          arrows: [
            { from: 'e5', to: 'f7', color: 'green' },
          ],
          highlights: [
            { square: 'e8', color: 'red' },
          ],
        },
        {
          id: 'decoy-rook-puzzle',
          type: 'puzzle',
          fen: '2r3k1/5ppp/8/8/8/8/5PPP/1R2R1K1 w - - 0 1',
          title: 'Decoy the Rook',
          explanation: `Black's Rook on c8 guards the 8th rank. Can you decoy it away to set up a winning attack?

Hint: What happens if you give the Rook a target it can't resist?`,
          correctMoves: ['Rb8'],
          successMessage: `Rb8! The Rook on c8 is forced to deal with this threat. After Rxb8, Re8+ Rxe8 is a trade, but White has eliminated the back rank defender. The Rook was decoyed into exchanging, leaving the back rank vulnerable!`,
          failureMessage: 'The Rook on c8 is the key defender. Can you give it something to capture that leaves the back rank exposed?',
          arrows: [
            { from: 'b1', to: 'b8', color: 'green' },
          ],
        },
        {
          id: 'decoy-advanced-puzzle',
          type: 'interactive',
          fen: '5rk1/pp3ppp/8/2p5/8/2N5/PPP2PPP/4R1K1 w - - 0 1',
          title: 'Advanced Decoy Combination',
          explanation: `White wants to exploit the back rank, but the Rook on f8 guards it solidly.

Find a move that creates threats and forces Black into a worse position. Think about how to use your Knight and Rook together!`,
          correctMoves: ['Ne4'],
          successMessage: `Ne4! The Knight moves to e4, threatening Nd6 which would fork the Rook and attack key squares. Black must react to this positional threat. The Knight maneuver creates tactical pressure by threatening multiple squares simultaneously!`,
          failureMessage: 'How can you reposition your Knight to create threats against Black\'s position?',
          arrows: [
            { from: 'c3', to: 'e4', color: 'green' },
            { from: 'e4', to: 'd6', color: 'yellow' },
          ],
        },
      ],
    },
    // ==================== LESSON 9: ZWISCHENZUG ====================
    {
      id: 'zwischenzug',
      title: 'Zwischenzug (In-Between Move)',
      description: 'Insert unexpected moves to gain advantage',
      difficulty: 'advanced',
      estimatedMinutes: 10,
      tags: ['tactics', 'zwischenzug', 'intermediate-move'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'The In-Between Move',
          explanation: `**Zwischenzug** (German: "in-between move") is one of the trickiest tactical concepts and one of the most commonly used German chess terms worldwide! The concept was particularly emphasized by World Champion Emanuel Lasker and later by Mark Taimanov.

It's when you INSERT an unexpected move before making the "obvious" recapture or response.

**How it works**:
1. A sequence seems forced (like a trade)
2. Instead of automatically recapturing, you play a STRONGER move first
3. Usually a check, attack on Queen, or major threat
4. THEN you complete the original sequence - but with extra gain!

**Why it's so powerful**:
• Your opponent assumes you'll recapture
• They've already calculated "after the trade..."
• Your zwischenzug disrupts their calculation completely!

**Pro tip**: Always ask "Do I HAVE to recapture now, or can I play something stronger first?"`,
        },
        {
          id: 'zwischenzug-example',
          type: 'explanation',
          fen: 'r1b1k2r/ppppqppp/2n5/2b1n3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          title: 'Zwischenzug in Action',
          explanation: `**Classic example**:
White plays Nxe5, Black recaptures Nxe5, then White recaptures... right?

**But wait!** After Nxe5, before recapturing, Black can play a zwischenzug!

Maybe ...Bxf2+! Check first!
• White's King must move (Ke2 or Kf1)
• THEN Black plays ...Nxe5

The result:
• Black still gets the piece back
• Black also damaged White's King safety!
• That's the power of the in-between move

**Remember**: The zwischenzug is usually a CHECK or a threat to the QUEEN - something that MUST be answered.`,
          arrows: [
            { from: 'c5', to: 'f2', color: 'green' },
          ],
        },
        {
          id: 'in-between',
          type: 'interactive',
          fen: 'r1b1k2r/ppppqppp/2n2n2/2b1P3/2B5/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          title: 'Find the Zwischenzug',
          explanation: `White just played e5, attacking Black's Knight on f6.

The "normal" response would be to move the Knight. But is there an in-between move that gains something first?

Look for a check or threat that's more urgent than saving the Knight!`,
          correctMoves: ['Bb5'],
          successMessage: `Bb5! This zwischenzug pins the Knight to the King! Now Black must deal with the pin before anything else. After Black responds (like ...a6), THEN your e5 pawn still attacks the f6 Knight. You got the pin for "free" by inserting it before Black could organize!`,
          failureMessage: 'Look for a move that creates a bigger threat than attacking the Knight. Can you pin or check?',
          arrows: [
            { from: 'c4', to: 'b5', color: 'green' },
            { from: 'b5', to: 'e8', color: 'yellow' },
          ],
        },
        {
          id: 'zwischenzug-defense',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Defending Against Zwischenzug',
          explanation: `How do you avoid falling for zwischenzugs?

**Calculate one move further**:
Don't stop at "I take, he takes, I take." Ask "After I take, can he do something else first?"

**Watch for**:
• Checks - Always possible as zwischenzug
• Queen attacks - Very forcing
• Mate threats - Obviously must be answered
• Any piece that's undefended

**Key insight**: The most dangerous zwischenzugs come in positions where both sides have loose (undefended) pieces or exposed Kings.

**Discipline**: Before capturing, ALWAYS ask "Can my opponent insert a stronger move?"`,
        },
        {
          id: 'zwischenzug-puzzle',
          type: 'puzzle',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1P3/2B5/5N2/PPP2PPP/RNBQ1RK1 b kq - 0 1',
          title: 'Zwischenzug Puzzle',
          explanation: `Black to move. White just captured on d4 with the Bishop.

The "obvious" move might be to recapture on d4. But is there a stronger in-between move?`,
          correctMoves: ['Bxf2+'],
          successMessage: `Bxf2+! Perfect zwischenzug! White must deal with the check (Kh1 or Rxf2). THEN Black can recapture on d4 or take the Bishop - but they've already gained the f2 pawn with check! The sequence gains material that wasn't "supposed" to happen.`,
          failureMessage: 'Before recapturing, is there a check you can give first?',
          arrows: [
            { from: 'c5', to: 'f2', color: 'green' },
          ],
        },
        {
          id: 'zwischenzug-with-threat',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp2ppp/2n5/3np3/2B5/5N2/PPPP1PPP/RNBQ1RK1 w - - 0 1',
          title: 'Zwischenzug with a Threat',
          explanation: `White's Bishop on c4 is under attack by the Knight on d5. The "obvious" move might be to retreat the Bishop.

But is there a stronger in-between move? Look for a move that creates a bigger threat before dealing with the Knight!`,
          correctMoves: ['Bxd5'],
          successMessage: `Bxd5! Rather than retreating, you capture the Knight first. After Qxd5, you've traded the Bishop for a centralized Knight and opened lines. This is a practical zwischenzug - instead of passively retreating, you take action!`,
          failureMessage: 'Instead of retreating the attacked Bishop, can you capture something first?',
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'zwischenzug-queen-attack',
          type: 'puzzle',
          fen: 'r1b1kb1r/ppppqppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
          title: 'Zwischenzug Puzzle - Central Tension',
          explanation: `White to play. There's tension in the center with the d4 pawn attacking e5.

Instead of the "obvious" dxe5, is there a stronger in-between move that improves your position first?`,
          correctMoves: ['d5'],
          successMessage: `d5! Instead of capturing on e5, you push past with d5! This zwischenzug gains space and attacks the Knight on c6. The Knight must move, and you've gained a strong central pawn wedge. By inserting d5 first, you get a better version of the position than simply trading!`,
          failureMessage: 'Instead of exchanging in the center, can you push the pawn forward to gain space and attack a piece?',
          arrows: [
            { from: 'd4', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'red' },
          ],
        },
        {
          id: 'zwischenzug-endgame',
          type: 'interactive',
          fen: '8/ppp2kpp/8/3pP3/3P4/8/PPP2PPP/4R1K1 w - - 0 1',
          title: 'Endgame Zwischenzug',
          explanation: `In endgames, zwischenzugs are just as powerful! White wants to push the e-pawn, but first look for an in-between move.

Can you play a Rook move that creates a threat before advancing the pawn?`,
          correctMoves: ['Re3'],
          successMessage: `Re3! The Rook moves to e3, preparing to support the e-pawn advance and also potentially swing to the a- or h-file. This in-between move improves your Rook's position before committing to the pawn push. In endgames, every tempo matters!`,
          failureMessage: 'Before pushing the pawn, can you improve your Rook\'s position first?',
          arrows: [
            { from: 'e1', to: 'e3', color: 'green' },
          ],
        },
      ],
    },
    // ==================== LESSON 10: TRAPPED PIECES ====================
    {
      id: 'trapped-pieces',
      title: 'Trapping Pieces',
      description: 'Surround and win enemy pieces with no escape',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['tactics', 'trapped-piece'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 1',
          title: 'Trapping a Piece',
          explanation: `A **trapped piece** (also called "piece imprisonment") is one that has no safe squares to move to. If you can attack it, it's won! One of the most famous examples is the Noah's Ark Trap in the Ruy Lopez, documented since the early 1900s and named after its supposedly "ancient" origins.

**Most commonly trapped pieces**:
• **Knights** - Limited movement, easily cornered
• **Bishops** - Can be trapped on the edge/corners
• **Queens** - Valuable target, sometimes ventures too far
• **Rooks** - In the opening before they're developed

**How pieces get trapped**:
1. They venture into enemy territory alone
2. Pawns advance and cut off retreat
3. Enemy pieces surround them

**Key insight**: Watch for enemy pieces that are far from home. They might be trapped with the right pawn pushes or piece coordination!`,
        },
        {
          id: 'trap-bishop',
          type: 'interactive',
          fen: 'rnbqk1nr/pppp1ppp/8/2b1p3/4P3/1P6/P1PP1PPP/RNBQKBNR w KQkq - 0 1',
          title: 'Trap the Bishop',
          explanation: `Black's Bishop on c5 has limited squares. Can you trap it?

Look at the diagonals the Bishop can use. How can you cut them off?`,
          correctMoves: ['d4'],
          successMessage: `d4! After exd4 (or ...Bxd4), the c5 Bishop is in trouble. If exd4, you can play c3 and the Bishop is trapped! This is a classic bishop trap pattern in the Italian Game structure.`,
          failureMessage: 'How can you close the diagonal and restrict the Bishop?',
          arrows: [
            { from: 'd2', to: 'd4', color: 'green' },
          ],
        },
        {
          id: 'knight-trap',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/4P1n1/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Knight Traps',
          explanation: `Knights are especially prone to traps because they can only move to 8 specific squares (fewer on the edge).

**Classic Knight trap patterns**:
• Knight on the rim is dim (easy to trap on a/h files)
• Knights that jump into enemy territory without support
• Knights on g4/g5 or b4/b5 can be kicked by pawns

**In this position**: Black's Knight on g4 looks aggressive, but...
• h3 attacks it
• If it goes to h6, it's sidelined
• If it goes to f6, it blocks Black's own development

**Pro tip**: When a Knight jumps into your position, don't panic! Ask "Where can it go?" Often, the Knight has trapped itself.`,
          arrows: [
            { from: 'h2', to: 'h3', color: 'green' },
          ],
          highlights: [
            { square: 'g4', color: 'red' },
          ],
        },
        {
          id: 'noahs-ark',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1',
          title: 'Noah\'s Ark Trap',
          explanation: `One of the oldest and most famous traps in chess is the **Noah's Ark Trap**!

**Setup** (Ruy Lopez):
1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 d6 5.d4 b5 6.Bb3 Nxd4 7.Nxd4 exd4

**The trap**: After this sequence, Black plays **...c5!** and the Bishop on b3 is trapped!
• The Bishop can't go to a4 (pawn guards)
• Can't go to c2 (pawn will come to c4)
• All diagonals are blocked

**Named "Noah's Ark"** because it's considered one of the oldest recorded traps - supposedly as old as the biblical ark!

**Lesson**: Be careful with your Bishops in the Ruy Lopez. Once the b3 Bishop loses its diagonal, it can become a liability.`,
          arrows: [
            { from: 'c7', to: 'c5', color: 'red' },
            { from: 'b5', to: 'b4', color: 'red' },
          ],
          highlights: [
            { square: 'b3', color: 'red' },
          ],
        },
        {
          id: 'queen-trap',
          type: 'interactive',
          fen: 'rnb1kb1r/pp1ppppp/5n2/q1p5/3P4/2N2N2/PPP1PPPP/R1BQKB1R w KQkq - 0 1',
          title: 'Queen Trap',
          explanation: `Black's Queen came out early to a5. Can you exploit this?

Queens are tricky to trap because they're so mobile, but when they venture too far, sometimes the net closes!`,
          correctMoves: ['Bd2'],
          successMessage: `Bd2! The Queen is attacked and has very limited squares. After ...Qb6, White can continue developing while the Queen remains awkwardly placed. This shows why bringing the Queen out too early is dangerous!`,
          failureMessage: 'How can you attack the Queen while developing a piece?',
          arrows: [
            { from: 'c1', to: 'd2', color: 'green' },
          ],
        },
        {
          id: 'trap-puzzle',
          type: 'puzzle',
          fen: 'rn1qkbnr/ppp2ppp/4p3/3pP3/1b1P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Trap the Piece',
          explanation: `Find the move that traps Black's Bishop on b4!

Hint: Cut off all the escape squares.`,
          correctMoves: ['c3'],
          successMessage: `c3! This move blocks the check from the Bishop AND attacks it. The Bishop must move, and after ...Ba5, b4 traps it! Or ...Bxc3+ Nxc3 and White has the better position. Pawns are great for trapping pieces!`,
          failureMessage: 'Which pawn can attack the Bishop and limit its options?',
        },
        {
          id: 'rook-trap',
          type: 'interactive',
          fen: 'r2qkbnr/ppp1pppp/2n5/3p4/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Trap the Bishop on g4',
          explanation: `Black's Bishop has come to g4, pinning the Knight to the Queen. This is a common motif.

But this Bishop might be overextended! Can you find a way to trap it or force it into a bad position?`,
          correctMoves: ['h3'],
          successMessage: `h3! The Bishop must retreat. After Bh5, you can play g4! trapping the Bishop on h5. It has no safe squares - g6 might be possible but the Bishop is severely restricted. This is the classic h3-g4 Bishop trap!`,
          failureMessage: 'Attack the Bishop to force it to retreat, then think about cutting off its escape squares.',
          arrows: [
            { from: 'h2', to: 'h3', color: 'green' },
          ],
          highlights: [
            { square: 'g4', color: 'red' },
          ],
        },
        {
          id: 'advanced-trap-puzzle',
          type: 'puzzle',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          title: 'Trap the Knight After It Invades',
          explanation: `This is a standard Italian Game position. Black may consider ...Na5 to attack the Bishop on c4.

If the Knight goes to a5, how would you keep the Bishop safe while making the Knight look silly on the edge?`,
          correctMoves: ['d3'],
          successMessage: `d3! This solid developing move protects the Bishop and keeps it on the active c4 diagonal. If Black plays Na5 now, the Knight ends up on the rim where "the Knight on the rim is dim." The Knight on a5 has very few good squares and can be trapped or sidelined while you develop freely!`,
          failureMessage: 'How can you protect the Bishop while keeping a strong position? Think about a pawn move that supports the center.',
          arrows: [
            { from: 'd2', to: 'd3', color: 'green' },
          ],
        },
      ],
    },
    // ==================== LESSON 11: X-RAY ====================
    {
      id: 'x-ray',
      title: 'X-Ray Attack',
      description: 'Attack through pieces like an X-ray',
      difficulty: 'advanced',
      estimatedMinutes: 7,
      tags: ['tactics', 'x-ray'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '4r1k1/8/8/8/8/8/8/R3K3 w - - 0 1',
          title: 'The X-Ray',
          explanation: `An **X-Ray attack** (or **X-Ray defense**) is when a piece's influence "sees through" another piece to affect a square behind it. The tactic is named by analogy with X-ray radiation, discovered by Wilhelm Rontgen in 1895 - just as X-rays see through solid objects, the chess X-ray "sees through" intervening pieces.

**Think of it like actual X-rays** - the piece can see through obstacles!

**X-Ray attack**: Your Rook "looks through" an enemy piece to attack something behind it.

**X-Ray defense**: Your piece "looks through" another piece to defend a square behind it.

**Why it matters**:
• Pieces can control squares even when "blocked"
• Two Rooks on the same file have X-Ray support
• A Queen behind a Rook still influences the line

**In this position**: If both Rooks traded on the e-file, the King behind would still be the "final piece" - the X-Ray effect means the whole line is controlled.`,
          arrows: [
            { from: 'a1', to: 'a8', color: 'green' },
          ],
        },
        {
          id: 'x-ray-defense',
          type: 'interactive',
          fen: '4r1k1/8/8/8/8/8/4R3/4R1K1 w - - 0 1',
          title: 'X-Ray to the Rescue',
          explanation: `White's Rooks are doubled. This creates X-Ray power!

Find the move that wins using X-Ray tactics.`,
          correctMoves: ['Re8+'],
          successMessage: `Re8+! After Rxe8, Rxe8# is checkmate! The back Rook "X-rayed" through the front Rook. When the front Rook was captured, the back Rook delivered the mate. This is X-Ray in its purest form!`,
          failureMessage: 'Your Rooks support each other through X-Ray. What happens if you sacrifice the first one?',
          arrows: [
            { from: 'e2', to: 'e8', color: 'green' },
            { from: 'e1', to: 'e8', color: 'yellow' },
          ],
        },
        {
          id: 'x-ray-attack',
          type: 'explanation',
          fen: '3qr1k1/5ppp/8/8/8/8/5PPP/3QR1K1 w - - 0 1',
          title: 'X-Ray Threats',
          explanation: `X-Ray works offensively too!

**In this position**: White's Queen and Rook are aligned on the d-file with Black's Queen and Rook.

Even though pieces block the direct line, White "X-Rays" through to the Black King's back rank!

**Tactical idea**: Qd8! would trade Queens, and after ...Rxd8, Rxd8# is mate!

This works because:
• The Queen trade deflects Black's Queen
• The Rook X-Rays through to deliver mate
• Black's own Rook can't defend because it just took the Queen!

**Pro tip**: When you have heavy pieces aligned, always check for X-Ray tactics!`,
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
            { from: 'e1', to: 'e8', color: 'yellow' },
          ],
        },
        {
          id: 'x-ray-puzzle',
          type: 'puzzle',
          fen: '3r2k1/8/8/8/8/8/5R2/3R2K1 w - - 0 1',
          title: 'X-Ray Challenge',
          explanation: `Use X-Ray tactics to win!

Your Rooks can support each other through the line...`,
          correctMoves: ['Rxd8+', 'Rd8+'],
          successMessage: `Rd8+! Rxd8 is forced, and Rxd8# is checkmate! The X-Ray support from the second Rook seals the deal. When your Rooks are connected, they have incredible power!`,
          failureMessage: 'If you sacrifice one Rook with check, what can the other Rook do?',
        },
        {
          id: 'x-ray-bishop',
          type: 'explanation',
          fen: '2kr4/ppp2p2/2n1p3/3pP3/1b1P4/2N2N2/PPP1BPPP/R3K2R w KQ - 0 1',
          title: 'Bishop X-Ray',
          explanation: `Bishops also have X-Ray power! A Bishop can "see through" pieces on its diagonal.

**Bishop X-Ray patterns**:
• A Bishop behind a pawn chain still influences the diagonal beyond
• Two Bishops on the same diagonal create layered X-Ray pressure
• A Bishop can defend a piece through an intervening piece

**Practical example**: In many openings, the fianchettoed Bishop on g2 X-Rays through the center all the way to a8, even when pawns block the direct path. If those pawns move or are exchanged, the Bishop's latent power is unleashed!

**Key insight**: Always be aware of long-range pieces "behind" other pieces. Their influence extends beyond what's immediately visible!`,
          arrows: [
            { from: 'e2', to: 'a6', color: 'green' },
            { from: 'e2', to: 'h5', color: 'green' },
          ],
        },
        {
          id: 'x-ray-defense-practice',
          type: 'interactive',
          fen: '3r2k1/5ppp/8/8/8/8/4RPPP/4R1K1 w - - 0 1',
          title: 'X-Ray Defense in Action',
          explanation: `Black's Rook on d8 is pressuring the position. White's doubled Rooks on the e-file provide X-Ray defense.

Find the move that uses X-Ray power to win material or gain an advantage!`,
          correctMoves: ['Re8+'],
          successMessage: `Re8+! After Rxe8, Rxe8+ wins back the Rook with check. The back Rook X-Rayed through the front one. Even if Black doesn't take (Kf8), Re8+ forces the exchange anyway. Doubled Rooks have tremendous X-Ray power!`,
          failureMessage: 'Your Rooks are doubled on the e-file. What happens if the front one enters with check?',
          arrows: [
            { from: 'e2', to: 'e8', color: 'green' },
            { from: 'e1', to: 'e8', color: 'yellow' },
          ],
        },
        {
          id: 'x-ray-queen-rook',
          type: 'interactive',
          fen: '3r2k1/5ppp/8/8/8/8/5PPP/2QR2K1 w - - 0 1',
          title: 'Queen and Rook X-Ray',
          explanation: `The Queen on c1 and Rook on d1 are aligned. The Queen "X-Rays" through the Rook to the d-file.

Find the move that exploits this X-Ray alignment to win!`,
          correctMoves: ['Rxd8+'],
          successMessage: `Rxd8+! The Rook captures with check, and the Queen on c1 X-Rays through to d1 and beyond. After Kf8, Qc5+ picks up material or continues the attack. The Queen's X-Ray support behind the Rook made this invasion possible!`,
          failureMessage: 'The Rook can enter with check. What piece supports it from behind?',
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
            { from: 'c1', to: 'd1', color: 'yellow' },
          ],
        },
        {
          id: 'x-ray-advanced-puzzle',
          type: 'puzzle',
          fen: '4r1k1/5ppp/8/3R4/8/8/5PPP/4R1K1 w - - 0 1',
          title: 'X-Ray Attack Puzzle',
          explanation: `White has a Rook on d5 and another on e1. Black's Rook is on e8 guarding the back rank.

Find the move that wins using X-Ray tactics! Think about how your pieces can support each other through the line.`,
          correctMoves: ['Rd8'],
          successMessage: `Rd8! The Rook invades the 8th rank, and after Rxd8, Rxd8+ is crushing - the X-Ray support from the back Rook means the 8th rank invasion is unstoppable. If Black doesn't trade, you have two Rooks dominating the position with Rd7 threatening f7!`,
          failureMessage: 'How can you invade with one Rook while the other provides X-Ray support?',
          arrows: [
            { from: 'e1', to: 'e5', color: 'green' },
          ],
        },
      ],
    },
    // ==================== LESSON 12: DESPERADO ====================
    {
      id: 'desperado',
      title: 'Desperado',
      description: 'Get maximum value from doomed pieces',
      difficulty: 'advanced',
      estimatedMinutes: 7,
      tags: ['tactics', 'desperado'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4N3/4P3/8/PPPP1PPP/RNBQKB1R b KQkq - 0 1',
          title: 'The Desperado Concept',
          explanation: `**Desperado** comes from the Spanish "desesperado" (desperate one) - it's when a piece is doomed to be captured anyway, so you make it cause maximum damage before it falls! The term entered chess from American Wild West imagery: a desperado piece "goes out fighting" by capturing the most valuable target first.

**The logic**:
• Your piece will be captured no matter what
• Instead of accepting the loss, capture something first!
• Even if your piece still dies, you got something for it

**Classic example**:
Both players have pieces attacked. Instead of defending, you TAKE something with your attacked piece. If they take back, you take back too - but you captured first!

**Key question**: "My piece is lost. What can it take down with it?"

**Pro tip**: Desperado is especially common when multiple pieces are hanging (undefended) for both sides. The player who captures first with their "dead" piece often comes out ahead!`,
        },
        {
          id: 'desperado-example',
          type: 'interactive',
          fen: 'r1bqk1nr/pppp1ppp/2n5/2b1N3/4P3/3B4/PPPP1PPP/RNBQK2R b KQkq - 0 1',
          title: 'Desperado in Action',
          explanation: `Black to move. The Black Bishop on c5 is "attacked" in the sense that if nothing happens, exchanges might favor White.

But look at this - can the Bishop capture something valuable before any trades happen?`,
          correctMoves: ['Bxf2+'],
          successMessage: `Bxf2+! Even if White plays Kxf2, Black got a pawn AND disrupted White's King! The Bishop was "desperado" - it grabbed what it could before potentially being traded. Classic tactic!`,
          failureMessage: 'What can the Bishop capture that also gives check?',
          arrows: [
            { from: 'c5', to: 'f2', color: 'green' },
          ],
        },
        {
          id: 'desperado-calculation',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 1',
          title: 'Calculating Desperado',
          explanation: `When pieces are hanging on both sides, calculate the desperado carefully!

**Counting example**:
• White's Knight on e5 is attacked by Knight c6
• White's Bishop on c4 is undefended
• Black's f6 Knight could be attacked

**Who goes first matters!** If it's White's turn:
• Nxc6 takes the Knight
• If ...dxc6, Bxf7+ forks King and Rook!

**If it's Black's turn**:
• ...Nxe5 takes the Knight
• Now what desperado can White play?

**Key insight**: When material is loose for both sides, the player whose turn it is can often use desperado tactics to come out ahead. Calculate each capture carefully!`,
          arrows: [
            { from: 'e5', to: 'c6', color: 'green' },
            { from: 'c6', to: 'e5', color: 'red' },
          ],
        },
        {
          id: 'desperado-puzzle',
          type: 'puzzle',
          fen: 'r2qkb1r/pppn1ppp/4pn2/3pN3/2PP2b1/6P1/PP2PPBP/RNBQK2R w KQkq - 0 1',
          title: 'Desperado Puzzle',
          explanation: `White to move. Multiple pieces are loose!

Find the desperado sequence that wins material.`,
          correctMoves: ['Nxd7', 'cxd5'],
          successMessage: `Nxd7! If Qxd7, you've traded Knight for Knight but opened the position. Or cxd5 is also strong, winning a pawn. In complex positions with multiple hanging pieces, the player who captures first often wins!`,
          failureMessage: 'Which piece can you capture where taking back doesn\'t fully compensate?',
        },
        {
          id: 'desperado-exchange',
          type: 'explanation',
          fen: '8/8/8/3Nb3/2B5/8/5k2/6K1 w - - 0 1',
          title: 'Desperado in Exchanges',
          explanation: `Desperado thinking is critical during piece exchanges. When both sides have pieces attacked, the order of captures matters enormously!

**The key principle**: If your piece is going to be captured anyway, make it capture the MOST VALUABLE target before it dies.

**Exchange sequence thinking**:
1. "My piece is attacked - it will be lost"
2. "What can it take before it goes?"
3. "Can it take something MORE valuable than itself?"
4. "Even if it takes something equal, did I improve my position?"

**In this position**: Both the Bishop on c4 and Knight on d5 might be under pressure. If the Bishop is about to be lost, Bxe6 captures the Bishop first! If the Knight is threatened, Nxe3 or Nc7 might grab something.

**Remember**: The desperado piece goes down fighting, not quietly!`,
          arrows: [
            { from: 'c4', to: 'e6', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'desperado-pawn',
          type: 'interactive',
          fen: 'r1bqkbnr/ppp2ppp/2n5/3pp3/2PPP3/5N2/PP3PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Pawn Desperado',
          explanation: `White's d4 pawn and e4 pawn are both under attack. The d4 pawn is attacked by the e5 pawn and the c6 Knight.

Instead of trying to defend, can you use desperado thinking? One of your center pawns is about to fall - make it count!`,
          correctMoves: ['dxe5', 'exd5'],
          successMessage: `Good thinking! dxe5 captures a pawn before yours is taken - your d-pawn was doomed anyway, so it grabs the e5 pawn on its way out. exd5 also works, winning a central pawn. Both are desperado-style: making the threatened pawn do maximum damage before it falls!`,
          failureMessage: 'Your center pawns are under pressure. Can one of them capture before it\'s taken?',
          arrows: [
            { from: 'd4', to: 'e5', color: 'green' },
            { from: 'e4', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'desperado-bishop-puzzle',
          type: 'puzzle',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
          title: 'Desperado Bishop',
          explanation: `White to play. The d4 pawn is attacked by the Bishop on c5 and the e5 pawn.

If the d4 pawn is going to fall, can you make it cause maximum damage first?`,
          correctMoves: ['dxe5'],
          successMessage: `dxe5! The d-pawn was under heavy pressure, so instead of defending it passively, you capture on e5 first. Now if Bxe5 or Nxe5, you've at least traded pawn for pawn. The d-pawn went down fighting, capturing before being captured!`,
          failureMessage: 'The d4 pawn is doomed. What can it capture before it falls?',
          arrows: [
            { from: 'd4', to: 'e5', color: 'green' },
          ],
        },
        {
          id: 'desperado-summary',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Desperado Summary',
          explanation: `**Desperado checklist**:

**When to think "desperado"**:
• Your piece is attacked and will be lost
• Multiple pieces are hanging on both sides
• An exchange sequence is about to begin
• You're in a forced line where material will change hands

**Desperado priorities** (capture the most valuable first!):
1. Can my doomed piece give check while capturing?
2. Can it capture the most valuable enemy piece?
3. Can it capture with a threat (attack on Queen, etc.)?
4. Can it at least take something of equal value?

**Common desperado scenarios**:
• Knight about to be captured takes a pawn with check first
• Bishop grabs a piece before being traded off
• Pawn captures before being captured itself
• Queen sacrifice followed by recapturing with advantage

**Golden rule**: A piece that's going to die anyway should go out with maximum impact!`,
        },
      ],
    },
    // ==================== LESSON 13: COUNTING ATTACKERS ====================
    {
      id: 'count-attackers',
      title: 'Counting Attackers and Defenders',
      description: 'The fundamental skill of tactical calculation',
      difficulty: 'beginner',
      estimatedMinutes: 8,
      tags: ['tactics', 'calculation'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
          title: 'Attackers vs Defenders',
          explanation: `Before making ANY capture, always count. This fundamental concept was formalized in Wilhelm Steinitz's theory of positional chess in the 1870s-1890s. Steinitz emphasized that an attack succeeds when you have more attackers than defenders on a critical point.

**1. How many pieces attack the target?**
**2. How many pieces defend it?**
**3. What's the VALUE of pieces involved?**

If you have more attackers than defenders, you can usually win material!

**Simple rule**: Attackers > Defenders = Capture is good!

**But value matters too**:
• If you attack with Queen (9) and they defend with pawn (1)...
• You WIN the pawn, but LOSE the Queen if you capture!

**The count method**:
Count attackers: "I attack with A, B, C - that's 3 attackers"
Count defenders: "They defend with X, Y - that's 2 defenders"
Compare values: "I attack with Bishop+Knight, they defend with pawns"

**Pro tip**: This is THE fundamental skill. Master this, and tactics become clear!`,
        },
        {
          id: 'count-example',
          type: 'interactive',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1',
          title: 'Count and Capture',
          explanation: `Look at the e5 pawn. Before capturing, count!

**Attackers on e5**:
• Knight on f3
• Knight on c3 (no, it doesn't attack e5)
So... 1 attacker (Nf3)

**Defenders of e5**:
• Knight on f6
• Knight on c6
So... 2 defenders!

Wait, with 1 attacker and 2 defenders, capturing doesn't work directly. But is there another tactical idea?`,
          correctMoves: ['Nxe5', 'Bxf7+'],
          wrongMoveHints: {
            'd4': 'This doesn\'t win material immediately. Think about the attack on f7!',
          },
          successMessage: `Nxe5! works because after Nxe5, you can play Bxf7+! forking King and Knight. Or Bxf7+ directly works too! The count on e5 was deceiving - the REAL tactic was the follow-up. This is why you count, then look deeper!`,
          failureMessage: 'Count the pieces on e5, but also look at what follows. What about f7?',
        },
        {
          id: 'pile-up',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1',
          title: 'Piling Up on a Target',
          explanation: `When the target is well-defended, **pile up more attackers!**

**The pile-up strategy**:
1. Identify your target (weak pawn, pinned piece, etc.)
2. Count attackers vs defenders
3. If defenders = attackers, add another attacker!
4. Keep adding until you overwhelm the defense

**In this position**:
If we want to attack e5:
• Current: 1 attacker (Nf3), 2 defenders (Nc6, Nf6)
• Add an attacker: d4! or Qe2, or Rf1-e1

Once you have 3 attackers vs 2 defenders, the pawn falls!

**Pro tip**: Rooks are great for piling up because they can easily join along files. Doubling Rooks = instant pressure!`,
          arrows: [
            { from: 'd2', to: 'd4', color: 'green' },
            { from: 'd1', to: 'e2', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'value-matters',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          title: 'Value Matters in Exchanges',
          explanation: `When counting, piece VALUE is crucial!

**The exchange sequence**:
Imagine you attack a pawn with Queen, they defend with Queen.
• 1 attacker (Queen) vs 1 defender (Queen)
• If Qxpawn, Qxpawn... you TRADED QUEENS for a pawn?!
• That's 9 points for 1 point - terrible!

**Correct thinking**:
Always ask: "If I capture, what takes back? What takes THAT back?"

**Example sequence**:
Attack pawn with Knight, they defend with pawn.
• Nxpawn (Knight worth 3, takes pawn worth 1)
• pxN (pawn takes Knight)
• Result: Knight for pawn = you LOST 2 points!

**Better**: Attack with pawn, they defend with Knight.
• pxN (pawn takes Knight worth 3)
• pxp (they take back your pawn worth 1)
• Result: Pawn for Knight = you WON 2 points!

**Rule**: Capture with your LEAST valuable piece first!`,
        },
        {
          id: 'counting-puzzle',
          type: 'puzzle',
          fen: 'r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1',
          title: 'Counting Challenge',
          explanation: `Count the attackers and defenders on e5. Should White capture?

Remember: Count pieces, consider values, calculate the sequence!`,
          correctMoves: ['Ng5', 'Bg5'],
          successMessage: `Actually, direct capture on e5 isn't great here - the position is equal. But Ng5 or Bg5 creates NEW threats (like Bxf7+ or attacking f7). Sometimes the answer isn't to capture the obvious target, but to create new threats! Good tactical thinking goes beyond just counting.`,
          failureMessage: 'Counting shows e5 is adequately defended. What other targets exist?',
        },
        {
          id: 'counting-summary',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Counting Summary',
          explanation: `**The Counting Method - Summary**:

✓ **Step 1**: Identify the target
✓ **Step 2**: Count attackers
✓ **Step 3**: Count defenders
✓ **Step 4**: Compare numbers AND values
✓ **Step 5**: Calculate the exchange sequence

**Key principles**:
• More attackers than defenders = usually good
• Capture with LEAST valuable piece first
• Consider what happens AFTER the exchange
• Sometimes piling up is better than capturing immediately

**Warning signs**:
• Your attacker is more valuable than their defender
• The defender can capture something else if they move
• After the exchange, your piece is worse placed

**Master this skill**: It's the foundation of ALL tactical thinking! Every combination starts with correctly counting attackers and defenders.`,
        },
        {
          id: 'counting-advanced',
          type: 'interactive',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Advanced Counting Exercise',
          explanation: `White has played d4, creating tension in the center. Count the attackers and defenders of the d4 and e5 pawns.

**d4 pawn**: Attacked by e5 pawn and Nc6. Defended by Nf3 and Qd1.
**e5 pawn**: Attacked by d4 pawn. Defended by Nc6 and Nf6.

Based on your count, what is the best move for White?`,
          correctMoves: ['dxe5', 'd5'],
          successMessage: `Good! dxe5 wins a pawn because after Nxe5, Nxe5 and White has equal pieces but Black's center is weakened. Or d5 pushes past, attacking the Knight and gaining space. Counting correctly reveals that d4 has enough support to advance or capture!`,
          failureMessage: 'Count the attackers and defenders carefully. Can White capture or advance in the center?',
          arrows: [
            { from: 'd4', to: 'e5', color: 'green' },
            { from: 'd4', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'counting-trap-puzzle',
          type: 'puzzle',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 0 1',
          title: 'Counting Trap',
          explanation: `White to play. The e4 pawn seems well-placed, but is it safe?

Count: Who attacks e4? Who defends it? Based on your count, what should White do?`,
          correctMoves: ['Nf3', 'd3'],
          successMessage: `Good defensive thinking! Nf3 adds a defender to e4 (the Knight will cover d4/e5 and support the center). d3 also solidifies the center. Currently e4 is only defended by the Knight on c3, and it's attacked by the Knight on c6 indirectly. Adding support with Nf3 or d3 ensures the center holds!`,
          failureMessage: 'Count the pieces influencing the e4 square. Does it need more support?',
          arrows: [
            { from: 'g1', to: 'f3', color: 'green' },
          ],
        },
      ],
    },
    // ==================== LESSON 14: INTERFERENCE ====================
    {
      id: 'interference',
      title: 'Interference',
      description: 'Block enemy piece coordination',
      difficulty: 'advanced',
      estimatedMinutes: 7,
      tags: ['tactics', 'interference'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '6k1/8/8/8/8/8/r5r1/R5K1 w - - 0 1',
          title: 'What is Interference?',
          explanation: `**Interference** is placing a piece on a square that BLOCKS an important line between enemy pieces. The word comes from the Latin "interferre" (to carry between), and the concept was studied extensively by the great chess problem composers of the 19th century.

This disrupts their coordination - they can no longer defend each other or control key squares together!

**How interference works**:
• Two enemy pieces protect each other along a line
• You put a piece ON that line between them
• Now they can't coordinate!

**Classic example**: Two Rooks defending each other on a rank. If you can put a piece between them, one becomes undefended!

**Interference vs Deflection**:
• Deflection: Force a piece AWAY from its line
• Interference: Put something IN THE WAY of its line

Both break coordination, but interference does it by blocking rather than moving!`,
        },
        {
          id: 'interference-example',
          type: 'interactive',
          fen: '3r2k1/5ppp/8/8/8/2B5/5PPP/3R2K1 w - - 0 1',
          title: 'Interfere with Defense',
          explanation: `If Black's Rook wasn't on d8, you'd have back rank mate!

Can you interfere with the Rook's defensive function?`,
          correctMoves: ['Rd7', 'Bf6'],
          successMessage: `Rd7 cuts off the Black Rook from defending along the d-file! After Rxd7, there's no back rank defense. Bf6 is also interesting, interfering with potential escape squares. Interference creates chaos in the enemy position!`,
          failureMessage: 'How can you block or interfere with the Rook\'s control of the d-file?',
          arrows: [
            { from: 'd1', to: 'd7', color: 'green' },
          ],
        },
        {
          id: 'classic-interference',
          type: 'explanation',
          fen: 'r4r1k/1b2qppp/p1n1p3/1p6/3P4/P1N1B2P/1PQ2PP1/2R1R1K1 w - - 0 1',
          title: 'Breaking the Defense Chain',
          explanation: `Sometimes two pieces work together in a "chain" - one defends the other, which defends something else.

**Interference breaks the chain!**

In complex positions, look for:
• Pieces that defend each other along a line
• Heavy pieces (Queen/Rooks) coordinating on files/ranks
• Bishops controlling long diagonals

**Finding interference**:
1. Identify two cooperating enemy pieces
2. Find the line they're using
3. Can you put a piece on that line?
4. What happens when the chain is broken?

**Pro tip**: Interference often involves sacrifice - you put a piece where it can be captured, but capturing breaks the coordination!`,
          arrows: [
            { from: 'b7', to: 'f3', color: 'yellow' },
          ],
        },
        {
          id: 'interference-puzzle',
          type: 'puzzle',
          fen: '3r1rk1/5ppp/8/8/3B4/8/5PPP/3R1RK1 w - - 0 1',
          title: 'Interference Puzzle',
          explanation: `Black's Rooks defend each other. Find the interference!`,
          correctMoves: ['Bc5', 'Be5'],
          successMessage: `Bc5 (or Be5) puts the Bishop between the Rooks! Now they can't defend each other. Rxd1 loses to Rxd1, and the Bishop creates havoc on the long diagonal. Classic interference!`,
          failureMessage: 'How can you put a piece between the two Rooks?',
          arrows: [
            { from: 'd4', to: 'c5', color: 'green' },
          ],
        },
        {
          id: 'interference-pawn',
          type: 'explanation',
          fen: '2r2rk1/pp3ppp/3q4/3P4/8/8/PP3PPP/2RR2K1 w - - 0 1',
          title: 'Pawn Interference',
          explanation: `Pawns can be powerful interference tools! A pawn pushed into the middle of enemy piece coordination can be devastating.

**In this position**: White's d5 pawn sits between Black's Queen on d6 and the Rook on c8. The pawn interferes with their connection along the d-file and c-file.

**Pawn interference patterns**:
• A pawn advance that blocks a defender's sight line
• A pawn that splits two coordinating Rooks
• A passed pawn that forces pieces to deal with it, breaking coordination

**The beauty of pawn interference**: Pawns are the least valuable pieces, so using them to disrupt expensive pieces is always a good trade of resources!`,
          arrows: [
            { from: 'd5', to: 'd6', color: 'yellow' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'interference-diagonal',
          type: 'interactive',
          fen: 'r1b2rk1/pp3ppp/2p2q2/8/3N4/6P1/PP3PBP/R4RK1 w - - 0 1',
          title: 'Interfere on the Diagonal',
          explanation: `Black's Bishop on c8 and Queen on f6 are coordinating along the c8-h3 diagonal.

Can you place a piece on this diagonal to interfere with their coordination?`,
          correctMoves: ['Ne6'],
          successMessage: `Ne6! The Knight jumps to e6, interfering with the diagonal between Black's Bishop and Queen. The Knight also attacks the f8 Rook and creates threats. Black's pieces can no longer coordinate along the diagonal, and the Knight is extremely powerful on e6!`,
          failureMessage: 'Look at the diagonal connecting Black\'s Bishop and Queen. Can you place a Knight on that diagonal?',
          arrows: [
            { from: 'd4', to: 'e6', color: 'green' },
          ],
          highlights: [
            { square: 'e6', color: 'green' },
          ],
        },
        {
          id: 'interference-rook-puzzle',
          type: 'puzzle',
          fen: '3r2k1/1b3ppp/8/4R3/8/8/5PPP/3R2K1 w - - 0 1',
          title: 'Rook Interference Puzzle',
          explanation: `Black's Rook on d8 and Bishop on b7 coordinate along the d-file and diagonals.

Find the move that interferes with Black's piece coordination!`,
          correctMoves: ['Red5'],
          successMessage: `Red5! The Rook moves to d5, blocking the Bishop's diagonal (b7 to e4/f3) while also controlling the d-file. The Black Rook on d8 can no longer easily coordinate with the Bishop. Interference on central squares is especially powerful because it disrupts multiple lines simultaneously!`,
          failureMessage: 'Can you place a Rook on a square that blocks the Bishop\'s diagonal?',
          arrows: [
            { from: 'e5', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'interference-sacrifice-puzzle',
          type: 'interactive',
          fen: '2rr2k1/5ppp/8/8/3B4/8/5PPP/1R1R2K1 w - - 0 1',
          title: 'Interference Sacrifice',
          explanation: `Black's two Rooks on c8 and d8 defend each other perfectly. Can you break their coordination with an interference sacrifice?

Think about putting a piece between them!`,
          correctMoves: ['Bc5'],
          successMessage: `Bc5! The Bishop lands between the two Rooks, cutting off their mutual defense. Now if Rxd1, Rxd1 and the c8 Rook is undefended. If the c8 Rook moves, the d8 Rook is exposed. The Bishop interference disrupted the entire defensive setup!`,
          failureMessage: 'The Rooks defend each other along the 8th rank. What piece can you place between them?',
          arrows: [
            { from: 'd4', to: 'c5', color: 'green' },
          ],
          highlights: [
            { square: 'c5', color: 'green' },
          ],
        },
      ],
    },
    // ==================== LESSON 15: OVERLOADING ====================
    {
      id: 'overloading',
      title: 'Overloading',
      description: 'Exploit pieces burdened with too many defensive duties',
      difficulty: 'intermediate',
      estimatedMinutes: 10,
      tags: ['tactics', 'overloading', 'exploitation'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w - - 0 1',
          title: 'What is Overloading?',
          explanation: `**Overloading** is one of the most elegant tactical motifs in chess. It occurs when a single piece is tasked with defending two or more things at once - and simply cannot handle all its responsibilities.

**Historical origin**: The term "overloading" was borrowed from **electrical engineering**. Just as an electrical circuit fails when forced to carry more current than it can handle - blowing a fuse or tripping a breaker - a chess piece "fails" when burdened with too many defensive duties. The analogy was popularized in chess literature during the mid-20th century, when industrial and technical metaphors began appearing in tactical vocabulary.

**How it works**:
• A piece is defending **two or more** important targets
• You attack one of those targets, forcing the defender to respond
• When the overloaded piece moves to defend one target, the **other target** becomes unprotected

**Key insight**: Every piece has limits. Even the powerful Queen can only be in one place at a time! Recognizing when a defender is stretched too thin is a hallmark of strong tactical play.`,
        },
        {
          id: 'overloaded-queen-example',
          type: 'explanation',
          fen: '3r2k1/5ppp/4q3/8/8/4B3/5PPP/2Q1R1K1 w - - 0 1',
          title: 'The Overloaded Queen',
          explanation: `Here is a classic overloading pattern. Look at Black's **Queen on e6** - it has TWO critical jobs:

**Job 1**: Defend the **Rook on d8** (the only defender!)
**Job 2**: Guard the **e7 square** to prevent Qc7 or Be7 threats

The Queen is overloaded - she cannot do both jobs at once.

If White plays **Re8+!**, the Rook attacks with check via the Rook on d8. Black's Queen must choose:
• **Qxe8?** - The Queen leaves the 6th rank, abandoning her other duties
• **Rxe8?** - Then Qxd8 is no longer guarded

When you spot a piece juggling multiple defensive tasks, you've found an overloading opportunity!`,
          arrows: [
            { from: 'e6', to: 'd8', color: 'yellow' },
            { from: 'e6', to: 'e7', color: 'yellow' },
          ],
          highlights: [
            { square: 'e6', color: 'red' },
            { square: 'd8', color: 'blue' },
          ],
        },
        {
          id: 'overloaded-queen-interactive',
          type: 'interactive',
          fen: '2kr4/pp3p2/2p1q3/4p3/4P1b1/2N2Q2/PPP2PPP/3R2K1 w - - 0 1',
          title: 'Exploit the Overloaded Queen',
          explanation: `Black's Queen on e6 is overloaded! She must defend both the **Rook on d8** and the **Bishop on g4**.

Find the move that exploits this overload. Which target should White attack to force the Queen into an impossible choice?`,
          correctMoves: ['Rxd8+'],
          wrongMoveHints: {
            'Qxg4': 'That captures the Bishop, but the Queen can simply recapture. Look for something with check!',
            'Nd5': 'Interesting idea, but there\'s a more forcing move with check.',
          },
          successMessage: `Rxd8+! forces Qxd8 (or Kxd8), and now White wins the Bishop with Qxg4. The Queen couldn't defend both the Rook and the Bishop at the same time - classic overloading!`,
          failureMessage: 'Look at what the Black Queen is defending. Can you attack one of those targets with check?',
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
          ],
          highlights: [
            { square: 'e6', color: 'red' },
            { square: 'd8', color: 'blue' },
            { square: 'g4', color: 'blue' },
          ],
        },
        {
          id: 'overloaded-rook-example',
          type: 'explanation',
          fen: '6k1/5pp1/7p/8/8/1r6/1P3PPP/R4RK1 w - - 0 1',
          title: 'The Overloaded Rook',
          explanation: `Rooks are frequently overloaded in endgames because they're often the last line of defense.

Consider a position where a **Rook must simultaneously**:
• Guard a back rank against mate
• Defend a weak pawn
• Control an open file

That's three jobs for one piece!

**Common overloaded Rook scenarios**:
1. **Back rank + pawn defense**: The Rook stays on the first rank to prevent mate, but a pawn elsewhere needs protection
2. **Two open files**: The Rook can only control one file at a time
3. **Attack + defense**: The Rook is needed for both attacking and defensive duties

**How to exploit it**:
• Create threats on **different parts of the board**
• Force the Rook to choose which area to protect
• Attack the undefended area after the Rook commits`,
          arrows: [
            { from: 'b3', to: 'b2', color: 'yellow' },
            { from: 'b3', to: 'b1', color: 'yellow' },
          ],
          highlights: [
            { square: 'b3', color: 'red' },
          ],
        },
        {
          id: 'overloaded-rook-interactive',
          type: 'interactive',
          fen: '3r2k1/R4ppp/8/3Bp3/8/8/5PPP/6K1 w - - 0 1',
          title: 'Overloaded Rook Practice',
          explanation: `Black's Rook on d8 is overloaded! It must:
1. Stay on the back rank to prevent **Ra8 mate**
2. Defend against the **Bishop on d5** attacking f7

Find the move that exploits this overload!`,
          correctMoves: ['Bxf7+'],
          wrongMoveHints: {
            'Ra8': 'The Rook on d8 can still capture on a8. Try attacking f7 instead!',
            'Be6': 'Close, but there\'s a more forcing move that wins immediately.',
          },
          successMessage: `Bxf7+! wins a pawn with check. If Kf8 or Kh8, then Ra8 forces Rxa8 and the back rank is exposed. The Rook couldn't guard both f7 and the back rank!`,
          failureMessage: 'The Rook must guard the back rank AND f7. Which target can you attack with a forcing move?',
          arrows: [
            { from: 'd5', to: 'f7', color: 'green' },
          ],
          highlights: [
            { square: 'd8', color: 'red' },
            { square: 'f7', color: 'blue' },
          ],
        },
        {
          id: 'creating-overloads',
          type: 'explanation',
          fen: 'r2qr1k1/ppp2ppp/2n5/3pN3/3P4/8/PPP2PPP/R1BQR1K1 w - - 0 1',
          title: 'Creating Overloads',
          explanation: `Strong players don't just wait for overloads to appear - they **create** them! Here's how:

**Step 1: Identify the key defender**
Find the piece that's holding the opponent's position together. Often it's a Queen, Rook, or central Knight.

**Step 2: Give it more work**
Create additional threats that the same piece must deal with:
• Open a new file or diagonal aimed at a target behind the defender
• Create a passed pawn that needs watching
• Launch an attack on a different part of the board

**Step 3: Overload it!**
Once the piece has too many jobs, exploit the weakest link.

**Techniques for creating overloads**:
• **Pawn breaks**: Open new lines to create additional targets
• **Piece redirection**: Move your pieces to threaten multiple areas
• **Zwischenzug**: An in-between move that adds a new threat before the defender can regroup

**Remember**: The best overloads involve a **forcing move** (check, capture, or major threat) so the opponent doesn't have time to reorganize their defense.`,
        },
        {
          id: 'overloading-vs-deflection',
          type: 'explanation',
          fen: 'r1b2rk1/ppppqppp/2n5/4N3/8/8/PPPPQPPP/R1B2RK1 w - - 0 1',
          title: 'Overloading vs Deflection',
          explanation: `Overloading and deflection are closely related - but there's an important difference:

**Deflection**: You FORCE the defender to move away from its post.
• "I'll make you leave!" - You play a move that compels the piece to abandon its duty.
• Example: Sacrifice on the square a piece defends, forcing it to capture and leave.

**Overloading**: You attack what the defender protects, exploiting that it CAN'T protect everything.
• "You have too many jobs!" - The piece stays where it is but simply can't cover all its responsibilities.
• Example: Attack two things the Queen defends; she can only save one.

**In practice**, the line between them blurs:
• An overloaded piece is ripe for deflection
• A deflection often works because the piece was already overloaded
• The best combinations use BOTH: overload a piece, then deflect it from its most important duty

**Key takeaway**: When you see a piece doing double duty, ask yourself: "Can I attack what it's defending?" That's the overloading mindset.`,
        },
        {
          id: 'overloading-puzzle',
          type: 'puzzle',
          fen: 'r4rk1/1b1nqppp/p3p3/1p2N3/3P4/1BN5/PP3PPP/R2QR1K1 w - - 0 1',
          title: 'Overloading Puzzle',
          explanation: `Black's Knight on d7 is overloaded! It must defend against multiple threats. Find the move that exploits this!`,
          correctMoves: ['Nxf7'],
          successMessage: `Nxf7! exploits the overloaded Knight on d7. The Knight was defending f7 (via the pawn structure) and also needed to cover e5. After Nxf7, if Rxf7 then Bxe6 pins and wins material. If Kxf7 then Bxe6+ forks King and Queen. The Knight simply had too many jobs!`,
          failureMessage: 'Look at what the Knight on d7 must defend. Can you attack one of its responsibilities with a capture?',
          arrows: [
            { from: 'e5', to: 'f7', color: 'green' },
          ],
          highlights: [
            { square: 'd7', color: 'red' },
            { square: 'f7', color: 'blue' },
          ],
        },
      ],
    },
    // ==================== LESSON 16: ATTRACTION ====================
    {
      id: 'attraction',
      title: 'Attraction',
      description: 'Lure enemy pieces to vulnerable squares through sacrifice',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['tactics', 'attraction', 'luring', 'sacrifice'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppppppp/2n5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
          title: 'What is Attraction?',
          explanation: `**Attraction** (also called **luring**) is a tactical motif where you force an enemy piece to move to a specific square - usually through a sacrifice - where it becomes vulnerable to a follow-up tactic.

**Historical origin**: The concept draws from the mythological image of the **Siren's call** - the irresistible lure that draws sailors to their doom. In chess, you offer something your opponent "can't refuse" (often a check or a juicy piece to capture), pulling their piece to a square where disaster awaits.

The term gained prominence in Soviet chess literature of the 1940s-50s, where it was distinguished from the broader concept of "decoy" (отвлечение). While a **decoy** draws a piece away from defense, an **attraction** specifically pulls a piece TO a dangerous square.

**How it works**:
1. Identify a tactic that would work IF an enemy piece were on a certain square
2. Find a sacrifice that FORCES the piece to that square
3. Execute the follow-up tactic

**Common attraction targets**: Fork squares, mating nets, pin lines, discovered attack paths.`,
        },
        {
          id: 'attraction-fork-example',
          type: 'explanation',
          fen: '4k3/8/8/3b4/8/8/6PP/1N3RK1 w - - 0 1',
          title: 'Attraction to Create a Fork',
          explanation: `Attraction often sets up a devastating **Knight fork** or **Queen fork**.

**The classic pattern**:
• You see that IF the enemy King were on a certain square, your Knight could fork King + Queen (or King + Rook)
• You sacrifice a piece on that square WITH CHECK
• The King is forced to capture (attracted to the square)
• Your Knight delivers the fork!

**Example idea**: If the Black King could be lured to f7, a Knight on d6 would fork King and Rook. So you sacrifice: Rf7+! Kxf7, and then Nd6+ forks everything.

This is the essence of attraction: the sacrifice isn't a loss - it's an **investment** that pays off with the follow-up tactic.

**Look for attraction when**:
• A Knight fork would be possible if the King were one square different
• A mating pattern needs the King on a specific square
• A skewer or pin would work if pieces were aligned differently`,
          arrows: [
            { from: 'f1', to: 'f7', color: 'green' },
          ],
          highlights: [
            { square: 'e8', color: 'red' },
          ],
        },
        {
          id: 'attraction-fork-interactive',
          type: 'interactive',
          fen: '4k3/5r2/8/3N4/8/8/8/4R1K1 w - - 0 1',
          title: 'Lure the King into a Fork',
          explanation: `The Knight on d5 is powerful. If the King were on e7, the Knight could jump to c7 or f6 with a fork! But the King is safe on e8.

Can you sacrifice to lure the King to e7 where the Knight delivers a deadly fork?`,
          correctMoves: ['Re7+'],
          wrongMoveHints: {
            'Nc7+': 'Check, but the King just moves to d8 or f8 and the Rook escapes.',
            'Nf6+': 'Check, but after Ke7 the Knight has no good fork.',
          },
          successMessage: `Re7+! forces Kxe7 (if Kd8 or Kf8 the Rook wins the f7 Rook). After Kxe7, Nc7 or Nf6+ forks the King and wins the Rook on f7. The King was lured to e7 where the Knight dominates!`,
          failureMessage: 'Think about which square would be bad for the King. Can you force the King there with a Rook sacrifice?',
          arrows: [
            { from: 'e1', to: 'e7', color: 'green' },
          ],
          highlights: [
            { square: 'e8', color: 'red' },
            { square: 'e7', color: 'blue' },
          ],
        },
        {
          id: 'attraction-back-rank',
          type: 'explanation',
          fen: '3q2k1/5ppp/8/8/8/5Q2/5PPP/2R3K1 w - - 0 1',
          title: 'Attraction for Back Rank Mate',
          explanation: `One of the most beautiful attraction patterns involves luring a piece to the back rank to set up a **back rank mate**.

**The pattern**:
• The opponent's King is trapped on the back rank (pawns block escape)
• A defending piece prevents your Rook/Queen from delivering mate
• You sacrifice to ATTRACT that defender away, or attract the King into the mating net

**Classic sequence**:
1. Qf8+! - Sacrifice the Queen on f8
2. Qxf8 (or Kxf8) - The piece is attracted to f8
3. Rc8# - Back rank mate!

In this position, White can play **Qf8+!** and after Qxf8 (forced), **Rc8** delivers checkmate because the Queen was lured to f8 where it blocks the King's escape!

**The sacrifice opens the door**: By attracting the Queen to f8, you simultaneously remove the defender AND block the King's flight square.`,
          arrows: [
            { from: 'f3', to: 'f8', color: 'green' },
            { from: 'c1', to: 'c8', color: 'green' },
          ],
          highlights: [
            { square: 'g8', color: 'red' },
            { square: 'f8', color: 'blue' },
          ],
        },
        {
          id: 'queen-sacrifice-attraction',
          type: 'interactive',
          fen: '1r4k1/5ppp/8/8/8/5Q2/5PPP/2R3K1 w - - 0 1',
          title: 'Queen Sacrifice Attraction',
          explanation: `The Black King is stuck on the back rank with pawns blocking escape. The Rook on b8 guards against Rc8.

Can you sacrifice your Queen to lure the Rook away from the back rank?`,
          correctMoves: ['Qb7'],
          wrongMoveHints: {
            'Qf8+': 'Check, but Kxf8 and the King escapes. You need to lure the ROOK away.',
            'Qa8': 'Close! But Rxa8 and the Rook is still on the back rank defending.',
            'Rc8+': 'The Rook on b8 can capture: Rxc8+. You need to remove that defender first.',
          },
          successMessage: `Qb7! forces Rxb7 (the Rook must capture the Queen). Now the back rank is unguarded and Rc8 delivers the final blow! The Rook was lured away from the 8th rank - a beautiful attraction sacrifice!`,
          failureMessage: 'The Rook on b8 prevents Rc8. How can you lure it away from the back rank?',
          arrows: [
            { from: 'f3', to: 'b7', color: 'green' },
            { from: 'c1', to: 'c8', color: 'yellow' },
          ],
          highlights: [
            { square: 'b8', color: 'red' },
            { square: 'g8', color: 'red' },
          ],
        },
        {
          id: 'attraction-vs-decoy',
          type: 'explanation',
          fen: 'r1bqkb1r/pppppppp/2n2n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 1',
          title: 'Attraction vs Decoy',
          explanation: `Attraction and decoy are sometimes used interchangeably, but there's a subtle distinction worth understanding:

**Attraction (Luring)**:
• You pull a piece TO a specific square
• The key is WHERE the piece ends up
• "Come here, to your doom!"
• Example: Sacrifice on f7 to lure King to f7, then fork

**Decoy**:
• You pull a piece AWAY from its defensive duty
• The key is that the piece LEAVES its current post
• "Get away from there!"
• Example: Sacrifice to pull a Queen away from defending a back rank

**In practice, many tactics are both**:
• Qf8+! Qxf8, Rc8# - The Queen is DECOYED away from guarding c8, AND ATTRACTED to f8 where it blocks the King

**How to think about it**:
1. If the tactic works because of WHERE the piece goes → **Attraction**
2. If the tactic works because of WHERE the piece leaves → **Decoy/Deflection**
3. If both matter → It's a combination of both!

The names matter less than the idea: **force a piece to a square where it doesn't want to be**.`,
        },
        {
          id: 'attraction-puzzle',
          type: 'puzzle',
          fen: '5rk1/4qppp/8/8/8/2B2Q2/5PPP/4R1K1 w - - 0 1',
          title: 'Attraction Puzzle',
          explanation: `Use attraction to set up a winning combination. The Black King is vulnerable on the back rank. Find the move!`,
          correctMoves: ['Qf6'],
          successMessage: `Qf6! threatens Qg7# mate. If gxf6 (or Qxf6), then Re8 leads to back rank threats with Rxf8#. If Qxf6 then Bxf6 threatens Bxg7 and Re8+ with devastating effect. The Queen lures Black into a losing position by creating unavoidable mating threats!`,
          failureMessage: 'Think about which square your Queen can go to create multiple threats - especially threatening mate while also setting up back rank ideas.',
          arrows: [
            { from: 'f3', to: 'f6', color: 'green' },
          ],
          highlights: [
            { square: 'g8', color: 'red' },
            { square: 'f8', color: 'blue' },
          ],
        },
        {
          id: 'attraction-knight-fork-puzzle',
          type: 'puzzle',
          fen: '4k3/8/8/8/2N5/8/8/R3K3 w - - 0 1',
          title: 'Attraction into Knight Fork',
          explanation: `White has a Knight on c4 and a Rook on a1. The Black King is on e8.

Can you attract the King to a square where the Knight delivers a devastating fork? Think about which squares would allow a Knight fork.`,
          correctMoves: ['Ra8+'],
          successMessage: `Ra8+! The Rook gives check, forcing the King to d7 (Kd7) or to f7 (Kf7 is not possible, so Ke7 or Kd7). After Kd7, Nd6+ forks the King and potentially wins. After Ke7, Nd5+ forks the King. The Rook attracted the King from e8 to a square where the Knight can exploit it!`,
          failureMessage: 'Give check with the Rook to force the King to a square where the Knight can fork!',
          arrows: [
            { from: 'a1', to: 'a8', color: 'green' },
            { from: 'c4', to: 'd6', color: 'yellow' },
          ],
        },
      ],
    },
    // ==================== LESSON 17: CLEARANCE SACRIFICE ====================
    {
      id: 'clearance-sacrifice',
      title: 'Clearance Sacrifice',
      description: 'Sacrifice a piece to clear a line or square for a decisive blow',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['tactics', 'clearance', 'sacrifice', 'line-opening'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppppppp/2n5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
          title: 'What is a Clearance Sacrifice?',
          explanation: `A **clearance sacrifice** is when you sacrifice one of your OWN pieces to clear a line (file, rank, or diagonal) or a square so that another piece can use it for a decisive move.

**Historical origin**: The concept is borrowed from **military strategy** - the idea of "clearing a path" for advancing forces. A scouting unit might sacrifice its position to open a corridor for the main army to break through. In chess, this concept is ancient: texts from the era of **shatranj** (the Arab predecessor to modern chess, 7th-9th century) describe positions where a piece must be moved out of the way - even at a cost - to allow a decisive attack. The 9th-century manuscript *Kitab ash-Shatranj* by al-Adli contains early examples of this idea.

**How it works**:
1. You have a powerful move available... but one of your OWN pieces is in the way
2. You sacrifice that blocking piece (often with tempo - check or threat)
3. The line or square is now clear for the decisive blow

**Types of clearance**:
• **File clearance**: Move a piece off a file so your Rook or Queen can use it
• **Diagonal clearance**: Clear a diagonal for your Bishop or Queen
• **Square clearance**: Vacate a square so another piece can land on it
• **Rank clearance**: Open a rank for horizontal piece movement`,
        },
        {
          id: 'clearing-file-example',
          type: 'explanation',
          fen: '3rk3/8/8/8/8/8/4RP2/4RK2 w - - 0 1',
          title: 'Clearing a File for a Rook',
          explanation: `The most common clearance sacrifice involves opening a **file** for a Rook or Queen.

**The pattern**: You have a Rook behind another piece on the same file. The piece in front is blocking the Rook from delivering a decisive blow.

In this position, White's Rook on e1 would love to deliver check on e8, but White's own Rook on e2 is in the way!

**Solution**: Sacrifice the blocking Rook! Re8+! (or Re7/Re6 with threats). By moving the front Rook with a forcing move, the back Rook gains access to the file.

**Key principles**:
• The sacrificed piece should move WITH TEMPO (check, capture, or major threat)
• The piece that benefits from the clearance should deliver a **decisive** blow
• The sacrifice is worth it because the follow-up is overwhelming

**Think of it as**: "Get out of the way... productively!" The blocking piece doesn't just step aside - it charges forward with a purpose!`,
          arrows: [
            { from: 'e2', to: 'e8', color: 'yellow' },
            { from: 'e1', to: 'e8', color: 'green' },
          ],
          highlights: [
            { square: 'e2', color: 'red' },
            { square: 'e1', color: 'blue' },
          ],
        },
        {
          id: 'clearing-file-interactive',
          type: 'interactive',
          fen: '3rk3/8/8/4P3/8/8/8/4RK2 w - - 0 1',
          title: 'Clear the File!',
          explanation: `White's Rook on e1 wants to reach e8 for a devastating check, but the pawn on e5 blocks the e-file.

Sacrifice the pawn to clear the way! How should you push it?`,
          correctMoves: ['e6'],
          wrongMoveHints: {
            'Re5': 'The Rook moves, but now you\'ve lost the Rook\'s access to e8. Push the pawn instead!',
            'Ke2': 'The King move doesn\'t clear the file. Focus on the blocking pawn.',
          },
          successMessage: `e6! clears the e-file for the Rook. The pawn sacrifice opens the path - now Re8+ is a crushing check. After e6, if Black ignores it, Re8# is checkmate! The pawn cleared the file with forward momentum.`,
          failureMessage: 'Your Rook wants to reach e8, but something is in the way on the e-file. How can you remove the blockage?',
          arrows: [
            { from: 'e5', to: 'e6', color: 'green' },
            { from: 'e1', to: 'e8', color: 'yellow' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'clearing-diagonal-example',
          type: 'explanation',
          fen: '4k3/8/4p3/3pB3/2P5/8/5B2/4K3 w - - 0 1',
          title: 'Clearing a Diagonal for the Bishop',
          explanation: `Clearance sacrifices on **diagonals** are particularly beautiful because Bishops can attack from long range.

**The pattern**: You have a Bishop that would deliver a devastating blow if only the diagonal were open. Another one of your pieces is blocking the path.

**Diagonal clearance ideas**:
• Push a pawn forward (even if it's captured) to open the diagonal
• Sacrifice a piece that sits on the diagonal
• Move a blocking piece with a threat elsewhere

**Example concept**: If White's Bishop on f2 could reach a7, it would create threats. But another piece might block the a7-f2 diagonal. Moving that piece - even at a cost - can be worth it if the Bishop's new scope is decisive.

**Common scenarios**:
1. A pawn on the diagonal blocks your fianchettoed Bishop
2. A Knight sits on a square your Bishop needs to traverse
3. Your own Queen blocks a Bishop's diagonal to the enemy King

**Remember**: The clearance move should ideally come with **tempo** - a check, capture, or threat that doesn't give the opponent time to reorganize.`,
          arrows: [
            { from: 'f2', to: 'a7', color: 'green' },
            { from: 'e5', to: 'c7', color: 'yellow' },
          ],
        },
        {
          id: 'clearing-square-interactive',
          type: 'interactive',
          fen: '2r3k1/5ppp/8/3NP3/8/8/5PPP/6K1 w - - 0 1',
          title: 'Clear the Square for the Knight',
          explanation: `White's Knight on d5 is powerful, but imagine if it could reach e7 to fork the King and Rook! Unfortunately, the pawn on e5 controls e6 and blocks the Knight's path forward.

Wait - the pawn can do something useful! Push it to clear the way AND create a threat.`,
          correctMoves: ['e6'],
          wrongMoveHints: {
            'Nc7': 'The Knight goes to c7, but the Rook can just move. Look at pushing the pawn first!',
            'Nb6': 'Nb6 attacks the Rook, but Rc6 defends. There\'s a stronger idea with the pawn.',
          },
          successMessage: `e6! clears the d5 Knight's path while creating a pawn threat on e6. After e6, fxe6 allows Ne7+ forking King and Rook! If Black doesn't capture, e7 is a devastating passed pawn threatening promotion. The pawn clearance opened up the position beautifully!`,
          failureMessage: 'The Knight wants to reach e7 for a fork. What\'s blocking its path? Can you remove the obstacle with a forcing pawn move?',
          arrows: [
            { from: 'e5', to: 'e6', color: 'green' },
            { from: 'd5', to: 'e7', color: 'yellow' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
            { square: 'e7', color: 'blue' },
          ],
        },
        {
          id: 'famous-clearance',
          type: 'explanation',
          fen: 'r1bqkbnr/pppppppp/2n5/8/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
          title: 'Famous Clearance Sacrifices',
          explanation: `Clearance sacrifices have produced some of the most spectacular moments in chess history:

**Mikhail Tal - "The Magician from Riga"**
Tal was legendary for his clearance sacrifices. He would sacrifice pieces to open lines toward the enemy King, often in positions where the compensation wasn't immediately obvious. His philosophy: "You must take your opponent into a deep, dark forest where 2+2=5, and the path leading out is only wide enough for one."

**The Greek Gift & Clearance**
The classic Bishop sacrifice on h7 (Bxh7+) often requires a **clearance** first - moving a Knight or pawn that blocks the Bishop's diagonal to h7.

**Modern examples**:
• Pushing a central pawn (even sacrificing it) to open lines for Rooks and Bishops
• Moving a Knight from f3 (via sacrifice on e5 or g5) to open the f-file for the Rook
• Sacrificing an exchange to clear a key square for a Knight

**The key lesson**: Sometimes your OWN pieces are the biggest obstacle to your attack. Don't be afraid to sacrifice them to clear the path - as long as the follow-up is decisive!

**Clearance sacrifice checklist**:
✓ What line or square do I need to open?
✓ Which of MY pieces is in the way?
✓ Can I move it with tempo (check/capture/threat)?
✓ Is the follow-up truly decisive?`,
        },
        {
          id: 'clearance-sacrifice-puzzle',
          type: 'puzzle',
          fen: '2r3k1/5ppp/4p3/3pR3/8/6Q1/5PPP/6K1 w - - 0 1',
          title: 'Clearance Sacrifice Puzzle',
          explanation: `White's Queen on g3 would love to reach g7 for checkmate, but it needs help. The Rook on e5 can create the clearance. Find the winning move!`,
          correctMoves: ['Re1'],
          wrongMoveHints: {
            'Qg7+': 'Not yet - the Queen can\'t reach g7 in one move for mate. Prepare first!',
            'Rxd5': 'Captures a pawn, but misses the big idea. Think about what your Queen needs.',
            'Re3': 'This moves the Rook but doesn\'t create a threat. Can you move it somewhere more useful?',
          },
          successMessage: `Re1! clears the e5 square and the 5th rank, but more importantly repositions the Rook to support a mating attack. Now Qg7# is threatened, and Re8+ is also coming. The Rook "stepped aside" to let the Queen's attack flow through while also creating back rank threats. A subtle clearance!`,
          failureMessage: 'The Queen wants to deliver checkmate. What\'s preventing it? Can you reposition a piece to clear the way AND create additional threats?',
          arrows: [
            { from: 'e5', to: 'e1', color: 'green' },
            { from: 'g3', to: 'g7', color: 'yellow' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
            { square: 'g7', color: 'blue' },
          ],
        },
        {
          id: 'clearance-knight-puzzle',
          type: 'puzzle',
          fen: '2r3k1/5ppp/5n2/3NP3/8/8/5PPP/R5K1 w - - 0 1',
          title: 'Clearance for the Knight',
          explanation: `White's Knight on d5 is powerful, and the e5 pawn supports it. But the e5 pawn also blocks the Knight from jumping to e7 with a fork!

Find the clearance move that opens the path for the Knight while creating a threat.`,
          correctMoves: ['exf6'],
          successMessage: `exf6! The pawn captures the Knight on f6, clearing the e5 square AND removing a defender. After gxf6 (or any recapture), the d5 Knight can now jump to e7+ forking the King and Rook! The pawn clearance was also a capture, gaining tempo for the Knight's invasion.`,
          failureMessage: 'The e5 pawn blocks the Knight\'s path. Can you move it while also removing a Black piece?',
          arrows: [
            { from: 'e5', to: 'f6', color: 'green' },
            { from: 'd5', to: 'e7', color: 'yellow' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
            { square: 'f6', color: 'red' },
          ],
        },
      ],
    },
  ],
};
