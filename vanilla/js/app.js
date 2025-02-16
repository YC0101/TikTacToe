//import Store from "./store.js";
import View from "./view.js";
// Strict mode is a way to enforce a stricter set of JavaScript rules,
// making the code safer and less error-prone.
//namespace
// const App = {
//   //All selected html elements
//   //object literal
//   $: {
//     menu: document.querySelector('[data-id = "menu"'),
//     menuItems: document.querySelector('[data-id = "menu-items"]'),
//     resetBtn: document.querySelector('[data-id="reset-btn"]'),
//     newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
//     squares: document.querySelectorAll('[data-id="square"]'),
//     modal: document.querySelector('[data-id="modal"]'),
//     modalText: document.querySelector('[data-id="modal-text"]'),
//     modalBtn: document.querySelector('[data-id="modal-btn"]'),
//     turn: document.querySelector('[data-id="turn"]'),
//   },
//   state: {
//     moves: [],
//   },
//   getGameStatus: function (moves) {
//     const p1Moves = moves
//       .filter((move) => move.playerId === 1)
//       .map((move) => +move.squareId);
//     const p2Moves = moves
//       .filter((move) => move.playerId === 2)
//       .map((move) => +move.squareId);
//     const winningPatterns = [
//       [1, 2, 3],
//       [1, 5, 9],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 5, 7],
//       [3, 6, 9],
//       [4, 5, 6],
//       [7, 8, 9],
//     ];
//     let winner = null;

//     winningPatterns.forEach((pattern) => {
//       const p1Wins = pattern.every((v) => p1Moves.includes(v));
//       const p2Wins = pattern.every((v) => p2Moves.includes(v));
//       if (p1Wins) winner = 1;
//       if (p2Wins) winner = 2;
//     });

//     return {
//       status: moves.length === 9 || winner != null ? "complete" : "in-progress", //in-progress | complete
//       winner, //1 | 2 | null
//     };
//   },
//   init: function () {
//     App.registerEventListener();
//   },
//   registerEventListener: function () {
//     //
//     App.$.menu.addEventListener("click", (event) => {
//       App.$.menuItems.classList.toggle("hidden");
//     });

//     App.$.resetBtn.addEventListener("click", (event) => {
//       //reset
//     });

//     App.$.newRoundBtn.addEventListener("click", (event) => {
//       //newround
//     });
//     App.$.modalBtn.addEventListener("click", (event) => {
//       App.state.moves = [];
//       App.$.squares.forEach((square) => square.replaceChildren());
//       App.$.modal.classList.add("hidden");
//     });
//     App.$.squares.forEach((square) => {
//       square.addEventListener("click", (event) => {
//         //square clicked event
//         //<i class="fa-solid fa-x yellow"></i>
//         //<i class="fa-solid fa-o turquoise"></i>

//         const hasMove = (squareId) => {
//           const existMove = App.state.moves.find(
//             (move) => move.squareId === squareId
//           );
//           return existMove !== undefined;
//         };

//         if (hasMove(+square.id)) {
//           return;
//         }

//         const lastMove = App.state.moves.at(-1);
//         const currentPlayer =
//           App.state.moves.length === 0 ? 1 : 3 - lastMove.playerId;

//         const icon = document.createElement("i");
//         const Turnicon = document.createElement("i");
//         const turnLabel = document.createElement("p");

//         if (currentPlayer == 1) {
//           icon.classList.add("fa-solid", "fa-x", "yellow");
//           Turnicon.classList.add("fa-solid", "fa-o", "turquoise");
//           turnLabel.classList = "turquoise";
//         } else {
//           icon.classList.add("fa-solid", "fa-o", "turquoise");
//           Turnicon.classList.add("fa-solid", "fa-x", "yellow");
//           turnLabel.classList = "yellow";
//         }

//         App.$.turn.replaceChildren(Turnicon, turnLabel);

//         //The + sign in +square.id is a unary plus operator in JavaScript.
//         // it is used to convert the value of square.id into a number.
//         App.state.moves.push({
//           squareId: +square.id,
//           playerId: currentPlayer,
//         });

//         App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

//         square.replaceChildren(icon);

//         //Determine if a win
//         const game = App.getGameStatus(App.state.moves);

//         if (game.status === "complete") {
//           App.$.modal.classList.remove("hidden");
//           let message = "";
//           if (game.winner) {
//             message = `Player ${game.winner} wins`;
//           } else {
//             message = `Tie`;
//           }
//           App.$.modalText.textContent = message;
//         }
//       });
//     });
//   },
// };

// App.$.menu.addEventListener("click", (event) => {
//     App.$.menuItems.classList.toggle("hidden");
// });

//window.addEventListener("load", () => App.init());

function init() {
  const view = new View();

  view.bindGameResetEvent((event) => {});
  view.bindNewRoundEvent((event) => {});
  view.bindPlayerMoveEvent((event) => {
    view.setTurnIndecator(2);
    view.handlePlayerMove(event.target, 2);
  });
}

window.addEventListener("load", init());
