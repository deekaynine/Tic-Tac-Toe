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

const createGameLogic = function(board){
    let isGameActive = true;
    let currentPlayer;
    let gameBoard = board

   

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

    function checkForWin(){
        let board = this.gameBoard.board
        let winCheck;
        for(let i=0; i < winning_combinations.length; i++){
            let marker = this.currentPlayer.marker
            let [first,second,third] = winning_combinations[i]
            if(board[first] === marker && board[second] === marker && board[third] === marker){
                console.log("a match")
                winCheck = true
                break;
            } 
            winCheck = false
        }
            
            winCheck ? console.log("Match Found!") : console.log("Match not Found Yet.")
            return winCheck
    }

    function checkForTie(){
        let board = this.gameBoard.board
        let tieCheck = true;
        for(let i=0; i<board.length; i++){
            if(board[i] === "-"){
                tieCheck = false
                console.log("nope")
                break;
            }
        }
        tieCheck ? console.log("Tie") : console.log("Game not over")
        return tieCheck
        
    }

    return {startGame, endGame, setCurrentPlayer, checkForTie, checkForWin, isGameActive, currentPlayer, gameBoard, }
    }


let gameBoard = createBoard()
let gameLogic = createGameLogic(gameBoard)
let player1 = new Player('Mark', 'X')
let player2 = new Player ('Marcus','O')

gameLogic.setCurrentPlayer(player1)
gameLogic.startGame()

while(gameLogic.isGameActive){
    let currentPlayer = gameLogic.currentPlayer
    let gameBoard = gameLogic.gameBoard
    let placeToMark = currentPlayer.makeChoice()
    if(gameBoard.board[placeToMark] !== "-"){
        while(gameBoard.board[placeToMark] !== "-"){

            alert("Choose an empty tile.")
            placeToMark = currentPlayer.makeChoice()
        }
    }
    gameBoard.markBoard(placeToMark, currentPlayer.marker)
    console.log(gameBoard.board)

    if(gameLogic.checkForWin()){
        gameLogic.endGame()
        console.log(`${currentPlayer.name}  wins!`)
    }

    if(gameLogic.checkForTie()){
        gameLogic.endGame()
        console.log(`It's a tie!`)
    }


    if(currentPlayer === player1){
        gameLogic.setCurrentPlayer(player2)
        console.log(`${gameLogic.currentPlayer.name}'s turn`)
    }
    
    else{
        gameLogic.setCurrentPlayer(player1)
        console.log(gameLogic.currentPlayer)
    }
    
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