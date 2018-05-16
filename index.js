import inquirer from "inquirer";
import { gameReducer, move } from "./game";
import { createStore } from "redux";
import ai from "./game/ai"
import moves from './game/ai'

// Create the store
const game = createStore(gameReducer);

const printBoard = () => {
  const { board } = game.getState();
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      process.stdout.write(board.getIn([r, c], "_"));
    }
    process.stdout.write("\n");
  }
};

const getInput = player => async () => {
  const { turn } = game.getState();
  if (turn !== player) return;
  const ans = await inquirer.prompt([
    {
      type: "input",
      name: "coord",
      message: `${turn}'s move (row,col):`
    }
  ]);
  const [row = 0, col = 0] = ans.coord.split(/[,\s+]/).map(x => +x);

  game.dispatch(move([row, col]));
};

const computer = player => () => {
  const state = game.getState();
  if (state.turn === player) {
    const computerMove = ai(state);
    game.dispatch(move(computerMove[0].move));
    console.log(computerMove)
  }
}

// Debug: Print the state
// game.subscribe(() => console.log(game.getState()))
// game.subscribe(() => {
//   if (winner()) {
//     console.log(`${game.getState().turn} has won~`);
//     process.exit(0);
//   }
// });

game.subscribe(printBoard);
game.subscribe(getInput("X"));
// game.subscribe(getInput("O"));
game.subscribe(computer('O'));
game.subscribe(() => {
  const winner = game.getState().winner;
  if (winner) {
    console.log(`${winner} wins!`)
    process.exit(0);
  }
})

// We dispatch a dummy START action to call all our
// subscribers the first time.
game.dispatch({ type: "START" });

export default game;
