//tic tac toe!
let playerText = document.getElementById('playerText'); // element to display player information
let restartBtn = document.getElementById('restartBtn'); // restart button
let boxes = Array.from(document.getElementsByClassName('box')); // this simplifies the code by filtering through an array so that we don't have to call on each individual element. 

//creating variables for the "x" and "o"
const O_TEXT = "O";
const X_TEXT = "X";

//starting the game with x because x always goes first and initializing the spaces array which start off empty.
let activePlayer = X_TEXT; 
let spaces = Array(9).fill(null); //this array represents the gameboard spaces, the clickable area inside the box. 

//here is our function to start the game. We loop through the boxes array and add a click eventListener to each of the DOM elements. 
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

//function to handle a box click event
function boxClicked(e) {
    const id = e.target.id; // get the id of the clicked box

    //check if the space is empty
    if (!spaces[id]) {
        spaces[id] = activePlayer; //set the space to the active player
        e.target.innerText = activePlayer; //display the active player symbol in the box

        //check if the current player has won
        if (playerHasWon() !== false) {
            playerText.innerText = `${activePlayer} has won!`; //display the winning message
            let winning_blocks = playerHasWon(); //get the winning blocks

            console.log(winning_blocks);
        }

        //switch the active player
        if (activePlayer === X_TEXT) {
            activePlayer = O_TEXT; //if active player is X, switch to O
        } else {
            activePlayer = X_TEXT; //if active player is O, switch to X
        }
    }
}

//array of winning combinations
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//function to check if a player has won
function playerHasWon() {
    for (const condition of winningCombo) {
        let [a, b, c] = condition;

        //check if the player has the same symbol in the winning combination
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]; //return the winning combination
        }
    }
    return false; //return false if no player has won
}

//add a click event listener to the restart button
restartBtn.addEventListener('click', restart);

//function to restart the game
function restart() {
    spaces.fill(null); //reset all spaces to empty

    boxes.forEach(box => {
        box.innerText = ''; //clear the content of each box
    });

    playerText = 'Tic Tac Toe'; //reset the player text

    activePlayer = X_TEXT; //reset the active player to X
}

//start the game!
startGame();
