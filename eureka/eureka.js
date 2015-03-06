var bathY= -40;
var bathX= 450/5;

axisColour = "black";
gridColour = "black";
boardColour = "#233777";
textHeight = 16;

// Images used in the background
image1_src = "bath2.png";
image2_src = "tap - Copy.png";
image3_src = "graph.png";
image4_src = "bath.png";
imageRhino_src = "bath.png";

//DEBUG OPTION TO DISABLE IMAGES
var debug_images_enabled = true;




function loadImage(ctx,src,x,y){
  var image = new Image();
  image.src = src;
  image.onload = function(){
    ctx.drawImage(image, x, y);
 
  }
}

function drawBoard(ctx){
    
          loadImage(ctx,image1_src,bathX, bathY);
          loadImage(ctx,image3_src,10,450/2+20);
          // ctx.rect(50,50,bathX,bathY);
       //   	for (var x = 0; x <= 50; x += 1)
         

          
   
}





var main = function(){

  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");
  ctx.font=textHeight+"px Georgia";

  drawBoard(ctx);
  	ctx.fillStyle="#0000FF";
  	for (var x = 0; x <= 50; x += 1){
  		ctx.fillStyle="#0000FF";
  		ctx.fillRect(50,50,150,100);
  	}
		


}
$(document).ready(main);
