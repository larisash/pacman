
var btn = document.createElement("btn");
btn.className = "btn";
btn.innerHTML ="player 1";


btn.onclick = function(){
    MoveLeft(this);
    };  
    
var btndiv = document.getElementById("btndiv");
btndiv.appendChild(btn);

var btn2 = document.createElement("btn2");
btn2.className = "btn2";
btn2.innerHTML = "player 2";
btn2.onclick = function(){
     
   MoveLeft(this);
};
 
var btndiv = document.getElementById("btndiv2");
btndiv2.appendChild(btn2);

function MoveLeft(btn){
   alert(btn.style.left);
   if (btn.style.left.indexOf("px") > -1 ){
    var corLeft = btn.style.left.substr(0,btn.style.left.indexOf("px"))*1;
    var ran= Math.random()*100;
    btn.style.left = (corLeft + ran) + 'px';
   }
   else{
   btn.style.left = "20px";
   }
};





