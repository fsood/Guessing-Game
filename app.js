const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");

const levels = Array.from(document.getElementsByClassName("mode"));
const squares = Array.from(document.getElementsByClassName("square"));

let gameLevel = levels.find((level) => {
  const classList = Array.from(level.classList);
  return classList.includes("selected");
}).innerHTML;

let targetRGB = [];

levels.forEach((level) => {
  level.addEventListener("click", function () {
    levels.forEach((node) => node.classList.remove("selected"));
    this.classList.add("selected");

    gameLevel = this.innerHTML;
    updateSquaresDisplay();
    resetGame();
  });
});

function updateSquaresDisplay() {
  if (gameLevel === "Easy") {
    for (let i = 3; i < squares.length; i++) {
      squares[i].style.display = "none";
    }
  } else {
    squares.forEach((square) => {
      square.style.display = "block";
    });
  }
}

const startButton = document.getElementById("reset");
startButton.addEventListener("click", function () {
  resetGame();
});

function resetGame() {
  for (let i = 0; i < squares.length; i = i + 1) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const rgbString = "rgb(" + red + "," + green + "," + blue + ")";
    console.log(rgbString);

    const square = squares[i];

    square.dataset.rgb_value = JSON.stringify([red, green, blue]);
    square.style.backgroundColor = rgbString;
  }

  const randomSquareIndex = Math.floor(Math.random() * squares.length);
  const headerColorSquare = squares[randomSquareIndex];
  setHeaderRgbBackgroundColor(headerColorSquare);
  targetRGB = JSON.parse(headerColorSquare.dataset.rgb_value);
  updateRGBValues();
}

function setHeaderRgbBackgroundColor(squareElement) {
  const rgbString = squareElement.dataset.rgb_value;
  const [red, green, blue] = JSON.parse(rgbString);
  const header = document.querySelector("h1");
  header.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function updateRGBValues() {
  rElement.textContent = targetRGB[0];
  gElement.textContent = targetRGB[1];
  bElement.textContent = targetRGB[2];
}

squares.forEach((square) => {
  square.addEventListener("click", function () {
    const clickedRGB = JSON.parse(this.dataset.rgb_value);
    if (
      clickedRGB[0] === targetRGB[0] &&
      clickedRGB[1] === targetRGB[1] &&
      clickedRGB[2] === targetRGB[2]
    ) {
      document.getElementById("message").textContent = "Correct!";
      changeSquaresColor(clickedRGB);
      startButton.textContent = "Play Again?";
    } else {
      this.style.backgroundColor = "#232323";
      document.getElementById("message").textContent = "Try Again";
    }
  });
});

function changeSquaresColor(rgb) {
  squares.forEach((square) => {
    square.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  });
}
// Initial setup based on selected level
updateSquaresDisplay();
resetGame();
