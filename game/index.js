import { Map } from "immutable";
import winner from "./winner.js";

let board = Map();

const X = "X";
const O = "O";
const MOVE = "MOVE";
const START = "START";
const END = "END";

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
    const primes = [[2, 3, 5], [7, 11, 13], [17, 19, 23]];
    const scoreFactor = primes[action.position[0]][action.position[1]];
    return player === "X"
      ? { X: score.X * scoreFactor, O: score.O }
      : { O: score.O * scoreFactor, X: score.X };
  }
  return score;
}

function bad (state, action) {
  if (!state.board.getIn(action.position)) return null;
  else return 'Wrong move!'
}

function gameReducer(
  state = {
    board,
    turn: X,
    score: { X: 1, O: 1 },
    gameOver: false,
    winner: null,
    remaining: 9
  },
  action
) {
  if (action.type !== MOVE) return state;
  if (bad(state, action)) {
    console.log(bad(state, action));
    return state;
  }
  const turn = turnReducer(state.turn, action);
  const board = boardReducer(state.board, state.turn, action);
  const nextScore = scoreReducer(state.score, state.turn, action);
  const winningPlayer = winner(nextScore) ? state.turn : null;
  const remaining = state.board === board ? state.remaining : state.remaining - 1
  return {
    board,
    turn,
    score: nextScore,
    winner: winningPlayer,
    remaining
  };
}

module.exports = {
  gameReducer,
  move,
  bad
};
