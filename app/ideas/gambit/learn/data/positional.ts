import { Course } from './types';

export const positionalCourse: Course = {
  id: 'positional',
  title: 'Positional Play',
  description: 'Learn to evaluate and improve your position',
  icon: '♟',
  color: '#8b5cf6',
  lessons: [
    {
      id: 'pawn-structure',
      title: 'Pawn Structure Basics',
      description: 'Understanding pawn formations and their implications',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      tags: ['pawns', 'structure', 'planning'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Pawn Structure Fundamentals',
          explanation: `Pawn structure is often called the **"skeleton"** or **"soul"** of a chess position. Philidor's famous declaration "Pawns are the soul of chess" (1749) established pawn structure as the foundation of positional play, and Steinitz later built his entire positional theory around pawn formations. This wisdom remains central to modern chess understanding.

Unlike every other piece, **pawns cannot move backward**. This fundamental limitation means every pawn move permanently and irreversibly changes the nature of the position. Move a pawn forward, and you can never take it back. This is why strong players think carefully before advancing pawns.

**Key pawn formations to recognize:**

- **Pawn chains**: Pawns protecting each other diagonally (like d4-e5 or e6-d5). The base of the chain is its weakest point.
- **Isolated pawns**: No friendly pawns on adjacent files. Can be weak targets but provide open lines.
- **Doubled pawns**: Two pawns on the same file. Usually weak but sometimes compensated by open lines.
- **Passed pawns**: No enemy pawns can block or capture it. Extremely dangerous in endgames.
- **Backward pawns**: Cannot be protected by other pawns and cannot safely advance.

Understanding these structures helps you form long-term plans and predict which pieces will be strong or weak in the resulting position.`,
          highlights: [
            { square: 'd2', color: 'blue' },
            { square: 'e2', color: 'blue' },
            { square: 'c2', color: 'blue' },
          ],
        },
        {
          id: 'isolated-pawn',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 9',
          title: 'The Isolated Queen Pawn (IQP)',
          explanation: `The **Isolated Queen Pawn (IQP)** is one of the most important structures to understand. Here White's d4 pawn has no friendly pawns on the c or e files—it's "isolated" from its comrades.

**Why the IQP can be weak:**
- It cannot be defended by other pawns, only by pieces
- The square directly in front (d5) becomes an excellent outpost for enemy pieces
- In endgames, it can become a fatal target

**Why the IQP can be strong:**
- It controls key central squares (c5 and e5)
- The c and e files are half-open for rooks
- Pieces enjoy active play and attacking chances
- The position is dynamic with good attacking potential

**Practical guidance:** The IQP player should seek piece activity and attacks before the position simplifies. The opponent should seek exchanges to expose the pawn's weakness in an endgame. Blockade the square in front of the pawn with a knight!`,
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'd5', color: 'red' },
            { square: 'c5', color: 'blue' },
            { square: 'e5', color: 'blue' },
          ],
          arrows: [
            { from: 'd4', to: 'd5', color: 'red' },
          ],
        },
        {
          id: 'doubled-pawns',
          type: 'explanation',
          fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3PP3/2PB4/PP3PPP/RNBQK2R w KQkq - 0 6',
          title: 'Doubled Pawns',
          explanation: `**Doubled pawns** occur when two pawns end up on the same file, typically after a piece capture (like Bxc3 bxc3). They're often considered a structural weakness, but the truth is more nuanced.

**When doubled pawns are truly weak:**
- They cannot defend each other
- They create holes on adjacent squares
- They're slow and immobile
- In endgames, they often lose to healthy pawn majorities

**When doubled pawns are acceptable or even good:**
- They open files for your rooks (especially useful in attacks)
- They may control important central squares
- The capture may give you the bishop pair
- They can support piece activity and attacks

**Famous example:** In the Nimzo-Indian Defense (1.d4 Nf6 2.c4 e6 3.Nc3 Bb4), Black deliberately gives White doubled c-pawns with ...Bxc3+ in exchange for the bishop pair and targeting the weak pawns. This imbalance creates rich strategic battles.

**Key principle:** Evaluate doubled pawns based on what you gained in return, not just the pawn structure itself.`,
          highlights: [
            { square: 'c3', color: 'yellow' },
            { square: 'd4', color: 'blue' },
          ],
        },
        {
          id: 'pawn-chain',
          type: 'explanation',
          fen: 'r1bqkb1r/pp1n1ppp/4pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 1 6',
          title: 'The Pawn Chain',
          explanation: `A **pawn chain** is a diagonal line of pawns protecting each other, like soldiers standing shoulder to shoulder. The classical example appears in the French Defense where White plays e5, creating the chain d4-e5.

**Anatomy of a pawn chain:**
- The **base** is the pawn furthest back (here d4)
- The **head** is the most advanced pawn (here e5)
- The base is the chain's **weakest point**

**Strategic principles for playing against chains:**

1. **Attack the base, not the head!** Nimzowitsch's crucial insight: attacking the head (like ...f6) only helps White. Instead, ...c5 attacking the base is correct.

2. **Undermine, don't assault:** Patient pressure on the base (with ...Qb6, ...Nc6-a5, etc.) is stronger than violent attacks.

3. **The chain defender should:** Protect the base, advance the chain when possible, and use the space advantage to attack on the flank where the head points.

In this French Defense structure, Black should play ...c5 immediately or soon, while White should launch a kingside attack with f4-f5 supported by the e5 pawn.`,
          arrows: [
            { from: 'd4', to: 'e5', color: 'green' },
            { from: 'c5', to: 'd4', color: 'red' },
          ],
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'e5', color: 'green' },
          ],
        },
        {
          id: 'passed-pawn',
          type: 'explanation',
          fen: '8/5pk1/6p1/3P4/8/6K1/8/8 w - - 0 1',
          title: 'The Passed Pawn',
          explanation: `A **passed pawn** is a pawn that has no enemy pawns in front of it or on adjacent files that could capture it. It has a clear path to promotion!

**Why passed pawns are so powerful:**

1. **They must be stopped by pieces:** Since no enemy pawn can block them, valuable pieces must be tied down to stop their advance.

2. **They grow stronger as they advance:** A passed pawn on the 6th rank is terrifying; on the 7th, often decisive.

3. **They distract the opponent:** Even if the pawn doesn't promote, defending against it costs the opponent coordination and activity.

**Nimzowitsch's famous rule:** "Passed pawns must be pushed!" But with nuance—first, secure the pawn's advance with piece support.

**The "outside passed pawn"** is especially deadly: a passed pawn far from the main action forces the enemy king to chase it, allowing your king to invade elsewhere.

In this endgame, the d5 pawn will likely decide the game. White's plan: push d6, then d7. Black's king must race to stop it, but often cannot catch it while also defending Black's pawns.`,
          highlights: [
            { square: 'd5', color: 'green' },
          ],
          arrows: [
            { from: 'd5', to: 'd8', color: 'green' },
          ],
        },
        {
          id: 'create-passed',
          type: 'interactive',
          fen: '8/5pk1/4p1p1/2p1P3/3P4/6K1/8/8 w - - 0 1',
          title: 'Create a Passed Pawn',
          explanation: `White has a pawn breakthrough available. The pawns are locked, but a clever sacrifice can create a devastating passed pawn!

**Think about this:** When pawns are interlocked like this, a sacrifice can sometimes break through. What happens if d5 advances? Consider the variations carefully.`,
          correctMoves: ['d5'],
          successMessage: `**Brilliant!** d5! is the breakthrough. After exd5, e6! creates a passed pawn that queens. If Black doesn't capture (like ...Kf6), then dxe6 and the e-pawn marches. This pawn breakthrough pattern is vital to know!`,
          failureMessage: 'Look for a pawn sacrifice that breaks through. What happens if you push d5?',
          arrows: [
            { from: 'd4', to: 'd5', color: 'green' },
            { from: 'e5', to: 'e6', color: 'blue' },
          ],
        },
        {
          id: 'backward-pawn',
          type: 'explanation',
          fen: 'r1bq1rk1/pp3ppp/2p1pn2/3p4/3P4/2PBP3/PP3PPP/R1BQ1RK1 b - - 0 10',
          title: 'The Backward Pawn',
          explanation: `A **backward pawn** is one that cannot be defended by other pawns and cannot safely advance because an enemy pawn controls its advance square.

**In this position, Black's e6 pawn is backward:**
- The d5 pawn has advanced past it
- No pawn can defend it (f7 is too far)
- It cannot advance to e5 (controlled by White's d4 pawn)
- It sits on a half-open file, inviting attack

**How to exploit backward pawns:**

1. **Attack with pieces:** Put a rook on the file (Re1) and queen behind it (Qe2)
2. **Blockade the advance square:** Control e5 with pieces so the pawn can never advance
3. **Be patient:** The backward pawn isn't going anywhere—you can build up slowly

**How to play with backward pawns:**
- Keep pieces active to compensate
- Look for tactical breaks (...e5 sacrifice sometimes works)
- Exchange pieces to relieve pressure

Backward pawns are long-term weaknesses that strong players exploit with patient maneuvering.`,
          highlights: [
            { square: 'e6', color: 'red' },
            { square: 'e5', color: 'yellow' },
          ],
          arrows: [
            { from: 'e1', to: 'e6', color: 'blue' },
          ],
        },
        {
          id: 'practice-structure',
          type: 'puzzle',
          fen: 'r1bq1rk1/pp3ppp/2n1p3/2ppP3/3P4/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 9',
          title: 'Find the Correct Pawn Break',
          explanation: `Black needs to challenge White's pawn chain. What's the correct pawn break? Remember: attack the base, not the head!`,
          correctMoves: ['c4'],
          successMessage: `**Excellent!** ...c4! undermines the d4 pawn (the base of the chain). This is much better than ...f6 which attacks the head. The pawn on c4 cramps White and Black will follow up with ...b5-b4, attacking the c3 knight and increasing pressure on d4.`,
          failureMessage: 'Remember Nimzowitsch\'s advice: attack the base of the pawn chain, not the head. What\'s the base pawn?',
          arrows: [
            { from: 'c5', to: 'c4', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'outposts',
      title: 'Outposts',
      description: 'Using squares that cannot be attacked by enemy pawns',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['outposts', 'knights', 'squares'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N2N2/PPQBPPPP/R3KB1R w KQ - 4 8',
          title: 'What is an Outpost?',
          explanation: `An **outpost** is one of the most important strategic concepts in chess. The concept of an "outpost" (Vorposten in German) was coined by Aron Nimzowitsch in "My System" (1925), where he defined it as a square in the opponent's territory that cannot be attacked by enemy pawns. It's a square that:

1. **Cannot be attacked by enemy pawns** - This is the crucial requirement
2. **Can be occupied by your piece** - Usually a knight, sometimes a bishop or rook
3. **Ideally is protected by your own pawn** - Making your piece very secure

**Why outposts are so valuable:**

Pieces on outposts are **difficult or impossible to dislodge**. Since pawns can't attack the square, the opponent must use valuable pieces to challenge your outpost piece—and those pieces could be doing something better.

**Best outpost locations:**
- Central squares (d5, e5, d4, e4) are most powerful
- Squares on the 5th rank for White, 4th rank for Black
- Squares that penetrate into enemy territory

**Knights especially love outposts** because:
- They don't need open lines (unlike bishops and rooks)
- They can jump over pieces to reach the outpost
- A knight on a strong outpost often equals or outperforms a rook

The great Aron Nimzowitsch said: "The knight is the ideal piece for occupying an outpost."`,
          highlights: [
            { square: 'd5', color: 'blue' },
            { square: 'e5', color: 'blue' },
          ],
        },
        {
          id: 'knight-outpost',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/4pn2/2pnN3/3P4/2N5/PPQ1PPPP/R1B1KB1R w KQ - 0 9',
          title: 'The Ideal Knight Outpost',
          explanation: `This position demonstrates the **perfect knight outpost**. White's knight on e5 is magnificently placed:

**Why this knight is so powerful:**

1. **Cannot be attacked by pawns:** Black's f-pawn is blocked by the e6 pawn, so ...f6 is impossible. The d and b pawns can't reach e5 either.

2. **Protected by its own pawn:** The d4 pawn supports the knight, making it completely secure.

3. **Controls critical squares:** From e5, the knight attacks f7 (near the king), d7, c6, and d3.

4. **Radiates influence:** The knight dominates the center and projects power into Black's position.

**The knight vs. bad bishop:** Notice Black's bishop on e7 is passive and blocked by its own pawns. The e5 knight is worth significantly more than this "bad" bishop.

**Strategic impact:** This knight forces Black to constantly worry about Nxf7 tactics, Nd7 disruptions, or Nc6 attacks. Even if the knight never moves, its presence warps Black's entire position.

A knight like this is often worth nearly as much as a rook!`,
          highlights: [
            { square: 'e5', color: 'green' },
          ],
          arrows: [
            { from: 'e5', to: 'f7', color: 'red' },
            { from: 'e5', to: 'd7', color: 'blue' },
            { from: 'e5', to: 'c6', color: 'blue' },
          ],
        },
        {
          id: 'find-outpost',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp1bppp/2n1pn2/3p4/3P1B2/2N1PN2/PPP2PPP/R2QKB1R w KQ - 2 7',
          title: 'Find the Outpost',
          explanation: `White's position is solid but passive. One of White's knights can occupy a powerful central outpost where it cannot be challenged by Black's pawns.

Which knight should go where?`,
          correctMoves: ['Ne5'],
          highlights: [
            { square: 'e5', color: 'yellow' },
          ],
          successMessage: `**Excellent!** Ne5 is a powerful outpost. Black cannot play ...f6 without seriously weakening the kingside. The knight on e5 controls d7, f7, c6, and dominates the position!`,
          failureMessage: 'Look for a central square that Black\'s pawns can never attack. Which square on the 5th rank is permanently safe?',
          arrows: [
            { from: 'f3', to: 'e5', color: 'green' },
          ],
        },
        {
          id: 'create-outpost',
          type: 'explanation',
          fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
          title: 'Creating Outposts',
          explanation: `Outposts don't just appear—often you must **create them** by manipulating the pawn structure. The enemy must be induced to advance or exchange pawns, leaving squares permanently weak.

**Methods to create outposts:**

1. **Exchange pawns strategically:** Here, after exd5 Nxd5 (or cxd5), White can later play c4. If Black recaptures with ...dxc4, the d5 square becomes a permanent outpost.

2. **Provoke pawn advances:** Attacking pawns or threatening something often forces the opponent to advance pawns, leaving holes behind.

3. **Sacrifice pawns for squares:** Sometimes giving up a pawn is worth it to secure an eternal outpost for a knight.

**The classic plan here:**
- Play exd5, then c4
- Force Black to commit their central pawns
- The d5 square (or d4 for Black) becomes weak
- Install a knight on the outpost

**Remember:** Creating an outpost is a long-term investment. You're trading immediate pawn structure for permanent piece placement advantages.`,
          arrows: [
            { from: 'e4', to: 'd5', color: 'green' },
            { from: 'c2', to: 'c4', color: 'blue' },
          ],
          highlights: [
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'outpost-blockade',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3pN3/3P4/2N5/PPQ1PPPP/R1B1KB1R b KQ - 1 8',
          title: 'Outpost as Blockader',
          explanation: `One of the most important uses of an outpost is to **blockade an enemy pawn**. A piece planted in front of a passed pawn or isolated pawn stops its advance and creates a permanent weakness.

**Nimzowitsch's blockade theory:**
- First restrain the pawn (prevent its advance)
- Then blockade it with a piece
- Finally attack and win it

**In this position:**
The knight on e5 serves multiple roles:
1. It blockades any ...e5 push by Black
2. It attacks Black's position from a dominant square
3. It cannot be challenged by pawns

**Knight as ideal blockader:**
- Knights don't need open lines, so sitting on a square doesn't diminish their power
- They attack while blocking
- They're hard to exchange off

**The paradox of blockade:** The pawn becomes weaker precisely because it cannot move. A mobile pawn is dangerous; a blockaded one is just a target.

This strategic concept of blockade → attack is fundamental to positional chess.`,
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'd5', color: 'yellow' },
          ],
          arrows: [
            { from: 'e5', to: 'd5', color: 'red' },
          ],
        },
        {
          id: 'outpost-practice',
          type: 'puzzle',
          fen: 'r1bq1rk1/pp3ppp/2n1pn2/2bp4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 10',
          title: 'Establish the Outpost',
          explanation: `White has a potential outpost on e5 but currently Black controls it with the d5 bishop and f6 knight. Find the move that prepares to establish a knight on e5!`,
          correctMoves: ['Bb5'],
          successMessage: `**Correct!** Bb5 attacks the c6 knight, which helps defend e5. After the exchanges or knight retreats, White can establish Ne5 with a dominant position. The pin also creates tactical threats.`,
          failureMessage: 'Before occupying an outpost, sometimes you must remove the defenders. Which Black piece guards e5?',
          arrows: [
            { from: 'd3', to: 'b5', color: 'green' },
            { from: 'b5', to: 'c6', color: 'red' },
          ],
        },
        {
          id: 'knight-outpost-practice',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2ppbp/2np2p1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R w KQ - 0 10',
          title: 'Occupy the Outpost',
          explanation: `White has a powerful outpost available on d5. Black's pawns on e7 and c6 cannot control d5. Place your knight on this dominant square!`,
          correctMoves: ['Nd5'],
          successMessage: `**Brilliant!** Nd5 is a monster knight. It cannot be driven away by pawns (e6 would leave f-pawns weak, and c6 is already occupied). From d5, the knight attacks e7, c7, f6, and b6. This is a textbook outpost occupation.`,
          failureMessage: 'Look for the square that Black\'s pawns cannot attack. Which central square on the 5th rank is permanently weak?',
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'create-outpost-practice',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/3PP3/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
          title: 'Create an Outpost with a Pawn Exchange',
          explanation: `White wants to create an outpost on d5 for a knight. The current pawn structure doesn't yet provide one. Find the pawn exchange that opens up d5 as a permanent outpost!`,
          correctMoves: ['exd5'],
          successMessage: `**Correct!** exd5 opens the position. After ...exd5 (or ...cxd5), the d5 square becomes a permanent outpost because Black's c and e pawns can no longer guard it. White will follow with Nf3-e5 or Nc3-e2-f4-d5 to install a knight there.`,
          failureMessage: 'Think about which pawn exchange would leave d5 permanently unguarded by Black\'s pawns.',
          arrows: [
            { from: 'e4', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'weak-squares',
      title: 'Weak Squares',
      description: 'Identifying and exploiting weaknesses in the pawn structure',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['weaknesses', 'holes', 'squares'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3PP3/2PB1N2/PP3PPP/RNBQK2R b KQkq - 0 5',
          title: 'What Makes a Square Weak?',
          explanation: `A **weak square** (also called a "hole") is a square that cannot be defended by pawns. Nimzowitsch introduced the concept of "weak squares" as permanent deficiencies in a position, emphasizing that a weak square is only truly weak if it can be occupied. Once pawns advance past a square, they can never return to defend it—this is the fundamental source of weakness.

**Characteristics of weak squares:**

1. **Cannot be defended by pawns** - Enemy pieces can occupy them safely
2. **Located in a critical area** - Near the king, in the center, or on key diagonals
3. **Permanent** - Unlike piece weaknesses, pawn weaknesses don't heal

**Why weak squares matter:**

- They become outposts for enemy pieces
- Pieces can anchor on them and dominate
- Attacks can be launched from these squares
- They indicate long-term structural problems

**The critical rule:** Every pawn move weakens some squares while strengthening others. Before pushing a pawn, ask yourself: "What squares am I leaving behind?"

**Example:** If Black plays ...g6, the squares f6 and h6 become forever weak. If Black later castles kingside, these holes near the king can be fatal.

Strong players spend years learning to spot these weaknesses and exploit them with patient maneuvering.`,
          highlights: [
            { square: 'd5', color: 'yellow' },
            { square: 'c5', color: 'yellow' },
          ],
        },
        {
          id: 'dark-square-weakness',
          type: 'explanation',
          fen: 'r1bqk2r/pp2bppp/2n1pn2/2pp4/4P3/1PN2N2/PBPP1PPP/R2QKB1R w KQkq - 2 7',
          title: 'The Dark Square Complex',
          explanation: `When multiple squares of the same color become weak, we call it a **color complex weakness**. This is one of the most important strategic concepts to understand.

**In this position, Black's dark squares are chronically weak:**

Look at Black's pawn structure: pawns on d5, e6, c5—all on **light squares**! This means:

- **d6, e5, f6** are permanent holes
- Black's dark-squared bishop on e7 is blocked by its own pawns
- White can infiltrate on the dark squares

**The strategic plan for White:**

1. Exchange Black's dark-squared bishop (removing the defender)
2. Install pieces on d6, e5, or f6
3. Attack along the dark-square diagonal (a1-h8 or a3-f8)
4. The weakness is permanent—no rush

**For Black:**
- Guard the dark squares with pieces
- Try to exchange White's dark-squared bishop
- Don't create more dark-square weaknesses

**Historical note:** This is why the French Defense (with ...e6 and ...d5) requires Black to solve the "bad bishop" problem—the light-squared bishop is blocked, but more importantly, the dark squares become weak.`,
          highlights: [
            { square: 'd6', color: 'red' },
            { square: 'e5', color: 'red' },
            { square: 'f6', color: 'red' },
          ],
          arrows: [
            { from: 'b2', to: 'g7', color: 'blue' },
          ],
        },
        {
          id: 'kingside-holes',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b - - 5 7',
          title: 'Kingside Weaknesses',
          explanation: `Weak squares near the king are especially dangerous. The pawns protecting the castled king (f7, g7, h7 for Black; f2, g2, h2 for White) should be moved with extreme caution.

**Dangerous pawn moves near the king:**

- **...g6** weakens f6 and h6 permanently. Bishops and knights love to land there.
- **...h6** weakens g6 and creates a hook for h4-h5 attacks
- **...f6** weakens the entire diagonal (a2-g8) and e6, g6
- **...f5** is especially committal—weakens e6 and g6 forever

**The f7/f2 squares:**
These are the weakest squares at the start (defended only by the king). After castling, f7 remains a target for Bc4 + Ng5 combinations or queen invasions.

**Principle:** Don't move kingside pawns without a concrete reason. "Luft" (escape square for the king) is often necessary, but choose carefully—usually h6 or h3 is safest.

**Attack strategy:** When opponent weakens kingside squares, target them! Place pieces on the weak squares and launch an attack. The weakness doesn't go away.`,
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'g7', color: 'yellow' },
            { square: 'h7', color: 'yellow' },
          ],
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
          ],
        },
        {
          id: 'exploit-weakness',
          type: 'interactive',
          fen: 'r2qr1k1/1b2bppp/p1n1pn2/1p6/3NP3/1BN1BP2/PPPQ2PP/R4RK1 w - - 0 14',
          title: 'Exploit the Weakness',
          explanation: `Black's position has a clear weakness: the d5 square. Black's pawns on e6 and b5 mean no pawn can ever defend d5 again.

How should White exploit this permanent hole? Which piece should occupy the outpost?`,
          correctMoves: ['Nd5'],
          arrows: [
            { from: 'c3', to: 'd5', color: 'blue' },
          ],
          successMessage: `**Perfect!** Nd5 occupies the magnificent outpost. The knight dominates the board from d5—it attacks e7, c7, f6, and b6. If Black exchanges with ...Nxd5, White recaptures with either the e-pawn or the d4-knight, maintaining the strong setup.`,
          failureMessage: 'Look for the weak square that Black\'s pawns cannot defend. Place your knight on the outpost!',
        },
        {
          id: 'creating-weaknesses',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/3PP3/2N1BN2/PPP2PPP/R2QKB1R w KQ - 0 7',
          title: 'Creating Weaknesses',
          explanation: `Strong players don't just exploit existing weaknesses—they **create** them through clever pawn moves and piece play.

**Methods to create weaknesses:**

1. **Pawn advances that force pawn moves:**
   - h4-h5 often forces ...g6, creating holes on f6 and h6
   - e5 in French structures forces piece gymnastics
   - Pushing pawns where you're stronger

2. **Piece attacks that force pawn moves:**
   - Ng5 often provokes ...h6, weakening the kingside
   - Bishops eyeing weak squares force defensive pawn moves

3. **Prophylaxis that induces errors:**
   - Preventing opponent's ideal moves forces awkward pawn structures

**In this position:**
White can play e5!, forcing Black's knight away. Then the d5 square becomes weak (Black can't play ...d5 anymore), and squares like d6 and f6 become targets.

**The key insight:** Once you identify a potential weakness, figure out how to make your opponent create it. Patient pressure often forces the opponent to weaken themselves.`,
          arrows: [
            { from: 'e4', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'yellow' },
            { square: 'd6', color: 'blue' },
          ],
        },
        {
          id: 'weakness-practice',
          type: 'puzzle',
          fen: 'r1bq1rk1/pppn1ppp/4pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 2 7',
          title: 'Create a Weakness',
          explanation: `White can create a permanent weakness in Black's camp with the right pawn move. What advance forces Black to create a hole in their position?`,
          correctMoves: ['c5'],
          successMessage: `**Excellent!** c5! is a powerful space-gaining move that creates a permanent weakness on d6. Black can never play ...c6 now, and the d6 square will forever be a hole. White will later maneuver a knight to d6 via e4 or a4.`,
          failureMessage: 'Think about creating a permanent hole. What pawn advance prevents Black from ever playing ...c6?',
          arrows: [
            { from: 'c4', to: 'c5', color: 'green' },
          ],
          highlights: [
            { square: 'd6', color: 'red' },
          ],
        },
        {
          id: 'dark-square-practice',
          type: 'puzzle',
          fen: 'r2q1rk1/pb2bpp1/1pn1p2p/2p5/2P1P3/1PN2N2/PB2BPPP/R2Q1RK1 w - - 0 12',
          title: 'Exploit Dark-Square Weakness',
          explanation: `Black's pawns are mostly on light squares (b6, c5, e6, h6) and the dark-squared bishop has been exchanged. White's bishop on b2 eyes the dark squares. Find the move that exploits Black's dark-square weakness!`,
          correctMoves: ['Nd5'],
          successMessage: `**Excellent!** Nd5 plants the knight on a dominant dark square that Black cannot challenge with pawns. The knight attacks e7 and c7, and the b2 bishop rakes the long diagonal. Black's dark squares are collapsing. This is a textbook exploitation of a color complex weakness.`,
          failureMessage: 'Black\'s dark squares are weak. Which central dark square can your knight occupy permanently?',
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
            { from: 'b2', to: 'g7', color: 'blue' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'f6', color: 'red' },
          ],
        },
        {
          id: 'weakness-puzzle-2',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2ppbp/2n3p1/2p5/4P3/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 8',
          title: 'Identify and Target the Weakness',
          explanation: `Black has played ...g6, creating permanent holes on f6 and h6. The dark-squared bishop on g7 is the only defender of these squares. White should prepare to exploit these weaknesses. What is the best move?`,
          correctMoves: ['Nd5', 'Bg5'],
          successMessage: `**Well done!** Preparing to develop pieces toward the weakened dark squares is correct. White's plan involves Bg5 (targeting the f6 and h6 holes), and potentially manoeuvring a knight to f5 or h5 via d5. Once the dark squares are infiltrated, Black's kingside becomes very vulnerable.`,
          failureMessage: 'Black has weakened the dark squares around the king with ...g6. How can White prepare to target f6 and h6?',
          arrows: [
            { from: 'c1', to: 'g5', color: 'blue' },
          ],
          highlights: [
            { square: 'f6', color: 'red' },
            { square: 'h6', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'good-bad-bishops',
      title: 'Good and Bad Bishops',
      description: 'Understanding when bishops are strong or weak',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['bishops', 'pawns', 'evaluation'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3PP3/2PB1N2/PP3PPP/RNBQK2R b KQkq - 0 5',
          title: 'Good vs Bad Bishops',
          explanation: `The quality of a bishop depends almost entirely on **pawn structure**. The "good bishop/bad bishop" terminology was popularized by Siegbert Tarrasch in the early 1900s, and the concept was further developed by Wilhelm Steinitz and refined by later positional masters. It is central to strategic chess.

**The Good Bishop:**
- Pawns are on **opposite colored** squares from the bishop
- The bishop is **active and unobstructed**
- Has targets to attack or important diagonals to control
- Can influence the game significantly

**The Bad Bishop:**
- Pawns are on the **same colored** squares as the bishop
- The bishop is **blocked by its own pawns**
- Restricted mobility and limited scope
- Often better traded for a knight

**Why this matters so much:**

Bishops need open diagonals. When your own pawns block those diagonals, the bishop becomes a "tall pawn"—present but useless. Meanwhile, the opponent's pieces have free reign.

**The critical insight:** It's not just about whether the bishop is on light or dark squares, but whether your pawns obstruct its natural diagonals.

In the diagram, Black's light-squared bishop will be "bad" if it stays on c8 behind the e6 pawn. This is the famous "French Defense bishop problem."`,
          highlights: [
            { square: 'c8', color: 'red' },
            { square: 'e6', color: 'yellow' },
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'bad-bishop-example',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 b - - 2 9',
          title: 'The Bad French Bishop',
          explanation: `This position shows the classic **"bad French bishop"**—one of the most instructive examples in all of chess.

**Why Black's c8 bishop is terrible:**

1. **Blocked by its own pawns:** The pawns on d5, e6, and potentially b7/c6 are all on light squares, exactly where the bishop wants to go.

2. **No good squares:** The bishop cannot reach b7 (c6 is needed for defense), cannot go to a6 (no targets), and e6 blocks the diagonal to f5/g4.

3. **Passive and useless:** While White's pieces are active, this bishop contributes nothing.

**Solutions for Black:**

1. **Exchange it:** ...Ba6 trading for White's good bishop
2. **Activate it:** ...b6 followed by ...Ba6 or ...Bb7
3. **Free it:** ...e5 break (though this changes the pawn structure dramatically)

**Historical note:** This bishop problem is why the French Defense requires very precise play from Black. Masters like Viktor Korchnoi spent decades refining systems to activate this bishop.

Never let your bishops become prisoners of your own pawns!`,
          highlights: [
            { square: 'c8', color: 'red' },
            { square: 'd5', color: 'yellow' },
            { square: 'e6', color: 'yellow' },
            { square: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'good-bishop-example',
          type: 'explanation',
          fen: 'r2q1rk1/pp2bppp/2n1pn2/3p4/3P1B2/2NBPN2/PP3PPP/R2Q1RK1 w - - 4 10',
          title: 'The Good Bishop',
          explanation: `In contrast, White's bishop on f4 is a **model "good bishop"**:

**Why this bishop is excellent:**

1. **Pawns are on opposite color:** White's central pawns (d4, e3) are on light squares. The dark-squared bishop is completely free.

2. **Active placement:** From f4, the bishop controls the a7-g1 diagonal and can swing to g5 or h6 if needed.

3. **Outside the pawn chain:** The bishop sits *in front* of the pawns, not blocked behind them.

4. **Multiple options:** It can attack on c7, support an e4-e5 push, or redeploy to g3 or h2.

**The contrast is striking:**
- White's dark-squared bishop: Free, active, influential
- Black's light-squared bishop: Imprisoned, passive, nearly useless

**Practical tip:** When playing with a good bishop, keep it active and don't block it with your own pawns. When facing a good bishop, try to exchange it or block its diagonals.`,
          highlights: [
            { square: 'f4', color: 'green' },
            { square: 'd4', color: 'blue' },
            { square: 'e3', color: 'blue' },
          ],
          arrows: [
            { from: 'f4', to: 'c7', color: 'blue' },
            { from: 'f4', to: 'h6', color: 'blue' },
          ],
        },
        {
          id: 'activate-bishop',
          type: 'interactive',
          fen: 'r4rk1/pp2bppp/2n1pn2/q2p4/3P4/P1NBPN2/1P3PPP/R1BQ1RK1 b - - 0 12',
          title: 'Activate the Bad Bishop',
          explanation: `Black's light-squared bishop is stuck on c8, blocked by the e6 and d5 pawns. Find the pawn move that liberates this bishop and gives it a future!`,
          correctMoves: ['b6'],
          arrows: [
            { from: 'b7', to: 'b6', color: 'blue' },
            { from: 'c8', to: 'a6', color: 'green' },
          ],
          successMessage: `**Correct!** ...b6 prepares ...Ba6, where the bishop escapes from behind the pawn chain and eyes the a6-f1 diagonal. It might also exchange for White's good d3 bishop, improving Black's position. Freeing bad bishops is a key skill!`,
          failureMessage: 'The bishop needs to escape from behind its pawns. What pawn move prepares ...Ba6 or ...Bb7?',
        },
        {
          id: 'exchange-bad',
          type: 'explanation',
          fen: 'r1bq1rk1/pp3ppp/2nbpn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 10',
          title: 'Exchange the Bad Bishop',
          explanation: `Sometimes the best solution for a bad bishop is simply to **exchange it**.

**In this position, Black could play ...Ba3:**

This trades the "bad" light-squared bishop (stuck behind e6-d5) for White's "good" dark-squared bishop on c1. The result:

1. Black eliminates a weakness (the bad bishop)
2. White loses an active piece
3. The position becomes easier for Black to defend

**When to exchange your bad bishop:**

- When you can trade it for an active enemy piece
- When the trade doesn't create other weaknesses
- When the resulting position is simpler and easier to hold

**When to keep your bad bishop:**

- When it defends crucial squares
- When trading it opens lines for enemy attack
- When the bishop might become good later (after pawn exchanges)

**The Principle:** Don't stubbornly keep a bad bishop hoping it will improve. Active piece play or strategic exchanges often solve the problem better than passive defense.`,
          arrows: [
            { from: 'd6', to: 'a3', color: 'blue' },
            { from: 'a3', to: 'c1', color: 'green' },
          ],
        },
        {
          id: 'bishop-practice',
          type: 'puzzle',
          fen: 'r1bq1rk1/1p2bppp/p1n1pn2/2pp4/3PP3/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
          title: 'Improve Your Bishop',
          explanation: `White's light-squared bishop on d3 is currently blocked by the e4 pawn. White should reposition it to a more active diagonal. Find the best retreat square!`,
          correctMoves: ['Be2'],
          successMessage: `**Excellent!** Be2! repositions the bishop to a flexible square where it's no longer blocked by the e4 pawn. From e2, it can later go to g4 or f3 to become truly active. Compare this to staying on d3 where it's blocked by e4!`,
          failureMessage: 'The bishop on d3 is blocked by your own e4 pawn. Where can it go to be truly active?',
          arrows: [
            { from: 'd3', to: 'e2', color: 'green' },
          ],
          highlights: [
            { square: 'e2', color: 'green' },
          ],
        },
        {
          id: 'bishop-pair-practice',
          type: 'interactive',
          fen: 'r2q1rk1/ppp1bppp/2n1pn2/3p4/3P1B2/2NBPN2/PPP2PPP/R2Q1RK1 w - - 0 9',
          title: 'Activate the Bishop Pair',
          explanation: `White has both bishops while Black has a bishop and knight. The bishop pair thrives in open positions. Find the move that opens the position to maximize the bishops' power!`,
          correctMoves: ['e4'],
          successMessage: `**Excellent!** e4! opens the center, which is exactly what the bishop pair wants. After ...dxe4 Nxe4, the bishops on d3 and f4 will dominate open diagonals. The bishop pair's power increases dramatically in open positions. Always open the position when you have two bishops!`,
          failureMessage: 'The bishop pair needs open diagonals to shine. Which central pawn advance opens the position?',
          arrows: [
            { from: 'e3', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'd3', color: 'green' },
            { square: 'f4', color: 'green' },
          ],
        },
        {
          id: 'opposite-color-bishops',
          type: 'explanation',
          fen: 'r2q1rk1/pp3ppp/4p3/3pP3/1b1P4/4BN2/PP3PPP/R2Q1RK1 w - - 0 14',
          title: 'Opposite-Color Bishops',
          explanation: `When each side has one bishop and they travel on **different colored squares**, the position has unique characteristics.

**In this position:**
White has a dark-squared bishop (e3) and Black has a dark-squared bishop (b4). Wait—actually both are on dark squares, so this is a same-color bishop position. Let's consider what happens with opposite colors instead.

**Opposite-color bishop characteristics:**

1. **Attacking advantage:** The attacker's bishop controls squares the defender's bishop cannot reach. This makes attacks very dangerous.

2. **Drawing tendency in endgames:** With few pawns, the defender can blockade on the color their bishop controls. The attacker's bishop cannot break through.

3. **"Two different games":** Each bishop operates on its own color, creating positions where one side attacks on one color while the other defends on the opposite color.

**Practical rules:**
- In the **middlegame** with queens: Opposite-color bishops FAVOR the attacker (extra "color" advantage)
- In **pure endgames**: Opposite-color bishops strongly tend toward draws, even with 1-2 extra pawns
- **Key strategy:** Place your pawns on the opposite color of your bishop and the same color as your opponent's bishop, blocking their bishop while freeing yours.

Understanding this duality is essential for evaluating positions correctly.`,
          highlights: [
            { square: 'e3', color: 'green' },
            { square: 'b4', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'piece-activity',
      title: 'Piece Activity',
      description: 'Getting your pieces to optimal squares',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['activity', 'coordination', 'development'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w - - 6 5',
          title: 'What is Piece Activity?',
          explanation: `**Piece activity** is one of the most fundamental concepts in chess. Piece activity as a primary evaluation criterion was championed by Mikhail Botvinnik and the Soviet chess school, who emphasized that "a bad plan is better than no plan" because keeping pieces active and coordinated is paramount. Simply put: **Active pieces are worth more than passive ones.**

**What makes a piece "active"?**

1. **Controls important squares** - Central squares, key diagonals, open files
2. **Has mobility** - Many possible moves, not trapped or blocked
3. **Coordinates with other pieces** - Working together for attack or defense
4. **Exerts pressure** - Attacking something or restricting the opponent

**The core principle:**

A rook buried in a corner is hardly better than a pawn. A knight on the rim is worth half its value. But a rook on the 7th rank or a knight on a central outpost can dominate the game.

**Steinitz's famous teaching:** The player with more active pieces has a lasting advantage, even if material is equal.

**The Russian Chess School** emphasized this constantly: before calculating tactics, ask "which side has better piece activity?" This often predicts who will win.

Activity is so important that sacrificing material for activity is often correct—this is the foundation of most attacking chess!`,
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'd5', color: 'yellow' },
            { square: 'e4', color: 'yellow' },
            { square: 'e5', color: 'yellow' },
          ],
        },
        {
          id: 'centralization',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'The Power of Centralization',
          explanation: `The **center of the board** (d4, d5, e4, e5) is the most important territory because pieces placed there control the most squares and can quickly move to either flank.

**Piece power from the center:**

- **Knight on d4/e4:** Controls 8 squares, can jump to either wing
- **Knight on a1/h1:** Controls only 2 squares, far from the action
- **Bishop on d4:** Commands both diagonals, influencing 13 squares
- **Queen in center:** Dominates the entire board

**The "Knight on the rim is dim" principle:**

A knight on a1, a8, h1, or h8 controls only 2 squares. On b1/g1/b8/g8, it controls 3-4 squares. But on d5 or e4, it controls 8 squares! This is why central knight outposts are so valuable.

**Practical application:**

Always ask: "Can my pieces reach better squares?" The fastest way to improve your chess is to constantly look for ways to improve your worst-placed piece.

The side with better centralized pieces almost always has the advantage in the middlegame.`,
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'd5', color: 'green' },
            { square: 'e4', color: 'green' },
            { square: 'e5', color: 'green' },
          ],
        },
        {
          id: 'activity-vs-material',
          type: 'explanation',
          fen: 'r4rk1/ppp2ppp/2n5/3qp1B1/1b1P4/2N2Q2/PPP2PPP/R3R1K1 w - - 0 14',
          title: 'Activity Can Trump Material',
          explanation: `One of chess's most important lessons: **Active pieces can be worth more than extra material.**

**In this position, material is roughly equal, but look at piece activity:**

**White's pieces:**
- Queen on f3: Attacks f7, controls key diagonals
- Bishop on g5: Aggressive, pinning options
- Rooks on open files: Ready to invade
- All pieces coordinated and active

**Black's pieces:**
- Queen on d5: Active, but alone
- Bishop on b4: Oddly placed, doing little
- Rooks not connected, passive
- Knight on c6: Defensive, not contributing to attack

**The verdict:** White's activity gives a significant advantage. In such positions, White should:
1. Avoid unnecessary exchanges (keep the activity)
2. Open more lines for the active pieces
3. Strike before Black can reorganize

**Key insight:** When you have superior activity, DON'T simplify! Keep pieces on to maximize your advantage. Activity diminishes when pieces are traded.`,
          arrows: [
            { from: 'f3', to: 'f7', color: 'red' },
            { from: 'e1', to: 'e5', color: 'blue' },
            { from: 'g5', to: 'e7', color: 'blue' },
          ],
        },
        {
          id: 'improve-piece',
          type: 'interactive',
          fen: 'r1bqr1k1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQR1K1 w - - 0 9',
          title: 'Improve Your Worst Piece',
          explanation: `A key technique of the masters: **Always look to improve your worst-placed piece.**

In this position, White has one clearly undeveloped piece. Find the best way to activate it!`,
          correctMoves: ['Nbd2', 'Na3'],
          arrows: [
            { from: 'b1', to: 'd2', color: 'green' },
          ],
          successMessage: `**Good!** Nbd2 develops the knight to a useful square. From d2, it can go to f1-g3 for a kingside attack, or support e4 with f3. Never leave pieces sleeping on their starting squares!`,
          failureMessage: 'Look at White\'s worst placed piece—it hasn\'t moved from its starting square. How can you improve it?',
        },
        {
          id: 'coordination',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/4P3/2PP1N2/PPBN1PPP/R1BQR1K1 w - - 2 10',
          title: 'Piece Coordination',
          explanation: `Individual piece activity matters, but **coordination**—how pieces work together—matters even more.

**Signs of good coordination:**

- **Pieces defend each other:** If attacked, another piece helps
- **Pieces attack together:** Multiple pieces target the same weakness
- **No pieces block each other:** Bishops have open diagonals, rooks have open files
- **Pieces support common plans:** All working toward the same goal

**Powerful piece tandems:**

- **Queen + Knight:** The knight covers squares the queen can't reach
- **Queen + Bishop:** Long-range diagonal control with tactical threats
- **Two Rooks:** "Doubled rooks" on a file or rank are devastating
- **Bishop pair:** Cover all squares, work beautifully in open positions

**The "worst piece" technique:**

Silman's famous method: Find your worst-placed piece and improve it. Then find the next worst piece. This systematic improvement of coordination often decides games.

**Warning:** Avoid pieces that get in each other's way. A bishop blocked by its own knight, or rooks that can't connect, are coordination failures.`,
          highlights: [
            { square: 'd2', color: 'green' },
            { square: 'e1', color: 'green' },
            { square: 'f3', color: 'green' },
          ],
        },
        {
          id: 'activity-practice',
          type: 'puzzle',
          fen: 'r1bq1rk1/pp3ppp/2np1n2/2p1p3/4P1b1/2PP1N2/PP1NBPPP/R1BQ1RK1 w - - 0 10',
          title: 'Activate the Passive Piece',
          explanation: `White's position is solid but the c1 bishop is passive. Find the move that activates this bishop while also creating threats!`,
          correctMoves: ['h3'],
          successMessage: `**Correct!** h3 asks the bishop a question. After ...Bh5, White can play g4, kicking the bishop again and preparing to fianchetto with Bg2, or the bishop retreats to e6/d7 where it's less active. The c1 bishop will also get active via e3 or g5 once the g4 thrust happens.`,
          failureMessage: 'One of White\'s pieces is very passive. How can you force Black to make a decision that helps activate your pieces?',
          arrows: [
            { from: 'h2', to: 'h3', color: 'green' },
            { from: 'g4', to: 'h5', color: 'blue' },
          ],
        },
        {
          id: 'centralized-vs-edge',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp2ppp/3p1n2/4p3/4P3/3P4/PPPN1PPP/R1BQR1K1 w - - 0 10',
          title: 'Centralize the Knight',
          explanation: `White's knight on d2 is passive. It needs to reach a more active central square. Find the best route to maximize the knight's activity!`,
          correctMoves: ['Nf1'],
          successMessage: `**Correct!** Nf1 is the key maneuver. From f1, the knight will reroute to e3 or g3, aiming for the powerful d5 or f5 squares. This classic knight maneuver (Nd2-f1-e3/g3) is seen in many King's Indian and Spanish Game structures. The knight transforms from a passive piece to a dominant one.`,
          failureMessage: 'The knight needs to reach a strong central square. Think about the classic rerouting maneuver: Nd2-f1-e3 or Nd2-f1-g3.',
          arrows: [
            { from: 'd2', to: 'f1', color: 'green' },
            { from: 'f1', to: 'e3', color: 'blue' },
            { from: 'f1', to: 'g3', color: 'blue' },
          ],
          highlights: [
            { square: 'f1', color: 'yellow' },
            { square: 'e3', color: 'green' },
            { square: 'g3', color: 'green' },
          ],
        },
        {
          id: 'piece-activity-puzzle',
          type: 'interactive',
          fen: 'r4rk1/ppp1qppp/2n1b3/3np3/8/1BN1P3/PPP2PPP/R1BQR1K1 w - - 0 12',
          title: 'Activate the Passive Rook',
          explanation: `White's rook on a1 has been idle the entire game. Find the best way to bring it into the action and improve White's piece coordination!`,
          correctMoves: ['Nd5'],
          successMessage: `**Excellent!** Nd5 is a powerful centralizing move that attacks Black's queen on e7 and dominates the board. The knight on d5 is a monster—it cannot be taken by the e6 bishop without allowing Bxe6 with a discovered attack. This forces Black to react, giving White time to further improve piece coordination.`,
          failureMessage: 'Before moving the rook, consider if there is a stronger centralizing move that improves your position even more. Which piece can dominate from the center?',
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'space-advantage',
      title: 'Space Advantage',
      description: 'Understanding and using territorial control',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['space', 'pawns', 'territory'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 1 4',
          title: 'What is Space?',
          explanation: `**Space** in chess refers to the territory your pawns control. Wilhelm Steinitz, the first world champion, was the first to formally theorize about space advantage in the 1880s, arguing that cramped positions contain the seeds of their own destruction. The side with more space has more room for their pieces to maneuver, while the opponent's pieces are cramped and restricted.

**How space is measured:**

- Count how many ranks your pawns have advanced
- The further forward your pawns, the more space you control
- A pawn on the 4th rank controls space up to the 5th; on the 5th, up to the 6th

**Why space matters:**

1. **More room for pieces:** Your pieces have more squares to choose from
2. **Opponent is cramped:** Their pieces bump into each other
3. **Easier attacking:** More space usually means easier piece coordination
4. **Psychological pressure:** Cramped positions are hard to play

**The space equation:**
- Advanced center pawns = space advantage
- Pawns that control enemy territory = opponent is restricted
- But advanced pawns can also become targets!

**Key principle:** Space advantage is most powerful when you can use it to maneuver pieces freely while the opponent struggles to find good squares. However, space alone isn't everything—you need pieces to use that space!`,
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'd4', color: 'green' },
            { square: 'e5', color: 'yellow' },
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'space-example',
          type: 'explanation',
          fen: 'r1bqkb1r/pp1npppp/2p2n2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 2 5',
          title: 'The Classical Space Advantage',
          explanation: `This position shows a **classical space advantage** for White. The e5 pawn is the key:

**What the e5 pawn accomplishes:**

1. **Restricts the f6 knight:** It cannot go to its natural e4 square and is pushed to awkward squares like d7, e8, or g8

2. **Controls d6 and f6:** These squares become weak in Black's camp

3. **Creates a "space bind":** Black's pieces have difficulty finding good squares

4. **Supports kingside attack:** White can launch h4-h5, g4-g5 with the e5 pawn providing cover

**Black's problems:**
- The knight on d7 is passive
- The f8 bishop has limited development options
- Pieces are on back ranks, cramped
- Counterplay with ...f6 weakens the position

**Strategic lesson:** When you have a space advantage, you should:
- NOT rush—the advantage is permanent
- Maneuver pieces to optimal squares
- Prepare a breakthrough
- Prevent opponent's counterplay (like ...c5 or ...f6)

The side with less space should seek exchanges and pawn breaks!`,
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'd6', color: 'red' },
            { square: 'f6', color: 'red' },
          ],
          arrows: [
            { from: 'e5', to: 'f6', color: 'red' },
            { from: 'e5', to: 'd6', color: 'red' },
          ],
        },
        {
          id: 'using-space',
          type: 'explanation',
          fen: 'r1bqk2r/pp1nbppp/2p1pn2/3pP3/3P1P2/2N2N2/PPP3PP/R1BQKB1R w KQkq - 0 7',
          title: 'Using Your Space Advantage',
          explanation: `Having space is good—**using it correctly** is what wins games. Here's how to maximize a space advantage:

**Strategic plans when you have more space:**

1. **Don't rush!** The space advantage doesn't disappear. Take your time.

2. **Improve piece placement:** Maneuver your pieces to their ideal squares. With more room, you have more options.

3. **Control key squares:** Use your spatial advantage to dominate outposts and weak squares in enemy territory.

4. **Prepare a breakthrough:** Eventually open lines to convert the advantage. Here, f5 or g4-g5 prepares a kingside attack.

5. **Prevent counterplay:** Watch for ...c5 or ...f6 breaks that could relieve Black's cramp.

**In this position, White's plan:**
- Develop with Bd3, 0-0, Qe1 (or Qe2)
- If Black plays ...f6, meet it with preparations or take exf6
- Launch a kingside attack with f5 (after preparation) or g4-g5-g6

**The golden rule:** More space = more time to prepare. Less space = urgency to break free.`,
          arrows: [
            { from: 'f4', to: 'f5', color: 'green' },
            { from: 'g2', to: 'g4', color: 'blue' },
          ],
        },
        {
          id: 'cramped-position',
          type: 'explanation',
          fen: 'r1bqk2r/pp1nbppp/2p1pn2/3pP3/3P1P2/2N2N2/PPP3PP/R1BQKB1R b KQkq - 0 7',
          title: 'Playing Without Space',
          explanation: `When you're cramped, you need specific strategies to survive and fight back. Here's what to do when the opponent has a space advantage:

**Strategy 1: Exchange pieces**
- Fewer pieces = less cramped
- Trade especially active enemy pieces
- In endgames, space matters less

**Strategy 2: Pawn breaks**
- ...c5 challenging the d4 base
- ...f6 challenging the e5 outpost
- These breaks relieve the pressure, even if they require preparation

**Strategy 3: Patience**
- Don't create additional weaknesses
- Maintain solid structure while waiting
- The opponent may overextend

**Strategy 4: Counterplay on the flanks**
- If the center is locked, look for play on the wings
- Minority attack (queenside pawn push)
- ...a5-a4 or ...h5-h4 can create chances

**In this position, Black should:**
- Play ...c5 or prepare ...f6 (the classical breaks)
- Keep pieces flexible and ready to exchange
- Not panic—space advantages take time to convert

**Remember:** A cramped position isn't lost! Many World Champions have defended cramped positions to draw or even win.`,
          arrows: [
            { from: 'c6', to: 'c5', color: 'blue' },
            { from: 'f7', to: 'f6', color: 'blue' },
          ],
        },
        {
          id: 'break-space',
          type: 'interactive',
          fen: 'r1bqnrk1/pp1nbppp/2p1p3/3pP3/3P1P2/2N2N2/PPP1B1PP/R1BQK2R b KQ - 2 8',
          title: 'Challenge the Space',
          explanation: `Black is cramped and needs to fight back. What pawn break challenges White's space advantage and frees Black's position?`,
          correctMoves: ['f6', 'c5'],
          successMessage: `**Correct!** Both ...f6 and ...c5 are thematic breaks. ...f6 directly challenges the e5 pawn (the base of White's space), while ...c5 attacks the d4 pawn. These breaks are essential for survival in cramped positions!`,
          failureMessage: 'When cramped, you must challenge the opponent\'s center. Which pawn can strike at White\'s advanced pawns?',
          arrows: [
            { from: 'f7', to: 'f6', color: 'green' },
            { from: 'c6', to: 'c5', color: 'green' },
          ],
        },
        {
          id: 'space-practice',
          type: 'puzzle',
          fen: 'r1bqkb1r/pp2pppp/2np1n2/2p5/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
          title: 'Gain Space',
          explanation: `White has a choice: maintain the current structure or grab space. What move gains maximum space advantage?`,
          correctMoves: ['d5'],
          successMessage: `**Excellent!** d5! gains a significant space advantage. The pawn on d5 cramps Black's position, especially the c6 knight which has nowhere good to go. White's pieces will have much more room to operate.`,
          failureMessage: 'Think about how pawns claim territory. Which pawn advance restricts Black\'s pieces the most?',
          arrows: [
            { from: 'd4', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'convert-space',
          type: 'interactive',
          fen: 'r1bq1rk1/pp1n1ppp/2p1p3/3pP1N1/3P4/2N5/PPP2PPP/R1BQR1K1 w - - 0 11',
          title: 'Convert the Space Advantage',
          explanation: `White has a massive space advantage with the e5 pawn cramping Black's position. The knight on g5 is aggressively placed. Find the move that converts White's spatial advantage into a direct attacking threat!`,
          correctMoves: ['Qh5'],
          successMessage: `**Brilliant!** Qh5 uses the spatial advantage to create a direct kingside attack. The queen targets h7 and works with the g5 knight. Black is so cramped that defense is extremely difficult. The threat of Qxh7# (or Qh7+ followed by Qh8#) forces Black into passive defense. This is how space advantages are converted into attacks!`,
          failureMessage: 'With more space, your pieces have better squares. Which queen move creates immediate threats against Black\'s cramped kingside?',
          arrows: [
            { from: 'd1', to: 'h5', color: 'green' },
            { from: 'h5', to: 'h7', color: 'red' },
          ],
          highlights: [
            { square: 'h5', color: 'green' },
            { square: 'h7', color: 'red' },
          ],
        },
        {
          id: 'space-restriction',
          type: 'puzzle',
          fen: 'r1bqk2r/pp2bppp/2n1pn2/2ppP3/3P4/2P1N3/PP1N1PPP/R1BQKB1R w KQkq - 0 7',
          title: 'Restrict the Opponent',
          explanation: `White has an e5 space advantage. Black wants to play ...f6 to challenge the e5 pawn. Find the move that prevents this break and locks in White's spatial advantage!`,
          correctMoves: ['f4'],
          successMessage: `**Correct!** f4 reinforces the e5 pawn and permanently prevents ...f6. Now Black's kingside knight is completely locked out. White has a stable space advantage and can build up slowly with Bd3, O-O, and prepare a kingside attack. The key to maintaining space: protect your advanced pawns!`,
          failureMessage: 'Black wants to challenge e5 with ...f6. How can you reinforce the e5 pawn to prevent this break?',
          arrows: [
            { from: 'f2', to: 'f4', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'f4', color: 'blue' },
          ],
        },
      ],
    },
    {
      id: 'minor-piece-battles',
      title: 'Minor Piece Battles',
      description: 'Knight vs Bishop and when each excels',
      difficulty: 'intermediate',
      estimatedMinutes: 14,
      tags: ['knights', 'bishops', 'evaluation'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 2 8',
          title: 'Knight vs Bishop: The Eternal Debate',
          explanation: `Knights and bishops are both worth approximately **3 pawns**, but they are fundamentally different pieces. The relative value of bishops vs knights has been debated since the time of Staunton (1847). Fischer famously preferred bishops, while Petrosian was renowned for his knight mastery. Understanding when each is stronger is a cornerstone of positional chess.

**Key differences:**

**Bishops:**
- Move on diagonals, covering long distances instantly
- Restricted to one color (can only reach half the squares!)
- Need open diagonals to be effective
- Strong in positions with pawns on both flanks

**Knights:**
- Move in "L" shapes, hopping over pieces
- Can reach any square (given enough moves)
- Don't need open lines
- Strong in closed positions with fixed pawns

**The critical factor: Pawn structure!**

In **open positions** (few pawns, clear diagonals): Bishops typically dominate because they control more squares across an open board.

In **closed positions** (locked pawns, few open lines): Knights excel because they can hop over the blocked pawns and find outposts.

**Grandmaster wisdom:** "In the opening, bishops are usually better. In the endgame with pawns on both sides, bishops are better. But in closed middlegames, knights reign supreme."`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'c5', color: 'yellow' },
            { square: 'c3', color: 'blue' },
            { square: 'f3', color: 'blue' },
          ],
        },
        {
          id: 'bishop-excels',
          type: 'explanation',
          fen: '2r3k1/pp3ppp/3b4/3p4/8/3B4/PPP2PPP/2KR4 w - - 0 20',
          title: 'When Bishops Dominate',
          explanation: `This is a **perfect position for bishops**. Both bishops are powerful, but importantly, they illustrate why bishops excel in open endgames.

**Why bishops are strong here:**

1. **Open position:** No blocked pawn chains obstructing the diagonals

2. **Pawns on both sides:** The bishop can influence both the queenside and kingside from a central location. A knight would need many moves to do the same.

3. **Long-range control:** The bishops instantly control squares across the entire board

4. **Endgame factor:** With few pieces, the board is "open" and diagonals are clear

**The Bishop's advantage in such positions:**

A bishop on d3 controls a1, b1, c2, e4, f5, g6, h7 AND can defend pawns or attack enemy pawns from afar. A knight would need 4-5 moves to travel from one side to the other.

**Practical rule:** In open endgames with pawns on both flanks, a bishop is often worth more than a knight. Some estimate the advantage at **half a pawn** or more.

**Key factor:** The "principle of two weaknesses" is easier to exploit with a long-range bishop that can shift attack between flanks instantly.`,
          highlights: [
            { square: 'd3', color: 'green' },
            { square: 'd6', color: 'green' },
          ],
          arrows: [
            { from: 'd3', to: 'h7', color: 'blue' },
            { from: 'd3', to: 'a6', color: 'blue' },
          ],
        },
        {
          id: 'knight-excels',
          type: 'explanation',
          fen: 'r4rk1/ppp1bppp/3p1n2/3Pp3/2P1P3/2N5/PP3PPP/R1B1KB1R w KQ - 0 12',
          title: 'When Knights Dominate',
          explanation: `This is a **perfect position for knights**. The pawn structure is locked, creating an ideal environment for the knight.

**Why the knight excels here:**

1. **Closed center:** The pawns on d5 and e5 (blocked by e4 and d6) create a closed position. Bishops have no open diagonals.

2. **Strong outpost available:** The d5 square is a permanent outpost for White's knight. From d5, the knight controls c7, e7, b6, f6, and cannot be driven away.

3. **Bishops are blocked:** Black's bishop on e7 is passive, restricted by its own pawns. White's bishop on c1 is similarly limited.

4. **Knight can hop over pawns:** While bishops stare at pawn chains, knights jump over them to reach key squares.

**Strategic plan:**
White should play Nc3-d5 (or Ne2-f4-d5), establishing a dominant knight. Black's bishop will never match this knight's influence.

**The rule:** In locked positions, knights >> bishops. The knight's ability to jump over blocked pawns makes it far superior.`,
          highlights: [
            { square: 'd5', color: 'green' },
          ],
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'two-bishops',
          type: 'explanation',
          fen: 'r2q1rk1/ppp1bppp/2np1n2/4p1B1/2B1P3/2NP1N2/PPP2PPP/R2Q1RK1 w - - 2 9',
          title: 'The Mighty Bishop Pair',
          explanation: `Two bishops working together—the **"Bishop Pair"**—have a special synergy that's worth knowing about.

**Why the bishop pair is powerful:**

1. **They cover all squares:** One bishop covers light squares, the other covers dark squares. Together, they control everything.

2. **They support each other:** When one bishop is threatened, it can retreat behind the other, creating a defensive wall.

3. **They create crossed threats:** Bishops on crossing diagonals create dangerous tactical patterns.

4. **They dominate open positions:** As the board opens up (which it usually does as pieces are traded), the bishop pair grows stronger.

**How much is the bishop pair worth?**

Most estimates put it at **0.3-0.5 pawns** in open positions. In very open positions, it can be worth even more.

**When to keep the bishop pair:**
- When the position is open or likely to open
- When you can avoid exchanging bishops

**When the bishop pair is overrated:**
- Closed positions with locked pawns
- When one bishop is "bad"
- When knights have strong outposts`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'g5', color: 'green' },
          ],
          arrows: [
            { from: 'c4', to: 'g8', color: 'blue' },
            { from: 'g5', to: 'c1', color: 'blue' },
          ],
        },
        {
          id: 'trade-for-knight',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b - - 2 8',
          title: 'Strategic Exchange',
          explanation: `In this Italian Game position, Black can make a strategic exchange. Sometimes trading a bishop for a knight makes sense.

Which knight should Black target, and why?`,
          correctMoves: ['Bxc3'],
          successMessage: `**Correct!** ...Bxc3 trades the c5 bishop for the c3 knight, messing up White's pawn structure after bxc3. The doubled c-pawns are a permanent weakness. The position will remain semi-closed, where Black's remaining knight can find good squares.`,
          failureMessage: 'Think about which exchange would damage White\'s pawn structure. Which knight can your bishop actually capture?',
          arrows: [
            { from: 'c5', to: 'c3', color: 'green' },
          ],
        },
        {
          id: 'piece-battle-practice',
          type: 'puzzle',
          fen: 'r1bqr1k1/ppp2ppp/2n2n2/3p4/1b1P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 10',
          title: 'Evaluate the Trade',
          explanation: `Black is threatening ...Bxc3, giving White doubled pawns but also giving up the bishop pair. White can prevent this. Should White protect the knight or allow the trade?`,
          correctMoves: ['Bb5'],
          successMessage: `**Excellent!** Bb5! is a counter-pin that forces exchanges on White's terms. After Bb5, the pin on the c6 knight is awkward for Black. White maintains the bishop pair and active piece play. Protecting with a3 would be passive.`,
          failureMessage: 'Can White create counterplay rather than just defending? Look for an active move that also addresses the threat.',
          arrows: [
            { from: 'd3', to: 'b5', color: 'green' },
          ],
        },
        {
          id: 'bishop-vs-knight-endgame',
          type: 'interactive',
          fen: '8/pp3kpp/4p3/3pP3/6P1/4BK2/PP5P/5n2 w - - 0 30',
          title: 'Bishop vs Knight: Open Endgame',
          explanation: `This is a typical endgame where the bishop should dominate the knight. The position is open with pawns on both flanks. Find the move that maximizes the bishop's long-range advantage!`,
          correctMoves: ['Bc5'],
          successMessage: `**Correct!** Bc5 is a fantastic move. The bishop controls both the a3-f8 and b4-g7 diagonals, influencing both sides of the board simultaneously. The knight on f1 is passively placed and cannot match the bishop's reach. White's plan is to create threats on both flanks—the knight simply cannot defend everywhere at once.`,
          failureMessage: 'The bishop excels at controlling both sides of the board. Where can it be placed to influence both flanks?',
          arrows: [
            { from: 'e3', to: 'c5', color: 'green' },
            { from: 'c5', to: 'a7', color: 'blue' },
          ],
          highlights: [
            { square: 'c5', color: 'green' },
          ],
        },
        {
          id: 'knight-closed-practice',
          type: 'puzzle',
          fen: 'r2q1rk1/pb2bppp/1pn1p3/2ppP3/3P4/P1N2N2/1P2BPPP/R1BQ1RK1 w - - 0 12',
          title: 'Knight Superiority in Closed Position',
          explanation: `The center is locked (e5 vs e6, d4 vs d5). Black has a bishop on b7 that is blocked by its own pawns. White can capitalize by maneuvering a knight to the ideal outpost. Find the best move!`,
          correctMoves: ['Na4'],
          successMessage: `**Excellent!** Na4 heads for the outpost on c5 (via a4-c5 or b6). The c5 square cannot be attacked by Black's pawns, and from there the knight will be far superior to Black's blocked bishop on b7. In this closed structure, the knight dominates while the bishop stares at its own pawns.`,
          failureMessage: 'In this locked position, the knight needs a strong outpost. Which move starts the knight\'s journey to the c5 outpost?',
          arrows: [
            { from: 'c3', to: 'a4', color: 'green' },
            { from: 'a4', to: 'c5', color: 'blue' },
          ],
          highlights: [
            { square: 'c5', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'weak-pawns',
      title: 'Weak Pawns',
      description: 'Identifying and attacking vulnerable pawns',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['pawns', 'weaknesses', 'targets'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/4P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
          title: 'Types of Weak Pawns',
          explanation: `Pawns cannot move backward, so **pawn weaknesses are permanent**. The study of weak pawns (isolated, doubled, backward) was systematized by Steinitz and later expanded by Nimzowitsch, who dedicated an entire chapter of "My System" to pawn weaknesses. Understanding weak pawn types is fundamental to strategic play.

**The main types of weak pawns:**

**1. Backward Pawn:**
- Cannot advance safely (enemy pawn controls the square in front)
- Cannot be protected by other pawns
- Often sits on a half-open file where rooks can attack it

**2. Isolated Pawn:**
- No pawns on adjacent files
- Must be defended by pieces only
- The square in front is a potential outpost for the opponent

**3. Doubled Pawns:**
- Two pawns on the same file
- Cannot protect each other
- Reduced mobility and flexibility

**4. Hanging Pawns:**
- Two adjacent pawns with no pawns beside them (like pawns on c4 and d4 with no b or e pawns)
- Can be either a dynamic strength or a static weakness

**Why attack weak pawns?**

- They tie down enemy pieces to defense
- They create long-term targets
- They often lead to better piece activity for the attacker
- In endgames, they're often decisive weaknesses

The art of positional chess often involves creating, exploiting, or defending weak pawns.`,
          highlights: [
            { square: 'd6', color: 'yellow' },
            { square: 'e5', color: 'yellow' },
          ],
        },
        {
          id: 'backward-pawn',
          type: 'explanation',
          fen: 'r1bq1rk1/pp3ppp/2p1pn2/3p4/3P4/2PBP3/PP3PPP/R1BQ1RK1 b - - 0 10',
          title: 'Attacking the Backward Pawn',
          explanation: `Black's e6 pawn is a classic **backward pawn**. Let's see why it's weak and how to attack it:

**Why the e6 pawn is backward:**

1. **Cannot advance:** The d5 pawn blocks e6-e5, and even without d5, White controls e5
2. **Cannot be protected by pawns:** No f-pawn support possible
3. **Sits on a half-open file:** The e-file has no White pawns, perfect for rook pressure

**White's attacking plan:**

Step 1: **Control the file** - Re1 puts pressure on e6
Step 2: **Double rooks** - Qe2 or Rae1 adds firepower
Step 3: **Attack the defender** - Force Black to tie pieces to e6's defense
Step 4: **Create a second weakness** - Once Black is tied down, attack elsewhere

**Black's defensive challenges:**
- The e6 pawn requires constant piece defense
- Black's pieces become passive defenders
- No counterplay because pieces are tied down

**Key lesson:** Backward pawns aren't just about winning the pawn—they're about restricting the opponent's pieces and creating permanent pressure.`,
          highlights: [
            { square: 'e6', color: 'red' },
          ],
          arrows: [
            { from: 'e1', to: 'e6', color: 'blue' },
            { from: 'e2', to: 'e6', color: 'blue' },
          ],
        },
        {
          id: 'isolated-weakness',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
          title: 'Exploiting the Isolated Pawn',
          explanation: `White's d4 pawn is **isolated**—no pawns on c or e files to protect it. Here's the strategic battle:

**Why the isolated pawn is weak:**

1. **Must be defended by pieces:** Takes resources away from other plans
2. **The square in front (d5) is weak:** Enemy pieces can blockade there
3. **Static target:** In endgames, it's often fatally weak

**Black's strategic plan:**

1. **Blockade d5:** Put a knight on d5—it cannot be driven away by pawns
2. **Attack d4:** Rooks on d8, queen to a5 or b6
3. **Exchange pieces:** With fewer attackers, the isolated pawn becomes a pure weakness
4. **Enter the endgame:** Isolated pawns are easiest to win in simplified positions

**White's counterplay:**

White should use the open c and e files and piece activity to attack before Black blockades. The isolated pawn gives dynamic play if White can create threats before the position simplifies.

**The Key Principle:** The isolated pawn holder wants action; the opponent wants exchanges and blockade.`,
          highlights: [
            { square: 'd4', color: 'red' },
            { square: 'd5', color: 'yellow' },
          ],
          arrows: [
            { from: 'd8', to: 'd4', color: 'blue' },
          ],
        },
        {
          id: 'attack-weakness',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2NBPN2/PP3PPP/R1BQR1K1 b - - 2 10',
          title: 'Attack the Isolated Pawn',
          explanation: `White has an isolated d4 pawn. Black should increase pressure while aiming for the blockade square. Find the best move!`,
          correctMoves: ['Nb4'],
          arrows: [
            { from: 'c6', to: 'b4', color: 'blue' },
            { from: 'b4', to: 'd5', color: 'green' },
          ],
          successMessage: `**Excellent!** ...Nb4 is perfect! The knight attacks both the d4 pawn and eyes the d5 blockade square. From b4, it can jump to d5 creating a powerful blockade, or it can go to c2 with tricks. This is a classic anti-IQP maneuver.`,
          failureMessage: 'Look for a way to increase pressure on d4 while preparing to blockade on d5. Which piece can do both?',
        },
        {
          id: 'doubled-weakness',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/8/2PBPN2/PP1N1PPP/R1BQ1RK1 w - - 0 11',
          title: 'Doubled Pawn Weakness',
          explanation: `White has doubled c-pawns (c2 and c3). Let's analyze this structure:

**Problems with doubled pawns:**

1. **Cannot protect each other:** Unlike normal pawns, they can't form a chain
2. **Reduced mobility:** The back pawn is often permanently stuck
3. **Creates holes:** The squares beside them (here d4) become weak
4. **Less flexible endgames:** A 2-1 pawn majority on a file is harder to create a passed pawn with

**Why doubled pawns might be acceptable:**

1. **Open files:** The doubling often comes from capturing toward the center, opening a file for rooks
2. **Central control:** Sometimes doubled pawns control key squares
3. **Bishop pair compensation:** Often you get the bishop pair when your pawns are doubled

**In this position:**
The d4 square is permanently weak because neither c-pawn can control it. Black should maneuver a knight to d4 (via f5 or e6) where it will be a monster.

**Strategic conclusion:** Avoid doubled pawns unless you get clear compensation. If you create them, prepare to defend the resulting weaknesses.`,
          highlights: [
            { square: 'c3', color: 'red' },
            { square: 'c2', color: 'red' },
            { square: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'weak-pawn-practice',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/3P4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
          title: 'Create a Weak Pawn',
          explanation: `White can create a weak pawn in Black's position with the right plan. What move sets this up?`,
          correctMoves: ['Bb5'],
          successMessage: `**Correct!** Bb5 pins the c6 knight and prepares to exchange it. After Bxc6 bxc6, Black has doubled c-pawns and an isolated a-pawn! The c6 pawn becomes backward (can't advance) and the c7 pawn is doubled. White has created long-term weaknesses.`,
          failureMessage: 'Think about how to create permanent weaknesses in Black\'s camp. Which exchange would damage Black\'s pawn structure?',
          arrows: [
            { from: 'f1', to: 'b5', color: 'green' },
            { from: 'b5', to: 'c6', color: 'red' },
          ],
        },
        {
          id: 'backward-pawn-practice',
          type: 'interactive',
          fen: 'r1bq1rk1/pp3ppp/2n1p3/3p4/3P4/2P1PN2/PP3PPP/R1BQ1RK1 w - - 0 10',
          title: 'Target the Backward Pawn',
          explanation: `Black's e6 pawn is backward—it cannot advance because White controls e5 with the d4 pawn. How should White begin putting pressure on this weakness?`,
          correctMoves: ['Re1'],
          successMessage: `**Perfect!** Re1 puts the rook on the half-open e-file, directly targeting the backward e6 pawn. White's plan is to pile up on e6 with Qe2, possibly Bd2-c1-b2, and eventually Rae1. The backward pawn ties down Black's pieces to its defense.`,
          failureMessage: 'The e6 pawn is weak and sits on a half-open file. Which piece should pressure it along that file?',
          arrows: [
            { from: 'f1', to: 'e1', color: 'green' },
            { from: 'e1', to: 'e6', color: 'blue' },
          ],
          highlights: [
            { square: 'e6', color: 'red' },
          ],
        },
        {
          id: 'hanging-pawns-lesson',
          type: 'explanation',
          fen: 'r1bq1rk1/pp3ppp/2n1bn2/8/2Pp4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 10',
          title: 'Hanging Pawns',
          explanation: `**Hanging pawns** are two adjacent pawns (typically on c4 and d4, or c5 and d5) with no friendly pawns on adjacent files. They are a unique type of pawn weakness.

**In this position, White's c4 and d4 pawns are "hanging":**

**Why they can be weak:**
1. Both must be defended by pieces, not pawns
2. They can become targets for coordinated attack
3. If one advances, the other becomes isolated and weak
4. Rooks on the c and d files can pressure them

**Why they can be strong:**
1. They control key central squares (c5, d5, e5)
2. A timely d5 or c5 advance can be powerful
3. They provide space and active piece play
4. Bishops and knights get excellent squares behind them

**The key question:** Are the hanging pawns a dynamic strength or a static weakness? It depends on whether the pawn holder can maintain the tension and keep pieces active.

**Practical tip:** When playing against hanging pawns, try to force one to advance (d5 or c5), which isolates the other. When playing with them, keep pieces active and look for the right moment to push!`,
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'd4', color: 'yellow' },
          ],
          arrows: [
            { from: 'c4', to: 'c5', color: 'blue' },
            { from: 'd4', to: 'd5', color: 'blue' },
          ],
        },
      ],
    },
    {
      id: 'open-files',
      title: 'Open Files and Rooks',
      description: 'Controlling key files with rooks',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['rooks', 'files', 'penetration'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/4P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 7',
          title: 'The Power of Open Files',
          explanation: `Rooks are the most underutilized pieces for most players. Nimzowitsch in "My System" (1925) declared that Rooks belong on open files - "The Rook is the piece of the open file" - and introduced the concept of "half-open" files for targeting weak pawns. Understanding **open files** is key to activating them.

**Definitions:**

- **Open file:** A file with NO pawns (either color)
- **Half-open file:** A file with only ENEMY pawns (yours have been exchanged off)
- **Closed file:** A file with pawns of both colors

**Why rooks need open files:**

Rooks move in straight lines and are blocked by pawns. On an open file:
- They can penetrate into the enemy position
- They can attack backward or weak pawns
- They can reach the 7th rank (devastatingly strong)
- Two rooks on the same file ("doubled") are extremely powerful

**The Rook Activation Plan:**

1. Open a file (exchange pawns)
2. Put a rook on the file
3. Double rooks if possible
4. Penetrate to the 7th or 8th rank
5. Attack from behind or cut off the enemy king

**Tarrasch's wisdom:** "A rook on the seventh rank is worth at least a pawn." This shows how valuable file control leading to penetration really is.`,
          highlights: [
            { square: 'e1', color: 'blue' },
            { square: 'e8', color: 'blue' },
          ],
        },
        {
          id: 'seize-file',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1nppp/3p1n2/4p3/4P3/3P1N2/PPP1BPPP/RNBQR1K1 w - - 2 9',
          title: 'Seizing the Open File',
          explanation: `The e-file is open (no pawns). White has already placed a rook on e1. Now the goal is to **seize control** of the file and use it for invasion.

**White's plan:**

1. ✓ Rook to e1 (already done)
2. Consider doubling with Qe2 or Bf1 + Re2
3. Try to penetrate to e7 or e8
4. Use the file control to attack or improve pieces

**Fighting for file control:**

When both players have rooks, there's often a battle for the same file:
- The player who gets their rook on the file first usually controls it
- Trading rooks on the file often favors the player with less space
- Sometimes it's better to fight for a different file than contest a controlled one

**Strategic insight:**

Controlling an open file is like controlling a highway into enemy territory. Once you dominate the file, you can invade when the opportunity arises. Even if invasion isn't immediate, the pressure forces your opponent to defend passively.`,
          arrows: [
            { from: 'e1', to: 'e7', color: 'green' },
          ],
          highlights: [
            { square: 'e1', color: 'green' },
            { square: 'e8', color: 'yellow' },
          ],
        },
        {
          id: 'seventh-rank',
          type: 'explanation',
          fen: '4rrk1/pppR1ppp/3p1n2/4p3/4P3/3P1N2/PPP2PPP/4R1K1 w - - 0 16',
          title: 'The Devastating Seventh Rank',
          explanation: `A rook on the **seventh rank** (second rank for Black) is one of the most powerful pieces in chess. Here White's rook on d7 demonstrates why:

**Why the seventh rank is so strong:**

1. **Attacks pawns from behind:** The a7, b7, c7, f7 pawns are all targets—they can't advance to escape!

2. **Cuts off the enemy king:** The king is confined to the back rank, restricting its activity

3. **Creates mating threats:** Combined with another rook or queen, the 7th rank creates back-rank and suffocation threats

4. **Dominates the position:** The rook influences both attack and defense simultaneously

**"Two rooks on the seventh" is a classic winning pattern:**

If White can get the e1 rook to the seventh rank too (Rd7 + Re7), Black's position often collapses. The pawns fall, the king is trapped, and tactical threats multiply.

**Practical tip:** When you get a rook to the 7th, don't trade it off casually. It's worth significant material in activity. Support it, keep it there, and look for decisive action.`,
          highlights: [
            { square: 'd7', color: 'green' },
          ],
          arrows: [
            { from: 'd7', to: 'a7', color: 'red' },
            { from: 'd7', to: 'f7', color: 'red' },
            { from: 'e1', to: 'e7', color: 'blue' },
          ],
        },
        {
          id: 'double-rooks',
          type: 'interactive',
          fen: 'r4rk1/ppp1nppp/3p1n2/4p3/4P3/3P1N2/PPP1BPPP/R3R1K1 w - - 0 11',
          title: 'Double on the File',
          explanation: `White controls the e-file with one rook. How can White increase this control and prepare for invasion?`,
          correctMoves: ['Rad1', 'Rac1'],
          successMessage: `**Good thinking!** Moving the a1 rook to d1 or c1 prepares to double rooks on the e-file with Rde1 or Rce1. It also activates the passive a1 rook. When doubling, typically the less valuable rook goes first (to absorb exchanges) and the queen goes behind.`,
          failureMessage: 'Your rooks should work together. The a1 rook is passive—how can you bring it into the game while preparing to double on the e-file?',
        },
        {
          id: 'create-file',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2P1P3/3P1N2/PP3PPP/RNBQ1RK1 w - - 0 8',
          title: 'Creating Open Files',
          explanation: `Open files don't appear magically—you must **create them** through pawn exchanges.

**Methods to create open files:**

1. **Central exchanges:** cxd5 or exd5 can open the c or e file
2. **Pawn sacrifices:** Sometimes offering a pawn to open a file is worth it
3. **Forcing exchanges:** Pushing pawns to force your opponent to capture, opening a file
4. **Trading toward the center:** Capturing toward the center often opens files

**In this position:**

White can play c4 preparing cxd5. After cxd5 exd5, the c-file opens for White's rooks. Alternatively, if Black plays ...dxc4, the d-file opens.

**Strategic consideration:**

Before opening a file, ask yourself:
- Can I control this file better than my opponent?
- Do I have targets to attack on this file?
- Does opening the file help my opponent too?

**Timing matters:** Don't open files until your pieces (especially rooks) are ready to seize them. An open file that your opponent controls is worse than no open file!`,
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'c4', color: 'blue' },
            { square: 'c1', color: 'yellow' },
          ],
        },
        {
          id: 'open-file-practice',
          type: 'puzzle',
          fen: 'r4rk1/ppp2ppp/3p1n2/2b1p3/4P3/3P1N2/PPP1BPPP/R3R1K1 w - - 0 13',
          title: 'Exploit the File',
          explanation: `White has rooks on the e-file, but Black's rook on f8 is ready to contest. What's the best way to use the file advantage immediately?`,
          correctMoves: ['Nd2'],
          successMessage: `**Excellent!** Nd2 prepares Nc4, threatening the c5 bishop and d6 pawn. It clears the way for Bf3-g4 ideas and keeps the e-file pressure. The key insight: don't just control the file—use it to support your entire strategy. Direct invasion with Re7 would allow ...Rae8 contesting the file.`,
          failureMessage: 'Sometimes the best use of a file is indirect. Improve other pieces while maintaining file control. What knight maneuver threatens Black\'s position?',
          arrows: [
            { from: 'f3', to: 'd2', color: 'green' },
            { from: 'd2', to: 'c4', color: 'blue' },
          ],
        },
        {
          id: 'file-control-practice',
          type: 'interactive',
          fen: 'r3r1k1/ppp2ppp/3p1n2/4p3/4P3/3P1N2/PPP1BPPP/R1K1R3 w - - 0 14',
          title: 'Double Rooks on the File',
          explanation: `White already has one rook on the d-file and one on the e-file. To maximize pressure, White should double rooks on the most important file. Find the best rook move!`,
          correctMoves: ['Red1'],
          successMessage: `**Excellent!** Red1 doubles the rooks on the d-file, creating devastating pressure on the d6 pawn. Doubled rooks on an open or half-open file are one of the most powerful configurations in chess. The d6 pawn will need constant defense, and White can eventually penetrate to d7 or d8.`,
          failureMessage: 'Look at which file has a clear target (a weak pawn). How can you double rooks to increase pressure on that weakness?',
          arrows: [
            { from: 'e1', to: 'd1', color: 'green' },
          ],
          highlights: [
            { square: 'd6', color: 'red' },
            { square: 'd1', color: 'green' },
          ],
        },
        {
          id: 'rook-penetration',
          type: 'puzzle',
          fen: '2r3k1/pp3ppp/3p4/4p3/4P3/3P1N2/1PP2PPP/R5K1 w - - 0 18',
          title: 'Rook Penetration',
          explanation: `White's rook on a1 needs to get active. The a-file is open and Black's a7 and b7 pawns are potential targets. Find the best way to activate the rook!`,
          correctMoves: ['Ra6'],
          successMessage: `**Correct!** Ra6 penetrates to the 6th rank, attacking the d6 pawn from the side. The rook is now extremely active—it can swing along the 6th rank to attack multiple weaknesses. This is the "rook on the 6th rank" principle: almost as powerful as the 7th rank, with the bonus of attacking pawns from the flank.`,
          failureMessage: 'The rook needs to penetrate into Black\'s position. Which rank gives the rook maximum activity while attacking a weak pawn?',
          arrows: [
            { from: 'a1', to: 'a6', color: 'green' },
            { from: 'a6', to: 'd6', color: 'blue' },
          ],
          highlights: [
            { square: 'a6', color: 'green' },
            { square: 'd6', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'piece-exchanges',
      title: 'Piece Exchanges',
      description: 'When to exchange pieces and when to keep them',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['exchanges', 'simplification', 'strategy'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 4 7',
          title: 'The Art of Piece Exchanges',
          explanation: `Piece exchanges seem simple—trade a bishop for a bishop, a knight for a knight. But **when** and **which pieces** to exchange is a deep strategic decision. The theory of when to exchange pieces was developed by Capablanca, who was known for his simplification technique. The principle "when ahead in material, exchange pieces; when behind, exchange pawns" is attributed to him.

**Exchange when:**

1. **You're ahead in material:** Fewer pieces = easier to convert advantage
2. **You're cramped:** Exchanges relieve pressure and give pieces room
3. **To eliminate strong enemy pieces:** Trade off their best piece!
4. **To simplify into a winning endgame:** When you have a clear advantage
5. **To relieve pressure:** Under attack? Trade attacking pieces

**Avoid exchanges when:**

1. **You're attacking:** More pieces = more firepower
2. **You have the bishop pair:** Keep both bishops in open positions
3. **You have more space:** Space advantage is best with more pieces
4. **Your opponent has weak pawns:** Keep pieces to attack them
5. **You're behind in material:** Complications favor the weaker side

**The critical question:** "Does this exchange help me or my opponent more?"

**Capablanca's wisdom:** The great Cuban World Champion was a master of exchanges. He would trade pieces systematically until only the essentials remained, then outplay his opponent in the endgame. This "technical" style won him countless games.`,
          highlights: [
            { square: 'c4', color: 'blue' },
            { square: 'c5', color: 'blue' },
            { square: 'f3', color: 'green' },
            { square: 'f6', color: 'green' },
          ],
        },
        {
          id: 'simplify-when-ahead',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/4P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
          title: 'Simplify When Ahead',
          explanation: `One of the most important rules: **When you're ahead in material, exchange pieces.**

**The math of simplification:**

Imagine you're up a pawn with 10 pieces each:
- Your extra pawn is 1/10 of the board = small advantage

Now trade down to 2 pieces each (king + rook):
- Your extra pawn is 1/3 of the material = huge advantage!

**Why this works:**

1. **Fewer defensive resources:** Your opponent has less to defend with
2. **Reduced counterplay:** Fewer pieces = fewer tactics and tricks
3. **Endgame conversion:** Extra material is easier to convert with fewer pieces
4. **Technical winning:** The position becomes a matter of technique, not complications

**Practical example:**

If you win a pawn in the opening, don't try to win more pieces. Instead, trade queens, trade rooks, and convert in a simple endgame. This is how grandmasters "grind out" wins.

**Warning:** Don't simplify into a dead-drawn endgame! Make sure the resulting position is actually winning before trading down.`,
          highlights: [
            { square: 'd1', color: 'green' },
            { square: 'd8', color: 'yellow' },
          ],
        },
        {
          id: 'exchange-attacker',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np4/2b1p3/4P1n1/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 6 9',
          title: 'Exchange the Attacking Pieces',
          explanation: `When under attack, one of the best defensive strategies is to **exchange the attacking pieces**.

**In this position:**

Black has played ...Ng4, eyeing f2 and creating threats. White is slightly uncomfortable.

**White's options:**

1. **Exchange the attacker:** h3 forcing ...Nf6 or Bxg4 trading a useful piece for the annoying knight
2. **Ignore it:** Focus on own play (risky)
3. **Defend passively:** Re1, h3 slowly (gives Black time)

**Why exchanging attackers works:**

- You remove the specific piece creating threats
- You simplify the position, reducing tactical complications
- You gain time by not having to defend repeatedly
- Your remaining pieces can coordinate better

**The principle:** Attack with pieces, defend by exchanging them. The side with more attacking pieces wants to keep them; the defender wants to trade them.

**Historical note:** This is why quiet players like Petrosian and Karpov were so hard to beat—they would neutralize attacks by exchanging key attacking pieces, then outplay opponents in simpler positions.`,
          highlights: [
            { square: 'g4', color: 'red' },
          ],
          arrows: [
            { from: 'e2', to: 'g4', color: 'green' },
          ],
        },
        {
          id: 'keep-attacking',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 4 7',
          title: 'Keep Pieces When Attacking',
          explanation: `The flip side: **When you're attacking, avoid unnecessary exchanges.**

**Why keep pieces during an attack:**

1. **More attackers = stronger attack:** Each piece adds threats and combinations
2. **Coordination multiplies:** Four pieces attacking create more patterns than two
3. **The opponent must defend more:** Every attacking piece requires defenders
4. **Maintain the initiative:** Trading can give your opponent relief and time

**In this Italian Game position:**

White is building an attack with pieces aimed at the kingside. White should NOT trade bishops on c5 or knights on f6 just because the option exists.

**Instead, White should:**
- Build up with Bg5, Re1, Nd5
- Add more pieces to the attack
- Only trade if it increases the pressure

**The attacking mantra:**

"Bring all your pieces into the attack before trading any of them."

**Exception:** Sometimes trading ONE piece opens decisive lines. But this is a calculated sacrifice, not casual simplification.`,
          arrows: [
            { from: 'c1', to: 'g5', color: 'blue' },
            { from: 'f1', to: 'e1', color: 'blue' },
          ],
        },
        {
          id: 'exchange-decision',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp2pp1/2np1n1p/4p3/1bB1P1P1/2NP1N2/PPP2P1P/R1BQ1RK1 b - g3 0 9',
          title: 'To Exchange or Not?',
          explanation: `Black is slightly cramped in this position. White has just played g4, gaining space. Should Black exchange pieces to relieve the pressure?`,
          correctMoves: ['Bxc3'],
          successMessage: `**Correct!** ...Bxc3 is an excellent exchange. Black trades the cramped bishop for White's knight, and after bxc3, White has doubled c-pawns. Black's position is easier to play—less cramped, with a clearer pawn structure advantage.`,
          failureMessage: 'When cramped, exchanges help! Look for a trade that relieves pressure AND damages White\'s pawn structure.',
          arrows: [
            { from: 'c5', to: 'c3', color: 'green' },
          ],
        },
        {
          id: 'exchange-practice',
          type: 'puzzle',
          fen: 'r1bq1rk1/p1p2ppp/1pnp1n2/2b1p1B1/2B1P3/2NP1N2/PPP1QPPP/R4RK1 w - - 0 10',
          title: 'Strategic Exchange',
          explanation: `White has a very active position with pieces well-placed. Black has some cramped pieces. White can make a strategic exchange that worsens Black's pawn structure. Find it!`,
          correctMoves: ['Bxf6'],
          successMessage: `**Excellent!** Bxf6 forces gxf6 (Qxf6 allows Nd5), giving Black doubled f-pawns and weakening the kingside. Yes, White gives up the bishop for a knight, but the permanent damage to Black's structure is worth it. Black's king position is forever weakened.`,
          failureMessage: 'Look for an exchange that damages Black\'s pawn structure permanently. Which capture would create weaknesses around Black\'s king?',
          arrows: [
            { from: 'c1', to: 'f6', color: 'green' },
          ],
          highlights: [
            { square: 'f6', color: 'red' },
          ],
        },
        {
          id: 'favorable-exchange',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp1nppp/3p4/3Pp1B1/2P5/2N5/PP2BPPP/R2Q1RK1 w - - 0 11',
          title: 'Exchange to Exploit Weakness',
          explanation: `White has a space advantage and Black's knight on e7 is a key defensive piece guarding d5 and f5. Find the exchange that removes this defender and opens lines for White's pieces!`,
          correctMoves: ['Bh4'],
          successMessage: `**Well played!** Bh4 maintains the pressure on the dark squares. The bishop retreats to a strong diagonal, keeping pressure on d8 and preparing to exchange on e7 at the right moment. White avoids trading the bishop for the passive knight on e7 directly—instead, the bishop stays active. White's next moves might include Nd5 or f4 to increase the pressure.`,
          failureMessage: 'Think about which exchange would benefit White the most. How can you maintain pressure while keeping your active pieces?',
          arrows: [
            { from: 'g5', to: 'h4', color: 'green' },
          ],
          highlights: [
            { square: 'h4', color: 'green' },
            { square: 'e7', color: 'yellow' },
          ],
        },
        {
          id: 'exchange-endgame',
          type: 'puzzle',
          fen: 'r2r2k1/pp3ppp/2p1pn2/3R4/3P4/2P2N2/PP3PPP/R5K1 w - - 0 16',
          title: 'Simplify into a Winning Endgame',
          explanation: `White is slightly better due to the more mobile d4 pawn and active rook placement. Material is equal. Find the exchange that transitions into a favorable rook endgame!`,
          correctMoves: ['Rxd8+'],
          successMessage: `**Correct!** Rxd8+ simplifies the position. After ...Rxd8, White has a rook endgame where the d4 pawn is more mobile than Black's e6+c6 pawns. White can play Rd1 to control the d-file and eventually advance d5, creating a passed pawn. The key principle: exchange when the resulting endgame favors you!`,
          failureMessage: 'When you have a structural advantage, simplifying can make it easier to exploit. Which exchange leads to a better endgame for White?',
          arrows: [
            { from: 'd1', to: 'd8', color: 'green' },
          ],
          highlights: [
            { square: 'd8', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'pawn-majority',
      title: 'Pawn Majority',
      description: 'Exploiting numerical pawn advantages on one side of the board',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      tags: ['pawns', 'majority', 'endgame', 'strategy'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'What Is a Pawn Majority?',
          explanation: `A **pawn majority** exists when one side has more pawns than the opponent on a particular section of the board (usually kingside or queenside).

**Historical background:** The strategic concept of pawn majorities was formalized by **François-André Danican Philidor** in the 18th century, who famously declared **"Pawns are the soul of chess."** Philidor understood that pawn structure dictates the flow of the entire game. Later, the great **José Raúl Capablanca** — World Champion from 1921 to 1927 — further refined the theory of exploiting queenside majorities, making it a cornerstone of positional play.

**Why majorities matter:**
- A pawn majority can create a **passed pawn** (a pawn with no opposing pawns to block it)
- A passed pawn ties down enemy pieces to stop it
- In the endgame, a distant passed pawn can be decisive

**Types of majorities:**
- **Queenside majority** — often the most useful, as the king is usually on the kingside
- **Kingside majority** — can support an attack, but the king is nearby to defend against it
- **Central majority** — controls key squares and supports piece activity

Let's see how to recognize and exploit pawn majorities.`,
          highlights: [
            { square: 'a2', color: 'blue' },
            { square: 'b2', color: 'blue' },
            { square: 'c2', color: 'blue' },
            { square: 'd2', color: 'blue' },
          ],
        },
        {
          id: 'queenside-majority',
          type: 'explanation',
          fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2PBP3/P4PPP/RNBQ1RK1 w - - 0 1',
          title: 'The Queenside Majority',
          explanation: `In this position, count the pawns on each side of the board:

**Queenside (a-d files):**
- White: a2, c3, d4 = **3 pawns**
- Black: a7, b7, d5 = **3 pawns**

Wait — actually, let's look more carefully:
- White has pawns on a2, c3, d4, and e3 = **4 pawns** on the a-e files
- Black has pawns on a7, b7, d5, and e6 = **4 pawns** on the a-e files

**Kingside (f-h files):**
- White: f2, g2, h2 = **3 pawns**
- Black: f7, g7, h7 = **3 pawns**

The queenside is balanced here, but the **structure** matters. White's c3+d4 chain is more mobile than Black's d5+e6. White can play c4 to challenge Black's center and potentially create a passed pawn on the c or d file.

**The classic queenside majority strategy:**
1. Advance the majority pawns (b4-b5, c4-c5)
2. Create a passed pawn
3. Force the opponent to deal with it
4. Use the distraction to win elsewhere

**Capablanca's insight:** A queenside pawn majority is especially powerful because the kings are usually castled kingside. The passed pawn is *distant* from the defending king — a huge advantage in endgames!`,
          highlights: [
            { square: 'a2', color: 'green' },
            { square: 'c3', color: 'green' },
            { square: 'd4', color: 'green' },
          ],
          arrows: [
            { from: 'c3', to: 'c4', color: 'green' },
            { from: 'a2', to: 'a4', color: 'yellow' },
          ],
        },
        {
          id: 'queenside-majority-practice',
          type: 'interactive',
          fen: 'r4rk1/pp3ppp/4pn2/8/2PP4/6P1/P4P1P/R3R1K1 w - - 0 1',
          title: 'Advance the Queenside Majority',
          explanation: `White has a clear queenside pawn majority: pawns on a2, c4, d4 vs Black's pawns on a7, b7.

**Your task:** Start advancing the queenside majority! Find the pawn move that begins creating a passed pawn on the queenside. Think about which pawn should advance first.`,
          correctMoves: ['c5', 'd5'],
          successMessage: `**Excellent!** Advancing the queenside majority is the correct plan. Pushing forward starts the process of creating a passed pawn. Black will have to deal with the advancing pawns, and White's queenside majority will become a powerful asset, especially heading into the endgame.`,
          failureMessage: 'White has more pawns on the queenside (a2, c4, d4 vs a7, b7). Advance them! Which pawn push starts creating a passed pawn?',
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'd4', color: 'green' },
            { square: 'a2', color: 'green' },
          ],
          arrows: [
            { from: 'c4', to: 'c5', color: 'green' },
            { from: 'd4', to: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'minority-attack',
          type: 'explanation',
          fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/1PN2NP1/P3PPBP/R1BQ1RK1 w - - 0 1',
          title: 'The Minority Attack: Fewer Pawns, More Damage',
          explanation: `A **minority attack** is a seemingly paradoxical idea: you advance **fewer** pawns against a **larger** group to create weaknesses in the opponent's position.

**The classic example:** In the Carlsbad pawn structure (from the Queen's Gambit), White has 2 queenside pawns (a2, b3) against Black's 3 (a7, b7, c6).

**How the minority attack works:**
1. White plays a2-a4-a5, then b3-b4-b5
2. The b5 pawn attacks Black's c6 pawn
3. After bxc6, Black gets an isolated c-pawn or backward b-pawn
4. These structural weaknesses become permanent targets

**Why it works:**
- The advancing pawns force the defender to make a concession
- Black must capture (creating an isolani) or allow cxb5 (creating a backward pawn)
- Either result gives White a clear target to attack

**Historical note:** The minority attack was perfected in the 1920s-30s by players like **Akiba Rubinstein** and later became a key weapon of **Anatoly Karpov**, who used it with devastating precision in Queen's Gambit structures.

**The key insight:** You don't always need MORE pawns to attack. Sometimes fewer pawns, well advanced, create permanent damage to your opponent's structure.`,
          arrows: [
            { from: 'a2', to: 'a4', color: 'green' },
            { from: 'b3', to: 'b5', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'red' },
            { square: 'b7', color: 'yellow' },
          ],
        },
        {
          id: 'creating-passed-pawns',
          type: 'explanation',
          fen: '8/pp3k2/8/2PP4/8/8/8/4K3 w - - 0 1',
          title: 'Creating Passed Pawns from Majorities',
          explanation: `The ultimate goal of a pawn majority is to create a **passed pawn** — a pawn that has no opposing pawns to block its path to promotion.

**The technique with connected pawns:**

In this position, White has pawns on c5 and d5 against Black's a7 and b7. White's method is:
1. **Advance the unopposed pawn first:** d5-d6 (the d-pawn has no opposing pawn on the d-file)
2. Black cannot stop both: if ...Ke6, then c6 threatens c7; if the king goes to the c-file, the d-pawn advances
3. One pawn will queen

**Critical rule:** When advancing a pawn majority, **push the pawn that has NO opposing pawn in front of it first**. This is called the "candidate" passed pawn.

**Common mistakes:**
- Pushing the wrong pawn first can allow blockading
- Advancing too quickly without king support
- Forgetting about the opponent's counterplay on the other side

**Capablanca's method (simplified):**
1. Identify which pawn is the "candidate" (no direct opposition)
2. Advance it first
3. Use the other pawn(s) as support
4. The candidate becomes a passed pawn

This principle applies whether you have a 2 vs 1, 3 vs 2, or 4 vs 3 majority. Always advance the candidate!`,
          arrows: [
            { from: 'd5', to: 'd6', color: 'green' },
            { from: 'c5', to: 'c6', color: 'yellow' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'c5', color: 'blue' },
          ],
        },
        {
          id: 'majority-in-endgames',
          type: 'explanation',
          fen: '8/pp3kpp/8/3K4/8/PPP5/8/8 w - - 0 1',
          title: 'Pawn Majority in King-and-Pawn Endgames',
          explanation: `Pawn majorities become **most powerful** in king-and-pawn endgames, where there are no pieces to blockade.

**In this position:**
- White has a 3 vs 2 queenside majority (a3, b3, c3 vs a7, b7)
- Black has a 2 vs 0 kingside majority (g7, h7 — but White has no kingside pawns)
- White's king on d5 is actively placed

**White's plan:**
1. Advance the queenside majority: b4, c4, a4, b5, etc.
2. Create a passed pawn on the queenside
3. Black's king must deal with it
4. Meanwhile, White's king may attack Black's kingside pawns

**Why the queenside majority is so strong here:**
- It's a **distant passed pawn** — far from Black's king
- Black cannot stop both the passed pawn AND protect the kingside
- White's king is already centralized

**Practical wisdom:**
- In endgames, always count pawn majorities on each side
- A healthy (unmixed) majority is one where all pawns can advance freely
- A "crippled" majority (with doubled or isolated pawns) may not create a passed pawn
- **Capablanca's rule:** Trade pieces when you have a queenside majority to reach a winning pawn endgame

This is one of the most important positional concepts in chess — master it and your endgame play will improve dramatically!`,
          highlights: [
            { square: 'a3', color: 'green' },
            { square: 'b3', color: 'green' },
            { square: 'c3', color: 'green' },
            { square: 'a7', color: 'red' },
            { square: 'b7', color: 'red' },
          ],
          arrows: [
            { from: 'b3', to: 'b5', color: 'green' },
            { from: 'a3', to: 'a4', color: 'yellow' },
          ],
        },
        {
          id: 'majority-puzzle',
          type: 'puzzle',
          fen: '8/5kpp/8/6P1/5P2/8/6K1/8 w - - 0 1',
          title: 'Advance the Majority!',
          explanation: `White has a kingside pawn majority: f4 and g5 against Black's g7 and h7. White's king is on g2 and Black's king is on f7.

**Your task:** Start the process of creating a passed pawn. Remember the principle: advance the pawn with no direct opposition first!

Which pawn should White push?`,
          correctMoves: ['f5'],
          successMessage: `**Correct!** f5 is the right advance. The f-pawn has no opposing pawn on the f-file, making it the "candidate." After f5, White threatens f6, which would force ...gxf6 gxf6, creating a passed f-pawn. Or if Black plays ...g6, then f6 creates a passed g-pawn after fxg7. The candidate pawn goes first!`,
          failureMessage: 'Remember the key principle: advance the pawn that has NO opposing pawn directly in front of it. Which pawn is the "candidate" passed pawn here?',
          highlights: [
            { square: 'f4', color: 'green' },
            { square: 'g5', color: 'blue' },
          ],
          arrows: [
            { from: 'f4', to: 'f5', color: 'green' },
          ],
        },
        {
          id: 'crippled-majority',
          type: 'puzzle',
          fen: '8/8/4kpp1/8/2K1PP2/8/8/8 w - - 0 1',
          title: 'Healthy vs Crippled Majority',
          explanation: `Both sides have a 2 vs 2 pawn structure, but White's pawns are healthier. White's e4 and f4 pawns can advance together, while Black's f6 and g6 pawns are slightly less flexible. Find the advance that creates a passed pawn!`,
          correctMoves: ['e5+'],
          successMessage: `**Excellent!** e5+! is the key breakthrough. After ...fxe5 fxe5, White has a passed e-pawn supported by the king. If Black plays ...Kd7, then e6 followed by Kd5 wins. The healthy pawn majority creates a passed pawn more easily than a crippled one. This illustrates why pawn structure quality matters as much as pawn quantity!`,
          failureMessage: 'Think about which pawn has no direct opposition. Advance the candidate pawn to create a passer!',
          arrows: [
            { from: 'e4', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'f4', color: 'blue' },
          ],
        },
      ],
    },
  ],
};
