//Checkers V1.0 ---model.js

//model.js for keeping track of checkers game board state

//Variables used in arrays / (validate move)
//0 = White Space, (Invalid Move)
//1 = Red Piece, (Valid Move)
//3 = Red Piece King
//2 = White Piece
//4 = White Piece King

//var Num_Players; //1 or 2 player game
//var Player turn = 1; //== 1 or 2 for reds or whites, allows you to click highlight those pieces and move them.

//somewhere move piece function needs to check if the piece is on the back row to make it a king,

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
// this function should call somehting in the the view because it sets the view up. 
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


//adding event handlers to table cells
var cells = document.getElementsByTagName("td");
var i = 0;
for(i = 0; i<64; i++)
{
   cells[i].onclick = function() {
    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;
    squareClicked(row, col);
   }
} 
var PlayerTurn = 0; // 0 for white, 1 for red
var lastclickedPiece = -1;
var lastclickedPosition = -1;
var PieceHighlighted = 0; // if a piece is highlighted will be 1, else 0 meaning nothing is selected;
var HighlightedPieceNum = -1; // the number of the piece that is highlighted, so we can refer back to it, -1 when no piece is selected;

function ChangeTurn(){
    if (PlayerTurn == 0) {
        PlayerTurn = 1;
    }
    else{
        PlayerTurn = 0;
    }
}
function MovePiece(from, to){
    // move the piece.
    CurrentGame[to] = lastclickedPiece;
    CurrentGame[from] = 0;
    //reset the variables
    PieceHighlighted = 0;
    lastclickedPiece = -1;
    lastclickedPosition = -1;
    //Draw the new board
    drawCurrentGameBoard(CurrentGame);
    changeTurn();
}
function InvalidMove(){
    //move was not valid, reset variables and re-draw board
   // alert("invalid move");
    lastclickedPiece = -1;
    lastclickedPosition = -1;
    PieceHighlighted = 0;
    drawCurrentGameBoard(CurrentGame);
}

// Click Event Handler for Checkerboard. Takes the row and col in the table that was clicked.
function squareClicked(row, col){
    var converted = (row * 8) + col;

    if (PieceHighlighted == 1) {  // a piece is selected, check if moving, jumping, or highlight new piece
        
        if (ValidMove[converted] && (CurrentGame[converted] == 0)) { // square is black & open, validate move.
           
           if (lastclickedPiece == 1) { //Red Piece, can move +7 | +9
                if ((converted-lastclickedPosition) == 7 || (converted-lastclickedPosition) == 9){
                    MovePiece(lastclickedPosition, converted);
                }
                else{ //not next to us, is it a jump?
                    if ((converted-lastclickedPosition) == 14){
                        if ( ((CurrentGame[converted - 7]) == 2) || (CurrentGame[converted -7] == 4) ) {
                            JumpedPiece(converted -7);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else if ((converted-lastclickedPosition) == 18) {
                        if ( ((CurrentGame[converted - 9]) == 2) || (CurrentGame[converted -9] == 4) ) {
                            JumpedPiece(converted -9);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else{ // was not a jump, or next to us, invalid move.
                    InvalidMove(); // invalid move, pass invalid move string of who we are for better feedback in console
                    }
                }
            }//endif Red Piece.
            
           if (lastclickedPiece == 2) { //White Piece, can move either -7 | -9
                if ((converted-lastclickedPosition) == -7 || (converted-lastclickedPosition) == -9){
                    MovePiece(lastclickedPosition, converted);
                }
                // check to see if we are jumping
                else{ //not next to us, is it a jump?
                    if ((converted-lastclickedPosition) == -14){
                        if ( ((CurrentGame[converted + 7]) == 1) || (CurrentGame[converted  + 7] == 3) ) {
                            JumpedPiece(converted +7);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else if ((converted-lastclickedPosition) == -18) {
                        if ( ((CurrentGame[converted + 9]) == 1) || (CurrentGame[converted  + 9] == 3) ) {
                            JumpedPiece(converted +9);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else{ //was not a jump, or next to us, invalid move.
                    InvalidMove();
                    }
                }
            }//endif White Piece
            
           if (lastclickedPiece == 3) { //Red King Piece, can move all directions.
                if ((converted-lastclickedPosition) == -7 || (converted-lastclickedPosition) == -9 || (converted-lastclickedPosition) == 7 || (converted-lastclickedPosition) == 9){
                    MovePiece(lastclickedPosition, converted);
                }
                else{
                    if ((converted-lastclickedPosition) == 14){
                        if ( ((CurrentGame[converted - 7]) == 2) || (CurrentGame[converted -7] == 4) ) {
                            JumpedPiece(converted -7);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else if ((converted-lastclickedPosition) == 18) {
                        if ( ((CurrentGame[converted - 9]) == 2) || (CurrentGame[converted -9] == 4) ) {
                            JumpedPiece(converted -9);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else if ((converted-lastclickedPosition) == -14){
                        if ( ((CurrentGame[converted + 7]) == 2) || (CurrentGame[converted  + 7] == 4) ) {
                            JumpedPiece(converted + 7);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else if ((converted-lastclickedPosition) == -18) {
                        if ( ((CurrentGame[converted + 9]) == 2) || (CurrentGame[converted  + 9] == 4) ) {
                            JumpedPiece(converted +9);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else{ // was not a jump, or next to us, invalid move
                    InvalidMove();
                    }
                }
           } //endif Red King Piece
           
           if (lastclickedPiece == 4) { //White King Piece, can move all directions.
                if ((converted-lastclickedPosition) == -7 || (converted-lastclickedPosition) == -9 || (converted-lastclickedPosition) == 7 || (converted-lastclickedPosition) == 9){
                    MovePiece(lastclickedPosition, converted);
                }
                else{
                    if ((converted-lastclickedPosition) == 14){
                        if ( ((CurrentGame[converted - 7]) == 1) || (CurrentGame[converted -7] == 3) ) {
                            JumpedPiece(converted -7);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else if ((converted-lastclickedPosition) == 18) {
                        if ( ((CurrentGame[converted - 9]) == 1) || (CurrentGame[converted -9] == 3) ) {
                            JumpedPiece(converted -9);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else if ((converted-lastclickedPosition) == -14){
                        if ( ((CurrentGame[converted + 7]) == 1) || (CurrentGame[converted  + 7] == 3) ) {
                            JumpedPiece(converted + 7);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else if ((converted-lastclickedPosition) == -18) {
                        if ( ((CurrentGame[converted + 9]) == 1) || (CurrentGame[converted  + 9] == 3) ) {
                            JumpedPiece(converted + 9);
                            MovePiece(lastclickedPosition, converted);
                        }
                        else{InvalidMove();}
                    }
                    else{
                    InvalidMove();
                    }
                }
           }
        } //endif White King Piece
        
        else{ //some other reason
            InvalidMove();
        }
        
    } //endif A piece was already highlighted.


    else { // a piece is not highlighted, highlight a piece you want to move.
        
    if (ValidMove[converted] == 0) {
        //invalid move, do nothing, clicked either white or empty square
    //    alert("clicked white square = " + converted );
    }

// first click on a piece, find out which piece and make it look highlighted.
    else if (CurrentGame[converted] == 1) {
        //clicked on a red piece, highlight if first click
        var cell = gameboard.rows[row].cells[col];
        cell.className="redPCclicked";
        PieceHighlighted = 1;
        GameHistory(row, col);
        //may first want to make sure that the last clicked var is free.
        lastclickedPiece = CurrentGame[converted];
        lastclickedPosition = converted;
        }


    else if (CurrentGame[converted] == 2) {
        //clicked on a white piece, highlight if first click
        var cell = gameboard.rows[row].cells[col];
        cell.className="whitePCclicked";
        PieceHighlighted = 1;
        GameHistory(row, col);
        lastclickedPiece = CurrentGame[converted];
        lastclickedPosition = converted;
    }


    else if (CurrentGame[converted] == 3) {
        //clicked on a white piece, highlight if first click
        var cell = gameboard.rows[row].cells[col];
        cell.className="redPCKingclicked";
        PieceHighlighted = 1;
        GameHistory(row, col);
        lastclickedPiece = CurrentGame[converted];
        lastclickedPosition = converted;
    }


    else if (CurrentGame[converted] == 4) {
        //clicked on a white piece, highlight if first click
        var cell = gameboard.rows[row].cells[col];
        cell.className="whitePCKingclicked";
        PieceHighlighted = 1;
        GameHistory(row, col);
        lastclickedPiece = CurrentGame[converted];
        lastclickedPosition = converted;
    }
   } // end else
}


function JumpedPiece(position){
    CurrentGame[position] = 0;
    // will also decrement the total number of pieces and check to see if the game is over. record the lost piece in game history.
}

// this should be part of the view as well, the game hisroty is visible, 
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