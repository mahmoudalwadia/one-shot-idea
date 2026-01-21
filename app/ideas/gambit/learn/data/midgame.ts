import { Course } from './types';

export const midgameCourse: Course = {
  id: 'midgame',
  title: 'Midgame Play',
  description: 'Master the most complex phase of the game',
  icon: '⚔',
  color: '#f97316',
  lessons: [
    {
      id: 'attacking-king',
      title: 'Attacking the King',
      description: 'Building and executing kingside attacks',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      tags: ['attack', 'king', 'tactics'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 4 6',
          title: 'Prerequisites for Attack',
          explanation: `Attacking the king is the ultimate goal in chess, but **premature attacks are the downfall of many players**. Before launching an assault, you need several key elements in place.

**The Five Prerequisites:**

1. **Development lead** - More pieces ready for battle than your opponent
2. **Open lines** - Files and diagonals pointing toward the enemy king
3. **Pawn storm possibility** - Especially when kings castle on opposite sides
4. **Weaknesses** - Holes, weak pawns, or exposed squares near the king
5. **Piece coordination** - Multiple pieces working together

**Critical insight**: World Champion Mikhail Tal once said, "You must take your opponent into a deep dark forest where 2+2=5." But even Tal prepared his attacks carefully - he didn't just charge in blindly.

**Common mistake**: Attacking with just one or two pieces. A lone attacker is easily repelled. You need at least 3-4 pieces participating in a serious assault.`,
          highlights: [
            { square: 'g8', color: 'red' },
            { square: 'f7', color: 'yellow' },
            { square: 'h7', color: 'yellow' },
          ],
        },
        {
          id: 'piece-buildup',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 2 7',
          title: 'Piece Buildup',
          explanation: `Effective attacks require **methodical preparation**. Think of it like assembling an army before battle - you don't charge with half your troops still in camp.

**Role of each piece in the attack:**

- **Queen** - The primary firepower, but don't bring her out too early or she'll be harassed
- **Bishops** - Control key diagonals (especially the a2-g8 or b1-h7 diagonals)
- **Knights** - Can jump to weak squares like f5, g5, h5 (or f4, g4, h4 for Black)
- **Rooks** - Need open or semi-open files (h-file attacks are classic)

**The buildup process:**
1. First, complete development
2. Identify attacking routes
3. Move pieces toward the kingside gradually
4. Maintain flexibility until you're ready to strike

**Patience is key**: Rudolf Spielmann said, "Play the opening like a book, the middlegame like a magician, and the endgame like a machine."`,
          arrows: [
            { from: 'd1', to: 'h5', color: 'blue' },
            { from: 'c1', to: 'g5', color: 'blue' },
            { from: 'f1', to: 'f3', color: 'yellow' },
            { from: 'f3', to: 'g3', color: 'yellow' },
          ],
          highlights: [
            { square: 'g5', color: 'blue' },
            { square: 'h5', color: 'blue' },
          ],
        },
        {
          id: 'h-file-attack',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p2Q/2B1P3/2NP1N2/PPP2PPP/R1B2RK1 w - - 4 8',
          title: 'The Classic h-File Attack',
          explanation: `One of the most devastating attacking setups involves targeting the h-file and the h7 (or h2) pawn. This is the foundation of the famous **"Greek Gift"** sacrifice.

**The classic setup involves:**

1. **Queen to h5** - Puts immediate pressure on h7
2. **Bishop aiming at f7/h7** - The light-squared bishop on c4 or d3
3. **Knight heading to g5** - Threatens Nxf7 and supports Qxh7+
4. **Combined threats** - Qxh7# and Nxf7 become real dangers

**Why h7 is vulnerable:**
- Only defended by the king after castling
- Fianchetto (g6) weakens f6 and h6 squares
- Removing the f6 knight exposes h7 completely

**Historical note**: The Greek Gift (Bxh7+ sacrifice) has decided countless games since the 1800s. The pattern is named after players from the Greek school of chess who popularized it.`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
            { from: 'f3', to: 'g5', color: 'blue' },
            { from: 'h5', to: 'h7', color: 'red' },
          ],
          highlights: [
            { square: 'h7', color: 'red' },
            { square: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'greek-gift',
          type: 'interactive',
          fen: 'r1bq1rk1/pppn1ppp/3p1nB1/2b1p2Q/4P3/2NP1N2/PPP2PPP/R1B2RK1 w - - 0 9',
          title: 'The Greek Gift Sacrifice',
          explanation: `White has achieved a classic attacking position. The queen is on h5, the bishop on g6 is poised to strike, and the knight on f3 is ready to jump to g5.

Black's knight has moved to d7, leaving the kingside vulnerable. Find the **winning sacrifice** that has been played thousands of times throughout chess history!

*Hint: What piece can be sacrificed to expose Black's king?*`,
          correctMoves: ['Bxh7+'],
          arrows: [
            { from: 'g6', to: 'h7', color: 'red' },
          ],
          highlights: [
            { square: 'h7', color: 'red' },
          ],
          successMessage: 'Brilliant! Bxh7+! After Kxh7, White plays Ng5+ and the king is caught in a deadly net. The follow-up includes Qxf7 or Qh5+ with a crushing attack.',
          failureMessage: 'Look at the vulnerable h7 pawn. What classic sacrifice exposes the Black king?',
        },
        {
          id: 'opposite-castling',
          type: 'explanation',
          fen: 'r3kb1r/pp1nqppp/2p1pn2/3p2B1/3P4/2NBPN2/PPP2PPP/R2QK2R w KQkq - 2 8',
          title: 'Opposite-Side Castling',
          explanation: `When kings castle on **opposite sides**, the game becomes a race. Both players can attack aggressively without exposing their own king.

**Strategic implications:**

1. **Pawn storms become powerful** - You can push pawns toward the enemy king without weakening your own
2. **The game often becomes sharp** - One tempo can make the difference
3. **Central control matters** - The player controlling the center can shift forces more easily

**Typical attacking plan after 0-0-0:**
- Push h4-h5 to attack the kingside
- Open the h-file by playing hxg6 or provoking ...gxh5
- Bring rooks to the h-file
- Coordinate queen and pieces for the final assault

**Key principle**: In opposite-side castling positions, **don't lose time**. Every move should either attack or prepare an attack. Defensive moves let your opponent get there first!

**Famous example**: The Yugoslav Attack against the Sicilian Dragon is built entirely on this concept.`,
          arrows: [
            { from: 'e1', to: 'c1', color: 'green' },
            { from: 'h2', to: 'h4', color: 'blue' },
            { from: 'h4', to: 'h5', color: 'blue' },
          ],
          highlights: [
            { square: 'c1', color: 'green' },
            { square: 'h4', color: 'blue' },
          ],
        },
        {
          id: 'pawn-storm',
          type: 'interactive',
          fen: 'r3kb1r/pp1nqppp/2p1pn2/3p2B1/3P3P/2NBPN2/PPP2PP1/R2QK2R w KQkq - 0 9',
          title: 'Continue the Pawn Storm',
          explanation: `White has started the pawn storm with h4. The plan is clear: advance the h-pawn to h5, then open the h-file.

Black will castle kingside, putting the kings on opposite sides. What's the next logical step in the attack?

*Remember: In opposite-side castling, every tempo counts!*`,
          correctMoves: ['h5'],
          arrows: [
            { from: 'h4', to: 'h5', color: 'green' },
          ],
          successMessage: 'Correct! h5 continues the assault. After Black castles, White will play hxg6 (or wait for ...g6, then h6) to pry open the h-file.',
          failureMessage: 'The h-pawn has started marching. Continue the advance toward the enemy king!',
        },
        {
          id: 'attacking-resources',
          type: 'explanation',
          fen: 'r4rk1/pp1nqppp/2p1pn2/3p2B1/3P3P/2NBPN2/PPP2PP1/R2Q1RK1 w - - 0 10',
          title: 'Attacking Resources',
          explanation: `When building an attack, consider all your **attacking resources**:

**Piece placement:**
- Knights on f5, g5, or h5 are ideal
- Bishops should have open diagonals
- Rooks belong on open or semi-open files

**Typical sacrificial themes:**
- **Bxh7+** (Greek Gift) - Opens the h-file
- **Bxg7** - Destroys the fianchetto
- **Nxf7** - Forks and exposes the king
- **Rxh7** - Breakthrough sacrifice

**Supporting resources:**
- Back rank weaknesses can tie down defenders
- Passed pawns create diversion
- Pins on the e-file restrict the f6 knight

**Kasparov's advice**: "When you see a good move, look for a better one." In attacking positions, there's often a stronger continuation than the obvious one.`,
          arrows: [
            { from: 'g5', to: 'f7', color: 'red' },
            { from: 'd3', to: 'h7', color: 'red' },
            { from: 'f3', to: 'g5', color: 'blue' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'h7', color: 'red' },
          ],
        },
        {
          id: 'attack-puzzle',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p1N1/2B1P3/3P4/PPP2PPP/RNBQ1RK1 w - - 0 8',
          title: 'Find the Attack',
          explanation: `White has a knight on g5 putting pressure on f7. The bishop on c4 also targets f7. Black's pieces are not well coordinated for defense.

Find the move that **creates the most dangerous threats**!

*Think about combinations involving Nxf7 and the discovered attack on the queen.*`,
          correctMoves: ['Qh5', 'Nxf7'],
          arrows: [
            { from: 'd1', to: 'h5', color: 'green' },
            { from: 'g5', to: 'f7', color: 'red' },
          ],
          successMessage: 'Excellent! Both Qh5 (threatening Nxf7 and Qxf7#) and Nxf7! (winning the exchange) are strong. Qh5 is even stronger as it creates multiple threats.',
          failureMessage: 'Look at f7 - it\'s only defended by the king. How can White increase the pressure?',
        },
      ],
    },
    {
      id: 'piece-sacrifices',
      title: 'Piece Sacrifices',
      description: 'When giving up material leads to victory',
      difficulty: 'advanced',
      estimatedMinutes: 15,
      tags: ['sacrifice', 'tactics', 'attack'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
          title: 'Types of Sacrifices',
          explanation: `Sacrifices in chess can be categorized into three main types, each requiring different skills to evaluate and execute.

**1. Tactical Sacrifices**
- You see a **concrete winning line**
- Material is regained with interest
- Usually involves forcing moves
- *Example*: Sacrificing a piece to win the queen

**2. Positional Sacrifices**
- Compensation is **long-term**
- Initiative, attack, or superior piece activity
- Harder to evaluate precisely
- *Example*: The exchange sacrifice for a dominant knight

**3. Intuitive Sacrifices**
- Cannot be fully calculated
- Based on **experience and judgment**
- Requires deep understanding of dynamics
- *Example*: Tal's famous sacrifices

**Mikhail Tal's philosophy**: "There are two types of sacrifices: correct ones and mine." Tal was famous for sacrifices that even computers couldn't fully evaluate - he trusted his intuition and fighting spirit.

**Key insight**: Before sacrificing, ask yourself: "What do I get in return?" The answer should be clear compensation.`,
          highlights: [
            { square: 'c4', color: 'blue' },
            { square: 'h5', color: 'blue' },
          ],
        },
        {
          id: 'exchange-sacrifice',
          type: 'explanation',
          fen: 'r4rk1/pp2qppp/2n1bn2/3pp3/2P5/1PN1PN2/PB2BPPP/R2Q1RK1 w - - 0 12',
          title: 'The Exchange Sacrifice',
          explanation: `The **exchange sacrifice** (giving up a rook for a knight or bishop) is one of the most powerful positional tools in chess.

**When the exchange sacrifice works:**

1. **Eliminate a key defender** - Removing a piece that guards critical squares
2. **Create a dominant knight** - An untouchable knight on d5 or e5 can be worth a rook
3. **Damage pawn structure** - Creating weaknesses or passed pawns
4. **Open lines for remaining rooks** - Sometimes less is more

**Material value**: A rook for minor piece is worth about 1.5-2 pawns, but **positional factors often outweigh material**.

**Historical master**: Tigran Petrosian was the king of exchange sacrifices. He would trade a rook for a knight just to get a slightly better pawn structure, then grind down his opponents.

**Modern example**: Magnus Carlsen frequently employs exchange sacrifices in positions where his remaining pieces become dominant.

**Practical tip**: If you're considering an exchange sacrifice, evaluate what you gain in: piece activity, pawn structure, king safety, and long-term pressure.`,
          arrows: [
            { from: 'a1', to: 'c6', color: 'red' },
            { from: 'f3', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'yellow' },
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'queen-sacrifice',
          type: 'explanation',
          fen: 'r1b2rk1/pppp1ppp/2n2n2/2b1p1Nq/2B1P3/3P4/PPP2PPP/RNBQK2R w KQ - 5 7',
          title: 'Queen Sacrifices',
          explanation: `The **queen sacrifice** is the most dramatic move in chess. When a player gives up their most powerful piece, something spectacular is usually about to happen.

**Types of queen sacrifices:**

1. **Mating sacrifices** - The queen is given up for checkmate
2. **Material-gaining sacrifices** - Win back more than you gave
3. **Positional sacrifices** - Rare, but devastating when they work

**When to sacrifice the queen:**

- You've calculated a **forced checkmate**
- You win back at least two pieces
- The opponent's king becomes fatally exposed

**Psychological impact**: Even if your opponent finds the best defense, the shock of a queen sacrifice can lead to mistakes. The pressure of defending without your queen is immense.

**Famous example**: Bobby Fischer vs. Donald Byrne, 1956 - The 13-year-old Fischer sacrificed his queen with 17...Be6!! in what became known as "The Game of the Century."

**Warning**: Miscalculating a queen sacrifice is usually fatal. Calculate until you're absolutely sure!`,
          arrows: [
            { from: 'h5', to: 'f7', color: 'red' },
            { from: 'c4', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'find-sacrifice',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p1N1/2B1P3/3P4/PPP1QPPP/RNB2RK1 w - - 0 8',
          title: 'Find the Sacrifice',
          explanation: `White has a classic attacking setup: queen on e2, bishop on c4, and knight on g5 - all eyeing the vulnerable f7 square.

Black has just played ...Bc5, seemingly developing naturally. But White can strike now with a devastating sacrifice!

Find the move that **opens up Black's position** and creates a winning attack.`,
          correctMoves: ['Bxf7+'],
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
          successMessage: 'Excellent! Bxf7+! exposes the king. After Rxf7 Qc4+ Black is in serious trouble. The king is caught in the center after Kf8, and Nxh7+ wins more material.',
          failureMessage: 'Look for a piece sacrifice that attacks the king and opens lines for your other pieces.',
        },
        {
          id: 'sham-sacrifice',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1Npp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
          title: 'Sham Sacrifice',
          explanation: `A **"sham sacrifice"** is not really a sacrifice at all - you give up material but win it back immediately with interest. These are **tactics disguised as sacrifices**.

**The position shown:**
White has just played Nxf7 - seemingly sacrificing a knight. But after Kxf7, White plays Qf3+! forking the king and the knight on f6. White wins the piece back with a better position.

**How to spot sham sacrifices:**

1. Look for **forks** after the "sacrifice"
2. Check for **discovered attacks**
3. Consider **back rank threats**
4. Examine **skewers and pins**

**Why opponents fall for them:**
- The initial sacrifice looks like a blunder
- Capturing seems like "free material"
- The refutation requires calculation

**Practical advice**: When your opponent "blunders" material, ask yourself: "What does he see that I don't?" This simple question has saved countless games.`,
          arrows: [
            { from: 'd1', to: 'f3', color: 'blue' },
            { from: 'f3', to: 'f6', color: 'red' },
            { from: 'f3', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'f7', color: 'yellow' },
            { square: 'f6', color: 'red' },
          ],
        },
        {
          id: 'calculating-sacrifices',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w - - 6 5',
          title: 'Calculating Sacrifices',
          explanation: `When considering a sacrifice, you must calculate systematically. Here's a framework:

**The Sacrifice Calculation Framework:**

1. **Identify the sacrifice** - What are you giving up?
2. **Count the cost** - Material difference
3. **List the compensation** - What do you gain?
4. **Calculate forcing lines** - Checks, captures, threats
5. **Evaluate the resulting position** - Is the compensation sufficient?

**Types of compensation:**
- **Attack on the king** - Worth at least 3 pawns
- **Development lead** - Each tempo is worth about 1/3 pawn
- **Open lines to the king** - Critical for ongoing attack
- **Weak opponent's structure** - Long-term advantage

**Practical tip**: If you can't calculate to a clear conclusion, ask yourself: "Would a strong player play this?" Pattern recognition from studying games helps immensely.

**Warning signs that a sacrifice may fail:**
- Only one follow-up move works
- Opponent has multiple defensive resources
- Your attack can be easily repelled`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'yellow' },
            { from: 'f3', to: 'g5', color: 'yellow' },
          ],
        },
        {
          id: 'sacrifice-puzzle',
          type: 'puzzle',
          fen: 'r2q1rk1/ppp1bppp/2n2n2/3Np1B1/2B1P3/3P4/PPP2PPP/R2Q1RK1 w - - 0 10',
          title: 'Find the Winning Sacrifice',
          explanation: `White has built up a strong attacking position. The knight on d5 is powerfully placed, the bishop on g5 pins the f6 knight, and the bishop on c4 eyes f7.

Find the sacrifice that **breaks through Black's defenses**!

*Hint: Which defensive piece is critical for Black?*`,
          correctMoves: ['Nxf6+', 'Bxf6'],
          arrows: [
            { from: 'd5', to: 'f6', color: 'red' },
          ],
          highlights: [
            { square: 'f6', color: 'red' },
          ],
          successMessage: 'Brilliant! Nxf6+ (or Bxf6) eliminates the key defender. After Bxf6 (forced), Bxf6 gxf6 opens up Black\'s king completely. White has a crushing attack.',
          failureMessage: 'Look at which piece is holding Black\'s position together. What happens if you remove it?',
        },
        {
          id: 'declining-sacrifice',
          type: 'explanation',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'When to Decline a Sacrifice',
          explanation: `Sometimes the best response to a sacrifice is to **decline it**. This is an important defensive skill.

**When to decline:**

1. **The sacrifice leads to mate** - Obvious, but calculate carefully
2. **Positional compensation is too great** - Activity and initiative can outweigh material
3. **You have a better defensive resource** - A counterattacking move may refute the sacrifice
4. **Your position crumbles after accepting** - Sometimes material isn't worth the chaos

**How to decline gracefully:**
- Look for **developing moves** that also defend
- Consider **counterattacks** in the center
- Find **moves that ask your own questions**

**Petrosian's wisdom**: Tigran Petrosian was famous for declining sacrifices. He understood that an attacker often relies on the defender accepting. By declining, you take away their prepared analysis.

**Practical example**: In the Sicilian Defense, Black often declines gambited pawns to maintain solid development rather than defend material.`,
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'f7', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'brilliant-sacrifices',
      title: 'Brilliant Sacrifices',
      description: 'Moves that look wrong but lead to victory',
      difficulty: 'advanced',
      estimatedMinutes: 15,
      tags: ['sacrifice', 'tactics', 'attack', 'combinations'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
          title: 'The Art of Sacrifice',
          explanation: `This position shows the famous **Scholar's Mate threat** - but brilliant sacrifices go far deeper than simple tricks.

The greatest players in history have won games by giving away their most powerful pieces. Why would anyone sacrifice a queen or multiple rooks?

**The secret**: Material is just ONE factor. These factors can outweigh pieces:

- **Exposed enemy king** - Worth 3+ pawns of attack
- **Massive development lead** - Each tempo ≈ 1/3 pawn
- **Forcing moves** - Checks and threats that limit responses
- **Coordination** - Multiple pieces attacking together

**Mikhail Tal** (World Champion 1960-61) was the greatest attacking player ever. His philosophy:

*"You must take your opponent into a deep dark forest where 2+2=5, and the path leading out is only wide enough for one."*

In this lesson, you'll learn sacrifices that seem impossible - but lead to brilliant victories!`,
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'e8', color: 'yellow' },
          ],
          arrows: [
            { from: 'f7', to: 'f8', color: 'red' },
            { from: 'f7', to: 'e8', color: 'red' },
          ],
        },
        {
          id: 'greek-gift',
          type: 'explanation',
          fen: 'r1bq1rk1/ppppnppp/4p3/6B1/2BPn3/2N2N2/PPP2PPP/R2QK2R w KQ - 0 8',
          title: 'The Greek Gift - Bxh7+',
          explanation: `The **Greek Gift** (Bxh7+ sacrifice) is one of chess's most famous combinations. It has decided thousands of games since the 1600s!

**The classic setup requires:**
1. Bishop able to capture on h7 with check
2. Knight ready to jump to g5
3. Queen ready to join via h5 or d3-h7

**How it works after Bxh7+ Kxh7:**
1. **Ng5+** - Knight attacks with check
2. **Kg8** (Kg6 loses to Qd3+ or h4-h5+)
3. **Qh5** - Queen joins the attack
4. Black's king is trapped and mate follows!

**Why Black cannot defend:**
- The h-pawn is gone (captured bishop)
- Knight on g5 controls escape squares
- Queen and knight coordinate perfectly
- Rooks can join on the h-file

**Recognition pattern**: Look for Bxh7+ when:
- Black has castled kingside
- The h7 pawn is only defended by the king
- Your knight can reach g5 quickly
- Your queen has access to h5 or h7`,
          highlights: [
            { square: 'h7', color: 'red' },
            { square: 'c4', color: 'green' },
            { square: 'g5', color: 'blue' },
          ],
          arrows: [
            { from: 'c4', to: 'h7', color: 'red' },
            { from: 'f3', to: 'g5', color: 'blue' },
            { from: 'd1', to: 'h5', color: 'yellow' },
          ],
        },
        {
          id: 'greek-gift-puzzle',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p2B1/2PP4/2NBPN2/PP3PPP/R2QK2R w KQ - 0 8',
          title: 'Find the Greek Gift',
          explanation: `White has the classic Greek Gift setup! The bishop on d3 aims at h7, the knight on f3 can jump to g5, and the queen waits on d1.

Black's h7 pawn is defended **only by the king**. This is the key weakness!

Find the **devastating sacrifice** that rips open Black's kingside. After the king takes, Ng5+ follows, then Qh5 with a crushing attack!`,
          correctMoves: ['Bxh7+'],
          highlights: [
            { square: 'h7', color: 'red' },
            { square: 'd3', color: 'green' },
            { square: 'g8', color: 'yellow' },
          ],
          arrows: [
            { from: 'd3', to: 'h7', color: 'red' },
            { from: 'f3', to: 'g5', color: 'blue' },
          ],
          successMessage: 'Excellent! Bd3! sets up the Greek Gift. The bishop now targets h7, and after ...anything, Bxh7+! Kxh7 Ng5+ Kg8 (Kg6 Qd3+ wins) Qh5 with a crushing attack! This pattern has won countless games.',
          failureMessage: 'Look at the h7 square - it\'s only defended by the king. How can your bishop reach a diagonal that attacks h7?',
        },
        {
          id: 'opera-game',
          type: 'explanation',
          fen: '1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17',
          title: 'The Opera Game - Morphy\'s Masterpiece',
          explanation: `In 1858, Paul Morphy played the Duke of Brunswick and Count Isouard at the Paris Opera. This game showcases the **ultimate rook sacrifice**.

**The position shown is AFTER the brilliant finish:**
Morphy played **Qb8+!!** - sacrificing his queen!

After **Nxb8**, White played **Rd8 CHECKMATE!**

**What made this sacrifice brilliant:**
- The queen sacrifice *deflects* the knight from d7
- Once the knight moves, Rd8+ is mate
- Black's rook on h8 is completely useless
- The back rank is fatally weak

**The lesson from Morphy:**
*"Help your pieces and they will help you."*

Black's pieces were stuck on the queenside while Morphy's army dominated the center and kingside. The sacrifice was possible because of **overwhelming development advantage**.

**Back rank mate pattern**: When the enemy king is trapped on the first rank with no escape, a single rook delivers checkmate!`,
          highlights: [
            { square: 'd8', color: 'red' },
            { square: 'e8', color: 'yellow' },
            { square: 'b8', color: 'blue' },
          ],
          arrows: [
            { from: 'd8', to: 'e8', color: 'red' },
          ],
        },
        {
          id: 'double-bishop',
          type: 'explanation',
          fen: 'rnbq1rk1/pp3ppp/4pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 7',
          title: 'The Double Bishop Sacrifice',
          explanation: `The **Double Bishop Sacrifice** (Bxh7+ followed by Bxg7!) is one of chess's most spectacular combinations. Emanuel Lasker made it famous in 1889.

**The devastating sequence:**
1. **Bxh7+! Kxh7** - First bishop sacrifice
2. **Bxg7!! Kxg7** - Second bishop sacrifice!
3. **Qg4+ Kh7** (or Kf6)
4. **Rf3!** - Rook swings to the attack
5. Mate is unavoidable!

**Why does giving up BOTH bishops work?**
- Each sacrifice rips open the king's shelter
- After Bxh7+ Kxh7, the h-file opens
- After Bxg7! Kxg7, the king is completely exposed
- Queen + Rook create unstoppable mating threats

**Requirements for the double bishop sacrifice:**
1. Light-squared bishop can take h7 with check
2. Dark-squared bishop can take g7
3. Queen can reach g4 or h5 quickly
4. Rook can swing to g3 or h3

**The key insight**: Two bishops (6 points) are a small price for a mating attack!`,
          highlights: [
            { square: 'h7', color: 'red' },
            { square: 'g7', color: 'red' },
            { square: 'd3', color: 'green' },
            { square: 'c1', color: 'green' },
          ],
          arrows: [
            { from: 'd3', to: 'h7', color: 'red' },
            { from: 'c1', to: 'g7', color: 'red' },
            { from: 'd1', to: 'g4', color: 'yellow' },
          ],
        },
        {
          id: 'double-bishop-puzzle',
          type: 'interactive',
          fen: 'r1bq1rk1/pp1n1ppp/2n1p3/2bpP3/3P4/2NB1N2/PP2BPPP/R1BQ1RK1 w - - 0 10',
          title: 'Set Up the Double Bishop Sacrifice',
          explanation: `White has both bishops ready. The light-squared bishop on d3 eyes h7. The dark-squared bishop is still on c1.

Black has just played ...Bc5, and the position looks solid. But White can unleash the **double bishop sacrifice!**

Find the first move that begins this devastating combination. Remember: Bxh7+ starts the sequence, then Bg5-h6 can target g7!`,
          correctMoves: ['Bxh7+'],
          highlights: [
            { square: 'h7', color: 'red' },
            { square: 'd3', color: 'green' },
            { square: 'g8', color: 'yellow' },
          ],
          arrows: [
            { from: 'd3', to: 'h7', color: 'red' },
          ],
          successMessage: 'Brilliant! Bxh7+!! begins the combination. After Kxh7, White plays Ng5+! Kg8 (Kg6 Qd3+ forces mate), then Qh5 threatening Qh7#. Black cannot survive the attack. The g7 square falls next!',
          failureMessage: 'Look at h7 - the classic Greek Gift square. Your bishop on d3 can strike there with check!',
        },
        {
          id: 'immortal-game',
          type: 'explanation',
          fen: 'r1b2k1r/pppp1Bpp/8/4n3/1bBPn2q/8/PPP2NP1/RNBQ1RK1 b - - 0 12',
          title: 'The Immortal Game',
          explanation: `Adolf Anderssen vs Lionel Kieseritzky, London 1851 - **The most famous game in chess history!**

Anderssen sacrificed:
- A bishop (move 11)
- **Both rooks** (moves 18 and 19)
- **His QUEEN** (move 22)

And still delivered checkmate with just three minor pieces!

**The critical moment (shown):**
White has just played **Bxf7+!** Black's king must move. After Ke7, White's attack continues with Qb3! threatening Qxb7 and worse.

**Why the sacrifices worked:**
1. Black's pieces are passive and uncoordinated
2. Black's king is stuck in the center
3. Every White piece joins the attack
4. Material is useless if you're checkmated!

**Anderssen's philosophy:**
*"I do not play chess - I make chess. The game as an art form must have beautiful combinations!"*

The Immortal Game proved that **attack and initiative can outweigh any material deficit**. It inspired generations of attacking players.`,
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'e8', color: 'yellow' },
            { square: 'c4', color: 'green' },
            { square: 'h4', color: 'blue' },
          ],
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
            { from: 'f7', to: 'e8', color: 'yellow' },
          ],
        },
        {
          id: 'evergreen-game',
          type: 'explanation',
          fen: 'r1bk2nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P4/P1P1K3/q5b1 b - - 0 22',
          title: 'The Evergreen Game - Queen Sacrifice',
          explanation: `Anderssen vs Dufresne, Berlin 1852 - Another Anderssen masterpiece with a stunning queen sacrifice!

**The position before the sacrifice:**
White played **Qxd7+!!** - giving up the queen for a knight!

After **Kxd7**, White played **Bf5+ Ke8**, then **Bd7+ Kf8**, and finally **Bxe7 CHECKMATE!**

**Why sacrifice the queen for a knight?**
- The queen sacrifice *exposed* the Black king
- White's bishops created a deadly crossfire
- The knight on g7 controlled key escape squares
- Every check led to another check - forcing mate!

**The "Evergreen" name:**
This game is called "Evergreen" because its beauty never fades. Over 170 years later, it still amazes chess players.

**The combination required:**
1. Seeing that Qxd7+ exposes the king
2. Calculating the bishop checks to mate
3. Trusting the attack over material
4. Perfect piece coordination

**Takeaway**: The queen is worth ~9 points, but checkmate is worth infinite points!`,
          highlights: [
            { square: 'd7', color: 'red' },
            { square: 'f5', color: 'green' },
            { square: 'd5', color: 'green' },
            { square: 'g7', color: 'blue' },
          ],
          arrows: [
            { from: 'f5', to: 'd7', color: 'yellow' },
            { from: 'd7', to: 'e8', color: 'yellow' },
            { from: 'd5', to: 'f7', color: 'red' },
          ],
        },
        {
          id: 'tal-sacrifice',
          type: 'explanation',
          fen: 'r2qk2r/1b1nbppp/p3pn2/1pp1P3/3P4/2NB1N2/PP1B1PPP/R2Q1RK1 w kq - 0 12',
          title: 'Tal\'s Intuitive Sacrifices',
          explanation: `Mikhail Tal was called the **"Magician from Riga"**. He sacrificed pieces constantly - even when computers couldn't prove they were correct!

**Tal's approach:**
*"There are two types of sacrifices: correct ones, and mine."*

**In this typical Tal position:**
White could play **Bxh7+!?** even though the attack isn't fully calculated. Why?

1. The Black king position weakens dramatically
2. White's pieces are all ready to attack
3. Black's queenside pieces can't help defend
4. **Practical chances** - defense is harder than attack!

**Tal's sacrifices worked because:**
- Opponents cracked under pressure
- Defense is psychologically difficult
- Even "unsound" sacrifices create real problems
- The attacker has easier decisions

**Tal vs Larsen, 1965 - The famous Rxg7!! sacrifice:**
Tal gave up his rook for seemingly nothing - but the attack was unstoppable!

**The lesson**: Sometimes you must **trust your intuition**. If your pieces are active and the enemy king is weak, sacrifice!`,
          highlights: [
            { square: 'h7', color: 'red' },
            { square: 'd3', color: 'green' },
            { square: 'f3', color: 'green' },
            { square: 'd2', color: 'green' },
          ],
          arrows: [
            { from: 'd3', to: 'h7', color: 'red' },
            { from: 'f3', to: 'g5', color: 'yellow' },
            { from: 'd1', to: 'h5', color: 'blue' },
          ],
        },
        {
          id: 'find-queen-sacrifice',
          type: 'puzzle',
          fen: 'r4rk1/ppp1qppp/2np1n2/2b1p1B1/2B1P1b1/2NP1N2/PPP1QPPP/R4RK1 w - - 0 10',
          title: 'Find the Queen Sacrifice',
          explanation: `White has developed aggressively. Both sides have bishops on active diagonals, and Black seems well-coordinated.

But there's a **stunning queen sacrifice** that leads to forced checkmate!

Look at the position:
- White's bishop on g5 pins the f6 knight
- White's bishop on c4 eyes f7
- The knight on f3 can jump to g5

Find the move that sacrifices the queen but forces checkmate! (Hint: What if you could remove the knight that guards h7?)`,
          correctMoves: ['Bxf6'],
          highlights: [
            { square: 'f6', color: 'red' },
            { square: 'g5', color: 'green' },
            { square: 'h7', color: 'yellow' },
          ],
          arrows: [
            { from: 'g5', to: 'f6', color: 'red' },
            { from: 'f3', to: 'g5', color: 'blue' },
          ],
          successMessage: 'Excellent! Bxf6! removes the key defender of h7. After gxf6 (or Qxf6), Ng5! threatens Qxh7# and Nxf7. Black cannot defend both threats. This is a classic attacking pattern - eliminate the defender, then strike!',
          failureMessage: 'The f6 knight is Black\'s key defender. Which piece can capture it to open lines toward the king?',
        },
        {
          id: 'final-puzzle',
          type: 'puzzle',
          fen: 'r2q1rk1/pb2bppp/1pn1pn2/2p5/2PP4/1PN1PN2/PB2BPPP/R2Q1RK1 w - - 0 11',
          title: 'Find the Brilliant Sacrifice',
          explanation: `A famous position from grandmaster practice. White has a solid position, but Black looks well-defended with pieces covering key squares.

However, there's a **brilliant sacrifice** hiding in this position that tears Black's defense apart!

Look carefully at:
- The coordination of White's pieces
- Black's slightly weakened kingside
- The potential for a breakthrough

Find the move that looks crazy but wins brilliantly! Sometimes the best move is the one that seems impossible.`,
          correctMoves: ['d5'],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'e6', color: 'yellow' },
            { square: 'c6', color: 'yellow' },
          ],
          arrows: [
            { from: 'd4', to: 'd5', color: 'green' },
            { from: 'c3', to: 'd5', color: 'blue' },
          ],
          successMessage: 'Brilliant! d5!! is the key pawn sacrifice. After exd5, Nxd5! threatens Nxc6 winning the queen, and Nf6+ with a fork. If Nxd5, cxd5 rips open the c-file with a crushing attack. Black cannot handle all the threats!',
          failureMessage: 'Look for a pawn break that creates multiple threats. What happens if you advance in the center with tempo?',
        },
      ],
    },
    {
      id: 'central-control',
      title: 'Central Control',
      description: 'Dominating the center of the board',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['center', 'control', 'pawns'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
          title: 'Why the Center Matters',
          explanation: `The center of the board - the squares **d4, d5, e4, and e5** - is the most important territory in chess. Whoever controls these squares usually controls the game.

**Why the center is crucial:**

1. **Pieces radiate power** - A knight on e4 controls 8 squares; on a1, only 2
2. **Mobility** - Centralized pieces can reach both flanks quickly
3. **Space** - Central control gives your pieces room to maneuver
4. **King safety** - Often related to who dominates the center

**The classical principle**: "Control the center, control the game!" This has been a fundamental truth since the time of Philidor in the 1700s.

**Practical impact**:
- A knight in the center (e4/e5/d4/d5) is worth almost a minor piece more than one on the rim
- Central pawns can support outposts and restrict enemy pieces
- Central control allows rapid redeployment of forces

**Steinitz's rule**: The first World Champion said, "Whoever has the advantage must attack, or risk losing it."`,
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'd5', color: 'yellow' },
            { square: 'e4', color: 'green' },
            { square: 'e5', color: 'yellow' },
          ],
        },
        {
          id: 'pawn-center',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
          title: 'The Classical Pawn Center',
          explanation: `The **classical approach** to the center is to occupy it with pawns. Pawns on d4 and e4 (or d5 and e5 for Black) form a "pawn center."

**Advantages of a pawn center:**

- **Controls key squares** - Prevents enemy pieces from landing
- **Restricts enemy movement** - Pieces behind the center have less space
- **Provides outposts** - Your pieces can use squares in front of pawns

**The Queen's Gambit structure** (shown):
White's pawns on c4 and d4 aim to control the center while challenging Black's d5 pawn. This is one of the oldest and most reliable openings.

**Risks of a pawn center:**
- Pawns can become **targets** if overextended
- A pawn center can become **immobile** if blocked
- Central pawns may need **piece support**

**Key insight**: The pawn center is a **commitment**. Once you build it, you must either advance it successfully or defend it adequately. A collapsed center often leads to a collapsed position.`,
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'c4', color: 'green' },
            { square: 'd5', color: 'blue' },
          ],
          arrows: [
            { from: 'c4', to: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'piece-center',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4',
          title: 'Controlling Center with Pieces',
          explanation: `The **hypermodern approach** (developed in the 1920s) challenges classical thinking: control the center with pieces, not pawns.

**The hypermodern philosophy:**

1. Let the opponent build a pawn center
2. Control it from a distance with pieces
3. Undermine the center with pawn breaks
4. Occupy it only when the time is right

**How pieces control the center:**
- **Fianchettoed bishops** - A bishop on g2 controls d5 and e4
- **Knights** - Eye central squares from c3, f3, c6, f6
- **Pressure** - Threaten the opponent's center pawns

**Famous hypermodern openings:**
- King's Indian Defense
- Grünfeld Defense
- Réti Opening
- English Opening

**Nimzowitsch's wisdom**: Aaron Nimzowitsch wrote, "The threat is stronger than the execution." Controlling the center without occupying it keeps flexibility.

**When to use this approach:**
- Against overextended pawn centers
- When you want dynamic, counterattacking play
- In positions where central pawns become targets`,
          arrows: [
            { from: 'f3', to: 'e5', color: 'blue' },
            { from: 'c3', to: 'd5', color: 'blue' },
            { from: 'f3', to: 'd4', color: 'blue' },
          ],
          highlights: [
            { square: 'e5', color: 'yellow' },
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'central-break',
          type: 'interactive',
          fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
          title: 'The Central Break',
          explanation: `Central pawn breaks are critical moments in the game. A well-timed break can open lines, create outposts, and seize the initiative.

White has a solid position with pawns on c4 and d4. Black has set up the Slav structure with pawns on c6 and d5.

Find the **pawn break** that challenges Black's center and opens the position for White's pieces!`,
          correctMoves: ['e4'],
          arrows: [
            { from: 'e3', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'e4', color: 'green' },
          ],
          successMessage: 'Correct! e4! breaks open the center. If Black takes dxe4, White recaptures Nxe4 with a dominant knight. If Black doesn\'t take, White gets more space.',
          failureMessage: 'Look for a central pawn advance that challenges Black\'s d5 pawn and opens lines.',
        },
        {
          id: 'fight-for-center',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4',
          title: 'Fighting for the Center',
          explanation: `The battle for central control is ongoing throughout the game. Both sides constantly fight to establish, maintain, or challenge central control.

**Methods of fighting for the center:**

1. **Pawn breaks** - Moves like ...c5, ...f6, e4, d4 challenge pawns
2. **Piece pressure** - Attack central pawns to tie down defenders
3. **Exchanges** - Trade pieces to reduce pressure on your center
4. **Undermining** - Attack the base of a pawn chain

**In this position (French Defense):**
Black should play **...c5** to challenge White's d4-e5 center. This is the classic break in the French Defense.

**The principle of the break:**
- Attack the **base** of a pawn chain first
- Timing is crucial - too early or too late can backfire
- Support breaks with piece pressure when possible

**Nimzowitsch's chain rule**: "Attack the pawn chain at its base." In the French, White's chain is e5-d4-c3; the base is d4 (or c3). Black attacks it with ...c5.`,
          arrows: [
            { from: 'c7', to: 'c5', color: 'blue' },
            { from: 'c5', to: 'd4', color: 'red' },
          ],
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'central-pawn-tension',
          type: 'explanation',
          fen: 'r1bqkb1r/ppp2ppp/2n1pn2/3p4/2PP4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 0 5',
          title: 'Central Pawn Tension',
          explanation: `When pawns meet in the center, **tension** is created. How you resolve this tension defines the character of the game.

**Three ways to handle central tension:**

1. **Maintain the tension** - Keep flexibility, wait for opponent to commit
2. **Release the tension** - Capture to open lines or clarify structure
3. **Increase the tension** - Add more pawns or pieces to the conflict

**In the current position:**
White can play cxd5 (releasing), e4 (increasing), or simply develop (maintaining).

**Carlsen's approach**: Magnus Carlsen often **maintains tension** as long as possible, keeping his options open while waiting for his opponent to make a decision.

**When to release tension:**
- You get a favorable pawn structure
- Lines open for your better-placed pieces
- Opponent has to recapture awkwardly

**When to maintain tension:**
- You're not sure which capture benefits you
- Your opponent faces a difficult decision
- Time pressure favors keeping complexity`,
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'd5', color: 'yellow' },
            { square: 'd4', color: 'yellow' },
          ],
          arrows: [
            { from: 'c4', to: 'd5', color: 'blue' },
            { from: 'e3', to: 'e4', color: 'green' },
          ],
        },
        {
          id: 'center-control-puzzle',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp1bppp/2n1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Seize the Center',
          explanation: `White has completed development and has a solid position. The center is still fluid with the tension between c4 and d5.

Find the move that **takes control of the center** and creates the most problems for Black!`,
          correctMoves: ['cxd5', 'e4'],
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
          ],
          successMessage: 'Excellent! Both cxd5 (creating an isolated queen pawn after exd5, or gaining space after Nxd5) and e4 (the breakthrough) are strong. These moves seize central control.',
          failureMessage: 'How can White either open the position favorably or gain more central space?',
        },
      ],
    },
    {
      id: 'piece-coordination',
      title: 'Piece Coordination',
      description: 'Making your pieces work together',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['coordination', 'pieces', 'teamwork'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'The Power of Coordination',
          explanation: `In chess, individual pieces have limited power. But when pieces work together, they become far more than the sum of their parts. This is **piece coordination**.

**Why coordination matters:**

- A lone attacker is easily defended
- Coordinated pieces create **multiple simultaneous threats**
- Pieces should protect each other (redundancy)
- Uncoordinated armies lose to smaller coordinated forces

**The whole is greater than the sum of its parts** - Aristotle's wisdom applies perfectly to chess!

**Signs of good coordination:**
- Pieces support each other's actions
- Threats come from multiple directions
- Defensive tasks are shared
- No piece is idle or disconnected

**Signs of poor coordination:**
- Pieces get in each other's way
- Each piece fights alone
- Pieces are scattered across the board
- Defenders can handle threats one at a time

**Tartakower's quip**: "Tactics is what you do when there's something to do; strategy is what you do when there's nothing to do." Coordination bridges both!`,
          highlights: [
            { square: 'f3', color: 'green' },
            { square: 'c4', color: 'green' },
          ],
        },
        {
          id: 'queen-knight',
          type: 'explanation',
          fen: 'r1b2rk1/ppppqppp/2n2n2/2b1p3/2B1P1N1/3P4/PPP2PPP/RNBQ1RK1 w - - 0 8',
          title: 'Queen + Knight Coordination',
          explanation: `The **queen and knight** form one of the deadliest combinations in chess. Their powers complement each other perfectly.

**Why Q+N work so well together:**

1. **Different movement patterns** - Knight covers squares the queen can't reach
2. **Fork potential** - Knight forks + queen threats = nightmares for defenders
3. **Unexpected angles** - The knight's jumping ability creates surprises
4. **Mating patterns** - Many checkmates involve Q+N (e.g., Philidor's mate)

**Classic Q+N maneuvers:**
- Knight to g5/f5 + Queen to h5 = pressure on h7/f7
- Knight on d5 + Queen on c4 = pressure on c7 and f7
- Knight on e5 + Queen on d4 = central domination

**In this position:**
White's knight on g4 and potential queen maneuver to h5 create dangerous threats against Black's king.

**Kasparov's insight**: "The queen and knight together can create threats that the opponent simply cannot handle."`,
          arrows: [
            { from: 'd1', to: 'h5', color: 'blue' },
            { from: 'g4', to: 'f6', color: 'red' },
            { from: 'g4', to: 'h6', color: 'red' },
            { from: 'g4', to: 'e5', color: 'blue' },
          ],
          highlights: [
            { square: 'g4', color: 'green' },
            { square: 'h5', color: 'blue' },
          ],
        },
        {
          id: 'rook-battery',
          type: 'explanation',
          fen: 'r4rk1/ppp2ppp/2n1bn2/3qp3/8/2N1PN2/PP2BPPP/R2Q1RK1 w - - 0 12',
          title: 'Doubled Rooks - The Battery',
          explanation: `Two rooks on the same file create a "**battery**" - one of the most powerful piece configurations in chess.

**Power of doubled rooks:**

1. **Massive file pressure** - Almost impossible to defend against
2. **Penetration power** - Can break into the 7th or 8th rank together
3. **Mutual defense** - One defends, the other attacks
4. **Overloading defenders** - Force impossible defensive tasks

**The 7th rank:**
When doubled rooks reach the 7th rank, they often decide the game. Pawns fall like dominoes, and the king is in constant danger.

**How to double rooks:**
1. Find an open file
2. Place the rooks one behind the other
3. Aim for penetration into the enemy position
4. Coordinate with other pieces

**Technical note**: Place the more active rook in front initially, but be ready to swap if the front rook gets blocked.

**Tarrasch's rule**: "Rooks belong behind passed pawns." But doubled rooks on an open file toward the king are even better!`,
          arrows: [
            { from: 'a1', to: 'd1', color: 'green' },
            { from: 'd1', to: 'd8', color: 'blue' },
            { from: 'e1', to: 'd1', color: 'yellow' },
          ],
          highlights: [
            { square: 'd1', color: 'green' },
            { square: 'd8', color: 'red' },
          ],
        },
        {
          id: 'bishop-pair-coord',
          type: 'explanation',
          fen: 'r2q1rk1/ppp1bppp/2n1bn2/3pp3/8/1PN1PN2/PBPPBPPP/R2Q1RK1 w - - 2 9',
          title: 'The Bishop Pair',
          explanation: `Two bishops complement each other like no other piece combination. Together, they can **control all 64 squares** of the board.

**Advantages of the bishop pair:**

1. **Color coverage** - Light + dark square control
2. **Crossing diagonals** - Create an "X" of control
3. **Long-range power** - Deadly in open positions
4. **Coordinate naturally** - Don't compete for the same squares

**The bishop pair is worth approximately 0.5 pawns extra** in open positions. In closed positions, the advantage is smaller.

**How to maximize bishop pair:**
- Open the position with pawn exchanges
- Avoid blocking your bishops with pawns
- Place bishops on long diagonals
- Create "battery" positions (bishop + queen)

**When facing the bishop pair:**
- Keep the position closed
- Trade one bishop if possible
- Create outposts for knights
- Don't allow open diagonals

**Fischer's approach**: Bobby Fischer often steered positions toward ones where his bishop pair would dominate.`,
          arrows: [
            { from: 'b2', to: 'h8', color: 'blue' },
            { from: 'e2', to: 'a6', color: 'green' },
          ],
          highlights: [
            { square: 'b2', color: 'green' },
            { square: 'e2', color: 'green' },
          ],
        },
        {
          id: 'coordinate-attack',
          type: 'interactive',
          fen: 'r1b2rk1/ppppqppp/2n2n2/4p3/2B1P1N1/3P4/PPP2PPP/RNBQ1RK1 w - - 0 8',
          title: 'Coordinate the Attack',
          explanation: `White has a knight on g4 and a bishop on c4 - both eyeing Black's kingside. But the queen is still on d1, not participating in the attack.

One of the fundamental rules of attacking: **bring all your pieces into the game**. Find the move that **coordinates White's pieces** for maximum pressure!`,
          correctMoves: ['Qf3'],
          arrows: [
            { from: 'd1', to: 'f3', color: 'green' },
          ],
          successMessage: 'Excellent! Qf3 brings the queen into the attack. It prepares Qg3 or threatens Qxf6, coordinating with the knight on g4 and bishop on c4.',
          failureMessage: 'The knight and bishop are ready to attack. Which piece needs to join them?',
        },
        {
          id: 'minor-piece-harmony',
          type: 'explanation',
          fen: 'r2q1rk1/ppp1bppp/2n1bn2/3pp3/4P3/1NN1B3/PPP1BPPP/R2Q1RK1 w - - 0 10',
          title: 'Knight + Knight Coordination',
          explanation: `Two knights can also coordinate beautifully, especially in **closed positions** where bishops are restricted.

**Knight pair advantages:**

1. **Cover each other's weaknesses** - One defends what the other attacks
2. **Control both colors** - Unlike bishops, knights control all squares
3. **Outpost coordination** - Knights on d5 and f5 dominate
4. **Tactical threats** - Double knight forks are devastating

**Classic knight coordination:**
- Knights on e5 and d5 (or c5) create a "wall"
- Knights on f5 and h5 attack the king
- Knights supporting each other can be very hard to dislodge

**When knights dominate:**
- Closed positions with blocked pawns
- Positions with weak color complexes
- When outposts are available

**The Petrosian style**: Tigran Petrosian was a master of knight coordination, often maneuvering his knights to dominant squares before launching attacks.`,
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
            { from: 'b3', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'blue' },
            { square: 'd4', color: 'blue' },
          ],
        },
        {
          id: 'coordination-puzzle',
          type: 'puzzle',
          fen: 'r2qr1k1/ppp2ppp/2n1bn2/3p4/3P4/2N1BN2/PPP1BPPP/R2Q1RK1 w - - 0 11',
          title: 'Maximize Coordination',
          explanation: `White has well-placed pieces, but they could be better coordinated. The bishop on e2 is passive, and the rooks aren't connected on an open file.

Find the move that **improves White's piece coordination** the most!`,
          correctMoves: ['Bf4', 'Rc1'],
          arrows: [
            { from: 'e3', to: 'f4', color: 'green' },
          ],
          successMessage: 'Good choices! Bf4 activates the bishop (controls d6, c7), Qc2 prepares doubling rooks, and Rc1 claims the c-file. All improve coordination!',
          failureMessage: 'Look for moves that activate passive pieces or connect your forces.',
        },
      ],
    },
    {
      id: 'initiative',
      title: 'The Initiative',
      description: 'Keeping your opponent on the defensive',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['initiative', 'tempo', 'attack'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'What is Initiative?',
          explanation: `The **initiative** is having the active side of the position - you create threats, and your opponent must respond. It's like being the one asking questions while your opponent scrambles for answers.

**Signs you have the initiative:**

- Your moves create threats
- Opponent must defend rather than create
- You dictate the game's direction
- Each of your moves asks a question

**Why initiative matters:**

1. **Psychological pressure** - Defending is harder than attacking
2. **Error likelihood** - Defenders make more mistakes
3. **Clock advantage** - Attacker spends less time (obvious moves)
4. **Momentum** - Initiative tends to grow if maintained

**Tal's philosophy**: "You must take your opponent and drag him into a dark forest where 2+2=5, and the path leading out is only wide enough for one."

**Initiative vs Material**: A strong initiative can compensate for significant material deficits. Many games are won through initiative alone.`,
          highlights: [
            { square: 'f3', color: 'green' },
            { square: 'c4', color: 'green' },
          ],
        },
        {
          id: 'keeping-initiative',
          type: 'explanation',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 b kq - 5 5',
          title: 'Maintaining Initiative',
          explanation: `Once you have the initiative, the key challenge is **keeping it**. Many players gain the initiative but then make a passive move and lose it.

**Rules for maintaining initiative:**

1. **Create a threat with every move** - Even small threats keep pressure on
2. **Don't waste time on passive moves** - Each tempo must be productive
3. **Increase pressure gradually** - Build up rather than go all-in immediately
4. **Don't let opponent consolidate** - Keep them off-balance

**Ask yourself after each move:**
"What problem does this create for my opponent?"

If the answer is "none," reconsider the move!

**Kasparov's approach**: Garry Kasparov was the master of initiative. His opponents often felt they were fighting against a tidal wave - constant pressure from every direction.

**Warning**: The initiative is like a hot potato - if you don't use it, it disappears. Passive moves give your opponent time to equalize.`,
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
            { from: 'c4', to: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'seize-initiative',
          type: 'explanation',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5',
          title: 'Seizing Initiative',
          explanation: `When your opponent plays passively or makes a mistake, you must **seize the initiative** immediately.

**How to seize initiative:**

1. **Find aggressive moves** - Look for checks, captures, threats
2. **Create multiple threats** - One threat is easy to handle; two are harder
3. **Don't give breathing room** - Each move should demand a response
4. **Centralize with tempo** - Develop while creating threats

**In this position:**
Black's ...Bb4 looks active but doesn't create a real threat. White can ignore it and seize the initiative with 0-0 (activating the rook) or d3 (strengthening the center).

**Seizing vs Maintaining:**
- **Seizing** initiative = active moves when opponent is passive
- **Maintaining** initiative = keeping pressure when you already have it

**Practical tip**: When your opponent's last move didn't create a threat, ask: "What's the most aggressive thing I can do?"`,
          arrows: [
            { from: 'e1', to: 'g1', color: 'green' },
            { from: 'd2', to: 'd3', color: 'blue' },
          ],
          highlights: [
            { square: 'b4', color: 'yellow' },
          ],
        },
        {
          id: 'tempo-gain',
          type: 'interactive',
          fen: 'r1bqk2r/pppp1ppp/2n5/2b1p3/2BnP3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 6',
          title: 'Gain a Tempo',
          explanation: `A **tempo** is one unit of time in chess - essentially one move. Gaining tempi means forcing your opponent to move a piece multiple times while you develop.

Black has played ...Nd4, which looks aggressive. But the knight can be challenged, gaining White a tempo!

Find the move that **attacks the knight while improving your position**.`,
          correctMoves: ['c3'],
          arrows: [
            { from: 'c2', to: 'c3', color: 'green' },
          ],
          highlights: [
            { square: 'd4', color: 'red' },
          ],
          successMessage: 'Correct! c3 attacks the knight, forcing it to move again. After ...Ne6 (or Nf5), White plays d4 with a strong center and a tempo advantage.',
          failureMessage: 'A tempo is gained by attacking while improving your position. Which pawn can challenge the knight?',
        },
        {
          id: 'dont-relax',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQ1RK1 b - - 5 5',
          title: 'Don\'t Relax the Pressure',
          explanation: `One of the most common mistakes is **gaining the initiative and then relaxing**. This gives your opponent exactly what they need: time to consolidate.

**In this position:**
White has Ng5, threatening Nxf7. This demands an immediate response from Black. The initiative is White's.

If White had played a slow move like a3 instead of Ng5, Black would have time to develop peacefully and equalize.

**Kasparov's rule**: "When you have the initiative, keep attacking!"

**Signs you're relaxing too soon:**
- Playing "safe" developing moves
- Defending when you should attack
- Allowing opponent to catch up in development
- Missing forcing continuations

**Psychological insight**: Defenders often crack under sustained pressure. The longer you maintain the initiative, the more likely your opponent will err.

**Tal vs Botvinnik, 1960**: Tal won the World Championship largely by never giving Botvinnik a moment's rest.`,
          arrows: [
            { from: 'g5', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'converting-initiative',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P1N1/3P4/PPP2PPP/RNBQ1RK1 w - - 0 7',
          title: 'Converting Initiative',
          explanation: `Initiative is **temporary** - you must convert it into something permanent before it evaporates. This is one of the hardest skills in chess.

**What can initiative convert into:**

1. **Material advantage** - Win pawns or pieces
2. **Positional advantage** - Better structure, weak squares
3. **Lasting attack** - Permanent pressure on the king
4. **Superior endgame** - Transition while ahead

**The conversion process:**
- Maintain pressure until opponent cracks
- Look for the moment when material or positional gain is possible
- Don't overpress - take what's offered
- A small permanent advantage beats a temporary initiative

**Petrosian's wisdom**: "The art of chess is knowing when to convert your temporary advantages into permanent ones."

**Practical tips:**
- If you can win a pawn without losing initiative, do it
- If you can improve your worst piece while threatening, do it
- When in doubt, increase the pressure rather than cash in`,
          arrows: [
            { from: 'g4', to: 'f6', color: 'yellow' },
            { from: 'g4', to: 'h6', color: 'yellow' },
          ],
          highlights: [
            { square: 'g4', color: 'green' },
          ],
        },
        {
          id: 'initiative-puzzle',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 0 8',
          title: 'Seize the Initiative',
          explanation: `This position is roughly equal, but White can play to seize the initiative. The pawn structure is solid for both sides.

Find the move that **creates the most dynamic possibilities** and puts Black under pressure!`,
          correctMoves: ['cxd5'],
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
          ],
          successMessage: 'Well played! cxd5 opens lines and creates tension. If Black recaptures exd5, they get an isolated pawn; if Nxd5, White gains piece activity. This seizes the initiative!',
          failureMessage: 'Look for a move that opens lines or creates targets for your pieces.',
        },
      ],
    },
    {
      id: 'typical-plans',
      title: 'Typical Middlegame Plans',
      description: 'Standard plans for common positions',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      tags: ['plans', 'strategy', 'middlegame'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Finding a Plan',
          explanation: `Every chess position needs a plan. Playing random moves without direction leads to drift and eventual loss. Here's how to find a plan:

**The Four-Step Planning Process:**

1. **Assess the position** - Who's better? Why?
2. **Identify imbalances** - Bishops vs knights? Pawn structure differences?
3. **Find targets** - Weak pawns? Exposed king? Bad pieces?
4. **Choose a plan** - Attack, defend, or improve?

**"A bad plan is better than no plan"** - This famous chess maxim is true because even a flawed plan gives direction, while aimless play loses for certain.

**Types of plans:**
- **Attacking plans** - Target the king or weak points
- **Positional plans** - Improve pieces, create weaknesses
- **Defensive plans** - Neutralize opponent's threats
- **Prophylactic plans** - Prevent opponent's ideas

**Steinitz's principle**: The player with an advantage MUST attack, or the advantage will disappear. The player at a disadvantage should avoid exchanges and complications.`,
          highlights: [
            { square: 'c5', color: 'blue' },
            { square: 'c4', color: 'green' },
          ],
        },
        {
          id: 'minority-attack',
          type: 'explanation',
          fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 2 9',
          title: 'The Minority Attack',
          explanation: `The **minority attack** is a classic plan: advance fewer pawns against a larger pawn mass to create weaknesses.

**The classic example (Queen's Gambit Declined):**

White plays b4-b5, attacking Black's c6 pawn with fewer pawns. After exchanges (cxb5 axb5), Black gets:
- An isolated c-pawn (weak)
- A weak square on c6 for White's pieces

**How to execute the minority attack:**

1. Advance the b-pawn: b2-b4-b5
2. Use the a-pawn if needed: a2-a4 supports
3. Aim for bxc6 (or wait for ...cxb5)
4. Occupy the weak squares and attack the weak pawn

**Historical importance**: This plan has been a cornerstone of Queen's Gambit positions since the 1920s. Capablanca and Rubinstein were masters of it.

**Defending against minority attack:**
- Counter with ...c5 (challenge the center instead)
- Play ...b6-a5 to prevent b5
- Create kingside counterplay before the attack arrives`,
          arrows: [
            { from: 'b2', to: 'b4', color: 'green' },
            { from: 'b4', to: 'b5', color: 'green' },
            { from: 'b5', to: 'c6', color: 'red' },
          ],
          highlights: [
            { square: 'c6', color: 'yellow' },
          ],
        },
        {
          id: 'kingside-expansion',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/4P3/1NN5/PPP1BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Kingside Expansion',
          explanation: `When your king is safely castled and the center is stable, **kingside expansion** can create powerful attacking chances.

**The kingside pawn storm:**

1. **f4** - Challenge the center and support e5
2. **g4-g5** - Push back enemy knights (especially from f6)
3. **h4-h5** - Open the h-file for the rook

**When to use kingside expansion:**
- Your king is safe (opposite side castling OR blocked center)
- You have more space or piece activity
- Enemy king is vulnerable
- Central tension is resolved in your favor

**Risks of kingside expansion:**
- Weakens your own king's position
- Can be too slow if opponent has central play
- Creates targets if attack fails

**The King's Indian Attack**: This whole opening system is built around kingside expansion - pushing pawns to create attacking chances.

**Warning**: Never start a pawn storm if your center can collapse!`,
          arrows: [
            { from: 'f2', to: 'f4', color: 'blue' },
            { from: 'g2', to: 'g4', color: 'blue' },
            { from: 'h2', to: 'h4', color: 'blue' },
          ],
          highlights: [
            { square: 'f4', color: 'blue' },
            { square: 'g4', color: 'blue' },
          ],
        },
        {
          id: 'play-against-iqp',
          type: 'explanation',
          fen: 'r1bq1rk1/pp3ppp/2nbpn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 10',
          title: 'Playing Against the IQP',
          explanation: `The **Isolated Queen Pawn (IQP)** is a central pawn with no neighboring pawns. It's a strategic landmark that shapes the entire game.

**Three pillars of anti-IQP play:**

1. **Blockade** - Put a piece (ideally a knight) on the square in front of the pawn (d5 or d4)
2. **Exchange pieces** - Fewer pieces = less dynamic potential for IQP side
3. **Attack the pawn** - Pile up with rooks and queen; it can't be defended by pawns

**Why the IQP is weak:**
- Cannot be defended by other pawns
- The square in front of it is a permanent outpost
- Becomes a target in the endgame

**But the IQP also has strengths:**
- Provides central space
- Supports outposts on c5/e5
- Creates open files for rooks
- Dynamic piece play compensates

**Strategic verdict**: In the middlegame, the IQP side has dynamic chances. In the endgame, the IQP is a liability. The anti-IQP player should trade pieces and head for an endgame.`,
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'd4', color: 'red' },
          ],
          arrows: [
            { from: 'c3', to: 'd5', color: 'blue' },
            { from: 'd1', to: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'choose-plan',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/2NBPN2/PP2QPPP/R1B2RK1 w - - 0 10',
          title: 'Choose Your Plan',
          explanation: `Black has set up the typical French Defense pawn structure with pawns on c5, d5, and e6. White must choose a plan.

The key question: How should White **handle the central tension** and develop a long-term plan?`,
          correctMoves: ['dxc5'],
          arrows: [
            { from: 'd4', to: 'c5', color: 'green' },
          ],
          successMessage: 'Correct! dxc5 opens the position for White\'s better-developed pieces. After Bxc5, White can target the backward d5 pawn or play against Black\'s bad bishop on c8.',
          failureMessage: 'Look at the pawn structure. How can White create a favorable imbalance?',
        },
        {
          id: 'improve-worst',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Improve Your Worst Piece',
          explanation: `One of the most **universally applicable** middlegame strategies: identify your worst-placed piece and improve it.

**The principle:**
"A chain is only as strong as its weakest link."

If one piece is doing nothing, your whole army is undermanned. Fix this before launching operations!

**In this position:**
White's worst piece is the **c1 bishop** - it's blocked by the d3 pawn and hasn't moved. Plans include:
- **Bg5** - Active, pins the knight, pressures d6
- **Be3** - Supports a future d4 advance
- **b3 + Bb2** - Long fianchetto, controls e5

**Finding your worst piece:**
1. Look at each piece
2. Ask: "What is this piece doing?"
3. The piece doing the least is your worst
4. Find a way to improve it

**Capablanca's method**: The third World Champion was famous for slowly improving his pieces until his position was crushing - without any apparent brilliancies.`,
          arrows: [
            { from: 'c1', to: 'g5', color: 'green' },
            { from: 'c1', to: 'e3', color: 'blue' },
            { from: 'c1', to: 'b2', color: 'yellow' },
          ],
          highlights: [
            { square: 'c1', color: 'red' },
          ],
        },
        {
          id: 'plan-puzzle',
          type: 'puzzle',
          fen: 'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQR1K1 w - - 0 9',
          title: 'Find the Right Plan',
          explanation: `White has developed all pieces and the position is roughly equal. But White can implement a specific plan to create problems for Black.

Find the move that **starts a concrete plan** for White!`,
          correctMoves: ['Nd5', 'Bg5'],
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
            { from: 'c1', to: 'g5', color: 'blue' },
          ],
          successMessage: 'Excellent! Nd5 occupies a powerful central outpost (Black must reckon with Nxf6). Bg5 pins the knight and creates pressure. Both are excellent plans!',
          failureMessage: 'Look for a move that either occupies a strong square or creates pressure on Black\'s position.',
        },
      ],
    },
    {
      id: 'prophylaxis',
      title: 'Prophylaxis',
      description: 'Preventing your opponent\'s plans',
      difficulty: 'advanced',
      estimatedMinutes: 12,
      tags: ['prophylaxis', 'defense', 'strategy'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'What is Prophylaxis?',
          explanation: `**Prophylaxis** is thinking about your opponent's ideas and preventing them before they happen. It's the defensive counterpart to aggressive play.

**The prophylactic thinking process:**

Instead of only thinking about YOUR plans, ask:
1. "What does my opponent want to do?"
2. "How can I stop it?"
3. "Can I stop it while improving my position?"

**Why prophylaxis matters:**

- Prevents your opponent from executing their plan
- Often improves your position as a side benefit
- Forces opponent to find new ideas (using their time)
- Creates frustration and errors

**Petrosian's philosophy**: Tigran Petrosian (9th World Champion) was the greatest prophylactic player. He said: "I prefer to prevent my opponent's ideas rather than have my own."

**Key insight**: Great players spend almost as much time thinking about their opponent's plans as their own. This is what separates masters from amateurs.`,
          highlights: [
            { square: 'g4', color: 'yellow' },
            { square: 'g5', color: 'yellow' },
          ],
        },
        {
          id: 'example-prophylaxis',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N1P/PPP2PP1/R1BQ1RK1 b - - 0 8',
          title: 'h3 - A Prophylactic Move',
          explanation: `The move **h3** looks like it does nothing. It doesn't attack, doesn't develop a piece, doesn't improve the pawn structure. But it's actually a powerful prophylactic move!

**What h3 accomplishes:**

1. **Prevents ...Bg4** - Black's bishop can't pin the knight to the queen
2. **Provides king escape square** - Luft for the king (prevents back rank mates)
3. **Prepares g4 expansion** - If needed, the g-pawn can advance safely
4. **Maintains flexibility** - Doesn't commit to a specific plan

**The hidden value of "waiting" moves:**
Sometimes the best move is one that improves your position without commitment while waiting for your opponent to reveal their plans.

**Karpov's speciality**: Anatoly Karpov was famous for these small moves that seemed to do nothing but actually prevented all of his opponent's ideas.

**When to play prophylactic moves:**
- When you're not sure of the best plan
- When opponent has a concrete threat coming
- When your position is solid and time isn't critical`,
          arrows: [
            { from: 'c8', to: 'g4', color: 'red' },
          ],
          highlights: [
            { square: 'h3', color: 'green' },
            { square: 'g4', color: 'red' },
          ],
        },
        {
          id: 'nimzowitsch',
          type: 'explanation',
          fen: 'r1bqk2r/ppp1bppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 2 6',
          title: 'The Nimzowitsch Method',
          explanation: `Aaron Nimzowitsch was the prophet of prophylaxis. His book "My System" revolutionized chess thinking. His strategic formula was:

**"First restrain, then blockade, finally destroy."**

**The three-step process:**

1. **Restrain** - Limit your opponent's options and mobility
2. **Blockade** - Stop their pawns and pieces from advancing
3. **Destroy** - Only attack once the opponent is completely restricted

**Why this works:**
- A restrained opponent can't create counterplay
- Blockaded pawns become weaknesses
- When finally ready to attack, no defense remains

**Practical application:**
- Don't attack until you've neutralized counterplay
- Secure your own weaknesses before exploiting enemy's
- Patient maneuvering often beats direct assault

**The Modern Style**: Today's top players blend Nimzowitsch's prophylaxis with tactical sharpness - knowing when to restrain and when to strike.`,
          arrows: [
            { from: 'c3', to: 'd5', color: 'blue' },
            { from: 'f3', to: 'e5', color: 'blue' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'e5', color: 'green' },
          ],
        },
        {
          id: 'prevent-break',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - c6 0 8',
          title: 'Prevent the Break',
          explanation: `Black's plan is clear: play ...cxd4 followed by ...e5, freeing their position and activating the bishop on c8.

How can White **prophylactically prevent** this plan?`,
          correctMoves: ['e5'],
          arrows: [
            { from: 'e4', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'f6', color: 'red' },
          ],
          successMessage: 'Excellent! e5 fixes the pawn structure and permanently prevents ...e5. The knight on f6 is pushed away, and Black\'s light-squared bishop will remain "bad" forever.',
          failureMessage: 'Black wants to free their position with ...e5. How can you stop this break permanently?',
        },
        {
          id: 'waiting-move',
          type: 'explanation',
          fen: 'r2q1rk1/pp2bppp/2n1bn2/3pp3/8/1PN1PN2/PBPPBPPP/R2Q1RK1 w - - 0 10',
          title: 'Useful Waiting Moves',
          explanation: `Sometimes the best strategy is to **wait** - make useful moves that don't commit to a specific plan while letting your opponent reveal their intentions.

**Characteristics of good waiting moves:**

1. **Improve king safety** - a3, h3, King moves
2. **Improve piece positions** - Minor piece maneuvers
3. **Don't weaken pawns** - Avoid creating targets
4. **Maintain flexibility** - Keep multiple plans available

**Classic waiting moves:**
- **a3/h3** - Small pawn moves with prophylactic value
- **Rook shuffling** - Rc1-d1, Ra1-c1
- **King safety** - Kh1 or Kh8 to remove the king from potential tactics

**When to wait:**
- Your position is solid but you lack a clear plan
- Opponent is about to commit to something
- Time is on your side (better endgame)
- You want to exhaust opponent's useful moves

**Petrosian's saying**: "If you have a good position, make a cup of tea." (Meaning: relax, don't rush, let your opponent struggle.)`,
          arrows: [
            { from: 'a2', to: 'a3', color: 'yellow' },
            { from: 'f1', to: 'd1', color: 'yellow' },
          ],
        },
        {
          id: 'prophylaxis-puzzle',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp1bppp/2n1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQ - 0 7',
          title: 'Find the Prophylactic Move',
          explanation: `White has a solid position and no urgent threats. But Black has ideas like ...Bb4, ...Ne4, or ...dxc4 followed by ...b5.

Find the move that **prevents Black's ideas** while improving White's position!`,
          correctMoves: ['O-O', 'a3'],
          arrows: [
            { from: 'e1', to: 'g1', color: 'green' },
            { from: 'a2', to: 'a3', color: 'blue' },
          ],
          successMessage: 'Well done! O-O castles to safety (prophylactic king safety). a3 prevents ...Bb4 and prepares b4. Both are prophylactic improvements!',
          failureMessage: 'What are Black\'s main ideas? How can you prevent them while improving your position?',
        },
      ],
    },
    {
      id: 'critical-moments',
      title: 'Critical Moments',
      description: 'Recognizing and handling turning points',
      difficulty: 'advanced',
      estimatedMinutes: 12,
      tags: ['psychology', 'decision', 'critical'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Recognizing Critical Moments',
          explanation: `Every chess game has **critical moments** - positions where the decisions made shape the entire outcome. Spending your time wisely means identifying these moments.

**What makes a moment critical?**

1. **Pawn breaks** - Moves that change the structure permanently
2. **Piece sacrifices** - Irreversible material decisions
3. **Exchange decisions** - Trade or keep pieces?
4. **King safety choices** - Castle or not? Which side?
5. **Transition points** - Middlegame to endgame decisions

**The time management principle:**
Spend most of your thinking time on critical moments, not routine moves!

**How to recognize critical moments:**
- The position feels different than before
- Multiple very different options exist
- The choice will affect many future moves
- Your intuition says "this is important"

**Garry Kasparov**: "In chess, as in life, the critical moments require the most attention."

**Practical tip**: When you sense a critical moment, slow down dramatically. Even if you're in time trouble, these are the moves that matter most.`,
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'c5', color: 'yellow' },
          ],
        },
        {
          id: 'calculate-deeply',
          type: 'explanation',
          fen: 'r1b2rk1/ppppqppp/2n2n2/2b1p1N1/2B1P3/3P4/PPP2PPP/RNBQ1RK1 w - - 0 7',
          title: 'When to Calculate Deeply',
          explanation: `Not every position requires deep calculation. Save your mental energy for positions where calculation actually matters.

**When to calculate deeply:**

- **Tactical positions** - Pieces attacking, sacrifices possible
- **Exposed kings** - Yours or opponent's
- **Material imbalances** - Unusual material balance
- **Forcing sequences** - Checks, captures, threats

**When NOT to over-calculate:**

- **Quiet positions** - Use judgment and general principles
- **Strategic decisions** - These are about evaluation, not calculation
- **When no forcing moves exist** - Trust pattern recognition
- **Openings** - Unless you're in a sharp line you don't know

**The calculation framework:**
1. Identify all forcing moves (checks, captures, threats)
2. Consider opponent's best responses
3. Look at least 3-5 moves deep
4. Evaluate the resulting position

**Kasparov's balance**: Even Kasparov, one of the greatest calculators ever, said: "I calculate concrete variations only when necessary."`,
          arrows: [
            { from: 'g5', to: 'f7', color: 'red' },
            { from: 'c4', to: 'f7', color: 'red' },
            { from: 'd1', to: 'h5', color: 'blue' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'trust-intuition',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w - - 4 5',
          title: 'Intuition vs Calculation',
          explanation: `Chess mastery requires knowing when to trust intuition and when to calculate. Both skills are essential, but they're used differently.

**When to trust intuition:**

- Position is quiet, strategic in nature
- Multiple reasonable options exist
- Can't calculate everything to a clear end
- Pattern feels familiar from experience

**When to calculate:**

- Tactics are clearly present
- Material is at stake
- Forcing sequences are possible
- "Something is happening" - your intuition says calculate!

**How intuition develops:**
- Pattern recognition from thousands of games
- Experience with similar positions
- Understanding of piece activity
- "Feel" for dynamics and statics

**The blending approach:**
Good players start with intuition ("this position feels good for me"), then verify with calculation ("let me check the concrete lines").

**Magnus Carlsen**: "I don't analyze as much as some people think. I rely heavily on intuition. If something feels right, I play it."`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'f3', color: 'green' },
          ],
        },
        {
          id: 'decisive-moment',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp2pp1/2np1n1p/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
          title: 'The Decisive Moment',
          explanation: `This is a critical moment. The position is tense, with both sides developed. White must decide: play solidly, or seize the initiative aggressively?

Find the move that **takes advantage of the critical moment**!`,
          correctMoves: ['Nd5'],
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
          ],
          successMessage: 'Brilliant! Nd5! seizes the moment. The knight is untouchable - Nxd5?? loses to Bxf7+ Rxf7 Qb3 pinning and winning material. White dominates the position.',
          failureMessage: 'Look for an aggressive piece placement that creates multiple threats simultaneously.',
        },
        {
          id: 'time-management',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Time Management',
          explanation: `In timed games, managing your clock is as important as managing your pieces. Here's how to budget time wisely:

**Time allocation by phase:**

- **Opening** (moves 1-15): Quick moves, rely on preparation
- **Early middlegame** (15-25): Build time reserve while developing
- **Critical moments**: Spend your saved time HERE!
- **Time trouble** (last 5-10 min): Make practical, safe choices

**Signs you should spend time:**

- Position feels unfamiliar
- Major piece sacrifice is possible
- Pawn structure change is imminent
- You're about to make an irreversible decision

**Signs to move quickly:**

- Natural developing move
- Only one reasonable option
- Following known theory
- Recapturing with the obvious piece

**The Time Trouble Trap:**
Don't spend all your time on the opening and early middlegame! Save at least 30-40% for the critical moments.

**Tal's wisdom**: "The winner is the one who makes the second-to-last mistake." In time trouble, make moves that are practical and minimize blunder chances.`,
          highlights: [
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'critical-puzzle',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2BPP3/2N2N2/PP3PPP/R1BQ1RK1 b - - 0 8',
          title: 'Critical Decision Point',
          explanation: `Black faces a critical decision. White has just played d4, attacking the center. How Black responds will shape the entire game.

This is exactly the kind of moment where you should **invest your thinking time**.

What is Black's best response?`,
          correctMoves: ['exd4'],
          arrows: [
            { from: 'e5', to: 'd4', color: 'green' },
          ],
          successMessage: 'Good choice! exd4 accepts the challenge in the center. After Nxd4, Black can recapture with Nxd4, maintaining equality. This is a principled decision!',
          failureMessage: 'White has challenged the center with d4. How should Black respond to this critical break?',
        },
      ],
    },
    {
      id: 'defense-techniques',
      title: 'Defensive Techniques',
      description: 'How to survive under pressure',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['defense', 'survival', 'techniques'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQ1RK1 b - - 5 5',
          title: 'Defensive Mindset',
          explanation: `Defense in chess is an art. When you're under attack, the way you think must change completely.

**The Defensive Mindset:**

1. **Stay calm** - Panic leads to blunders. Breathe and think.
2. **Find the threat** - What exactly is dangerous? Be specific.
3. **Look for resources** - Counterplay, exchanges, fortress ideas
4. **Don't give up** - Many "lost" positions are saved through tenacious defense

**"He who defends everything, defends nothing."** - Frederick the Great

This military wisdom applies to chess: you can't protect every weakness. Identify the **critical threats** and address those first.

**Types of defensive tasks:**
- **Concrete defense** - Stopping a specific threat
- **Positional defense** - Limiting enemy piece activity
- **Active defense** - Creating counter-threats

**Lasker's approach**: Emanuel Lasker (World Champion 1894-1921) was famous for defending "lost" positions and frustrating his opponents into errors.

**The psychology of defense**: Attackers often become nervous when their attack is defended well. Keep defending, and opportunities will arise!`,
          highlights: [
            { square: 'g5', color: 'red' },
            { square: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'key-defender',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n5/4p1Nn/2B1P3/8/PPPP1PPP/RNBQ1RK1 w - - 6 6',
          title: 'Identify Key Defenders',
          explanation: `Every position has **key defensive pieces** - pieces whose removal would cause the position to collapse. Identifying them is crucial for both attack and defense.

**Examples of key defenders:**

- A knight protecting the king (like the f6 knight guarding h7)
- A bishop covering a critical diagonal
- A rook guarding the back rank
- A queen defending multiple points

**In this position:**
The knight that was on f6 was Black's key defender of h7. Now that it's been pushed to h5, White's threats become much more dangerous.

**How attackers target key defenders:**
1. Exchange the key defender
2. Deflect it from its defensive duty
3. Overload it with too many tasks

**How to protect key defenders:**
1. Support them with other pieces
2. Eliminate the pieces attacking them
3. Create counter-threats that distract the attacker

**Practical tip**: Before each move, ask: "What is my most important defensive piece, and is it safe?"`,
          highlights: [
            { square: 'h5', color: 'red' },
            { square: 'h7', color: 'yellow' },
          ],
          arrows: [
            { from: 'g5', to: 'h7', color: 'red' },
            { from: 'c4', to: 'f7', color: 'red' },
          ],
        },
        {
          id: 'counterattack',
          type: 'explanation',
          fen: 'r1b2rk1/ppppqppp/2n2n2/4p1N1/2B1P3/3P4/PPP2PPP/RNBQ1RK1 b - - 0 7',
          title: 'Counterattack',
          explanation: `Often, the best defense is a **counterattack**. Instead of passively defending, create threats of your own!

**Why counterattack works:**

1. **Forces attacker to defend** - They must address your threats
2. **Fights fire with fire** - Attack is the best defense
3. **Creates complications** - In mutual attacks, mistakes happen
4. **Psychological shift** - Attacker may lose confidence

**In this position:**
Instead of only defending f7 and h7, Black can consider ...d5! - opening the center and creating counter-threats against White's position.

**Types of counterattack:**
- **Central break** - Open the center when attacked on the wing
- **Attack the attacker's base** - Target the squares behind the attack
- **Flank counterattack** - If attacked on kingside, counter on queenside
- **Piece activity** - Activate dormant pieces to create threats

**The old adage**: "Meet a flank attack with action in the center." This has been chess wisdom for 200 years and remains true.`,
          arrows: [
            { from: 'd7', to: 'd5', color: 'blue' },
            { from: 'c6', to: 'd4', color: 'blue' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'find-defense',
          type: 'interactive',
          fen: 'r1b2rk1/pppp1ppp/2n2n2/4p1Nq/2B1P3/3P4/PPP2PPP/RNBQ1RK1 w - - 0 7',
          title: 'Find the Defense',
          explanation: `Black has played ...Qh5, putting pressure on g5 and threatening ...Qxf3 if White isn't careful.

White needs to find a **solid defensive move** that addresses the threats while maintaining position.`,
          correctMoves: ['g3', 'Qf3'],
          arrows: [
            { from: 'g2', to: 'g3', color: 'green' },
            { from: 'd1', to: 'f3', color: 'blue' },
          ],
          successMessage: 'Good defense! g3 creates "luft" for the king and covers f4. Qf3 offers a queen trade, which eases the pressure. Both are solid defensive choices.',
          failureMessage: 'The queen on h5 is threatening. How can you defend the kingside while not losing material?',
        },
        {
          id: 'exchange-attackers',
          type: 'explanation',
          fen: 'r1b2rk1/pppp1ppp/2n2n2/2b1p3/4P2q/2NP2N1/PPP2PPP/R1BQ1RK1 w - - 6 8',
          title: 'Exchange the Attackers',
          explanation: `When facing an attack, one of the most effective techniques is to **exchange the attacking pieces**.

**Why exchanging helps:**

1. **Reduces attacker's firepower** - Fewer pieces = fewer threats
2. **Queen trade is critical** - Without queens, most attacks die
3. **Simplification benefits defender** - Easier to defend with less material
4. **Endgame transition** - Often favorable if you've weathered the storm

**In this position:**
Black's queen on h4 is the spearhead of the attack. White can play Qxh4 Nxh4, and suddenly the danger is much reduced.

**Which pieces to exchange:**
- **Queens first** - Always consider queen trades when defending
- **Active attackers** - Trade their best-placed pieces
- **NOT your key defenders** - Keep the pieces guarding your king

**Petrosian's method**: The "Iron Tigran" was famous for trading down into defensible positions. His opponents' attacks would evaporate.

**Practical tip**: Don't exchange just for the sake of it. Make sure the resulting position is actually easier to defend.`,
          arrows: [
            { from: 'd1', to: 'h4', color: 'green' },
          ],
          highlights: [
            { square: 'h4', color: 'red' },
          ],
        },
        {
          id: 'fortress',
          type: 'explanation',
          fen: '2r3k1/5ppp/8/8/8/5N2/5PPP/6K1 b - - 0 1',
          title: 'The Fortress',
          explanation: `In desperate situations, you may be able to build a **fortress** - a defensive setup that the opponent cannot penetrate despite material advantage.

**What makes a fortress:**

1. **No entry points** - All invasion routes are blocked
2. **Impenetrable setup** - Pieces and pawns form a wall
3. **No zugzwang** - You have waiting moves available
4. **Opponent can't make progress** - Material advantage is useless

**Common fortress themes:**
- Rook + pawns vs Queen (if pawns block the queen)
- Bishop of wrong color (rook pawn + wrong bishop vs king)
- Blocked position with material deficit
- Drawing patterns with specific piece configurations

**When to aim for a fortress:**
- You're significantly behind in material
- The position can be closed
- You can build an impenetrable structure

**Famous example**: The "Rook + Knight vs Rook" fortress, where the defending rook and knight can create a setup that the extra piece cannot penetrate.

**Psychological value**: Even attempting a fortress can frustrate attackers into errors!`,
          highlights: [
            { square: 'g1', color: 'green' },
            { square: 'f3', color: 'green' },
            { square: 'f2', color: 'green' },
            { square: 'g2', color: 'green' },
            { square: 'h2', color: 'green' },
          ],
        },
        {
          id: 'defense-puzzle',
          type: 'puzzle',
          fen: 'r1b2rk1/pppp1ppp/2n2n2/4p1NQ/2B1P3/8/PPPP1PPP/RNB2RK1 b - - 0 7',
          title: 'Defend the Attack',
          explanation: `White has a dangerous attack with Qh5 and Ng5 bearing down on f7 and h7. Black needs to find an accurate defensive move to survive!

Find the **best defensive resource** for Black.`,
          correctMoves: ['h6', 'd5'],
          arrows: [
            { from: 'h7', to: 'h6', color: 'green' },
            { from: 'd7', to: 'd5', color: 'blue' },
          ],
          successMessage: 'Well defended! h6 kicks the knight and provides luft. d5! is even better - a counterattacking resource that opens lines and challenges the bishop while defending.',
          failureMessage: 'Look for moves that either drive back the attackers or create counter-threats.',
        },
      ],
    },
    {
      id: 'transition-endgame',
      title: 'Transitioning to Endgame',
      description: 'When and how to simplify',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['endgame', 'transition', 'simplification'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/4P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
          title: 'When to Transition',
          explanation: `The decision to transition from middlegame to endgame is one of the most important in chess. Get it right, and you convert advantages smoothly. Get it wrong, and you let your opponent back into the game.

**When to transition to the endgame:**

1. **Material advantage** - Fewer pieces make it easier to convert
2. **Better pawn structure** - Endgames highlight structural advantages
3. **Opponent has attacking chances** - Kill the attack by trading
4. **You're better in the ending** - Trust your technique
5. **Simplification eliminates risk** - When leading, reduce complexity

**When NOT to transition:**

1. **You have attacking chances** - Don't trade away your attack
2. **Your opponent is better in endings** - Keep pieces on
3. **You're behind** - Complexity gives you chances
4. **Position requires piece play** - Some advantages only work with pieces

**Capablanca's philosophy**: The third World Champion was famous for steering games into favorable endgames. He said: "In order to improve your game, you must study the endgame before everything else."`,
          highlights: [
            { square: 'd6', color: 'yellow' },
            { square: 'e5', color: 'yellow' },
          ],
        },
        {
          id: 'queen-trade',
          type: 'explanation',
          fen: 'r1b2rk1/ppp1qppp/2np1n2/4p3/4P3/2NP1N2/PPP1QPPP/R1B2RK1 w - - 4 10',
          title: 'The Queen Trade',
          explanation: `Trading queens is often the gateway to the endgame. Queens are the most powerful attacking pieces, so their removal fundamentally changes the character of the game.

**Trade queens when:**

- You're ahead in material (easier to convert)
- Your king is safer without queens on the board
- Your pawn structure is better
- You want to reduce complications
- Your opponent has attacking chances

**Keep queens when:**

- You're attacking (queens deliver checkmate!)
- You need tactical chances to save the game
- You're behind and need complications
- The position favors queen play

**The psychology of queen trades:**
Offering a queen trade puts a decision on your opponent. They must either accept (entering your territory) or decline (possibly awkwardly).

**Karpov's technique**: Anatoly Karpov was masterful at trading queens at exactly the right moment, transitioning into endings where his superior technique was decisive.`,
          arrows: [
            { from: 'e2', to: 'e7', color: 'green' },
          ],
          highlights: [
            { square: 'e2', color: 'blue' },
            { square: 'e7', color: 'blue' },
          ],
        },
        {
          id: 'good-knight-ending',
          type: 'explanation',
          fen: '4r1k1/ppp2ppp/2np4/4p3/4P1n1/2NP4/PPP3PP/R4RK1 w - - 0 15',
          title: 'Favorable Piece Endings',
          explanation: `Different piece configurations favor different sides. Understanding this helps you decide when to transition.

**Knight endings favor:**
- Positions with pawns on one side (knight can reach everywhere)
- Closed positions with fixed pawns
- Positions with clear outposts

**Bishop endings favor:**
- Positions with pawns on both flanks (bishop's range matters)
- Open positions
- Positions where the bishop isn't blocked by pawns

**Rook endings:**
- The most common type
- Activity is everything!
- Passed pawns are critical
- "Rook behind passed pawn" is key

**Practical guidelines:**
- Two bishops are strong in open positions
- Knight + pawns can be better than bishop in closed positions
- In rook endings, the more active rook often wins regardless of pawns

**Smyslov's wisdom**: "The endgame is where chess is most beautiful, because we see the true nature of the pieces."`,
          highlights: [
            { square: 'c3', color: 'green' },
            { square: 'g4', color: 'red' },
          ],
        },
        {
          id: 'simplify-correctly',
          type: 'interactive',
          fen: 'r1b2rk1/ppp2ppp/2nq1n2/4p3/4P3/2N2N2/PPPQ1PPP/R1B2RK1 w - - 0 11',
          title: 'Simplify to Win',
          explanation: `White is slightly better due to better coordination. The question is how to convert this small advantage.

Find the move that **transitions to a favorable endgame**.`,
          correctMoves: ['Qxd6'],
          arrows: [
            { from: 'd2', to: 'd6', color: 'green' },
          ],
          successMessage: 'Correct! Qxd6 cxd6 (or Nxd6) leaves Black with a weakness: the isolated d-pawn. White can then target this pawn in the endgame, and the position is easier to play.',
          failureMessage: 'Look for a trade that creates a favorable endgame. What exchange helps White most?',
        },
        {
          id: 'technique',
          type: 'explanation',
          fen: '4r1k1/ppp2ppp/3p4/4p3/4P3/2NP4/PPP2PPP/4R1K1 w - - 0 20',
          title: 'Endgame Technique',
          explanation: `Once you've reached a favorable endgame, proper technique is essential. Here are the key principles:

**1. Don't Rush**
- Technical positions require patience
- Errors in the endgame are often fatal
- Small advantages grow with time

**2. Activate Your King**
- The king becomes a fighting piece in the endgame
- Centralize your king
- Use the king to attack pawns and support passed pawns

**3. Create Passed Pawns**
- Passed pawns are the currency of endgames
- "A passed pawn's ambition is to become a queen"
- Create them, support them, advance them

**4. Principle of Two Weaknesses**
- One weakness can be defended
- Create a second weakness on the other side
- Stretch opponent's defense to breaking point

**5. Don't Blunder!**
- Accuracy matters most at the end
- Check for stalemate tricks
- Watch for cheapos and back rank issues

**Karpov's advice**: "In the endgame, don't try to win - try to not lose. The win will come by itself."`,
          highlights: [
            { square: 'g1', color: 'blue' },
            { square: 'e4', color: 'green' },
            { square: 'd6', color: 'red' },
          ],
          arrows: [
            { from: 'g1', to: 'f2', color: 'blue' },
            { from: 'f2', to: 'e3', color: 'blue' },
          ],
        },
        {
          id: 'transition-puzzle',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 10',
          title: 'Choose the Right Transition',
          explanation: `The position is roughly equal, but White can try to steer toward a favorable endgame structure.

Find the move that **creates the most favorable transition**!`,
          correctMoves: ['cxd5', 'exd5'],
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
            { from: 'e4', to: 'd5', color: 'blue' },
          ],
          successMessage: 'Good choice! cxd5 followed by exd5 creates an isolated queen pawn for Black if they recapture with e6. exd5 Nxd5 Nxd5 exd5 creates an IQP structure that White can target in an endgame.',
          failureMessage: 'Look at the pawn tension in the center. How can White create a favorable structure for the endgame?',
        },
      ],
    },
  ],
};
