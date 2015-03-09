var bathY= -40;
var bathX= 450/5;
var tapOn = false;
var plugIn = true;
var manIn=false;
var waterLimit = -200;
var flow = false;

axisColour = "black";
gridColour = "black";
boardColour = "#233777";
textHeight = 16;
var waterChange = 0;
var showerX = 165;

var waterHeightLimit=-75;

// Images used in the background
image1_src = "bath2.png";
image3_src = "graph.png";


//DEBUG OPTION TO DISABLE IMAGES
var debug_images_enabled = true;

function  tapPressed(){
  
  if(tapOn===false){
    tapOn=true;
    
  }
  else{
    tapOn=false;
  }
}

function  plugPressed(){
  
  if(plugIn===false){
    plugIn=true; 
  }

  else{
    plugIn=false;
  }

}

function  manButtonPressed(){
  
  if(manIn===false){
    manIn=true;
  }
  else{
    manIn=false;
  }

}

function showerEffect(){
  
  if(flow===false){
    flow=true;
    showerX+=2;
  }
  else{
    flow=false;
    showerX-=2;
  }

 
}


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
  ctx.fillStyle="#66FFFF";
  for (var x = 0; x <= 50; x += 1){
    ctx.clearRect(0, 0, 450, 450);
    ctx.fillRect(150,200,180,waterChange);
  }

  if(tapOn===true && plugIn==true && waterChange != waterHeightLimit){
     waterChange -=1;
     console.log(waterChange);
   }

   if(tapOn)
    ctx.fillRect(showerX,200,5,-168);

  else if(plugIn==false && (waterChange!=0)) {
      waterChange +=1;
      console.log(waterChange);
    }

    ctx.fillStyle="#464646";
   
    if(plugIn==true)
      ctx.fillRect(160,200,15,-5);

    else
       ctx.fillRect(160,195,15,-5);


}





var main = function(){

  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");
  ctx.font=textHeight+"px Georgia";
  

  setInterval(function(){ drawBoard(ctx); }, 50);
    setInterval(function(){ showerEffect(); }, 500);

  } 
$(document).ready(main);
