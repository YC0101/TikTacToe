import Store from "./store.js";
import View from "./view.js";
import { Game, GameStatus, Move, Player } from "./types";

const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store(players, "tic-tac-toe-vanilla");

  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });
  // function initView() {
  //   view.closeAll();
  //   view.clearMoves();
  //   view.setTurnIndecator(store.game.currentPlayer);
  //   view.updateScoreboard(
  //     store.stats.playerWithStats[0].wins,
  //     store.stats.playerWithStats[1].wins,
  //     store.stats.ties
  //   );
  //   view.initializeMoves(store.game.moves);
  // }

  // Check if storage change in another tab
  window.addEventListener("storage", () => {
    view.render(store.game, store.stats);
  });

  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
    //view.render(store.game, store.stats);
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    //view.render(store.game, store.stats);
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    //view.handlePlayerMove(square, store.game.currentPlayer);

    store.playerMove(+square.id);
    // if (store.game.status.isComplete) {
    //   view.openModal(
    //     store.game.status.winner
    //       ? `${store.game.status.winner.name} wins`
    //       : "Tie!"
    //   );
    //   return;
    // }

    //view.setTurnIndecator(store.game.currentPlayer);
    //view.render(store.game, store.stats);
  });
}

window.addEventListener("load", init);
