
function Horse(btnId, btnTop,parentGameId) {
    this.parentDiv=parentGameId;
    this.btnId = btnId;
    this.btnTop = btnTop;
    this.btn = null;
    this.initBtn = function () {
        this.btn = document.createElement("btn");
        this.btn.className = "btn";
        this.btn.id = this.btnId;
        this.btn.innerHTML = "player " + btnId;

        this.btn.onclick = function () {
            this.startGame(this.btn);
        };
        var btndiv = document.createElement("div");
        btndiv.style.top = this.btnTop;
        
        var parentDiv = document.getElementById(this.parentDiv);
        parentDiv.appendChild(btndiv);
        btndiv.appendChild(this.btn);
        
    };

    this.startGame = function () {

        this.MoveLeft(this.btn);
    };

    
    

  this.loop = function(btn, location){
      if (btn.style.left.indexOf("px") > -1) {
                var corLeft = btn.style.left.substr(0, btn.style.left.indexOf("px")) * 1;
                var ran = Math.random()*100 ;
                btn.style.left = (corLeft + ran) + 'px';
                location = corLeft + ran;
            } else {
                btn.style.left = "20px";
                location = 20;
            }
            
            return location;
  }


    this.MoveLeft = function (btn) {
        //alert(btn.style.left);
        var lengthScreen = 2000;
       var location = 0;
        while(location < lengthScreen){
            
            setTimeout(this.loop(btn,location),1000);
            
        }
        
    };
};




var Hourse1 = null;
var Hourse2 = null;

function start(){
    Hourse1 = new Horse("btn1", "0px","gameDiv");

    Hourse2 = new Horse("btn2", "50px","gameDiv");
Hourse1.initBtn();
Hourse2.initBtn();
}



function move(){
Hourse1.startGame();
Hourse2.startGame();
}