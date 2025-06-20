// DOM Elements
const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");
const resetBtn = document.querySelector("#reset");

const screenYou = document.querySelector("#you-screen");
const screenComputer = document.querySelector("#comp-screen");

const scoreYou = document.querySelector("#you-score");
const scoreComputer = document.querySelector("#comp-score");

const message = document.querySelector("#message");
const popup = document.querySelector(".popup");
const popupHeading = document.querySelector("#popup-heading");

// Game State
let yourScore = 0;
let compScore = 0;

// Image Paths 
const IMAGES = {
    rock: "rock.png",
    paper: "paper.png",
    scissors: "scissors.png"
};

// Initialize the game
function initGame() {
    yourScore = 0;
    compScore = 0;
    scoreYou.textContent = "0";
    scoreComputer.textContent = "0";
    message.textContent = "Let's Start!";
    screenYou.innerHTML = "";
    screenComputer.innerHTML = "";
    popup.classList.remove("open");
}

// Human Choice Handlers
function handleChoice(choice) {
    screenYou.innerHTML = `<img src="${IMAGES[choice.toLowerCase()]}" alt="${choice}">`;
    const computerChoice = getComputerChoice();
    const result = playRound(choice, computerChoice);
    updateGame(result);
}

// Event Listeners
rockBtn.addEventListener("click", () => handleChoice("Rock"));
paperBtn.addEventListener("click", () => handleChoice("Paper"));
scissorsBtn.addEventListener("click", () => handleChoice("Scissors"));
resetBtn.addEventListener("click", initGame);

// Computer Random Choice
function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];

    // Update computer screen
    screenComputer.innerHTML = `<img src="${IMAGES[randomChoice.toLowerCase()]}" alt="${randomChoice}">`;

    return randomChoice;
}

// Game Logic
function playRound(humanChoice, computerChoice) {
    // Normalize to lowercase for comparison
    const human = humanChoice.toLowerCase();
    const computer = computerChoice.toLowerCase();

    // Tie condition
    if (human === computer) {
        return { message: "It's a tie!", winner: "none" };
    }

    // Win conditions
    const winConditions = {
        rock: { beats: "scissors", message: "Rock crushes Scissors" },
        paper: { beats: "rock", message: "Paper covers Rock" },
        scissors: { beats: "paper", message: "Scissors cut Paper" }
    };

    if (winConditions[human].beats === computer) {
        return {
            message: `You Win! ${winConditions[human].message}`,
            winner: "player"
        };
    } else {
        return {
            message: `You Lose! ${winConditions[computer].message}`,
            winner: "computer"
        };
    }
}

// Update Game State
function updateGame(result) {
    // Update message
    message.textContent = result.message;

    // Update scores
    if (result.winner === "player") {
        yourScore++;
        scoreYou.textContent = yourScore;
    } else if (result.winner === "computer") {
        compScore++;
        scoreComputer.textContent = compScore;
    }

    // Check for game winner (best of 5)
    if (yourScore >= 5 || compScore >= 5) {
        declareWinner();
    }
}

// Declare Final Winner
function declareWinner() {
    if (yourScore > compScore) {
        popupHeading.textContent = `Congratulations! You Win ${yourScore}-${compScore}`;
    } else {
        popupHeading.textContent = `Computer Wins ${compScore}-${yourScore}`;
    }

    popup.classList.add("open");
}

// Initialize the game when loaded
initGame();