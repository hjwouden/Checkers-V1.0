//Checkers V1.0 ---model.js

//model.js for keeping track of checkers game board state

//Variables used in arrays / (validate move)
//0 = White Space, (Invalid Move)
//1 = Red Piece, (Valid Move)
//3 = Red Piece King
//2 = White Piece
//4 = White Piece King

var Num_Players; //1 or 2 player game


var black = 1;
var red = 2;
var board;
var PieceHighlighted = 0; // if a piece is highlighted will be 1, else 0 meaning nothing is selected;
var HighlightedPieceNum = -1; // the number of the piece that is highlighted, so we can refer back to it, -1 when no piece is selected;


//Array that is the layout of Starting Game
var StartBoard = [0,1,0,1,0,1,0,1,
                  1,0,1,0,1,0,1,0,
                  0,1,0,1,0,1,0,1,
                  0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,
                  2,0,2,0,2,0,2,0,
                  0,2,0,2,0,2,0,2,
                  2,0,2,0,2,0,2,0];

//Array shows all valid move locations
//   valid moves have 1. invalid 0
var ValidMove = [0,1,0,1,0,1,0,1,
                 1,0,1,0,1,0,1,0,
                 0,1,0,1,0,1,0,1,
                 1,0,1,0,1,0,1,0,
                 0,1,0,1,0,1,0,1,
                 1,0,1,0,1,0,1,0,
                 0,1,0,1,0,1,0,1,
                 1,0,1,0,1,0,1,0,];

//Sample of Game State, for showing
//draw class, delete in final//
var SampleGameState =   [0,4,0,1,0,1,0,1,
                         1,0,2,0,1,0,1,0,
                         0,0,0,0,0,1,0,1,
                         0,0,0,0,0,0,0,0,
                         0,0,0,0,0,0,0,0,
                         1,0,0,0,0,0,2,0,
                         0,0,0,0,0,0,0,2,
                         3,0,0,0,0,0,2,0];

//Array shows the current Game State
var CurrentGame = [0,1,0,1,0,1,0,1,
                   1,0,1,0,1,0,1,0,
                   0,1,0,1,0,1,0,1,
                   0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,
                   2,0,2,0,2,0,2,0,
                   0,2,0,2,0,2,0,2,
                   2,0,2,0,2,0,2,0];

//Game Board for Outnumbered Variation
var outNumberedBoard = [0,1,0,1,0,1,0,1,
                        1,0,1,0,1,0,1,0,
                        0,1,0,1,0,1,0,1,
                        0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,
                        0,2,0,2,0,2,0,2,
                        2,0,2,0,2,0,2,0];

//Game Board for Kings Battle Variation
var KingsBattleBoard = [0,3,0,3,0,3,0,3,
                        3,0,3,0,3,0,3,0,
                        0,3,0,3,0,3,0,3,
                        0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,
                        4,0,4,0,4,0,4,0,
                        0,4,0,4,0,4,0,4,
                        4,0,4,0,4,0,4,0];


//during testing using sample game state


var gameboard = document.getElementById("gameboard");
//newGame();
drawCurrentGameBoard(SampleGameState);
AnimateTitle();

CurrentGame = SampleGameState;
//function draws the starting Gameboard
function newGame(){
    var GameType = document.getElementById("gameType");
    var TypeVal = GameType.options[GameType.selectedIndex].value;
    //alert(TypeVal);
    
    if (TypeVal == "0") {
        //normal game board
    var k = 0;
    for(var i = 0; i<8; i++){
        for(var j = 0; j<8; j++){
            var cell = gameboard.rows[i].cells[j];
            if (StartBoard[k] == 1) {
                cell.className = "redPC";
            }
            else if (StartBoard[k] == 2) {
                cell.className = "whitePC";
            }
            k++;    
        }
    }
    CurrentGame = StartBoard;
    
    }//end if TypeVal == 0 normal game board
    else if (TypeVal == "1") {
        //outnumbered game board
        drawCurrentGameBoard(outNumberedBoard);
        CurrentGame = outNumberedBoard;
    }//end if TypeVal == 1 outnumbered battle
    else if (TypeVal == "2") {
        //Kings Battle Game board
        drawCurrentGameBoard(KingsBattleBoard);
        CurrentGame = KingsBattleBoard;
    }//end if TypeVal == 2 kings battle
    GameHistoryDebug();
}

function UpdateMove(){
    //1 check if move is valid
    validateMove(From, To, CurrentGame);
    //2 update current game array
    updateGameArray(From, To);
    //3 update view, change className from piece to black, and from black to piece
    drawCurrentGameBoard(CurrentGame);
}

//function takes a gameboard array, updates the view by changing cells className to correct label
function drawCurrentGameBoard(movepieces){
    var k = 0;
    for(var i = 0; i<8; i++){
        for(var j = 0; j<8; j++){
            var cell = gameboard.rows[i].cells[j];
            if (movepieces[k] == 1) {
                //piece is a red piece, set class to redPC
                cell.className = "redPC";
            }
            else if (movepieces[k] == 2) {
                //piece is a white piece, set class to whitePC
                cell.className = "whitePC";
            }
            else if (movepieces[k] == 3) {
                //piece is a red King, set class to redPCKing
                cell.className = "redPCKing";
            }
            else if (movepieces[k] == 4) {
                //piece is a white King, set class to whitePCKing
                cell.className = "whitePCKing";
            }
            else if (movepieces[k] == 0) {
                //board is empty, see if should be a white square or black.
                if (ValidMove[k] == 1) {
                    cell.className = "black";
                }
                else{
                cell.className = "white";
                }
            }
            k++;
        }
    }
}

function updateGameArray(from, to){
    //a move was made, update the array to reflect current
    // game state. take from, set to 0, put team piece in to position
    //check if they make any jumps
    //check if on back row to become a king
}

function validateMove(from, to, currentgame){
    //see if move from -> to is a valid move, not hitting pieces in current game
    //taking available jumps.
    //return error if problem.
    //if no problems and move is good return true.
}



//adding event handlers to table cells
var cells = document.getElementsByTagName("td");
var i = 0;
for(i = 0; i<64; i++)
{
   cells[i].onclick = function() {
    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;
    //var cell = gameboard.rows[row].cells[col];
    //alert("" + row + col);
    //cell.className="clickedwhitePC";
    squareClicked(row, col);
   }
} 

function squareClicked(row, col){
    var converted = (row * 8) + col;

    if (PieceHighlighted == 1) {
        //A piece is already selected, see if clicking on a move square or highlight new piece
        drawCurrentGameBoard(CurrentGame);
    }
    if (ValidMove[converted] == 0) {
        //invalid move, do nothing
    //    alert("clicked white square = " + converted );
    }
    else if (CurrentGame[converted] == 1) {
        //clicked on a red piece, highlight if first click
        var cell = gameboard.rows[row].cells[col];
        cell.className="redPCclicked";
        PieceHighlighted = 1;
        GameHistory(row, col);
        }
    else if (CurrentGame[converted] == 2) {
        //clicked on a white piece, highlight if first click
        var cell = gameboard.rows[row].cells[col];
        cell.className="whitePCclicked";
        PieceHighlighted = 1;
        GameHistory(row, col);
    }
    else if (CurrentGame[converted] == 3) {
        //clicked on a white piece, highlight if first click
        var cell = gameboard.rows[row].cells[col];
        cell.className="redPCKingclicked";
        PieceHighlighted = 1;
        GameHistory(row, col);
    }
    else if (CurrentGame[converted] == 4) {
        //clicked on a white piece, highlight if first click
        var cell = gameboard.rows[row].cells[col];
        cell.className="whitePCKingclicked";
        PieceHighlighted = 1;
        GameHistory(row, col);
    }
     
}
function GameHistoryDebug(){
    var debuginfo = document.getElementById("gameHistory");
    var Selector = document.getElementById("gameType");
    var SelectVal = Selector.options[Selector.selectedIndex].value;
    var NameVal = document.getElementById("name").value;
    debuginfo.innerHTML="Game Val: " + SelectVal + "  Name: " + NameVal;
    //debuginfo.innerHTML= "Test";
}
function GameHistory(row, col){
    var paragraph = document.getElementById("gameHistory");
    paragraph.innerHTML="Selected = row: " + row + " col: " + col;
}

var Title = document.getElementById("TitleDiv");
var value = 10;
var colorSelect = 0;
function AnimateTitle(){
    var interval = setInterval(moveTitle, 150);
    setTimeout(function(){ clearInterval(interval); }, 10000);
    
}

function moveTitle(){
        value += 5;
        Title.style.left = value + "px";
        if (colorSelect == 0) {
            Title.style.color = "red";
            colorSelect++;
        }
        else
        {
            Title.style.color = "black";
            Title.style.left = (value-20) + "px";
            colorSelect--;
        }
    }