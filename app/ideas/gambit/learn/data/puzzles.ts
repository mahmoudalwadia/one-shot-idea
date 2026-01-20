import { Puzzle } from './types';

/**
 * Curated puzzle collection from Lichess database
 * Organized by tactical theme for targeted practice
 */


// Fork Puzzles (15)
export const forkPuzzles: Puzzle[] = [
  {
    "id": "000rO",
    "fen": "3R4/8/K7/pB2b3/1p6/1P2k3/3p4/8 w - - 4 58",
    "solution": [
      "Kxa5",
      "Bc7+",
      "Kxb4",
      "Bxd8"
    ],
    "themes": [
      "crushing",
      "endgame",
      "fork"
    ],
    "rating": 1110
  },
  {
    "id": "001wr",
    "fen": "r4rk1/p3ppbp/Pp1q1np1/3PpbB1/2B5/2N5/1PPQ1PPP/3RR1K1 w - - 4 18",
    "solution": [
      "f3",
      "Qc5+",
      "Kh1",
      "Qxc4"
    ],
    "themes": [
      "advantage",
      "fork",
      "middlegame"
    ],
    "rating": 946
  },
  {
    "id": "002IE",
    "fen": "r3brk1/5pp1/p1nqpn1p/P2pN3/2pP4/2P1PN2/5PPP/RB1QK2R b KQ - 4 16",
    "solution": [
      "Nxe5",
      "dxe5",
      "Qe7",
      "exf6"
    ],
    "themes": [
      "advantage",
      "fork",
      "middlegame"
    ],
    "rating": 1205
  },
  {
    "id": "003Jb",
    "fen": "6k1/3bqr1p/2rpp1pR/p7/Pp1QP3/1B3P2/1PP3P1/2KR4 w - - 6 22",
    "solution": [
      "Qa7",
      "Qg5+",
      "Kb1",
      "Qxh6"
    ],
    "themes": [
      "advantage",
      "fork",
      "middlegame"
    ],
    "rating": 993
  },
  {
    "id": "003jb",
    "fen": "r3kb1r/p4ppp/b1p1p3/3q4/3Q4/4BN2/PPP2PPP/R3K2R b KQkq - 0 11",
    "solution": [
      "c5",
      "Qa4+",
      "Bb5",
      "Qxb5+"
    ],
    "themes": [
      "crushing",
      "fork",
      "middlegame"
    ],
    "rating": 983
  },
  {
    "id": "003jv",
    "fen": "1R6/1p2k2p/p2n2p1/4K3/8/6P1/P6P/8 w - - 10 37",
    "solution": [
      "Rh8",
      "Nf7+",
      "Ke4",
      "Nxh8"
    ],
    "themes": [
      "crushing",
      "endgame",
      "fork"
    ],
    "rating": 1007
  },
  {
    "id": "003o0",
    "fen": "r1bqk2r/pp1nbppp/3p4/1B1p4/3P1B2/8/PPP2PPP/R2QK1NR w KQkq - 2 9",
    "solution": [
      "Nf3",
      "Qa5+",
      "Qd2",
      "Qxb5"
    ],
    "themes": [
      "advantage",
      "fork",
      "opening"
    ],
    "rating": 1003
  },
  {
    "id": "003r5",
    "fen": "r2qr1k1/ppp2ppp/4b3/3P4/1nP2Q2/2N2N1P/PP3KP1/R4R2 w - - 1 15",
    "solution": [
      "dxe6",
      "Nd3+",
      "Kg1",
      "Nxf4"
    ],
    "themes": [
      "crushing",
      "fork",
      "middlegame"
    ],
    "rating": 1107
  },
  {
    "id": "004nd",
    "fen": "3q2k1/2r5/pp3p1Q/2b1n3/P3N3/2P5/1P4PP/R6K b - - 0 24",
    "solution": [
      "Rd7",
      "Nxf6+",
      "Qxf6",
      "Qxf6"
    ],
    "themes": [
      "crushing",
      "fork",
      "middlegame"
    ],
    "rating": 898
  },
  {
    "id": "005nD",
    "fen": "3rk2r/2qn1pp1/p1Q1R3/3n3p/8/8/PP4PP/5R1K b k - 0 23",
    "solution": [
      "fxe6",
      "Qxe6+",
      "Ne7",
      "Qf7#"
    ],
    "themes": [
      "fork",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 1128
  },
  {
    "id": "00BJm",
    "fen": "r2q1rk1/1Q2bppp/p1N1p3/1p6/2pP1n2/2P5/PP3PPP/R4RK1 b - - 1 18",
    "solution": [
      "Qd5",
      "Nxe7+",
      "Kh8",
      "Nxd5"
    ],
    "themes": [
      "advantage",
      "fork",
      "hangingPiece",
      "middlegame"
    ],
    "rating": 1122
  },
  {
    "id": "00BNd",
    "fen": "1rr3k1/3bppbp/3p1np1/1B1N4/P2BP3/5P2/P2R2PP/R5K1 b - - 0 21",
    "solution": [
      "Bxb5",
      "Nxe7+",
      "Kf8",
      "Nxc8"
    ],
    "themes": [
      "advantage",
      "fork",
      "middlegame"
    ],
    "rating": 970
  },
  {
    "id": "00DPI",
    "fen": "3r2k1/1B3p1p/6p1/3N4/3p2P1/6r1/5KP1/3R4 b - - 5 35",
    "solution": [
      "Rxg4",
      "Nf6+",
      "Kg7",
      "Nxg4"
    ],
    "themes": [
      "advantage",
      "endgame",
      "fork"
    ],
    "rating": 960
  },
  {
    "id": "00EBZ",
    "fen": "3rr1k1/p4pp1/1pp4p/3pPQ2/1P3P2/2P3qP/P2R2P1/5RK1 w - - 1 24",
    "solution": [
      "Rf3",
      "Qe1+",
      "Kh2",
      "Qxd2"
    ],
    "themes": [
      "crushing",
      "endgame",
      "fork"
    ],
    "rating": 827
  },
  {
    "id": "00Evs",
    "fen": "5qk1/pQ3pp1/7p/b2N1b2/P3r3/5K2/7P/R4B2 b - - 1 24",
    "solution": [
      "g5",
      "Nf6+",
      "Kh8",
      "Nxe4"
    ],
    "themes": [
      "advantage",
      "fork",
      "middlegame"
    ],
    "rating": 1077
  }
];


// Pin Puzzles (15)
export const pinPuzzles: Puzzle[] = [
  {
    "id": "003S3",
    "fen": "r4k1r/pNqnppb1/6pn/2p3Np/7P/2P2Q2/PP3PP1/R1B1K2R b KQ - 2 15",
    "solution": [
      "Rb8",
      "Ne6+",
      "Kg8",
      "Nxc7"
    ],
    "themes": [
      "advantage",
      "middlegame",
      "pin"
    ],
    "rating": 1398
  },
  {
    "id": "003nQ",
    "fen": "6rk/pp6/2n5/3ppn1p/3p4/2P2P1q/PP3QNB/R4R1K w - - 2 29",
    "solution": [
      "Rg1",
      "Ng3+",
      "Qxg3",
      "Rxg3"
    ],
    "themes": [
      "crushing",
      "kingsideAttack",
      "middlegame",
      "pin"
    ],
    "rating": 1287
  },
  {
    "id": "00Dt6",
    "fen": "5rk1/p4p1p/4p1p1/5nq1/8/5QPP/5PK1/2RR4 w - - 6 35",
    "solution": [
      "Rb1",
      "Nh4+",
      "Kf1",
      "Nxf3"
    ],
    "themes": [
      "crushing",
      "endgame",
      "pin"
    ],
    "rating": 1204
  },
  {
    "id": "00KhM",
    "fen": "5rk1/5ppp/1R6/3Qp3/2B1P3/2q3P1/3R1PKP/1r6 b - - 0 27",
    "solution": [
      "Rxb6",
      "Qxf7+",
      "Rxf7",
      "Rd8#"
    ],
    "themes": [
      "clearance",
      "endgame",
      "mate",
      "mateIn2",
      "pin",
      "sacrifice"
    ],
    "rating": 1339
  },
  {
    "id": "00Tdk",
    "fen": "r6r/4kppp/2pNpnq1/p1P1n3/8/B3P3/PP2QPPP/3R1RK1 w - - 7 20",
    "solution": [
      "Qd2",
      "Nf3+",
      "Kh1",
      "Nxd2"
    ],
    "themes": [
      "crushing",
      "middlegame",
      "pin"
    ],
    "rating": 977
  },
  {
    "id": "00XL2",
    "fen": "2kr3r/ppp3pp/6q1/3Pnp2/1PP1p3/7P/P2QNPP1/R4RK1 w - - 1 17",
    "solution": [
      "Qd4",
      "Nf3+",
      "Kh1",
      "Nxd4"
    ],
    "themes": [
      "crushing",
      "middlegame",
      "pin"
    ],
    "rating": 1121
  },
  {
    "id": "00YbZ",
    "fen": "b6k/8/6p1/4q2p/1Q3r1P/P1N3R1/1PP3PK/8 w - - 3 35",
    "solution": [
      "Qb6",
      "Rxh4+",
      "Kg1",
      "Qe1#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2",
      "pin"
    ],
    "rating": 1346
  },
  {
    "id": "00ZeT",
    "fen": "1Q1k4/4r3/2q4p/2p1pp1P/2Bb4/1P6/P6K/4R3 b - - 4 43",
    "solution": [
      "Kd7",
      "Bb5",
      "Qxb5",
      "Qxb5+"
    ],
    "themes": [
      "crushing",
      "endgame",
      "pin"
    ],
    "rating": 1301
  },
  {
    "id": "00bns",
    "fen": "5nk1/1pp2ppp/p5q1/4PN2/2P2Q2/1P1rBP1P/r4P1K/4R3 b - - 5 30",
    "solution": [
      "Ne6",
      "Ne7+",
      "Kf8",
      "Nxg6+"
    ],
    "themes": [
      "crushing",
      "fork",
      "middlegame",
      "pin"
    ],
    "rating": 959
  },
  {
    "id": "00cy1",
    "fen": "2rknb2/3q1pp1/p1pP3r/1pQ1P2p/5P2/1P4P1/PB4K1/3R4 b - - 0 27",
    "solution": [
      "h4",
      "Qb6+",
      "Nc7",
      "dxc7+"
    ],
    "themes": [
      "advancedPawn",
      "advantage",
      "middlegame",
      "pin"
    ],
    "rating": 1211
  },
  {
    "id": "00n3G",
    "fen": "1k4r1/7p/1p4r1/pPp1qp2/P1Pp1R2/3Q2NP/2P4K/5R2 w - - 4 32",
    "solution": [
      "R1f3",
      "Rxg3",
      "Rxg3",
      "Qxf4"
    ],
    "themes": [
      "advantage",
      "deflection",
      "middlegame",
      "pin"
    ],
    "rating": 1142
  },
  {
    "id": "00o5f",
    "fen": "4r3/2R3pk/1n2p2p/p6N/6PP/8/P7/6K1 b - - 0 40",
    "solution": [
      "Rg8",
      "Nf6+",
      "Kh8",
      "Nxg8"
    ],
    "themes": [
      "advantage",
      "endgame",
      "pin"
    ],
    "rating": 1252
  },
  {
    "id": "00o9U",
    "fen": "r1b2r2/pp2bpkp/1qn1p2p/3pP3/3P4/5N2/PP1QBPPP/R3KN1R w KQ - 6 12",
    "solution": [
      "Ng3",
      "Bb4",
      "O-O-O",
      "Bxd2+"
    ],
    "themes": [
      "crushing",
      "middlegame",
      "pin"
    ],
    "rating": 1137
  },
  {
    "id": "00tTz",
    "fen": "8/p6p/3b2pk/5p1n/2B4q/1P3P2/P5QP/5R1K w - - 10 35",
    "solution": [
      "Rd1",
      "Ng3+",
      "Qxg3",
      "Bxg3"
    ],
    "themes": [
      "crushing",
      "endgame",
      "pin"
    ],
    "rating": 1266
  },
  {
    "id": "012Fq",
    "fen": "r5k1/1pn2p1p/p2p2p1/2pP3P/P1Pb2q1/3B2B1/1P1QrP2/R4RK1 w - - 0 21",
    "solution": [
      "Qxe2",
      "Qxg3+",
      "Kh1",
      "Qh3+"
    ],
    "themes": [
      "crushing",
      "kingsideAttack",
      "middlegame",
      "pin"
    ],
    "rating": 1387
  }
];


// DiscoveredAttack Puzzles (15)
export const discoveredAttackPuzzles: Puzzle[] = [
  {
    "id": "008Y3",
    "fen": "r5k1/1p1rqpp1/p3pnp1/2PN4/8/1Q5P/PP3PP1/3RR1K1 b - - 0 24",
    "solution": [
      "Qxc5",
      "Nxf6+",
      "gxf6",
      "Rxd7"
    ],
    "themes": [
      "advantage",
      "discoveredAttack",
      "kingsideAttack",
      "middlegame"
    ],
    "rating": 1075
  },
  {
    "id": "00Bul",
    "fen": "rnbqk2r/pp3ppp/5n2/3pN3/2B5/2P5/P1PPQPPP/R1B1K2R b KQkq - 1 8",
    "solution": [
      "dxc4",
      "Nc6+",
      "Be6",
      "Nxd8"
    ],
    "themes": [
      "advantage",
      "discoveredAttack",
      "discoveredCheck",
      "opening"
    ],
    "rating": 1254
  },
  {
    "id": "00DEc",
    "fen": "8/p5pk/1p3b1p/3r3P/6P1/3nBN2/P4PK1/4R3 w - - 3 30",
    "solution": [
      "Rd1",
      "Nf4+",
      "Bxf4",
      "Rxd1"
    ],
    "themes": [
      "crushing",
      "discoveredAttack",
      "endgame"
    ],
    "rating": 1091
  },
  {
    "id": "00Dke",
    "fen": "5bk1/2Q2p1p/5qp1/p7/P1Bp4/1Pr4P/5PP1/3R2K1 b - - 5 27",
    "solution": [
      "Rc2",
      "Bxf7+",
      "Kg7",
      "Qxc2"
    ],
    "themes": [
      "crushing",
      "discoveredAttack",
      "endgame"
    ],
    "rating": 1434
  },
  {
    "id": "00E29",
    "fen": "r1bq1rk1/4bppp/p1n5/3P4/Pp6/3B1N2/1B3PPP/R2Q1RK1 b - - 0 17",
    "solution": [
      "Qxd5",
      "Bxh7+",
      "Kxh7",
      "Qxd5"
    ],
    "themes": [
      "crushing",
      "discoveredAttack",
      "kingsideAttack",
      "middlegame"
    ],
    "rating": 956
  },
  {
    "id": "00GBX",
    "fen": "r6k/pp2n1pp/2nN4/4p1Br/1PB5/2P4b/P3Nb1P/R2R3K b - - 1 22",
    "solution": [
      "Rxg5",
      "Nf7+",
      "Kg8",
      "Nxg5+"
    ],
    "themes": [
      "advantage",
      "discoveredAttack",
      "discoveredCheck",
      "fork",
      "middlegame"
    ],
    "rating": 910
  },
  {
    "id": "00Gt0",
    "fen": "R7/4k3/5p2/3p2p1/4b2p/2K1P2P/5PP1/8 w - - 2 47",
    "solution": [
      "f3",
      "d4+",
      "Kxd4",
      "Bxa8"
    ],
    "themes": [
      "crushing",
      "discoveredAttack",
      "endgame"
    ],
    "rating": 1052
  },
  {
    "id": "00Lh9",
    "fen": "4r3/7P/1p4Q1/1b4B1/1k4n1/8/1P2n1PK/4R3 w - - 2 41",
    "solution": [
      "Kh1",
      "Ng3+",
      "Kg1",
      "Rxe1#"
    ],
    "themes": [
      "discoveredAttack",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 1324
  },
  {
    "id": "00O37",
    "fen": "r1q1r1k1/1p3pp1/n1p4p/p1bpp2P/P3P3/2P2P2/1P1QBP2/R1BK3R b - - 3 23",
    "solution": [
      "Bxf2",
      "Bxa6",
      "bxa6",
      "Qxf2"
    ],
    "themes": [
      "advantage",
      "discoveredAttack",
      "middlegame"
    ],
    "rating": 1300
  },
  {
    "id": "00T4i",
    "fen": "2r4k/q2b1Q1p/2p2P2/1p2p3/4P3/p2P3R/4N1rK/R7 w - - 0 38",
    "solution": [
      "Kxg2",
      "Bxh3+",
      "Kxh3",
      "Qxf7"
    ],
    "themes": [
      "crushing",
      "discoveredAttack",
      "middlegame"
    ],
    "rating": 1492
  },
  {
    "id": "00UHZ",
    "fen": "3n2k1/6p1/pp3p1p/8/2r1NR1P/6P1/1PP5/1K6 b - - 1 32",
    "solution": [
      "Ne6",
      "Nxf6+",
      "gxf6",
      "Rxc4"
    ],
    "themes": [
      "advantage",
      "discoveredAttack",
      "endgame"
    ],
    "rating": 1071
  },
  {
    "id": "00Vdx",
    "fen": "2k3rr/ppp2p1p/2np1B2/8/4P3/2NB1b2/PPP2PPP/R4RK1 w - - 1 13",
    "solution": [
      "Bxh8",
      "Rxg2+",
      "Kh1",
      "Rg4#"
    ],
    "themes": [
      "discoveredAttack",
      "discoveredCheck",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "morphysMate"
    ],
    "rating": 1456
  },
  {
    "id": "00jCD",
    "fen": "r4r1k/ppp1b1pp/3qQn2/6B1/8/2N5/PPP2PPP/R4RK1 w - - 3 14",
    "solution": [
      "Qb3",
      "Ng4",
      "g3",
      "Bxg5"
    ],
    "themes": [
      "advantage",
      "discoveredAttack",
      "middlegame"
    ],
    "rating": 1490
  },
  {
    "id": "00kZF",
    "fen": "r3r3/1p1n2pk/2p1pq1p/2P5/1p2R3/P2Q1N1P/5PP1/R5K1 b - - 1 24",
    "solution": [
      "Qxa1+",
      "Re1+",
      "Kh8",
      "Rxa1"
    ],
    "themes": [
      "crushing",
      "discoveredAttack",
      "discoveredCheck",
      "middlegame"
    ],
    "rating": 1326
  },
  {
    "id": "00mvP",
    "fen": "r1b2k1r/pppp2pp/5q2/4n3/2Bp4/8/PPP2PPP/RN1QR1K1 w - - 2 13",
    "solution": [
      "Qxd4",
      "Nf3+",
      "gxf3",
      "Qxd4"
    ],
    "themes": [
      "advantage",
      "discoveredAttack",
      "middlegame"
    ],
    "rating": 1062
  }
];


// BackRankMate Puzzles (15)
export const backRankMatePuzzles: Puzzle[] = [
  {
    "id": "001Wz",
    "fen": "4r1k1/5ppp/r1p5/p1n1RP2/8/2P2N1P/2P3P1/3R2K1 b - - 0 21",
    "solution": [
      "Rxe5",
      "Rd8+",
      "Re8",
      "Rxe8#"
    ],
    "themes": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 1118
  },
  {
    "id": "00Bg4",
    "fen": "3r2k1/1q3ppp/p2rp3/Qp1B4/7P/P4P2/1PP3P1/1K1R3R b - - 0 21",
    "solution": [
      "Rxd5",
      "Qxd8+",
      "Rxd8",
      "Rxd8#"
    ],
    "themes": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2",
      "xRayAttack"
    ],
    "rating": 1373
  },
  {
    "id": "00MS3",
    "fen": "rn1qr1k1/1p2bppp/2p2B2/p2p4/3P4/2N2N2/PPP1QPPP/2KRR3 b - - 0 12",
    "solution": [
      "Bxf6",
      "Qxe8+",
      "Qxe8",
      "Rxe8#"
    ],
    "themes": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 809
  },
  {
    "id": "00NOI",
    "fen": "3r4/2k2p1p/pp2pp2/2p5/3nN3/6P1/PPP2PRP/2K5 w - - 2 23",
    "solution": [
      "Nxf6",
      "Ne2+",
      "Kb1",
      "Rd1#"
    ],
    "themes": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 964
  },
  {
    "id": "00RYH",
    "fen": "1k5r/ppp1R2p/3r1p2/5Q2/3p4/2qP4/2P2PPP/2K1R3 b - - 5 26",
    "solution": [
      "Ra6",
      "Re8+",
      "Rxe8",
      "Rxe8#"
    ],
    "themes": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 1029
  },
  {
    "id": "00ZKw",
    "fen": "rn1q1r1k/ppp5/1b2ppQ1/6B1/8/2P5/PP4PP/RN3R1K w - - 2 18",
    "solution": [
      "Rxf6",
      "Qd1+",
      "Rf1",
      "Rxf1#"
    ],
    "themes": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 984
  },
  {
    "id": "00aBq",
    "fen": "r2r2k1/pp3ppp/1qn2b2/3R4/4QB2/1P3N2/P4PPP/4R1K1 b - - 0 18",
    "solution": [
      "Rxd5",
      "Qe8+",
      "Rxe8",
      "Rxe8#"
    ],
    "themes": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 896
  },
  {
    "id": "00cJo",
    "fen": "2r3k1/5ppp/8/8/1P2p3/3bQpP1/1q1P1K1P/R1R5 b - - 1 30",
    "solution": [
      "Rxc1",
      "Ra8+",
      "Rc8",
      "Rxc8#"
    ],
    "themes": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 908
  },
  {
    "id": "00mJY",
    "fen": "r1k1R3/pppr1B2/5p1p/8/8/8/PPP2PPP/2K5 b - - 1 20",
    "solution": [
      "Rd8",
      "Be6+",
      "Kb8",
      "Rxd8#"
    ],
    "themes": [
      "backRankMate",
      "deflection",
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 1046
  },
  {
    "id": "00r1D",
    "fen": "r4k1r/p3nppp/3Qp1b1/8/B7/P1q5/2P2PPP/3R1RK1 b - - 5 18",
    "solution": [
      "Bxc2",
      "Qd8+",
      "Rxd8",
      "Rxd8#"
    ],
    "themes": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 1394
  },
  {
    "id": "00wL8",
    "fen": "R4rk1/2PR1ppp/8/8/7P/8/P3pqPK/8 b - - 0 33",
    "solution": [
      "Rxa8",
      "Rd8+",
      "Rxd8",
      "cxd8=Q#"
    ],
    "themes": [
      "advancedPawn",
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2",
      "promotion",
      "queenRookEndgame"
    ],
    "rating": 911
  },
  {
    "id": "00xMV",
    "fen": "1k1r1br1/ppp5/3p1q2/4BP2/6P1/3Q1P1p/PPP5/3RR1K1 b - - 0 26",
    "solution": [
      "dxe5",
      "Qxd8+",
      "Qxd8",
      "Rxd8#"
    ],
    "themes": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 800
  },
  {
    "id": "0192c",
    "fen": "2r3k1/1Q3ppp/2pB4/2Pp1b1n/3p3K/P4P2/4q1PP/R3R3 b - - 3 24",
    "solution": [
      "Qxg2",
      "Qxc8+",
      "Bxc8",
      "Re8#"
    ],
    "themes": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 983
  },
  {
    "id": "01GBu",
    "fen": "5r1k/3p2bp/p4pp1/qp1br3/4P3/1Q4B1/PP2RPPP/4R1K1 w - - 0 23",
    "solution": [
      "exd5",
      "Qxe1+",
      "Rxe1",
      "Rxe1#"
    ],
    "themes": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "xRayAttack"
    ],
    "rating": 1288
  },
  {
    "id": "01Pko",
    "fen": "5rk1/b4ppp/4P3/pp1N4/8/P2rP3/B5PP/2B2RK1 b - - 0 26",
    "solution": [
      "fxe6",
      "Ne7+",
      "Kh8",
      "Rxf8#"
    ],
    "themes": [
      "backRankMate",
      "deflection",
      "mate",
      "mateIn2",
      "middlegame",
      "pin"
    ],
    "rating": 1196
  }
];


// MateIn1 Puzzles (9)
export const mateIn1Puzzles: Puzzle[] = [
  {
    "id": "293Gz",
    "fen": "2r4k/p2n2bp/3Pn1p1/3Np3/Q3Pp2/5P1q/PB1R4/5R1K w - - 0 31",
    "solution": [
      "Rh2",
      "Qxf1#"
    ],
    "themes": [
      "advantage",
      "hangingPiece",
      "kingsideAttack",
      "mate",
      "mateIn1",
      "middlegame"
    ],
    "rating": 879
  },
  {
    "id": "2XRry",
    "fen": "r2k1b1r/pp4pp/3p4/3B2q1/3pP1b1/3P2B1/PPP3PP/R2QKR2 w Q - 3 15",
    "solution": [
      "Qb1",
      "Qe3#"
    ],
    "themes": [
      "advantage",
      "intermezzo",
      "mate",
      "mateIn1",
      "middlegame",
      "pin"
    ],
    "rating": 913
  },
  {
    "id": "5XJQH",
    "fen": "8/4p3/R2b2k1/6pp/8/6PK/4r2P/5R2 w - - 2 38",
    "solution": [
      "Rf8",
      "g4+",
      "Kh4",
      "Rxh2#"
    ],
    "themes": [
      "deflection",
      "discoveredAttack",
      "endgame",
      "mate",
      "mateIn1",
      "mateIn2"
    ],
    "rating": 993
  },
  {
    "id": "8Uwba",
    "fen": "r3k2r/p4pp1/2R2n2/3qN3/6b1/3P3p/2PBBPPP/3Q1RK1 w kq - 0 18",
    "solution": [
      "Bxg4",
      "Qxg2#"
    ],
    "themes": [
      "advantage",
      "hangingPiece",
      "kingsideAttack",
      "mate",
      "mateIn1",
      "middlegame"
    ],
    "rating": 992
  },
  {
    "id": "bJuZe",
    "fen": "3rr3/5Q2/p2p2P1/1p6/4R1kq/6N1/PPP2K2/8 b - - 0 36",
    "solution": [
      "Rxe4",
      "Qf5#"
    ],
    "themes": [
      "crushing",
      "endgame",
      "fork",
      "mate",
      "mateIn1"
    ],
    "rating": 988
  },
  {
    "id": "fH1SJ",
    "fen": "4r1k1/pp3ppp/1q6/1Qbn4/3N4/2P1P3/PB3PPP/3R2K1 b - - 2 21",
    "solution": [
      "Bxd4",
      "Qxe8#"
    ],
    "themes": [
      "advantage",
      "hangingPiece",
      "kingsideAttack",
      "mate",
      "mateIn1",
      "middlegame"
    ],
    "rating": 1120
  },
  {
    "id": "gcq2F",
    "fen": "5r1k/pp5p/6bQ/2p1q3/2BpPr2/1P1P4/P1P3P1/2B1R1K1 b - - 3 26",
    "solution": [
      "Rg4",
      "Qxf8#"
    ],
    "themes": [
      "advantage",
      "hangingPiece",
      "kingsideAttack",
      "mate",
      "mateIn1",
      "middlegame"
    ],
    "rating": 727
  },
  {
    "id": "qV50Z",
    "fen": "8/4Qk1r/p5p1/3q4/7p/2Br4/1P6/K3R3 b - - 3 41",
    "solution": [
      "Kg8",
      "Qe8#"
    ],
    "themes": [
      "backRankMate",
      "endgame",
      "hangingPiece",
      "mate",
      "mateIn1",
      "mateIn2"
    ],
    "rating": 927
  },
  {
    "id": "sPJw4",
    "fen": "6rr/b1pbkp2/1p1p3p/p2Pp1q1/2BP4/2P1Q3/PP1B1PPP/4RRK1 w - - 3 19",
    "solution": [
      "dxe5",
      "Qxg2#"
    ],
    "themes": [
      "advantage",
      "fork",
      "kingsideAttack",
      "mate",
      "mateIn1",
      "middlegame"
    ],
    "rating": 953
  }
];


// MateIn2 Puzzles (15)
export const mateIn2Puzzles: Puzzle[] = [
  {
    "id": "000Zo",
    "fen": "4r3/1k6/pp3r2/1b2P2p/3R1p2/P1R2P2/1P4PP/6K1 w - - 0 35",
    "solution": [
      "exf6",
      "Re1+",
      "Kf2",
      "Rf1#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2",
      "operaMate"
    ],
    "rating": 1376
  },
  {
    "id": "001Wz",
    "fen": "4r1k1/5ppp/r1p5/p1n1RP2/8/2P2N1P/2P3P1/3R2K1 b - - 0 21",
    "solution": [
      "Rxe5",
      "Rd8+",
      "Re8",
      "Rxe8#"
    ],
    "themes": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 1118
  },
  {
    "id": "001om",
    "fen": "5r1k/pp4pp/5p2/1BbQp1r1/6K1/7P/1PP3P1/3R3R w - - 2 26",
    "solution": [
      "Kh4",
      "Bf2+",
      "g3",
      "Bxg3#"
    ],
    "themes": [
      "mate",
      "mateIn2",
      "middlegame",
      "morphysMate"
    ],
    "rating": 1018
  },
  {
    "id": "001w5",
    "fen": "1rb2rk1/q5P1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 b - - 0 29",
    "solution": [
      "Rf7",
      "Qh7+",
      "Kxh7",
      "g8=Q#"
    ],
    "themes": [
      "advancedPawn",
      "attraction",
      "mate",
      "mateIn2",
      "middlegame",
      "promotion"
    ],
    "rating": 1039
  },
  {
    "id": "002Mm",
    "fen": "rn1qr1k1/ppp3pQ/3p1pP1/3Pp3/2P1P3/8/PP3PP1/R1B1K3 b Q - 2 16",
    "solution": [
      "Kf8",
      "Qh8+",
      "Ke7",
      "Qxg7#"
    ],
    "themes": [
      "deflection",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 1164
  },
  {
    "id": "002p5",
    "fen": "r1bqr1k1/pp1nbpp1/2p2n2/6P1/2BP4/P7/1PQNNPP1/R3K2R b KQ - 0 13",
    "solution": [
      "Nd5",
      "Qh7+",
      "Kf8",
      "Qh8#"
    ],
    "themes": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 908
  },
  {
    "id": "004X6",
    "fen": "1r4k1/p4ppp/2Q5/3pq3/8/P6P/2PR1PP1/Rr4K1 w - - 1 26",
    "solution": [
      "Rxb1",
      "Rxb1+",
      "Rd1",
      "Rxd1#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 1152
  },
  {
    "id": "004XI",
    "fen": "8/3kqp2/4p3/p2p4/3P1P2/4P1rP/7r/1QR2K2 b - - 1 34",
    "solution": [
      "Qa3",
      "Qb7+",
      "Ke8",
      "Rc8#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 982
  },
  {
    "id": "005nD",
    "fen": "3rk2r/2qn1pp1/p1Q1R3/3n3p/8/8/PP4PP/5R1K b k - 0 23",
    "solution": [
      "fxe6",
      "Qxe6+",
      "Ne7",
      "Qf7#"
    ],
    "themes": [
      "fork",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 1128
  },
  {
    "id": "0061g",
    "fen": "6k1/pp3pp1/2p1q1Pp/3b4/8/6Q1/PB3Pp1/3RrNK1 b - - 2 27",
    "solution": [
      "Rxd1",
      "Qb8+",
      "Qe8",
      "Qxe8#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 801
  },
  {
    "id": "006HV",
    "fen": "1r6/5k2/2p1pNp1/p5Pp/1pQ1P2P/2P4R/KP3P2/3q4 w - - 4 31",
    "solution": [
      "Qxc6",
      "b3+",
      "Ka3",
      "Qa1#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 1135
  },
  {
    "id": "007Rn",
    "fen": "4r1k1/p4p1p/1p6/6q1/3P2n1/P4Q2/1P1B2P1/7K w - - 0 34",
    "solution": [
      "Bxg5",
      "Re1+",
      "Qf1",
      "Rxf1#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 992
  },
  {
    "id": "008oX",
    "fen": "4r1k1/2R3pp/2p4q/1p1p4/3P4/P7/1PP2R2/1K1N4 b - - 3 32",
    "solution": [
      "Re1",
      "Rc8+",
      "Re8",
      "Rxe8#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 976
  },
  {
    "id": "0092z",
    "fen": "2r3k1/2qR1ppp/p7/2p2Q2/P7/7P/5PP1/6K1 b - - 3 26",
    "solution": [
      "Qc6",
      "Qxf7+",
      "Kh8",
      "Qxg7#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 994
  },
  {
    "id": "009IO",
    "fen": "3rk3/5p1r/p2Np1p1/3bP3/P2n4/8/1P3RPP/5RK1 b - - 4 25",
    "solution": [
      "Ke7",
      "Rxf7+",
      "Rxf7",
      "Rxf7#"
    ],
    "themes": [
      "hookMate",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 1163
  }
];


// Deflection Puzzles (10)
export const deflectionPuzzles: Puzzle[] = [
  {
    "id": "002Mm",
    "fen": "rn1qr1k1/ppp3pQ/3p1pP1/3Pp3/2P1P3/8/PP3PP1/R1B1K3 b Q - 2 16",
    "solution": [
      "Kf8",
      "Qh8+",
      "Ke7",
      "Qxg7#"
    ],
    "themes": [
      "deflection",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 1164
  },
  {
    "id": "003IM",
    "fen": "8/5kp1/p3pb2/8/6Pp/1P4qP/P2RQ3/7K w - - 2 34",
    "solution": [
      "Qg2",
      "Qe1+",
      "Qg1",
      "Qxd2"
    ],
    "themes": [
      "crushing",
      "deflection",
      "endgame"
    ],
    "rating": 1151
  },
  {
    "id": "0068B",
    "fen": "r1q3k1/4bppp/pp2pn2/4B3/8/2N2Q2/PPPR1PPP/6K1 b - - 0 18",
    "solution": [
      "Nd7",
      "Rxd7",
      "Qxd7",
      "Qxa8+"
    ],
    "themes": [
      "crushing",
      "deflection",
      "middlegame"
    ],
    "rating": 1453
  },
  {
    "id": "0088O",
    "fen": "7Q/2p5/1p2prp1/p4k1p/P4p1P/8/6RK/3q4 b - - 2 37",
    "solution": [
      "Qxa4",
      "Rg5+",
      "Ke4",
      "Qxf6"
    ],
    "themes": [
      "crushing",
      "deflection",
      "endgame"
    ],
    "rating": 1133
  },
  {
    "id": "00AoZ",
    "fen": "8/1R6/p1pk4/6bp/1QP5/P7/KP6/3r2q1 b - - 2 44",
    "solution": [
      "Qc5",
      "Rd7+",
      "Kxd7",
      "Qxc5"
    ],
    "themes": [
      "advantage",
      "deflection",
      "endgame"
    ],
    "rating": 1033
  },
  {
    "id": "00DcC",
    "fen": "5k2/6pp/p1b3P1/2N2P1r/p7/8/1KP5/5R2 b - - 0 36",
    "solution": [
      "h6",
      "Ne6+",
      "Ke7",
      "Nxg7"
    ],
    "themes": [
      "crushing",
      "deflection",
      "endgame"
    ],
    "rating": 1390
  },
  {
    "id": "00J1Y",
    "fen": "1q3r2/p5k1/1p2pbpp/2p2p2/2P1N3/2P2PQP/PP3P2/6RK b - - 2 29",
    "solution": [
      "fxe4",
      "Qxg6+",
      "Kh8",
      "Qxh6#"
    ],
    "themes": [
      "deflection",
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 1162
  },
  {
    "id": "00JAo",
    "fen": "8/5r2/6pk/7p/7P/5PK1/R7/8 b - - 2 58",
    "solution": [
      "g5",
      "Ra6+",
      "Kg7",
      "hxg5"
    ],
    "themes": [
      "crushing",
      "deflection",
      "endgame",
      "rookEndgame"
    ],
    "rating": 1189
  },
  {
    "id": "00PZo",
    "fen": "7r/8/3b4/3p4/5PR1/2kN4/4KP2/8 w - - 1 67",
    "solution": [
      "f5",
      "Re8+",
      "Kf3",
      "Kxd3"
    ],
    "themes": [
      "advantage",
      "deflection",
      "endgame"
    ],
    "rating": 1105
  },
  {
    "id": "00TFd",
    "fen": "1R6/8/p1P3k1/6pp/1P6/6PK/r6P/8 w - - 1 40",
    "solution": [
      "c7",
      "g4+",
      "Kh4",
      "Rxh2#"
    ],
    "themes": [
      "deflection",
      "endgame",
      "mate",
      "mateIn2",
      "rookEndgame"
    ],
    "rating": 1034
  }
];


// Skewer Puzzles (10)
export const skewerPuzzles: Puzzle[] = [
  {
    "id": "001xl",
    "fen": "8/4R1k1/p5pp/3B4/5q2/8/5P1P/6K1 b - - 5 40",
    "solution": [
      "Kf6",
      "Rf7+",
      "Ke5",
      "Rxf4"
    ],
    "themes": [
      "advantage",
      "endgame",
      "skewer"
    ],
    "rating": 1126
  },
  {
    "id": "004mT",
    "fen": "5Q2/8/1b1kp1p1/5p2/3p4/5qPK/7P/8 b - - 1 51",
    "solution": [
      "Kc6",
      "Qa8+",
      "Kd6",
      "Qxf3"
    ],
    "themes": [
      "advantage",
      "endgame",
      "skewer"
    ],
    "rating": 1308
  },
  {
    "id": "006OI",
    "fen": "8/p7/5k2/P5R1/6KP/8/8/5r2 w - - 5 53",
    "solution": [
      "Rg8",
      "Rg1+",
      "Kf4",
      "Rxg8"
    ],
    "themes": [
      "crushing",
      "endgame",
      "rookEndgame",
      "skewer"
    ],
    "rating": 843
  },
  {
    "id": "006yP",
    "fen": "6R1/8/Kpk1p3/1p1pP3/6P1/PPP1r3/8/8 b - - 3 40",
    "solution": [
      "Rxc3",
      "Rc8+",
      "Kd7",
      "Rxc3"
    ],
    "themes": [
      "crushing",
      "endgame",
      "rookEndgame",
      "skewer"
    ],
    "rating": 819
  },
  {
    "id": "00AB1",
    "fen": "8/7Q/3p1kp1/1p6/2b5/2P4P/5PPK/4q3 b - - 8 36",
    "solution": [
      "Qxc3",
      "Qh8+",
      "Ke6",
      "Qxc3"
    ],
    "themes": [
      "crushing",
      "endgame",
      "skewer"
    ],
    "rating": 1093
  },
  {
    "id": "00EoE",
    "fen": "r1b1k3/ppr4p/5p2/5p2/8/2P3P1/P4PP1/4RK1R b q - 1 23",
    "solution": [
      "Kf7",
      "Rxh7+",
      "Kg6",
      "Rxc7"
    ],
    "themes": [
      "crushing",
      "endgame",
      "skewer"
    ],
    "rating": 974
  },
  {
    "id": "00F1l",
    "fen": "8/2k1b3/5p2/RBpK1Pp1/Pp1p2P1/3P4/2r5/8 b - - 2 45",
    "solution": [
      "b3",
      "Ra7+",
      "Kb8",
      "Rxe7"
    ],
    "themes": [
      "crushing",
      "endgame",
      "skewer"
    ],
    "rating": 836
  },
  {
    "id": "00KMV",
    "fen": "1r3k2/1p1q1p2/p2p1np1/2pP2bp/2P1P1n1/1PQ3P1/P3N1K1/3N1R1R b - - 11 28",
    "solution": [
      "Nxe4",
      "Qh8+",
      "Ke7",
      "Qxb8"
    ],
    "themes": [
      "crushing",
      "middlegame",
      "skewer"
    ],
    "rating": 943
  },
  {
    "id": "00KOz",
    "fen": "8/r4k2/7R/5PK1/1n6/8/8/8 b - - 3 56",
    "solution": [
      "Nd5",
      "Rh7+",
      "Kf8",
      "Rxa7"
    ],
    "themes": [
      "crushing",
      "endgame",
      "skewer"
    ],
    "rating": 968
  },
  {
    "id": "00PrK",
    "fen": "r7/7R/P3k3/4p2p/3b2p1/3K4/8/5R2 b - - 7 55",
    "solution": [
      "Rxa6",
      "Rh6+",
      "Kd5",
      "Rxa6"
    ],
    "themes": [
      "crushing",
      "endgame",
      "skewer"
    ],
    "rating": 969
  }
];


// Attraction Puzzles (10)
export const attractionPuzzles: Puzzle[] = [
  {
    "id": "001w5",
    "fen": "1rb2rk1/q5P1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 b - - 0 29",
    "solution": [
      "Rf7",
      "Qh7+",
      "Kxh7",
      "g8=Q#"
    ],
    "themes": [
      "advancedPawn",
      "attraction",
      "mate",
      "mateIn2",
      "middlegame",
      "promotion"
    ],
    "rating": 1039
  },
  {
    "id": "00aDl",
    "fen": "r5k1/1p3p2/2p1ppp1/3p4/2nP4/1QB2B1P/rPP2PP1/qNKR3R w - - 3 22",
    "solution": [
      "Be2",
      "Qxb1+",
      "Kxb1",
      "Ra1#"
    ],
    "themes": [
      "attraction",
      "mate",
      "mateIn2",
      "middlegame",
      "queensideAttack",
      "sacrifice"
    ],
    "rating": 1464
  },
  {
    "id": "00d9q",
    "fen": "1r1q1r2/Q2k3p/2pp1npb/2p2P2/8/2N5/PP3PPP/4RRK1 b - - 0 19",
    "solution": [
      "Qc7",
      "Re7+",
      "Kxe7",
      "Qxc7+"
    ],
    "themes": [
      "attraction",
      "crushing",
      "deflection",
      "middlegame"
    ],
    "rating": 1112
  },
  {
    "id": "00ouE",
    "fen": "2r5/2r3k1/1p2pp1p/p2pQ1p1/3P4/4P1P1/PPq2P1R/KR6 w - - 0 30",
    "solution": [
      "Qxe6",
      "Qxb1+",
      "Kxb1",
      "Rc1#"
    ],
    "themes": [
      "attraction",
      "endgame",
      "mate",
      "mateIn2",
      "sacrifice"
    ],
    "rating": 1431
  },
  {
    "id": "00rzv",
    "fen": "2k3rr/1pp1n3/p2qp1Bp/3p3Q/8/2N1P2P/PPPP2Rb/R1B2K2 w - - 0 24",
    "solution": [
      "Bf7",
      "Rxg2",
      "Kxg2",
      "Qg3+"
    ],
    "themes": [
      "advantage",
      "attraction",
      "middlegame"
    ],
    "rating": 1038
  },
  {
    "id": "01CQ7",
    "fen": "1n3r1k/p5pp/8/7Q/4P3/2NP4/PPPB2qP/R2KRr2 w - - 3 21",
    "solution": [
      "Be3",
      "Rxe1+",
      "Kxe1",
      "Rf1#"
    ],
    "themes": [
      "attraction",
      "mate",
      "mateIn2",
      "middlegame"
    ],
    "rating": 1440
  },
  {
    "id": "01EMd",
    "fen": "r6k/4q1pp/1n1pBp2/2p1nP2/1p2R2Q/1P5P/r5P1/2B1R1K1 b - - 6 31",
    "solution": [
      "Nbd7",
      "Qxh7+",
      "Kxh7",
      "Rh4#"
    ],
    "themes": [
      "attraction",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "pillsburysMate",
      "sacrifice"
    ],
    "rating": 1322
  },
  {
    "id": "01OFy",
    "fen": "r4rk1/pppbq1pp/1b3p2/3Bp2R/3P4/2P3P1/PP3P1P/R1BQ2K1 b - - 0 16",
    "solution": [
      "Kh8",
      "Rxh7+",
      "Kxh7",
      "Qh5#"
    ],
    "themes": [
      "attraction",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 1380
  },
  {
    "id": "01Xzx",
    "fen": "3r2k1/1Rp1qpp1/7p/8/5Q2/1PP5/5PPP/3r1RK1 w - - 5 26",
    "solution": [
      "Rxc7",
      "Rxf1+",
      "Kxf1",
      "Rd1#"
    ],
    "themes": [
      "attraction",
      "endgame",
      "mate",
      "mateIn2"
    ],
    "rating": 1213
  },
  {
    "id": "01do1",
    "fen": "5rk1/n2P3p/1p2p1pQ/pP3p2/q3p1N1/8/5PPP/5RK1 b - - 0 34",
    "solution": [
      "fxg4",
      "Qxf8+",
      "Kxf8",
      "d8=Q+"
    ],
    "themes": [
      "advancedPawn",
      "attraction",
      "crushing",
      "endgame",
      "promotion"
    ],
    "rating": 1102
  }
];


// Sacrifice Puzzles (10)
export const sacrificePuzzles: Puzzle[] = [
  {
    "id": "00Cwz",
    "fen": "1r5r/5pk1/4p3/2Np2PP/p1nP4/n1P5/P3B3/K1R4R w - - 2 34",
    "solution": [
      "Nxa4",
      "Rb1+",
      "Rxb1",
      "Nc2#"
    ],
    "themes": [
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 1495
  },
  {
    "id": "00IqI",
    "fen": "r5k1/pp3ppp/2p5/4pb2/2B2q2/P1P1nP2/1P1Q3P/3R1R1K b - - 1 22",
    "solution": [
      "Nxc4",
      "Qd8+",
      "Rxd8",
      "Rxd8#"
    ],
    "themes": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 1434
  },
  {
    "id": "00KhM",
    "fen": "5rk1/5ppp/1R6/3Qp3/2B1P3/2q3P1/3R1PKP/1r6 b - - 0 27",
    "solution": [
      "Rxb6",
      "Qxf7+",
      "Rxf7",
      "Rd8#"
    ],
    "themes": [
      "clearance",
      "endgame",
      "mate",
      "mateIn2",
      "pin",
      "sacrifice"
    ],
    "rating": 1339
  },
  {
    "id": "00LNB",
    "fen": "kr6/1pR4p/p4R2/n2r4/P3p3/4B3/6PP/6K1 b - - 0 38",
    "solution": [
      "Rd3",
      "Rxa6+",
      "bxa6",
      "Ra7#"
    ],
    "themes": [
      "endgame",
      "mate",
      "mateIn2",
      "operaMate",
      "sacrifice"
    ],
    "rating": 1051
  },
  {
    "id": "00M92",
    "fen": "3q1r1k/p3r1pp/1p1b1p2/2p1n3/3pR2N/1QPP2P1/PP1B1P1P/R5K1 b - - 3 21",
    "solution": [
      "Nxd3",
      "Ng6+",
      "hxg6",
      "Rh4#"
    ],
    "themes": [
      "clearance",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 945
  },
  {
    "id": "00OCQ",
    "fen": "1rr3k1/5p1p/p5pQ/4p3/4q3/B3P3/PPPR1PPP/2KR4 w - - 6 27",
    "solution": [
      "c3",
      "Rxc3+",
      "bxc3",
      "Rb1#"
    ],
    "themes": [
      "mate",
      "mateIn2",
      "middlegame",
      "queensideAttack",
      "sacrifice"
    ],
    "rating": 972
  },
  {
    "id": "00Oim",
    "fen": "1r3rk1/q5pp/2R5/3P4/8/1p2NpPb/1P3P1P/2QR2K1 w - - 0 32",
    "solution": [
      "Qc4",
      "Qxe3",
      "fxe3",
      "f2+"
    ],
    "themes": [
      "advancedPawn",
      "advantage",
      "middlegame",
      "sacrifice"
    ],
    "rating": 1188
  },
  {
    "id": "00Tya",
    "fen": "r4rk1/6pp/1p1Bp3/p7/P1PP4/4nqP1/2QR3P/4R1K1 w - - 1 25",
    "solution": [
      "Qa2",
      "Qf1+",
      "Rxf1",
      "Rxf1#"
    ],
    "themes": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 1216
  },
  {
    "id": "00Yy4",
    "fen": "r7/pp4kp/6p1/2P2q1n/1PBb1p2/P4P2/3B2PP/2Q1R1K1 w - - 1 28",
    "solution": [
      "Kh1",
      "Ng3+",
      "hxg3",
      "Qh5#"
    ],
    "themes": [
      "clearance",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice"
    ],
    "rating": 985
  },
  {
    "id": "00aDl",
    "fen": "r5k1/1p3p2/2p1ppp1/3p4/2nP4/1QB2B1P/rPP2PP1/qNKR3R w - - 3 22",
    "solution": [
      "Be2",
      "Qxb1+",
      "Kxb1",
      "Ra1#"
    ],
    "themes": [
      "attraction",
      "mate",
      "mateIn2",
      "middlegame",
      "queensideAttack",
      "sacrifice"
    ],
    "rating": 1464
  }
];


// All puzzles combined
export const allPuzzles: Puzzle[] = [
  ...forkPuzzles,
  ...pinPuzzles,
  ...discoveredAttackPuzzles,
  ...backRankMatePuzzles,
  ...mateIn1Puzzles,
  ...mateIn2Puzzles,
  ...deflectionPuzzles,
  ...skewerPuzzles,
  ...attractionPuzzles,
  ...sacrificePuzzles,
];

// Get puzzles by theme
export function getPuzzlesByTheme(theme: string): Puzzle[] {
  return allPuzzles.filter(p => p.themes.includes(theme));
}

// Get puzzles by rating range
export function getPuzzlesByRating(minRating: number, maxRating: number): Puzzle[] {
  return allPuzzles.filter(p => p.rating >= minRating && p.rating <= maxRating);
}

// Get random puzzle
export function getRandomPuzzle(theme?: string): Puzzle | null {
  const pool = theme ? getPuzzlesByTheme(theme) : allPuzzles;
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Puzzle themes available
export const availableThemes = ["fork","pin","discoveredAttack","backRankMate","mateIn1","mateIn2","deflection","skewer","attraction","sacrifice"];

// Total puzzle count
export const totalPuzzleCount = 124;
