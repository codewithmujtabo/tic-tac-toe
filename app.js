let currentPlayer = "X";
let gamecolumn = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handlerowClick(event) {
  if (!gameActive) return;

  const clickedrow = event.target;
  const rowIndex = clickedrow.dataset.index;

  if (gamecolumn[rowIndex] === "") {
    gamecolumn[rowIndex] = currentPlayer;
    clickedrow.innerText = currentPlayer;
    clickedrow.style.color = currentPlayer === "X" ? "#973737" : "white";

    if (checkWinner()) {
      document.getElementById(
        "result"
      ).innerText = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (iscolumnFull()) {
      document.getElementById("result").innerText = "Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gamecolumn[a] !== "" &&
      gamecolumn[a] === gamecolumn[b] &&
      gamecolumn[a] === gamecolumn[c]
    ) {
      return true;
    }
  }

  return false;
}

function iscolumnFull() {
  return !gamecolumn.includes("");
}

function resetGame() {
  gamecolumn = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  document.getElementById("result").innerText = "";
  document.querySelectorAll(".row").forEach((row) => {
    row.innerText = "";
    row.style.color = "";
  });
}
