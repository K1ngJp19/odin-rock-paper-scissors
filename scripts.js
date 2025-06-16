// Computer Random Choice
function getComputerChoice() {
    const answer = ["Rock", "Paper", "Scissors"];
    const randomAnswer = Math.floor(Math.random() * answer.length);
    return answer[randomAnswer].toLowerCase();
}

// Human Choice
function getHumanChoice() {
    return prompt("Enter your choice: [rock, paper, scissors]").toLowerCase();
}

// Play Game Logic
function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    // Show score each round
    function determineWinner(message, humanScore, computerScore) {
        const winner = `${message}Player\t: ${humanScore} \nComputer\t: ${computerScore}`;
        alert(winner);
    }

    // One round logic
    function playRound(human, computer) {
        // Tie
        if (human === computer) return "It's a tie!";

        let result = "";

        // Logic
        if (human === "rock") {
            if (computer === "paper") {
                computerScore++;
                result = "You Lose! Paper beats Rock";
            } else if (computer === "scissors") {
                humanScore++;
                result = "You Win! Rock beats Scissors";
            }
        } else if (human === "paper") {
            if (computer === "rock") {
                humanScore++;
                result = "You Win! Paper beats Rock";
            } else if (computer === "scissors") {
                computerScore++;
                result = "You Lose! Scissors beats Paper";
            }
        } else if (human === "scissors") {
            if (computer === "rock") {
                computerScore++;
                result = "You Lose! Rock beats Scissors";
            } else if (computer === "paper") {
                humanScore++;
                result = "You Win! Scissors beats Paper";
            }
        } else {
            result = "Invalid Input";
        }

        return result;
    }

    // Play 5 rounds
    for (let i = 1; i <= 5; i++) {
        const human = getHumanChoice();
        const computer = getComputerChoice();
        const result = playRound(human, computer);

        alert(`Round ${i}:\nPlayer: ${human}\nComputer: ${computer}\nResult: ${result}`);
        determineWinner(`Round ${i}:\n`, humanScore, computerScore);
    }

    // Final Result
    let winnerMessage;
    if (humanScore > computerScore) {
        winnerMessage = "Congratulations! You win the game!\n";
    } else if (humanScore < computerScore) {
        winnerMessage = "Better Luck Next Time! You lose the game!\n";
    } else {
        winnerMessage = "It's a tie game!\n";
    }

    determineWinner(winnerMessage, humanScore, computerScore);
}

playGame();
