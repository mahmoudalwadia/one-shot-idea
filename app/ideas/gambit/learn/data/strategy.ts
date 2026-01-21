import { Course } from './types';

export const strategyCourse: Course = {
  id: 'strategy',
  title: 'Strategic Thinking',
  description: 'High-level concepts for better decision making',
  icon: '🧠',
  color: '#06b6d4',
  lessons: [
    {
      id: 'planning',
      title: 'Creating a Plan',
      description: 'How to formulate and execute strategic plans',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      tags: ['planning', 'strategy', 'thinking'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
          title: 'Why Plans Matter',
          explanation: `Chess without a plan is like driving without a destination—you might move, but you won't get anywhere meaningful.

**A plan gives you:**
- **Direction and purpose** for every move
- **Coordination** between your pieces
- **A way to evaluate** if you're making progress
- **A framework** for difficult decisions

As World Champion Emanuel Lasker famously said: *"A bad plan is better than no plan at all."* This might seem counterintuitive, but having ANY plan means your pieces work together toward a goal. Random moves, even good ones, often cancel each other out.

**The planning process:**
1. Assess the current position
2. Identify imbalances
3. Choose a target or goal
4. Find moves that work toward your goal
5. Adjust as the opponent responds

Let's walk through each step.`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'green' },
            { from: 'f3', to: 'g5', color: 'yellow' },
          ],
        },
        {
          id: 'assess-position',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Step 1: Assess the Position',
          explanation: `Before making a plan, you need to understand what's happening on the board. Go through this **mental checklist**:

**Material:** Who has more pieces or pawns? Even a single pawn advantage can determine your strategy.

**King Safety:** Are both kings castled? Are there attacking chances against either king? A unsafe king changes everything.

**Pawn Structure:** Look for weaknesses:
- Isolated pawns (no adjacent pawns to defend them)
- Doubled pawns (two pawns on the same file)
- Backward pawns (behind their neighbors, can't advance safely)
- Passed pawns (no enemy pawns can stop them)

**Piece Activity:** Which pieces are well-placed? Which are passive or "bad"? A "bad bishop" is blocked by its own pawns.

**Space:** Who has more room to maneuver? The side with more space can transfer pieces more easily.

In this position, both sides have completed development. White has slightly more central presence, while Black has solid piece placement. The assessment reveals: equal material, safe kings, no major pawn weaknesses, but White has the **bishop pair** and a potential target on f7.`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'c1', color: 'green' },
            { square: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'find-imbalances',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 2 8',
          title: 'Step 2: Find the Imbalances',
          explanation: `**Imbalances** are the differences between the two positions. They tell you what to play for!

**Types of imbalances:**

**Material:** One side has more or different pieces (e.g., two bishops vs bishop + knight)

**Pawn Structure:** One side has a stronger or weaker pawn formation

**Space:** One side controls more squares

**Development:** One side's pieces are more active

**King Safety:** One king is more exposed

**Initiative:** One side is dictating play

In this position, the key imbalances are:
- White has the **bishop pair** (both bishops vs bishop + knight)
- White has **more central space**
- Black has a **solid but slightly cramped** position

**Your plan should exploit YOUR favorable imbalances while minimizing your weaknesses.**

For White: The bishop pair suggests keeping the position open. The space advantage means White can maneuver more freely.

For Black: Aim to exchange pieces to relieve cramping, or close the position to reduce the bishop pair's power.`,
          arrows: [
            { from: 'c4', to: 'a2', color: 'green' },
            { from: 'c4', to: 'g8', color: 'green' },
          ],
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'c1', color: 'green' },
          ],
        },
        {
          id: 'choose-target',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Step 3: Choose a Target',
          explanation: `Good plans often revolve around a **specific target**—something concrete you're playing to win or weaken.

**Common targets:**

**Weak Pawns:**
- Isolated pawns have no neighbors to defend them
- Backward pawns can't safely advance
- Doubled pawns are immobile
- The d6 pawn here is slightly backward

**Weak Squares:**
- "Holes" in the pawn structure
- Squares your opponent can't defend with pawns
- Outpost squares for your pieces

**The Enemy King:**
- When castled positions can be cracked open
- When the king is in the center too long
- When defensive pieces have been exchanged

**Poorly Placed Pieces:**
- Pieces that can be attacked repeatedly
- Pieces stuck defending weaknesses
- Pieces far from the action

In this position, White might target:
- The **f7 square** (classic weakness)
- The **d6 pawn** (slightly backward)
- A future **kingside attack** if pieces coordinate`,
          highlights: [
            { square: 'd6', color: 'yellow' },
            { square: 'f7', color: 'red' },
          ],
          arrows: [
            { from: 'c4', to: 'f7', color: 'yellow' },
          ],
        },
        {
          id: 'formulate-plan',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Formulate the Plan',
          explanation: `Now let's put it into practice. White has developed pieces but the position lacks a clear direction.

**The assessment shows:**
- Equal material
- Both kings safe
- White has slightly more space
- White's light-squared bishop could be more active

What move begins a meaningful plan? Think about improving a piece while creating pressure.`,
          correctMoves: ['Bg5', 'Nd5', 'd4'],
          arrows: [
            { from: 'c1', to: 'g5', color: 'green' },
            { from: 'c3', to: 'd5', color: 'blue' },
          ],
          successMessage: 'Excellent thinking! Bg5 pins the knight and creates pressure on Black\'s kingside. Nd5 places a knight on a powerful central outpost. d4 challenges the center. These moves have PURPOSE—improving pieces while creating threats.',
          failureMessage: 'Think about improving your pieces while creating threats. Which piece isn\'t on its optimal square? Where would it be more active?',
        },
        {
          id: 'execute-plan',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Step 4: Execute with Flexibility',
          explanation: `Here's the critical insight: **Plans are guides, not commands.**

**The best planners adapt constantly:**

**If your opponent blocks your plan:**
- Don't bash your head against a wall
- Find another route to the same goal
- Or switch to a different goal entirely

**If tactical opportunities arise:**
- Seize them! Even if "off-plan"
- Tactics always take priority
- Then return to strategic play

**After each opponent move, re-evaluate:**
- Has the position changed significantly?
- Is my plan still best?
- Has a new target appeared?

**Example of flexibility:**
If you're planning a kingside attack and your opponent trades queens, you might need to switch to an endgame plan instead. The player who adjusts fastest usually wins.

As Garry Kasparov said: *"The plan should be flexible enough to adapt to changes. The rigid adherence to a plan in the face of clear refutation is the mark of a weaker player."*`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'green' },
            { from: 'd1', to: 'b3', color: 'yellow' },
            { from: 'f3', to: 'g5', color: 'blue' },
          ],
        },
        {
          id: 'planning-practice',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - d6 0 8',
          title: 'Find the Right Plan',
          explanation: `Black has just played ...d5, challenging White's center. What's the right response?

**Consider:**
- Black wants to free their position
- White has more space
- The center is under tension

What's White's best plan here?`,
          correctMoves: ['cxd5', 'e4'],
          arrows: [
            { from: 'c4', to: 'd5', color: 'green' },
            { from: 'e3', to: 'e4', color: 'yellow' },
          ],
          successMessage: 'Good strategic thinking! cxd5 exchanges and opens lines for your pieces. After exd5, you get the Carlsbad structure where the minority attack (b4-b5) becomes your long-term plan.',
          failureMessage: 'Black is challenging your center. You should either capture to simplify, or counter in the center. What maintains or increases your advantage?',
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Planning Summary',
          explanation: `Let's summarize the planning process:

**The Four-Step Method:**
1. **Assess** - Evaluate material, king safety, pawns, pieces, space
2. **Imbalances** - What's different? What favors you?
3. **Target** - Choose something concrete to play for
4. **Execute** - Make moves toward your goal, staying flexible

**Key principles:**
- Every move should have a purpose
- Bad plan > no plan
- Stay flexible—adapt to changes
- Reassess after each opponent move

**Common planning mistakes:**
- Playing random "good" moves without direction
- Being too rigid when opponent disrupts your plan
- Having multiple plans at once (unfocused)
- Ignoring what opponent is trying to do

**Practice suggestion:**
Before each move in your games, ask: "What's my plan? Does this move fit it?" This simple habit will dramatically improve your play.

*"In chess, knowledge is a very transient thing. What really matters is your ability to apply it."* - Lev Polugaevsky`,
        },
      ],
    },
    {
      id: 'prophylactic-thinking',
      title: 'Prophylactic Thinking',
      description: 'The art of prevention',
      difficulty: 'advanced',
      estimatedMinutes: 12,
      tags: ['prophylaxis', 'prevention', 'thinking'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Think for Your Opponent',
          explanation: `**Prophylaxis** (from Greek: "to guard against") is one of the most powerful concepts in chess. It means **preventing your opponent's plans** before they become dangerous.

**The prophylactic mindset:**
- What would my opponent play if it were their turn?
- What is their best idea right now?
- How can I stop it?
- Can I stop it while improving my position?

This defensive awareness prevents many problems! Elite players spend as much time thinking about opponent's ideas as their own.

**Why prophylaxis is so effective:**
1. Prevents threats before they materialize
2. Often improves your position at the same time
3. Forces opponent to find new plans
4. Psychologically frustrating for the attacker

Tigran Petrosian, the 9th World Champion, was called the "Iron Tigran" because of his incredible prophylactic skills. He would sense danger before it existed and prevent it with quiet moves that seemed strange at first—until you saw what they prevented.

*"I see my task as preventing my opponent's plans from being realized."* - Petrosian`,
          arrows: [
            { from: 'c5', to: 'e3', color: 'red' },
            { from: 'f6', to: 'g4', color: 'red' },
          ],
        },
        {
          id: 'example-prophylaxis',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N1P/PPP2PP1/R1BQ1RK1 b - - 0 8',
          title: 'h3 - Classic Prophylaxis',
          explanation: `Why did White play the "slow" move h3? Let's investigate.

**What h3 prevents:**
- **...Bg4** pinning the knight to the queen
- This pin would be very annoying to deal with
- White would have to play h3 later anyway, but in a worse version

**What h3 provides:**
- **Luft** (escape square) for the king
- Prevents back-rank mate possibilities later
- Prepares possible g4 expansion
- Takes away an important square from Black's pieces

**The magic of good prophylaxis:**
This "slow" move actually saves time in the long run! If White had to deal with ...Bg4 later, it might take 2-3 moves to solve. h3 prevents all those problems with ONE move.

**Prophylaxis vs. Paranoia:**
Prophylaxis isn't about stopping everything—it's about stopping **real** threats. Don't waste moves preventing non-existent dangers. The threat you're preventing should be genuine.`,
          arrows: [
            { from: 'c8', to: 'g4', color: 'red' },
          ],
          highlights: [
            { square: 'h3', color: 'green' },
            { square: 'g4', color: 'red' },
          ],
        },
        {
          id: 'stop-break',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2np1n2/2p1p3/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 9',
          title: 'Preventing Pawn Breaks',
          explanation: `Opponent's pawn breaks can completely change the character of the position. Preventing them is often crucial.

**In this position, Black desperately wants ...d5:**
- It would challenge White's center
- Free Black's cramped pieces
- Activate the light-squared bishop
- Equalize the game

**How White can prevent ...d5:**

**Option 1: Block with d4**
- Physically stops ...d5
- Gains central space
- But might weaken e4

**Option 2: Prepare to meet d5 with exd5**
- If ...d5 exd5 Nxd5, White has Nxd5 with good play
- Less committal than d4

**Option 3: Put pressure on d5**
- Pieces on c4, b3 discourage ...d5
- Make Black's break unfavorable

The key insight: **when you control your opponent's pawn breaks, you control the game's direction.**`,
          arrows: [
            { from: 'd6', to: 'd5', color: 'red' },
            { from: 'd2', to: 'd4', color: 'green' },
          ],
          highlights: [
            { square: 'd5', color: 'yellow' },
          ],
        },
        {
          id: 'prevent-plan',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2np1n2/2p1p3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Stop the Plan',
          explanation: `Black wants to play ...d5 to free their position. This would equalize the game.

How can White **prevent** this most effectively while also improving their position?`,
          correctMoves: ['d4'],
          arrows: [
            { from: 'd3', to: 'd4', color: 'green' },
            { from: 'd6', to: 'd5', color: 'red' },
          ],
          successMessage: 'Correct! d4 stops ...d5 permanently and gains central space. Now Black must find another plan entirely. This is prophylaxis at its finest—you improve your position while destroying opponent\'s idea.',
          failureMessage: 'Think about what Black wants (...d5). What move prevents this directly while also improving White\'s position?',
        },
        {
          id: 'preventing-attacks',
          type: 'explanation',
          fen: 'r1b2rk1/pp1nqppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
          title: 'Preventing Piece Maneuvers',
          explanation: `Prophylaxis isn't just about pawn breaks—it's about preventing all of opponent's good ideas.

**Watch for piece maneuvers:**

**Knight jumps:**
- If opponent's knight wants to go to e4, can you control e4?
- If they want Ng4, does h3 stop it?

**Bishop activation:**
- A bad bishop wants to escape—can you keep it bad?
- If ...Bf5 is coming, should you play g4?

**Rook lifts:**
- If opponent is planning ...Rf6-h6, can you prevent it?
- Sometimes a simple Kh1 ruins a whole attack plan

**In this position:**
Black wants to play ...Ne4 to exchange White's good knight. White can prevent this with Nd2, controlling e4 while preparing a bishop retreat to b1.

**Key question:** Before each move, ask "What does my opponent WANT to do?" Then consider if you should stop it.`,
          arrows: [
            { from: 'f6', to: 'e4', color: 'red' },
            { from: 'f3', to: 'd2', color: 'green' },
          ],
          highlights: [
            { square: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'prophylaxis-practice',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Find the Prophylactic Move',
          explanation: `Black has two main plans here:
1. ...d4 pushing the knight away
2. ...Ne4 centralizing with tempo

What quiet move prevents BOTH of Black's ideas while improving White's position?`,
          correctMoves: ['cxd5', 'Bd3'],
          arrows: [
            { from: 'd5', to: 'd4', color: 'red' },
            { from: 'f6', to: 'e4', color: 'red' },
          ],
          successMessage: 'Well found! cxd5 simplifies and prevents ...d4. Bd3 also works—it defends c4, supports e4, and prepares to meet ...Ne4 with Bxe4.',
          failureMessage: 'Think about what Black wants: ...d4 or ...Ne4. Can you find a move that addresses both threats?',
        },
        {
          id: 'balance',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Balance Attack and Defense',
          explanation: `A common mistake is becoming **too defensive**. Prophylaxis should enhance your position, not paralyze it.

**Good prophylaxis:**
- Improves your position while preventing opponent's ideas
- Doesn't waste tempo on non-threats
- Maintains your own attacking chances
- Is part of your overall plan

**Bad "prophylaxis" (really just paranoia):**
- Stopping threats that don't exist
- Wasting moves on minor inconveniences
- Becoming passive and reactive
- Letting opponent dictate the game

**The ideal prophylactic move:**
✓ Stops something real
✓ Improves your position
✓ Fits your plan
✓ Doesn't create new weaknesses

**Example:** h3 in the Italian is perfect prophylaxis. It stops ...Bg4, creates luft, and prepares g4 expansion—all positive!

**Counter-example:** Playing h3 when the opponent's bishop can't even go to g4 is wasted time.

*"The best prophylactic move is one that the opponent hasn't even thought of yet."* - Aron Nimzowitsch`,
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Prophylaxis Summary',
          explanation: `**The prophylactic method:**

1. **Ask:** What does my opponent want to do?
2. **Evaluate:** Is this threat real and dangerous?
3. **Prevent:** Can I stop it while improving my position?
4. **Balance:** Don't become purely defensive

**Types of things to prevent:**
- Pawn breaks (...d5, ...f5, ...c5)
- Piece maneuvers (...Ne4, ...Bg4)
- Attacks on your king
- Exchanges that favor opponent
- Development of bad pieces

**Signs you need prophylaxis:**
- Opponent's position is improving
- A clear threat is coming
- Opponent has "only one good move"
- Your advantage is slipping

**Practice tip:**
In every position, BEFORE planning your own moves, spend 30 seconds as your opponent. What would YOU play as Black? This habit alone will save you many games.

*"The player who prevents best, wins."* - Tigran Petrosian`,
        },
      ],
    },
    {
      id: 'pawn-breaks',
      title: 'Pawn Breaks',
      description: 'Opening the position with pawns',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['pawns', 'breaks', 'opening-lines'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
          title: 'What is a Pawn Break?',
          explanation: `A **pawn break** is a pawn advance that challenges the enemy pawn structure, typically by capturing or threatening to capture.

**Why pawn breaks matter:**
- **Open lines** for your pieces (rooks especially)
- **Create weaknesses** in opponent's structure
- **Change the character** of the position
- **Release tension** at the right moment

**Pawn breaks are perhaps the most important strategic tool you have.** They determine whether the position becomes open or closed, tactical or positional.

**Types of pawn breaks:**
1. **Central breaks** (e4, d4, d5, e5) - Most powerful
2. **Flank breaks** (f5, c5, b5, g5) - For specific plans
3. **Undermining breaks** - Attack the base of a pawn chain

**The key question:** When is the right time for the break?

Too early = your pieces aren't ready, you lose tempo
Too late = opponent has prepared, it no longer works
Just right = maximum impact, opening lines for YOUR pieces`,
          arrows: [
            { from: 'e3', to: 'e4', color: 'green' },
            { from: 'c4', to: 'c5', color: 'blue' },
          ],
        },
        {
          id: 'central-break',
          type: 'explanation',
          fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
          title: 'Central Pawn Breaks',
          explanation: `Central breaks are the most important because controlling the center controls the game.

**The main central breaks:**

**e4 (or ...e5 for Black):**
- Opens the e-file for rooks
- Frees bishops on the diagonal
- Challenges opponent's center
- Usually needs careful preparation

**d4 (or ...d5 for Black):**
- Classic break to gain space
- Opens the d-file
- Often comes with tempo

**c4-c5 or ...c5-c4:**
- The Sicilian lever (attacks d4/d5)
- Changes pawn structure fundamentally
- Can create passed pawns

**In this Slav position:**
White's dream is to play e4, opening the position. But it needs preparation—the e3 pawn is blocked by the d4 pawn.

White must first play Bd3, castle, and possibly Re1 before e4 becomes strong. **Preparation is everything!**`,
          arrows: [
            { from: 'e3', to: 'e4', color: 'green' },
            { from: 'd5', to: 'e4', color: 'yellow' },
          ],
          highlights: [
            { square: 'e4', color: 'green' },
            { square: 'e3', color: 'blue' },
          ],
        },
        {
          id: 'timing',
          type: 'explanation',
          fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 2 9',
          title: 'Timing the Break',
          explanation: `Timing is **crucial** for pawn breaks. The same break can be brilliant or terrible depending on when you play it.

**Before breaking, check:**

**Are your pieces ready?**
- Rooks should be on files that will open
- Bishops should be on diagonals that will clear
- Knights should be on stable squares

**Can opponent refute the break?**
- Do they have a stronger counter-break?
- Can they block it effectively?
- Will they get counterplay?

**What happens after the break?**
- Who benefits from the open lines?
- What's the resulting pawn structure?
- Where will the pieces end up?

**In this position:**
White could play e4 now, but it's premature. After ...dxe4 Nxe4 Nxe4 Bxe4, Black has traded a passive piece for White's good knight.

**Better:** Castle first, play Re1, THEN e4 with full support.`,
          arrows: [
            { from: 'e3', to: 'e4', color: 'yellow' },
          ],
          highlights: [
            { square: 'e1', color: 'green' },
            { square: 'f1', color: 'green' },
          ],
        },
        {
          id: 'execute-break',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Execute the Break',
          explanation: `White's pieces are reasonably well placed. The question is: which break is correct?

**Options:**
- **cxd5** - Exchange, simplify the center
- **e4** - Challenge Black's center directly
- **dxc5** - Open the d-file

Which break gives White the best position?`,
          correctMoves: ['e4', 'cxd5'],
          arrows: [
            { from: 'e3', to: 'e4', color: 'green' },
            { from: 'c4', to: 'd5', color: 'blue' },
          ],
          successMessage: 'Excellent! e4 is the most ambitious—after dxe4 Nxe4, White has active pieces and central control. cxd5 is also good, creating the Carlsbad structure with clear plans.',
          failureMessage: 'The pieces are ready for action. What pawn advance challenges Black\'s center most effectively?',
        },
        {
          id: 'flank-breaks',
          type: 'explanation',
          fen: 'r1bq1rk1/pppn1ppp/3bpn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Flank Pawn Breaks',
          explanation: `Flank breaks support specific strategic plans. They're most effective when the center is stable.

**b4-b5: The Minority Attack**
- Advances the b-pawn to attack Black's c6/c7 pawns
- Creates a weakness (backward pawn or isolated pawn)
- Classic plan in the Carlsbad structure
- Slow but very effective

**f4-f5: Kingside Expansion**
- Opens the f-file
- Creates attacking chances on the kingside
- Works well in closed positions
- Must be careful about king safety

**g4-g5: Driving Away Defenders**
- Kicks the f6 knight
- Prepares h4-h5 attack
- Very committal—weakens the king
- Best when opponent is castled kingside

**h4-h5: Opening the h-file**
- Combined with g4 creates attack
- Even alone, creates pressure
- Often involves sacrifice on h5/h6

**Critical rule:** Flank attacks work best when the center is **stable or closed**. If the center opens, a flank attack often backfires!`,
          arrows: [
            { from: 'b2', to: 'b4', color: 'green' },
            { from: 'b4', to: 'b5', color: 'green' },
            { from: 'f2', to: 'f4', color: 'blue' },
          ],
        },
        {
          id: 'minority-attack',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
          title: 'The Minority Attack',
          explanation: `The **minority attack** is one of chess's most important strategic plans. It occurs when you advance fewer pawns against more (typically 2 vs 3 on the queenside).

**How it works:**
1. Advance b4-b5
2. Exchange bxc6
3. Black is left with a weak c-pawn or d-pawn

**Why it's so effective:**
- Creates a permanent weakness
- Opens lines for your pieces
- Forces opponent to defend passively
- Very hard to stop

**In the Carlsbad structure** (after cxd5 exd5), White's classic plan is:
1. a3 (prepares b4)
2. b4
3. b5 (attacks c6)
4. bxc6 bxc6
5. Pressure c6 forever

**Black's counterplay:**
- Kingside attack (needs time)
- ...c5 break before b5
- ...Qa5 hitting a3

This plan appears in many openings: Queen's Gambit Exchange, Semi-Slav, many closed games.`,
          arrows: [
            { from: 'a2', to: 'a3', color: 'green' },
            { from: 'b2', to: 'b4', color: 'green' },
            { from: 'b4', to: 'b5', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'red' },
          ],
        },
        {
          id: 'break-practice',
          type: 'interactive',
          fen: 'r1bqr1k1/pp1n1ppp/2pb1n2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 4 10',
          title: 'Choose the Right Break',
          explanation: `White has completed development. Now it's time for active play.

**Assess the position:**
- Black is solid but slightly passive
- White has more space
- The center is stable

What break creates the most problems for Black?`,
          correctMoves: ['e4', 'b4'],
          arrows: [
            { from: 'e3', to: 'e4', color: 'green' },
            { from: 'b2', to: 'b4', color: 'blue' },
          ],
          successMessage: 'Both are excellent! e4 challenges the center directly—after dxe4 Nxe4, White has active piece play. b4 starts the minority attack, a slower but very effective plan.',
          failureMessage: 'White needs to create action. Think about challenging Black\'s center or starting a flank operation.',
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
          title: 'Pawn Breaks Summary',
          explanation: `**Key principles of pawn breaks:**

**Preparation is everything:**
- Pieces must support the break
- Wrong timing = disaster
- Calculate the consequences

**Central breaks > Flank breaks:**
- Central breaks are usually strongest
- Flank attacks need stable center
- "Attack on the flank, dies in the center"

**Know the typical breaks:**
- e4/e5 in closed games
- d4/d5 in various structures
- c4-c5 / c5-c4 Sicilian lever
- b4-b5 minority attack
- f4-f5 kingside expansion

**After the break:**
- Who controls the open lines?
- What's the new pawn structure?
- Where do pieces belong now?

**Practice tip:**
In each opening you play, learn the **typical pawn breaks** for both sides. This knowledge alone will improve your middlegame play dramatically.

*"The pawns are the soul of chess."* - François-André Danican Philidor`,
        },
      ],
    },
    {
      id: 'piece-placement',
      title: 'Piece Placement',
      description: 'Finding the best squares for your pieces',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['pieces', 'placement', 'optimization'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'The Right Square',
          explanation: `Every piece has squares where it belongs—and squares where it doesn't. Finding the optimal squares for your pieces is a core strategic skill.

**Questions to ask about each piece:**

**Is the piece active?**
- Does it control important squares?
- Can it reach targets?
- Is it participating in the game?

**Does it coordinate with other pieces?**
- Do your pieces work together?
- Can they combine for tactics?
- Do they support the same plan?

**Is it safe from attack?**
- Can opponent harass it easily?
- Does it have retreat squares?
- Is it overloaded defending things?

**Does it serve your plan?**
- Is it on the right side of the board?
- Is it ready for the coming action?
- Or is it a spectator?

**The mantra:** "Improve your worst piece." Find your least active piece and give it a better job. This simple approach often reveals the right move.`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'f3', color: 'green' },
            { square: 'c3', color: 'green' },
            { square: 'c1', color: 'yellow' },
          ],
        },
        {
          id: 'knight-placement',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 2 8',
          title: 'Knight Placement',
          explanation: `Knights are short-range pieces that need **outposts**—stable squares where they can't be attacked by pawns.

**The ideal knight square:**
- **Central** (d4, d5, e4, e5 are best)
- **Cannot be attacked by pawns**
- **Protected by your own pawn**
- **Near the enemy king** (for attacks)

**Classic knight outposts:**

**d5/e5 for White:** The dream squares! A knight here controls 8 squares and often can't be challenged.

**d4/e4 for Black:** Equivalent squares for Black's knights.

**f5:** Excellent for attacks on the kingside, eyes g7 and h6.

**c5:** Controls d3, b3, attacks weak pawns.

*"A knight on d5 is worth a rook!"* - Old chess saying (exaggeration, but makes the point)

**In this position:**
White's knight on f3 eyes d4 or g5. The knight on c3 could maneuver Nd5 if supported. Black must work to prevent White from achieving these ideal placements.`,
          highlights: [
            { square: 'd5', color: 'green' },
            { square: 'e5', color: 'green' },
            { square: 'f5', color: 'blue' },
          ],
          arrows: [
            { from: 'f3', to: 'd4', color: 'yellow' },
            { from: 'c3', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'bishop-placement',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Bishop Placement',
          explanation: `Bishops are long-range pieces that need **open diagonals**. A bishop blocked by its own pawns is a "bad bishop."

**Good bishop positions:**
- **Long diagonals** (a1-h8 or a8-h1)
- **Aiming at enemy weaknesses**
- **Outside the pawn chain**
- **Fianchetto** (b2/g2 for White)

**The "good bishop" vs "bad bishop":**
- Good bishop: Pawns on opposite color squares
- Bad bishop: Blocked by its own pawns
- A bad bishop can be worth less than a knight!

**How to make a bishop good:**
1. Put pawns on opposite color
2. Trade it for opponent's good piece
3. Get it outside the pawn chain
4. Open the diagonal it sits on

**In this position:**
White's e2 bishop is passive—blocked by the e4 pawn. Better would be:
- **Bc4** hitting f7 diagonal
- **Bb5** pinning or pressuring
- **g3 + Bg2** fianchetto setup`,
          arrows: [
            { from: 'e2', to: 'c4', color: 'green' },
            { from: 'c1', to: 'g5', color: 'blue' },
            { from: 'e2', to: 'b5', color: 'yellow' },
          ],
        },
        {
          id: 'rook-placement',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Rook Placement',
          explanation: `Rooks are the **power players** of chess, but they need open files and ranks to show their strength.

**Where to put rooks:**

**Open files** (no pawns at all):
- Rooks dominate open files
- Try to control them first
- Double rooks on open files = maximum power

**Half-open files** (only enemy pawns):
- Pressure the enemy pawn
- Prepare to invade the 7th rank

**Behind passed pawns:**
- Supports the pawn's advance
- "Rooks belong behind passed pawns" - Tarrasch

**On the 7th rank:**
- Attacks all the enemy pawns
- Often devastating with two rooks
- Can trap the enemy king

**Rook lifts:**
- Rf3-g3 or Rf3-h3 for kingside attacks
- Brings the rook into action via the 3rd rank

**In this position:**
White should place rooks on d1 and e1:
- d1 eyes the potentially weak d6 pawn
- e1 supports e4 and possible e5 push`,
          arrows: [
            { from: 'a1', to: 'd1', color: 'green' },
            { from: 'f1', to: 'e1', color: 'green' },
          ],
          highlights: [
            { square: 'd1', color: 'blue' },
            { square: 'e1', color: 'blue' },
          ],
        },
        {
          id: 'queen-placement',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Queen Placement',
          explanation: `The queen is the most powerful piece but also the most vulnerable to harassment. Place it carefully!

**Queen placement principles:**

**Don't develop the queen too early:**
- It gets chased around, losing tempo
- Minor pieces should come out first
- Exceptions exist (Scandinavian, etc.)

**Keep the queen flexible:**
- Central squares (d2, e2, d3) are often safe
- Don't commit to one plan too soon
- The queen should be ready to go anywhere

**Queen + Bishop battery:**
- On the same diagonal = power
- Threatens enemy king
- Classic attacking setup

**Queen behind rooks:**
- On an open file, this is devastating
- Queen, rook, rook = maximum pressure

**Don't put the queen on a bad square:**
- Where it can be attacked
- Where it's doing nothing
- Blocking your own pieces

**In this position:**
Qd2 or Qe2 are typical. They connect the rooks, prepare possible 0-0-0, and keep options open.`,
          arrows: [
            { from: 'd1', to: 'd2', color: 'green' },
            { from: 'd1', to: 'e2', color: 'blue' },
          ],
        },
        {
          id: 'improve-piece',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/P1NP1N2/1PP2PPP/R1BQ1RK1 w - - 0 9',
          title: 'Find the Best Square',
          explanation: `White's position is solid but one piece is clearly underperforming.

**Look at each piece:**
- Knights on c3 and f3: Active, well-placed
- Bishop on c4: Excellent diagonal
- Rooks: Need development (common)
- Queen: Still on d1 (waiting)

**What about the c1 bishop?** It hasn't moved! Where should it go?`,
          correctMoves: ['Bg5', 'Be3'],
          arrows: [
            { from: 'c1', to: 'g5', color: 'green' },
            { from: 'c1', to: 'e3', color: 'blue' },
          ],
          successMessage: 'Excellent! Bg5 develops with purpose—it pins the knight and creates pressure on Black\'s position. Be3 is also good, connecting with the c4 bishop and preparing Qd2.',
          failureMessage: 'The bishop on c1 is White\'s worst piece—it hasn\'t moved! Where would it be most active?',
        },
        {
          id: 'piece-coordination',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Piece Coordination',
          explanation: `Individual piece placement matters, but **coordination** matters more. Pieces should work together!

**Signs of good coordination:**
- Pieces protect each other
- Pieces control the same important squares
- Pieces combine for tactics
- Pieces support the same plan

**Signs of poor coordination:**
- Pieces are scattered
- Pieces get in each other's way
- No combined threats
- Different pieces aiming different directions

**How to improve coordination:**

**Create piece batteries:**
- Queen + Bishop on diagonal
- Rook + Rook on file
- Two knights covering same squares

**Aim pieces at the same target:**
- Multiple pieces hitting f7
- Concentrating on a weak pawn
- Preparing a break together

**Avoid "pieces bumping into each other":**
- Bishop blocked by knight
- Rook blocked by queen
- Doubled pieces on closed file`,
          arrows: [
            { from: 'c4', to: 'f7', color: 'green' },
            { from: 'f3', to: 'g5', color: 'green' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Piece Placement Summary',
          explanation: `**Quick reference for piece placement:**

**Knights:**
- Central outposts (d4, d5, e4, e5)
- Protected by pawns
- Can't be kicked by enemy pawns
- Near enemy king if attacking

**Bishops:**
- Long, open diagonals
- Outside the pawn chain
- Avoid "bad bishop" syndrome
- Fianchetto when appropriate

**Rooks:**
- Open and half-open files
- Behind passed pawns
- 7th rank is powerful
- Connect your rooks early

**Queen:**
- Not too early
- Stay flexible
- Support attacking plans
- Don't get harassed

**Key principle:**
"Improve your worst piece" - find the least active piece and give it a better job. Often this reveals the best move.

**Coordination trumps individual placement:**
Five well-coordinated pieces beat five scattered ones every time.

*"A well-placed knight is better than a bad bishop."* - Siegbert Tarrasch`,
        },
      ],
    },
    {
      id: 'when-to-exchange',
      title: 'Exchange Strategy',
      description: 'When to trade pieces and when to keep them',
      difficulty: 'intermediate',
      estimatedMinutes: 12,
      tags: ['exchanges', 'strategy', 'simplification'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'The Exchange Decision',
          explanation: `Every exchange changes the position. The question isn't "are these pieces equal value?" but **"who benefits from this trade?"**

**The strategic exchange:**
- Changes the character of the position
- Can be decisive in determining the winner
- Often overlooked by improving players

**Two types of exchanges:**

**Favorable exchanges:**
- Remove opponent's good pieces
- Simplify when you're ahead
- Trade attackers when defending
- Exchange bad pieces for good ones

**Unfavorable exchanges:**
- Help your opponent
- Give up your active pieces
- Simplify when behind
- Trade away your advantages

**The exchange mindset:**
Before capturing or allowing a capture, STOP and ask:
- What piece am I getting?
- What piece am I giving up?
- How does the position change?
- Who benefits from this new position?

Let's explore when to trade and when to avoid trades.`,
        },
        {
          id: 'exchange-when',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'When to Exchange',
          explanation: `**Exchange pieces when:**

**1. You're ahead in material:**
Every exchange brings you closer to a winning endgame. With extra material, fewer pieces = easier conversion.

**2. To relieve a cramped position:**
If you have less space, trades give your remaining pieces more room.

**3. To remove a strong enemy piece:**
That knight on d5 dominating the board? Trade it off!

**4. To reach a favorable endgame:**
Some endgames favor certain piece configurations. Trade toward YOUR favorable ending.

**5. When defending against an attack:**
Fewer attackers = easier defense. Trade the pieces pointed at your king.

**6. To eliminate an active piece:**
Opponent's bishop raking your position? Don't suffer—exchange it.

**Example:** If opponent has a powerful knight on e4 but you have a "bad bishop," trading Bxe4 is often excellent—you eliminate their best piece with your worst!`,
          arrows: [
            { from: 'c3', to: 'e4', color: 'yellow' },
          ],
        },
        {
          id: 'keep-pieces',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'When to Keep Pieces',
          explanation: `**Avoid exchanges when:**

**1. You're attacking:**
Attacks need firepower! Each exchange reduces your attacking potential. Keep pieces on for maximum pressure.

**2. You have the bishop pair:**
Two bishops are worth more than bishop + knight in open positions. Don't trade one away lightly.

**3. You have more space:**
With more room, you can maneuver better. More pieces = more advantage.

**4. Opponent is cramped:**
A cramped player WANTS to trade. Don't help them escape! Keep pieces on to maintain their suffering.

**5. You need specific pieces for your plan:**
Planning a kingside attack? Keep your attacking pieces. Don't trade them for defensive pieces.

**6. Trading helps opponent's structure:**
Sometimes trading pawns fixes opponent's weaknesses. Avoid this!

**Example:** If you have the bishop pair and opponent offers Bxc4 Nxc4, DECLINE unless you have a very good reason. The bishop pair is valuable.`,
          highlights: [
            { square: 'c4', color: 'green' },
          ],
        },
        {
          id: 'good-vs-bad',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2np1n2/2p1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
          title: 'Trade Your Bad Pieces',
          explanation: `A key principle: **Trade YOUR bad pieces for THEIR good pieces!**

**What makes a piece "bad"?**
- Blocked by its own pawns
- Far from the action
- Defending instead of attacking
- On a passive square

**What makes a piece "good"?**
- Active and centralized
- Attacking opponent's weaknesses
- Well-protected outpost
- Supporting your plan

**The exchange formula:**
YOUR bad piece for THEIR good piece = GREAT
YOUR good piece for THEIR bad piece = TERRIBLE
Equal pieces for equal pieces = Check who benefits from simplification

**Example in this position:**
White's dark-squared bishop (c1) is currently passive. If Black's knight lands on e5, it would be a strong piece. But offering Be3 to trade for that knight would be excellent—exchanging a passive piece for an active one.

**Don't trade:**
- Your attacking pieces for their defending pieces
- Your best piece for their worst piece
- Active pieces for passive pieces`,
          arrows: [
            { from: 'c1', to: 'e3', color: 'green' },
            { from: 'f6', to: 'e4', color: 'red' },
          ],
        },
        {
          id: 'exchange-bishops',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2np1n2/2p1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
          title: 'Bishop Exchanges',
          explanation: `Bishop exchanges require special consideration because of **the bishop pair**.

**The bishop pair:**
Two bishops working together are stronger than:
- Bishop + Knight
- Two knights
This advantage is especially clear in **open positions**.

**When to exchange a bishop:**
- Position is closed (bishops less useful)
- You're eliminating their GOOD bishop
- You need to solve a specific problem
- You're trading BAD bishop for GOOD knight

**When to keep both bishops:**
- Position is open or will open
- You can keep the game fluid
- Opponent has weaknesses on both colors
- No urgent reason to exchange

**Same-colored vs opposite-colored bishops:**
- Same-color: Pure piece contest
- Opposite-color: Can lead to drawn endgames
- Opposite-color MIDDLEGAMES: Attacking side has advantage (extra attacker on one color)`,
          highlights: [
            { square: 'c4', color: 'green' },
            { square: 'c1', color: 'yellow' },
          ],
        },
        {
          id: 'exchange-decision',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2np1n2/2p1p3/2B1P1N1/2NP4/PPP2PPP/R1BQ1RK1 b - - 3 9',
          title: 'Should Black Exchange?',
          explanation: `White's knight has jumped to g4, threatening Nf6+ and various attacking ideas.

**Black's options:**
- **...Nxg4** - Trade knights
- **...h6** - Kick the knight away
- **...Nf6xg4** - Hmm, that's the same thing
- **...something else** - Ignore it?

What's the best approach? Should Black trade?`,
          correctMoves: ['h6', 'Nxg4'],
          successMessage: 'Both are reasonable! ...Nxg4 removes an annoying piece but hxg4 gives White open lines. ...h6 keeps the tension—the knight must retreat, and White loses time. The key insight: there\'s no automatic answer—evaluate EACH exchange separately.',
          failureMessage: 'Think about whether trading helps Black or White more. Consider both capturing and kicking the knight.',
        },
        {
          id: 'simplification-to-endgame',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Simplifying to the Endgame',
          explanation: `**Simplification** means trading toward an endgame. It's one of the most important strategic decisions.

**When to simplify:**
- You're ahead in material
- You have a better pawn structure
- Your king is more active (or will be)
- You have a passed pawn
- You understand the endgame better

**When NOT to simplify:**
- You're behind in material
- Opponent has the better endgame
- Your attacking chances disappear
- You lose your active pieces

**The technique:**
1. Identify you want an endgame
2. Trade queens (often first priority)
3. Trade minor pieces
4. Trade one pair of rooks (usually keep one)
5. Transition into a winning position

**Common mistake:**
Trading into an endgame you don't understand! Before simplifying, KNOW the resulting endgame. Knight endgames are very different from bishop endgames.`,
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Exchange Strategy Summary',
          explanation: `**The Exchange Checklist:**

Before every trade, ask:
1. Who benefits from this exchange?
2. Am I trading good pieces or bad pieces?
3. Does this help my plan or hurt it?
4. What's the resulting position like?

**General guidelines:**

**Trade when:**
- Ahead in material
- Cramped
- Defending
- Removing strong enemy pieces
- Reaching a favorable endgame

**Keep pieces when:**
- Attacking
- Have bishop pair
- Have more space
- Opponent wants to trade
- Need firepower for your plan

**Remember:**
- Trade YOUR bad for THEIR good
- Bishop pair is valuable in open positions
- Simplify toward endgames you understand
- Every exchange changes everything

*"The hardest game to win is a won game."* - Emanuel Lasker (Don't trade into complications when ahead!)`,
        },
      ],
    },
    {
      id: 'playing-positions',
      title: 'Typical Structures',
      description: 'Understanding common pawn structures',
      difficulty: 'intermediate',
      estimatedMinutes: 15,
      tags: ['structures', 'patterns', 'strategy'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
          title: 'Pawn Structure Dictates Strategy',
          explanation: `The pawn structure is the **skeleton** of the chess position. It determines:
- Where pieces belong
- What plans make sense
- Which side of the board to play on
- The nature of the endgame

**Why structures matter:**
Pawns can't go backwards! Once the structure is set, you're committed. Understanding typical structures means you know the RIGHT plans instantly.

**Different structures = different strategies:**
- Open center = tactical battle, piece activity
- Closed center = long maneuvers, pawn breaks
- Asymmetric = each side has different plans

**The key insight:**
If you know the structure, you know the plan. This is why strong players recognize positions quickly—they've seen the STRUCTURE before, even if the exact position is new.

**In this course section:**
We'll examine several crucial structures:
1. The Italian (Open game)
2. The French (e5 vs d5/e6)
3. The Sicilian (Open Sicilian)
4. The Carlsbad (Symmetric center)
5. The Isolated Queen Pawn

Each has distinctive characteristics and plans.`,
        },
        {
          id: 'italian-structure',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 6',
          title: 'The Italian Structure',
          explanation: `The **open game** structure: e4 vs e5, both sides castled kingside.

**Key characteristics:**
- Open center, piece play dominates
- Bishops have scope on the diagonals
- Both kings potentially vulnerable
- Tactical opportunities abound

**White's typical plans:**

**1. d4 break:**
- Opens the center completely
- Creates central pawn majority
- Leads to piece activity

**2. Ng5 attack on f7:**
- Classic attacking idea
- Bc4 + Ng5 combine
- Must calculate carefully

**3. Queenside expansion:**
- a4-a5, b4
- Slower but solid
- Less committal

**Black's typical plans:**

**1. Development first:**
- ...d6, ...Be6 or ...Bg4
- Complete development before countering

**2. ...Na5 hitting c4:**
- Exchange the strong bishop
- If Bb3 Na5 Bc2 c5, good for Black

**3. ...d5 break:**
- Central counter when ready
- Frees pieces, challenges center`,
          arrows: [
            { from: 'd3', to: 'd4', color: 'green' },
            { from: 'f3', to: 'g5', color: 'blue' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
          ],
        },
        {
          id: 'french-structure',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQ - 0 7',
          title: 'The French Structure',
          explanation: `The **French structure**: White's pawn chain e5/d4 vs Black's d5/e6/c5.

**Key characteristics:**
- Closed center, space imbalance
- White has more space
- Black has potential pawn breaks
- Bishops on different colors often important

**White's typical plans:**

**1. Kingside attack with f4-f5:**
- Opens lines toward Black's king
- Uses space advantage
- Very aggressive

**2. Solidify and squeeze:**
- Keep e5 protected
- Maneuver pieces to ideal squares
- Wait for Black to weaken

**3. Queenside play:**
- a3, b4 if Black plays ...a5
- Control both sides

**Black's typical plans:**

**1. ...c5 to attack d4:**
- Classic French counter
- Undermines White's chain
- Opens c-file for rooks

**2. ...f6 to challenge e5:**
- Opens f-file
- Risky but active
- Often combined with ...c5

**3. Exchange the bad bishop:**
- Light bishop is blocked by e6
- ...b6, ...Ba6 exchange pattern
- Or ...Bd7-a4 maneuver`,
          arrows: [
            { from: 'c5', to: 'd4', color: 'blue' },
            { from: 'f7', to: 'f6', color: 'blue' },
            { from: 'f2', to: 'f4', color: 'green' },
          ],
        },
        {
          id: 'sicilian-structure',
          type: 'explanation',
          fen: 'r1bqkb1r/pp1ppppp/2n2n2/2p5/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4',
          title: 'The Sicilian Structure',
          explanation: `After **d4 cxd4 Nxd4**, a unique asymmetric structure appears.

**Key characteristics:**
- Asymmetric pawn structure
- Different plans for each side
- Sharp, combative positions
- Rich theoretical complexity

**White's typical plans:**

**1. Kingside attack:**
- f4-f5 or g4-g5
- Piece buildup on kingside
- Be3-Qd2-0-0-0 setup
- Very aggressive

**2. Central control:**
- Utilize d5 outpost
- Exchange on d5 to open files
- Piece pressure

**3. Open d-file:**
- Rooks to d1
- Pressure d6/d7 pawns

**Black's typical plans:**

**1. Queenside counterplay:**
- ...a6, ...b5, ...b4
- Push White's knight around
- Create passed a-pawn

**2. Half-open c-file:**
- Rook to c8
- Pressure c2 or invade

**3. Exchange pieces:**
- Neutralize White's attack
- Aim for favorable endgame

The Sicilian is the most double-edged opening—both sides play for a win!`,
          arrows: [
            { from: 'a7', to: 'a6', color: 'blue' },
            { from: 'b7', to: 'b5', color: 'blue' },
            { from: 'f2', to: 'f4', color: 'green' },
          ],
        },
        {
          id: 'carlsbad-structure',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
          title: 'The Carlsbad Structure',
          explanation: `After **cxd5 exd5**, the symmetric "Carlsbad" structure appears. Very common from Queen's Gambit.

**Key characteristics:**
- Symmetric central pawns
- Clear plans for both sides
- Strategically rich
- Often transitions to endgame

**White's classic plan: Minority Attack**

**How it works:**
1. a3 (prepares b4)
2. b4
3. b5 (attacks c6)
4. bxc6 bxc6 (or ...dxc6)
5. Black has a permanent weakness on c6

**Why it's effective:**
- Creates a target
- Opens files for rooks
- Very hard to prevent
- Doesn't weaken White's king

**Black's counterplay options:**

**1. Kingside attack:**
- ...Ne4, ...Qh4
- Piece play toward White's king
- Must be faster than minority attack

**2. ...c5 break:**
- Dissolves the weakness before it's created
- Tactical complications

**3. ...Ne4 to exchange:**
- Trade the knight for White's active bishop
- Simplify position`,
          arrows: [
            { from: 'a2', to: 'a3', color: 'green' },
            { from: 'b2', to: 'b4', color: 'green' },
            { from: 'b4', to: 'b5', color: 'green' },
          ],
          highlights: [
            { square: 'c6', color: 'red' },
          ],
        },
        {
          id: 'iqp-structure',
          type: 'explanation',
          fen: 'r1bq1rk1/pp2bppp/2n1p3/3n4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 10',
          title: 'The Isolated Queen Pawn (IQP)',
          explanation: `The **Isolated Queen Pawn** structure: a d-pawn with no neighboring pawns. One of chess's most instructive structures.

**Key characteristics:**
- The d-pawn can be a strength or weakness
- Dynamic middlegame, static endgame
- Piece activity is crucial
- Classic imbalance position

**For the side WITH the IQP:**

**Use it as a battering ram:**
- d4-d5 break can be crushing
- Opens lines, creates tactics
- The pawn is less weak if pushed!

**Piece activity:**
- All pieces must be active
- Bishop on g5 (pin)
- Knight to e5 or d5
- Rook on d1, queen on e2 or d3

**For the side AGAINST the IQP:**

**Blockade and exchange:**
- Knight on d5 is ideal
- Exchange pieces toward endgame
- The pawn becomes weaker

**Target the pawn:**
- Eventually can be won
- Multiple pieces attacking it

**Simplify:**
- In the endgame, IQP is usually weak
- Exchange active pieces, not passive ones`,
          highlights: [
            { square: 'd4', color: 'yellow' },
            { square: 'd5', color: 'green' },
          ],
          arrows: [
            { from: 'd4', to: 'd5', color: 'green' },
          ],
        },
        {
          id: 'recognize-structure',
          type: 'interactive',
          fen: 'r1bq1rk1/pp2bppp/2n1p3/3n4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 10',
          title: 'Identify the Plan',
          explanation: `This is an **IQP position**. White has an isolated d4 pawn.

**Based on what you've learned:**
- What should White's strategy be?
- How should White develop?

Find a move that follows IQP principles!`,
          correctMoves: ['Bg5', 'Qd3'],
          arrows: [
            { from: 'c1', to: 'g5', color: 'green' },
            { from: 'd1', to: 'd3', color: 'blue' },
          ],
          successMessage: 'Excellent! In IQP positions, White must play dynamically. Bg5 develops with tempo (eyes h7), Qd3 eyes h7 and supports d4. Both follow IQP principles: ACTIVITY!',
          failureMessage: 'With an isolated d-pawn, White needs dynamic piece play. What develops with purpose?',
        },
        {
          id: 'learning-structures',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Learning Structure Plans',
          explanation: `**How to master pawn structures:**

**1. Study master games by structure:**
Instead of random games, study games with the SAME structure you're learning. See how GMs handle it.

**2. Play both sides:**
To understand a structure, play both colors. You'll see plans from both perspectives.

**3. Memorize the plans, not moves:**
- "In the Carlsbad, White plays minority attack"
- "In the French, Black plays ...c5 and ...f6"
- These principles transcend specific lines

**4. Identify the structure EARLY:**
After the first few moves, ask: "What structure is this heading toward?" Then you know your plan.

**5. Adapt, don't memorize blindly:**
Structures give you guidelines, not commands. If opponent does something unusual, think about WHY the usual plans exist.

**Resource recommendation:**
"Pawn Structure Chess" by Andrew Soltis is a classic. Also study games organized by opening—same openings lead to same structures.`,
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          title: 'Structures Summary',
          explanation: `**Quick reference for key structures:**

**Italian (e4 vs e5):**
- Open game, piece play
- White: d4, Ng5, queenside play
- Black: develop, ...d5 counter

**French (e5 vs d5/e6):**
- Closed, space imbalance
- White: f4-f5 attack
- Black: ...c5, ...f6 breaks

**Sicilian (d4 x c5):**
- Asymmetric, sharp
- White: kingside attack
- Black: queenside counterplay

**Carlsbad (cxd5 exd5):**
- Symmetric, strategic
- White: minority attack (b4-b5)
- Black: kingside play or ...c5

**IQP:**
- Dynamic vs static
- With IQP: activity, d5 break
- Against: blockade, exchange, endgame

**The master insight:**
Learn the structures from your openings. If you play 1.e4 e5, learn Italian plans. If you play the French, learn French plans. This targeted study pays off immediately.

*"Whoever sees no other aim in the game than that of giving checkmate to one's opponent will never become a good chess player."* - Max Euwe`,
        },
      ],
    },
    {
      id: 'calculation',
      title: 'Strategic Calculation',
      description: 'Thinking ahead without concrete tactics',
      difficulty: 'advanced',
      estimatedMinutes: 12,
      tags: ['calculation', 'thinking', 'visualization'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Strategic vs Tactical Calculation',
          explanation: `Not all calculation involves forcing moves and concrete variations. **Strategic calculation** is equally important.

**Tactical calculation:**
- Specific moves in sequence
- Forcing moves (checks, captures, threats)
- "If I play this, they play that, I play this..."
- Usually 3-10 moves deep

**Strategic calculation:**
- Where will pieces be in 5-10 moves?
- What will the pawn structure look like?
- Which side of the board will action happen?
- What kind of endgame could arise?

**Why strategic calculation matters:**
- Not every position has tactics
- Quiet positions need long-term vision
- Helps you choose between multiple "good" moves
- Prevents strategic blunders

**The strategic thinker asks:**
"If we each make 5 reasonable moves, where will we be? Which side is better positioned?"

This is very different from calculating exact moves, but equally important for strong play.`,
        },
        {
          id: 'visualize-position',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Visualize the Future',
          explanation: `**Strategic visualization** means picturing future positions without calculating exact moves.

**Try this exercise:**
Look at the current position and imagine:
- Both sides castle (done here)
- Both develop remaining pieces
- Rooks go to central files
- A pawn break happens

**Ask yourself:**

**Where will my knights be?**
- c3 knight → might go d5 or b5
- f3 knight → could reach g5 or d4

**What if I exchange a certain piece?**
- Trading bishops changes the color complex
- Trading knights affects piece balance

**What structure will emerge?**
- If d4 happens, open position
- If nothing changes, maneuvering game

**Will my pawn structure improve or worsen?**
- Is a weakness developing?
- Am I creating a passed pawn?

This "strategic foresight" guides your decisions even when you can't calculate precisely.`,
          arrows: [
            { from: 'c3', to: 'd5', color: 'green' },
            { from: 'f3', to: 'g5', color: 'blue' },
          ],
        },
        {
          id: 'candidate-plans',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 2 8',
          title: 'Finding Candidate Plans',
          explanation: `Just like finding candidate MOVES in tactics, you should find candidate PLANS in strategy.

**In this position, consider:**

**Plan A: Kingside attack**
- Bg5 (pin/exchange), Qd2, 0-0-0
- Aim at the Black king
- Aggressive, sharp

**Plan B: Central play**
- d4 immediately or after preparation
- Open lines for all pieces
- Classical approach

**Plan C: Slow buildup**
- a3, b4, Bb3 (retreat bishop)
- Improve pieces gradually
- Less committal, flexible

**How to choose:**
1. What does each plan achieve?
2. What can opponent do against each?
3. Which best exploits our advantages?
4. Which suits your style and comfort?

**Important:** Identify your candidate plans BEFORE choosing. Don't just play the first reasonable idea—compare alternatives!`,
          arrows: [
            { from: 'c1', to: 'g5', color: 'green' },
            { from: 'd3', to: 'd4', color: 'blue' },
            { from: 'b2', to: 'b4', color: 'yellow' },
          ],
        },
        {
          id: 'comparing-plans',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 2 8',
          title: 'Comparing Plans',
          explanation: `Once you have candidate plans, compare them systematically.

**Evaluation criteria:**

**1. What does each plan achieve?**
- Plan A (attack): Could win material or checkmate
- Plan B (d4): Opens the position, gains space
- Plan C (buildup): Improves position gradually

**2. What can opponent do?**
- Against kingside attack: ...h6, ...g6, defend
- Against d4: ...exd4 or ...d5 counter
- Against slow play: Launch their own plan

**3. Which fits the position?**
- If opponent has weaknesses, attack them
- If position is balanced, slow buildup makes sense
- If tactics are possible, seek them

**4. Which fits YOUR style?**
- Aggressive? Go for Plan A
- Positional? Plan C might suit you
- Flexible? Plan B keeps options

**The best plan:**
There's often no single "best" plan. Grandmasters sometimes disagree. Choose based on the position AND your strengths.`,
        },
        {
          id: 'choose-plan',
          type: 'interactive',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
          title: 'Strategic Decision',
          explanation: `White needs a plan. The position is balanced—no immediate tactics.

**Your options:**
- Develop the c1 bishop aggressively (Bg5)
- Prepare a future attack (h3 then g4 or Nh2-g4)
- Castle and play solidly (O-O)
- Something else?

Find a move that implements a clear plan.`,
          correctMoves: ['Bg5', 'h3', 'd4'],
          arrows: [
            { from: 'c1', to: 'g5', color: 'green' },
            { from: 'd3', to: 'd4', color: 'blue' },
          ],
          successMessage: 'Good strategic thinking! Bg5 starts a plan of pinning and pressuring. h3 prepares g4 expansion. d4 challenges the center directly. Each implements a coherent plan.',
          failureMessage: 'Think about what long-term setup you want. Which move starts a meaningful plan?',
        },
        {
          id: 'anticipating-responses',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 2 8',
          title: 'Anticipating Opponent\'s Plans',
          explanation: `Strategic calculation includes predicting opponent's ideas.

**Think for your opponent:**
What is Black's best plan in this position?

**Black's likely ideas:**
- ...Na5 hitting c4 bishop
- ...d5 break to free position
- ...Be6 developing and trading
- ...h6 followed by ...g5 expansion?

**Now adjust YOUR plan:**
If Black wants ...Na5:
- Maybe retreat Bb3 preemptively
- Or prepare a4 to discourage it

If Black wants ...d5:
- Support e4 with Re1
- Or accept dxe4 Nxe4 with activity

**The strategic sequence:**
1. What's my plan?
2. What's opponent's best response?
3. Do I still like my plan after their response?
4. Adjust if needed

This back-and-forth thinking is strategic calculation—not calculating moves, but calculating IDEAS.`,
          arrows: [
            { from: 'c6', to: 'a5', color: 'red' },
            { from: 'd6', to: 'd5', color: 'red' },
          ],
        },
        {
          id: 'calculation-practice',
          type: 'interactive',
          fen: 'r1bqr1k1/pp1n1ppp/2pb1n2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 4 10',
          title: 'Think Strategically',
          explanation: `This is a closed position. No immediate tactics exist.

**Strategic questions:**
- What's White's best plan?
- Where should pieces go?
- What's Black's plan, and how to stop it?

Find a move that makes strategic sense. Think about the FUTURE position.`,
          correctMoves: ['e4', 'b4', 'cxd5'],
          arrows: [
            { from: 'e3', to: 'e4', color: 'green' },
            { from: 'b2', to: 'b4', color: 'blue' },
            { from: 'c4', to: 'd5', color: 'yellow' },
          ],
          successMessage: 'Excellent strategic thinking! e4 is the classic break—opening the position when your pieces are better placed. b4 starts queenside play. cxd5 opens lines and creates an IQP target. All are strategically sound.',
          failureMessage: 'Think about what White wants to achieve. How can you improve the position or create a target?',
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Strategic Calculation Summary',
          explanation: `**Strategic thinking checklist:**

**1. Find candidate PLANS (not just moves):**
- What are 2-3 reasonable plans?
- What does each achieve?

**2. Visualize future positions:**
- Where will pieces be?
- What structure will emerge?
- What kind of endgame?

**3. Think for opponent:**
- What's their best plan?
- How do they respond to your plan?
- Adjust accordingly

**4. Compare and choose:**
- Which plan best fits position?
- Which fits your style?
- Commit and execute

**The strategic mindset:**
- Not every move needs deep calculation
- Sometimes "improving the position" is enough
- Long-term thinking prevents short-term mistakes
- Plans give direction to your moves

**Practice tip:**
In quiet positions, spend more time on strategic thinking than calculation. Ask "Where is this going?" rather than "What's the best move right now?"

*"The essence of chess is thinking about the essence."* - David Bronstein`,
        },
      ],
    },
    {
      id: 'intuition',
      title: 'Developing Intuition',
      description: 'Building pattern recognition and "feel"',
      difficulty: 'advanced',
      estimatedMinutes: 12,
      tags: ['intuition', 'patterns', 'improvement'],
      steps: [
        {
          id: 'intro',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'What is Chess Intuition?',
          explanation: `**Chess intuition** is rapid pattern recognition that "feels" like knowing without calculating.

**When a strong player says:**
- "This piece belongs on that square"
- "This position is dangerous"
- "This exchange is favorable"

They're not calculating—they're recognizing patterns from experience.

**How intuition works:**
Your brain stores thousands of chess patterns. When you see a position, your subconscious quickly matches it against stored patterns and "suggests" the right approach.

**Intuition vs. calculation:**
- Intuition: Fast, automatic, feels like "knowing"
- Calculation: Slow, deliberate, concrete variations

**Both are essential:**
- Intuition suggests candidate moves
- Calculation verifies them
- Strong players use both constantly

**Can intuition be wrong?**
Yes! That's why we calculate. But good intuition is RIGHT more often than wrong, and it points us where to look.

*"I see only one move ahead, but it is always the correct one."* - José Raúl Capablanca (exaggeration, but captures the idea)`,
        },
        {
          id: 'pattern-recognition',
          type: 'explanation',
          fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQ - 5 5',
          title: 'Recognizing Patterns',
          explanation: `Certain positions trigger **instant recognition** in experienced players.

**This position might trigger:**
- "Knight on g5 + Bishop on c4 = attack on f7"
- "If knight leaves f6, trouble coming"
- "Classic attacking setup against e5 defense"

**When you've seen similar positions before, you "know" what to do.** This is pattern recognition at work.

**Types of patterns to recognize:**

**Tactical patterns:**
- Back rank mate threats
- Knight forks
- Pin combinations
- Piece configurations that signal tactics

**Strategic patterns:**
- Weak pawn structures
- Good/bad bishops
- Outpost opportunities
- Pawn break timing

**Positional patterns:**
- Piece placement themes
- King safety indicators
- Endgame transformations

**The more patterns you know, the better your intuition.** This is why studying master games and solving puzzles builds intuition—you're adding patterns to your mental database.`,
          arrows: [
            { from: 'g5', to: 'f7', color: 'red' },
            { from: 'c4', to: 'f7', color: 'red' },
          ],
          highlights: [
            { square: 'f7', color: 'red' },
            { square: 'g5', color: 'green' },
            { square: 'c4', color: 'green' },
          ],
        },
        {
          id: 'trust-intuition',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'When to Trust Intuition',
          explanation: `Intuition is powerful but not infallible. Know when to trust it.

**Trust intuition MORE when:**

**Position is quiet, strategic:**
- No forcing moves
- Long-term positioning matters
- Calculation won't reveal "the answer"

**Time pressure is severe:**
- You must move quickly
- Intuition is faster than calculation
- A quick intuitive move beats running out of time

**You've seen similar positions many times:**
- Your pattern database is relevant
- Experience applies directly
- You "know" this type of position

**Verify with calculation when:**

**Tactics are possible:**
- Checks, captures, threats
- Sacrifices might work
- One move could decide the game

**Position is critical:**
- You're about to win or lose
- Wrong move is catastrophic
- Stakes are too high for guessing

**Something feels "off":**
- Position looks dangerous
- You're not sure why
- Calculate to understand the danger`,
        },
        {
          id: 'building-intuition',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Building Intuition',
          explanation: `Good news: **Intuition can be developed.** Here's how:

**1. Study master games:**
- See how GMs handle positions
- Absorb their pattern recognition
- Don't just memorize moves—understand WHY

**2. Solve puzzles (many!):**
- Tactical patterns become automatic
- 10-15 minutes daily is enough
- Focus on PATTERNS, not just answers

**3. Analyze your games:**
- Find your mistakes
- Understand what you missed
- Build patterns from your own experience

**4. Play regularly:**
- Practical experience reinforces patterns
- Time pressure trains intuition
- Face different styles and positions

**5. Study pawn structures:**
- Recognize structure = recognize plan
- Each structure has typical ideas
- This strategic pattern knowledge is intuition

**Key insight:** There are NO shortcuts. Intuition comes from VOLUME—seeing thousands of positions. But structured study accelerates the process.

*"The chessboard is the world, the pieces are the phenomena of the Universe, the rules of the game are what we call the laws of Nature."* - Thomas Huxley`,
        },
        {
          id: 'intuition-practice',
          type: 'interactive',
          fen: 'r1b2rk1/pp1nqppp/2p1pn2/3p2B1/2PP4/2NBPN2/PP3PPP/R2Q1RK1 b - - 5 10',
          title: 'Trust Your Intuition',
          explanation: `Black to play. Don't calculate deeply—use your intuition.

**What does your "chess sense" tell you?**
- Which piece is uncomfortable?
- What would a master play here?
- What "feels" right?

Make a move based on intuition!`,
          correctMoves: ['h6', 'Ne4', 'dxc4'],
          arrows: [
            { from: 'h7', to: 'h6', color: 'green' },
            { from: 'f6', to: 'e4', color: 'blue' },
          ],
          successMessage: 'Good intuitive choice! h6 kicks the annoying bishop—a typical "I don\'t like that piece there" response. Ne4 centralizes with tempo. dxc4 opens the position. All reasonable intuitive moves!',
          failureMessage: 'What move "feels" right? Often the first idea a strong player has is correct. What\'s bothering you about the position?',
        },
        {
          id: 'pattern-integration',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Integrating Intuition and Calculation',
          explanation: `The strongest players blend intuition and calculation seamlessly.

**The integrated approach:**

**Step 1: Intuition suggests candidates**
- "This feels like an attacking position"
- "That knight looks strong on d5"
- "My opponent's king seems vulnerable"

**Step 2: Calculation verifies**
- If Nd5, what happens? Calculate.
- If I attack, is it sound? Calculate.
- Is there a tactic? Calculate.

**Step 3: Intuition chooses between equals**
- If calculation shows two moves are roughly equal
- Intuition picks based on style and feel
- "I prefer this type of position"

**Step 4: Move!**
- Don't second-guess forever
- Trust the process
- Learn from the result

**The feedback loop:**
After the game, analyze. Did your intuition work? If not, why? This feedback improves future intuition.`,
        },
        {
          id: 'practical-tips',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Practical Improvement Tips',
          explanation: `**Daily habits for better intuition:**

**Morning (10 min):**
- Solve 5-10 tactical puzzles
- Focus on pattern recognition
- Don't use hints—train your brain

**Weekly (30-60 min):**
- Study 1-2 master games deeply
- Choose games in openings you play
- Understand the plans, not just moves

**After each game:**
- Quick review: What did you miss?
- Identify 1-2 key moments
- Add to your pattern database

**Monthly:**
- Review your losses
- Find recurring mistakes
- Work on specific weaknesses

**Mindset:**
- Be patient—intuition takes time
- Trust the process
- Every game teaches something

**Remember:**
Intuition isn't magic—it's accumulated experience. The more quality chess you absorb, the stronger your intuition becomes.`,
        },
        {
          id: 'summary',
          type: 'explanation',
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
          title: 'Strategic Thinking: Final Thoughts',
          explanation: `**What we've covered:**

**Planning:**
- Assess → Find imbalances → Choose target → Execute flexibly
- Every move should have a purpose
- Adjust plans as position changes

**Prophylaxis:**
- Think for your opponent
- Prevent their best ideas
- Balance attack and defense

**Pawn breaks:**
- Timing is crucial
- Central breaks are strongest
- Prepare pieces before breaking

**Piece placement:**
- Each piece has optimal squares
- Coordination matters more than individual pieces
- "Improve your worst piece"

**Exchange strategy:**
- Trade bad pieces for good ones
- Simplify when ahead, complicate when behind
- Bishop pair is valuable

**Typical structures:**
- Structure dictates strategy
- Learn plans for structures you face
- Pattern recognition speeds decisions

**Intuition:**
- Built from experience
- Trust it in quiet positions
- Verify with calculation in critical moments

*"Chess is 99% tactics... but the 1% of strategy tells you where to look for tactics!"*

Keep studying, keep playing, and your strategic understanding will grow!`,
        },
      ],
    },
  ],
};
