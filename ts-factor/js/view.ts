//The export default statement is used in ES6 modules to export a single value,
// function, or class from a JavaScript file, allowing other files to import it.
// type ElementObjectDictionary = {
//   [key in string]: Element;
// };

import type { Game, GameStatus, Move, Player } from "./types";
import type Store from "./store";
import type { DerivedStats, DerivedGame } from "./store";
// type CustomRecordUtility<TKey extends string, TValue> = {
//   [key in TKey]: TValue;
// };

export default class View {
  $: Record<string, Element> = {}; //Element
  $$: Record<string, NodeListOf<Element>> = {}; //List

  // we use = instead of : because the properties are declared inside a class scope.
  constructor() {
    this.$.menu = this.#qs('[data-id = "menu"');
    this.$.menuBtn = this.#qs('[data-id = "menu-btn"');
    this.$.menuItems = this.#qs('[data-id = "menu-items"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');
    this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
    this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
    this.$.ties = this.#qs('[data-id="ties"]');
    this.$.grid = this.#qs('[data-id="grid"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    // UI - only eventListener
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  render(game: DerivedGame, stats: DerivedStats) {
    const { playerWithStats, ties } = stats;
    const {
      moves,
      currentPlayer,
      status: { isComplete, winner },
    } = game;

    this.#closeAll();
    this.#clearMoves();
    this.#setTurnIndecator(currentPlayer);
    this.#updateScoreboard(
      playerWithStats[0].wins,
      playerWithStats[1].wins,
      ties
    );
    this.#initializeMoves(moves);

    if (isComplete) {
      this.#openModal(winner ? `${winner.name} wins` : "Tie!");
      return;
    }
    this.#setTurnIndecator(currentPlayer);
  }

  // These methods will not be called if no method is calling them.
  // The listener is not added at this step.
  bindGameResetEvent(handler: EventListener) {
    //Do the function in controller not in view
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler: EventListener) {
    //Do the function in controller not in view
    this.$.newRoundBtn.addEventListener("click", handler);
  }
  bindPlayerMoveEvent(handler: (el: Element) => void) {
    // this.$$.squares.forEach((square) => {
    //   square.addEventListener("click", () => handler(square));
    // });
    this.#delegate(this.$.grid, '[data-id = "square"]', "click", handler);
  }

  #updateScoreboard(p1Wins: number, p2Wins: number, ties: number) {
    this.$.p1Wins.textContent = `${p1Wins} Wins`;
    this.$.p2Wins.textContent = `${p2Wins} Wins`;
    this.$.ties.textContent = `${ties}`;
  }

  #openModal(message: string) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.textContent = message;
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");
    //const icon = this.$.menuBtn.querySelector("i");

    const icon = this.#qs("i", this.$.menuBtn);
    icon.classList.add("fa-chevron-down");
    icon.classList.remove("fa-chevron-up");
  }

  #closeAll() {
    this.#closeModal();
    this.#closeMenu();
  }

  #clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  #initializeMoves(moves: Move[]) {
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareId == +square.id);
      if (existingMove) {
        this.#handlePlayerMove(square, existingMove.player);
      }
    });
  }

  //DOM helper methods
  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    //const icon = this.$.menuBtn.querySelector("i");
    const icon = this.#qs("i", this.$.menuBtn);

    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  //Put X and O in the grid for each player movement
  #handlePlayerMove(squareEl: Element, player: Player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  #setTurnIndecator(player: Player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    this.$.turn.classList.add(player.colorClass);

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);
    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you're up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  // Private properties are a feature introduced in ES2020
  // that allows you to declare truly private fields inside
  // a class using #.
  #qs(selector: string, parent?: Element) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);
    if (!el) throw new Error("Could not find elements");
    return el;
  }
  #qsAll(selector: string) {
    const elList = document.querySelectorAll(selector);
    if (!elList) throw new Error("Could not find elements");
    return elList;
  }

  #delegate(
    el: Element,
    selector: string,
    eventKey: string,
    handler: (el: Element) => void
  ) {
    el.addEventListener(eventKey, (event) => {
      if (!(event.target instanceof Element)) {
        throw new Error("Event.target not found");
      }
      if (event.target.matches(selector)) {
        handler(event.target);
      }
    });
  }
}
