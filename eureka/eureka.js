var bathY= -40;
var bathX= 450/5;
var tapOn = false;
var plugIn = true;
var manIn=false;
var waterLimit = -200;
var flow = false;
var waterLevels=[];
var noOfGraphpoints = 0;
var graphPointArray=[];

axisColour = "black";
gridColour = "black";
boardColour = "#233777";
textHeight = 16;
var waterChange = 0;
var showerX = 165;
var waterHeightLimit=-75;

// Images used in the background
image1_src = "bath2.png";
image3_src = "graph3.png";

//DEBUG OPTION TO DISABLE IMAGES
var debug_images_enabled = true;

//Function which controls the TapOn boolean.
//Activated when the 'Tap' Button is pressed.
function  tapPressed(){
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
//A Function which when run, creates a new point on the graph and stores it in an array with the other points.
function graphPointCreate(ctx){
  if(waterChange==0){
  }else{
    noOfGraphpoints++;
    graphPointArray.push(new graphPoint(ctx, noOfGraphpoints, waterChange));
  }
}
//The graphPoint object is a point on the graph which has a certain X/Y values depending on
//the number of previously created points and the waterLevel at the time of creation
function graphPoint(ctx, indexNumber, waterChangeLevel){
  var graphPoint = this;
  var xPos = 45 + (indexNumber+3);
  var yPos =  405 + waterChange * 2;
  ctx.fillStyle="#66FFFF";  
  graphPoint.draw = function(ctx){
     ctx.fillRect(xPos,yPos,2,2);
  }
};
//A function which when called draws all of the created graph points.
function drawGraphPoints(ctx){
  for(var i=1;i<noOfGraphpoints;i++){
    graphPointArray[i].draw(ctx);
  }
};
//A function which when run loads all of the images onto the canvas,
//Draws the current water level in the bath depending on which
//of the user buttons have been clicked.
//At the end of the function it clears the screen to allow the next 'frame
//to be drawn.
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
  }  
  if(tapOn){
    ctx.fillRect(showerX,200,5,-168);
  }
  else if(plugIn==false && (waterChange!=0)) {
    waterChange +=1;
  }
  ctx.fillStyle="#464646";
  if(plugIn==true){
    ctx.fillRect(160,200,15,-5);
  }
  else{
    ctx.fillRect(160,195,15,-5);
  }
}
//The main Function of the programme.
//Creates the game Canvas
//Runs several functions periodically
var main = function(){
  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");
  ctx.font=textHeight+"px Georgia";
  setInterval(function(){ drawBoard(ctx); }, 300);
    setInterval(function(){ showerEffect(); }, 250);
    setInterval(function(){ graphPointCreate(ctx); }, 300);
    setInterval(function(){ drawGraphPoints(ctx); }, 50);
  } 
$(document).ready(main);
