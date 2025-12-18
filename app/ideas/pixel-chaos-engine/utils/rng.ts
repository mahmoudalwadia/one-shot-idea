/**
 * Simple Mulberry32 seeded random number generator.
 * Provides deterministic results based on a string seed.
 */
export class RNG {
  private state: number;

  constructor(seed: string) {
    this.state = this.cyrb128(seed);
  }

  // Hashing function to turn a string into a number state
  private cyrb128(str: string): number {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return (h1 ^ h2 ^ h3 ^ h4) >>> 0;
  }

  // Returns a float between 0 and 1
  next(): number {
    let t = this.state += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Returns float between min and max
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  // Returns integer between min and max (inclusive min, exclusive max)
  rangeInt(min: number, max: number): number {
    return Math.floor(this.range(min, max));
  }

  // Returns true or false based on probability (0-1)
  chance(probability: number): boolean {
    return this.next() < probability;
  }

  pick<T>(array: T[]): T {
    return array[Math.floor(this.next() * array.length)];
  }
}