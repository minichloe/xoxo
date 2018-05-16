import { Map } from "immutable";

let board = Map();

const X = "X";
const O = "O";
const MOVE = "MOVE";
const START = "START";

const move = position => ({
  type: "MOVE",
  position
});
const POSITION = "POSITION";

function gameReducer(state = { board, counter: 1, turn: X }, action) {
  switch (action.type) {
    case MOVE: {
      const player = state.counter % 2 ? X : O;
      return {
        board: state.board.setIn(action.position, player),
        counter: state.counter + 1,
        turn: player
      };
    }
    default:
      return state;
  }
}

module.exports = {
  gameReducer,
  move
};
