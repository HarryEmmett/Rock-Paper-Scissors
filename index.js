const rock = "rock";
const paper = "paper";
const scissors = "scissors";

let roundsLeft = 5;
let playerScore = 0;
let computerScore = 0;
let draw = 0;

const allButtons = document.querySelectorAll("button");
const welcomeDiv = document.querySelector("#welcome-container");
const computerGuess = document.querySelector("#computer");
const winner = document.querySelector("#winner");
const resetButton = document.querySelector("#reset");
const topDivText = document.querySelector("#welcome-message");
const gameHistory = document.querySelector(".history");

const newTopDivText = document.createElement("p");

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

function resetGame() {
  document.body.style.background = "lightgrey";
  playerScore = 0;
  computerScore = 0;
  draw = 0;
  roundsLeft = 5;
  computerGuess.innerText = "?";
  allButtons.forEach((btn) =>
    btn.id === "reset" ? (btn.disabled = true) : (btn.disabled = false)
  );
  while (gameHistory.firstChild) {
    gameHistory.removeChild(gameHistory.firstChild);
  }
  newTopDivText.innerText = `Welcome, select an option to begin!`;
  welcomeDiv.appendChild(newTopDivText);
}

allButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.value === "reset") {
      resetGame();
    } else {
      const computerSelection = getComputerChoice();
      const game = playRound(e.target.value, computerSelection);
      const roundWinner = document.createElement("p");

      if (game.includes("win")) {
        playerScore++;
        document.body.style.background = "rgba(76, 175, 80, 0.9)";
        roundWinner.innerText = `Win ${e.target.value} beats ${computerSelection}`;
      }

      if (game.includes("lose")) {
        computerScore++;
        document.body.style.background = "rgb(255, 51, 0, 0.8)";
        roundWinner.innerText = `Loss ${computerSelection} beats ${e.target.value}`;
      }

      if (game.includes("draw")) {
        draw++;
        document.body.style.background = "lightgrey";
        roundWinner.innerText = "Draw!";
      }
      
      computerGuess.innerHTML = computerSelection;
      topDivText.remove();
      newTopDivText.innerText = `Attempts: ${roundsLeft} Score: Player: ${playerScore}, Computer: ${computerScore}, Draw: ${draw}`;

      welcomeDiv.appendChild(newTopDivText);

      gameHistory.appendChild(roundWinner);

      console.log(
        `Player: ${playerScore}, Computer: ${computerScore}, Draw: ${draw}`
      );

      roundsLeft--;

      if (roundsLeft === 0) {
        newTopDivText.innerText = `Final scores - You: ${playerScore}, Computer: ${computerScore}.`;
        allButtons.forEach((btn) =>
          btn.id === "reset" ? (btn.disabled = false) : (btn.disabled = true)
        );
        return;
      }
    }
  });
});
