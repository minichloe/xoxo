import { Map } from "immutable";
import winner from "./winner.js";

let board = Map();

const X = "X";
const O = "O";
const MOVE = "MOVE";
const START = "START";
const END = "END";
const primes = [[2, 3, 5], [7, 11, 13], [17, 19, 23]];

const move = position => ({
  type: "MOVE",
  position
});
const POSITION = "POSITION";

function turnReducer(turn = X, action) {
  if (action.type === MOVE) return turn === "X" ? "O" : "X";
  return turn;
}

function boardReducer(board = Map(), player, action) {
  if (action.type === MOVE) return board.setIn(action.position, player);
  return board;
}

function scoreReducer(score, player, action) {
  if (action.type === MOVE) {
    const scoreFactor = primes[action.position[0]][action.position[1]];
    return player === "X"
      ? { X: score.X * scoreFactor, O: score.O }
      : { O: score.O * scoreFactor, X: score.X };
  }
  return score;
}

function gameReducer(
  state = {
    board,
    turn: X,
    score: { X: 1, O: 1 },
    gameOver: false
  },
  action
) {
  if (action.type !== MOVE) return state;
  const turn = turnReducer(state.turn, action);
  const board = boardReducer(state.board, state.turn, action);
  const nextScore = scoreReducer(state.score, state.turn, action);
  if (winner(nextScore)) {
    console.log(state.turn + " has won");
    process.exit(0);
  }
  return {
    board,
    turn,
    score: nextScore
  };
}

module.exports = {
  gameReducer,
  move
};
