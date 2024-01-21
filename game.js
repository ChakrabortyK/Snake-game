// Variable to track the last render time
let lastRenderTime = 0;

// Importing functions related to food, snake, and grid
import { updateFood, drawFood } from "./food.js";
import {
  SNAKE_SPEED,
  drawSnake,
  updateSnake,
  hitBody,
  getSnakeHead,
} from "./snake.js";
import { hitBoundary } from "./grid.js";

// Get the game board element
let gameBoard = document.getElementById("game-board");

// Variable to track the game state (whether the game is over or not)
let gameOver = false;

// Main game loop function
function main(currentTime) {
  // Check if the game is over
  if (gameOver) {
    // Display game over message and prompt for restart
    if (confirm("Game Over. Press Enter to restart")) {
      // Reload the page to restart the game
      window.location = "/Snake-game/";
    } else {
      // Exit the main function if the game is over
      return;
    }
  }

  // Request the next animation frame, and pass the main function as the callback
  window.requestAnimationFrame(main);

  // Calculate the time elapsed since the last frame in seconds
  // Check if it's too soon to render the next frame based on the snake speed
  if ((currentTime - lastRenderTime) / 1000 < 1 / SNAKE_SPEED) return;

  // If it's time to render,
  // Update the last render time to the current time
  lastRenderTime = currentTime;

  // Draw and update the game elements
  draw();
  update();
}

// Update function to handle game logic updates
function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

// Draw function to render game elements on the game board
function draw() {
  // Clear the game board before drawing
  gameBoard.innerHTML = "";
  // Draw the snake and food on the game board
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

// Function to check if the snake has hit a boundary or itself
export function checkDeath() {
  gameOver = hitBoundary(getSnakeHead()) || hitBody();
}

// Initially request the first animation frame to start the game loop
window.requestAnimationFrame(main);
