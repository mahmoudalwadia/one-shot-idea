import { Course } from './types';

export const openingsCourse: Course = {
  id: 'openings',
  title: 'Opening Principles',
  description: 'Learn popular openings and the ideas behind them',
  icon: '📖',
  color: '#3b82f6',
  lessons: [
    {
      id: 'italian-game',
      title: 'The Italian Game',
      description: 'A classical opening focusing on rapid development',
      difficulty: 'beginner',
      estimatedMinutes: 12,
      tags: ['opening', 'e4', 'italian'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
          title: 'The Italian Game',
          explanation: `The **Italian Game** is one of the oldest recorded chess openings, with games dating back to the 1500s in Italy. It arises after the moves **1.e4 e5 2.Nf3 Nc6 3.Bc4**.

This opening embodies classical chess principles:
- **Rapid development** of pieces toward the center
- **Control of key central squares** (d5 and f7)
- **Early king safety** through quick castling

The Bishop on c4 is particularly important - it targets the **f7 square**, which is only defended by the Black king. This is often called Black's "Achilles heel" in the opening.

The Italian Game leads to positions rich in tactical and strategic ideas, making it perfect for players learning fundamental chess concepts.`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'f7', color: 'red' },
            { square: 'e4', color: 'blue' },
            { square: 'e5', color: 'blue' },
          ],
        },
        {
          id: 'move-1',
          type: 'interactive',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Start the Italian',
          explanation: `Let's build the Italian Game move by move. Begin with the most popular first move in chess - controlling the center and freeing your pieces!

The move **1.e4** is called the "King's Pawn Opening" and has been the choice of attacking players throughout history. Bobby Fischer famously said "Best by test!"`,
          correctMoves: ['e4'],
          successMessage: 'Excellent! 1.e4 - the King\'s Pawn opening. This move controls the d5 and f5 squares while opening lines for your Queen and Bishop.',
          arrows: [
            { from: 'e4', to: 'd5', color: 'green' },
            { from: 'e4', to: 'f5', color: 'green' },
          ],
        },
        {
          id: 'move-2',
          type: 'interactive',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'Develop with Attack',
          explanation: `Black has responded with **1...e5**, mirroring your central control. Now you need to develop a piece while simultaneously putting pressure on Black's e5 pawn.

Remember the principle: **develop with a threat** when possible!`,
          correctMoves: ['Nf3'],
          successMessage: 'Perfect! 2.Nf3 develops your Knight to its most natural square, attacks the e5 pawn, and prepares to castle kingside.',
          arrows: [
            { from: 'f3', to: 'e5', color: 'yellow' },
          ],
          highlights: [
            { square: 'f3', color: 'green' },
          ],
        },
        {
          id: 'move-3',
          type: 'interactive',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
          title: 'The Italian Bishop',
          explanation: `Black defended the e5 pawn with **2...Nc6**. Now it's time for the defining move of the Italian Game - place your Bishop on its most aggressive diagonal!

This move creates immediate pressure on Black's position and sets up potential tactics against f7.`,
          correctMoves: ['Bc4'],
          successMessage: 'Bc4! The Italian Game begins. Your Bishop eyes the weak f7 pawn - the only square defended solely by the Black king.',
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'giuoco-piano',
          type: 'explanation',
          fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Giuoco Piano - The Quiet Game',
          explanation: `When Black responds with **3...Bc5**, we reach the **Giuoco Piano** (Italian for "Quiet Game"). Despite its name, this position offers rich strategic and tactical possibilities!

Both sides have developed naturally, and now White typically continues with:

**Main plans for White:**
- **c3 followed by d4** - building a strong pawn center
- **O-O** - getting the king to safety and connecting rooks
- **b4** (the Evans Gambit) - a sharp pawn sacrifice for rapid development

**Key ideas:**
- The battle for the d4 square is central to this opening
- Both bishops are actively placed on strong diagonals
- White often aims for a central pawn break with d4

This is solid, principled chess that rewards understanding over memorization.`,
          arrows: [
            { from: 'c2', to: 'c3', color: 'green' },
            { from: 'd2', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'd4', color: 'blue' },
            { square: 'c4', color: 'green' },
            { square: 'c5', color: 'yellow' },
          ],
        },
        {
          id: 'two-knights',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Two Knights Defense',
          explanation: `If Black plays **3...Nf6** instead (the Two Knights Defense), the game becomes much sharper! Black counterattacks the e4 pawn immediately rather than developing quietly.

White's most aggressive response is **4.Ng5**, directly threatening the f7 pawn with two pieces! This leads to wild tactical complications.

**After 4.Ng5:**
- The main line continues 4...d5 5.exd5, and now Black has choices
- 5...Na5 (the "Wilkes-Barre" variation) offers the b5 square
- 5...Nxd5?? is a famous trap: 6.Nxf7! wins

**Important warning:** The Two Knights requires precise knowledge from Black. One slip can be fatal!

The character of this opening is completely different from the Giuoco Piano - sharp, tactical, and unforgiving.`,
          arrows: [
            { from: 'f3', to: 'g5', color: 'red' },
            { from: 'g5', to: 'f7', color: 'red' },
            { from: 'c4', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'f6', color: 'yellow' },
          ],
        },
        {
          id: 'fried-liver',
          type: 'explanation',
          fen: 'r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6',
          title: 'The Fried Liver Attack',
          explanation: `One of the most famous attacking sequences in chess is the **Fried Liver Attack**! After 4.Ng5 d5 5.exd5 Nxd5??, White plays the shocking **6.Nxf7!**

This knight sacrifice is devastating:
- The King must capture: 6...Kxf7
- White plays 7.Qf3+, attacking the Knight on d5 and the King
- Black's position collapses under the pressure

**Why "Fried Liver"?**
The Italian name "Fegatello" means "little liver" - Black's position is cooked like a piece of liver!

**The lesson:** Never play 5...Nxd5 against the Italian Game. Instead, 5...Na5 or 5...b5 are the correct defenses.

This trap has claimed countless victims at all levels - make sure you're not one of them!`,
          arrows: [
            { from: 'g5', to: 'f7', color: 'red' },
            { from: 'd1', to: 'f3', color: 'yellow' },
            { from: 'f3', to: 'd5', color: 'yellow' },
            { from: 'f3', to: 'f7', color: 'yellow' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'd5', color: 'red' },
          ],
        },
        {
          id: 'practice-italian',
          type: 'puzzle',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
          title: 'Italian Practice',
          explanation: `You've developed well in the Italian Game. Now it's time to get your king to safety! What's the best move?`,
          correctMoves: ['O-O'],
          successMessage: 'Correct! Castling kingside gets your king safe and connects your rooks. This is a key part of the Italian Game setup.',
          failureMessage: 'Think about king safety. What move protects your king and activates your rook?',
          highlights: [
            { square: 'e1', color: 'yellow' },
            { square: 'g1', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'sicilian-defense',
      title: 'The Sicilian Defense',
      description: 'The most popular response to 1.e4',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      tags: ['opening', 'e4', 'sicilian'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'The Sicilian Defense',
          explanation: `The **Sicilian Defense** (1.e4 c5) is the most popular and theoretically important response to 1.e4. It's the choice of fighting players who want to win with Black! Named because it was analyzed by the Sicilian priest Pietro Carrera in 1617, the Sicilian has deep roots - the oldest recorded game with this defense dates to 1594.

**Why is the Sicilian so special?**

Unlike 1...e5 which leads to symmetric positions, the Sicilian creates **asymmetric imbalances** from move one:
- Black fights for the d4 square with the c-pawn
- After a future ...cxd4, Black gets a **semi-open c-file** for counterplay
- Black accepts slightly less central control for active piece play

**Statistics speak:** The Sicilian scores better for Black than any other defense against 1.e4 at the highest levels. World Champions Kasparov, Fischer, and Anand all relied on it heavily.

The price? Black must be ready for **sharp, tactical play** where both sides have chances.`,
          arrows: [
            { from: 'c5', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'c5', color: 'green' },
            { square: 'd4', color: 'blue' },
            { square: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'open-sicilian',
          type: 'explanation',
          fen: 'rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3',
          title: 'The Open Sicilian',
          explanation: `The main line "Open Sicilian" begins with **2.Nf3** followed by **3.d4**. This is how most strong players handle the Sicilian with White.

After **3...cxd4 4.Nxd4**, the position transforms:

**White's advantages:**
- More space and central control
- Flexible piece development
- The powerful Knight on d4

**Black's advantages:**
- The semi-open c-file for rook activity
- A potential ...d5 pawn break
- Counterplay on the queenside

The resulting positions are **dynamic and double-edged**. Both sides must play accurately or face a quick defeat!

From here, Black has many systems to choose from: the Najdorf, Dragon, Scheveningen, Sveshnikov, and more - each with its own character.`,
          arrows: [
            { from: 'a8', to: 'c8', color: 'green' },
            { from: 'c8', to: 'c2', color: 'green' },
          ],
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'c8', color: 'green' },
          ],
        },
        {
          id: 'dragon-intro',
          type: 'explanation',
          fen: 'rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
          title: 'The Dragon Variation',
          explanation: `The **Sicilian Dragon** is one of the most exciting and dangerous openings in chess! Black plays **...g6** and **...Bg7**, placing the Bishop on the long diagonal like a fire-breathing dragon!

**The Dragon Bishop on g7:**
- Controls the a1-h8 diagonal
- Puts pressure on White's queenside
- Supports a future ...d5 break

**Typical Dragon battle:**
- White often castles queenside and attacks with h4-h5
- Black counterattacks on the c-file and b-file
- Both sides race to checkmate first!

**Warning:** The Yugoslav Attack (Be3, Qd2, O-O-O, h4-h5) is extremely dangerous for Black. The Dragon requires precise knowledge and nerves of steel!

This opening is not for the faint-hearted - games are often decided by who attacks faster!`,
          arrows: [
            { from: 'g7', to: 'a1', color: 'yellow' },
            { from: 'h2', to: 'h5', color: 'red' },
          ],
          highlights: [
            { square: 'g7', color: 'green' },
            { square: 'a1', color: 'yellow' },
          ],
        },
        {
          id: 'najdorf-intro',
          type: 'explanation',
          fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
          title: 'The Najdorf Variation',
          explanation: `The **Najdorf** (5...a6) is the most popular Sicilian at the highest level. This modest-looking pawn move is incredibly flexible!

**What does 5...a6 accomplish?**
- **Prevents Nb5** - No Knight jump attacking c7
- **Prevents Bb5** - No pin on the Knight
- **Prepares ...b5** - Queenside expansion
- **Keeps all options open** - Black can choose the setup later

**Champions who loved the Najdorf:**
- Bobby Fischer called it the "Rolls Royce of openings"
- Garry Kasparov made it his main weapon
- Magnus Carlsen uses it in must-win situations

**Key variations after 6.Be3 (English Attack):**
- 6...e5 - Fighting for space
- 6...e6 - The Scheveningen setup
- 6...Ng4 - Immediately challenging the Bishop

The Najdorf offers a lifetime of study and rewards deep understanding of chess dynamics.`,
          arrows: [
            { from: 'a6', to: 'b5', color: 'green' },
          ],
          highlights: [
            { square: 'a6', color: 'green' },
            { square: 'b5', color: 'blue' },
            { square: 'b5', color: 'red' },
          ],
        },
        {
          id: 'anti-sicilians',
          type: 'explanation',
          fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2',
          title: 'Anti-Sicilian Systems',
          explanation: `Not every White player wants to enter the theoretical jungle of the Open Sicilian! Many opt for **Anti-Sicilian** systems that avoid mainline theory.

**Common Anti-Sicilians:**

**1. Closed Sicilian (2.Nc3 + g3 + Bg2)**
- Positional approach
- White builds slowly with f4
- Less sharp but still offers winning chances

**2. Alapin (2.c3)**
- Prepares d4 without Nf3
- Leads to different pawn structures
- Popular at club level

**3. Grand Prix Attack (2.Nc3 + f4)**
- Aggressive from the start
- Aims for a kingside attack
- Can catch Sicilian players off-guard

**4. Smith-Morra Gambit (2.d4 cxd4 3.c3)**
- Sacrifices a pawn for development
- Very dangerous if Black doesn't know theory

If you play 1.e4, decide in advance how you'll handle the Sicilian!`,
          arrows: [
            { from: 'c3', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'c3', color: 'yellow' },
          ],
        },
        {
          id: 'sveshnikov-intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pp3ppp/2np4/4p3/3NP1n1/2N1B3/PPP2PPP/R2QKB1R w KQkq - 0 8',
          title: 'The Sveshnikov Variation',
          explanation: `The **Sveshnikov Variation** (also called the Lasker-Pelikan) is one of the most theoretically important Sicilians, arising after **1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5**.

**The bold idea:**
Black pushes **...e5**, accepting a backward d6 pawn and a hole on d5 in exchange for active piece play and control of the center.

**Key features:**
- The d5 square is weak for Black, but White must work to exploit it
- Black gets a strong pawn on e5 and active pieces
- The Bishop often develops to b4 or e7-g5

**Historical significance:**
Evgeny Sveshnikov devoted his career to proving this variation was playable. Despite initial skepticism, it became a top-level weapon used by Kramnik, Leko, and Carlsen.

The Sveshnikov teaches that **dynamic compensation** can outweigh static weaknesses!`,
          arrows: [
            { from: 'e5', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'd5', color: 'red' },
            { square: 'd6', color: 'yellow' },
          ],
        },
        {
          id: 'najdorf-english-attack',
          type: 'explanation',
          fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N1B3/PPP2PPP/R2QKB1R b KQkq - 1 6',
          title: 'Najdorf: The English Attack',
          explanation: `The **English Attack** (6.Be3) is one of the most dangerous weapons against the Najdorf at the highest level. It was popularized by English grandmasters like Nigel Short and John Nunn in the 1980s.

**White's plan:**
- 6.Be3, 7.f3, 8.Qd2, 9.O-O-O, 10.g4 - a full-scale kingside assault!
- The King castles queenside for safety while the pawns storm forward

**Why it's so effective:**
- White gets a clear attacking plan with minimal theory
- The f3-g4-h4 pawn storm is very dangerous
- Black must know precise defensive resources

**Black's main defenses:**
- **6...e5** - Closing the center, leading to strategic play
- **6...e6** - The Scheveningen hybrid, flexible
- **6...Ng4** - Immediately challenging the Bishop

**Kasparov's contribution:** Kasparov faced the English Attack many times and developed key defensive ideas with ...b5, ...Bb7, and ...Nbd7.`,
          arrows: [
            { from: 'f2', to: 'f3', color: 'red' },
            { from: 'g2', to: 'g4', color: 'red' },
            { from: 'h2', to: 'h4', color: 'red' },
          ],
          highlights: [
            { square: 'e3', color: 'green' },
          ],
        },
        {
          id: 'sicilian-practice',
          type: 'puzzle',
          fen: 'rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 5',
          title: 'Sicilian Development',
          explanation: `You're White in a typical Open Sicilian position. What's the most natural developing move that prepares Be2 and O-O while also supporting the e4 pawn?`,
          correctMoves: ['Be2', 'Bc4', 'f3'],
          successMessage: 'Good choice! Developing the bishop is the right idea. Be2 is the most flexible, Bc4 is aggressive (Sozin/Velimirovic), and f3 supports e4.',
          failureMessage: 'Think about developing your pieces. Which piece should move to complete your kingside development?',
        },
        {
          id: 'sicilian-puzzle-najdorf',
          type: 'puzzle',
          fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
          title: 'Choose Your Weapon',
          explanation: `You're White facing the Najdorf Sicilian (5...a6). What is the most aggressive developing move that prepares the English Attack setup with f3, Qd2, and O-O-O?`,
          correctMoves: ['Be3'],
          successMessage: 'Correct! 6.Be3 begins the English Attack - one of the most dangerous systems against the Najdorf. Now f3, Qd2, and O-O-O follow!',
          failureMessage: 'Think about an aggressive setup involving queenside castling. Which Bishop move prepares f3 and Qd2?',
          arrows: [
            { from: 'c1', to: 'e3', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'london-system',
      title: 'The London System',
      description: 'A solid system that works against almost anything',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      tags: ['opening', 'd4', 'london', 'system'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
          title: 'The London System',
          explanation: `The **London System** is one of the most reliable and easy-to-learn openings for White. It starts with **1.d4** and follows a consistent setup regardless of what Black plays! Named after the great London tournaments of 1922, where strong players like Reti and Tartakower championed this system, it has stood the test of time.

**Why is the London so popular?**
- **Low memorization** - same setup against almost everything
- **Solid structure** - hard for Black to create weaknesses
- **Clear plans** - easy to understand what you're doing
- **Flexible** - can lead to quiet or aggressive play

**Key features:**
- Pawn on d4 controls the center
- Bishop to f4 BEFORE playing e3 (crucial!)
- Pawns form a pyramid: c3-d4-e3
- Knights go to f3 and d2
- Bishop stays on d3 or goes to e2

Top players like Magnus Carlsen have used the London successfully at the highest level!`,
          highlights: [
            { square: 'd4', color: 'green' },
          ],
        },
        {
          id: 'move-bf4',
          type: 'interactive',
          fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3',
          title: 'The London Bishop',
          explanation: `This is the **critical moment** in the London System! You MUST develop your dark-squared Bishop BEFORE playing e3.

If you play e3 first, your Bishop gets trapped behind the pawns. The Bishop on f4 is the soul of the London!`,
          correctMoves: ['Bf4'],
          successMessage: 'Perfect! Bf4 is THE signature move of the London. This Bishop is powerfully placed - active, safe, and controlling key dark squares.',
          failureMessage: 'Remember the key rule: Bishop before e3! Put your dark-squared Bishop on its best diagonal.',
          arrows: [
            { from: 'f4', to: 'b8', color: 'green' },
          ],
          highlights: [
            { square: 'f4', color: 'green' },
          ],
        },
        {
          id: 'london-pyramid',
          type: 'explanation',
          fen: 'r1bqkb1r/pppnpppp/5n2/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R w KQkq - 0 5',
          title: 'The London Pyramid',
          explanation: `Now you can safely play **e3**, creating the famous "London Pyramid" structure.

**The Pyramid setup:**
- **Pawns on c3-d4-e3** - solid triangular formation
- **Bishop on f4** - actively placed outside the pawn chain
- **Knights on f3 and d2** - supporting the center
- **Light Bishop on d3 or e2** - flexible placement

**Why is this so effective?**
- Very hard for Black to attack
- White has no weaknesses
- Clear plan: complete development, castle, then play for c4 or e4

**Typical middlegame plans:**
- Ne5 to establish an outpost
- c4 to challenge Black's center
- Qe2 + e4 pawn break when ready

The London gives you a playable position with minimal risk!`,
          highlights: [
            { square: 'c3', color: 'blue' },
            { square: 'd4', color: 'green' },
            { square: 'e3', color: 'blue' },
            { square: 'f4', color: 'green' },
          ],
        },
        {
          id: 'london-vs-kings-indian',
          type: 'explanation',
          fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/3P1B2/4PN2/PPP2PPP/RN1QKB1R w KQkq - 0 5',
          title: 'London vs King\'s Indian Setup',
          explanation: `One of the London's strengths is its effectiveness against the King's Indian setup (...Nf6, ...g6, ...Bg7).

**White's plan against ...g6 and ...Bg7:**
- The Bishop on f4 is perfectly placed against the fianchetto
- Black's Bishop on g7 is somewhat blocked by the d4 pawn
- White can play h3 to prevent ...Nh5 attacking the Bishop

**Key setup:**
- Complete development with Bd3, O-O, c3
- Consider Ne5 to establish a strong outpost
- If Black plays ...Nh5, simply retreat Bh2

**Important:** Don't be tempted to trade your London Bishop for Black's Knight. The Bishop is a key piece in this system!`,
          arrows: [
            { from: 'f4', to: 'h2', color: 'yellow' },
            { from: 'f3', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'f4', color: 'green' },
            { square: 'e5', color: 'blue' },
          ],
        },
        {
          id: 'london-attack',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2PP1B2/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 8',
          title: 'London Attacking Ideas',
          explanation: `While the London is solid, it can also be dangerous when White gets an attack!

**Aggressive plans:**
- **Kingside attack** - h4-h5 if Black castles kingside
- **Central break** - e4 opening the position
- **Piece sacrifice** - Bxh7+ or Ng5 in certain positions

**When to attack:**
- If Black's pieces are passive
- If Black weakens their kingside with ...h6 or ...g6
- After White completes development

**Key attacking piece:** The Bishop on f4 often jumps to g5 or h6 to create threats against Black's King.

Even a "solid" opening like the London can lead to brilliant attacks when the position calls for it!`,
          arrows: [
            { from: 'f4', to: 'g5', color: 'red' },
            { from: 'h2', to: 'h4', color: 'red' },
          ],
        },
        {
          id: 'london-queenside',
          type: 'explanation',
          fen: 'r2q1rk1/pppnbppp/4bn2/3p4/3P1B2/2NBPN2/PP3PPP/R2QK2R w KQ - 4 8',
          title: 'Queenside Castling Plans',
          explanation: `While the London typically castles kingside, there are positions where **queenside castling** can be very effective!

**When to consider O-O-O:**
- If Black has committed to a kingside structure (like ...g6, ...Bg7)
- When you want to launch h4-h5 pawn storms
- If the center is closed and a kingside attack is promising

**The attacking setup:**
- Qe2 or Qc2 to connect rooks
- O-O-O to get the Rook on the d-file
- h4-h5 to open lines against Black's King
- g4 to support the pawn storm

**Key warning:**
Queenside castling is riskier because the c3 pawn can become a target. Only choose this plan when you have a clear attacking idea!

**Example plan:** After O-O-O, play Kb1 for safety, then h4-h5 to rip open Black's kingside.`,
          arrows: [
            { from: 'e1', to: 'c1', color: 'green' },
            { from: 'h2', to: 'h4', color: 'red' },
            { from: 'h4', to: 'h5', color: 'red' },
          ],
          highlights: [
            { square: 'c1', color: 'green' },
            { square: 'h4', color: 'red' },
          ],
        },
        {
          id: 'london-practice',
          type: 'puzzle',
          fen: 'rnbqkb1r/pp2pppp/5n2/2pp4/3P1B2/5N2/PPP1PPPP/RN1QKB1R w KQkq - 0 4',
          title: 'London Practice',
          explanation: `Black has played ...c5, challenging your center. What's the typical London response to solidify your pawn structure?`,
          correctMoves: ['e3', 'c3'],
          successMessage: 'Correct! Either e3 or c3 supports the d4 pawn and completes your pyramid structure. This is the London way - solid and reliable!',
          failureMessage: 'Think about your pawn structure. How do you support the d4 pawn while building your pyramid?',
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'c5', color: 'red' },
          ],
        },
        {
          id: 'london-puzzle-ne5',
          type: 'puzzle',
          fen: 'r1bq1rk1/pppnbppp/4pn2/3p4/3P1B2/3BPN2/PPP2PPP/RN1Q1RK1 w - - 6 8',
          title: 'London Outpost',
          explanation: `You've completed the London setup with Bd3, Bf4, and O-O. Black has developed solidly. What is the ideal outpost move for your Knight that centralizes powerfully?`,
          correctMoves: ['Ne5'],
          successMessage: 'Excellent! Ne5 is the dream London move! The Knight on e5 is a powerful outpost, controlling key squares and supporting potential kingside attacks.',
          failureMessage: 'Think about the best central square for your Knight. Which square gives it maximum influence?',
          arrows: [
            { from: 'f3', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'queens-gambit',
      title: "The Queen's Gambit",
      description: 'The classic d4 opening offering a pawn sacrifice',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['opening', 'd4', 'queens-gambit'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
          title: "The Queen's Gambit",
          explanation: `The **Queen's Gambit** (1.d4 d5 2.c4) is one of the oldest and most respected openings in chess, first analyzed in the Gottingen manuscript around 1490!

**Is it a real gambit?**
Not really! Unlike the King's Gambit where White truly sacrifices material, the Queen's Gambit allows White to regain the pawn easily - despite its name, it's not a true gambit since White can usually recover the pawn. It's more of a temporary "loan" than a sacrifice.

**The strategic idea:**
White challenges Black's central d5 pawn with the c4 pawn. Black must decide:
- **Take** the pawn (Queen's Gambit Accepted)
- **Defend** the pawn with ...e6 or ...c6
- **Counter** in the center

**Why is this so effective?**
- White gains space and central control
- Black must react to White's initiative
- Leads to rich strategic middlegames

The Queen's Gambit has been the choice of World Champions from Lasker to Carlsen!`,
          arrows: [
            { from: 'c4', to: 'd5', color: 'yellow' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'accepted',
          type: 'explanation',
          fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
          title: "Queen's Gambit Accepted",
          explanation: `If Black captures with **2...dxc4**, we have the **Queen's Gambit Accepted (QGA)**.

**White's typical continuation:**
- 3.e3 (or 3.Nf3) followed by Bxc4
- White regains the pawn with a pleasant position

**What White gets:**
- Strong pawn center (d4 vs nothing)
- Active piece development
- Easy play and clear plans

**What Black gets:**
- Quick development
- Solid structure after ...e6
- The position is playable but White has a slight edge

**Key principle for Black:** Don't try to hold the c4 pawn! After ...b5? White plays a4 and Black's queenside becomes weak.

The QGA is considered solid for Black but gives White free development and central control.`,
          arrows: [
            { from: 'f1', to: 'c4', color: 'green' },
          ],
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'd4', color: 'green' },
          ],
        },
        {
          id: 'declined',
          type: 'explanation',
          fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
          title: "Queen's Gambit Declined",
          explanation: `**2...e6** is the Queen's Gambit Declined (QGD) - Black's most classical response. By supporting d5, Black maintains the central tension.

**The "problem" with ...e6:**
The light-squared Bishop on c8 is blocked by the e6 pawn. This Bishop often becomes passive - a key strategic theme of the QGD!

**White's main plans:**
- **Exchange Variation** (cxd5 exd5) - minority attack on queenside
- **5.Bg5 pin** - putting pressure on the Knight
- **Build-up with Bd3, Nf3, O-O**

**Black's counterplay:**
- ...dxc4 followed by ...b5 (capturing space)
- ...Nbd7 and ...c5 counter in the center
- ...Nf6-e4 to trade off pieces

The QGD leads to deep strategic battles where small advantages matter. It's a favorite of positional players!`,
          arrows: [
            { from: 'c8', to: 'b7', color: 'red' },
          ],
          highlights: [
            { square: 'c8', color: 'red' },
            { square: 'e6', color: 'yellow' },
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'slav',
          type: 'explanation',
          fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
          title: 'The Slav Defense',
          explanation: `**2...c6** is the **Slav Defense** - a clever alternative that defends d5 without blocking the c8 Bishop!

**Why is this significant?**
- Black's light Bishop can develop to f5 or g4
- This solves the "bad bishop" problem of the QGD
- Black keeps a solid pawn structure

**Main variations:**
- **Semi-Slav** (after ...e6) - complex strategic play
- **Pure Slav** (...Bf5) - solid and reliable
- **Chebanenko Slav** (...a6) - very solid, anti-theoretical

**Key idea for Black:**
After 3.Nf3 Nf6 4.Nc3, Black often plays 4...dxc4, and after 5.a4 Bf5! - the Bishop is actively placed outside the pawn chain.

World Champions Euwe, Alekhine, and Kramnik all relied heavily on the Slav!`,
          arrows: [
            { from: 'c8', to: 'f5', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'green' },
            { square: 'c8', color: 'blue' },
            { square: 'f5', color: 'green' },
          ],
        },
        {
          id: 'tartakower',
          type: 'explanation',
          fen: 'rnbq1rk1/p1p1bppp/1p2pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 6',
          title: 'The Tartakower Variation',
          explanation: `The **Tartakower Variation** (also called Tartakower-Makogonov-Bondarevsky) is one of the most solid and reliable systems in the QGD, arising after **5...h6 6.Bh4 b6**.

**The idea behind ...b6:**
- Black fianchettoes the "problem Bishop" to b7
- This solves the QGD's main issue: the passive c8 Bishop
- The Bishop on b7 controls the a8-h1 diagonal
- Combined with ...Nbd7, Black gets a flexible setup

**Why it works:**
- Named after **Savielly Tartakower**, a brilliant and creative grandmaster
- Karpov used it extensively in his World Championship matches
- The position is very solid with clear plans for both sides

**Typical plans:**
- Black plays ...c5 at the right moment to free the position
- ...Nbd7-f8-e6 is a common maneuver
- The b7 Bishop becomes very powerful in the endgame

The Tartakower shows that the QGD "bad bishop" problem has elegant solutions!`,
          arrows: [
            { from: 'c8', to: 'b7', color: 'green' },
          ],
          highlights: [
            { square: 'b6', color: 'green' },
            { square: 'b7', color: 'blue' },
          ],
        },
        {
          id: 'qg-practice-1',
          type: 'interactive',
          fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
          title: 'Start the Queen\'s Gambit',
          explanation: `Black has played 1...d5. How do you begin the Queen's Gambit?`,
          correctMoves: ['c4'],
          successMessage: 'Correct! 2.c4 - the Queen\'s Gambit! You challenge Black\'s d5 pawn and fight for central control.',
          failureMessage: 'Think about challenging Black\'s center. What pawn move puts pressure on d5?',
          highlights: [
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'qg-practice-2',
          type: 'puzzle',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 2 4',
          title: 'QGD Development',
          explanation: `You're White in a typical Queen's Gambit Declined position. What's the most common developing move that pins the Knight and increases pressure?`,
          correctMoves: ['Bg5', 'cxd5', 'e3'],
          successMessage: 'Good choice! Bg5 is the mainline, creating the famous QGD pin. cxd5 and e3 are also playable alternatives.',
          failureMessage: 'Consider your Bishop. Which move develops it actively while creating threats?',
        },
        {
          id: 'qg-puzzle-exchange',
          type: 'puzzle',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R b KQkq - 3 4',
          title: 'QGD: Break Free',
          explanation: `You're Black in the QGD after 4.Bg5. Your Bishop on c8 is blocked by the e6 pawn. What developing move solidly defends d5 while preparing to castle?`,
          correctMoves: ['Be7'],
          successMessage: 'Correct! 4...Be7 is the classical main line of the QGD. It breaks the pin on the Knight and prepares kingside castling. This has been played by every World Champion!',
          failureMessage: 'Think about breaking the pin on your f6 Knight while preparing to castle. Which piece move does both?',
          arrows: [
            { from: 'f8', to: 'e7', color: 'green' },
          ],
          highlights: [
            { square: 'e7', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'caro-kann',
      title: 'The Caro-Kann Defense',
      description: 'A solid defense prioritizing pawn structure',
      difficulty: 'intermediate',
      estimatedMinutes: 10,
      tags: ['opening', 'e4', 'caro-kann'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'The Caro-Kann Defense',
          explanation: `The **Caro-Kann Defense** (1.e4 c6) is one of the most solid and respected responses to 1.e4. Named after two players who analyzed it - Horatio Caro (a British-born player in Berlin) and Marcus Kann (an Austrian player) - who published their analysis in 1886 in the German chess magazine *Bruderschaft*. It has been a favorite of World Champions seeking reliable positions.

**The key idea:**
Black prepares ...d5 with pawn support, challenging White's center while maintaining a solid structure.

**Why choose the Caro-Kann?**
- **Rock-solid structure** - few weaknesses for White to target
- **No "bad bishop"** - unlike the French, the c8 Bishop can develop actively
- **Clear plans** - ...d5, ...Bf5, ...e6, ...Nd7 setup
- **Low risk** - hard for White to get a crushing attack

**Famous Caro-Kann players:**
- Anatoly Karpov (12th World Champion)
- Vishwanathan Anand (15th World Champion)
- Fabiano Caruana (World Championship challenger)

If you value solidity over dynamism, the Caro-Kann is your opening!`,
          arrows: [
            { from: 'c6', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'green' },
            { square: 'd5', color: 'blue' },
          ],
        },
        {
          id: 'main-line',
          type: 'explanation',
          fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
          title: 'The Main Line Setup',
          explanation: `After **1.e4 c6 2.d4 d5**, we reach the main tabiya (key position) of the Caro-Kann.

**White's main options:**
- **3.Nc3** or **3.Nd2** - Classical variations
- **3.e5** - Advance Variation (gaining space)
- **3.exd5** - Exchange Variation (simplified)
- **3.f3** - Fantasy Variation (aggressive)

**What makes this position special:**
Black's pawn structure is perfectly sound. The c6 pawn supports d5, and unlike the French Defense (1.e4 e6), Black's light-squared Bishop is NOT blocked.

This flexibility is the Caro-Kann's main strength - Black can develop the Bishop to f5 or g4 before playing ...e6!`,
          arrows: [
            { from: 'c8', to: 'f5', color: 'green' },
            { from: 'c8', to: 'g4', color: 'yellow' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'c6', color: 'green' },
            { square: 'c8', color: 'blue' },
          ],
        },
        {
          id: 'advance',
          type: 'explanation',
          fen: 'rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
          title: 'Advance Variation',
          explanation: `The **Advance Variation** (3.e5) gives White more space but creates a fixed pawn structure.

**Black's strategic plan:**
1. **Attack the chain base** - Play ...c5 to strike at d4
2. **Develop the Bishop first** - ...Bf5 before ...e6
3. **Undermine with ...f6** - Challenge e5 directly

**Key position after 3...Bf5 4.Nf3 e6:**
- White has space but a fixed center
- Black will play ...c5, ...Nc6, ...Qb6 targeting d4 and b2
- The game becomes a battle between White's space and Black's solid structure

**Tip:** Always develop ...Bf5 BEFORE ...e6 in the Advance Variation!`,
          arrows: [
            { from: 'c6', to: 'c5', color: 'green' },
            { from: 'c8', to: 'f5', color: 'green' },
            { from: 'f7', to: 'f6', color: 'yellow' },
          ],
          highlights: [
            { square: 'e5', color: 'yellow' },
            { square: 'd4', color: 'red' },
          ],
        },
        {
          id: 'classical',
          type: 'explanation',
          fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3',
          title: 'Classical Variation',
          explanation: `The **Classical Variation** (3.Nc3 dxe4 4.Nxe4) leads to one of the most important positions in the Caro-Kann.

**After 4.Nxe4, Black's key choices:**
- **4...Bf5** - The main line, developing the Bishop actively
- **4...Nd7** - Modern approach, flexible
- **4...Nf6** - Sharp, leads to tactical play after 5.Nxf6+

**Why 4...Bf5 is so good:**
- Develops outside the pawn chain
- Controls important light squares
- Prepares ...e6 with a good position for the Bishop

**The Capablanca System:**
After 4...Bf5 5.Ng3 Bg6 6.h4!?, White gains space on the kingside. Black plays ...h6, and a strategic battle ensues.`,
          arrows: [
            { from: 'c8', to: 'f5', color: 'green' },
          ],
          highlights: [
            { square: 'e4', color: 'yellow' },
            { square: 'f5', color: 'green' },
          ],
        },
        {
          id: 'advance-detail',
          type: 'explanation',
          fen: 'rn1qkbnr/pp2pppp/2p2b2/3pP3/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4',
          title: 'Advance Variation: The Short System',
          explanation: `In the Advance Variation after **3.e5 Bf5**, the most important modern system is the **Short Variation** (named after Nigel Short), continuing with **4.Nf3 e6 5.Be2**.

**White's plan in the Short System:**
- Develop quickly with Be2, O-O, and then build up with c3-b4
- The idea is simple but effective: slow queenside expansion
- Avoid overcommitting in the center

**Black's counter-strategy:**
- **...c5** remains the key break, attacking d4
- **...Nc6** adds pressure on d4 and e5
- **...Qb6** is a multipurpose move: attacks b2 and pressures d4
- **...Nh6-f7** reroutes the Knight to support ...f6

**Critical tip:** In the Advance Caro-Kann, Black should always look for ...c5 and ...f6 to undermine White's pawn chain. Never let White's center stand unchallenged!

The Advance Variation leads to clear strategic battles that reward understanding over memorization.`,
          arrows: [
            { from: 'c6', to: 'c5', color: 'green' },
            { from: 'f7', to: 'f6', color: 'yellow' },
          ],
          highlights: [
            { square: 'f5', color: 'green' },
            { square: 'e5', color: 'red' },
            { square: 'd4', color: 'red' },
          ],
        },
        {
          id: 'caro-practice',
          type: 'interactive',
          fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3',
          title: 'Classical Caro-Kann',
          explanation: `You're Black in the Classical Caro-Kann. White has played 3.Nc3. What's the thematic capture that opens the position?`,
          correctMoves: ['dxe4'],
          successMessage: 'Correct! 3...dxe4 is the main line. After 4.Nxe4, you\'ll develop your Bishop to f5 - the key idea of the Caro-Kann!',
          failureMessage: 'In the Classical Caro-Kann, Black captures on e4 to open the position. What capture makes sense?',
          highlights: [
            { square: 'd5', color: 'yellow' },
            { square: 'e4', color: 'red' },
          ],
        },
        {
          id: 'caro-bishop',
          type: 'puzzle',
          fen: 'rnbqkbnr/pp2pppp/2p5/8/3Pn3/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4',
          title: 'Caro-Kann Bishop',
          explanation: `After 3...dxe4 4.Nxe4, where should Black's light-squared Bishop go?`,
          correctMoves: ['Bf5'],
          successMessage: 'Perfect! 4...Bf5 is the hallmark of the Caro-Kann. The Bishop is beautifully placed outside the pawn chain!',
          failureMessage: 'Think about the Caro-Kann\'s main advantage over the French Defense. Where does the Bishop go?',
          arrows: [
            { from: 'c8', to: 'f5', color: 'green' },
          ],
        },
        {
          id: 'caro-puzzle-advance',
          type: 'puzzle',
          fen: 'rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 1 4',
          title: 'Advance Caro-Kann Challenge',
          explanation: `You're White in the Advance Caro-Kann after 3.e5 Bf5. What natural developing move prepares castling while controlling key central squares?`,
          correctMoves: ['Nf3'],
          successMessage: 'Correct! 4.Nf3 is the main move, developing the Knight to its best square while supporting e5 and preparing to castle. The Short system continues with Be2.',
          failureMessage: 'Think about natural development. Which Knight move develops toward the center while supporting your e5 pawn?',
          arrows: [
            { from: 'g1', to: 'f3', color: 'green' },
          ],
          highlights: [
            { square: 'f3', color: 'green' },
            { square: 'e5', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'french-defense',
      title: 'The French Defense',
      description: 'Counter-attacking defense against 1.e4',
      difficulty: 'intermediate',
      estimatedMinutes: 10,
      tags: ['opening', 'e4', 'french'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'The French Defense',
          explanation: `The **French Defense** (1.e4 e6) is a fighting defense that leads to rich strategic battles. It's named after a correspondence match between Paris and London in 1834, where a group of French players employed this defense to great effect.

**The core idea:**
Black prepares ...d5 to challenge White's center, accepting a slightly cramped position for solid central control.

**Characteristic features:**
- **Pawn chains** - The French creates locked pawn structures
- **The "French Bishop"** - The c8 Bishop is often blocked by e6
- **Counter-attacking** - Black strikes at White's center with ...c5

**The "problem":**
After 2.d4 d5, Black's light-squared Bishop is hemmed in by the e6 pawn. Solving this "bad Bishop" is a key theme!

**Famous French players:** Viktor Korchnoi, Tigran Petrosian, Evgeny Bareev`,
          arrows: [
            { from: 'e6', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'e6', color: 'green' },
            { square: 'c8', color: 'red' },
          ],
        },
        {
          id: 'advance-french',
          type: 'explanation',
          fen: 'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
          title: 'Advance Variation',
          explanation: `The **Advance Variation** (3.e5) is one of the most principled responses. White gains space and creates a pawn chain.

**Black's strategic plan:**
1. **Attack the chain base** - ...c5 is essential!
2. **Develop the Knight** - ...Nc6 pressures d4
3. **The Queen's role** - ...Qb6 attacks b2 and d4

**Key middlegame themes:**
- Black plays on the queenside and in the center
- White plays on the kingside with f4-f5 ideas
- The "French Bishop" can go to a6 in some lines

**Critical tip:** The move ...c5 is almost always correct - it challenges White's pawn chain at its base!`,
          arrows: [
            { from: 'c7', to: 'c5', color: 'green' },
            { from: 'd8', to: 'b6', color: 'yellow' },
          ],
          highlights: [
            { square: 'e5', color: 'yellow' },
            { square: 'd4', color: 'red' },
            { square: 'c5', color: 'green' },
          ],
        },
        {
          id: 'winawer',
          type: 'explanation',
          fen: 'rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4',
          title: 'Winawer Variation',
          explanation: `The **Winawer Variation** (3.Nc3 Bb4) is one of the sharpest lines in the French. Black immediately pins the Knight!

**After 4.e5 (the main line):**
- 4...c5 attacks the center
- 4...Ne7 prepares ...Nf5
- 4...Qd7 is a flexible retreat

**Key strategic themes:**
- Black often gives up the Bishop pair for structural advantages
- After ...Bxc3+ bxc3, White has doubled pawns but open lines
- The position becomes very complex and unbalanced

**Winawer players need:**
- Precise knowledge of sharp variations
- Willingness to play complex positions
- Understanding of pawn structure nuances

The Winawer is the choice of French players who want maximum fighting chances!`,
          arrows: [
            { from: 'b4', to: 'c3', color: 'red' },
            { from: 'c7', to: 'c5', color: 'green' },
          ],
          highlights: [
            { square: 'b4', color: 'green' },
            { square: 'c3', color: 'yellow' },
          ],
        },
        {
          id: 'classical-french',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4',
          title: 'Classical French',
          explanation: `The **Classical French** (3...Nf6) is a more traditional approach. Black develops naturally and waits to see White's plan.

**Main continuations for White:**
- **4.Bg5** - Pins the Knight, very popular
- **4.e5** - Steinitz Variation, gains space
- **4.Bd3** - Solid development

**After 4.Bg5 Be7 5.e5 Nfd7:**
This is the main tabiya of the Classical French. Black has a cramped but solid position with clear plans:
- ...c5 to attack the center
- ...f6 to challenge e5
- ...O-O and ...Nc6 to complete development

The Classical French rewards patient, positional play.`,
          arrows: [
            { from: 'c1', to: 'g5', color: 'yellow' },
            { from: 'c7', to: 'c5', color: 'green' },
          ],
          highlights: [
            { square: 'f6', color: 'green' },
          ],
        },
        {
          id: 'tarrasch-french',
          type: 'explanation',
          fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR b KQkq - 1 3',
          title: 'Tarrasch Variation: 3.Nd2',
          explanation: `The **Tarrasch Variation** (3.Nd2) is named after **Siegbert Tarrasch**, one of the strongest players of the late 19th century. It's a solid alternative to 3.Nc3.

**Why 3.Nd2 instead of 3.Nc3?**
- Avoids the sharp Winawer (3...Bb4)
- The Knight on d2 supports e4 without blocking the c-pawn
- White keeps the option of c3 to support d4
- Leads to quieter, more strategic positions

**Main lines after 3.Nd2:**
- **3...c5** - The most popular, challenging d4
- **3...Nf6** - Solid development
- **3...Nc6** - Guimard Variation, flexible

**After 3...c5 4.exd5 exd5 5.Ngf3:**
An isolated Queen's Pawn (IQP) position often arises, where White has dynamic piece play against Black's isolated d5 pawn.

The Tarrasch is the choice of French players who want to avoid sharp theoretical duels.`,
          arrows: [
            { from: 'd2', to: 'e4', color: 'green' },
            { from: 'c2', to: 'c3', color: 'yellow' },
          ],
          highlights: [
            { square: 'd2', color: 'green' },
          ],
        },
        {
          id: 'exchange-french',
          type: 'explanation',
          fen: 'rnbqkbnr/ppp2ppp/4p3/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
          title: 'Exchange Variation: 3.exd5',
          explanation: `The **Exchange Variation** (3.exd5 exd5) is the simplest response to the French, releasing the central tension immediately.

**After 3.exd5 exd5:**
- The position becomes symmetrical
- Both sides have open diagonals for their Bishops
- Black's "bad Bishop" problem is solved since e6 is gone

**Why play the Exchange?**
- Some players use it to aim for a draw with White
- It's a low-risk approach with minimal theory
- Can still lead to interesting play with correct handling

**White's main ideas:**
- **Bd3, Ne2, Bf4** - Active development
- **O-O, c3, Qb3** - Pressure on d5 and b7
- Target the slight weakness of Black's d5 pawn

**Black's resources:**
- The position is very equal
- Active piece play compensates for any small disadvantage
- The open e-file provides counterplay

**Historical note:** The Exchange French has a reputation for being drawish, but Kasparov showed it could be dangerous with creative play!`,
          highlights: [
            { square: 'd5', color: 'yellow' },
            { square: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'french-interactive-develop',
          type: 'interactive',
          fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'Build the French Structure',
          explanation: `You're White against the French Defense (1.e4 e6). What is the most natural move to build your pawn center and prepare for the main battle?`,
          correctMoves: ['d4'],
          successMessage: 'Correct! 2.d4 builds the classical pawn center. Now Black will play ...d5 and the real fight begins!',
          failureMessage: 'Think about building a strong pawn center. What move complements your e4 pawn?',
          arrows: [
            { from: 'd2', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'e4', color: 'green' },
          ],
        },
        {
          id: 'french-practice',
          type: 'puzzle',
          fen: 'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
          title: 'French Counter-Attack',
          explanation: `You're Black in the Advance French. White has played 3.e5. What's the most important move to challenge White's center?`,
          correctMoves: ['c5'],
          successMessage: 'Excellent! 3...c5 attacks the base of White\'s pawn chain. This is THE key move in the French Defense!',
          failureMessage: 'Remember: attack the base of the pawn chain! What move targets d4?',
          arrows: [
            { from: 'c7', to: 'c5', color: 'green' },
            { from: 'c5', to: 'd4', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'kings-indian',
      title: "King's Indian Defense",
      description: 'An aggressive hypermodern defense',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['opening', 'd4', 'kings-indian'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
          title: "King's Indian Defense",
          explanation: `The **King's Indian Defense** is one of the most dynamic and fighting defenses against 1.d4. It's the opening of attackers! The "Indian" defenses (1...Nf6) were named by early hypermodern players, and the King's Indian was popularized in the 1940s-50s by David Bronstein and Isaac Boleslavsky, later championed by Bobby Fischer and Garry Kasparov.

**The hypermodern concept:**
Instead of fighting for the center immediately with pawns, Black lets White build a big center, then attacks it!

**Black's setup:**
- **...Nf6, ...g6, ...Bg7** - Fianchetto the Bishop
- **...O-O, ...d6** - Complete development
- **...e5 or ...c5** - Strike at the center!

**Why play the King's Indian?**
- Creates **unbalanced positions** where both sides have chances
- The Bishop on g7 is a **monster** on the long diagonal
- Leads to exciting **opposite-side attacks**

**World Champions who loved it:** Garry Kasparov, Bobby Fischer, Mikhail Tal

Warning: You must be comfortable playing sharp, tactical positions!`,
          arrows: [
            { from: 'g7', to: 'a1', color: 'green' },
          ],
          highlights: [
            { square: 'g6', color: 'green' },
            { square: 'g7', color: 'blue' },
          ],
        },
        {
          id: 'classical-ki',
          type: 'explanation',
          fen: 'rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R b KQ - 0 6',
          title: 'Classical Variation',
          explanation: `The **Classical Variation** arises after **1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2**.

**The battlefield is set:**
- White has a powerful pawn center (d4+e4)
- Black has a solid kingside setup

**Now comes the critical decision:**
Black plays **6...e5!** - the defining move of the King's Indian!

**After 7.O-O:**
- **7...Nc6** - Classical main line, complex play
- **7...Nbd7** - Old main line, flexible
- **7...exd4** - Exchange variation

**The typical King's Indian battle:**
- White attacks on the queenside with c5, b4-b5
- Black attacks on the kingside with f5, g5, Rf7-g7

This is chess at its most exciting - opposite-side attacks where one move can decide the game!`,
          arrows: [
            { from: 'c4', to: 'c5', color: 'blue' },
            { from: 'f7', to: 'f5', color: 'red' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'e4', color: 'yellow' },
            { square: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'mar-del-plata',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1ppbp/2np2p1/4P3/2PP3n/2N1BN2/PP2BPPP/R2QK2R b KQ - 0 9',
          title: 'Mar del Plata Attack',
          explanation: `The **Mar del Plata** is the most famous King's Indian structure, named after the Argentine city where key games were played.

**After 6...e5 7.O-O Nc6 8.d5 Ne7:**
Black has a cramped position but clear attacking plans!

**Black's kingside attack:**
1. **...Nh5** - Knight heading to f4
2. **...f5** - Pawn storm begins
3. **...Nf6-h5** - More pieces join
4. **...g5, ...Rf7, ...Rg7** - Doubling rooks!

**White's queenside attack:**
1. **c5** - Opening the c-file
2. **b4-b5** - Pawn avalanche
3. **Nc4-a5** - Knight invasion

**The race is ON!** Whoever breaks through first usually wins. These games often end in brilliant attacks and sacrifices.`,
          arrows: [
            { from: 'f7', to: 'f5', color: 'red' },
            { from: 'g6', to: 'g5', color: 'red' },
            { from: 'b2', to: 'b4', color: 'blue' },
          ],
          highlights: [
            { square: 'h4', color: 'green' },
            { square: 'f5', color: 'red' },
          ],
        },
        {
          id: 'samisch-ki',
          type: 'explanation',
          fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR b KQkq - 0 5',
          title: 'Sämisch Variation',
          explanation: `The **Sämisch Variation** (f3) is White's most aggressive setup against the King's Indian.

**White's plan:**
- Build a huge center with Be3, Qd2
- Castle queenside (O-O-O)
- Attack on the kingside with g4-h4-h5

**Why f3?**
- Supports e4 solidly
- Prepares Be3 without ...Ng4
- Sets up the "Sämisch attacking scheme"

**Black's counter-strategies:**
- **...c5** - Challenge d4 immediately (main line)
- **...e5** - Standard King's Indian break
- **...Nc6 + ...a6 + ...Rb8** - Benko-style queenside play

**Warning for Black:** The Sämisch is VERY dangerous if Black plays passively. Active counterplay is essential!`,
          arrows: [
            { from: 'g2', to: 'g4', color: 'red' },
            { from: 'h2', to: 'h4', color: 'red' },
          ],
          highlights: [
            { square: 'f3', color: 'yellow' },
            { square: 'c5', color: 'green' },
          ],
        },
        {
          id: 'bayonet-attack',
          type: 'explanation',
          fen: 'r1bq1rk1/pppn1pbp/3p2p1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 9',
          title: 'The Bayonet Attack',
          explanation: `The **Bayonet Attack** (9.b4) is White's most modern and dangerous weapon against the King's Indian Classical, popularized by Kramnik in the 1990s.

**The idea behind 9.b4:**
- White launches an immediate queenside pawn storm
- b4-b5 threatens to undermine Black's control of d5
- c5 break opens lines on the queenside
- White's attack arrives faster than in traditional systems

**Why it's so effective:**
- Black's typical kingside attack with ...f5 is slow
- White's queenside play is very concrete and forcing
- The b4-b5 advance can disrupt Black's Knight maneuvers

**Black's defenses:**
- **...f5** - The traditional break, but must be timed perfectly
- **...a5** - Trying to slow White's queenside advance
- **...Nh5** followed by ...Nf4 - Active piece play

**Kramnik's contribution:** Vladimir Kramnik's mastery of the Bayonet Attack nearly drove the King's Indian out of top-level chess in the early 2000s. Only Radjabov and later Nakamura found resources for Black.`,
          arrows: [
            { from: 'b4', to: 'b5', color: 'blue' },
            { from: 'c4', to: 'c5', color: 'blue' },
          ],
          highlights: [
            { square: 'b4', color: 'blue' },
            { square: 'b5', color: 'yellow' },
          ],
        },
        {
          id: 'ki-f5-break',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2pbp/2np2p1/3Pp2n/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 9',
          title: 'The ...f5 Break',
          explanation: `The **...f5** pawn break is the soul of the King's Indian kingside attack. Understanding when and how to play it is essential.

**When to play ...f5:**
- After ...Nh5 to support the f5 advance
- When White has closed the center with d5
- When your pieces are ready to support the attack

**What ...f5 achieves:**
- Opens the f-file for the Rook
- Creates threats against White's King
- The f4 square becomes available for the Knight
- Pawns on f5 and e5 create a powerful pawn duo

**Typical attacking sequence:**
1. **...f5** - The break
2. **...f4** - Advancing further, cramping White
3. **...g5** - Supporting f4 and preparing ...g4
4. **...Rf7-g7** or **...Bf6-h4** - Bringing more pieces to the attack

**Warning:** If you play ...f5 at the wrong moment, White can capture (exf5) and use the e4 square. Timing is everything!`,
          arrows: [
            { from: 'f7', to: 'f5', color: 'red' },
            { from: 'f5', to: 'f4', color: 'red' },
          ],
          highlights: [
            { square: 'f5', color: 'red' },
            { square: 'h5', color: 'green' },
          ],
        },
        {
          id: 'ki-practice',
          type: 'interactive',
          fen: 'rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R b KQ - 0 6',
          title: "King's Indian Break",
          explanation: `You're Black in a Classical King's Indian position. White has built their center. What's the thematic King's Indian pawn break?`,
          correctMoves: ['e5'],
          successMessage: 'Perfect! 6...e5 is THE move of the King\'s Indian! You challenge White\'s center and activate your dark-squared Bishop.',
          failureMessage: 'The King\'s Indian is about challenging the center. What central pawn break opens up your g7 Bishop?',
          arrows: [
            { from: 'g7', to: 'c3', color: 'green' },
          ],
        },
        {
          id: 'ki-practice-nh5',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp2pbp/2np1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 2 9',
          title: 'Kingside Attack',
          explanation: `You're Black in a Mar del Plata King's Indian. The center is closed (d5). Your Knight is ready to begin the kingside attack. What is the key move to prepare ...f5?`,
          correctMoves: ['Nh5'],
          successMessage: 'Excellent! Nh5 prepares the critical ...f5 pawn break, which is the heart of the King\'s Indian kingside attack. The storm is coming!',
          failureMessage: 'Think about the kingside pawn break ...f5. What Knight move prepares this advance by vacating f6?',
          arrows: [
            { from: 'f7', to: 'f5', color: 'red' },
          ],
          highlights: [
            { square: 'f5', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'ruy-lopez',
      title: 'The Ruy Lopez',
      description: 'The Spanish Game - a timeless classic',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['opening', 'e4', 'ruy-lopez', 'spanish'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
          title: 'The Ruy Lopez',
          explanation: `The **Ruy Lopez** (Spanish Game) is one of the most important openings in chess history. Named after the Spanish priest Ruy Lopez de Segura, who analyzed it in his 1561 book *Libro del Ajedrez*, it is one of the oldest and most studied openings, played at the highest level for over 500 years!

**After 1.e4 e5 2.Nf3 Nc6 3.Bb5:**
White develops with tempo, threatening to capture on c6 and then win the e5 pawn (though this doesn't quite work tactically).

**Why Bb5?**
- Puts pressure on the Knight defending e5
- Develops rapidly toward castling
- Creates long-term strategic pressure

**The truth:** White CAN'T actually win the e5 pawn by force (4.Bxc6 dxc6 5.Nxe5?? Qd4! wins). But the pressure on c6 shapes Black's entire setup.

**The Ruy Lopez leads to:**
- Rich strategic battles
- Deep positional understanding
- Complex pawn structures

Every serious player should understand the Ruy Lopez!`,
          arrows: [
            { from: 'b5', to: 'c6', color: 'yellow' },
            { from: 'f3', to: 'e5', color: 'yellow' },
          ],
          highlights: [
            { square: 'b5', color: 'green' },
            { square: 'c6', color: 'yellow' },
            { square: 'e5', color: 'yellow' },
          ],
        },
        {
          id: 'morphy-defense',
          type: 'explanation',
          fen: 'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
          title: 'The Morphy Defense',
          explanation: `**3...a6** (Morphy Defense) is the most popular response, named after American genius Paul Morphy.

**What does ...a6 accomplish?**
- Asks the Bishop "What are your intentions?"
- Gains time for Black's development
- Prepares ...b5 if needed

**White's main responses:**
- **4.Ba4** - Maintains the tension (main line)
- **4.Bxc6** - Exchange Variation (simplified)

**After 4.Ba4 Nf6 5.O-O:**
Black faces a critical choice that defines the entire opening:
- **5...Be7** - Closed Defense (main line)
- **5...Nxe4** - Open Defense (sharp!)
- **5...b5 6.Bb3 Bc5** - Arkhangelsk Variation

The Morphy Defense leads to the richest positions in the Ruy Lopez.`,
          arrows: [
            { from: 'b5', to: 'a4', color: 'green' },
            { from: 'b7', to: 'b5', color: 'yellow' },
          ],
          highlights: [
            { square: 'a6', color: 'green' },
          ],
        },
        {
          id: 'closed-ruy',
          type: 'explanation',
          fen: 'r1bqk2r/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 b kq - 3 8',
          title: 'Closed Ruy Lopez',
          explanation: `The **Closed Ruy Lopez** is the main line, reached after:
1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3

**White's setup:**
- Pawns on c3 and d4 control the center
- Bishop on b3 eyes f7
- Knight often goes to d2 then f1-g3

**Black's typical plan:**
- **...O-O, ...Na5** - Exchange the strong Bb3
- **...c5** - Strike at White's center
- **...Nc6-d7-b6** - Maneuver toward d7/b6

**Key strategic ideas:**
- The battle for d4/d5 is crucial
- White often plays d4 to open the center
- Black aims for ...f5 breaks when ready

This is deep, strategic chess that rewards understanding over memorization.`,
          arrows: [
            { from: 'c6', to: 'a5', color: 'green' },
            { from: 'c7', to: 'c5', color: 'yellow' },
          ],
          highlights: [
            { square: 'b3', color: 'yellow' },
            { square: 'a5', color: 'green' },
          ],
        },
        {
          id: 'berlin-defense',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Berlin Defense',
          explanation: `The **Berlin Defense** (3...Nf6) has become extremely popular since Vladimir Kramnik used it to dethrone Kasparov in 2000!

**After 4.O-O Nxe4:**
The critical line continues 5.d4 Nd6 6.Bxc6 dxc6 7.dxe5 Nf5 8.Qxd8+ Kxd8

**The "Berlin Wall" endgame:**
- Black loses castling rights
- But the position is rock-solid
- Very hard for White to break through

**Why is it so effective?**
- Removes queens early, reducing White's attacking chances
- Black's structure is sound despite the king position
- Even top players struggle to win against it

**The downside:** Some players find it boring. But if you want a reliable drawing weapon as Black, the Berlin is unmatched!`,
          arrows: [
            { from: 'f6', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'f6', color: 'green' },
            { square: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'exchange-ruy',
          type: 'explanation',
          fen: 'r1bqkbnr/1ppp1ppp/p1B5/4p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4',
          title: 'Exchange Variation: 4.Bxc6',
          explanation: `The **Exchange Variation** (4.Bxc6 dxc6) is a strategically rich line where White trades the Bishop for the Knight early.

**What White gains:**
- Black has doubled c-pawns (c6 and c7 or c5)
- White has a superior pawn structure for the endgame
- The e5 pawn can become a target

**What Black gains:**
- The **Bishop pair** - two Bishops in an open position
- Active piece play and open lines
- The d-file and f-file can be useful

**Bobby Fischer's contribution:**
Fischer famously played the Exchange Variation many times, particularly with the plan of 5.O-O f6!? followed by a kingside pawn storm. His idea was to reach favorable endgames where the doubled pawns are a lasting weakness.

**Key strategic lesson:** The Exchange Ruy Lopez is a masterclass in the battle between structure (White's better pawns) and dynamics (Black's Bishop pair). It's one of the purest strategic contests in chess.`,
          arrows: [
            { from: 'b5', to: 'c6', color: 'red' },
          ],
          highlights: [
            { square: 'c6', color: 'red' },
            { square: 'c7', color: 'yellow' },
          ],
        },
        {
          id: 'marshall-attack',
          type: 'explanation',
          fen: 'r1bq1rk1/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 b - - 3 8',
          title: 'The Marshall Attack',
          explanation: `The **Marshall Attack** is one of the most famous gambits in chess history! After the Closed Ruy Lopez moves, Black plays the shocking **8...d5!?**, sacrificing a pawn for a ferocious attack.

**The Marshall Gambit (8...d5):**
- Named after **Frank Marshall**, who supposedly kept this idea secret for years before unleashing it against Capablanca in 1918
- Black sacrifices the d5 pawn: 9.exd5 Nxd5, and after ...Bd6, ...Qh4, Black gets a devastating kingside attack

**Why is it so dangerous?**
- Black gets open lines (e-file, diagonals) toward White's King
- The Bishop pair and active pieces create constant threats
- White must defend precisely or face a mating attack
- Even with best play, White must return material

**Modern status:**
- The Marshall has been analyzed to incredible depth
- Despite 100+ years of theory, it remains fully playable
- Top GMs like Aronian and Caruana play it regularly
- White players often avoid it with 8.a4 (Anti-Marshall)

The Marshall Attack shows that a well-prepared sacrifice can create lifelong compensation!`,
          arrows: [
            { from: 'd7', to: 'd5', color: 'red' },
            { from: 'd8', to: 'h4', color: 'red' },
          ],
          highlights: [
            { square: 'd5', color: 'red' },
          ],
        },
        {
          id: 'ruy-practice',
          type: 'interactive',
          fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
          title: 'Ruy Lopez Response',
          explanation: `You're Black facing the Ruy Lopez. What's the most popular response that questions the Bishop?`,
          correctMoves: ['a6'],
          successMessage: 'Correct! 3...a6 (the Morphy Defense) is the main line. You ask the Bishop where it wants to go!',
          failureMessage: 'The most common move challenges the Bishop. What pawn move gains time?',
          arrows: [
            { from: 'b5', to: 'a4', color: 'yellow' },
          ],
        },
        {
          id: 'ruy-practice-castle',
          type: 'puzzle',
          fen: 'r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5',
          title: 'Ruy Lopez: King Safety',
          explanation: `You're White in the Ruy Lopez after 4.Ba4 Nf6. What is the most important move for White that prepares for all major variations?`,
          correctMoves: ['O-O'],
          successMessage: 'Correct! 5.O-O is the main move, getting the King safe and preparing Re1. This move is the gateway to all major Ruy Lopez systems - the Closed, Open, Marshall, and more!',
          failureMessage: 'Think about king safety. What move protects your King and prepares to activate your Rook?',
          highlights: [
            { square: 'e1', color: 'yellow' },
            { square: 'g1', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'english-opening',
      title: 'The English Opening',
      description: 'A flexible flank opening with many transpositions',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['opening', 'c4', 'english'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1',
          title: 'The English Opening',
          explanation: `The **English Opening** (1.c4) is the fourth most popular first move, named because English master Howard Staunton frequently employed 1.c4 in the 1840s, particularly in his famous 1843 match against Saint-Amant.

**What makes 1.c4 special?**
- Controls the d5 square without committing the d-pawn
- Extremely **flexible** - can transpose to many openings
- Avoids heavy theoretical battles of 1.e4 or 1.d4

**1.c4 can become:**
- **Queen's Gambit** - if d4 is played later
- **Reversed Sicilian** - after 1...e5
- **Symmetrical English** - after 1...c5
- **Pure English systems** - original setups

**Style of play:**
The English often leads to strategic battles where piece placement and pawn structures matter more than specific move orders.

Top players like Magnus Carlsen and Fabiano Caruana frequently employ 1.c4!`,
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'd5', color: 'blue' },
          ],
        },
        {
          id: 'reversed-sicilian',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2',
          title: 'Reversed Sicilian',
          explanation: `After **1.c4 e5**, White has a **Reversed Sicilian** - like playing the Sicilian Defense as White with an extra tempo!

**White's typical setup:**
- **Nc3, g3, Bg2** - Fianchetto setup
- **Nf3, d3, O-O** - Solid development
- **e3 and d4** - Central pawn break when ready

**Why this is pleasant for White:**
- Sicilian structures favor the player with extra time
- White has a safe, flexible position
- Long-term pressure on d5

**Key plans:**
- Play for d4 when well-prepared
- Pressure the d5 square with pieces
- Kingside attack with f4 in some lines

The Reversed Sicilian gives White a lasting pull without theoretical risk.`,
          arrows: [
            { from: 'f1', to: 'g2', color: 'green' },
            { from: 'g2', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'yellow' },
            { square: 'd5', color: 'blue' },
          ],
        },
        {
          id: 'symmetrical',
          type: 'explanation',
          fen: 'rnbqkbnr/pp1ppppp/8/2p5/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2',
          title: 'Symmetrical English',
          explanation: `**1.c4 c5** leads to the Symmetrical English - both sides mirror each other!

**Main approaches:**
- **2.Nc3 Nc6 3.g3** - Fianchetto system
- **2.Nf3 Nc6 3.d4** - Opens the position (Maroczy-like)
- **2.g3 g6** - Pure symmetry, subtle maneuvering

**Typical pawn structures:**
- **Hedgehog** - Black plays ...a6, ...b6, ...d6, ...e6
- **Maroczy Bind** - White plays c4 + e4, cramping Black
- **Pure symmetry** - Strategic chess where small advantages matter

**Key strategic themes:**
- Control of d5 vs d4
- Piece activity over material
- Pawn breaks (...b5 or ...d5 for Black, d4 or b4 for White)

The Symmetrical English rewards deep positional understanding!`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'c5', color: 'green' },
          ],
        },
        {
          id: 'botvinnik-system',
          type: 'explanation',
          fen: 'r1bqkb1r/pp1ppppp/2n2n2/2p5/2P1P3/2N5/PP1P1PPP/R1BQKBNR w KQkq - 0 4',
          title: 'Botvinnik System',
          explanation: `The **Botvinnik System** is an aggressive English setup where White plays both c4 and e4, building a massive center! Named after World Champion **Mikhail Botvinnik**, who used it extensively.

**The Botvinnik setup:**
- Pawns on c4 and e4 control the center
- g3 and Bg2 complete the fianchetto
- Nge2 (not Nf3!) supports both d4 and f4
- d3 holds the center together

**Why Nge2 instead of Nf3?**
- The Knight on e2 can go to f4 or d4
- It supports a future f4 advance
- Keeps the g-file clear for the fianchettoed Bishop

**Key plans:**
- f4 advance for kingside attack
- d4 break to dominate the center
- Rb1 + b4 for queenside expansion

**Modern practitioners:** Kasparov used the Botvinnik System to devastating effect, winning many brilliant games with the central pawn duo.`,
          arrows: [
            { from: 'g1', to: 'e2', color: 'green' },
            { from: 'f2', to: 'f4', color: 'yellow' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'e4', color: 'green' },
          ],
        },
        {
          id: 'hedgehog',
          type: 'explanation',
          fen: 'rn1qkb1r/pb1p1ppp/1p2pn2/2p5/2P5/2N2NP1/PP1PPPBP/R1BQK2R w KQkq - 0 6',
          title: 'The Hedgehog Formation',
          explanation: `The **Hedgehog** is one of the most fascinating pawn structures that arises from the English Opening. Black builds a compact, flexible position.

**Black's Hedgehog setup:**
- Pawns on a6, b6, d6, e6 (all on the 6th rank)
- Pieces behind the pawns, ready to spring forward
- The position looks cramped but is full of latent energy

**Why "Hedgehog"?**
Like a hedgehog, the position looks small and defensive but has sharp spines! Black waits for the right moment to break out with ...b5 or ...d5.

**Key breaks for Black:**
- **...b5** - Queenside expansion
- **...d5** - Central break, often winning
- **...e5** - Less common but possible

**White's challenge:**
Despite having more space, White must be careful:
- Premature advances can backfire
- Black's compact position is very hard to crack
- One wrong move and Black's pieces explode into activity

The Hedgehog teaches patience and timing - critical skills for every chess player!`,
          highlights: [
            { square: 'a6', color: 'green' },
            { square: 'b6', color: 'green' },
            { square: 'd6', color: 'green' },
            { square: 'e6', color: 'green' },
          ],
        },
        {
          id: 'english-nf6',
          type: 'explanation',
          fen: 'rnbqkb1r/pppppp1p/5np1/8/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 1 3',
          title: 'English vs King\'s Indian Setup',
          explanation: `After **1.c4 Nf6 2.Nc3 g6**, Black sets up a King's Indian formation. This is one of the most common responses to the English.

**White's options:**
- **3.e4** - Transposing to the King's Indian with colors reversed
- **3.g3** - Pure English, fianchetto setup
- **3.d4** - Transposing to mainline 1.d4 theory

**The pure English approach (3.g3):**
- White fianchettoes both sides: g3-Bg2 and often b3-Bb2
- The double fianchetto gives tremendous diagonal control
- Play revolves around the d5 square

**Key strategic themes:**
- Control of d5 is White's primary objective
- Black aims for ...e5 and ...d6 (King's Indian style)
- The g2-Bishop and d5 outpost are White's main trumps

This flexible approach avoids heavy King's Indian theory while maintaining all of White's advantages.`,
          arrows: [
            { from: 'g2', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'blue' },
            { square: 'g6', color: 'yellow' },
          ],
        },
        {
          id: 'english-interactive',
          type: 'interactive',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Start the English',
          explanation: `Let's play the English Opening! Instead of the common 1.e4 or 1.d4, what flank pawn move defines the English Opening?`,
          correctMoves: ['c4'],
          successMessage: '1.c4! The English Opening! You control d5 from the flank and keep maximum flexibility for your future plans.',
          failureMessage: 'The English Opening starts with a flank pawn controlling d5. Which pawn move is that?',
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
          ],
        },
        {
          id: 'english-practice',
          type: 'puzzle',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 0 3',
          title: 'English Development',
          explanation: `You're White in the Reversed Sicilian. What's the most flexible developing move that prepares Bg2?`,
          correctMoves: ['g3'],
          successMessage: 'Correct! g3 prepares the fianchetto Bg2, creating a powerful diagonal toward d5. This is the main English setup.',
          failureMessage: 'Think about developing your light-squared Bishop to its most powerful diagonal. What prepares Bg2?',
          arrows: [
            { from: 'f1', to: 'g2', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'scandinavian',
      title: 'The Scandinavian Defense',
      description: "An immediate challenge to White's e4 pawn",
      difficulty: 'beginner',
      estimatedMinutes: 8,
      tags: ['opening', 'e4', 'scandinavian'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'The Scandinavian Defense',
          explanation: `The **Scandinavian Defense** (1.e4 d5), also called the "Center Counter", is one of the oldest recorded openings, mentioned in the Gottingen manuscript around 1490. It earned the name "Scandinavian" because it was especially popular among Nordic players.

**The immediate challenge:**
Black strikes at the center right away, forcing White to make a decision about the e4 pawn.

**After 2.exd5:**
Black has two main approaches:
- **2...Qxd5** - Recapture with the Queen (main line)
- **2...Nf6** - Modern/Icelandic Gambit style

**Why play the Scandinavian?**
- **Easy to learn** - same ideas in most variations
- **Solid positions** - Black gets a playable middlegame
- **Surprise value** - opponents may not know it well
- **No bad Bishop** - unlike the French or Caro-Kann

**The downside:** After 2...Qxd5 3.Nc3, the Queen must move again, giving White a tempo lead.

Despite this, the Scandinavian remains popular at all levels!`,
          arrows: [
            { from: 'd5', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'e4', color: 'red' },
          ],
        },
        {
          id: 'queen-scandi',
          type: 'explanation',
          fen: 'rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3',
          title: "Queen's Scandinavian",
          explanation: `After **2...Qxd5 3.Nc3**, Black's Queen must retreat. Where she goes defines the variation!

**Main Queen retreats:**
- **Qa5** - Most popular, keeps pressure on e1-a5 diagonal
- **Qd6** - Solid, supports ...e5 later
- **Qd8** - Very solid but passive

**After 3...Qa5 4.d4:**
Black develops with ...Nf6, ...Bf5 or ...Bg4, ...e6, ...c6.

**Key strategic points:**
- Black's position is solid but slightly cramped
- The c8 Bishop should develop early (...Bf5 or ...Bg4)
- ...c6 is important to support the center

**Famous Scandinavian upset:** Magnus Carlsen lost to 15-year-old Alireza Firouzja in a Scandinavian in 2018!`,
          arrows: [
            { from: 'd5', to: 'a5', color: 'green' },
            { from: 'd5', to: 'd6', color: 'yellow' },
          ],
          highlights: [
            { square: 'd5', color: 'yellow' },
            { square: 'a5', color: 'green' },
            { square: 'd6', color: 'yellow' },
          ],
        },
        {
          id: 'modern-scandi',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp1pppp/5n2/3P4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3',
          title: 'Modern Scandinavian',
          explanation: `The **Modern Scandinavian** (2...Nf6) is a gambiting approach that avoids the early Queen development.

**The idea:**
- Black offers a pawn with 2...Nf6!?
- After 3.d4 (or 3.c4) Nxd5, Black regains the pawn
- After 3.Bb5+ (critical), complications arise

**Icelandic Gambit (2...Nf6 3.c4 e6!):**
Black sacrifices a pawn for rapid development and attacking chances. Very sharp!

**Portuguese Variation (3...Bg4):**
Another sharp try where Black develops aggressively.

**The Modern approach:**
- Avoids the "Queen out early" stigma
- Leads to more dynamic positions
- Requires more theoretical knowledge

Choose your Scandinavian style based on your personality!`,
          arrows: [
            { from: 'f6', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'f6', color: 'green' },
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'icelandic-gambit',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp2ppp/5n2/3Pp3/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 4',
          title: 'Icelandic Gambit: 2...Nf6 3.c4 e6!?',
          explanation: `The **Icelandic Gambit** (also called the Palme Gambit) is a sharp surprise weapon in the Scandinavian! After **2.exd5 Nf6 3.c4 e6!?**, Black sacrifices a pawn for rapid development.

**The idea:**
- After 4.dxe6 Bxe6, Black has excellent piece activity
- The open lines compensate for the missing pawn
- White's extra pawn on c4 can become a target

**Why "Icelandic"?**
Popularized by Icelandic players in the 1990s, it reflects Iceland's strong chess tradition (the country has produced more grandmasters per capita than any other nation).

**Key attacking ideas for Black:**
- Rapid development: ...Nc6, ...Bb4+, ...O-O
- Pressure on d5 and c4
- Tactical tricks with ...Bc5 and ...Qb6

**Warning for White:** Don't be greedy! Trying to hold the extra pawn often leads to disaster. Best play returns the pawn for a solid position.`,
          arrows: [
            { from: 'e6', to: 'd5', color: 'red' },
          ],
          highlights: [
            { square: 'e6', color: 'green' },
            { square: 'd5', color: 'red' },
          ],
        },
        {
          id: 'qa5-vs-qd6',
          type: 'explanation',
          fen: 'rnb1kbnr/ppp1pppp/3q4/8/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 2 4',
          title: '3...Qa5 vs 3...Qd6',
          explanation: `After **2...Qxd5 3.Nc3**, Black's two main Queen retreats lead to very different types of games.

**3...Qa5 (Main Line):**
- Queen stays active on the a5-e1 diagonal
- Prepares ...c6, ...Bf5, ...e6, ...Nf6
- The Queen can become a target after White's Bd2
- Leads to the most popular and well-analyzed positions

**3...Qd6 (Modern Choice):**
- The Queen supports a future ...e5 advance
- Less exposed than on a5
- Allows ...Nf6, ...Bf5, ...c6 with a solid setup
- Popularized by GM Sergei Tiviakov, who made it his main weapon

**Which to choose?**
- **Qa5** if you want the most-tested, mainline positions
- **Qd6** if you prefer a solid, less theoretical approach
- **Qd8** (rare) if you want maximum solidity

Both retreats are fully sound at the highest level!`,
          arrows: [
            { from: 'd5', to: 'a5', color: 'green' },
            { from: 'd5', to: 'd6', color: 'yellow' },
          ],
          highlights: [
            { square: 'a5', color: 'green' },
            { square: 'd6', color: 'yellow' },
          ],
        },
        {
          id: 'portuguese-variation',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp1pppp/5n2/3P4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3',
          title: 'Portuguese Variation',
          explanation: `The **Portuguese Variation** arises after **2...Nf6 3.d4 Bg4!?** - an aggressive system where Black develops the Bishop to g4 immediately.

**The concept:**
- The Bishop pins the potential Nf3 Knight
- Black develops quickly without worrying about the d5 pawn
- After ...Nxd5, Black has active pieces and pressure

**Typical continuation:**
After 3.d4 Bg4 4.Nf3 (or 4.f3 Bf5), Black recaptures on d5 with good piece activity.

**Named after Portuguese players** who analyzed and popularized this aggressive approach in the 2000s.

**Key ideas for Black:**
- ...Qxd5 or ...Nxd5 depending on White's response
- The Bishop on g4 is very active
- Quick development compensates for any structural issues

**The Portuguese is ideal for players who like active, piece-oriented chess and want to avoid the "Queen out early" lines!**`,
          arrows: [
            { from: 'c8', to: 'g4', color: 'green' },
          ],
          highlights: [
            { square: 'g4', color: 'green' },
            { square: 'f3', color: 'yellow' },
          ],
        },
        {
          id: 'scandi-practice',
          type: 'puzzle',
          fen: 'rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3',
          title: 'Scandinavian Queen',
          explanation: `You're Black in the Scandinavian. After 3.Nc3, where should your Queen go for the most popular variation?`,
          correctMoves: ['Qa5'],
          successMessage: 'Correct! Qa5 is the most popular square - it keeps pressure on the e1-a5 diagonal and prepares ...c6, ...Bf5.',
          failureMessage: 'The Queen needs to retreat. Which square keeps the Queen active while preparing development?',
          arrows: [
            { from: 'd5', to: 'a5', color: 'green' },
          ],
        },
        {
          id: 'scandi-puzzle-develop',
          type: 'puzzle',
          fen: 'rnb1kbnr/ppp1pppp/8/q7/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 2 4',
          title: 'Scandinavian Development',
          explanation: `You're Black in the Scandinavian after 3...Qa5 4.d4. What developing move is critical for Black to play early, placing the Bishop outside the pawn chain?`,
          correctMoves: ['Nf6', 'Bf5'],
          successMessage: 'Good choice! Both Nf6 (developing the Knight) and Bf5 (activating the Bishop before ...e6) are key developing moves in the Scandinavian.',
          failureMessage: 'Think about developing your pieces actively. Which piece should come out before you play ...e6?',
          arrows: [
            { from: 'c8', to: 'f5', color: 'green' },
          ],
          highlights: [
            { square: 'f5', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'dutch-defense',
      title: 'The Dutch Defense',
      description: 'An aggressive defense against 1.d4',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['opening', 'd4', 'dutch'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
          title: 'The Dutch Defense',
          explanation: `The **Dutch Defense** (1.d4 f5) is an ambitious and fighting response to 1.d4. Named because it was analyzed by Elias Stein, a master from The Hague, in his 1789 book *Nouvel Essai sur le Jeu des Echecs*, it immediately fights for control of the e4 square!

**The aggressive concept:**
Unlike the solid responses to 1.d4 (like ...d5), the Dutch creates immediate imbalance. Black says: "I will control e4!"

**Three main Dutch systems:**
- **Leningrad Dutch** - Fianchetto with ...g6, ...Bg7
- **Stonewall Dutch** - Pawns on c6-d5-e6-f5
- **Classical Dutch** - ...e6, ...Be7, ...O-O

**Why play the Dutch?**
- Creates **unbalanced positions** with winning chances
- Avoids drawish lines
- Kingside attacking potential

**The risks:**
- Weakens the e8-h5 diagonal (White's Qh5+ ideas)
- The e5 square can become weak
- Requires accurate play to avoid disaster

Champions Botvinnik and Nakamura have used it successfully!`,
          arrows: [
            { from: 'f5', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'f5', color: 'green' },
            { square: 'e4', color: 'blue' },
          ],
        },
        {
          id: 'leningrad',
          type: 'explanation',
          fen: 'rnbqk2r/ppppp1bp/5np1/5p2/2PP4/5NP1/PP2PP1P/RNBQKB1R w KQkq - 0 5',
          title: 'Leningrad Dutch',
          explanation: `The **Leningrad Dutch** combines the Dutch with a King's Indian-style fianchetto. It's the most popular Dutch system!

**Black's setup:**
- ...f5, ...Nf6, ...g6, ...Bg7, ...O-O, ...d6
- Then ...e5 or ...c6 + ...Qe8-h5

**Key strategic themes:**
- The g7 Bishop is very powerful on the long diagonal
- ...e5 frees Black's position
- Kingside attack with ...Qe8-h5, ...f4

**White's main plan:**
- d5 to lock the center
- Play on the queenside with c5, b4
- Control the e5 square

**The "Leningrad hedgehog":**
Sometimes Black plays ...c6, ...Qe8-h5, with a slow buildup before ...e5.

Hikaru Nakamura is the most famous modern Leningrad Dutch practitioner!`,
          arrows: [
            { from: 'g7', to: 'a1', color: 'green' },
            { from: 'd8', to: 'e8', color: 'yellow' },
            { from: 'e8', to: 'h5', color: 'yellow' },
          ],
          highlights: [
            { square: 'g7', color: 'green' },
            { square: 'e5', color: 'blue' },
          ],
        },
        {
          id: 'stonewall',
          type: 'explanation',
          fen: 'rnbqkb1r/pp2p1pp/2p2n2/3p1p2/2PP4/5NP1/PP2PP1P/RNBQKB1R w KQkq - 0 5',
          title: 'Stonewall Dutch',
          explanation: `The **Stonewall Dutch** creates an imposing pawn structure: pawns on c6-d5-e6-f5 form a "wall."

**The Stonewall concept:**
- Fixed pawn center provides stability
- The e4 square is a dream outpost for the Knight
- Kingside attack with ...Qf6/h4, ...Rf6-h6

**The "Stonewall Knight":**
After ...Nf6-e4, the Knight is beautifully placed! It cannot be challenged by pawns and attacks key squares.

**Weakness to note:**
The e5 square is chronically weak - White can place pieces there. This is the main drawback of the Stonewall.

**Typical attacking plan:**
1. ...Bd6, ...O-O, ...Nbd7-f6
2. ...Ne4 - the dream!
3. ...Qf6 or ...Qh4 with attack

World Champion Botvinnik was a Stonewall specialist!`,
          arrows: [
            { from: 'f6', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'green' },
            { square: 'd5', color: 'green' },
            { square: 'e6', color: 'green' },
            { square: 'f5', color: 'green' },
            { square: 'e4', color: 'blue' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'classical-dutch',
          type: 'explanation',
          fen: 'rnbq1rk1/ppppp1bp/5n2/5p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1 b - - 0 6',
          title: 'Classical Dutch',
          explanation: `The **Classical Dutch** involves **...e6, ...Be7, ...O-O** without the Leningrad fianchetto. It's the traditional way to play the Dutch.

**Black's Classical setup:**
- ...f5, ...Nf6, ...e6, ...Be7, ...O-O
- Then ...d6 and ...Qe8-h5 for kingside attack
- Or ...d5 for a Stonewall-like structure

**Key differences from Leningrad:**
- The Bishop goes to e7 instead of g7
- Less pressure on the long diagonal
- But the e7-Bishop supports a kingside attack
- ...Qe8-h5 is a powerful attacking plan

**Typical attacking plan:**
1. ...Qe8 - Re-routing the Queen
2. ...Qh5 - Threatening the h-file
3. ...Ng4 - Attacking h2
4. ...Rf6-h6 - Doubling on the h-file

**Famous practitioner:** The legendary **Alexander Alekhine** played the Classical Dutch successfully in the 1920s and 30s.`,
          arrows: [
            { from: 'd8', to: 'e8', color: 'yellow' },
            { from: 'e8', to: 'h5', color: 'red' },
          ],
          highlights: [
            { square: 'e7', color: 'green' },
            { square: 'h5', color: 'red' },
          ],
        },
        {
          id: 'dutch-anti-systems',
          type: 'explanation',
          fen: 'rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
          title: 'Anti-Dutch Systems',
          explanation: `White has several dangerous Anti-Dutch weapons that Black must be prepared for!

**1. The Staunton Gambit (2.e4):**
- White immediately sacrifices a pawn
- After 2...fxe4 3.Nc3, White gets rapid development
- Very dangerous if Black doesn't know the theory
- The gambit spirit can be unsettling for Dutch players

**2. The Hopton Attack (2.Bg5):**
- Develops the Bishop to an unusual square
- Puts pressure on the e7 square
- Can lead to tricky tactical situations

**3. 2.Nc3 followed by Bg5:**
- Flexible development
- Can transpose to various setups
- Keeps Black guessing about White's intentions

**4. 2.g3 (Main Line):**
- The most common and respected response
- Leads to the standard Dutch structures
- g3+Bg2+Nf3+O-O is the classic setup

**Advice for Dutch players:** Study the Staunton Gambit! It's the most dangerous surprise weapon you'll face.`,
          arrows: [
            { from: 'e2', to: 'e4', color: 'red' },
            { from: 'c1', to: 'g5', color: 'yellow' },
          ],
          highlights: [
            { square: 'e4', color: 'red' },
            { square: 'f5', color: 'green' },
          ],
        },
        {
          id: 'dutch-interactive',
          type: 'interactive',
          fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
          title: 'Play the Dutch',
          explanation: `You're Black against 1.d4. Instead of the solid ...d5 or the flexible ...Nf6, what aggressive pawn move defines the Dutch Defense and fights for control of e4?`,
          correctMoves: ['f5'],
          successMessage: '1...f5! The Dutch Defense! You immediately fight for the e4 square and signal your aggressive intentions. Bold and ambitious!',
          failureMessage: 'The Dutch Defense is defined by an aggressive flank pawn move that controls e4. Which pawn move is that?',
          arrows: [
            { from: 'f5', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'f5', color: 'green' },
          ],
        },
        {
          id: 'dutch-practice',
          type: 'puzzle',
          fen: 'rnbqkb1r/ppppp1pp/5n2/5p2/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3',
          title: 'Anti-Dutch Ideas',
          explanation: `You're White against the Dutch. What's the typical setup move that develops while preparing g3 and Bg2?`,
          correctMoves: ['g3', 'c4', 'Bf4'],
          successMessage: 'Good choice! g3+Bg2 is the most common setup. c4 and Bf4 are also excellent, controlling key squares.',
          failureMessage: 'Think about how to develop against the Dutch. A fianchetto or c4 are typical.',
        },
        {
          id: 'dutch-puzzle-ne4',
          type: 'puzzle',
          fen: 'rnbq1rk1/ppp1p1bp/3p1np1/5p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 b - - 0 7',
          title: 'Leningrad Break',
          explanation: `You're Black in a Leningrad Dutch. Your pieces are developed and your King is safe. What is the key central break that frees your position?`,
          correctMoves: ['e5'],
          successMessage: 'Excellent! ...e5 is the critical break in the Leningrad Dutch! It frees your g7 Bishop and challenges White\'s center.',
          failureMessage: 'Think about the most important central pawn break for Black in the Leningrad Dutch. Which move opens the g7 Bishop?',
          arrows: [
            { from: 'e7', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'vienna-game',
      title: 'The Vienna Game',
      description: 'An alternative to the Italian focusing on f4',
      difficulty: 'intermediate',
      estimatedMinutes: 8,
      tags: ['opening', 'e4', 'vienna'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2',
          title: 'The Vienna Game',
          explanation: `The **Vienna Game** (1.e4 e5 2.Nc3) is a flexible opening that offers something for every style! Named after the Vienna Chess Club, one of the strongest chess clubs in the 19th century, masters like Steinitz and others from the Vienna school developed and popularized this opening.

**Why 2.Nc3 instead of 2.Nf3?**
- Keeps the option of f4 open (Vienna Gambit)
- Avoids heavy Ruy Lopez/Italian theory
- Can transpose to many setups

**White's main ideas:**
- **f4!** - The Vienna Gambit, aggressive
- **Bc4 + d3** - Solid Italian-style development
- **g3 + Bg2** - Fianchetto approach

**What makes it attractive:**
- **Original positions** - opponents may be unfamiliar
- **Flexibility** - can play sharp or quiet
- **Sound** - no dubious sacrifices required

The Vienna was popular in the 19th century and has made a comeback among modern grandmasters seeking fresh positions!`,
          arrows: [
            { from: 'f2', to: 'f4', color: 'yellow' },
          ],
          highlights: [
            { square: 'c3', color: 'green' },
            { square: 'f4', color: 'yellow' },
          ],
        },
        {
          id: 'vienna-gambit',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq - 0 3',
          title: 'Vienna Gambit',
          explanation: `The **Vienna Gambit** (2.Nc3 followed by 3.f4) is the aggressive mainline!

**After 2...Nf6 3.f4:**
- 3...d5 - Main line, Black fights back
- 3...exf4 - Accepts the gambit
- 3...d6 - Solid decline

**If 3...exf4 (accepted):**
White plays 4.e5! with strong attack:
- The f-file opens for the Rook
- Knights come to active squares
- White gets fast development

**If 3...d5 4.fxe5 Nxe4:**
Complex tactical play where both sides have chances. The Frankenstein-Dracula Variation (5.Qf3!? or 5.d3) leads to wild complications!

**The Vienna Gambit spirit:**
White sacrifices structure for dynamic piece play. Perfect for attackers!`,
          arrows: [
            { from: 'f4', to: 'e5', color: 'red' },
            { from: 'f1', to: 'f8', color: 'yellow' },
          ],
          highlights: [
            { square: 'f4', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'quiet-vienna',
          type: 'explanation',
          fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR b KQkq - 3 3',
          title: 'Quiet Vienna',
          explanation: `The **Quiet Vienna** (2.Nc3 Nf6 3.Bc4) avoids the gambit and plays for solid development.

**This position resembles:**
- An Italian Game where White delayed Nf3
- A Three Knights position
- A Reversed Hungarian

**White's plans:**
- d3 + Nf3/Nge2 + O-O - Solid setup
- f4 later - Delayed Vienna Gambit
- Bg5 in some lines - Pressure on f6

**Why play quiet?**
- Avoids theoretical duels
- Sound position with long-term prospects
- Can still become sharp if Black is careless

**Key for Black:**
After 3...Bc5 or 3...Nc6, Black should be fine with accurate play. The position is roughly equal but offers both sides chances.`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'yellow' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'c3', color: 'green' },
          ],
        },
        {
          id: 'frankenstein-dracula',
          type: 'explanation',
          fen: 'rnbqkb1r/pppp1ppp/8/8/4Pn2/2N2Q2/PPPP2PP/R1B1KBNR b KQkq - 1 5',
          title: 'Frankenstein-Dracula Variation',
          explanation: `The **Frankenstein-Dracula Variation** is one of the wildest lines in all of chess! It arises after **1.e4 e5 2.Nc3 Nf6 3.Bc4 Nxe4 4.Qh5!?** (or via the f4 lines).

**Why the dramatic name?**
The name was coined by GM Tim Harding because the resulting positions are so monstrous and horrifying for both sides that they resemble a battle between Frankenstein's monster and Dracula!

**The chaos:**
- After 4.Qh5 Nd6 5.Bb3, both sides face incredible tactical complications
- Material imbalances, exposed kings, and sharp tactics abound
- Computer engines often struggle to evaluate the resulting positions
- Games can be decided by a single brilliant (or horrible) move

**Typical themes:**
- White sacrifices material for attack
- Black tries to consolidate with an extra piece
- The King often stays in the center for both sides!

**Not for the faint-hearted!** The Frankenstein-Dracula requires courage, tactical vision, and nerves of steel. It's the ultimate "whose bluff holds?" opening.`,
          arrows: [
            { from: 'd1', to: 'h5', color: 'red' },
          ],
          highlights: [
            { square: 'h5', color: 'red' },
            { square: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'copycat-vienna',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3',
          title: 'Copycat Variation: 2...Nc6',
          explanation: `The **Copycat Variation** (2...Nc6) mirrors White's move, creating a symmetrical position. This is a solid response to the Vienna.

**After 2...Nc6:**
- Black mirrors White's Knight development
- The position is symmetrical but White has the first-move advantage
- Both sides have flexible options

**White's main continuations:**
- **3.f4** - Vienna Gambit, the sharpest option
- **3.Bc4** - Quiet Italian-style development
- **3.Nf3** - Three Knights Game
- **3.g3** - Fianchetto approach

**The Three Knights Game (3.Nf3):**
If both sides develop Knights, we get the Three Knights. After 3...Nf6, it becomes the Four Knights Game - one of the most solid and symmetrical openings.

**Key principle:** Against the Copycat, White should use the tempo advantage to be slightly more aggressive. Symmetry favors the player with the initiative!`,
          arrows: [
            { from: 'f2', to: 'f4', color: 'yellow' },
            { from: 'f1', to: 'c4', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'green' },
            { square: 'c3', color: 'green' },
          ],
        },
        {
          id: 'vienna-interactive-nc3',
          type: 'interactive',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'Begin the Vienna',
          explanation: `You're White after 1.e4 e5. Instead of the usual 2.Nf3, what Knight move defines the Vienna Game and keeps the f-pawn free?`,
          correctMoves: ['Nc3'],
          successMessage: '2.Nc3! The Vienna Game! Unlike 2.Nf3, this keeps the f-pawn free for a potential f4 advance. Flexible and full of possibilities!',
          failureMessage: 'The Vienna Game develops a Knight but NOT to f3. Which Knight move keeps the f-pawn free?',
          arrows: [
            { from: 'f2', to: 'f4', color: 'yellow' },
          ],
          highlights: [
            { square: 'c3', color: 'green' },
          ],
        },
        {
          id: 'vienna-practice',
          type: 'puzzle',
          fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3',
          title: 'Vienna Decision',
          explanation: `You're White in the Vienna. What aggressive move offers a gambit and opens the f-file?`,
          correctMoves: ['f4', 'Bc4'],
          successMessage: 'Excellent! f4 is the Vienna Gambit - aggressive and sharp! Bc4 is also good for a quieter game.',
          failureMessage: 'Think about the most aggressive continuation. What pawn move creates threats?',
          arrows: [
            { from: 'f2', to: 'f4', color: 'green' },
          ],
        },
        {
          id: 'vienna-puzzle-gambit',
          type: 'puzzle',
          fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/2N5/PPPP2PP/R1BQKBNR w KQkq - 0 3',
          title: 'Vienna Gambit Accepted',
          explanation: `Black has accepted your Vienna Gambit with 3...exf4. What strong move advances your central pawn to cramp Black while opening lines for your pieces?`,
          correctMoves: ['e5', 'Nf3', 'd4'],
          successMessage: 'Good choice! e5 is the sharpest, gaining space and opening lines. Nf3 and d4 are also strong continuations that maintain the initiative.',
          failureMessage: 'Think about advancing your center or developing. What move seizes more space in the center?',
          arrows: [
            { from: 'e4', to: 'e5', color: 'red' },
          ],
          highlights: [
            { square: 'e5', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'scotch-game',
      title: 'The Scotch Game',
      description: 'A direct central challenge with 3.d4',
      difficulty: 'beginner',
      estimatedMinutes: 12,
      tags: ['opening', 'e4', 'scotch'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3',
          title: 'The Scotch Game',
          explanation: `The **Scotch Game** arises after **1.e4 e5 2.Nf3 Nc6 3.d4**, immediately striking at the center. It is one of the oldest recorded openings in chess history.

**Historical origin:** The Scotch Game gets its name from a famous **correspondence match between Edinburgh and London in 1824**. Players from the Scottish capital used this bold central advance repeatedly, and the opening became permanently associated with Scotland. The match itself was one of the first major inter-city chess competitions ever held.

**Key ideas:**
- White immediately challenges Black's control of e5
- The center opens up quickly, leading to active piece play
- Unlike the Italian or Ruy Lopez, White doesn't delay the central confrontation
- Garry Kasparov revived the Scotch at the highest level in the 1990s

The Scotch offers White open lines, rapid development, and clear attacking chances, while Black gets active piece play in return.`,
          arrows: [
            { from: 'd4', to: 'e5', color: 'red' },
            { from: 'f3', to: 'e5', color: 'yellow' },
          ],
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'move-1',
          type: 'interactive',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Open with the King\'s Pawn',
          explanation: `Let's build the Scotch Game move by move. Start with the classical King's Pawn opening, seizing central space and freeing your light-squared Bishop and Queen.

**1.e4** has been the most popular opening move for centuries, favored by attacking players from Morphy to Kasparov.`,
          correctMoves: ['e4'],
          successMessage: 'Great start! 1.e4 controls the d5 and f5 squares and opens diagonals for your Bishop and Queen.',
          arrows: [
            { from: 'e4', to: 'd5', color: 'green' },
            { from: 'e4', to: 'f5', color: 'green' },
          ],
        },
        {
          id: 'move-2',
          type: 'interactive',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'Develop the Knight',
          explanation: `Black has mirrored your move with **1...e5**. Now develop your King's Knight to its best square, attacking the e5 pawn while preparing to castle.

Remember: **develop with a purpose** - the Knight on f3 both develops and attacks!`,
          correctMoves: ['Nf3'],
          successMessage: 'Perfect! 2.Nf3 attacks the e5 pawn and develops toward the center. This is the most natural developing move.',
          arrows: [
            { from: 'f3', to: 'e5', color: 'yellow' },
          ],
          highlights: [
            { square: 'f3', color: 'green' },
          ],
        },
        {
          id: 'move-3',
          type: 'interactive',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
          title: 'The Scotch Move: 3.d4!',
          explanation: `Black defends with **2...Nc6**. Now comes the defining moment of the Scotch Game. Instead of developing another piece quietly (like 3.Bc4 for the Italian or 3.Bb5 for the Ruy Lopez), you strike immediately in the center!

**3.d4** is bold and direct - you're offering a pawn trade to open the position. This is the move the Edinburgh players made famous in 1824.`,
          correctMoves: ['d4'],
          successMessage: 'Excellent! 3.d4 - the Scotch Game! You immediately challenge Black\'s center. This leads to an open, dynamic game.',
          failureMessage: 'Think about the most direct central challenge. What pawn move attacks Black\'s e5 pawn?',
          arrows: [
            { from: 'd4', to: 'e5', color: 'red' },
          ],
          highlights: [
            { square: 'd4', color: 'green' },
          ],
        },
        {
          id: 'main-line',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4',
          title: 'Main Line: 3...exd4 4.Nxd4',
          explanation: `After **3...exd4 4.Nxd4**, the most common continuation, White has achieved an ideal setup:

**White's advantages:**
- A strong, centralized Knight on d4
- Open lines for rapid development
- The e4 pawn controls key central squares
- The f1-Bishop has multiple good diagonals

**Black's resources:**
- Symmetrical pawn structure
- The c6-Knight can challenge d4 with ...Nf6 and ...Bb4+
- Solid development with ...Nf6, ...Bb4+ or ...Bc5

The Knight on d4 is White's pride - it radiates influence across the board. Black must decide how to challenge it.`,
          arrows: [
            { from: 'd4', to: 'c6', color: 'yellow' },
            { from: 'd4', to: 'f5', color: 'yellow' },
            { from: 'd4', to: 'b5', color: 'yellow' },
          ],
          highlights: [
            { square: 'd4', color: 'green' },
            { square: 'e4', color: 'blue' },
          ],
        },
        {
          id: 'scotch-gambit',
          type: 'explanation',
          fen: 'r1bqkbnr/pppp1ppp/2n5/8/2B1P3/8/PPP2PPP/RNBQK2R b KQkq - 1 4',
          title: 'The Scotch Gambit: 4.Bc4',
          explanation: `Instead of recapturing with 4.Nxd4, White can play the **Scotch Gambit** with **4.Bc4** (after 3...exd4). Here White offers the d4 pawn to gain rapid development and attacking chances.

**Key ideas of the Scotch Gambit:**
- White sacrifices a pawn for a lead in development
- The Bishop on c4 targets the vulnerable f7 square
- White aims for quick castling and open-file pressure
- It often transposes to lines of the Italian Gambit

This line appeals to aggressive players who prefer activity over material. Many games have featured spectacular attacks after Black tries to hold the extra pawn.`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'classical-line',
          type: 'explanation',
          fen: 'r1bqk2r/pppp1ppp/2n2n2/8/1bBNP3/8/PPP2PPP/RNBQK2R w KQkq - 4 5',
          title: 'Classical: 4...Bc5 and 4...Nf6',
          explanation: `In the main line after 4.Nxd4, Black has two principal responses:

**4...Bc5** (Classical Scotch):
- Develops the Bishop actively, targeting d4
- Puts pressure on White's centralized Knight
- Leads to rich tactical play

**4...Nf6** (Schmidt Variation):
- Develops naturally and attacks e4
- Often leads to 5.Nxc6 bxc6 with an unbalanced structure
- Black gets the Bishop pair and active piece play

**4...Bb4+** is also popular, gaining a tempo after White blocks the check.

Both 4...Bc5 and 4...Nf6 are fully sound for Black. The Scotch gives both sides clear plans and active play from the very start.`,
          arrows: [
            { from: 'c5', to: 'd4', color: 'yellow' },
            { from: 'f6', to: 'e4', color: 'red' },
          ],
          highlights: [
            { square: 'c5', color: 'green' },
            { square: 'f6', color: 'green' },
          ],
        },
        {
          id: 'scotch-practice',
          type: 'puzzle',
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
          title: 'Scotch or Not?',
          explanation: `You're White after 1.e4 e5 2.Nf3 Nc6. What is the defining move of the Scotch Game that immediately challenges the center?`,
          correctMoves: ['d4'],
          successMessage: 'Correct! 3.d4 is the Scotch Game - a direct, principled challenge to Black\'s center. The Edinburgh players would be proud!',
          failureMessage: 'Remember the Scotch Game\'s key idea: a direct pawn advance to challenge e5. Which pawn move does that?',
          arrows: [
            { from: 'd2', to: 'd4', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'kings-gambit',
      title: 'The King\'s Gambit',
      description: 'A romantic sacrifice of the f-pawn for rapid attack',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['opening', 'e4', 'gambit', 'kings-gambit'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2',
          title: 'The King\'s Gambit',
          explanation: `The **King's Gambit** (1.e4 e5 2.f4) is one of the **oldest and most romantic openings** in chess history, dating back to the 1500s. It was the weapon of choice during the **Romantic era of chess** (roughly 1700s-1800s), when sacrificial, attacking play was prized above all else.

**Why "King's Gambit"?** The name comes from the fact that it is the **King's f-pawn** that is offered as a sacrifice (gambit). In chess terminology, the "King's side" refers to the files e through h, and this gambit specifically pushes the f-pawn forward, weakening the King's own defenses for the sake of attack.

**Historical significance:**
- Played by virtually every great player before the 20th century
- Champions like Anderssen, Morphy, and Spassky used it to devastating effect
- The famous "Immortal Game" (Anderssen vs Kieseritzky, 1851) began with a King's Gambit
- Bobby Fischer called it a "decisive" opening, though he eventually found ways to counter it

**Core idea:** White sacrifices the f-pawn to open the f-file for the Rook and clear a path toward Black's King, hoping for a powerful kingside attack.`,
          arrows: [
            { from: 'f4', to: 'e5', color: 'red' },
            { from: 'f1', to: 'f8', color: 'yellow' },
          ],
          highlights: [
            { square: 'f4', color: 'green' },
            { square: 'e5', color: 'red' },
          ],
        },
        {
          id: 'move-1',
          type: 'interactive',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Begin the Attack',
          explanation: `Every King's Gambit starts with the classical King's Pawn opening. Seize the center and signal your aggressive intentions!

In the Romantic era, **1.e4** was virtually the only serious opening move. The idea of controlling the center with pawns was considered essential to proper chess.`,
          correctMoves: ['e4'],
          successMessage: '1.e4 - the gateway to the King\'s Gambit! Now we need Black to respond with 1...e5.',
          arrows: [
            { from: 'e4', to: 'd5', color: 'green' },
            { from: 'e4', to: 'f5', color: 'green' },
          ],
        },
        {
          id: 'move-2',
          type: 'interactive',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'The Gambit: 2.f4!',
          explanation: `Black has played **1...e5**. Now comes the daring move that defines this opening. Offer your f-pawn as a sacrifice!

**2.f4** is bold because it:
- Weakens the King's position (the e1-h4 diagonal opens)
- Sacrifices material willingly
- But in return, White aims to dominate the center and attack on the f-file

This move takes courage - you're deliberately exposing your King for attacking chances!`,
          correctMoves: ['f4'],
          successMessage: 'The King\'s Gambit! 2.f4 - a brave sacrifice that has launched countless brilliant attacks throughout chess history.',
          failureMessage: 'The King\'s Gambit requires offering the f-pawn. What bold pawn move targets e5 from the King\'s side?',
          arrows: [
            { from: 'f4', to: 'e5', color: 'red' },
          ],
          highlights: [
            { square: 'f4', color: 'green' },
          ],
        },
        {
          id: 'accepted',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3',
          title: 'King\'s Gambit Accepted: 2...exf4',
          explanation: `When Black plays **2...exf4**, accepting the gambit, the **King's Gambit Accepted** arises. This has been the most common response throughout history.

**What White gains:**
- The e5 square is cleared - White's pawn now dominates the center alone
- The f-file will open once White castles (or even before)
- White can develop rapidly while Black's f4 pawn is hard to hold

**What Black gains:**
- An extra pawn
- The f4 pawn can cramp White's kingside
- Black can try to hold the pawn with ...g5 (though this weakens the King)

The critical tension: can White's initiative outweigh Black's extra material? This question has fascinated chess players for over 400 years.`,
          arrows: [
            { from: 'f1', to: 'c4', color: 'green' },
            { from: 'h1', to: 'f1', color: 'yellow' },
          ],
          highlights: [
            { square: 'f4', color: 'red' },
            { square: 'e4', color: 'green' },
          ],
        },
        {
          id: 'kings-knight',
          type: 'explanation',
          fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R b KQkq - 1 3',
          title: 'King\'s Knight Gambit: 3.Nf3',
          explanation: `After 2...exf4, the most popular continuation is **3.Nf3**, the **King's Knight Gambit**. This is the mainline and most principled response.

**Why 3.Nf3?**
- Develops the Knight to its ideal square
- Prevents Black from playing ...Qh4+, which would be annoying
- Prepares to castle and open the f-file
- Controls the critical e5 and d4 squares

From here, Black typically chooses between:
- **3...g5** - The most aggressive, trying to hold the f4 pawn
- **3...d6** - Solid, returning the pawn for development
- **3...d5** - Counter-attacking in the center
- **3...Nf6** - Modern and flexible

The **King's Bishop Gambit** (3.Bc4) is the main alternative, immediately targeting f7.`,
          arrows: [
            { from: 'f3', to: 'e5', color: 'green' },
            { from: 'f3', to: 'h4', color: 'yellow' },
          ],
          highlights: [
            { square: 'f3', color: 'green' },
          ],
        },
        {
          id: 'declined',
          type: 'explanation',
          fen: 'rnbqk1nr/pppp1ppp/8/4p3/2b1PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3',
          title: 'King\'s Gambit Declined: 2...Bc5',
          explanation: `Black doesn't have to accept the gambit! **2...Bc5** is the most popular way to **decline** the King's Gambit.

**The idea behind 2...Bc5:**
- Black develops a piece instead of grabbing a pawn
- The Bishop targets the weakened f2 square (since the f-pawn moved)
- Black maintains a solid pawn center with e5
- White's f4 advance has slightly weakened the King without compensation

**Other ways to decline:**
- **2...d5** (Falkbeer Countergambit - see next step!)
- **2...d6** - Solid but passive
- **2...Nc6** - Flexible development

The declined variations tend to give Black a comfortable game. White still has attacking chances but must work harder for them.`,
          arrows: [
            { from: 'c5', to: 'f2', color: 'red' },
          ],
          highlights: [
            { square: 'c5', color: 'green' },
            { square: 'f2', color: 'red' },
          ],
        },
        {
          id: 'falkbeer',
          type: 'explanation',
          fen: 'rnbqkbnr/ppp2ppp/8/3pp3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq d6 0 3',
          title: 'Falkbeer Countergambit: 2...d5!',
          explanation: `The **Falkbeer Countergambit** (2...d5) is a fighting response named after the Austrian master **Ernst Falkbeer**, who introduced it in the 1850s. Instead of accepting or passively declining, Black **counter-attacks in the center**!

**The philosophy:**
- "You offer me a pawn on f4? I'll counter-sacrifice on d5!"
- Black strikes at White's e4 pawn, the foundation of White's center
- After 3.exd5, Black can play ...e4, gaining central space and pushing White's pieces back

**Main line: 3.exd5 e4**
- Black's e-pawn charges forward aggressively
- White's Knight is denied the f3 square
- Black often gets excellent piece activity

The Falkbeer represents the spirit of Romantic chess: meet a gambit with a counter-gambit! It remains a respected choice even at the highest levels.`,
          arrows: [
            { from: 'd5', to: 'e4', color: 'red' },
            { from: 'e5', to: 'e4', color: 'yellow' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'e4', color: 'red' },
          ],
        },
        {
          id: 'kings-gambit-practice',
          type: 'puzzle',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          title: 'Gambit Time!',
          explanation: `You're White after 1.e4 e5. What daring pawn move offers a sacrifice and defines the King's Gambit?`,
          correctMoves: ['f4'],
          successMessage: '2.f4! The King\'s Gambit - one of the boldest opening moves in chess. You\'re following in the footsteps of Anderssen and Morphy!',
          failureMessage: 'Think about which pawn sacrifice opens the f-file and targets e5. Which pawn on the King\'s side can do that?',
          arrows: [
            { from: 'f2', to: 'f4', color: 'green' },
          ],
        },
      ],
    },
    {
      id: 'nimzo-indian',
      title: 'The Nimzo-Indian Defense',
      description: 'A hypermodern defense pinning the c3-Knight',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['opening', 'd4', 'nimzo-indian', 'hypermodern'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
          title: 'The Nimzo-Indian Defense',
          explanation: `The **Nimzo-Indian Defense** arises after **1.d4 Nf6 2.c4 e6 3.Nc3 Bb4**, and is widely considered one of the **soundest and most respected openings** in chess.

**Who was Nimzowitsch?** The opening is named after **Aron Nimzowitsch (1886-1935)**, a brilliant Latvian-Danish chess master who was one of the founders of the **hypermodern school of chess**. Nimzowitsch challenged the classical dogma that the center must be occupied by pawns, arguing instead that the center could be **controlled from a distance** with pieces.

The **"Indian"** in the name refers to the family of openings beginning with **1.d4 Nf6**, known as "Indian Defenses" - a term originating from the Indian player Moheschunder Bannerjee, who used these systems in the 1850s.

**Core concept of 3...Bb4:**
- The Bishop **pins** White's c3-Knight to the King
- This controls the e4 square without occupying it with a pawn
- If White plays a3, Black can capture on c3, doubling White's pawns
- A perfect embodiment of Nimzowitsch's hypermodern philosophy: control without occupation`,
          arrows: [
            { from: 'b4', to: 'c3', color: 'red' },
            { from: 'c3', to: 'e4', color: 'yellow' },
          ],
          highlights: [
            { square: 'b4', color: 'green' },
            { square: 'c3', color: 'red' },
            { square: 'e4', color: 'blue' },
          ],
        },
        {
          id: 'pin-concept',
          type: 'explanation',
          fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
          title: 'The Power of the Pin',
          explanation: `The Bishop on b4 creates a **pin** on the c3-Knight. Let's understand why this is so powerful:

**What the pin achieves:**
- The Knight on c3 is White's main defender of the e4 square
- While pinned, the Knight cannot move (or it exposes the King)
- This means White cannot easily play e4 to build a classical pawn center
- Black **controls e4 indirectly** through the pin

**The doubling threat:**
- If Black captures on c3 (Bxc3+), White must recapture with the b-pawn (bxc3)
- This gives White **doubled c-pawns** (pawns on c3 and c4)
- Doubled pawns are structurally weak - they can't protect each other
- However, White gets the **Bishop pair** and an open b-file as compensation

**Strategic balance:** The Nimzo-Indian creates a fascinating tension between Black's structural advantages and White's dynamic potential with the two Bishops.`,
          arrows: [
            { from: 'b4', to: 'c3', color: 'red' },
            { from: 'b4', to: 'e1', color: 'yellow' },
          ],
          highlights: [
            { square: 'b4', color: 'green' },
            { square: 'c3', color: 'red' },
            { square: 'e4', color: 'blue' },
          ],
        },
        {
          id: 'doubled-pawns',
          type: 'explanation',
          fen: 'rnbqk2r/pppp1ppp/4pn2/8/2PP4/2b5/PP2PPPP/R1BQKBNR w KQkq - 0 5',
          title: 'The Doubled C-Pawns',
          explanation: `After **3...Bb4 4.e3 Bxc3+ 5.bxc3** (or similar sequences), White ends up with doubled c-pawns. This is a **defining structural theme** of the Nimzo-Indian.

**Drawbacks of doubled pawns:**
- The c3 and c4 pawns cannot protect each other
- The c4 pawn can become a target in the endgame
- White's pawn majority on the queenside (3 vs 2) is less mobile

**Benefits for White:**
- The **Bishop pair** - two Bishops are powerful in open positions
- Extra central control: the c3 pawn supports d4, and c4 controls d5
- The open b-file can be useful for the Rook
- White often has a strong center with pawns on c3, c4, d4, and e3

**Nimzowitsch's insight:** The doubled pawns are a **permanent** structural weakness, while White's dynamic advantages (Bishop pair, center) may be **temporary**. This is why the Nimzo-Indian tends to favor patient, strategic players on the Black side.`,
          highlights: [
            { square: 'c3', color: 'red' },
            { square: 'c4', color: 'red' },
            { square: 'd4', color: 'green' },
          ],
        },
        {
          id: 'rubinstein',
          type: 'explanation',
          fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR b KQkq - 0 4',
          title: 'Rubinstein Variation: 4.e3',
          explanation: `**4.e3** is the **Rubinstein Variation**, named after the legendary Polish master Akiba Rubinstein. It is the most popular and flexible response to the Nimzo-Indian.

**Why 4.e3?**
- Supports the d4 pawn solidly
- Prepares to develop the f1-Bishop (to d3 or e2)
- Doesn't commit to any aggressive plan too early
- Accepts that the e4 advance may be delayed

**Main ideas after 4.e3:**
- White plans Bd3, Nf3 (or Nge2), and O-O
- The Bishop on d3 can be very strong on the b1-h7 diagonal
- White often aims for a later e4 push when fully developed

**Black's typical plans:**
- **4...O-O** followed by ...d5 or ...c5
- **4...b6** preparing ...Bb7 (the Queen's Indian setup within the Nimzo)
- **4...c5** immediately challenging d4

This variation leads to rich, strategic middlegames beloved by positional players.`,
          arrows: [
            { from: 'e3', to: 'd4', color: 'green' },
            { from: 'f1', to: 'd3', color: 'yellow' },
          ],
          highlights: [
            { square: 'e3', color: 'green' },
          ],
        },
        {
          id: 'classical',
          type: 'explanation',
          fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PPQ1PPPP/R1B1KBNR b KQkq - 3 4',
          title: 'Classical Variation: 4.Qc2',
          explanation: `**4.Qc2** is the **Classical Variation**, a sophisticated approach that addresses the doubling threat head-on.

**The idea behind 4.Qc2:**
- The Queen defends the c3-Knight from c2
- If Black captures on c3, White recaptures with the Queen (Qxc3), **avoiding doubled pawns**
- This removes Black's main strategic idea
- White retains a flexible pawn structure

**The trade-off:**
- The Queen on c2 is slightly exposed and may need to move again
- White has spent a tempo on a Queen move instead of developing
- But the Queen on c2 also supports a future e4 push

**Black's responses:**
- **4...O-O** - Simple and flexible
- **4...d5** - Challenging the center immediately
- **4...c5** - Striking at d4

The Classical is a favorite of players who don't want to deal with doubled pawns. Kramnik used it extensively in his career.`,
          arrows: [
            { from: 'c2', to: 'c3', color: 'green' },
          ],
          highlights: [
            { square: 'c2', color: 'green' },
            { square: 'c3', color: 'blue' },
          ],
        },
        {
          id: 'saemisch',
          type: 'interactive',
          fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
          title: 'Sämisch Variation: 4.a3',
          explanation: `The **Sämisch Variation** is the most aggressive response. White plays **4.a3**, directly asking the Bishop: "What are you going to do?"

Named after **Friedrich Sämisch** (1896-1975), a German master known for his aggressive opening ideas. White immediately challenges the Bishop, forcing it to make a decision.

**After 4.a3 Bxc3+ 5.bxc3:**
- White willingly accepts doubled pawns
- But gains the Bishop pair and a strong center
- White aims for e4, building a massive pawn center
- This leads to very sharp, aggressive play

Play the Sämisch move now!`,
          correctMoves: ['a3'],
          successMessage: '4.a3! The Sämisch Variation - confrontational and aggressive. You\'re forcing Black to give up the Bishop or retreat.',
          failureMessage: 'The Sämisch Variation directly challenges the Bishop on b4. What pawn move attacks the Bishop?',
          arrows: [
            { from: 'a3', to: 'b4', color: 'red' },
          ],
          highlights: [
            { square: 'b4', color: 'red' },
          ],
        },
        {
          id: 'strategic-themes',
          type: 'explanation',
          fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
          title: 'Strategic Themes',
          explanation: `The Nimzo-Indian is a masterclass in **strategic chess**. Here are the key themes to remember:

**For Black:**
- **Control e4** - The whole point of pinning the Knight
- **Target the doubled c-pawns** in the endgame
- **Play ...c5** to challenge d4 and create counterplay
- **Piece activity** over pawn structure - keep pieces active

**For White:**
- **Use the Bishop pair** - Open the position to make Bishops strong
- **Push e4** when possible - Seize the center
- **Use the half-open b-file** after bxc3
- **Attack on the kingside** - The center and Bishop pair support this

**Famous practitioners:**
- **Black:** Kasparov, Karpov, Carlsen, Anand - virtually every World Champion
- **White:** Kramnik (with 4.Qc2), Botvinnik (with 4.e3)

The Nimzo-Indian has been a cornerstone of elite chess for nearly a century.`,
          highlights: [
            { square: 'b4', color: 'green' },
            { square: 'c3', color: 'yellow' },
            { square: 'e4', color: 'blue' },
            { square: 'd4', color: 'blue' },
          ],
        },
        {
          id: 'nimzo-practice',
          type: 'puzzle',
          fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
          title: 'White\'s Choice',
          explanation: `You're White facing the Nimzo-Indian (1.d4 Nf6 2.c4 e6 3.Nc3 Bb4). What move directly challenges the Bishop and leads to the aggressive Sämisch Variation?`,
          correctMoves: ['a3', 'Qc2', 'e3'],
          successMessage: 'Well done! a3 is the Sämisch, Qc2 is the Classical, and e3 is the Rubinstein - all excellent responses to the Nimzo-Indian.',
          failureMessage: 'Think about how White can address the pin on the c3-Knight. Consider challenging the Bishop directly or defending the Knight.',
          arrows: [
            { from: 'a2', to: 'a3', color: 'green' },
            { from: 'd1', to: 'c2', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'pirc-defense',
      title: 'The Pirc Defense',
      description: 'A hypermodern defense with a kingside fianchetto',
      difficulty: 'intermediate',
      estimatedMinutes: 10,
      tags: ['opening', 'e4', 'pirc', 'hypermodern'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4',
          title: 'The Pirc Defense',
          explanation: `The **Pirc Defense** (pronounced "Peerts") arises after **1.e4 d6 2.d4 Nf6 3.Nc3 g6**, and is a cornerstone of **hypermodern chess strategy**.

**Who was Vasja Pirc?** The opening is named after **Vasja Pirc (1907-1980)**, a **Slovenian Grandmaster** who was Yugoslavia's first chess master of international renown. Pirc popularized this defense in the **1940s**, demonstrating that Black could allow White a big pawn center and then systematically undermine it.

**The hypermodern philosophy:**
- Instead of occupying the center with pawns, Black **controls it from the flanks**
- The fianchettoed Bishop on g7 becomes a powerful long-range weapon
- Black invites White to overextend, then strikes back

**Why play the Pirc?**
- Extremely flexible - Black can adapt to White's setup
- Leads to original, less-theoretical positions
- The g7-Bishop can become devastatingly strong
- Surprise value - many e4 players are less prepared for it

**Key principle:** Let White build the center, then destroy it!`,
          arrows: [
            { from: 'g7', to: 'd4', color: 'yellow' },
            { from: 'g7', to: 'a1', color: 'yellow' },
          ],
          highlights: [
            { square: 'g6', color: 'green' },
            { square: 'd4', color: 'red' },
            { square: 'e4', color: 'red' },
          ],
        },
        {
          id: 'fianchetto-setup',
          type: 'explanation',
          fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 1 4',
          title: 'The Fianchetto: Bishop on g7',
          explanation: `After **3...g6**, Black prepares **4...Bg7**, placing the Bishop on the long diagonal (a1-h8). This is called a **fianchetto** (Italian for "little flank").

**The g7-Bishop:**
- Controls the long dark-squared diagonal from a1 to h8
- Puts pressure on White's d4 pawn (through the e5 square)
- Provides excellent defense for the castled King
- Can become extremely powerful if the center opens

**Black's typical setup:**
- **...g6, ...Bg7** - The fianchetto
- **...O-O** - King safety
- **...c6 or ...Nbd7** - Preparing ...e5
- **...e5** - The critical central break

**The paradox of the Pirc:** The g7-Bishop looks like it's "biting on granite" (blocked by White's d4-e4 center). But if Black can break through with ...c5 or ...e5, the Bishop suddenly comes alive with tremendous power.`,
          arrows: [
            { from: 'g7', to: 'a1', color: 'green' },
            { from: 'g7', to: 'd4', color: 'yellow' },
          ],
          highlights: [
            { square: 'g7', color: 'green' },
            { square: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'austrian-attack',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp1pp1p/3p1np1/8/3PPP2/2N5/PPP3PP/R1BQKBNR b KQkq - 0 4',
          title: 'Austrian Attack: 4.f4',
          explanation: `The **Austrian Attack** (4.f4) is the most aggressive system against the Pirc. White builds a massive pawn center and prepares a kingside attack.

**White's plan:**
- Pawns on d4, e4, and f4 create an imposing center
- The f-pawn supports an e5 advance
- White aims for a direct kingside attack
- Nf3, Be2 (or Bd3), O-O, and then e5 or f5

**The danger for Black:**
- If White gets in e5 without consequences, Black can be crushed
- The pawn avalanche can steamroll Black's position
- White's space advantage can be suffocating

**Black's counterplay:**
- **...c5** - Striking at d4 immediately
- **...e5** - Challenging the center head-on
- **...Nc6** followed by ...e5 - Piece pressure on d4
- Timing is everything - Black must strike before White consolidates

The Austrian Attack leads to some of the sharpest positions in the Pirc.`,
          arrows: [
            { from: 'f4', to: 'e5', color: 'red' },
            { from: 'e4', to: 'e5', color: 'red' },
          ],
          highlights: [
            { square: 'f4', color: 'green' },
            { square: 'e4', color: 'green' },
            { square: 'd4', color: 'green' },
          ],
        },
        {
          id: 'classical-system',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 1 4',
          title: 'Classical System: 4.Nf3',
          explanation: `**4.Nf3** is the **Classical System**, the most solid and popular approach against the Pirc.

**Why 4.Nf3?**
- Develops naturally without committing to a specific plan
- The Knight supports d4 and controls e5
- White keeps options open: Be2 (quiet) or Bc4 (aggressive)
- Prepares O-O with optimal flexibility

**Common setups for White after 4.Nf3:**
- **Be2 + O-O** - The most common, solid approach
- **Bc4** - More aggressive, targeting f7
- **h3 + Be3** - Preparing Qd2 and Bh6 to trade Black's fianchettoed Bishop

**Black's plans remain the same:**
- Complete development with ...Bg7, ...O-O
- Prepare ...e5 or ...c5 to challenge the center
- The position tends to be less sharp than the Austrian Attack

This variation is the safe, tested way to maintain White's space advantage.`,
          arrows: [
            { from: 'f3', to: 'e5', color: 'green' },
            { from: 'f3', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'f3', color: 'green' },
          ],
        },
        {
          id: 'counterattack-ideas',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1ppbp/2np2p1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 5 6',
          title: 'Counterattacking Ideas',
          explanation: `The Pirc is fundamentally a **counterattacking** opening. Black's strategy revolves around well-timed breaks:

**The ...e5 break:**
- The most important break in the Pirc
- Challenges White's d4 pawn directly
- Opens the g7-Bishop's diagonal
- Often prepared with ...Nbd7 or ...c6

**The ...c5 break:**
- Strikes at d4 from the other side
- Can be combined with ...Qa5 for extra pressure
- Sometimes leads to an isolated d4 pawn for White

**Timing is critical:**
- Too early: White may be able to maintain the center and punish Black
- Too late: White consolidates and Black is cramped
- Just right: The center collapses and Black's pieces spring to life

**A key tactic:** After ...e5, if White plays dxe5 dxe5, Black's Queen can come to xd1, and the g7-Bishop rakes down the long diagonal!`,
          arrows: [
            { from: 'e7', to: 'e5', color: 'green' },
            { from: 'c7', to: 'c5', color: 'yellow' },
          ],
          highlights: [
            { square: 'e5', color: 'green' },
            { square: 'c5', color: 'yellow' },
            { square: 'd4', color: 'red' },
          ],
        },
        {
          id: 'pawn-breaks',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1ppbp/2np2p1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 5 6',
          title: 'Key Pawn Breaks',
          explanation: `Understanding pawn breaks is essential to playing the Pirc successfully:

**Black's breaks:**
- **...e5** - The primary break, opening the g7 Bishop
- **...c5** - Attacking d4 from the flank
- **...b5** - Queenside expansion, sometimes with ...a6 first
- **...f5** - Rare but possible, attacking the e4 pawn directly

**White's breaks:**
- **e5** - The dream advance, cramping Black
- **f4-f5** - In the Austrian, breaking open the kingside
- **d5** - Closing the center, usually to attack on the kingside
- **c4-c5** - Queenside space grab

**General rule for Black:**
If White pushes e5, play around it with ...Nfd7 and ...f6. If White pushes d5, look for ...c6 or ...e6 to undermine it. Never let White's center stand unchallenged!

**The Pirc rewards patience and understanding.** It is not for those who need instant activity, but for those who believe in the power of counterattack.`,
          arrows: [
            { from: 'e7', to: 'e5', color: 'green' },
            { from: 'c7', to: 'c5', color: 'green' },
          ],
          highlights: [
            { square: 'e4', color: 'red' },
            { square: 'd4', color: 'red' },
          ],
        },
        {
          id: 'pirc-practice',
          type: 'puzzle',
          fen: 'r1bq1rk1/ppp1ppbp/2np2p1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 5 6',
          title: 'Break Through!',
          explanation: `You're Black in a typical Pirc position. Your Bishop on g7 is aiming at the d4 pawn. What is the most important central break to unleash your position?`,
          correctMoves: ['e5'],
          successMessage: 'Excellent! ...e5 is the key break in the Pirc Defense! This challenges White\'s center and unleashes the g7-Bishop along the long diagonal.',
          failureMessage: 'Think about the most direct challenge to White\'s d4-e4 center. What pawn move opens the g7-Bishop\'s diagonal?',
          arrows: [
            { from: 'e7', to: 'e5', color: 'green' },
            { from: 'g7', to: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'pirc-puzzle-austrian',
          type: 'puzzle',
          fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/3PPP2/2N5/PPP3PP/R1BQKBNR b KQkq - 0 4',
          title: 'Austrian Attack Defense',
          explanation: `You're Black facing the Austrian Attack (4.f4) in the Pirc. White has built a massive center. What developing move prepares to castle and completes your kingside fianchetto setup?`,
          correctMoves: ['O-O', 'c5'],
          successMessage: 'Well done! Castling gets your King safe before the fight begins. ...c5 is also excellent, immediately challenging White\'s center before it gets too strong!',
          failureMessage: 'Think about king safety or challenging the center. What move protects your King or strikes at d4?',
          highlights: [
            { square: 'g8', color: 'green' },
            { square: 'c5', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'grunfeld-defense',
      title: 'The Grünfeld Defense',
      description: 'A dynamic defense striking at the center with ...d5',
      difficulty: 'advanced',
      estimatedMinutes: 10,
      tags: ['opening', 'd4', 'grunfeld', 'hypermodern'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
          title: 'The Grünfeld Defense',
          explanation: `The **Grünfeld Defense** arises after **1.d4 Nf6 2.c4 g6 3.Nc3 d5** and is one of the most **dynamic and theoretically rich** openings in chess.

**Historical origin:** The defense is named after **Ernst Grünfeld (1893-1962)**, an Austrian Grandmaster who first played it in a tournament game against future World Champion **Alexander Alekhine in Vienna, 1922**. The game was a sensation - Grünfeld's bold concept challenged the prevailing wisdom of the time.

**The revolutionary idea:**
- After the quiet fianchetto preparation (...Nf6, ...g6), Black suddenly strikes with **3...d5!**
- This is provocative: Black offers White a massive pawn center
- The philosophy is that a large pawn center can be a **target** rather than a strength
- Black will use pieces (especially the g7-Bishop) to attack the center from a distance

**Why is it special?**
- Unlike the King's Indian (where Black plays ...d6), the Grünfeld immediately challenges c4
- It has been a favorite of World Champions: Kasparov, Fischer, and Carlsen have all used it extensively
- Some of the greatest games in chess history feature the Grünfeld`,
          arrows: [
            { from: 'd5', to: 'c4', color: 'red' },
            { from: 'g7', to: 'd4', color: 'yellow' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'c4', color: 'red' },
          ],
        },
        {
          id: 'grunfeld-move',
          type: 'interactive',
          fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3',
          title: 'The Grünfeld Move: 3...d5!',
          explanation: `After **1.d4 Nf6 2.c4 g6 3.Nc3**, Black has a critical decision. The King's Indian plays ...Bg7 and ...d6, keeping the center closed. But the Grünfeld takes a different path.

Strike at the center immediately with the bold pawn advance! This is the move that defines the Grünfeld Defense and shocked the chess world in 1922.`,
          correctMoves: ['d5'],
          successMessage: '3...d5! The Grünfeld Defense! You\'re immediately challenging White\'s center, just as Ernst Grünfeld did against Alekhine a century ago.',
          failureMessage: 'The Grünfeld is defined by an immediate central challenge. What pawn move directly attacks White\'s c4 pawn?',
          arrows: [
            { from: 'd7', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'green' },
          ],
        },
        {
          id: 'exchange-variation',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp1pp1p/5np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq - 0 5',
          title: 'Exchange Variation: 4.cxd5 Nxd5 5.e4',
          explanation: `The **Exchange Variation** (4.cxd5 Nxd5 5.e4) is the main line and the ultimate test of the Grünfeld. White builds the ideal pawn center that Black has provoked.

**After 4.cxd5 Nxd5 5.e4:**
- White has pawns on d4 and e4 - a classical dream center
- The Knight on d5 is kicked away by e4
- White's center looks imposing and dominating

**But here's the Grünfeld paradox:**
- Black has deliberately ALLOWED this center
- Black believes the center is **overextended** and can be destroyed
- After 5...Nxc3 6.bxc3, Black plays ...Bg7 and targets d4 relentlessly
- The g7-Bishop becomes a monster on the long diagonal

**The philosophical battle:**
- White says: "My center is strong and will crush you"
- Black says: "Your center is a target, and I'll tear it apart"

This creates some of the most exciting, deeply analyzed positions in all of chess theory.`,
          arrows: [
            { from: 'e4', to: 'd5', color: 'red' },
            { from: 'g7', to: 'd4', color: 'yellow' },
          ],
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'd4', color: 'green' },
            { square: 'd5', color: 'red' },
          ],
        },
        {
          id: 'counterattack-d4',
          type: 'explanation',
          fen: 'rnbq1rk1/ppp1ppbp/6p1/8/3PP3/2P2N2/P4PPP/R1BQKB1R b KQ - 0 7',
          title: 'The Attack on d4',
          explanation: `In the Exchange Variation, after 5...Nxc3 6.bxc3 Bg7 7.Nf3, the battle lines are drawn. Black's entire strategy revolves around attacking the d4 pawn.

**Black's weapons against d4:**
- The **g7-Bishop** - Constant pressure on d4 through the diagonal
- **...c5** - The most direct pawn break, hitting d4
- **...Nc6** - Adding piece pressure to d4
- **...Bg4** - Pinning the f3-Knight that defends d4
- **...Qa5** - Targeting the c3 pawn (which supports d4)

**White's defensive resources:**
- The c3 pawn supports d4
- The f3-Knight defends d4
- Be3 adds another defender
- White can push d5 to release the tension

**The resulting play** is incredibly rich: Black chips away at d4 with every tool available, while White tries to use the central space for a kingside attack. This dynamic tension is what makes the Grünfeld a lifetime opening.`,
          arrows: [
            { from: 'g7', to: 'd4', color: 'red' },
            { from: 'c7', to: 'c5', color: 'yellow' },
          ],
          highlights: [
            { square: 'd4', color: 'red' },
            { square: 'c3', color: 'yellow' },
            { square: 'g7', color: 'green' },
          ],
        },
        {
          id: 'middlegame-structures',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2ppbp/2n3p1/2p5/3PP3/2P2N2/P3BPPP/R1BQ1RK1 w - - 0 9',
          title: 'Typical Middlegame Structures',
          explanation: `After Black plays ...c5 against White's center, several typical structures arise:

**Structure 1: White maintains d4-e4**
- White has a space advantage but must defend both pawns
- Black maneuvers pieces to increase pressure
- A war of attrition where Black probes for weaknesses

**Structure 2: White plays d5**
- Closes the center but blocks the g7-Bishop temporarily
- Play shifts to the flanks: White attacks kingside, Black the queenside
- The g7-Bishop may reroute via ...Bd4 or ...Be5

**Structure 3: d4 is exchanged (dxc5 or ...cxd4)**
- Open positions where piece activity becomes paramount
- The g7-Bishop comes alive on the open diagonal
- Both sides need active piece play

**Kasparov's contribution:**
Garry Kasparov made the Grünfeld his primary weapon against 1.d4, playing it in numerous World Championship matches. His deep understanding of the dynamic possibilities transformed how the opening is viewed.`,
          arrows: [
            { from: 'c5', to: 'd4', color: 'red' },
            { from: 'g7', to: 'a1', color: 'yellow' },
          ],
          highlights: [
            { square: 'd4', color: 'red' },
            { square: 'e4', color: 'yellow' },
            { square: 'c5', color: 'green' },
          ],
        },
        {
          id: 'dynamic-play',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
          title: 'Dynamic Play Concepts',
          explanation: `The Grünfeld teaches fundamental lessons about **dynamic chess**:

**Lesson 1: Center control vs. center occupation**
- Occupying the center with pawns is not always best
- Pieces can control the center just as effectively
- An overextended center becomes a liability

**Lesson 2: The power of the fianchetto**
- A Bishop on g7 in the Grünfeld is worth its weight in gold
- It pressures the entire long diagonal
- Even when blocked, it provides latent energy that can be unleashed

**Lesson 3: Concrete play over general principles**
- In the Grünfeld, specific tactical ideas matter more than general rules
- Both sides need to calculate precisely
- One wrong move can shift the balance dramatically

**Other systems for White:**
- **Russian System (4.Nf3 Bg7 5.Qb3)** - Pressuring d5 and b7
- **Fianchetto System (4.Nf3 Bg7 5.g3)** - Quiet but strategic
- **4.Bf4** - Developing before committing to a pawn structure

Each system requires different knowledge, making the Grünfeld a deep, rewarding opening.`,
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'c4', color: 'yellow' },
            { square: 'd4', color: 'yellow' },
          ],
        },
        {
          id: 'grunfeld-practice',
          type: 'puzzle',
          fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3',
          title: 'The Grünfeld Challenge',
          explanation: `You're Black after 1.d4 Nf6 2.c4 g6 3.Nc3. Instead of the quiet King's Indian (...Bg7 and ...d6), what bold move defines the Grünfeld Defense?`,
          correctMoves: ['d5'],
          successMessage: '3...d5! The Grünfeld Defense! You\'re challenging White to build a big center - and then you\'ll tear it apart. Kasparov would approve!',
          failureMessage: 'The Grünfeld is defined by an immediate pawn challenge in the center. What pawn move confronts White\'s c4 pawn directly?',
          arrows: [
            { from: 'd7', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'grunfeld-puzzle-c5',
          type: 'puzzle',
          fen: 'rnbq1rk1/ppp1ppbp/6p1/8/3PP3/2P2N2/P4PPP/R1BQKB1R b KQ - 0 7',
          title: 'Attack the Center!',
          explanation: `You're Black in the Grünfeld Exchange Variation. White has built the ideal center with pawns on d4 and e4. Your g7 Bishop is eyeing d4. What is the most important pawn break to challenge White's center?`,
          correctMoves: ['c5'],
          successMessage: 'Perfect! ...c5 is the key move in the Grünfeld! It strikes at the base of White\'s center and opens lines for your powerful g7 Bishop. This is the Grünfeld philosophy in action!',
          failureMessage: 'Your g7 Bishop is aiming at d4. What pawn move directly attacks the d4 pawn and opens the long diagonal?',
          arrows: [
            { from: 'c7', to: 'c5', color: 'green' },
            { from: 'g7', to: 'd4', color: 'yellow' },
          ],
          highlights: [
            { square: 'c5', color: 'green' },
            { square: 'd4', color: 'red' },
          ],
        },
      ],
    },
    {
      id: 'catalan-opening',
      title: 'The Catalan Opening',
      description: 'A positional system with a kingside fianchetto for White',
      difficulty: 'advanced',
      estimatedMinutes: 10,
      tags: ['opening', 'd4', 'catalan', 'positional'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3',
          title: 'The Catalan Opening',
          explanation: `The **Catalan Opening** arises after **1.d4 Nf6 2.c4 e6 3.g3**, and is one of the most respected positional systems in modern chess.

**Historical origin:** The Catalan gets its name from the **Catalonia region in Spain**. It was first played at the **1929 Barcelona tournament**, organized by the Catalan chess community. The tournament organizers specifically requested that a new opening be debuted at their event, and the great Savielly Tartakower obliged by introducing this system. The name honors both the tournament's location and the Catalan people's passion for chess.

**Key concept:**
- White fianchettoes the King's Bishop to g2
- The Bishop on g2 controls the long light-squared diagonal (a8-h1)
- Combined with pawns on c4 and d4, White exerts tremendous pressure on Black's queenside
- This is a **slow, strategic squeeze** rather than a direct attack

**Modern relevance:**
- The Catalan has become enormously popular at the elite level
- Vladimir Kramnik, Vishy Anand, and Magnus Carlsen have all used it extensively
- It's considered one of the best ways to play for a slight, lasting advantage`,
          arrows: [
            { from: 'g2', to: 'a8', color: 'yellow' },
            { from: 'g2', to: 'd5', color: 'green' },
          ],
          highlights: [
            { square: 'g3', color: 'green' },
            { square: 'c4', color: 'blue' },
            { square: 'd4', color: 'blue' },
          ],
        },
        {
          id: 'fianchetto',
          type: 'explanation',
          fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3',
          title: 'The Fianchetto: 3.g3',
          explanation: `The move **3.g3** is the hallmark of the Catalan. Instead of developing the Bishop to traditional squares like d3 or e2, White prepares a fianchetto.

**Why fianchetto?**
- The Bishop on g2 will be enormously powerful on the long diagonal
- It pressures d5 (where Black often places a pawn) and b7 (a common weakness)
- It coordinates beautifully with the c4 and d4 pawns
- After castling, the King is safe behind the fianchetto structure

**The diagonal a8-h1:**
- This is one of the most important diagonals in chess
- The g2-Bishop "X-rays" through d5 toward Black's queenside
- Black's b7 and a8 squares can become vulnerable
- If Black plays ...dxc4, the Bishop's diagonal opens fully

**Comparison to other d4 systems:**
- Unlike the Queen's Gambit (where the Bishop goes to d3 or e2), the Catalan keeps the Bishop on the flank
- This gives White a unique positional squeeze
- The g2-Bishop works on both offense and defense simultaneously

The Catalan is chess at its most refined - subtle pressure that gradually accumulates.`,
          arrows: [
            { from: 'g2', to: 'd5', color: 'green' },
            { from: 'g2', to: 'b7', color: 'red' },
            { from: 'g2', to: 'a8', color: 'yellow' },
          ],
          highlights: [
            { square: 'g3', color: 'green' },
          ],
        },
        {
          id: 'open-catalan',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/8/2pP4/6P1/PP2PPBP/RNBQK1NR w KQkq - 0 5',
          title: 'Open Catalan: 3...d5 4.Bg2 dxc4',
          explanation: `The **Open Catalan** arises after **3...d5 4.Bg2 dxc4**, where Black captures the c4 pawn. This is the most critical test of the Catalan.

**Black's reasoning:**
- Grab the pawn and try to hold it
- Disrupt White's ideal pawn structure
- Force White to spend time recovering the pawn

**White's compensation:**
- The g2-Bishop is now a **monster** on the open diagonal
- It pressures b7, which is hard to defend
- White has a development advantage while Black tries to hold c4
- After Nf3 and O-O, White's pieces are perfectly placed

**Typical continuation:** 5.Nf3 (or 5.Qa4+) and White often recovers the c4 pawn naturally. Black struggles to hold it because:
- ...b5 weakens the queenside
- ...a6 is slow
- White can play a4 to undermine b5

**The key insight:** In the Open Catalan, White usually gets the pawn back with a better position. The temporary pawn sacrifice is an investment in long-term positional superiority.`,
          arrows: [
            { from: 'g2', to: 'b7', color: 'red' },
            { from: 'g2', to: 'a8', color: 'red' },
          ],
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'g2', color: 'green' },
            { square: 'b7', color: 'red' },
          ],
        },
        {
          id: 'closed-catalan',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/6P1/PP2PPBP/RNBQK1NR b KQkq - 1 4',
          title: 'Closed Catalan: Keeping the Tension',
          explanation: `In the **Closed Catalan**, Black plays **3...d5** but does NOT capture on c4. Instead, Black maintains the pawn on d5 and develops pieces.

**Black's typical setup:**
- **...Be7** - Solid development
- **...O-O** - King safety first
- **...Nbd7** or **...c6** - Reinforcing d5
- **...b6 + ...Bb7** - Fianchettoing the Queen's Bishop

**Strategic character:**
- The position is more closed and maneuvering
- The d5 pawn blocks the g2-Bishop's diagonal partially
- But the pawn tension (c4 vs d5) can break open at any moment
- White keeps persistent pressure: when should dxc4 or cxd5 happen?

**White's plans:**
- Qc2 - Supporting c4 and preparing e4
- Nf3 + O-O - Natural development
- b3 + Bb2 - Double fianchetto for ultimate control
- Nbd2 + e4 - Central expansion

The Closed Catalan rewards deep positional understanding from both sides.`,
          arrows: [
            { from: 'g2', to: 'd5', color: 'yellow' },
            { from: 'c4', to: 'd5', color: 'yellow' },
          ],
          highlights: [
            { square: 'd5', color: 'blue' },
            { square: 'c4', color: 'blue' },
            { square: 'g2', color: 'green' },
          ],
        },
        {
          id: 'positional-pressure',
          type: 'explanation',
          fen: 'rn1q1rk1/pbp1bppp/1p2pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 0 7',
          title: 'Positional Pressure',
          explanation: `The Catalan's strength lies in its **persistent positional pressure**. White's advantages accumulate slowly but steadily:

**The light-square squeeze:**
- The g2-Bishop dominates the light squares
- Black's light-squared Bishop (often on b7) is comparatively passive
- The d5 square becomes a critical battleground
- Black's queenside pawns (b7, c6/c7) can become targets

**White's long-term ideas:**
- **Nd2-e4** or **Nc3-e4** - Knight to the outpost
- **Qc2 + e4** - Breaking through the center
- **a4-a5** - Queenside expansion
- **Ne5** - A powerful centralization

**Why the Catalan is so effective:**
- White's advantage is hard to target (it's positional, not tactical)
- Black must play very precisely to equalize
- Even small inaccuracies can lead to a lasting disadvantage
- The positions are complex but not sharp - favoring the better player

**Magnus Carlsen** has won numerous games from these positions, demonstrating that even the slightest advantage can be converted by a skilled player.`,
          arrows: [
            { from: 'g2', to: 'b7', color: 'yellow' },
            { from: 'd2', to: 'e4', color: 'green' },
          ],
          highlights: [
            { square: 'g2', color: 'green' },
            { square: 'd5', color: 'blue' },
          ],
        },
        {
          id: 'long-term',
          type: 'explanation',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/8/2pP4/6P1/PP2PPBP/RNBQK1NR w KQkq - 0 5',
          title: 'Long-Term Compensation',
          explanation: `One of the Catalan's most important themes is White's **long-term compensation** for the sacrificed c4 pawn in the Open variation:

**Why the pawn is not really "lost":**
- White almost always recovers it within 5-10 moves
- Meanwhile, Black's queenside development is awkward
- The open c-file and diagonal give White lasting initiative
- Black's extra pawn often costs more to hold than it's worth

**Typical recovery methods:**
- **Qa4+** followed by Qxc4 - Direct recovery
- **Ne5** - Pressuring c4 and b7 simultaneously
- **a4** - Preventing ...b5 and preparing to win c4 back
- Simply developing and letting Black's defense collapse

**The Catalan spirit:**
The Catalan teaches a profound lesson: **material is not everything**. Positional advantages - better pieces, more space, superior pawn structure - can outweigh a pawn deficit. This is why the Catalan appeals to positionally gifted players who understand that **long-term pressure wins games**.

**Key takeaway:** In the Catalan, play the position, not the material count.`,
          arrows: [
            { from: 'g2', to: 'a8', color: 'yellow' },
            { from: 'f3', to: 'e5', color: 'green' },
          ],
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'g2', color: 'green' },
          ],
        },
        {
          id: 'catalan-practice',
          type: 'puzzle',
          fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
          title: 'Enter the Catalan',
          explanation: `You're White after 1.d4 Nf6 2.c4 e6. What move signals the Catalan Opening, preparing a kingside fianchetto?`,
          correctMoves: ['g3'],
          successMessage: '3.g3! The Catalan Opening! You\'re preparing to fianchetto your Bishop to g2, where it will dominate the long diagonal. Tartakower would be pleased!',
          failureMessage: 'The Catalan is defined by a fianchetto on the kingside. What pawn move prepares to develop the Bishop to g2?',
          arrows: [
            { from: 'g2', to: 'g3', color: 'green' },
            { from: 'g2', to: 'a8', color: 'yellow' },
          ],
        },
        {
          id: 'catalan-puzzle-recover',
          type: 'puzzle',
          fen: 'rnbqkb1r/ppp2ppp/4pn2/8/2pP4/5NP1/PP2PPBP/RNBQK2R w KQkq - 0 5',
          title: 'Open Catalan: Recover the Pawn',
          explanation: `You're White in the Open Catalan after 4...dxc4. Your g2 Bishop is staring down the long diagonal toward b7. What natural developing move prepares castling while your Bishop pressures Black's queenside?`,
          correctMoves: ['O-O', 'Qa4+'],
          successMessage: 'Excellent! O-O completes development and prepares to recover the c4 pawn naturally. Qa4+ is also strong, winning back the pawn immediately with a check! In both cases, White\'s g2 Bishop is a monster.',
          failureMessage: 'Think about completing your development or recovering the pawn. What move gets your King safe or wins c4 back?',
          arrows: [
            { from: 'g2', to: 'b7', color: 'red' },
          ],
          highlights: [
            { square: 'c4', color: 'yellow' },
            { square: 'g2', color: 'green' },
          ],
        },
      ],
    },
  ],
};

