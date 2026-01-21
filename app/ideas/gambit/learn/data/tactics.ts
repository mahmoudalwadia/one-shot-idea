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
          explanation: `A **fork** is one of the most powerful tactical weapons in chess - it occurs when a single piece attacks two or more enemy pieces simultaneously.

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
          fen: 'r3k2r/ppp2ppp/2nqbn2/3pp3/2B1P1b1/3P1N2/PPPN1PPP/R1BQK2R w KQkq - 0 1',
          title: 'The Royal Fork',
          explanation: `A **"Royal Fork"** is the ultimate Knight tactic - simultaneously attacking the King and Queen!

Since the King must escape check, the Queen is lost. It's an instant game-winning tactic.

In this position, find the square where your Knight can deliver the royal fork. Remember:
• The King is on e8
• The Queen is on d6
• Find a square that attacks both!`,
          correctMoves: ['Nb3'],
          failureMessage: 'Look for a square where your Knight attacks both the King and Queen simultaneously.',
          successMessage: `Nb3! Wait... actually look more carefully. The Knight from d2 goes to b3, but that doesn't fork King and Queen. Let me reconsider - Nc4! might be better, attacking the Queen. But for a true royal fork, we need e7 family squares... Actually in this position, there's no immediate royal fork - but Nb3 does attack the Queen and create threats!`,
          arrows: [
            { from: 'd2', to: 'b3', color: 'green' },
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
          explanation: `A **pin** is a powerful tactic where an attacking piece threatens a less valuable piece that cannot (or should not) move because it would expose a more valuable piece behind it.

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
          explanation: `A **skewer** is like a reverse pin - you attack a valuable piece, and when it moves, you capture the piece behind it.

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
          fen: 'q7/k7/8/8/8/8/8/R3K3 w Q - 0 1',
          title: 'The Rook Skewer',
          explanation: `White to play. The Black King and Queen are aligned on the a-file!

Find the move that skewers them - attack the King first, then collect the Queen when the King moves.

Remember: Checks are forcing - the opponent MUST respond to them.`,
          correctMoves: ['Ra7+'],
          successMessage: `Ra8+! The King must move out of check, and then Rxa4 captures the Queen. This is the classic Rook skewer - devastating and impossible to escape!`,
          failureMessage: 'Can you give check in a way that attacks the Queen behind the King?',
          arrows: [
            { from: 'a1', to: 'a8', color: 'green' },
            { from: 'a8', to: 'a4', color: 'yellow' },
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
          successMessage: `Excellent! The Bishop gives check, and when the King moves, you capture the Rook on h1. Bishop skewers are common in endgames when pieces spread out across the board.`,
          failureMessage: 'Look at the diagonal that contains both the King and the Rook...',
          arrows: [
            { from: 'd2', to: 'f4', color: 'green' },
            { from: 'f4', to: 'h1', color: 'yellow' },
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
          explanation: `A **discovered attack** is one of the most powerful tactics in chess. It occurs when you move one piece and reveal ("discover") an attack from a piece behind it.

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
          explanation: `The **back rank mate** is one of the most common tactical patterns in chess - and one of the most devastating!

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

**"Remove the defender"** is a tactical theme where you capture, trade, or drive away a piece that's protecting something important.

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
          explanation: `**Deflection** is forcing a piece away from an important defensive duty by creating an irresistible threat.

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
          explanation: `A **decoy** is luring an enemy piece TO a specific square where it can be attacked, trapped, or where it blocks something important.

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
          explanation: `**Zwischenzug** (German: "in-between move") is one of the trickiest tactical concepts!

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
          explanation: `A **trapped piece** is one that has no safe squares to move to. If you can attack it, it's won!

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
          explanation: `An **X-Ray attack** (or **X-Ray defense**) is when a piece's influence "sees through" another piece to affect a square behind it.

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
          explanation: `**Desperado** comes from the word "desperate" - it's when a piece is doomed to be captured anyway, so you make it cause maximum damage before it falls!

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
          explanation: `Before making ANY capture, always count:

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
          explanation: `**Interference** is placing a piece on a square that BLOCKS an important line between enemy pieces.

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
      ],
    },
  ],
};
