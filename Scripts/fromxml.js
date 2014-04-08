//Checkers V1.0 ---fromxml.js

//fromxml.js
// Special Thanks to: teacher provided code
// credit: http://universe.tc.uvu.edu/cs2550/assignments/XML/addresses.js

getHighScores();

function getHighScores(){
    var request = new XMLHttpRequest();
    request.open("GET", "savedgame.xml", false);
    request.send(null);
    
    var scoresp = document.getElementById("scores");
    var xmldoc = request.responseXML;
    var xmlrows = xmldoc.getElementsByTagName("high");
    var text = "";
    for(var r = 0; r <xmlrows.length; r++) {
        var xmlrow = xmlrows[r];
        text += xmlrow.getAttribute("position") + ".";
        
        var player = xmlrow.getElementsByTagName("player")[0];
        text += player.firstChild.data;
        
        var time = xmlrow.getElementsByTagName("time")[0];
        text += "...............Time: " + time.firstChild.data;
        text += "<br>"
    }
    scoresp.innerHTML = text;
}