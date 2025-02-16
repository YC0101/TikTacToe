const initialValue = {
  moves: [],
};
export default class Store {
  #state = initialValue;
  constructor(players) {
    this.players = players;
  }

  // Getter: Evaluate at runtime no need to add '()' when calling
  get game() {
    const state = this.#getState();
    const currentPlayer = this.players[state.moves.length % 2];

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];
    let winner = null;

    for (const player of this.players) {
      const selectedSquareIds = state.moves
        .filter((move) => move.player.id === player.id)
        .map((move) => move.squareId);

      for (const p of winningPatterns) {
        if (p.every((v) => selectedSquareIds.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      moves: state.moves,
      currentPlayer,
      status: {
        isComplete: winner != null || state.moves.length === 9,
        winner,
      },
    };
  }

  playerMove(squareId) {
    const state = this.#getState();
    const stateClone = structuredClone(state);
    stateClone.moves.push({
      squareId,
      player: this.game.currentPlayer,
    });
    this.#saveState(stateClone);
  }

  reset() {
    this.#saveState(initialValue);
  }

  #getState() {
    return this.#state;
  }

  #saveState(stateOrFn) {
    const prevState = this.#getState();
    //this.#state = newState;
    let newState;
    switch (typeof stateOrFn) {
      case "function":
        newState = stateOrFn(prevState);
      case "object":
        newState = stateOrFn;
        break;
      default:
        throw new Error("saveState: Invalid argument");
    }
    this.#state = newState;
  }
}
