var bathY= -40;
var bathX= 450/8;
var tapOn = false;
var plugIn = true;
var manIn=false;
var waterLimit = -200;
var flow = false;
var noOfGraphpoints = 0;
var manY=-245;
var graphStart=false;
textHeight = 16;
var waterLevel = 0;
var showerX = bathX+58;
var waterHeightLimit=-76;

// Images used.
bathImage = "WideBath.png";
graphImage = "graph3.png";
manImage = "man2.png";

//Function which controls the TapOn boolean.
//Activated when the 'Tap' Button is pressed.
function  tapPressed(){
  
  graphStart=true;        //used to begin graph

  if(tapOn===false){
    tapOn=true;
  }

  else{
    tapOn=false;
  }
}

//Function which controls the PlugIn boolean.
//Activated when the 'Plug' Button is pressed.
function  plugPressed(){
  
  if(plugIn===false){
    plugIn=true; 
  }

  else{
    plugIn=false;
  }
}

//Function which controls the man to get in/out of the bath.
//Activated when the 'Man' Button is pressed.
function  manButtonPressed(){
  
  if(manIn===false){
    manIn=true;
  }
  else{
    manIn=false;
  }
}

//A Function which gives the water coming from the shower a swaying effect.

function showerEffect(ctx){
  
  if(flow===false){
    flow=true;
    showerX+=2;
  }
  else{
    flow=false;
    showerX-=2;
  } 
}

//A Function which loads the bath/graph/man images and draws them onto the canvas.
function loadImage(ctx,src,x,y){
  var image = new Image();
  image.src = src;
  image.onload = function(){
    ctx.drawImage(image, x, y);
  }
}




//A function which is called periodically, and with each call 
//makes a new point on the graph in respect to the current water level.
function graphPointCreate(ctx){

  if(graphStart==false){
  }

  else{
    noOfGraphpoints++;
    var xPos = 45 + (noOfGraphpoints+3);
    var yPos =  405 + waterLevel * 2;
    ctx.fillStyle="#0000ff";
    ctx.fillRect(xPos,yPos,4,4);
    
    if(xPos>400){
      noOfGraphpoints=0;
      ctx.clearRect(45,405,450,waterHeightLimit*2);
    }

  }
};



//A function which increases the height of the water.
function increaseWater(){
  if(waterLevel != waterHeightLimit)
    waterLevel--;
};

//A function which decreases the height of the water.
function decreaseWater(){
  if(waterLevel != 0)
    waterLevel++;
};



//A function which checks the X & Y co-ordinates of the man and updates them if a button has been pressed.
//Increases the water level as man gets into the bath.
//Decreases the water level as man exits the bath.
function checkMan(ctx){

    if(manY<bathY)
      ctx.clearRect(450/2, 120,200,-200); //clear area above bath

    if(manIn==true && manY< bathY)   //move man down if button pressed
      manY=manY+4;

    if(manIn==false && manY!= -245)   //move man up otherwise
      manY=manY-4;

    if(manY+55>waterLevel && manY<bathY && manIn == true){   //raise water if man getting into bath
      increaseWater();
    }

    if(manY+55>waterLevel && manIn == false){                //lower water if man getting out of bath
      decreaseWater();
    }
}


//checks whether the tap is on or and updates water level accordingly and draws the water coming
//from the tap
function checkTap(ctx){
    if(tapOn===true && plugIn==true && waterLevel != waterHeightLimit){
     increaseWater();
   }
   ctx.clearRect(showerX-3,120,20,-87); // clear shower water above bath
   if(tapOn){

     ctx.fillStyle="#66FFFF"; //set water colour
      ctx.clearRect(showerX,200,7,waterHeightLimit+1); //clear shower water in bath
     ctx.fillRect(showerX,200,7,waterHeightLimit+1); //fill shower water in bath
     ctx.fillRect(showerX,120,7,-87);                //fill shower water above bath
  }
}


//checks whether the plug is in or out and updates water level accordingly
function checkPlug(ctx){
  if(plugIn==false && (waterLevel!=0) && tapOn==false) {
      decreaseWater();
    }

  ctx.fillStyle="#464646";
   
  if(plugIn==true){
    ctx.fillRect(160,200,15,-5);
  }

  else
    ctx.fillRect(160,195,15,-5);
}



//A function which when run loads all of the images onto the canvas,
//Draws the current water level in the bath depending on which
//of the user buttons have been clicked.
//
function drawBoard(ctx){
    
  ctx.fillStyle="#66FFFF";    //water colour
  ctx.clearRect(bathX+20,201,305,waterHeightLimit);
  ctx.fillRect(bathX+20,201,305,waterLevel);           //draw water
  
  checkMan(ctx);
  checkTap(ctx);
  checkPlug(ctx);

  loadImage(ctx,bathImage,bathX, bathY);   //load bath
  loadImage(ctx,graphImage,10,450/2+20);    //
  loadImage(ctx,manImage,bathX, manY);

}






//The main Function of the programme.
//Creates the game Canvas
//Runs several functions periodically
var main = function(){

  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");
  ctx.font=textHeight+"px Georgia";

  setInterval(function(){ drawBoard(ctx); }, 100);
  setInterval(function(){ showerEffect(ctx); }, 250);
  setInterval(function(){ graphPointCreate(ctx); }, 200);

} 
$(document).ready(main);