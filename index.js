const rock = "rock";
const paper = "paper";
const scissors = "scissors";
const games = 5;

function playRound(playerSelection, computerSelection) {
  const playerLCase = playerSelection.toLowerCase();

  if (playerLCase === computerSelection) {
    return `it's a draw`;
  }

  if (
    (playerLCase === rock && computerSelection === scissors) ||
    (playerLCase === scissors && computerSelection === paper) ||
    (playerLCase === paper && computerSelection === rock)
  ) {
    return `you win ${playerLCase} beats ${computerSelection}`;
  }
  return `you lose ${computerSelection} beats ${playerLCase}`;
}

function getComputerChoice() {
  const options = [rock, paper, scissors];
  return options[Math.floor(1 + Math.random() * 3) - 1];
}

function game() {
  let player = 0;
  let computer = 0;

  for (let i = 0; i < games; i++) {
    const getInput = prompt("Enter: ");
    const computerSelection = getComputerChoice();

    const game = playRound(getInput, computerSelection);

    if (game.includes("win")) {
      player++;
    }

    if (game.includes("lose")) {
      computer++;
    }
  }
  console.log(`Player: ${player}, Computer: ${computer}`);
}

game();
