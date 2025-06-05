const container = document.querySelector(".container");
const penBtn = document.querySelector(".pen-btn");
const rainbowBtn = document.querySelector(".rainbow-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const resetBtn = document.querySelector(".reset-btn");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");

let gridSize = slider.value;
let option = "pen";

sliderValue.textContent = `${gridSize} x ${gridSize}`;

function createGrid() {
  container.innerHTML = "";

  const squareSize = 480 / gridSize;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-square");
    div.style.width = `${squareSize}px`;
    div.style.height = `${squareSize}px`;

    div.addEventListener("mouseover", () => {
      div.style.backgroundColor = handleEvent();
    });
    container.appendChild(div);
  }
}

function handleEvent() {
  if (option === "pen") {
    return getPenColor();
  } else if (option === "rainbow") {
    return getRandomColor();
  } else if (option === "eraser") {
    return eraser();
  } else {
    return getPenColor();
  }
}

function getPenColor() {
  return "#000";
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777216).toString(16);
}

function eraser() {
  return "#fff";
}

function resetGrid() {
  const gridSquare = document.querySelectorAll(".grid-square");
  gridSquare.forEach((square) => (square.style.backgroundColor = "#fff"));
  if (option === "eraser") {
    option = "pen";
  }
}

penBtn.addEventListener("click", () => {
  option = "pen";
});

rainbowBtn.addEventListener("click", () => {
  option = "rainbow";
});

eraserBtn.addEventListener("click", () => {
  option = "eraser";
});

resetBtn.addEventListener("click", resetGrid);

slider.addEventListener("input", () => {
  gridSize = slider.value;
  sliderValue.textContent = `${gridSize} x ${gridSize}`;
  createGrid();
});

createGrid();
