//Checkers V1.0 ---model.js
//model.js for keeping track of checkers game board state

//Variables used in arrays / (validate move)
//0 = White Space, (Invalid Move)
//1 = Red Piece, (Valid Move)
//3 = Red Piece King
//2 = White Piece
//4 = White Piece King

//////////////////////////////////////////////////////////////
////////////////Board Arrays//////////////////////////////////

function getStartBoard(){
    var StartBoard = [0,1,0,1,0,1,0,1,
                      1,0,1,0,1,0,1,0,
                      0,1,0,1,0,1,0,1,
                      0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,
                      2,0,2,0,2,0,2,0,
                      0,2,0,2,0,2,0,2,
                      2,0,2,0,2,0,2,0];
    return StartBoard;
}

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

//Array shows the current Game State
var CurrentGame = [0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0];

function getOutNumberedBoard() {
var outNumberedBoard = [0,1,0,1,0,1,0,1,
                        1,0,1,0,1,0,1,0,
                        0,1,0,1,0,1,0,1,
                        0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,
                        0,2,0,2,0,2,0,2,
                        2,0,2,0,2,0,2,0];
    return outNumberedBoard;
}

function getKingsBattleBoard(){
var KingsBattleBoard = [0,3,0,3,0,3,0,3,
                        3,0,3,0,3,0,3,0,
                        0,3,0,3,0,3,0,3,
                        0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,
                        4,0,4,0,4,0,4,0,
                        0,4,0,4,0,4,0,4,
                        4,0,4,0,4,0,4,0];
    return KingsBattleBoard;
}
////////////////End Board Arrays///////////////////////////////
///////////////////////////////////////////////////////////////

newGame();

function newGame(){  // checks game variations, sets up new game board
    var GameType = document.getElementById("gameType");
    var TypeVal = GameType.options[GameType.selectedIndex].value;
    
    if (TypeVal == "0") {
        Reset();
        drawCurrentGameBoard(getStartBoard());
        CurrentGame = getStartBoard();
        GameHistoryUpdate("Starting Checkers Game.");
    }
    else if (TypeVal == "1") { //outnumbered game board
        Reset();
        TotalWhitePieces = 8;
        drawCurrentGameBoard(getOutNumberedBoard());
        CurrentGame = getOutNumberedBoard();
        GameHistoryUpdate("Starting Out-Numbered Checkers Game.");
    }
    else if (TypeVal == "2") { //Kings Battle Game board
        Reset();
        drawCurrentGameBoard(getKingsBattleBoard());
        CurrentGame = getKingsBattleBoard();
        GameHistoryUpdate("Starting Kings Battle Checkers Game.");
    }
    var redname = document.getElementById("redName").value;
    var whitename = document.getElementById("whiteName").value;
    WhitePlayerName = whitename;
    RedPlayerName = redname;
    GameHistoryUpdate( WhitePlayerName + " goes first!");
}

//adding event handlers to table cells.
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

//variables for game.
var PlayerTurn = 0; // 0 for white, 1 for red
var lastclickedPiece = -1;
var lastclickedPosition = -1;
var PieceHighlighted = 0; // if a piece is highlighted will be 1, else 0 meaning nothing is selected;
var HighlightedPieceNum = -1; // the number of the piece that is highlighted, so we can refer back to it, -1 when no piece is selected;
var TotalRedPieces = 12;
var TotalWhitePieces = 12;
var RedPlayerName = "Red Player";
var WhitePlayerName = "White Player;"

function Reset(){
    PlayerTurn = 0;
    lastclickedPiece = -1;
    lastclickedPosition = -1;
    PieceHighlighted = 0;
    HighlightedPieceNum = -1;
    TotalRedPieces = 12;
    TotalWhitePieces = 12;
}

function ChangeTurn(){ // rotate turns each
    if (PlayerTurn == 0) {
        PlayerTurn = 1;
        GameHistoryUpdate(RedPlayerName +"'s Turn"); // make it for only a certain <p> tag
    }
    else{
        PlayerTurn = 0;
        GameHistoryUpdate(WhitePlayerName + "'s Turn");
    }
}

function CheckKingMe(){ // check to see if anyone needs to be kinged
    for(var i = 0; i<8; i++)
    {
        if (CurrentGame[i] == 2) {
            CurrentGame[i] = 4;
            kingSound.play();
            GameHistoryUpdate(WhitePlayerName + " gets Kinged!");
        }
    }
    for(var i = 56; i<65; i++)
    {
        if (CurrentGame[i] == 1) {
            CurrentGame[i] = 3;
            kingSound.play();
            GameHistoryUpdate(RedPlayerName + " gets Kinged!");
        }
    }
}//end CheckKingMe();

function MovePiece(from, to){ // move the piece.
    CurrentGame[to] = lastclickedPiece;
    CurrentGame[from] = 0;
    clickSound2.play();
    //reset the variables
    PieceHighlighted = 0;
    lastclickedPiece = -1;
    lastclickedPosition = -1;
    
    CheckKingMe();
    drawCurrentGameBoard(CurrentGame);
    ChangeTurn();
}//end MovePiece Function

function InvalidMove(){ //move was not valid, reset variables and re-draw board
    lastclickedPiece = -1;
    lastclickedPosition = -1;
    PieceHighlighted = 0;
    drawCurrentGameBoard(CurrentGame);
    GameHistoryUpdate("Invalid Move!");
    invalidSound.play();
} // end InvalidMove();

var clickSound = new Audio("Sounds/FX1.mp3"); //clickSound.play();
var clickSound2 = new Audio("Sounds/FX2.mp3");
var invalidSound = new Audio("Sounds/FXinvalid.mp3");
var winSound = new Audio("Sounds/FXwin.mp3");
var jumpSound = new Audio("Sounds/FXjump.mp3");
var kingSound = new Audio("Sounds/FXking.mp3");

function squareClicked(row, col){ // Click Eventhandler for checkerboard,
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
                    else{InvalidMove();}
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
                    else{InvalidMove();}
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
                    else{InvalidMove();}
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
                    else{InvalidMove();}
                }
           }
        } //endif White King Piece
        else{InvalidMove();}   
    } //endif A piece was already highlighted.
    
    else{ // a piece is not highlighted, highlight a piece you want to move.
        if (ValidMove[converted] == 0) { // do nothing, clicked on a white or empty square
        }
        else if (CurrentGame[converted] == 1 && PlayerTurn == 1) { // first click on a piece, find out which piece and make it look highlighted.
            //highlighting piece should be part of the view, call the function to do it over there.
            //clicked on a red piece, highlight if first click
            var cell = gameboard.rows[row].cells[col];
            cell.className="redPCclicked";
            PieceHighlighted = 1;
            GameHistory(row, col);
            //may first want to make sure that the last clicked var is free.
            lastclickedPiece = CurrentGame[converted];
            lastclickedPosition = converted;
            clickSound.play();
        }
        else if (CurrentGame[converted] == 2 && PlayerTurn == 0) {
            //clicked on a white piece, highlight if first click
            var cell = gameboard.rows[row].cells[col];
            cell.className="whitePCclicked";
            PieceHighlighted = 1;
            GameHistory(row, col);
            lastclickedPiece = CurrentGame[converted];
            lastclickedPosition = converted;
            clickSound.play();
        }
        else if (CurrentGame[converted] == 3 && PlayerTurn == 1) {
            //clicked on a white piece, highlight if first click
            var cell = gameboard.rows[row].cells[col];
            cell.className="redPCKingclicked";
            PieceHighlighted = 1;
            GameHistory(row, col);
            lastclickedPiece = CurrentGame[converted];
            lastclickedPosition = converted;
            clickSound.play();
        }
        else if (CurrentGame[converted] == 4 && PlayerTurn == 0) {
            //clicked on a white piece, highlight if first click
            var cell = gameboard.rows[row].cells[col];
            cell.className="whitePCKingclicked";
            PieceHighlighted = 1;
            GameHistory(row, col);
            lastclickedPiece = CurrentGame[converted];
            lastclickedPosition = converted;
            clickSound.play();
        }
    } // end else
} // end the Click Event Handler.

function JumpedPiece(position){
    if (CurrentGame[position] == 1 || CurrentGame[position] == 3) {
        CurrentGame[position] = 0;
        TotalRedPieces--;
        jumpSound.play();
        GameHistoryUpdate(RedPlayerName + " has " + TotalRedPieces + " pieces left");
        
        // record lost pieces in game history
    }
    else if (CurrentGame[position] == 2 || CurrentGame[position] == 4) {
        CurrentGame[position] = 0;
        TotalWhitePieces--;
        jumpSound.play();
        //record lost pieces in game history
        GameHistoryUpdate(WhitePlayerName + " has " + TotalWhitePieces + " pieces left");
    }
    if (TotalRedPieces == 0 || TotalWhitePieces == 0) {
        GameHistoryUpdate("Game Over!");
        if (TotalRedPieces == 0) {
            GameHistoryUpdate(WhitePlayerName + " Wins!");
            winSound.play();
        }
        else if (TotalWhitePieces == 0) {
            GameHistoryUpdate(RedPlayerName + " Wins!");
            winSound.play();
        }
    }
}
