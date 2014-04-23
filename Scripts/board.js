//board.js

//Javascript creates table elements and draws original game elements, updated by model.js
//

var BLACKorWHITE = 1;
    
var SqNum = 0;

    function tableCreate(TblHeight,TblWidth)
    {
        var body=document.getElementsByTagName('body')[0];
        var tbl=document.createElement('table');
        tbl.id = "gameboard";
        var tbdy=document.createElement('tbody');
        
        for(var i=0;i<TblHeight;i++)
        {
            var tr=document.createElement('tr');
            for(var j=0;j<TblWidth;j++)
            {
                if (i%2)
                {
                    if (BLACKorWHITE == 0)
                    {
                        var td=document.createElement('td');
                        td.id=SqNum++;
                        td.className="white";
                        tr.appendChild(td)
                        BLACKorWHITE = 1;
                    }
                    else
                    {
                        var td=document.createElement('td');
                        if (i <= 2) {
                            td.id=SqNum++;
                            td.className="black";
                        }
                        else if (i >= 5) {

                            td.id = SqNum++;
                            td.className="black";
                        }
                        else
                        {
                            td.id = SqNum++;
                            td.className="black";
                        }
                        tr.appendChild(td)
                        BLACKorWHITE = 0;
                    }
                }
                else
                {
                    if (BLACKorWHITE == 0)
                    {
                        var td=document.createElement('td');
                        if (i <= 2) {
                            td.id = SqNum++;
                            td.className="black";
                        }
                        else if (i >= 5) {
                            td.id = SqNum++;
                            td.className="black";
                        }
                        else
                        {
                            td.id = SqNum++;
                            td.className="black";
                        }
                        tr.appendChild(td)
                        BLACKorWHITE = 1;
                    }
                    else
                    {
                        var td=document.createElement('td');
                       td.id = SqNum++;
                       td.className="white";
                        tr.appendChild(td)
                        BLACKorWHITE = 0;
                    }       
                }        
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        body.appendChild(tbl)
    }
document.createElement = tableCreate(8,8);



//function takes a gameboard array, updates the view by changing cells className to correct label // part of the view
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

/* Don't Include in final Project
AnimateTitle();

//move the the view.
var Title = document.getElementById("TitleDiv");
var value = 10;
var colorSelect = 0;
function AnimateTitle(){
    var interval = setInterval(moveTitle, 150);
    setTimeout(function(){ clearInterval(interval); }, 10000);
    
}
//move to the view
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

*/


// this should be part of the view as well, the game history is visible, 
function GameHistoryDebug(){
    var debuginfo = document.getElementById("gameHistory");
    var Selector = document.getElementById("gameType");
    var SelectVal = Selector.options[Selector.selectedIndex].value;
    var NameVal = document.getElementById("name").value;
    debuginfo.innerHTML="Game Val: " + SelectVal + "  Name: " + NameVal;
    //debuginfo.innerHTML= "Test";
}
function GameHistory(row, col){
    var temp = "(" + (row+1);
    temp += "," + (col+1) + ")";
    GameHistoryUpdate("Selected = " + temp);
}
function GameHistoryUpdate(message)
{
    var paragraph = document.getElementById("gameHistory");
    var temp = paragraph.innerHTML;
    message += "<br>" + temp;
    paragraph.innerHTML = message;
}
