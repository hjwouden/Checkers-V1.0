//Checkers V1.0 ---login.js

function login(){
    var username;
    var pass;
    
    username = document.getElementById("usrname").value;
    pass = document.getElementById("pwd").value;

    var status = document.getElementById("loginStatus");
    
    if (username == "" && pass == "") {
        
        status.innerHTML = "Login Failed";
    }
    else{
        var ajax = getXMLHttpRequestObject();
        if (ajax) {
            var data = 'userName=' + username + '&password=' + pass;
           
            ajax.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.send(data);
            
            if (ajax.status == 200) {
                var responseJson = JSON.parse(ajax.responseText);
                if (responseJson["result"] == "invalid") {
                    //invalid login
                    status.innerHTML = "Failed invalid Login" 
                }
               else{
                status.innerHTML = "Success: " + responseJson["userName"] + " " + responseJson["timestamp"];
                var store = "Success: " + responseJson["userName"] + " " + responseJson["timestamp"];
                //alert(store);
                localStorage.setItem("cs2550timestamp", store);
               // alert(localStorage.getItem("cs2550timestamp"));
                //if correct, save in storage then take to game page,
                parent.location='main.html'
               }
            }
           
        }
    }
}

function getXMLHttpRequestObject(){
    var ajax = null;
        
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            //Older IE.
            ajax = new ActiveXObject('MSXML2.XMLHTTP.3.0');
        }
    return ajax;
}