// A Fisher–Yates shuffle function that returns a new array
// with all elements in random order, without mutating the original array
export function useShuffle() {
  function shuffle<T>(array: T[]): T[] {
    const a = [...array];

    for (let i = a.length - 1; i > 0; i--) {
      // j is always a valid index: 0 ≤ j ≤ i < a.length
      const j: number = Math.floor(Math.random() * (i + 1));

      // Safe swap using temporary variable
      const temp = a[i];
      a[i] = a[j]!;
      a[j] = temp!;
    }

    return a;
  }

  return { shuffle };
}
