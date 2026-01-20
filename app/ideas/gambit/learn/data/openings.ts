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
          explanation: `The **Sicilian Defense** (1.e4 c5) is the most popular and theoretically important response to 1.e4. It's the choice of fighting players who want to win with Black!

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
          id: 'sicilian-practice',
          type: 'puzzle',
          fen: 'rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 5',
          title: 'Sicilian Development',
          explanation: `You're White in a typical Open Sicilian position. What's the most natural developing move that prepares Be2 and O-O while also supporting the e4 pawn?`,
          correctMoves: ['Be2', 'Bc4', 'f3'],
          successMessage: 'Good choice! Developing the bishop is the right idea. Be2 is the most flexible, Bc4 is aggressive (Sozin/Velimirovic), and f3 supports e4.',
          failureMessage: 'Think about developing your pieces. Which piece should move to complete your kingside development?',
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
          explanation: `The **London System** is one of the most reliable and easy-to-learn openings for White. It starts with **1.d4** and follows a consistent setup regardless of what Black plays!

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
          explanation: `The **Queen's Gambit** (1.d4 d5 2.c4) is one of the oldest and most respected openings in chess, dating back to the 15th century!

**Is it a real gambit?**
Not really! Unlike the King's Gambit where White truly sacrifices material, the Queen's Gambit allows White to regain the pawn easily. It's more of a temporary "loan" than a sacrifice.

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
          explanation: `The **Caro-Kann Defense** (1.e4 c6) is one of the most solid and respected responses to 1.e4. Named after players Horatio Caro and Marcus Kann, it has been a favorite of World Champions seeking reliable positions.

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
          explanation: `The **French Defense** (1.e4 e6) is a fighting defense that leads to rich strategic battles. It's named after a correspondence match between London and Paris in 1834.

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
          explanation: `The **King's Indian Defense** is one of the most dynamic and fighting defenses against 1.d4. It's the opening of attackers!

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
          explanation: `The **Ruy Lopez** (Spanish Game) is one of the most important openings in chess history. Named after 16th-century Spanish priest Ruy López de Segura, it has been played at the highest level for over 500 years!

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
          explanation: `The **English Opening** (1.c4) is the fourth most popular first move, named after Howard Staunton, the English world champion of the 1840s.

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
          explanation: `The **Scandinavian Defense** (1.e4 d5) is one of the oldest recorded openings, dating back to the 15th century!

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
          explanation: `The **Dutch Defense** (1.d4 f5) is an ambitious and fighting response to 1.d4. It immediately fights for control of the e4 square!

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
          id: 'dutch-practice',
          type: 'puzzle',
          fen: 'rnbqkb1r/ppppp1pp/5n2/5p2/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3',
          title: 'Anti-Dutch Ideas',
          explanation: `You're White against the Dutch. What's the typical setup move that develops while preparing g3 and Bg2?`,
          correctMoves: ['g3', 'c4', 'Bf4'],
          successMessage: 'Good choice! g3+Bg2 is the most common setup. c4 and Bf4 are also excellent, controlling key squares.',
          failureMessage: 'Think about how to develop against the Dutch. A fianchetto or c4 are typical.',
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
          explanation: `The **Vienna Game** (1.e4 e5 2.Nc3) is a flexible opening that offers something for every style!

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
      ],
    },
  ],
};

