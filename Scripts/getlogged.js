//getlogged.js

getLogged();
            
function getLogged() {
     if (localStorage.getItem("cs2550timestamp") == "") {
        //do nothing
     }
     else{
         document.getElementById("loggedAS").innerHTML = localStorage.getItem("cs2550timestamp"); 
     }
}
            
function clearStorage(){
   localStorage.setItem("cs2550timestamp", "");
    document.getElementById("loggedAS").innerHTML = "Log in on the description page!";
} 
