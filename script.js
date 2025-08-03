const canvas = document.querySelector(".canvas");
const buttons = document.querySelectorAll("button");
const colorPicker = document.querySelector(".color-picker-input");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");

const CANVAS_SIZE = 480;
let gridSize = slider.value;
let option = "pen";

function createGrid() {
  canvas.innerHTML = "";

  const squareSize = CANVAS_SIZE / gridSize;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-square");
    div.style.width = `${squareSize}px`;
    div.style.height = `${squareSize}px`;

    div.addEventListener("mouseover", () => {
      div.style.backgroundColor = handleOption();
    });

    canvas.appendChild(div);
  }
  sliderValue.textContent = `${gridSize} x ${gridSize}`;
}

function handleOption() {
  switch (option) {
    case "pen":
      return setPenColor();
    case "rainbow":
      return setRandomColor();
    case "eraser":
      return setEraser();
    case "pickColor":
      return setPickedColor();
    default:
      return setPenColor();
  }
}

function setPenColor() {
  return "#000";
}

function setRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777216)
      .toString(16)
      .padStart(6, "0")
  );
}

function setEraser() {
  return "#fff";
}

function setPickedColor() {
  return colorPicker.value;
}

function resetGrid() {
  if (option === "eraser") {
    option = "pen";
  }

  const gridSquare = document.querySelectorAll(".grid-square");
  gridSquare.forEach((square) => (square.style.backgroundColor = "#fff"));
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.value === "reset") {
      resetGrid();
    } else {
      option = button.value;
    }
  });
});

colorPicker.addEventListener("input", () => {
  option = "pickColor";
});

slider.addEventListener("input", () => {
  gridSize = slider.value;
  createGrid();
});

createGrid();
