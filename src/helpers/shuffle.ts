export default function shuffle<T>(arr: Array<T>): void {
    let i = arr.length;
    let j: number, temp: T;
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }

  // taken from https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array#answer-59837259, but added my own typing
  