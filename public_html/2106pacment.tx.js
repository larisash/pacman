
function draw(br, parentDiv){
   var div = document.createElement("div");
   div.style.height = (br.point3.y - br.point1.y) + 'px';
   div.style.width = (br.point2.x - br.point1.x) + 'px';
   parentDiv.appendChild(div); 
}
