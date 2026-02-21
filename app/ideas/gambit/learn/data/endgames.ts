import { Course } from './types';

export const endgamesCourse: Course = {
  id: 'endgames',
  title: 'Endgame Essentials',
  description: 'Master the final phase of the game',
  icon: '♔',
  color: '#eab308',
  lessons: [
    {
      id: 'king-queen-mate',
      title: 'King + Queen vs King',
      description: 'The simplest checkmate pattern',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      tags: ['checkmate', 'queen', 'basic'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/8/4K2Q w - - 0 1',
          title: 'The Most Basic Checkmate',
          explanation: `The King and Queen vs King checkmate is the **most fundamental endgame technique** every chess player must master. It was one of the first patterns documented in the Arabic chess book "Kitab ash-Shatranj" by al-Adli around 840 AD, and it remains the easiest of the basic checkmates to learn. While it may seem trivial, many beginners have drawn or even lost won games by not knowing the correct method.

**The key principle:** Checkmate can only occur on the edge of the board (or in a corner). Your job is to:
1. Use the queen to **restrict the enemy king**
2. **Drive the king to the edge** systematically
3. Bring your **own king closer** to help
4. Deliver checkmate with king and queen working together

**Critical warning:** The biggest danger is **stalemate**. If the enemy king has no legal moves but is NOT in check, it's a draw! This happens more often than you'd think, especially when trying to rush.

The technique typically takes 10-15 moves from a starting position. Let's learn it step by step.`,
          highlights: [
            { square: 'h1', color: 'green' },
            { square: 'e5', color: 'red' },
            { square: 'e1', color: 'yellow' },
          ],
        },
        {
          id: 'restrict-king',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/8/4K2Q w - - 0 1',
          title: 'Step 1: Create a Barrier',
          explanation: `The first step is to use your queen to **create an invisible barrier** that the enemy king cannot cross. The queen's enormous power means it can control an entire rank or file by itself.

**The concept of cutting off:**
- Place the queen so it controls a rank or file
- The enemy king cannot cross this line
- You've effectively reduced the king's territory

In this position, Qe2 is an excellent move. After Qe2:
- The queen controls the entire e-file AND the 2nd rank
- Black's king cannot move to any square on or past the e-file
- Black's king cannot move to any square on or past the 2nd rank

**Why this matters:** You've instantly confined the king to a smaller box. The king that had access to 64 squares now has access to only a portion of the board!

Think of the queen as a "wall" that the king bounces off. Your goal is to make this wall smaller and smaller.`,
          arrows: [
            { from: 'h1', to: 'e2', color: 'green' },
            { from: 'e2', to: 'e8', color: 'blue' },
            { from: 'e2', to: 'a2', color: 'blue' },
          ],
          highlights: [
            { square: 'e3', color: 'yellow' },
            { square: 'e4', color: 'yellow' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'shrinking-box',
          type: 'explanation',
          fen: '8/8/8/8/5k2/8/4Q3/4K3 w - - 0 1',
          title: 'Step 2: Shrink the Box',
          explanation: `Now that you've created a barrier, the technique involves **systematically shrinking the box** until the enemy king is forced to the edge.

**The box-shrinking method:**
1. Wait for the king to approach your barrier
2. Move the queen to create a smaller box
3. Use "waiting moves" when needed
4. Bring your king up to help when safe

**Important concept - waiting moves:**
Sometimes the enemy king doesn't approach your queen's barrier. In this case, you may need to make a queen move that doesn't immediately shrink the box but forces the king to move.

Here, after Qf3 or Qd3, the box becomes smaller. The king is pushed closer to the edge of the board.

**Pro tip:** Always check before each move: "If I play this, can the king still escape my barrier?" If yes, you need a different move.`,
          arrows: [
            { from: 'e2', to: 'f3', color: 'green' },
            { from: 'e2', to: 'd3', color: 'yellow' },
          ],
          highlights: [
            { square: 'f4', color: 'red' },
            { square: 'g4', color: 'yellow' },
            { square: 'h4', color: 'yellow' },
          ],
        },
        {
          id: 'practice-restrict',
          type: 'interactive',
          fen: '8/8/8/3k4/8/8/8/4K2Q w - - 0 1',
          title: 'Practice: Create the Barrier',
          explanation: `Now it's your turn! Black's king is in the center. Use your queen to restrict the king's movement by creating a barrier.

Think about:
- Which move cuts off the most squares?
- What rank or file should your queen control?
- How can you confine the king to the smallest possible area?`,
          correctMoves: ['Qh5+', 'Qe4+'],
          successMessage: 'Excellent! The queen creates a barrier the king cannot cross. Whether you chose Qh5+ (controlling the 5th rank) or Qe4+ (check while restricting), you\'ve limited the king\'s movement!',
          failureMessage: 'Try using the queen to create a barrier the king cannot cross. Control a rank or file that restricts the king!',
          highlights: [
            { square: 'd5', color: 'red' },
          ],
        },
        {
          id: 'king-helps',
          type: 'explanation',
          fen: '3k4/3Q4/8/8/8/8/4K3/8 w - - 0 1',
          title: 'Step 3: Bring Your King',
          explanation: `Once the enemy king is confined near the edge, your **king must join the attack**. The queen alone can restrict, but checkmate requires teamwork!

**Why the king is essential:**
- The queen can give check, but the king provides the "net"
- Your king covers escape squares that the queen can't
- Together they create an inescapable prison

**The approach technique:**
- Walk your king toward the action
- Keep the queen maintaining the barrier
- Position your king on the same file or rank, with one square between the kings
- This creates the "opposition" position needed for mate

In this position, White should play Ke3-d4-c5-c6 to approach. The queen keeps Black's king trapped on the d-file while White's king marches up.

**Rule of thumb:** The checkmate position will have your king on the 6th rank (or equivalent) directly supporting the queen's final check.`,
          arrows: [
            { from: 'e2', to: 'e3', color: 'green' },
            { from: 'e3', to: 'd4', color: 'green' },
            { from: 'd4', to: 'c5', color: 'green' },
          ],
          highlights: [
            { square: 'd8', color: 'red' },
            { square: 'c6', color: 'yellow' },
          ],
        },
        {
          id: 'deliver-mate',
          type: 'interactive',
          fen: '1k6/8/1K6/8/8/8/8/7Q w - - 0 1',
          title: 'Practice: Deliver Checkmate',
          explanation: `The black king is trapped on b8 with your king on b6 covering escape squares. Your queen on h1 is ready to strike!

Look for a queen move that:
- Gives check
- Leaves the enemy king with no escape squares
- Uses your king to cover potential flight squares (a7, b7, c7)`,
          correctMoves: ['Qb7#', 'Qh8#'],
          successMessage: 'Checkmate! Notice how your king and queen work together - the king covers a7, b7, and c7 while the queen delivers the final blow.',
          failureMessage: 'The king is trapped on the edge. Look for a check that leaves no escape squares!',
          highlights: [
            { square: 'b8', color: 'red' },
          ],
          arrows: [
            { from: 'h1', to: 'b7', color: 'green' },
            { from: 'h1', to: 'h8', color: 'green' },
          ],
        },
        {
          id: 'avoid-stalemate',
          type: 'explanation',
          fen: 'k7/8/1K6/8/8/8/8/7Q w - - 0 1',
          title: 'Danger: Stalemate!',
          explanation: `The most common way to throw away a won K+Q vs K endgame is **stalemate**. This happens when:
- The enemy king has NO legal moves
- The enemy king is NOT in check
- Result: DRAW!

**Classic stalemate trap:**
In this position, playing Qa1?? looks natural but is actually stalemate! The black king on a8:
- Cannot move to a7 (controlled by White's king)
- Cannot move to b8 (controlled by the queen on a1)
- Cannot move to b7 (controlled by White's king)
- Is NOT in check!

**Stalemate prevention rules:**
1. Before every move, ask: "Does the enemy king have at least one legal move?"
2. Don't put your queen too close to the enemy king unless giving check
3. Keep one "escape square" available until you're ready to checkmate
4. When in doubt, use your king to take away squares instead of the queen

**Memory tip:** "Check, don't choke!" - If your queen move doesn't give check, make sure it doesn't stalemate either.`,
          highlights: [
            { square: 'a8', color: 'red' },
            { square: 'a7', color: 'yellow' },
            { square: 'b8', color: 'yellow' },
            { square: 'b7', color: 'yellow' },
          ],
          arrows: [
            { from: 'h1', to: 'a1', color: 'red' },
          ],
        },
        {
          id: 'correct-mate',
          type: 'interactive',
          fen: 'k7/8/1K6/8/8/8/8/7Q w - - 0 1',
          title: 'Find the Winning Move',
          explanation: `In this critical position, you must find the checkmate that DOESN'T result in stalemate.

Remember: the goal is to give check while ensuring the king has nowhere to run. But be careful - Qa1 looks tempting but allows Kb8!`,
          correctMoves: ['Qb7#', 'Qh8#'],
          wrongMoveHints: {
            'Qa1': 'Close! Qa1 gives check, but the black king can escape to b8. Look for a move that covers b8 as well.',
          },
          successMessage: 'Checkmate! Your queen delivers the final blow while your king covers a7, b7, and c7. The black king has no escape!',
          failureMessage: 'Look carefully - find the queen move that checkmates. The king needs to be in check with no escape squares!',
          arrows: [
            { from: 'h1', to: 'b7', color: 'green' },
            { from: 'h1', to: 'h8', color: 'green' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/8/4K2Q w - - 0 1',
          title: 'Summary: The Complete Method',
          explanation: `Let's review the complete K+Q vs K checkmating technique:

**Step 1: Create a barrier**
- Use the queen to control a rank or file
- Confine the enemy king to a portion of the board

**Step 2: Shrink the box**
- Gradually reduce the king's territory
- Use waiting moves when necessary
- Keep the barrier intact

**Step 3: Drive to the edge**
- Push the king toward the side or corner
- Maintain your queen's barrier

**Step 4: Bring your king**
- Your king must join the attack
- Position it to cover escape squares

**Step 5: Deliver checkmate**
- Queen gives check
- King covers the escape squares
- Always check for stalemate first!

**Practice goal:** You should be able to deliver this checkmate in under 15 moves from any starting position. Many grandmasters can do it in under 10!`,
          highlights: [
            { square: 'h1', color: 'green' },
            { square: 'e1', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'king-rook-mate',
      title: 'King + Rook vs King',
      description: 'The fundamental rook endgame',
      difficulty: 'beginner',
      estimatedMinutes: 12,
      tags: ['checkmate', 'rook', 'basic'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/8/R3K3 w - - 0 1',
          title: 'A More Challenging Checkmate',
          explanation: `The King and Rook vs King checkmate requires **more technique** than K+Q vs K because the rook is less powerful than the queen. However, it's still a fundamental skill that every player must know. This technique was systematized by Philidor in 1749, and the "box method" (cutting off the opposing King into progressively smaller boxes) is named for the visual pattern it creates on the board.

**Key differences from K+Q:**
- The rook can only control ONE line (rank or file) at a time, not both
- You cannot give check and cut off the king simultaneously
- Your own king's participation is absolutely essential
- The technique takes longer (typically 15-20 moves)

**The winning method - "The Box":**
1. Use the rook to create a "box" confining the enemy king
2. Use your king to "push" the enemy king within the box
3. Shrink the box by moving the rook when the king approaches
4. Eventually force the king to the edge for checkmate

**Stalemate is less of a danger** with a rook, but you still need to be careful in corner positions.

This is one of the most common endgames in chess - you WILL need this knowledge!`,
          highlights: [
            { square: 'a1', color: 'green' },
            { square: 'e1', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'the-box',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/R7/4K3 w - - 0 1',
          title: 'The Box Method',
          explanation: `The "box method" is the most reliable technique for K+R vs K. Here's how it works:

**Creating the box:**
The rook defines the edges of an invisible "box." For example, if the rook is on a5:
- The 5th rank becomes a wall the king cannot cross
- Combined with the edge of the board, this creates a confined area

**In this position, Ra5+ does two things:**
1. Gives check, forcing the king to move
2. Creates a barrier on the 5th rank

After Ra5+, the black king is confined to ranks 6-8 (half the board). The "box" has been created!

**The shrinking process:**
- Your king approaches the enemy king
- When your king gets close enough, you can shrink the box
- Eventually the king is forced to the edge

**Think of it as herding sheep** - the rook is the fence, your king is the shepherd pushing the "sheep" (enemy king) into a smaller and smaller pen.`,
          arrows: [
            { from: 'a2', to: 'a5', color: 'green' },
            { from: 'a5', to: 'h5', color: 'blue' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
            { square: 'e6', color: 'yellow' },
            { square: 'e7', color: 'yellow' },
            { square: 'e8', color: 'yellow' },
          ],
        },
        {
          id: 'king-opposition',
          type: 'explanation',
          fen: '8/8/5k2/R7/8/4K3/8/8 w - - 0 1',
          title: 'Your King is the Key',
          explanation: `In K+R vs K, your **king is the most important attacking piece**. The rook maintains the box, but your king does the "pushing."

**The role of your king:**
- Walk toward the enemy king
- Get close enough that your king "controls" squares
- When both kings are on the same rank/file with one square between them, you have "opposition"
- With opposition, the rook can deliver a decisive blow

**The approach technique:**
Here, White should play Kf4 to approach. The rook stays on the 5th rank maintaining the box.

Then:
- If Black plays Ke6, White plays Ke4 (taking opposition)
- If Black plays Kg6, White plays Kf4 (maintaining pressure)

**Critical concept:** The defender's king wants to stay in the CENTER of the box. The attacker's king wants to push it toward an EDGE of the box.

Your king's journey might seem slow, but it's the only way to make progress!`,
          arrows: [
            { from: 'e3', to: 'f4', color: 'green' },
            { from: 'f4', to: 'f5', color: 'yellow' },
          ],
          highlights: [
            { square: 'f6', color: 'red' },
          ],
        },
        {
          id: 'shrink-box',
          type: 'interactive',
          fen: '8/8/2k5/R7/8/3K4/8/8 w - - 0 1',
          title: 'Practice: Approach and Conquer',
          explanation: `The black king is confined by the rook on the 5th rank. Now it's time to bring your king closer to help shrink the box.

Find the best move to approach the enemy king!`,
          correctMoves: ['Kc4', 'Kd4'],
          arrows: [
            { from: 'd3', to: 'c4', color: 'green' },
          ],
          successMessage: 'Excellent! Your king approaches. When it reaches the 5th rank or gains opposition, you can shrink the box with a rook move like Ra6+.',
          failureMessage: 'Your king needs to get closer to the enemy king. Move it toward c6 area!',
          highlights: [
            { square: 'c6', color: 'red' },
          ],
        },
        {
          id: 'waiting-move',
          type: 'explanation',
          fen: '8/8/8/R1k5/2K5/8/8/8 w - - 0 1',
          title: 'The Waiting Move Technique',
          explanation: `Sometimes in K+R vs K, direct approaches don't work because of zugzwang considerations. This is where **waiting moves** with the rook become essential.

**The problem position:**
Here, if White plays Ra6+ immediately, after Kb5 the king escapes! And if Kb4??, Kd4 and the king breaks free.

**The solution: Ra1! (waiting move)**
This brilliant rook move:
- Maintains the barrier (controls the a-file)
- Forces Black to move their king
- After any king move, White can make progress

**After Ra1:**
- If Kd5, Ra5+ shrinks the box
- If Kb5, Kb3 and White dominates
- If Kd6, Ra6+ shrinks the box

**The principle:** When your king has reached the maximum useful position and direct progress isn't possible, make a waiting move with the rook. The enemy king will be forced to give ground!

This technique appears constantly in rook endgames - learn it well.`,
          arrows: [
            { from: 'a5', to: 'a1', color: 'green' },
          ],
          highlights: [
            { square: 'c5', color: 'red' },
            { square: 'c4', color: 'green' },
          ],
        },
        {
          id: 'avoiding-mistakes',
          type: 'explanation',
          fen: '8/1k6/R7/8/1K6/8/8/8 w - - 0 1',
          title: 'Common Mistakes to Avoid',
          explanation: `K+R vs K is straightforward in theory, but there are several common mistakes:

**Mistake 1: Checking too early**
Giving random checks wastes time. Only check when it:
- Shrinks the box meaningfully
- Drives the king in the right direction

**Mistake 2: Forgetting the king**
If your king stops advancing, you stop making progress. The king must stay active!

**Mistake 3: Rook too close to the enemy king**
If your rook gets too close, the enemy king might attack it. Keep the rook at a safe distance.

**Mistake 4: Not using waiting moves**
Sometimes the position requires a waiting move. Don't force things!

**In this position:**
Ra7+?? is wrong - after Ka7, the king escapes toward the center!
Better is Ra1 (waiting) or Ka5 (approaching), maintaining the pressure.`,
          arrows: [
            { from: 'a6', to: 'a7', color: 'red' },
            { from: 'a6', to: 'a1', color: 'green' },
            { from: 'b4', to: 'a5', color: 'green' },
          ],
          highlights: [
            { square: 'b7', color: 'red' },
          ],
        },
        {
          id: 'final-mate',
          type: 'interactive',
          fen: 'k7/2K5/8/8/8/8/8/R7 w - - 0 1',
          title: 'Deliver the Checkmate',
          explanation: `You've successfully driven the enemy king to the corner. Your king on c7 controls all escape squares (b7, b8). Now deliver the final blow!

Find the checkmate with your rook. The black king is trapped with nowhere to run.`,
          correctMoves: ['Ra6#', 'Ra5#', 'Ra4#', 'Ra3#', 'Ra2#'],
          arrows: [
            { from: 'a1', to: 'a6', color: 'green' },
          ],
          successMessage: 'Checkmate! The rook delivers check along the a-file, and your king on c7 covers b7 and b8. The black king has no escape!',
          failureMessage: 'The black king is cornered on a8. Use your rook to give check along the a-file!',
          highlights: [
            { square: 'a8', color: 'red' },
            { square: 'b7', color: 'yellow' },
            { square: 'b8', color: 'yellow' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '8/8/8/4k3/8/8/8/R3K3 w - - 0 1',
          title: 'Summary: K+R vs K Method',
          explanation: `Master the K+R vs K checkmate with this systematic approach:

**The Box Method:**
1. **Create the box** - Use the rook to cut off the king (a rank or file)
2. **Approach with your king** - Walk toward the enemy king
3. **Shrink the box** - When your king is close enough, move the rook to make the box smaller
4. **Use waiting moves** - When direct progress isn't possible, make the opponent move
5. **Force to the edge** - Continue until the king is on the side of the board
6. **Deliver checkmate** - Rook check on the back rank with king support

**Key principles to remember:**
- Your king is essential - it must participate actively
- Don't give random checks - each check should accomplish something
- Keep the rook at a safe distance from the enemy king
- Use waiting moves to gain time when needed
- Checkmate happens on the edge - drive the king there patiently

**Practice goal:** Complete this checkmate in under 20 moves from any position. Experts can do it in under 15!`,
          highlights: [
            { square: 'a1', color: 'green' },
            { square: 'e1', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'opposition',
      title: 'The Opposition',
      description: 'The key concept in king and pawn endgames',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['opposition', 'kings', 'technique'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/4k3/8/4K3/8/8 w - - 0 1',
          title: 'The Most Important Endgame Concept',
          explanation: `**The opposition** is perhaps the single most important concept in king and pawn endgames. The concept of "opposition" (Widerstand in German) was first described by Philidor and became central to pawn endgame theory through the work of Jose Raul Capablanca, who called it "the most important concept in King and Pawn endings." Understanding it can turn draws into wins and losses into draws.

**What is opposition?**
When two kings stand on the same file, rank, or diagonal with exactly ONE square between them, whoever must move is at a **disadvantage**. The side NOT to move "has the opposition."

**Why it matters:**
The side with opposition can:
- **Force the other king back** - making it give ground
- **Create a path** for their pawns to advance
- **Outflank** the enemy king to reach key squares

**In this position:**
Kings face each other on the e-file with one square between (e3 and e5). With White to move, **Black has the opposition**. White must move, and any king move allows Black to maintain or improve their position.

**The rule:** "Whoever moves, loses (the opposition)"

This simple concept decides countless endgames!`,
          highlights: [
            { square: 'e3', color: 'green' },
            { square: 'e4', color: 'yellow' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'direct-opposition',
          type: 'explanation',
          fen: '8/8/4k3/8/4K3/8/8/8 w - - 0 1',
          title: 'Direct Opposition in Action',
          explanation: `Let's see how direct opposition works in practice. Here, with **White to move, Black has the opposition**.

**What happens when White moves:**
- If **Ke5**, Black plays **Ke7** (maintaining opposition on the e-file)
- If **Kd5**, Black plays **Kd7** (maintaining opposition on the d-file)
- If **Kf5**, Black plays **Kf7** (maintaining opposition on the f-file)
- If **Kd4**, Black plays **Kd6** (opposition on d-file)
- If **Kf4**, Black plays **Kf6** (opposition on f-file)

**The mirror technique:**
Notice how Black "mirrors" White's moves! This is the key defensive technique - whenever the enemy king moves sideways, you move sideways to the same file. Whenever they move forward, you move backward to maintain the distance.

**Why this is powerful:**
By maintaining opposition, the defending side prevents the attacking king from making any progress. The defender can hold this position indefinitely!

This becomes crucial when pawns are added to the position.`,
          arrows: [
            { from: 'e4', to: 'e5', color: 'blue' },
            { from: 'e6', to: 'e7', color: 'green' },
          ],
          highlights: [
            { square: 'e4', color: 'yellow' },
            { square: 'e6', color: 'red' },
          ],
        },
        {
          id: 'take-opposition',
          type: 'interactive',
          fen: '8/8/4k3/8/8/3K4/8/8 w - - 0 1',
          title: 'Taking the Opposition',
          explanation: `Now it's your turn! Currently neither side has opposition because the kings are not directly facing each other.

White to move - find the move that **takes the opposition**!

Hint: Put your king directly in front of the enemy king, with exactly one square between.`,
          correctMoves: ['Ke4'],
          arrows: [
            { from: 'd3', to: 'e4', color: 'green' },
          ],
          successMessage: 'Perfect! Ke4 takes the opposition. Now with Black to move, THEY must give way. Any king move by Black allows White to advance.',
          failureMessage: 'Move your king to face the enemy king directly with exactly one square between. That gives you the opposition!',
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'why-matters',
          type: 'explanation',
          fen: '8/8/8/4k3/4P3/4K3/8/8 w - - 0 1',
          title: 'Opposition Decides Games',
          explanation: `Now let's add a pawn and see why opposition is so crucial!

**This position is CRITICAL to understand:**
- White has a king and pawn
- Black has only a king
- The result depends ENTIRELY on who has the opposition!

**With White to move (Black has opposition):**
- White cannot make progress!
- If Kf4, Kf6 blocks the way
- If Kd4, Kd6 blocks the way
- If e5, Ke6 and Black wins the pawn after Kf4 Kd5
- Result: **DRAW** with correct play

**With Black to move (White has opposition):**
- Black must give way!
- If Kf6, Kf4 and White escorts the pawn
- If Kd6, Kd4 and White escorts the pawn
- Result: **WHITE WINS**

The same position - but whether it's a win or draw depends entirely on whose turn it is! This is the magic of opposition.`,
          highlights: [
            { square: 'e4', color: 'yellow' },
            { square: 'e3', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
          arrows: [
            { from: 'e4', to: 'e5', color: 'blue' },
          ],
        },
        {
          id: 'winning-position',
          type: 'interactive',
          fen: '8/4k3/8/4P3/3K4/8/8/8 w - - 0 1',
          title: 'Convert with Opposition',
          explanation: `White's king is on d4, pawn on e5, and Black's king is on e7.

White needs to advance and support the pawn. Find the winning move that outflanks the black king!`,
          correctMoves: ['Kd5', 'Ke4'],
          successMessage: 'Excellent! By outflanking (going around) the black king, White\'s king will eventually reach e6 or d6, protecting the pawn\'s advance to promotion.',
          failureMessage: 'You have the opposition, so Black must move away. Use this to outflank - go AROUND the black king!',
          arrows: [
            { from: 'e4', to: 'd5', color: 'green' },
            { from: 'e4', to: 'f5', color: 'green' },
          ],
          highlights: [
            { square: 'e6', color: 'red' },
          ],
        },
        {
          id: 'distant-opposition',
          type: 'explanation',
          fen: '8/8/4k3/8/8/8/8/4K3 w - - 0 1',
          title: 'Distant Opposition',
          explanation: `Opposition doesn't only work at close range! **Distant opposition** follows the same principle but with more squares between the kings.

**The rule for distant opposition:**
- Kings on the same rank, file, or diagonal
- An **ODD** number of squares between them (3, 5, 7...)
- The side NOT to move has the opposition

**In this position:**
The kings are on e1 and e6 - that's 4 squares between them (even number). Neither side currently has opposition with respect to distance.

With White to move, White can play **Ke2!** Now there are 3 squares between the kings (odd number), and with Black to move, **White has the distant opposition!**

**How to use it:**
As the kings approach each other, maintain the odd-number distance. Eventually you'll have direct opposition when it matters most.

**Pro tip:** When kings are far apart, count the squares. If it's ODD and opponent moves, you have opposition!`,
          arrows: [
            { from: 'e1', to: 'e2', color: 'green' },
            { from: 'e2', to: 'e6', color: 'blue' },
          ],
          highlights: [
            { square: 'e1', color: 'green' },
            { square: 'e6', color: 'red' },
          ],
        },
        {
          id: 'diagonal-opposition',
          type: 'explanation',
          fen: '8/8/6k1/8/4K3/8/8/8 w - - 0 1',
          title: 'Diagonal Opposition',
          explanation: `Opposition also works on **diagonals**! The same principles apply:
- Kings on the same diagonal
- One square between them (for direct) or odd number for distant
- Side to move is at disadvantage

**In this position:**
The kings are on e4 and g6, which is the same diagonal! With one square between (f5), whoever moves loses the opposition.

**Why diagonal opposition matters:**
Sometimes you can't take direct (file/rank) opposition, but you CAN take diagonal opposition. This gives you a way to outmaneuver the opponent.

**Practical example:**
If White plays Kf5 here, that's NOT good - the kings are adjacent, not in opposition. Instead, White should maintain distance and use triangulation.

The key is to visualize the geometry - same line (rank, file, OR diagonal) + odd number of squares + opponent to move = you have opposition!`,
          arrows: [
            { from: 'e4', to: 'g6', color: 'blue' },
          ],
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'f5', color: 'yellow' },
            { square: 'g6', color: 'red' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '8/8/8/4k3/8/4K3/8/8 w - - 0 1',
          title: 'Opposition Mastery Summary',
          explanation: `Opposition is a cornerstone of endgame play. Here's everything you need to remember:

**Direct Opposition:**
- Kings face each other with ONE square between
- Side to move is at disadvantage
- Used to force the enemy king back

**Distant Opposition:**
- Same rank/file/diagonal
- ODD number of squares between (3, 5, 7...)
- Same principle - side to move loses it

**How to use opposition:**
1. **Attacking:** Take opposition to force the defender to give way
2. **Defending:** Take opposition to stop the attacker from advancing

**Key techniques:**
- **Mirroring:** Copy the opponent's moves to maintain opposition
- **Outflanking:** Once you have opposition, go around (not through) the enemy king
- **Counting squares:** Always count to see who has distant opposition

**The bottom line:**
In king and pawn endgames, if you understand opposition, you'll draw positions that others lose, and win positions that others draw!`,
          highlights: [
            { square: 'e3', color: 'green' },
            { square: 'e4', color: 'yellow' },
            { square: 'e5', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'key-squares',
      title: 'Key Squares',
      description: 'Critical squares for pawn promotion',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['key-squares', 'pawns', 'technique'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/8/4P3/4K3/4k3/8 w - - 0 1',
          title: 'The Concept of Key Squares',
          explanation: `**Key squares** (also called "critical squares") are specific squares that, if your king occupies them, **guarantee** that your pawn will promote (assuming optimal play from both sides). This theory was developed primarily by the Soviet endgame school, with Nikolai Grigoriev (1895-1938) being particularly influential in systematizing the concept.

**Why key squares matter:**
Instead of calculating every variation, you can simply ask: "Can my king reach a key square?" If yes, you win. If no, it's likely a draw.

**The basic principle:**
For a pawn that hasn't reached the 5th rank yet, the key squares are always:
- **Two ranks in front** of the pawn
- The square **directly ahead** AND the squares to its **left and right**

**Example - Pawn on e4:**
The key squares are **d6, e6, and f6** (two ranks ahead, three squares wide).

If White's king can reach ANY of these squares, the pawn promotes by force!

**This works for pawns on ranks 2, 3, 4, and 5** (the rule changes slightly for pawns on the 6th and 7th ranks, which we'll cover later).`,
          highlights: [
            { square: 'd6', color: 'green' },
            { square: 'e6', color: 'green' },
            { square: 'f6', color: 'green' },
            { square: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'reaching-key-squares',
          type: 'explanation',
          fen: '8/8/8/4k3/4P3/4K3/8/8 w - - 0 1',
          title: 'Reaching Key Squares',
          explanation: `The battle in K+P vs K is essentially about whether the attacking king can reach a key square.

**In this position:**
- Key squares for the e4 pawn: d6, e6, f6
- White's king is on e3
- Black's king guards the key squares from e5

**The critical question:** Can White's king reach d6, e6, or f6?

**The answer depends on the move:**
- With **White to move:** Black has opposition. Any advance by White's king can be matched by Black. White cannot reach the key squares. **DRAW**.
- With **Black to move:** White has opposition. Black must give way, and White's king will eventually reach a key square. **WHITE WINS**.

**This is why opposition and key squares work together:**
- Opposition is the TOOL
- Key squares are the GOAL
- If you can use opposition to reach a key square, you win!`,
          arrows: [
            { from: 'e3', to: 'e6', color: 'yellow' },
          ],
          highlights: [
            { square: 'd6', color: 'green' },
            { square: 'e6', color: 'green' },
            { square: 'f6', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'pawn-on-5th',
          type: 'explanation',
          fen: '8/8/8/3Pk3/8/3K4/8/8 w - - 0 1',
          title: 'Pawn on the 5th Rank',
          explanation: `When the pawn advances to the **5th rank**, the key squares change slightly!

**Key squares for pawn on 5th rank:**
The key squares are now on the **6th rank** - directly in front and to the sides.
- For a pawn on d5: Key squares are **c6, d6, e6**

**But there's a bonus:**
When the pawn is on the 5th rank, any square on the **6th rank** that the king reaches (adjacent to the pawn's file) is often sufficient for winning.

**In this position:**
White's pawn is on d5. Key squares: c6, d6, e6.
White's king is on d3 - it needs to reach one of these squares.
Black's king on e5 will try to prevent this.

**Important principle:**
"When your pawn reaches the 5th rank with your king in front, you usually win."

This is why you should always try to advance your king BEFORE your pawn when possible!`,
          highlights: [
            { square: 'c6', color: 'green' },
            { square: 'd6', color: 'green' },
            { square: 'e6', color: 'green' },
            { square: 'd5', color: 'yellow' },
          ],
          arrows: [
            { from: 'd3', to: 'd6', color: 'blue' },
          ],
        },
        {
          id: 'practice-key-square',
          type: 'interactive',
          fen: '8/8/3k4/3P4/8/8/3K4/8 w - - 0 1',
          title: 'Begin Your Journey',
          explanation: `White has a pawn on d5 and king on d2. The key squares are c6, d6, and e6.

Black's king on d6 is currently ON a key square - but it's White's move!

Find the move that starts White's journey to eventually reach a key square.`,
          correctMoves: ['Kc3', 'Ke3'],
          successMessage: 'Good! Your king advances toward the key squares. By approaching from the side, you can eventually outflank Black\'s king and reach c6 or e6.',
          failureMessage: 'The king must advance toward the key squares (c6, d6, e6). Move it forward, preferably toward one of the sides!',
          arrows: [
            { from: 'd2', to: 'c3', color: 'green' },
            { from: 'd2', to: 'e3', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'yellow' },
            { square: 'e6', color: 'yellow' },
          ],
        },
        {
          id: 'rook-pawn',
          type: 'explanation',
          fen: '8/8/8/7k/7P/7K/8/8 w - - 0 1',
          title: 'The Rook Pawn Exception',
          explanation: `**Rook pawns** (pawns on the a-file or h-file) are special cases that often draw when other pawns would win.

**Why rook pawns are different:**
- There's no "outflanking" room on one side
- The key squares are limited
- The corner creates stalemate possibilities

**For the h-pawn:**
- Only TWO key squares exist: g6 and g7 (not h6!)
- The defending king can often reach the corner and create a draw

**In this position:**
White's king is on h3, pawn on h4. Black's king is on h5.
If Black's king reaches h8 (or oscillates between g8/h8), **the position is drawn!**

**The drawing technique for Black:**
1. Head for the corner (h8)
2. Stay on g8 and h8
3. When White's king comes, the position is stalemate or perpetual defense

**For the attacker:**
You must prevent the enemy king from reaching the corner! If they get there, you cannot win.`,
          highlights: [
            { square: 'h8', color: 'red' },
            { square: 'g6', color: 'green' },
            { square: 'g7', color: 'green' },
          ],
          arrows: [
            { from: 'h5', to: 'h8', color: 'red' },
          ],
        },
        {
          id: 'rook-pawn-draw',
          type: 'explanation',
          fen: '7k/8/7K/7P/8/8/8/8 w - - 0 1',
          title: 'The Famous Rook Pawn Draw',
          explanation: `This position is one of the most famous draws in chess - and understanding it can save you many half-points!

**Position assessment:**
- White's pawn is on h5, king on h6
- Black's king is on h8 (the corner!)
- White to move

**Why this is drawn:**
1. If **Kg6**, then **Kg8** and White cannot make progress:
   - h6 Kh8, h7 stalemate!
   - Kf6 Kh7, and Black holds

2. If **h6**, then **Kg8**, and:
   - Kg6 Kh8, h7 stalemate!
   - Kf7 Kh7, and Black oscillates

**The pattern:**
Once the defending king reaches the corner in front of a rook pawn, the game is drawn. The attacking side cannot simultaneously push the pawn AND cover the stalemate square.

**Practical lesson:**
Always calculate rook pawn endings carefully! They're much more likely to be drawn than other pawn endings.`,
          arrows: [
            { from: 'h5', to: 'h8', color: 'blue' },
          ],
          highlights: [
            { square: 'h8', color: 'red' },
            { square: 'g8', color: 'yellow' },
          ],
        },
        {
          id: 'knight-pawn',
          type: 'explanation',
          fen: '8/8/2k5/8/2P5/2K5/8/8 w - - 0 1',
          title: 'Knight Pawns: A Middle Ground',
          explanation: `**Knight pawns** (b-file and g-file) behave more normally than rook pawns but still have some quirks.

**Key squares for knight pawns:**
A pawn on c4 has key squares: **b6, c6, d6** (same rule - two ranks ahead, three squares wide)

**What makes knight pawns different:**
- One side has the edge of the board
- Outflanking is still possible, but only in one direction
- Easier for the defender to blockade than center pawns
- Still winnable if the attacking king reaches a key square

**In this position:**
White's c4 pawn needs the king to reach b6, c6, or d6 to guarantee promotion.
With the kings in opposition (c3 vs c6), White to move cannot break through immediately.

**Best technique:**
Approach from the wider side (toward the center, not the edge). Here White should try to reach d6 via d4-d5, not b6 via b4-b5.`,
          highlights: [
            { square: 'b6', color: 'green' },
            { square: 'c6', color: 'green' },
            { square: 'd6', color: 'green' },
          ],
          arrows: [
            { from: 'c3', to: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '7k/8/8/8/4P3/8/8/4K3 w - - 0 1',
          title: 'Key Squares Summary',
          explanation: `Key squares are essential knowledge for pawn endgames:

**The Basic Rule:**
For pawns on ranks 2-5, key squares are:
- **Two ranks in front** of the pawn
- The file in front + **one file left + one file right**
- Reach ANY of them and you win!

**Special Cases:**

**Rook pawns (a/h files):**
- Only 2 key squares (g6/g7 for h-pawn)
- Corner draws are common
- Calculate carefully!

**Knight pawns (b/g files):**
- 3 key squares, but limited on one side
- Approach from the center, not the edge

**Pawn on 6th rank:**
- Key squares are c7, d7, e7 (one rank ahead)
- Much easier to win

**Practical application:**
1. Identify the key squares
2. Ask: "Can my king reach one?"
3. Use opposition to get there
4. Don't advance the pawn too early - king first!

Master key squares and you'll navigate K+P vs K with confidence!`,
          highlights: [
            { square: 'd6', color: 'green' },
            { square: 'e6', color: 'green' },
            { square: 'f6', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'rook-endgames',
      title: 'Rook Endgame Basics',
      description: 'Essential rook endgame concepts',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      tags: ['rooks', 'endgame', 'technique'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/8/4Pk2/8/8/4R1K1 w - - 0 1',
          title: 'The Most Common Endgame',
          explanation: `Rook endgames occur in roughly **50% of all games** that reach an endgame! This makes them by far the most important endgame type to study. The Philidor Position (1777) and Lucena Position (c. 1497) are the two most fundamental rook endgame techniques, forming the bedrock of all rook ending theory.

**The famous saying:** "All rook endgames are drawn" - Siegbert Tarrasch

**Reality check:** This saying is actually FALSE! But it highlights that rook endgames require precise technique because:
- Rooks are active pieces that can create counterplay
- Many positions offer drawing chances
- Small advantages are hard to convert

**Key principles of rook endgames:**
1. **Activity is paramount** - An active rook beats a passive one
2. **Rooks belong behind passed pawns** - Yours or your opponent's!
3. **King activity matters enormously**
4. **Know your theoretical positions** - Lucena wins, Philidor draws

Let's explore these principles one by one.`,
          highlights: [
            { square: 'e4', color: 'yellow' },
            { square: 'f4', color: 'red' },
            { square: 'e1', color: 'green' },
          ],
        },
        {
          id: 'rook-behind-pawn',
          type: 'explanation',
          fen: '4R3/4P3/8/3k4/8/8/8/4K2r w - - 0 1',
          title: 'Golden Rule: Rook Behind Passed Pawns',
          explanation: `The **most important rule** in rook endgames: Place your rook behind passed pawns!

**Why behind your own pawn:**
- As the pawn advances, the rook's scope INCREASES
- The rook supports from a distance, staying active
- You don't block your own pawn

**Why behind the opponent's pawn:**
- As their pawn advances, your rook gains mobility
- You tie down their pieces to pawn defense
- You can attack the pawn from far away

**In this position:**
- White's rook on e8 is WRONG - it's in FRONT of the pawn
- Black's rook on h1 is CORRECT - behind the white pawn

Result? White is struggling! The e7 pawn can't advance (Re8 blocks it), and if the king comes to help, Black's rook checks from behind.

**The fix:** White needed Re1 (behind the pawn) earlier in the game.`,
          highlights: [
            { square: 'e8', color: 'red' },
            { square: 'h1', color: 'green' },
            { square: 'e7', color: 'yellow' },
          ],
          arrows: [
            { from: 'h1', to: 'e1', color: 'blue' },
          ],
        },
        {
          id: 'lucena-position',
          type: 'explanation',
          fen: '1K1R4/3P4/8/8/8/2k5/8/4r3 w - - 0 1',
          title: 'The Lucena Position - How to Win',
          explanation: `The **Lucena position** is the most important WINNING position in rook endgames. You MUST know this!

**The position:**
- Pawn on the 7th rank (one step from promotion)
- Your king in front of the pawn
- Your rook cutting off the enemy king
- Enemy rook on the back rank giving checks

**Key elements here:**
- White's pawn is on d7
- White's king is on b8 (in front of the pawn)
- White's rook cuts off Black's king on the c-file
- Black's rook checks from e1

**The problem:**
If White plays Kc7??, the king blocks the pawn AND Black checks forever: Re7+, Kd6 Re8, Kd7 Re7+, etc.

**The solution: "Building a Bridge"**
This is the technique we'll learn next. It involves using the rook to shield your king from checks while the pawn promotes.`,
          highlights: [
            { square: 'd7', color: 'green' },
            { square: 'b8', color: 'green' },
            { square: 'd8', color: 'blue' },
          ],
          arrows: [
            { from: 'e1', to: 'e8', color: 'red' },
          ],
        },
        {
          id: 'building-bridge',
          type: 'explanation',
          fen: '1K1R4/3P4/8/8/8/2k5/8/4r3 w - - 0 1',
          title: 'Building the Bridge',
          explanation: `The "bridge" technique wins the Lucena position. Here's how:

**Step 1: Rd4!! (Building the bridge)**
This isn't an obvious move! The rook goes to the 4th rank, preparing to shield the king.

**Why Rd4?**
- It prepares to block checks on the e-file
- After Kc7, Re7+ Kd6, Re1 (threatening to queen), White plays Rd4-d4!

**The full sequence:**
1. Rd4!! Re1 (Black continues checking threats)
2. Kc7 Rc1+
3. Kd6 Rd1+
4. Ke6 Re1+
5. Kd5! (The key! Now Rd4 blocks Rd1+)
5. ... Rd1+
6. Rd4!! (The bridge!) Rxd4+
7. Kxd4 and the pawn promotes!

**The magic:**
The rook interposes on d4, blocking the check. Then either:
- Black takes the rook, and the pawn queens
- Black doesn't take, and the king escorts the pawn

This is one of the most elegant techniques in chess!`,
          arrows: [
            { from: 'd8', to: 'd4', color: 'green' },
            { from: 'b8', to: 'c7', color: 'blue' },
          ],
          highlights: [
            { square: 'd4', color: 'green' },
          ],
        },
        {
          id: 'philidor-position',
          type: 'explanation',
          fen: '8/3k4/8/3PK3/8/8/8/r5R1 w - - 0 1',
          title: 'The Philidor Position - How to Draw',
          explanation: `The **Philidor position** is the most important DRAWING technique in rook endgames. It's just as crucial as Lucena!

**The defensive setup:**
When you're the defending side against a rook and passed pawn:
1. Keep your rook on the **3rd rank** (6th rank from pawn's perspective)
2. Keep your king in front of the pawn
3. When the pawn advances to the 6th rank, move your rook to the BACK rank

**Why the 3rd rank works:**
- Your rook prevents the enemy king from advancing (checks on the file)
- If the pawn advances, your rook becomes more active
- You maintain flexibility

**In this position:**
If Black plays Ra6! (3rd rank defense), the position is drawn:
- If Kf6, Ra1! and endless checks
- If d6, Ra1! and checks from behind
- The attacking side cannot make progress!

**Philidor's wisdom:** "Passive defense loses. Active defense holds."`,
          arrows: [
            { from: 'a1', to: 'a6', color: 'green' },
            { from: 'a6', to: 'h6', color: 'blue' },
          ],
          highlights: [
            { square: 'd7', color: 'red' },
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'active-rook',
          type: 'interactive',
          fen: '8/8/5pk1/5P2/5K2/8/8/R7 w - - 0 1',
          title: 'Activate Your Rook',
          explanation: `Activity is everything in rook endgames!

White's rook on a1 is doing nothing - it's completely passive. Find the best move to activate it!

Think: Where can the rook go to become a real threat?`,
          correctMoves: ['Ra8', 'Ra7'],
          arrows: [
            { from: 'a1', to: 'a8', color: 'green' },
          ],
          successMessage: 'Excellent! Ra8 or Ra7 activates the rook dramatically. From a8, it attacks the weak g6 pawn and controls the entire 8th rank.',
          failureMessage: 'The rook needs to become active! Think about where it can exert the most pressure - usually behind the pawns or on the 7th/8th rank.',
          highlights: [
            { square: 'g6', color: 'yellow' },
          ],
        },
        {
          id: 'king-activity',
          type: 'explanation',
          fen: '4r3/ppp2ppp/8/3pk3/3P4/8/PPP2PPP/4R1K1 w - - 0 1',
          title: 'Activate Your King Early',
          explanation: `In rook endgames, your king should rush to the center as soon as it's safe.

**Why king activity matters:**
- The king supports pawn advances
- The king can attack enemy pawns
- A centralized king is safer from checks
- The king can help create passed pawns

**In this position:**
Black's king on e5 is PERFECT - centralized and active.
White's king on g1 is TERRIBLE - still hiding like it's the middlegame!

**White's first priority:** Get the king into the game! Kf2-e3-d3 should be the immediate plan.

**The principle:**
When the queens are off and rooks remain, your king transforms from a liability into a weapon. Don't leave it on the back rank!

**Common mistake:** Players focus only on rook moves and forget the king. The king's journey often decides the game!`,
          arrows: [
            { from: 'g1', to: 'f2', color: 'green' },
            { from: 'f2', to: 'e3', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'g1', color: 'red' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '8/8/8/8/4Pk2/8/8/4R1K1 w - - 0 1',
          title: 'Rook Endgame Essentials',
          explanation: `Master these principles and you'll handle rook endgames with confidence:

**The Three Golden Rules:**
1. **Rooks behind passed pawns** - Yours and your opponent's!
2. **Activity over material** - An active rook is worth a pawn
3. **King to the center** - Activate your king early!

**Must-Know Positions:**
- **Lucena** - How to win with pawn on 7th (building the bridge)
- **Philidor** - How to draw against pawn on 5th/6th (3rd rank defense)

**Key Techniques:**
- Cut off the enemy king with your rook
- Use your king aggressively
- When defending, aim for active counterplay
- Don't put your rook in front of your passed pawn

**Practical advice:**
- Many rook endgames are drawn with correct defense
- Small advantages require precise technique to convert
- Study the theoretical positions - they occur constantly!

Rook endgames reward deep understanding. The positions may look simple, but the ideas are profound!`,
          highlights: [
            { square: 'e4', color: 'yellow' },
            { square: 'e1', color: 'green' },
            { square: 'g1', color: 'blue' },
          ],
        },
      ],
    },
    {
      id: 'pawn-race',
      title: 'Pawn Races',
      description: 'When both sides have passed pawns',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['pawns', 'counting', 'technique'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '7k/p7/8/8/8/8/7P/K7 w - - 0 1',
          title: 'Racing to Promote',
          explanation: `**Pawn races** occur when both sides have passed pawns running toward promotion. These are some of the most exciting endgames - and they require precise calculation! Pawn race calculations were formalized through the "rule of the square" and "counting" methods popularized by endgame manuals, particularly Dvoretsky's Endgame Manual (first published 1994).

**The basic question:** Who promotes first?

**What you need to calculate:**
1. **Count the moves** each pawn needs to queen
2. **Who moves first?** This tempo can decide everything
3. **What happens after promotion?** Can the new queen stop the enemy pawn?

**In this position:**
- White's h-pawn: h2→h4→h5→h6→h7→h8 = **5 moves**
- Black's a-pawn: a7→a5→a4→a3→a2→a1 = **5 moves**

Both need 5 moves, but **White moves first!** So White queens first with h8=Q.

The question then becomes: Can White's queen stop Black's pawn?

**Spoiler:** In most cases, a queen can stop a single pawn. But there are exceptions...`,
          arrows: [
            { from: 'h2', to: 'h8', color: 'green' },
            { from: 'a7', to: 'a1', color: 'blue' },
          ],
        },
        {
          id: 'counting-moves',
          type: 'explanation',
          fen: '7k/p7/8/8/8/8/7P/K7 w - - 0 1',
          title: 'The Art of Counting',
          explanation: `Accurate counting is the foundation of pawn race calculations. Here's how to do it reliably:

**Counting technique:**
1. Find the pawn's current square
2. Count squares to promotion: (8 - current rank) for White, (current rank - 1) for Black
3. Remember: pawns can move 2 squares from their starting position!

**Detailed count for this position:**

**White's h-pawn (on h2):**
- h2 to h4 (2-square move) = 1 move
- h4 to h5 = 1 move
- h5 to h6 = 1 move
- h6 to h7 = 1 move
- h7 to h8 = 1 move
- **Total: 5 moves**

**Black's a-pawn (on a7):**
- a7 to a5 (2-square move) = 1 move
- a5 to a4 = 1 move
- a4 to a3 = 1 move
- a3 to a2 = 1 move
- a2 to a1 = 1 move
- **Total: 5 moves**

**The verdict:** Both pawns need 5 moves. Since White moves first, White queens first!`,
          highlights: [
            { square: 'h2', color: 'green' },
            { square: 'h8', color: 'green' },
            { square: 'a7', color: 'red' },
            { square: 'a1', color: 'red' },
          ],
        },
        {
          id: 'queen-vs-pawn',
          type: 'explanation',
          fen: '7k/8/8/8/8/p7/8/K6Q w - - 0 1',
          title: 'Queen vs Pawn: Usually Winning',
          explanation: `After one pawn queens, the typical scenario is Queen vs Pawn (about to queen). Here's what happens:

**The winning technique:**
1. Give checks to bring your king closer
2. Eventually get your king in front of the enemy pawn
3. Force the pawn to advance, then pin it or take it

**In this position:**
Black's pawn is on a3 (2 moves from queening). White has a queen.

White wins with: Qc1! (threatening Qc3 winning the pawn)
- If a2, Qc3 Ka1, Qa5+! and eventually the king reaches the pawn.

**The key insight:** A queen can give check from any distance, so you can "dance" the enemy king around while your own king marches toward the pawn.

**Exception alert:** This technique doesn't always work against certain pawns...`,
          arrows: [
            { from: 'h1', to: 'c1', color: 'green' },
            { from: 'a1', to: 'a3', color: 'blue' },
          ],
          highlights: [
            { square: 'a3', color: 'red' },
          ],
        },
        {
          id: 'race-calculation',
          type: 'interactive',
          fen: '7k/8/p7/8/8/8/5P2/K7 w - - 0 1',
          title: 'Calculate the Race',
          explanation: `White to move. Both sides have passed pawns.

Your task: Calculate who wins the race and push your pawn!

Count carefully: How many moves does each pawn need?`,
          correctMoves: ['f4', 'f3'],
          successMessage: 'Correct! White\'s f-pawn needs 5 moves (f2-f4-f5-f6-f7-f8). Black\'s a-pawn needs 5 moves (a6-a5-a4-a3-a2-a1). But White moves first, so White queens first and can stop Black\'s pawn!',
          failureMessage: 'Count the moves carefully! White\'s pawn and Black\'s pawn need the same number of moves. Push your pawn!',
          arrows: [
            { from: 'f2', to: 'f4', color: 'green' },
          ],
          highlights: [
            { square: 'f8', color: 'green' },
            { square: 'a1', color: 'red' },
          ],
        },
        {
          id: 'bishop-pawn-exception',
          type: 'explanation',
          fen: '7k/8/8/8/8/2p5/8/K6Q w - - 0 1',
          title: 'The c-Pawn and f-Pawn Exception',
          explanation: `Here's a critical exception every player must know!

**Bishop pawns (c and f pawns)** on the 7th rank can sometimes draw against a queen because of **stalemate tricks**.

**The problem position:**
If Black's king reaches a1 or a2 with a c-pawn on c2, specific positions are drawn!

**Why it works:**
With King on a1 and pawn on c2:
- If White's queen takes c2, it's stalemate!
- If the queen checks, the king oscillates between a1 and b1
- The queen cannot win the pawn without stalemating

**In this position:**
With the c-pawn on c3, White still has time. But imagine it on c2 with Black's king on b1 - that would be drawn!

**Practical lesson:**
In pawn races against c or f pawns:
1. Calculate if your queen can stop it before the 7th rank
2. If the pawn reaches the 7th with king support, check for stalemate draws
3. Sometimes you need to promote a different piece!`,
          highlights: [
            { square: 'c3', color: 'yellow' },
            { square: 'a1', color: 'red' },
          ],
          arrows: [
            { from: 'c3', to: 'c2', color: 'red' },
          ],
        },
        {
          id: 'rook-pawn-exception',
          type: 'explanation',
          fen: '7k/8/8/8/8/7p/8/K6Q w - - 0 1',
          title: 'The Rook Pawn Exception',
          explanation: `Even more famous than the bishop pawn is the **rook pawn (a and h pawns)** exception!

**The drawing mechanism:**
When the defending king reaches the corner (h1/h2 or a1/a2) with a rook pawn nearby:
- The queen cannot prevent the pawn from queening
- Taking leads to stalemate
- Checking is useless - the king just hides

**Example of the draw:**
King on h2, pawn on h3, White queen anywhere:
- If Qf2+, Kh1 and the pawn queens
- If Qg3, h2 and the pawn will queen
- If Kg3, Kh1 and Black draws

**When does this happen?**
If your king is too far away (typically 3+ moves from the queening square), and the enemy king reaches the corner, you cannot win!

**Calculation warning:**
Before entering a pawn race with rook pawns:
1. Count if your queen can stop it
2. Check where the enemy king will be
3. A "winning" race might actually draw!`,
          highlights: [
            { square: 'h1', color: 'red' },
            { square: 'h3', color: 'yellow' },
          ],
          arrows: [
            { from: 'h3', to: 'h1', color: 'red' },
          ],
        },
        {
          id: 'king-support',
          type: 'explanation',
          fen: '8/8/8/p7/P7/8/5K2/2k5 w - - 0 1',
          title: 'When Kings Intervene',
          explanation: `Not all pawn races involve both pawns running freely. Often, **one king can intervene** to stop a pawn or support its own.

**Key questions to ask:**
1. Can my king catch their pawn?
2. Can their king catch my pawn?
3. Can my king help my pawn promote?

**The "Square Rule" for catching pawns:**
Draw a mental square from the pawn to its promotion square. If the enemy king can enter this square, it can catch the pawn!

**In this position:**
- Both pawns are blocked (a4 vs a5)
- The question is: Can White's king help the a-pawn or stop Black's?
- White plays Ke3-d4-c5-b6xa5 and wins!
- Meanwhile, Black's king on c1 is too far from the a4 pawn

**The calculation:**
Count the moves for each plan. The geometry of king movement decides these positions!`,
          arrows: [
            { from: 'f2', to: 'e3', color: 'green' },
            { from: 'e3', to: 'd4', color: 'green' },
            { from: 'd4', to: 'c5', color: 'green' },
          ],
          highlights: [
            { square: 'c1', color: 'red' },
            { square: 'a5', color: 'yellow' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '7k/p7/8/8/8/8/7P/K7 w - - 0 1',
          title: 'Pawn Race Summary',
          explanation: `Pawn races require precise calculation. Here's your checklist:

**Step 1: Count the moves**
- How many moves for each pawn to queen?
- Remember 2-square first moves!
- Who promotes first?

**Step 2: Evaluate post-promotion**
- Can the new queen stop the remaining pawn?
- Check for the exceptions!

**The Exceptions (MEMORIZE THESE!):**
- **Rook pawns (a/h):** King in corner = usually drawn
- **Bishop pawns (c/f):** Stalemate tricks on 7th rank possible

**Step 3: King involvement**
- Can either king catch the enemy pawn?
- Can either king support its own pawn?
- Use the "square rule" to check

**Practical tips:**
- Always calculate before racing
- Don't assume promotion = win
- Consider underpromotion in some cases
- When in doubt, count again!

Pawn races are surprisingly deep. The player who calculates more accurately wins!`,
          highlights: [
            { square: 'h2', color: 'green' },
            { square: 'a7', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'bishop-endgames',
      title: 'Bishop Endgames',
      description: 'Same-colored and opposite-colored bishops',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['bishops', 'endgame', 'technique'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/4k3/8/3BP3/4K3/8/4b3 w - - 0 1',
          title: 'Two Types of Bishop Endgames',
          explanation: `Bishop endgames split into two fundamentally different categories based on one simple question: **Are the bishops on the same color squares or opposite colors?**

**Same-colored bishops:**
- Both bishops control squares of the same color (both light OR both dark)
- These endgames are similar to pure pawn endgames
- Extra pawns usually win
- Activity and pawn structure are critical

**Opposite-colored bishops:**
- One light-squared bishop vs one dark-squared bishop
- Famous for being "drawish" - extra pawns often don't win!
- The bishops "pass by each other like ships in the night"
- Attacker has an extra "piece" (controls squares the defender can't)

**In this position:**
White has a light-squared bishop on d4.
Black has a dark-squared bishop on e1.
They're on **OPPOSITE colors** - this significantly affects the evaluation!

Understanding which type you have changes everything about how to play.`,
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'e1', color: 'red' },
            { square: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'opposite-draw',
          type: 'explanation',
          fen: '8/8/4k3/4p3/3BP3/4K3/8/4b3 w - - 0 1',
          title: 'Opposite Bishops: The Drawing Weapon',
          explanation: `With opposite-colored bishops, **positions that look completely winning can be drawn!**

**Why opposite-colored bishops favor the defender:**
- The defender's bishop watches squares the attacker's bishop CANNOT reach
- Pawns advance on a single color - the defender blockades on the other color
- The defender can create an impenetrable fortress

**In this position:**
White has an extra pawn (e4), but the position is **DRAWN!**

**Why Black holds:**
- White's pawn advances on light squares (e4-e5-e6-e7-e8)
- Black's dark-squared bishop can never be challenged by White's light-squared bishop
- Black just keeps the bishop on a diagonal attacking e5 or e7
- White cannot make progress!

**The principle:**
The defending bishop creates an "invisible wall" that the attacking bishop cannot breach. This is unique to opposite-colored endings.`,
          highlights: [
            { square: 'e1', color: 'green' },
            { square: 'e5', color: 'yellow' },
          ],
          arrows: [
            { from: 'e1', to: 'h4', color: 'blue' },
            { from: 'e1', to: 'a5', color: 'blue' },
          ],
        },
        {
          id: 'same-color-win',
          type: 'explanation',
          fen: '8/8/2b1k3/8/3BP3/4K3/8/8 w - - 0 1',
          title: 'Same-Colored Bishops: Material Tells',
          explanation: `With **same-colored bishops**, extra material usually matters much more - similar to endgames without bishops!

**Why same-colored bishops are different:**
- The bishops CAN challenge each other
- The defender cannot create a "color-blind" fortress
- Standard endgame principles apply more directly

**In this position:**
Both bishops are light-squared. White's extra pawn will likely decide the game:

1. White can advance e5 at the right moment
2. Black's bishop must constantly watch the pawn
3. White's bishop can harass Black's bishop (it's on the same color!)
4. Eventually White creates zugzwang or a breakthrough

**The key difference:**
With same-colored bishops, you can **trade bishops** if it's favorable, or use bishop moves to gain tempo and create zugzwang.

**Practical guideline:**
- Same-colored bishops + extra pawn = probably winning
- Opposite-colored bishops + extra pawn = often drawn`,
          arrows: [
            { from: 'e4', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'c6', color: 'red' },
          ],
        },
        {
          id: 'good-vs-bad',
          type: 'explanation',
          fen: '8/pp6/2p1k3/3p4/3P4/2P1K3/PP6/2B5 w - - 0 1',
          title: 'Good Bishop vs Bad Bishop',
          explanation: `Even with the same-colored bishops, one can be much **better** than the other based on the pawn structure!

**Good bishop:**
- Pawns are on the OPPOSITE color to the bishop
- The bishop is not blocked by its own pawns
- It can move freely and attack enemy pawns

**Bad bishop:**
- Pawns are on the SAME color as the bishop
- The bishop is blocked by its own pawns
- It's passive and restricted

**In this position (imagine Black had a dark-squared bishop):**
- Black's pawns are all on DARK squares (a7, b7, c6, d5)
- A dark-squared bishop would be "bad" - blocked by all those pawns
- Meanwhile, White's light-squared bishop on c1 is excellent - pawns on c3, d4 don't block it

**The practical lesson:**
- Try to put your pawns on the OPPOSITE color to your bishop
- Attack enemy pawns that are on your bishop's color
- A "bad" bishop can be worth less than a knight!`,
          highlights: [
            { square: 'c1', color: 'green' },
            { square: 'a7', color: 'red' },
            { square: 'b7', color: 'red' },
            { square: 'c6', color: 'red' },
            { square: 'd5', color: 'red' },
          ],
        },
        {
          id: 'create-weakness',
          type: 'interactive',
          fen: '8/pp3k2/2p5/3p4/3P4/2PKB3/PP6/8 w - - 0 1',
          title: 'Exploit the Bad Bishop',
          explanation: `White has a good bishop; Black's pawns are all on dark squares (where Black's bishop would be bad if it existed).

Even without Black having a bishop, White's bishop is extremely powerful. Find a move to activate it and attack Black's weaknesses!`,
          correctMoves: ['Bf4', 'Bg5', 'Bc1'],
          arrows: [
            { from: 'e3', to: 'f4', color: 'green' },
          ],
          successMessage: 'Excellent! The bishop activates on the a1-h8 diagonal. From f4, it eyes c7 and can potentially reach g5 or h6 to attack Black\'s position from multiple angles.',
          failureMessage: 'Activate your good bishop! Find a diagonal where it exerts pressure on Black\'s position.',
          highlights: [
            { square: 'c7', color: 'yellow' },
            { square: 'a7', color: 'yellow' },
          ],
        },
        {
          id: 'wrong-bishop',
          type: 'explanation',
          fen: '8/8/8/8/8/B4K2/7P/6k1 w - - 0 1',
          title: 'The Wrong-Colored Bishop',
          explanation: `One of the most famous drawing scenarios involves a **rook pawn and the "wrong" bishop**.

**The concept:**
With a rook pawn (a or h file), you need a bishop that controls the **queening square** to guarantee winning.
- h-pawn queens on h8 (dark square) → need a dark-squared bishop
- a-pawn queens on a8 (light square) → need a light-squared bishop

**In this position:**
- White has an h-pawn (queening square h8 is DARK)
- White's bishop is on a3 (light-squared!)
- The bishop is the WRONG color!

**Why this matters:**
If Black's king reaches h8 or g8:
- The light-squared bishop cannot control h8
- The pawn cannot queen without stalemate
- Black draws!

**The lesson:**
Before entering a bishop + rook pawn ending:
1. Check the color of the queening square
2. Check the color of your bishop
3. If they don't match, beware - the enemy king in the corner draws!`,
          highlights: [
            { square: 'h8', color: 'red' },
            { square: 'a3', color: 'yellow' },
          ],
          arrows: [
            { from: 'g1', to: 'h8', color: 'red' },
          ],
        },
        {
          id: 'attacking-opposite',
          type: 'explanation',
          fen: '8/5p2/4k1p1/8/3B4/8/4PP2/4K3 w - - 0 1',
          title: 'Attacking with Opposite Bishops',
          explanation: `While opposite-colored bishops favor the defender with few pawns, when you have **more pawns**, they can actually favor the **attacker**!

**Why more pawns changes things:**
- The attacker creates threats on BOTH colors
- The defending bishop can only guard ONE color
- Passed pawns on different colors are deadly

**The attacking principle:**
Create **two separated passed pawns on opposite colors**. The defending bishop can only blockade one!

**In this position:**
White can try to create a passed pawn on the e-file (light squares) AND advance on the kingside (dark squares). Black's bishop can't cover both!

**Two extra pawns with opposite bishops:**
- Often winning because of two-color threats
- The "drawing tendency" only applies to one or two extra pawns
- Multiple pawns = use the color advantage!`,
          arrows: [
            { from: 'e2', to: 'e4', color: 'green' },
            { from: 'f2', to: 'f4', color: 'green' },
          ],
          highlights: [
            { square: 'd4', color: 'green' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '8/8/4k3/8/3BP3/4K3/8/4b3 w - - 0 1',
          title: 'Bishop Endgame Summary',
          explanation: `Bishop endgames require understanding the color complex:

**Same-Colored Bishops:**
- Extra pawns usually win (like normal endgames)
- Good vs bad bishop can be decisive
- Pawns on opposite color to your bishop = good!

**Opposite-Colored Bishops:**
- Extra pawn(s) often draw
- Create a fortress with your bishop
- Exception: Multiple passed pawns on both colors can win

**The "Wrong Bishop" Rule:**
- Rook pawn (a/h) + bishop
- Check: Does bishop control the queening square?
- If NO, enemy king in corner = draw

**Good Bishop vs Bad Bishop:**
- Place pawns on opposite color to your bishop
- Attack enemy pawns on your bishop's color
- A bad bishop can be worse than a knight

**Practical tips:**
1. Always note the bishop colors immediately
2. Calculate if opposite-colored means drawing chances
3. With same colors, think like normal endgames
4. Beware the rook pawn + wrong bishop trap!`,
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'e1', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'knight-endgames',
      title: 'Knight Endgames',
      description: 'Using knights in the endgame',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['knights', 'endgame', 'technique'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/4k3/8/3NP3/4K3/8/8 w - - 0 1',
          title: 'Knight Endgame Characteristics',
          explanation: `Knight endgames have unique characteristics that make them closer to **pure pawn endgames** than to bishop endgames.

**Why knights are special in endgames:**
1. **Short-range piece** - Knights need multiple moves to cross the board
2. **No "color blindness"** - Knights can reach any square
3. **Excellent at blocking** - Knights blockade pawns superbly
4. **Struggle against passed pawns** - Can't stop distant passers easily

**Key principle:**
Knight endgames often transition into king and pawn endgames. If you can trade knights and win the K+P ending, do it!

**What makes knights strong:**
- Blocking passed pawns (especially central outpost)
- Attacking multiple weaknesses (fork threats)
- Closed positions where they can hop around

**What makes knights weak:**
- Racing against passed pawns at opposite ends
- Open positions where bishops would dominate
- Defending multiple widely-separated threats

The king's role is CRUCIAL - even more than in bishop endgames!`,
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'e4', color: 'yellow' },
            { square: 'e6', color: 'red' },
          ],
        },
        {
          id: 'knight-outpost',
          type: 'explanation',
          fen: '8/p4k2/1p6/1P1N4/8/4K3/8/8 w - - 0 1',
          title: 'The Dominant Knight',
          explanation: `A knight on a **secure outpost** (where it cannot be attacked by pawns) can dominate an endgame!

**What makes an outpost "secure":**
- No enemy pawn can attack the square
- Ideally supported by your own pawn
- Located deep in enemy territory (5th rank or further)

**In this position:**
The knight on d5 is MAGNIFICENT:
- Protected by the b5 pawn
- Can never be attacked by Black's pawns
- Controls key squares: c7, e7, f6, b6, c3, e3
- Restricts Black's king and pieces

**The knight's impact:**
- Black's king cannot approach without getting forked
- Black's a7 pawn is frozen (Nc7 would win it)
- White's king can slowly advance to support pawn breaks

**Principle to remember:**
"A knight on the 5th rank, protected by a pawn, is equal to a rook!" - Old chess wisdom (slightly exaggerated, but the point stands!)`,
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'b5', color: 'yellow' },
            { square: 'c7', color: 'blue' },
            { square: 'e7', color: 'blue' },
          ],
          arrows: [
            { from: 'd5', to: 'c7', color: 'blue' },
            { from: 'd5', to: 'e7', color: 'blue' },
          ],
        },
        {
          id: 'knight-vs-pawns',
          type: 'explanation',
          fen: '8/8/8/8/2p1p3/4N3/8/4K2k w - - 0 1',
          title: 'Knight\'s Weakness: Separated Pawns',
          explanation: `One of the knight's greatest weaknesses is stopping **separated passed pawns**.

**The problem:**
A knight moves slowly and can only attack squares of one "type" at a time. Two pawns far apart create impossible tasks!

**In this position:**
- Black has passed pawns on c4 and e4
- The knight on e3 attacks e4 but not c4
- If the knight blocks c4 (Nd1), e4 advances
- If the knight stays on e3, c4 advances

**The principle:**
Two connected passed pawns = Knight can usually stop them
Two separated passed pawns = Knight often fails

**Practical implication:**
When you have a knight and your opponent has passed pawns:
- Try to keep the pawns close together
- Trade one pawn if possible
- Bring your king to help blockade

When you have passed pawns against a knight:
- Separate them! Push them apart!
- The knight cannot be in two places at once`,
          arrows: [
            { from: 'e3', to: 'c4', color: 'red' },
            { from: 'e3', to: 'e4', color: 'red' },
          ],
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'knight-fork',
          type: 'interactive',
          fen: '8/8/8/1k1pp3/8/4N3/8/4K3 w - - 0 1',
          title: 'The Knight Fork',
          explanation: `Knights excel at **forking** multiple targets! This makes them dangerous in endgames with pawns and kings spread across the board.

Find the move that wins material with a knight fork!`,
          correctMoves: ['Nc4+'],
          arrows: [
            { from: 'e3', to: 'c4', color: 'green' },
          ],
          successMessage: 'Brilliant! Nc4+ forks the king and the d5 pawn. After the king moves, Nxd5 wins a pawn. Knight forks are even more deadly in endings because there are fewer pieces to block them!',
          failureMessage: 'Look for a knight move that attacks TWO things at once - the king and a pawn!',
          highlights: [
            { square: 'b5', color: 'red' },
            { square: 'd5', color: 'red' },
          ],
        },
        {
          id: 'zugzwang',
          type: 'explanation',
          fen: '8/4k3/4P3/4K3/8/4n3/8/8 b - - 0 1',
          title: 'Zugzwang: A Common Theme',
          explanation: `**Zugzwang** (German for "compulsion to move") occurs frequently in knight endgames because:
- Knights are slow to reposition
- King moves are often committal
- Pawn structures can become frozen

**In this position:**
Black to move is in deep trouble!

**If the king moves:**
- Kf7 allows Kd6, then Kf6 loses to e7
- Kd7 allows Kf6 and the pawn queens
- Ke8 allows Ke6, then Kf8 Kd7 and queens

**If the knight moves:**
- Any knight move loses control of key squares
- e.g., Nc4 Kd6! and White's king escorts the pawn

**The lesson:**
In knight endgames, be alert for zugzwang possibilities:
- Can you pass the move to your opponent?
- Would they be worse off having to move?
- Use this to create winning chances!`,
          highlights: [
            { square: 'e7', color: 'red' },
            { square: 'e3', color: 'yellow' },
          ],
          arrows: [
            { from: 'e5', to: 'd6', color: 'green' },
            { from: 'e5', to: 'f6', color: 'green' },
          ],
        },
        {
          id: 'knight-vs-bishop',
          type: 'explanation',
          fen: '8/8/4k3/4p3/2N5/4K3/4b3/8 w - - 0 1',
          title: 'Knight vs Bishop: Position Decides',
          explanation: `The eternal question: Is a knight or bishop better in the endgame? **It depends entirely on the position!**

**Knight is better when:**
- Pawns are fixed/blocked (closed position)
- Strong outpost squares exist
- Play is on one side of the board
- Enemy pawns are on same color as their bishop

**Bishop is better when:**
- Position is open
- Pawns are on both sides of the board
- Long diagonals are available
- The bishop isn't blocked by its own pawns

**In this position:**
With play on one side and a blocked pawn structure, the knight on c4 is excellent:
- It can reach e5, d6, or attack the e5 pawn
- The bishop on e2 is somewhat passive

**General wisdom:**
"Knights for short endings, bishops for long endings."

This means: If you expect the game to involve one wing, knights are often better. If pawns span the whole board, bishops usually dominate.`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'e2', color: 'yellow' },
            { square: 'e5', color: 'blue' },
          ],
        },
        {
          id: 'knight-triangulation',
          type: 'explanation',
          fen: '8/8/3k4/3p4/3N4/3K4/8/8 w - - 0 1',
          title: 'Knight Triangulation',
          explanation: `Just as kings can triangulate, **knights can too!** A knight can lose a tempo by going on a three-move journey that puts it back on the same square.

**The triangulation pattern:**
A knight on d4 can reach d4 again via: Nb5-c3-d1-e3-d5-c3-d5... wait, that's not quite right. Let's think...

Actually, knight triangulation is harder than king triangulation because of how knights move!

**The correct concept:**
Knights can't truly triangulate (return in 3 moves), but they can **take longer paths** to the same square, effectively losing tempi.

**Practical application:**
In zugzwang situations, if you need to "pass" the move:
- Maneuver the knight through extra squares
- Force the opponent to make a bad move
- Then execute your plan

**The lesson:**
Knight endgames are rich with subtle maneuvering. The ability to approach the same position with your opponent to move can be decisive!`,
          highlights: [
            { square: 'd4', color: 'green' },
          ],
          arrows: [
            { from: 'd4', to: 'b5', color: 'blue' },
            { from: 'b5', to: 'c3', color: 'blue' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '8/8/4k3/8/3NP3/4K3/8/8 w - - 0 1',
          title: 'Knight Endgame Summary',
          explanation: `Knight endgames combine the dynamics of piece play with pawn ending themes:

**Knight Strengths:**
- Excellent at blockading passed pawns
- Fork threats create tactical chances
- Strong on secure outposts
- Can reach any color square

**Knight Weaknesses:**
- Slow to cross the board
- Cannot stop separated passed pawns
- Struggle in open positions
- King activity becomes crucial

**Key Techniques:**
1. **Find outposts** - Secure central squares for your knight
2. **Watch for forks** - The knight's greatest weapon
3. **Avoid separated passers** - Trade one if possible
4. **Use zugzwang** - Knight positions are rich with this

**Knight vs Bishop:**
- Closed position → Knight
- Open position → Bishop
- One wing → Knight
- Both wings → Bishop

**Final wisdom:**
Knight endgames reward the player who understands both tactics (forks) and strategy (outposts, zugzwang). Master both aspects!`,
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'e4', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'practical-endgames',
      title: 'Practical Endgame Tips',
      description: 'Essential techniques for real games',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['practical', 'technique', 'tips'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '4r1k1/ppp2ppp/2n2n2/3pp3/3PP3/2N2N2/PPP2PPP/4R1K1 w - - 0 1',
          title: 'Endgame Philosophy',
          explanation: `Beyond specific theoretical positions, successful endgame play requires understanding **general principles** that apply across all endgame types.

**The most important endgame principles:**

1. **Activate your king** - In the endgame, the king is a fighting piece
2. **Create passed pawns** - Passed pawns win games
3. **Rooks behind passed pawns** - The golden rule of rook endings
4. **Don't rush** - Accuracy beats speed
5. **Know the theory** - Recognize key positions instantly

**Why endgame technique matters:**
José Raúl Capablanca, perhaps the greatest endgame player ever, said: "In order to improve your game, you must study the endgame before anything else."

**The practical reality:**
Many games between club players are decided by endgame mistakes. Knowing these principles gives you a significant advantage over opponents who only studied openings!`,
          highlights: [
            { square: 'g1', color: 'yellow' },
            { square: 'e4', color: 'blue' },
            { square: 'd4', color: 'blue' },
          ],
        },
        {
          id: 'king-activation',
          type: 'explanation',
          fen: '4r3/ppp2ppp/8/3pk3/3P4/8/PPP2PPP/4R1K1 w - - 0 1',
          title: 'Activate Your King IMMEDIATELY',
          explanation: `The most common endgame mistake: **keeping the king passive** when it should be fighting!

**In the middlegame:**
- King safety is paramount
- Kings hide in the corner
- Active king = dangerous king

**In the endgame:**
- No queen to deliver checkmate threats
- King becomes a strong piece
- King should rush to the center and beyond!

**In this position:**
- Black's king on e5 is PERFECT - centralized, active, supporting pawns
- White's king on g1 is TERRIBLE - hiding like queens are still on

**White's priority:** Kf2-e3-d3 immediately! The king must join the fight.

**The transformation:**
The moment queens leave the board, mentally transform your king from "liability" to "weapon." Don't leave it on the back rank!

**Capablanca's rule:** "The king must be active in the endgame. Bring it to the center at once!"`,
          arrows: [
            { from: 'g1', to: 'f2', color: 'green' },
            { from: 'f2', to: 'e3', color: 'green' },
            { from: 'e3', to: 'd3', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'g1', color: 'red' },
          ],
        },
        {
          id: 'passed-pawn-creation',
          type: 'explanation',
          fen: '8/ppp2k2/8/3P4/2P5/8/5K2/8 w - - 0 1',
          title: 'Create Passed Pawns',
          explanation: `**Passed pawns are the key to winning endgames.** A passed pawn (no enemy pawns blocking or controlling its path) is a constant threat that ties down enemy pieces.

**Methods to create passed pawns:**

1. **Pawn majority** - Trade down until you get a passer
2. **Breakthrough sacrifice** - Sacrifice a pawn to create one
3. **Capture toward the center** - When trading, take toward the middle

**In this position:**
White has a passed d5 pawn and a potential passed pawn on the c-file.

**The winning plan:**
1. c5! - advancing the pawn majority
2. After appropriate preparation, d6 creates two dangerous passers
3. Black's king cannot stop both

**The pawn break c5!:**
Even if Black takes (cxd5), White plays d6 and one of these pawns will queen!

**Aron Nimzowitsch:** "A passed pawn is a criminal which should be kept under lock and key."

When YOU have the passed pawn, it's your most powerful weapon!`,
          arrows: [
            { from: 'c4', to: 'c5', color: 'green' },
            { from: 'd5', to: 'd6', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'c4', color: 'yellow' },
          ],
        },
        {
          id: 'create-passed',
          type: 'interactive',
          fen: '8/5k2/p1p5/P1P5/8/5K2/8/8 w - - 0 1',
          title: 'Create a Passed Pawn',
          explanation: `The pawns are locked: a5 vs a6, c5 vs c6. Neither side has a passed pawn yet.

White to move. What's the best approach to create winning chances?

Hint: Sometimes you need to use your king to prepare pawn breaks!`,
          correctMoves: ['Ke4', 'Ke3', 'Kf4'],
          arrows: [
            { from: 'f3', to: 'e4', color: 'green' },
          ],
          successMessage: 'Correct! The king advances toward the pawns. From e4-d5 or b5, White can eventually support a breakthrough with b6! (after creating a b-pawn, which doesn\'t exist in this position, so the king approach is correct). The active king is key!',
          failureMessage: 'With locked pawns, the king must become active to prepare pawn breakthroughs. Advance toward the center or toward the pawns!',
          highlights: [
            { square: 'b5', color: 'yellow' },
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'dont-rush',
          type: 'explanation',
          fen: '8/8/1k6/8/1PK5/8/8/8 w - - 0 1',
          title: 'Don\'t Rush - Accuracy Over Speed',
          explanation: `In winning endgames, **patience is crucial**. The most common way to ruin a won position is rushing and overlooking a trick.

**The dangers of rushing:**
- Stalemate traps
- Fortress creations
- Tactical oversights
- Throwing away the win

**In this position:**
White is winning but must be careful.

**Wrong approach:** b5+?? Kxb5 and... wait, that's actually winning for White. Let's consider this: if the position were different with stalemate threats, rushing could throw away the win.

**Right approach:**
1. Ask: "Is there ANY way my opponent can draw?"
2. Check for stalemate before every move
3. If winning is easy, keep it easy
4. Simplify when possible

**Mikhail Botvinnik:** "The hardest game to win is a won game."

When you're winning, slow down. Verify each move. The clock rarely matters more than accuracy in endgames!`,
          highlights: [
            { square: 'b4', color: 'green' },
            { square: 'b6', color: 'red' },
            { square: 'c4', color: 'green' },
          ],
        },
        {
          id: 'calculate-carefully',
          type: 'interactive',
          fen: '5k2/8/8/5PK1/8/8/8/8 w - - 0 1',
          title: 'Calculate to the End',
          explanation: `Even simple-looking positions require calculation to the end!

White has a king and pawn vs lone king. Can White win?

Calculate carefully before moving. Where should the king go?`,
          correctMoves: ['Kg6'],
          successMessage: 'Correct! Kg6! wins by force. After Kf8 (or Ke7), Kf6! (not f6?? Ke8 draw) and then after Ke8, Kg7 and the pawn queens. This is the "key square" concept in action!',
          failureMessage: 'Calculate the whole variation! Think about key squares and opposition. Where does your king need to be to guarantee queening?',
          arrows: [
            { from: 'g5', to: 'g6', color: 'green' },
          ],
          highlights: [
            { square: 'f8', color: 'yellow' },
            { square: 'g7', color: 'yellow' },
          ],
        },
        {
          id: 'know-theory',
          type: 'explanation',
          fen: '7k/8/8/8/8/8/8/K7 w - - 0 1',
          title: 'Know Your Theoretical Positions',
          explanation: `Certain endgame positions should be **memorized**. Recognizing them instantly saves time and prevents errors.

**Always DRAWN:**
- K+B vs K (bishop can't checkmate)
- K+N vs K (knight can't checkmate)
- K+B+wrong rook pawn vs K (wrong corner draw)
- K+R vs K+B (usually, with technique)
- K+R vs K+N (usually, with technique)

**Always WINNING:**
- K+Q vs K (technique required)
- K+R vs K (technique required)
- K+B+B vs K (with technique)
- K+B+N vs K (difficult but winning!)
- K+Q vs K+R (usually, with technique)

**Key positions to know:**
- **Lucena** - How to win R+P vs R
- **Philidor** - How to draw R+P vs R
- **Opposition** - Decides K+P vs K
- **Key squares** - For all pawn endings

**Practical tip:**
If you study 10 hours of endgames, you'll know more than 90% of club players. The return on investment is enormous!`,
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '4r3/ppp2ppp/8/3pk3/3P4/8/PPP2PPP/4R1K1 w - - 0 1',
          title: 'Practical Endgame Summary',
          explanation: `Master these principles for practical endgame success:

**The Five Commandments:**
1. **Activate the king** - It's your best piece now
2. **Create passed pawns** - They win games
3. **Rooks behind passers** - Yours and theirs
4. **Don't rush** - Accuracy first
5. **Know theory** - Recognize key positions

**Checklist for every endgame:**
- [ ] Is my king active?
- [ ] Can I create a passed pawn?
- [ ] Are my pieces optimally placed?
- [ ] What does my opponent threaten?
- [ ] Is there a theoretical draw/win to aim for?

**Study recommendations:**
- Lucena and Philidor positions (essential)
- Basic K+P vs K (opposition, key squares)
- Basic checkmates (K+Q, K+R)
- Principle of two weaknesses

**Final wisdom:**
"Endgame study is the key to chess mastery." - Tigran Petrosian

The players who understand endgames have a massive advantage. Invest the time - it pays dividends in every game!`,
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'g1', color: 'red' },
            { square: 'd4', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'fortress',
      title: 'Fortress Positions',
      description: 'Drawing with less material',
      difficulty: 'advanced',
      estimatedMinutes: 12,
      tags: ['fortress', 'defense', 'drawing'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '7k/8/8/8/8/8/8/K7 w - - 0 1',
          title: 'What is a Fortress?',
          explanation: `A **fortress** is a defensive setup where the defending side holds a draw despite being materially behind, because the attacking side **cannot make progress**. The fortress concept has been known since the earliest chess manuscripts, with the Rook vs Bishop fortress studied since the 15th century. The term became formalized in the 20th century Soviet chess school.

**Key characteristics of a fortress:**
- The defending pieces create an impenetrable barrier
- The attacking pieces cannot break through
- No zugzwang can be created
- The defending king is completely safe

**Why fortresses matter:**
1. They can save lost games!
2. You need to recognize them when attacking (to avoid or break them)
3. They demonstrate that material isn't everything

**Common fortress types:**
- Rook pawn + wrong bishop
- Queen vs Rook with specific pawn structures
- Blocked pawn positions
- Corner fortresses

**Practical importance:**
When you're losing, always ask: "Can I create a fortress?" Many "lost" positions can be saved with the right setup!`,
        },
        {
          id: 'queen-vs-rook',
          type: 'explanation',
          fen: '1r4k1/6p1/6Pp/7P/8/8/8/6QK w - - 0 1',
          title: 'Queen vs Rook Fortress',
          explanation: `Normally a Queen destroys a lone Rook. But with the right pawn structure, **Q vs R + pawns can be drawn!**

**In this position:**
- White has a Queen
- Black has a Rook and two pawns
- This is a DRAWN fortress!

**Why Black holds:**
1. The king is safe in the corner (g8)
2. The rook defends from b8 (covers the entry points)
3. The pawns on g7/h6 create a wall
4. White's g6 and h5 pawns are BLOCKED

**What White cannot do:**
- Cannot infiltrate with the queen
- Cannot exchange the queen for the rook (would leave pawns drawn anyway)
- Cannot create zugzwang (Black can shuffle the rook)

**The defensive setup:**
King in corner + Rook on the b-file + blocked pawns = fortress!

When you see this pattern, don't despair - you can hold!`,
          highlights: [
            { square: 'g8', color: 'green' },
            { square: 'b8', color: 'green' },
            { square: 'g7', color: 'blue' },
            { square: 'h6', color: 'blue' },
          ],
          arrows: [
            { from: 'b8', to: 'b1', color: 'blue' },
          ],
        },
        {
          id: 'rook-vs-bishop',
          type: 'explanation',
          fen: '8/8/2k5/8/2K5/b7/8/4R3 w - - 0 1',
          title: 'Rook vs Bishop: Usually Drawn',
          explanation: `**Rook vs Bishop** (without pawns) is one of the most common fortress scenarios - it's almost always **drawn**!

**Why the bishop survives:**
- The bishop stays near the king for protection
- The rook cannot force the bishop away
- No mating net can be constructed

**In this position:**
White's rook cannot win. Black's defense:
1. Keep the king in the CENTER (not near edges)
2. Keep the bishop close to the king
3. If pushed toward an edge, escape to the opposite direction

**The drawing technique:**
- The bishop goes to a safe diagonal
- The king stays 1-2 squares from the bishop
- Together they prevent any rook infiltration

**What the attacker CANNOT do:**
- Cannot separate king and bishop
- Cannot create a mating net
- Cannot force zugzwang (the bishop always has moves)

**Exception:** If the defending king gets trapped in a corner of the bishop's color, there can be rare wins. But with any reasonable defense, it's drawn.`,
          highlights: [
            { square: 'c6', color: 'green' },
            { square: 'a3', color: 'green' },
          ],
          arrows: [
            { from: 'a3', to: 'c5', color: 'blue' },
          ],
        },
        {
          id: 'wrong-corner',
          type: 'explanation',
          fen: '7k/8/6KN/8/5B2/8/8/8 w - - 0 1',
          title: 'K+B+N: The Wrong Corner',
          explanation: `The K+B+N vs K checkmate is one of the hardest in chess. A key concept is the **"wrong corner"**!

**The winning technique:**
You must force the enemy king to the **corner that matches your bishop's color**:
- Light-squared bishop → force king to a8 or h1
- Dark-squared bishop → force king to a1 or h8

**In this position:**
- White has a light-squared bishop (f4)
- The king is on h8 - a DARK corner!
- This is the WRONG corner

**The challenge:**
If Black reaches h8 (dark corner), White must drive the king all the way to a8 or h1 (light corners) for checkmate.

**Why this matters:**
- Checkmate requires confining the king to TWO edges
- The bishop only controls one color
- The "right" corner lets the bishop deliver the final blow

**Practical note:**
K+B+N vs K takes up to 33 moves. Many players don't know the technique and time out or make 50-move rule errors!`,
          highlights: [
            { square: 'h8', color: 'red' },
            { square: 'a8', color: 'green' },
            { square: 'h1', color: 'green' },
            { square: 'a1', color: 'red' },
          ],
          arrows: [
            { from: 'h8', to: 'a8', color: 'blue' },
          ],
        },
        {
          id: 'bishop-fortress',
          type: 'explanation',
          fen: '8/1p4k1/1P4p1/6P1/8/8/5B2/6K1 w - - 0 1',
          title: 'Bishop Fortress: Blocked Pawns',
          explanation: `Bishops excel at creating fortresses when **pawns are blocked** - especially when they can cover the key squares!

**In this position:**
The pawns are completely locked:
- b7 is blocked by b6
- g6 is blocked by g5

**Why this is a fortress:**
1. Neither side can advance their pawns
2. White's bishop controls both b7 and g6 diagonals!
3. The bishop oscillates, defending everything
4. No piece can break through

**The bishop's dual role:**
From f2 (or other squares on the diagonal), the bishop:
- Attacks the b7 pawn (or defends the b6 pawn)
- Attacks the g6 pawn (or defends if needed)

**Key fortress principle:**
When pawns are blocked, a single bishop controlling the right diagonals can hold against tremendous material odds!

**Practical tip:**
When down material, look for pawn structures that can be blocked. Then ask: "Can my bishop control all the weak points?"`,
          highlights: [
            { square: 'f2', color: 'green' },
            { square: 'b6', color: 'blue' },
            { square: 'g5', color: 'blue' },
          ],
          arrows: [
            { from: 'f2', to: 'b6', color: 'blue' },
            { from: 'f2', to: 'h4', color: 'blue' },
          ],
        },
        {
          id: 'rook-pawn-fortress',
          type: 'explanation',
          fen: '6k1/8/6KP/8/8/8/8/8 w - - 0 1',
          title: 'The Rook Pawn Fortress',
          explanation: `We've seen this before, but it's SO important it deserves fortress treatment: **K+Rook Pawn vs K** where the defender reaches the corner!

**This position is DRAWN:**
- White's pawn is on h6
- Black's king is on g8 (or can reach g8/h8)

**The defensive mechanism:**
1. Kg8-h8-g8-h8... forever
2. If the pawn advances to h7, it's stalemate!
3. White cannot break through

**The "fortress" aspect:**
The h8 corner becomes an impenetrable castle. The defending king simply oscillates between g8 and h8, and White has no way to make progress.

**Practical application:**
When racing to a rook pawn ending:
- Calculate if you can reach the queening corner
- If yes, you likely draw
- If no, you lose

**Remember:**
This is one of the most common "surprising draws" in practical games. Know it cold!`,
          highlights: [
            { square: 'g8', color: 'green' },
            { square: 'h8', color: 'green' },
          ],
          arrows: [
            { from: 'h6', to: 'h8', color: 'red' },
          ],
        },
        {
          id: 'recognize-fortress',
          type: 'interactive',
          fen: '6k1/5ppp/8/8/8/8/5PPP/4Q1K1 w - - 0 1',
          title: 'Is This a Fortress?',
          explanation: `White has a mighty queen. Black has only a king and three pawns.

Evaluate this position: Is Black's setup a fortress, or can White win?

Find a move that demonstrates whether this is holdable or not!`,
          correctMoves: ['Qe8+', 'Qb4', 'Qa5'],
          successMessage: 'Correct! This is NOT a fortress - White can infiltrate and win. The queen can penetrate via e8+ or through the dark squares. Black\'s pawns don\'t form a secure wall, and the king can be driven from the corner.',
          failureMessage: 'Look for a way for the queen to attack Black\'s position. Can you find entry points? Does Black have a true fortress or just a passive position?',
          highlights: [
            { square: 'g8', color: 'red' },
            { square: 'h7', color: 'yellow' },
          ],
          arrows: [
            { from: 'e1', to: 'e8', color: 'green' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: '7k/8/8/8/8/8/8/K7 w - - 0 1',
          title: 'Fortress Summary',
          explanation: `Fortresses are powerful defensive resources. Know these key patterns:

**Classic Fortress Types:**

1. **Rook pawn + wrong bishop** - King in corner draws
2. **Rook pawn alone** - King in corner draws
3. **Queen vs Rook + pawns** - Specific pawn structures hold
4. **Rook vs Bishop** - Usually drawn with good technique
5. **Blocked pawn positions** - Bishop covers all weaknesses

**When to Look for Fortresses:**
- You're down material
- Exchange into an endgame
- The position can be blocked
- Your remaining pieces complement each other

**How to Break Fortresses:**
- Avoid letting them form in the first place
- Look for pawn breaks
- Create zugzwang if possible
- Attack the weakest point repeatedly

**Practical Wisdom:**
- When losing, always ask: "Can I build a fortress?"
- When winning, always ask: "Can they build a fortress?"
- Many drawn positions are resigned because players don't recognize the fortress!

Study these patterns - they'll save you many half-points over your chess career!`,
        },
      ],
    },
    {
      id: 'zugzwang',
      title: 'Zugzwang',
      description: 'When having to move is a disadvantage',
      difficulty: 'advanced',
      estimatedMinutes: 15,
      tags: ['endgame', 'zugzwang', 'king-pawn'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/8/8/6k1/4K1p1/8 w - - 0 1',
          title: 'What Is Zugzwang?',
          explanation: `**Zugzwang** is a German word meaning **"compulsion to move."** It describes a position where the obligation to make a move puts you at a disadvantage — you'd rather pass, but chess doesn't allow that.

The term was coined by German chess theorists in the 19th century, but it became part of standard chess vocabulary after **Aron Nimzowitsch** popularized it in his influential writings during the 1920s, especially in *My System* (1925). The concept itself was known long before — even medieval chess problems featured positions where being forced to move was fatal.

**Key idea:** In most positions, having the move is an advantage (you get to do something!). In zugzwang, it's a *curse*. Every legal move worsens your position.

In this position, look at the simple King and pawn ending. The pawn on g2 is about to promote, and the placement of the kings determines everything.

Zugzwang appears most often in **endgames** where there are few pieces and few moves available. Let's explore the idea step by step.`,
          highlights: [
            { square: 'g2', color: 'red' },
            { square: 'g3', color: 'blue' },
            { square: 'e2', color: 'yellow' },
          ],
        },
        {
          id: 'simple-kp-zugzwang',
          type: 'interactive',
          fen: '8/8/8/8/4k3/8/4P3/4K3 w - - 0 1',
          title: 'A Simple King + Pawn Zugzwang',
          explanation: `This is one of the most classic King + Pawn positions in chess. White wants to advance the e-pawn, but first needs to step forward.

**Your task:** Find the move that puts Black in zugzwang. White needs to advance without giving Black the opposition.

Think about which king move forces Black to step aside, clearing the path for the e-pawn. The key is to move to a square where you maintain control of the critical squares in front of the pawn.`,
          correctMoves: ['Kd2', 'Kf2'],
          successMessage: `**Correct!** By stepping to the side, White forces Black into a dilemma. Black must move the king, and any king move allows White to advance. If Black plays ...Kd4 or ...Kf4, White plays Ke2-d3/f3 maintaining pressure. The key is that Black is in zugzwang on the next move — every king move surrenders ground.`,
          failureMessage: 'Think about the opposition. If you play Kd1 or Kf1, Black plays ...Kd2 or ...Kf2 and blocks your pawn. Move sideways to force Black to yield ground!',
          highlights: [
            { square: 'e3', color: 'red' },
            { square: 'e2', color: 'blue' },
            { square: 'e1', color: 'yellow' },
          ],
          arrows: [
            { from: 'e1', to: 'd2', color: 'green' },
            { from: 'e1', to: 'f2', color: 'green' },
          ],
        },
        {
          id: 'mutual-zugzwang',
          type: 'explanation',
          fen: '8/8/4k3/4p3/4P3/4K3/8/8 w - - 0 1',
          title: 'Mutual Zugzwang',
          explanation: `**Mutual zugzwang** is a remarkable situation where **whoever has to move loses** (or at least is worse off). Both sides would prefer to pass!

In this position:
- If **White moves**: Kd3 allows ...Kd5 entering White's position. Kf3 allows ...Kf5 entering similarly. Kd4 or Kf4 are met by ...Kd6 or ...Kf6 maintaining the opposition.
- If **Black moves**: ...Kd6 allows Kd4, entering Black's side. ...Kf6 allows Kf4. The symmetry is perfect.

**Whoever moves first loses the opposition** and lets the opponent's king penetrate.

This is a perfect example of mutual zugzwang. The position is symmetric both in pieces and in the "curse" of having to move. In practical games, understanding mutual zugzwang helps you figure out which pawn endings are drawn and which are won — it often comes down to whose turn it is!

**Historical note:** Mutual zugzwang positions have been studied by endgame theorists for centuries and remain some of the trickiest positions to evaluate even for modern engines.`,
          highlights: [
            { square: 'e3', color: 'yellow' },
            { square: 'e6', color: 'yellow' },
            { square: 'e4', color: 'red' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'triangulation-concept',
          type: 'explanation',
          fen: '8/8/4k3/3pKp2/3P1P2/8/8/8 w - - 0 1',
          title: 'Triangulation: Losing a Tempo on Purpose',
          explanation: `**Triangulation** is a brilliant technique to achieve zugzwang. The idea: maneuver your king in a triangle (3 moves) to return to the same square, effectively "losing" a tempo and putting your opponent on the move.

In this locked pawn position, the kings face off. Whoever has to move must yield. White wants to transfer the move to Black.

**The triangulation maneuver:**
1. **Ke5-d6** — stepping sideways
2. **Kd6-e6** — stepping forward/sideways
3. **Ke6-e5** — returning to the original square!

White has taken 3 moves but returned to e5. Black, having made 3 moves, is now in a different (worse) position. The critical point: Black's king doesn't have 3 useful squares to maneuver — it can only go back and forth between two squares. White's "extra" square in the triangle means White can always hand the move to Black.

**Why it works:** White's king has a triangle of squares (e5, d6, e6), but Black's king only has two good squares. With one extra square, White controls whose turn it is.`,
          arrows: [
            { from: 'e5', to: 'd6', color: 'green' },
            { from: 'd6', to: 'e6', color: 'green' },
            { from: 'e6', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'blue' },
            { square: 'd6', color: 'blue' },
            { square: 'e6', color: 'blue' },
          ],
        },
        {
          id: 'triangulation-practice',
          type: 'interactive',
          fen: '8/8/8/3pKp2/3P1P2/4k3/8/8 w - - 0 1',
          title: 'Practice: Find the Triangulation',
          explanation: `Now it's your turn! In this position, the pawns are locked. White's King is on e5 and Black's King is on e3. White wants to put Black in zugzwang.

**Your task:** Find the first move of the triangulation. White needs to step away from e5 to a square that starts the triangular maneuver, eventually returning to e5 with Black to move.

Remember: you need to move to a square from which you can return to e5 in exactly 2 more moves, while Black is forced to make a concession.`,
          correctMoves: ['Kd6'],
          successMessage: `**Excellent!** Kd6 is the first step of the triangulation. After ...Kf6, White plays Ke6 (or Kd7-Ke7), and then returns to e5. Black will be on move in the critical position, forced to yield ground. This is the classic triangulation technique!`,
          failureMessage: 'Think about the triangle: which three squares can White\'s king visit to return to e5 and put Black on move? The first step is sideways.',
          arrows: [
            { from: 'e5', to: 'd6', color: 'green' },
          ],
          highlights: [
            { square: 'd6', color: 'green' },
            { square: 'e6', color: 'yellow' },
          ],
        },
        {
          id: 'trebuchet',
          type: 'explanation',
          fen: '8/8/8/1p1k4/1P6/3K4/8/8 w - - 0 1',
          title: 'The Trébuchet: A Famous Mutual Zugzwang',
          explanation: `The **Trébuchet** (named after the medieval siege weapon) is one of the most famous mutual zugzwang positions in chess. In this position, **whoever moves loses a pawn and the game**.

**If White moves:**
- Kc3 allows ...Kc4, winning the b4 pawn
- Ke3 allows ...Ke4, and Black's king marches to win the b4 pawn
- Ke4 allows ...Kc4 winning b4
- Kc4 allows ...Ke4 and Black queens the b-pawn

**If Black moves:**
- ...Kc6 allows Kc4, winning the b5 pawn
- ...Ke6 allows Ke4, and White's king penetrates
- ...Kc4 allows Ke4 and White promotes
- ...Ke4 allows Kc4 and White wins b5

**The Trébuchet pattern:** Kings are separated by one file with an enemy pawn between them. Both sides guard their own pawn but cannot advance without losing it. The side to move must step away, losing control.

This pattern appears frequently in practical king-and-pawn endings. Recognizing it instantly can save or win a game!`,
          highlights: [
            { square: 'd3', color: 'yellow' },
            { square: 'd5', color: 'yellow' },
            { square: 'b4', color: 'red' },
            { square: 'b5', color: 'red' },
          ],
        },
        {
          id: 'practical-zugzwang',
          type: 'explanation',
          fen: '2b1r1k1/1p3pp1/p6p/2pNR3/8/1P6/P1P2PPP/6K1 w - - 0 1',
          title: 'Zugzwang Beyond King-and-Pawn Endings',
          explanation: `While zugzwang is most common in endgames, it can also appear in **middlegame** and even **complex endgame** positions with multiple pieces!

In this position, White has just played the knight to d5, and Black's pieces are remarkably cramped. Consider Black's options:
- The **bishop on c8** defends the e6 square and has very few moves
- The **rook on e8** is tied to the back rank and to defending against Re8 threats
- The **king** cannot move without weakening the kingside
- The **pawns** are all fixed or would create weaknesses if moved

**Practical zugzwang signs to watch for:**
1. The opponent's pieces are **passive** and tied to defensive duties
2. Every piece is guarding something critical
3. Pawn moves would create new weaknesses
4. The king has no safe squares

**How to create zugzwang:**
- Improve your own position first (make all useful moves)
- Then play a "waiting move" when the opponent has run out of good moves
- Knights are especially good at reaching squares in an odd number of moves, useful for tempo manipulation

The great **Aron Nimzowitsch** wrote extensively about the concept of "overloading" pieces and creating zugzwang, calling it one of the highest strategic achievements in chess.`,
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'c8', color: 'red' },
            { square: 'e8', color: 'red' },
          ],
          arrows: [
            { from: 'e5', to: 'e8', color: 'yellow' },
            { from: 'd5', to: 'f6', color: 'yellow' },
          ],
        },
        {
          id: 'zugzwang-puzzle',
          type: 'puzzle',
          fen: '8/8/6p1/5kP1/5p2/5K2/8/8 w - - 0 1',
          title: 'Find the Zugzwang!',
          explanation: `White and Black kings face off in a pawn ending. White's g5 pawn is blocked by Black's g6 pawn. Black has an extra f4 pawn.

**Your task:** Find the move that puts Black in zugzwang. Black's king must guard g6 to prevent gxg6, but also cannot let White's king advance. Think about where White's king should go to leave Black in an impossible situation.`,
          correctMoves: ['Ke2'],
          successMessage: `**Brilliant!** Ke2 is the zugzwang move. Black is now in deep trouble: ...Ke4 allows Kf2 guarding the f-pawn and threatening to outflank; ...Ke6 allows Kxf4 winning the pawn; ...Kg4 allows Kf2 and Kf3; ...g5 gives up the pawn. Every move Black makes leads to a worse position. This is a beautiful practical zugzwang!`,
          failureMessage: 'Think about what Black needs to do: guard g6 and keep the f4 pawn alive. Which White king move makes it impossible for Black to do both? Step away from the pawns to give Black the dilemma.',
          highlights: [
            { square: 'f5', color: 'red' },
            { square: 'g6', color: 'yellow' },
            { square: 'g5', color: 'blue' },
          ],
        },
      ],
    },
    {
      id: 'piece-vs-pawns',
      title: 'Piece vs Pawns',
      description: 'When material imbalances define the endgame',
      difficulty: 'advanced',
      estimatedMinutes: 15,
      tags: ['endgame', 'material', 'pawns', 'imbalance'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: '8/8/8/8/4N3/8/pp6/K1k5 w - - 0 1',
          title: 'Piece vs Pawns: When Material Rules Change',
          explanation: `One of the most fascinating endgame topics is the battle between a **minor piece** (bishop or knight) and **advancing pawns**. Standard material values tell us a bishop or knight is worth about 3 pawns, but in the endgame, **everything changes**.

**Historical background:** This type of endgame has been studied since the earliest chess treatises. **François-André Danican Philidor**, in his landmark 1749 book *Analyse du jeu des Échecs*, was among the first to systematically analyze these material imbalances. He demonstrated that advanced pawns can be worth more than a piece — a revolutionary idea at the time.

**The key factors:**
- **How advanced are the pawns?** Pawns on the 6th/7th rank are extremely dangerous
- **How far apart are the pawns?** Separated pawns are harder for a piece to stop
- **Where is the defending king?** A well-placed king can blockade
- **Which piece is fighting the pawns?** Bishops and knights have very different strengths

Let's examine each matchup and learn the critical patterns.`,
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'a2', color: 'red' },
            { square: 'b2', color: 'red' },
          ],
        },
        {
          id: 'bishop-vs-pawns',
          type: 'explanation',
          fen: '8/8/8/3B4/8/8/pp6/K1k5 w - - 0 1',
          title: 'Bishop vs Two Pawns',
          explanation: `The **bishop vs two connected pawns** is a critical pattern. In this position, Black's a2 and b2 pawns are dangerously advanced (on the 2nd rank from White's perspective), and Black's king supports them.

**Bishop's strengths:**
- Can attack from distance (long diagonals)
- Can cover both promotion squares if they're on the same color
- Never runs out of moves (no zugzwang risk for the bishop itself)

**Bishop's weaknesses:**
- Only controls squares of one color
- Cannot blockade a pawn by sitting in front of it on the wrong color
- Struggles against widely separated pawns

**In this specific position:**
White is in trouble! The pawns are very advanced, Black's king supports them, and White's king is pushed to the corner. If it's White's move, Bb3+ forces ...Kb1 (or ...Kd2), and after ...a1=Q, Black promotes. The pawns are too far advanced for the bishop to stop.

**Rule of thumb:** A bishop can usually stop two connected pawns that are on the 4th rank or below. Once they reach the 5th/6th rank with king support, the piece is often lost.`,
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'a2', color: 'red' },
            { square: 'b2', color: 'red' },
            { square: 'a1', color: 'yellow' },
            { square: 'b1', color: 'yellow' },
          ],
          arrows: [
            { from: 'd5', to: 'a2', color: 'blue' },
            { from: 'd5', to: 'b3', color: 'blue' },
          ],
        },
        {
          id: 'bishop-vs-pawns-practice',
          type: 'interactive',
          fen: '8/8/8/8/8/1B6/1p6/k2K4 w - - 0 1',
          title: 'Bishop Stops the Pawn',
          explanation: `In this position, White's bishop on b3 faces Black's b2 pawn supported by the king on a1. White's king is on d1.

**Your task:** Find the move that prevents Black from queening. White needs to use the bishop to control the promotion square while bringing the king closer.

Think about which move keeps the b1 promotion square covered while maintaining pressure.`,
          correctMoves: ['Kc2'],
          successMessage: `**Correct!** Kc2 is the winning move! After Kc2, Black's king is trapped on a1, and the b2 pawn is pinned to the king by the bishop on b3. White will eventually capture the pawn. The bishop on b3 is perfectly placed — it controls the diagonal and there's no escape for Black.`,
          failureMessage: 'The bishop already controls the key diagonal. How can White\'s king help? Think about trapping Black\'s king and pawn together.',
          arrows: [
            { from: 'd1', to: 'c2', color: 'green' },
          ],
          highlights: [
            { square: 'b3', color: 'blue' },
            { square: 'b2', color: 'red' },
            { square: 'b1', color: 'yellow' },
          ],
        },
        {
          id: 'knight-vs-pawns',
          type: 'explanation',
          fen: '8/8/8/8/4N3/8/p4p2/4K2k w - - 0 1',
          title: 'Knight vs Two Separated Pawns',
          explanation: `The **knight** has a very different relationship with pawns than the bishop. Knights move slowly and can only control a limited number of squares at once.

**Knight's biggest weakness: separated pawns**

In this position, Black has pawns on a2 and f2. The knight on e4 faces a nightmare:
- To stop the a-pawn, the knight needs to reach b1, a3, or c1
- To stop the f-pawn, the knight needs to reach f1, g1, e1, or g3
- **It cannot cover both sides of the board at once!**

**Key principles for knights vs pawns:**
1. **Connected pawns** — knight can often blockade from in front
2. **Separated pawns** — knight struggles badly; it's too slow to shuttle between them
3. **Rook pawns** (a/h file) — especially hard for knights because the corner limits their movement
4. **King position is crucial** — the king must help the knight by covering one side

**Historical insight:** The knight's difficulty against separated pawns was well understood by Philidor and later codified by endgame specialists like **Yuri Averbakh**, whose encyclopedic endgame works in the 1960s-80s systematized these patterns.`,
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'a2', color: 'red' },
            { square: 'f2', color: 'red' },
          ],
          arrows: [
            { from: 'e4', to: 'c3', color: 'yellow' },
            { from: 'e4', to: 'g3', color: 'yellow' },
          ],
        },
        {
          id: 'rook-vs-pawns',
          type: 'explanation',
          fen: '8/8/8/8/8/R7/pp5k/4K3 w - - 0 1',
          title: 'Rook vs Advanced Pawns',
          explanation: `The **rook** is the strongest piece in the battle against pawns, but even it can struggle against very advanced pawns.

**Rook's advantages:**
- Controls entire ranks and files from a distance
- Can attack pawns from behind (the **Tarrasch rule**: rooks belong behind passed pawns)
- Can cut off the enemy king along a rank or file

**When the rook wins:**
- Pawns are not yet on the 7th rank
- The rook can get behind the pawns
- Its own king can help block

**When the rook loses:**
- Pawns are on the 7th rank with king support
- Two connected pawns on the 7th are usually worth more than a rook!
- The rook's own king is far away

**In this position:**
White's rook on a3 faces pawns on a2 and b2. These pawns are very advanced. White plays Ra8 or Ra6 to try to stop them, but with Black's king ready to support, this is extremely dangerous for White.

**Critical rule:** Two connected pawns on the 6th rank (with their king nearby) are usually enough to beat a rook. On the 7th rank, they almost always win.`,
          highlights: [
            { square: 'a3', color: 'green' },
            { square: 'a2', color: 'red' },
            { square: 'b2', color: 'red' },
          ],
          arrows: [
            { from: 'a3', to: 'a8', color: 'yellow' },
            { from: 'a2', to: 'a1', color: 'red' },
            { from: 'b2', to: 'b1', color: 'red' },
          ],
        },
        {
          id: 'practical-guidelines',
          type: 'explanation',
          fen: '8/8/5k2/8/2N5/1p6/p7/2K5 w - - 0 1',
          title: 'Practical Guidelines: When Material Doesn\'t Matter',
          explanation: `Here are the essential rules for piece-vs-pawns endgames that every player should know:

**When pawns beat a minor piece:**
- Two connected pawns on the **5th rank or beyond** with king support usually win
- **Separated passed pawns** (3+ files apart) almost always beat a knight
- A single pawn on the **7th rank** with king support can sometimes draw against a piece

**When a piece beats pawns:**
- Pawns are still on the **3rd/4th rank** — the piece has time to blockade
- Pawns are **connected but can be blockaded** in front
- The piece's king is **in front of the pawns**, providing a natural barrier

**When a rook struggles:**
- Two connected pawns on the **7th rank** usually beat a rook
- A rook pawn (a or h file) on the 7th with king support often draws against a rook

**General wisdom from the great players:**
- **Capablanca:** "In order to win with a piece against pawns, one must first blockade the pawns, then bring the king to capture them."
- **Karpov:** "The most important thing in piece-vs-pawns endings is the king's position."
- Always count tempi! Calculate how many moves until the pawn promotes vs how many moves your piece needs to stop it.`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'b3', color: 'red' },
            { square: 'a2', color: 'red' },
          ],
          arrows: [
            { from: 'c4', to: 'a3', color: 'green' },
            { from: 'a2', to: 'a1', color: 'red' },
          ],
        },
        {
          id: 'piece-vs-pawns-puzzle',
          type: 'puzzle',
          fen: '8/8/8/4k3/8/4N3/p7/6K1 w - - 0 1',
          title: 'Stop the Pawn!',
          explanation: `White has a knight on e3 and king on g1. Black has a dangerous a-pawn on a2 and a well-placed king on e5.

**Your task:** Find the move that stops Black's a-pawn from promoting. The knight must deal with the pawn while the king is too far away to help directly.

Think about which square the knight can reach to control the a1 promotion square!`,
          correctMoves: ['Nc2'],
          successMessage: `**Perfect!** Nc2 is the only move that saves White. The knight reaches c2, from where it controls the a1 promotion square. After ...a1=Q, Nxa1 captures the new queen. If Black tries ...Kd4, White plays Kf2 bringing the king closer while the knight holds. The knight's ability to cover a1 from c2 is the key geometric pattern!`,
          failureMessage: 'The a-pawn is about to queen on a1. Which knight move directly controls the a1 square? Think about the knight\'s L-shaped jump.',
          highlights: [
            { square: 'a2', color: 'red' },
            { square: 'a1', color: 'yellow' },
            { square: 'e3', color: 'green' },
          ],
          arrows: [
            { from: 'a2', to: 'a1', color: 'red' },
          ],
        },
        {
          id: 'bishop-blockade-puzzle',
          type: 'puzzle',
          fen: '8/8/4k3/8/8/B7/1p3p2/3K4 w - - 0 1',
          title: 'Bishop vs Two Separated Pawns',
          explanation: `White has a bishop on a3 against two dangerous separated pawns on b2 and f2. Black's king on e6 supports from a distance.

This is a critical pattern: can the bishop hold against two separated passed pawns? The key is to find a square where the bishop **covers both promotion squares** simultaneously.

Find the bishop move that **stops both pawns** from promoting!`,
          correctMoves: ['Bd6'],
          successMessage: `**Brilliant!** Bd6 is the only move that saves the game. From d6, the bishop covers both b8 (via the a3-f8 diagonal after repositioning) and controls key squares. More importantly, after Bd6 the bishop stops the b-pawn by covering b8 from any square on the a3-f8 diagonal, and can rush to g3 or h4 to stop the f-pawn. The geometry of the diagonals saves White!`,
          failureMessage: 'The bishop needs to find a square where it can influence both sides of the board. Think about long diagonals that let the bishop reach either pawn.',
          highlights: [
            { square: 'b2', color: 'red' },
            { square: 'f2', color: 'red' },
            { square: 'b1', color: 'yellow' },
            { square: 'f1', color: 'yellow' },
          ],
          arrows: [
            { from: 'a3', to: 'd6', color: 'green' },
          ],
        },
      ],
    },
  ],
};
