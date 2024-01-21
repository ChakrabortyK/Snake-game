// Import functions from the "snake.js" and "grid.js" modules
import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

// Initial food position and expansion rate
let food = getRandomFoodPosition();
let EXPANSION_RATE = 1;

// Function to draw the food on the game board
export function drawFood(gameBoard) {
  // Create a new div element for the food
  const foodElement = document.createElement("div");

  // Set the grid row and column for the food based on its position
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;

  // Add the "food" class to the food element for styling
  foodElement.classList.add("food");

  // Append the food element to the game board
  gameBoard.appendChild(foodElement);
}

// Function to update the food position and check for collision with the snake
export function updateFood() {
  // Check if the snake is on the current food position
  if (onSnake(food)) {
    // If true, expand the snake and get a new random food position
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

// Function to get a random position for the food that is not on the snake
function getRandomFoodPosition() {
  let newFoodPosition;

  // Keep generating a new position until it is not on the snake
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition;
}
