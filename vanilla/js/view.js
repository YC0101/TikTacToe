//The export default statement is used in ES6 modules to export a single value,
// function, or class from a JavaScript file, allowing other files to import it.
export default class View {
  $ = {}; //Element
  $$ = {}; //List

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

    this.$$.squares = this.#qsAll('[data-id="square"]');

    // UI - only eventListener
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  // These methods will not be called if no method is calling them.
  // The listener is not added at this step.
  bindGameResetEvent(handler) {
    //Do the function in controller not in view
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    //Do the function in controller not in view
    this.$.resetBtn.addEventListener("click", handler);
  }
  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  openModal(message) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.textContent = message;
  }

  closeModal() {
    this.$.modal.classList.add("hidden");
  }

  clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  //DOM helper methods
  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  //Put X and O in the grid for each player movement
  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  setTurnIndecator(player, opponent) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    this.$.turn.classList.add(player.colorClass);

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);
    label.innerText = `${player.name}, you're up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  // Private properties are a feature introduced in ES2020
  // that allows you to declare truly private fields inside
  // a class using #.
  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);
    if (!el) throw new Error("Could not find elements");
    return el;
  }
  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);
    if (!elList) throw new Error("Could not find elements");
    return elList;
  }
}
