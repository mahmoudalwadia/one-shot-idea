import { Card, GameState, Rank, Suit, Color } from '../types';

// --- Helpers ---

export const getSuitColor = (suit: Suit): Color => {
  return (suit === Suit.HEARTS || suit === Suit.DIAMONDS) ? Color.RED : Color.BLACK;
};

export const generateDeck = (): Card[] => {
  const suits = [Suit.HEARTS, Suit.DIAMONDS, Suit.CLUBS, Suit.SPADES];
  const ranks = Object.values(Rank).filter((v) => typeof v === 'number') as Rank[];
  
  const deck: Card[] = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        isFaceUp: false,
      });
    });
  });
  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const initializeGame = (): GameState => {
  const deck = shuffleDeck(generateDeck());
  
  const tableau: Card[][] = Array.from({ length: 7 }, () => []);
  const foundations: Card[][] = [[], [], [], []];
  
  // Deal to tableau
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      const card = deck.pop();
      if (card) {
        if (i === j) card.isFaceUp = true; // Top card is face up
        tableau[j].push(card);
      }
    }
  }

  return {
    stock: deck,
    waste: [],
    foundations,
    tableau,
    score: 0,
    moves: 0
  };
};

// --- Move Validation ---

export const canMoveToFoundation = (card: Card, foundationPile: Card[]): boolean => {
  if (foundationPile.length === 0) {
    return card.rank === Rank.ACE;
  }
  const topCard = foundationPile[foundationPile.length - 1];
  return card.suit === topCard.suit && card.rank === topCard.rank + 1;
};

export const canMoveToTableau = (card: Card, tableauPile: Card[]): boolean => {
  if (tableauPile.length === 0) {
    return card.rank === Rank.KING;
  }
  const topCard = tableauPile[tableauPile.length - 1];
  return (
    getSuitColor(card.suit) !== getSuitColor(topCard.suit) &&
    card.rank === topCard.rank - 1
  );
};

export const isCardMoveable = (card: Card): boolean => {
    return card.isFaceUp;
};
