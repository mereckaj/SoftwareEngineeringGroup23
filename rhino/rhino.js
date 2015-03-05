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
var useImagesOverGrid = false;
var totalGuesses = 1;
introLengt = 15000;//5 sec
// Images for the image board
image1_src = 'https://mereckaj.github.io/grid1.png';
image2_src = 'https://mereckaj.github.io/grid2.png';
image3_src = 'https://mereckaj.github.io/grid3.png';
image4_src = 'https://mereckaj.github.io/grid4.png';
rhino_src_black = 'https://mereckaj.github.io/rhino_black.png';
rhino_src_white = 'https://mereckaj.github.io/rhino_white.png';

//Create a new rhino object with its internal methods
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
  rhino.showPos = function(){
    alert(xPos+","+yPos);
  }
};

//Create a new city object which ccontaisn a 2d array that represents the game board
function City(){
  var city = this;
  var grid = new Array(xMax);
  for(var i=0; i<xMax; i++){
    grid[i] = new Array(yMax);
  }
}

//Draws the actual grid onto the board
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

// Draws the coloured block that is used as a background for the board
function drawGridBoard(ctx){
  ctx.fillStyle = boardColour;
  ctx.fillRect(0,0,450,450);
}

// Method that randomly selects and draws an image on the board
function drawImageBoard(ctx){
  var r;
  for(var i = 0; i <xMax;i++){
    for(var j = 0; j <yMax;j++){
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
}

// Add the axis to the boarders (x and y)
function drawAxis(context){
  context.fillStyle = axisColour;
  for (var x = 0; x <= xMax;x++){
    context.fillText(x,20+(x*50),448);
  }
  for (var x = 0; x <= yMax;x++){
    context.fillText(yMax-x,2,30+(x*50));
  }
}

/*
 * Given a context (ctx) a URL to the image (src) and coordinates (x,y)
 * this method draws that image at that location.
 * This also draws the boarders
 */
function loadImage(ctx,src,x,y,drawBorders){
  var image = new Image();
  image.src = src;
  image.onload = function(){
    ctx.drawImage(image, 25+x, 25+y);
    if(drawBorders){
      drawBorders(ctx);
    }
  }
}

//Check if the user wants Image or Grid coordinates and draw that
function drawBoard(ctx){
  if(useImagesOverGrid){
    //Boarder and axis are drawnwithin the drawImageBoard methods
    drawGridBoard(ctx);
    drawImageBoard(ctx);
    drawAxis(ctx);
  }else{
    drawGridBoard(ctx);
    drawGrid(ctx);
    drawAxis(ctx);
  }
}

//Draws the blue borders around the "city" when using the imaged background
function drawBorders(ctx){
  ctx.fillStyle = boardColour;
  ctx.fillRect(0,425,450,25);
  ctx.fillRect(25,0,425,25);
  ctx.fillRect(0,0,25,450);
  ctx.fillRect(425,25,25,425);
  //Also draw in the axis
  drawAxis(ctx);
}
//Logic for making a guess
function makeGuess(){
  //Get the context of the Canvas
  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");

  //Update the coordinates to the ones that are currently selected by the user
  update();
  //Check if the coordinates are valid (in the expected range of (>0) && ( < xMax || yMax )
  if(!checkIfValid(xCoord,yCoord)){
    alert("Invalid coordinates");
    return;
  }

  //Check if the user has found the thino.
  if(rhino.checkPos(xCoord, yCoord) === true){
    var UIchoiceButton = document.getElementById('changeUI');
    var guessButton = document.getElementById('makeGuess');
    guessButton.disabled = true;
    UIchoiceButton.disabled = true;
    //Tell the user that they have won and add a picture of a rhino to the canvas
    addRhinoToGrid(ctx,useImagesOverGrid);
  }else{
    totalGuesses++;
    //Add the distance from the users guess to the rhino at the location of the guess
    var dst = rhino.getDistFromGuess(xCoord,yCoord);
    addDistnaceToGrid(ctx,dst,(xCoord*50)+25,((yMax - yCoord)*50)+25);
  }
}

function addRhinoToGrid(ctx,isBlack){
  if(isBlack){
    loadImage(ctx,rhino_src_white,(xCoord*50)-25,((yMax - yCoord)*50)-25);
  }else{
    loadImage(ctx,rhino_src_black,(xCoord*50)-25,((yMax - yCoord)*50)-25);
  }
  delayedWinningMessage(3500,ctx);
}
// This shows the user the winning message after some time
function delayedWinningMessage(time,ctx) { 
  setTimeout(function() {
    var guessString;
    if(totalGuesses==1){
      guessString="1 guess";
    }else{
      guessString=totalGuesses + " guesses";
    }
    if(confirm("You found the rhino in " + guessString+".\nDo you want to play again ?")){
      var UIchoiceButton = document.getElementById('changeUI');
      var guessButton = document.getElementById('makeGuess');
      guessButton.disabled = false;
      UIchoiceButton.disabled = false;
      xCoord =  document.getElementById('x_val').value = 0;
      yCoord =  document.getElementById('y_val').value= 0;
      drawBoard(ctx);
      totalGuesses=0;
      rhino.move();
      document.getElementById("coords_selected").innerHTML = "What is your 1st guess ? ("+xCoord+","+yCoord+")";
    }
  }, time); 
}
//Just fetches new coordinates into these global variables
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

// Update the text that is displayed to the user with their currently chosen coordinates
function update(){
  getNewCoords();
  document.getElementById("coords_selected").innerHTML = "What is your "+getGuessString(totalGuesses)+ " guess ? ("+xCoord+","+yCoord+")";
}
function getGuessString(n){
  if(n>81){
    return "some big numbered"
  }
  switch(n){
    case 2:
      return "2nd";
      break;
    case 3:
      return "3rd";
      break;
    case 21:
      return "21st";
      break;
    case 22:
      return "22nd";
      break;
    case 23:
      return "23rd";
      break;
    case 31:
      return "31st";
      break;
    case 32:
      return "32nd";
      break;
    case 33:
      return "33rd";
      break;
    case 41:
      return "41st";
      break;
    case 42:
      return "42nd";
      break;
    case 43:
      return "43rd";
      break;
    case 51:
      return "51st";
      break;
    case 52:
      return "52nd";
      break;
    case 53:
      return "53rd";
      break;
    case 61:
      return "61st";
      break;
    case 62:
      return "62nd";
      break;
    case 63:
      return "63rd";
      break;
    case 71:
      return "71st";
      break;
    case 72:
      return "72nd";
      break;
    case 73:
      return "73rd";
    case 81:
      return "81st";
    default:
      return n+"th";
  }
}

//Check if the two numbers are within the range of the expected value
function checkIfValid(x,y){
  if(x<0 || x>xMax){
    return false;
  }
  if(y<0 || y >yMax){
    return false;
  }
  return true;
}

function changeUI(){
  if(useImagesOverGrid==false){
    if(window.innerWidth<450){
      alert("Your screen is too small for the imaged version\nMinimum screen width for imaged version is 450px");
      return;
    }
  }
  //Inverts the UI settings, (Images of Grid)
  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");
  useImagesOverGrid = !useImagesOverGrid;
  drawBoard(ctx);
}
function drawIntro(ctx){
  var c = document.getElementById("game_canvas");
  drawGridBoard(ctx);
  setTimeout(function() {
    ctx.textAlign='center';
    ctx.fillStyle='white';
    ctx.fillText("A Rhino is lost in New York.",c.width/2,c.height/2-textHeight);
  }, 0000);
  setTimeout(function() {
    ctx.fillText("Can you find her?",c.width/2,c.height/2);
  }, 2000);
  setTimeout(function() {
    ctx.fillText("You select your co-ordinates.",c.width/2,c.height/2+(textHeight));
  }, 4000);
  setTimeout(function() {
    ctx.fillText("A helicopter pilot will tell you",c.width/2,c.height/2+(textHeight*2));
    ctx.fillText("how far you have to walk.",c.width/2,c.height/2+(textHeight*3));
  }, 6000);
}
/*
 *  Main method
 */
var main = function(){

  //Set the maximum values of the sliders
  $("#x_val").attr('max', xMax);
  $("#y_val").attr('max', yMax);
  
  //Get the contexts from the Canvas
  var c = document.getElementById("game_canvas");
  var ctx = c.getContext("2d");

  //Set up the text format, text size is variable
  ctx.font=textHeight+"px Georgia";

  //Event listener for Guess button
  var guessButton = document.getElementById('makeGuess');
  guessButton.addEventListener('click', makeGuess, false);

  //Event listener for ChangeUI button
  var UIchoiceButton = document.getElementById('changeUI');
  UIchoiceButton.addEventListener('click', changeUI, false);
  if(window.innerWidth < 450){
    useImagesOverGrid = false;
  }
  //Method that will draw the game
  drawIntro(ctx);
  setTimeout(function(){
    guessButton.disabled = false;
    UIchoiceButton.disabled = false;
    ctx.textAlign='start';
    drawBoard(ctx);
  },introLengt);

  //Initialize the sliders to a 0 value
  document.getElementById('x_val').value = 0;
  document.getElementById('y_val').value = 0;

  //Create a new Rhino and City objects
  rhino = new Rhino();
  grid = new City();

}
$(document).ready(main);