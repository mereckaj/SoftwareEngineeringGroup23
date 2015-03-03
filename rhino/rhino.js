var xCoord;
var yCoord;
var xMax = 8;
var yMax = 8;
var bh = xMax * 50;
var bw = yMax * 50;
var p = 25;
var rhino;
var grid;
axisColour = "black";
gridColour = "black";
boardColour = "#233777";
textHeight = 16;

// Images used in the background
image1_src = 'https://mereckaj.github.io/grid1.png';
image2_src = 'https://mereckaj.github.io/grid2.png';
image3_src = 'https://mereckaj.github.io/grid3.png';
image4_src = 'https://mereckaj.github.io/grid4.png';
imageRhino_src = 'https://mereckaj.github.io/rhino.png';

//DEBUG OPTION TO DISABLE IMAGES
var debug_images_enabled = true;

function Rhino(){
  var rhino = this;
  var xPos = Math.floor(Math.random() * (xMax));
  var yPos = Math.floor(Math.random() * (yMax));

  rhino.move = function(){
    xPos = Math.floor(Math.random() * (xMax));
    yPos = Math.floor(Math.random() * (yMax));
  };

  rhino.checkPos = function(xGuess, yGuess){
    if(xGuess == xPos && yGuess == yPos){
      return true;
    }
    else return false;
  };

  rhino.getDistFromGuess = function(xGuess, yGuess){
    var blocks = 0;
    if(yGuess >= yPos){
      blocks = blocks + (yGuess - yPos);
    }
    else blocks = blocks + (yPos - yGuess);

    if(xGuess >= xPos){
      blocks = blocks + (xGuess - xPos);
    }
    else blocks = blocks + (xPos - xGuess);
    return blocks;
  };
};

function City(){
  var city = this;
  var grid = new Array(xMax);
  for(var i=0; i<xMax; i++){
    grid[i] = new Array(yMax);
  }
}

function drawGrid(context){
  for (var x = 0; x <= bw; x += 50) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }
  for (var x = 0; x <= bh; x += 50) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }
  context.strokeStyle = gridColour;
  context.stroke();
}

function drawBoard2(ctx){
  ctx.fillStyle = boardColour;
  ctx.fillRect(0,0,450,450);
}

function drawAxis(context){
  context.fillStyle = axisColour;
  for (var x = 0; x <= xMax;x++){
    context.fillText(x,20+(x*50),448);
  }
  for (var x = 0; x <= yMax;x++){
    context.fillText(yMax-x,2,30+(x*50));
  }
}
function loadImage(ctx,src,x,y){
  var image = new Image();
  image.src = src;
  image.onload = function(){
    ctx.drawImage(image, x, y);
    drawBoarders(ctx);
  }
}
function drawBoard(ctx){
  if(debug_images_enabled){
    var r;
    for(var i = 0; i <=xMax;i++){
      for(var j = 0; j <=yMax;j++){
        r = (Math.random()*100)%100;
        if(r < 25){
          loadImage(ctx,image1_src,i*50,j*50);
        }else if(r <50){
          loadImage(ctx,image2_src,i*50,j*50);
        }else if(r <75){
          loadImage(ctx,image3_src,i*50,j*50);
        }else {
          loadImage(ctx,image4_src,i*50,j*50);
        }
      }
    }
  }else{
    drawBoard2(ctx);
    drawGrid(ctx);
    drawAxis(ctx);
  }
}

function drawBoarders(ctx){
  ctx.fillStyle = boardColour;
  ctx.fillRect(0,425,450,25);
  ctx.fillRect(22,0,428,22);
  ctx.fillRect(0,0,22,450);
  ctx.fillRect(427,22,25,425);
  drawAxis(ctx);
}

function makeGuess(){
  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");
  getNewCoords();
  if(!checkIfValid(xCoord,yCoord)){
    alert("Invalid coordinates");
    return;
  }
  if(rhino.checkPos(xCoord, yCoord) === true){
    addRhinoToGrid(ctx);
    askIfNewGame();
  }else{
    var dst = rhino.getDistFromGuess(xCoord,yCoord);
    addDistnaceToGrid(ctx,dst,(xCoord*50)+25,((yMax - yCoord)*50)+25);
  }
}

function addRhinoToGrid(ctx){
  loadImage(ctx,imageRhino_src,xCoord,yCoord);
}

function askIfNewGame(){
  //TODO:
}

function getNewCoords(){
  xCoord =  document.getElementById('x_val').value;
  yCoord =  document.getElementById('y_val').value;
}

function addDistnaceToGrid(ctx,dst,x,y){
  //Get the width of the text,
  var metrics = ctx.measureText(dst);
  var textWidth = metrics.width;
  //Set the fill colour of the circle
  ctx.fillStyle = boardColour;
  //Start drawing the background circle for the distance
  ctx.beginPath();
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
  //Add the distance in the middle of that circle
  ctx.fillStyle = "white";
  ctx.fillText(dst,x-(textWidth/2),y+(textHeight/2)-2);
}

function update(){
  xCoord =  document.getElementById('x_val').value;
  yCoord =  document.getElementById('y_val').value;
  document.getElementById("coords_selected").innerHTML = "What is your guess ? ("+xCoord+","+yCoord+")";
}

function checkIfValid(x,y){
  if(x<0 || x>xMax){
    return false;
  }
  if(y<0 || y >yMax){
    return false;
  }
  return true;
}

var main = function(){
  $("#x_val").attr('max', xMax);
  $("#y_val").attr('max', yMax);
  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");
  ctx.font=textHeight+"px Georgia";

  drawBoard(ctx);
  document.getElementById('x_val').value = 0;
  document.getElementById('y_val').value = 0;

  rhino = new Rhino();
  grid = new City();

  var guessButton = document.getElementById('makeGuess');
  guessButton.addEventListener('click', makeGuess, false);
  guessButton.disabled = false;
}
$(document).ready(main);
