var gridSizeX = 8;
var gridSizeY = 8;
var rhino;
var grid;
var realDots;
var xCoord;
var yCoord;
var lastx;
var laxty;

/*****************************************
  *             Rhino Object             *
  *                                      *
  ****************************************/
function Rhino(){
  var rhino = this;
  var xPos = Math.floor(Math.random() * (gridSizeX));  //generate a random X position for the rhino in the 2D array
  var yPos = Math.floor(Math.random() * (gridSizeY));  //generate a random Y position for the rhino in the 2D array

  rhino.move = function(){    //moves the rhino to new co-ordinates
    xPos = Math.floor(Math.random() * (gridSizeX));
    yPos = Math.floor(Math.random() * (gridSizeY));
  };

  rhino.checkPos = function(xGuess, yGuess){  //compares the co-ordinates of user guess with those of rhino
    if(xGuess == xPos && yGuess == yPos){
      return true;
    }
    else return false;
  };

  rhino.getDistFromGuess = function(xGuess, yGuess){ //returns the number of blocks the rhino is from the guess
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
  //Function used for debugging which shows current rhino pos
  rhino.showPos = function(){
    alert(xPos+"-"+yPos);
  };
};

/***************************************************************/


function City(){
  var city = this;
  var grid = new Array(gridSizeX);
  for(var i=0; i<gridSizeX; i++){
    grid[i] = new Array(gridSizeY);
  }
}


var main = function(){

  document.getElementById('x_val').value = 0;
  document.getElementById('y_val').value = 0;
  //Hide the winner text and the play again button
  $("#win_text").hide();
  $("#playAgain").hide();

  rhino = new Rhino();
  grid = new City();

  //Action listeners for makeGuess button
  var guessButton = document.getElementById('makeGuess');
  guessButton.addEventListener('click', makeGuess, false);
  guessButton.disabled = false;

  //Action listeners for playAgain
  var guessButton = document.getElementById('playAgain');
  guessButton.addEventListener('click', playAgain, false);
  guessButton.disabled = false;

}

function makeGuess(){
  document.getElementById("x_val").focus();
  var userInput;
  //Preserve last x and y coordinates, used to change the colour of the dot back to black
  lastx = xCoord;
  lasty = yCoord;
  // Get new x and y coordinates from the input boxes
  xCoord =  document.getElementById('x_val').value;
  yCoord =  document.getElementById('y_val').value;
  if(!checkIfValid(xCoord,yCoord)){
    alert("Invalid coordinates");
    return;
  }
  if(rhino.checkPos(xCoord, yCoord) === true){
    displayFoundMessage()
  }
  else{
    var distance = rhino.getDistFromGuess(xCoord, yCoord);
    $svg = $("#svg_gird");
    $("#dist"+xCoord+""+yCoord, $svg).attr('visibility', "visible");
    document.getElementById("dist"+xCoord+""+yCoord).innerHTML = distance;
    if(distance==1){
      alert("Rhino is " + distance +" block away.");
    }else{
      alert("Rhino is " + distance +" blocks away.");
    }
  }
}
function checkIfValid(x,y){
  if(x<0 || x>gridSizeX){
    return false;
  }
  if(y<0 || y >gridSizeY){
    return false;
  }
  return true;
}
function getNumber(text){     //Converts the String that the user enters into an int
  var res = prompt(text);

  while(isNaN(res)) {
    alert("Please enter a valid number!");
    res = prompt(text);
  }
  var intRes = parseInt(res);
  return intRes;
};
// hide the blue square, the grid and the user input buttons
// Show the winners text and the play again button
function displayFoundMessage(){
  hideDistances();
  document.getElementById("playAgain").focus();
  $svg = $("#w").attr('visibility', "hidden");
  $svg = $("#svg_gird");
  $("#grid", $svg).attr('visibility', "hidden");
  $("#rhino_pic", $svg).attr('visibility', "visible");
  $svg.attr('visibility', "hidden");
  $("#user_input").hide();
  $("#win_text").show();
  $("#playAgain").show();
}
//Undo what was done in the above function
function playAgain(){
  $svg = $("#svg_gird");
  $("#grid", $svg).attr('visibility', "visible");
  $("#rhino_pic", $svg).attr('visibility', "hidden");
  $svg.attr('visibility', "visible");
  $("#user_input").show();
  $("#win_text").hide();
  $("#playAgain").hide();
  rhino.move();
}
/**function markDot(iX, iY){ //test function, not working yet
  var offset = (gridSizeX * iY) + iX;
  realDots[offset].setAttribute("fill", "green");
};*/
function hideDistances(){
  $svg = $("#svg_gird");
  for(var i = 0;i <= gridSizeX;i++){
    for(var j = 0; j < gridSizeY;j++){
      $("#dist"+i+""+j, $svg).attr('visibility', "hidden");
    }
  }
}

$(document).ready(main);
