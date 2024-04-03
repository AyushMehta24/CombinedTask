let box = document.querySelectorAll(".box");
let statusText = document.querySelector("#status");
let restart = document.querySelector("#restart");
let x = "x";
let o = "o";

let running = false;
let currentPlayer = x;
let player = "X";
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let option = ["", "", "", "", "", "", "", "", ""];

// restart.style.cssText = "color: blue; font-size: 2em; text-align: center";

start();
function start() {
  box.forEach((box) => {
    box.addEventListener("click", boxClick);
  });
  restart.addEventListener("click", restartGame);
  statusText.textContent = `${player} Your turn.`;
  running = true;
}

function boxClick() {
  let index = this.dataset.index;
  if (option[index] != "" || !running) {
    return;
  }
  updateBox(this, index);
  checkWinner();
}

function updateBox(box, index) {
  option[index] = player;
  box.innerHTML = currentPlayer;
}

function checkWinner() {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i];
    const box1 = option[condition[0]];
    const box2 = option[condition[1]];
    const box3 = option[condition[2]];
    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if (box1 == box2 && box2 == box3) {
      isWon = true;
    }
  }
  if (isWon) {
    statusText.textContent = `${player} Won..`;
    running = false;
  } else if (!option.includes("")) {
    statusText.textContent = `Draw`;
    running = false;
  } else {
    changePlayer();
  }
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
  currentPlayer = currentPlayer == x ? o : x;
  statusText.textContent = `${player} Your Turn`;
}

function restartGame() {
  option = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  running = true;
  statusText.textContent = `${player} Your Turn`;

  box.forEach((box) => {
    box.textContent = "";
  });
}
