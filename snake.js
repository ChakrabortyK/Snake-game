//ALL THE COMMENTS ARE ADDED BY CHATGPT

// Importing the getInputDirection function from the input module
import { getInputDirection } from "./input.js";

// Constant representing the snake's speed
export let SNAKE_SPEED = 3; // 5 moves per second or 1 move per 0.5 seconds

// Initial positions of the snake's body segments
const snakeBodySegment = [
  { x: 11, y: 11 },
  // { x: 12, y: 11 },
];

// Variable to track the number of new segments to be added
let newSegments = 0;

// Function to draw the snake on the game board
export function drawSnake(gameBoard) {
  snakeBodySegment.forEach((segment, index) => {
    // Create a new element for each segment
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;

    // Add CSS classes based on the segment's position (head or body)
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    // Append the snake element to the game board
    gameBoard.appendChild(snakeElement);
  });
}

// Function to update the snake's position
export function updateSnake() {
  // Call the function to add new segments to the snake
  addSegments();

  // Get the direction of the user's input
  let inputDirection = getInputDirection();

  // Update the positions of the snake's body segments
  for (let i = snakeBodySegment.length - 2; i >= 0; i--) {
    snakeBodySegment[i + 1] = { ...snakeBodySegment[i] };
  }

  // Update the position of the snake's head based on the user's input direction
  snakeBodySegment[0].x += inputDirection.x;
  snakeBodySegment[0].y += inputDirection.y;

  //Increase the speed of snake every 10 segments
  // Variable to keep track of the number of snake segments
  // let snakeSegments = snakeBodySegment.length;
  // // Check if the number of segments is a multiple of 10
  // console.log("segments : " + snakeBodySegment.length);
  // if (snakeSegments % 10 === 0) {
  //   // Increase the snake speed when the condition is met
  //   increaseSnakeSpeed();
  //   console.log("inc");
  // }
}

// function increaseSnakeSpeed() {
//   // Double the current snake speed as an example
//   SNAKE_SPEED += 1;
//   // You can adjust this based on how much you want to increase the speed
// }

// Function to expand the snake by a specified amount
export function expandSnake(amount) {
  newSegments += amount;
}

// Function to check if a given position is on the snake
export function onSnake(position) {
  return snakeBodySegment.some((segment) => {
    // Check if the position matches any segment's position in the snake
    // Check if the positions are equal using the helper function
    return equalPositions(segment, position);
  });
}

// Helper function to check if two positions are equal
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Function to add new segments to the snake
function addSegments() {
  // Iterate for the number of new segments to be added
  for (let i = 0; i < newSegments; i++) {
    // Push a new segment with the same position as the last segment in the snake
    snakeBodySegment.push({ ...snakeBodySegment[snakeBodySegment.length - 1] });
  }
  // Reset the newSegments variable to 0 after adding the required segments
  newSegments = 0;
}

// Function to get the position of the snake's head
export function getSnakeHead() {
  return snakeBodySegment[0];
}

// Function to check if the snake's head has hit its body
export function hitBody() {
  return headOnBody(snakeBodySegment[0]);
}

//ignoreHead is rather a check to ask to ignore the head when iterating the body segments
function headOnBody(position) {
  return snakeBodySegment.some((segment, index) => {
    // Check if the position matches any segment's position in the snake except for the first segment (head)
    return index > 0 && equalPositions(segment, position);
  });
}
// console.log(snakeBodySegment);
