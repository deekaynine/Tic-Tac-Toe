function Player(name, marker){
    this.name = name;
    this.marker = marker;

    Player.prototype.makeChoice =  function(){
        return parseInt(prompt("Select a location to mark on the board(1-9)")) - 1
    }
}

const createBoard = function(){
    let board = ["-", "-", "-",
                 "-", "-", "-",
                 "-", "-", "-"]

    function markBoard(position, mark){
        board[position] = mark
    }

    function resetBoard(){
        board = ["-", "-", "-",
                "-", "-", "-",
                "-", "-", "-"]
    }
    
    return { board, markBoard, resetBoard}
}

const createGameLogic = function(){
    let isGameActive = true;
    let currentPlayer;

    const winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function startGame(){
        this.isGameActive = true
    }

    function endGame(){
        this.isGameActive = false
    }

   function setCurrentPlayer(player){
        this.currentPlayer = player
   }

    function checkForWin(board){
        winning_combinations.forEach((pattern, i)=>{
            let [first,second,third] = pattern[i]
            if(board[first] === board[second] === board[third]){
                return true
            }
            return false
        })
    }

    function checkForTie(board){
        board.forEach((tile)=>{
            if(tile === "-"){
                return false
            }
        })
        return true;
    }

    return {startGame, endGame, setCurrentPlayer, checkForTie, checkForWin, isGameActive, currentPlayer}
    }


let gameBoard = createBoard()
let gameLogic = createGameLogic()
let player1 = new Player('Mark', 'X')
let player2 = new Player ('Marcus','O')
let testLogic = createGameLogic()


gameLogic.startGame()
console.log(gameLogic.currentPlayer)
gameLogic.setCurrentPlayer(player1)
console.log(gameLogic.currentPlayer)

while(gameLogic.isGameActive){
    let currentPlayer = gameLogic.currentPlayer
    let placeToMark = currentPlayer.makeChoice()
    gameBoard.markBoard(placeToMark, currentPlayer.marker)
    if(gameBoard.checkForWin(gameBoard)){
        gameLogic.endGame()
        console.log(`${currentPlayer.name}  wins!`)
        console.log(gameBoard.board)
        break
    }
    if(gameBoard.checkForTie(gameBoard)){
        gameLogic.endGame()
        console.log(`It's a tie!`)
        console.log(gameBoard.board)
        break
    }
    if(currentPlayer === player1){
        gameLogic.setCurrentPlayer(player2)
    }else{
        gameLogic.setCurrentPlayer(player1)
    }
    console.log(currentPlayer)
    console.log(gameBoard.board)
}









/*
1. Create gameboard
2. Create game logic 
3. Create 2 players 
4. Start game and decide who goes first based on Math.random function in game logic 
5. Ask for players input on where in the array they want to choose from (range:0 - arr.length-1)
6. Fill that index with the player's marker
7. Make checks to see if ther are 3 in row 
8. If not, move on to player 2 and repeat
9. If there 3 in a row, increase player score by one and ask if players want to end game or not
*/