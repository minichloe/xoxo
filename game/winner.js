import game from "../index.js";

const winningProducts = [
  2 * 7 * 17,
  3 * 11 * 19,
  5 * 13 * 23,
  2 * 3 * 5,
  7 * 11 * 13,
  17 * 19 * 23,
  2 * 11 * 23,
  5 * 11 * 17
];

export default function winner(score) {
  for (let i = 0; i < winningProducts.length; i++) {
    if (score.X % winningProducts[i] === 0) return true;
    if (score.O % winningProducts[i] === 0) return true;
  }
  return false;
}
