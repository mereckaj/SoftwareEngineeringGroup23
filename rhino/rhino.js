var gridSizeX = 5;
var gridSizeY = 5;
var rhino;
var grid;
var realDots;
var lastGuessColour = "#33FF00";
var normalColour = "#000000";
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
    return ("The Rhino is " + blocks + " blocks away");
  };
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
  //Hide the winner text and the play again button
  $("#win_text").hide();
  $("#playAgain").hide();

  rhino = new Rhino();
  grid = new City();
  rhino.showPos();

  var guessButton = document.getElementById('makeGuess');
  guessButton.addEventListener('click', makeGuess, false);
  guessButton.disabled = false;

  var guessButton = document.getElementById('playAgain');
  guessButton.addEventListener('click', playAgain, false);
  guessButton.disabled = false;

  // Enter/Return key listener. Will make a guess at the selected coordinates if the user hits enter
  window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13 ) { //up key
      makeGuess();
    }
  };
}

function makeGuess(){
  var userInput;
  //Preserve last x and y coordinates, used to change the colour of the dot back to black
  lastx = xCoord;
  lasty = yCoord;
  // Get new x and y coordinates from the input boxes
  xCoord =  document.getElementById('x_val').value;
  yCoord =  document.getElementById('y_val').value;


  if(rhino.checkPos(xCoord, yCoord) === true){
    displayFoundMessage()
    // alert("You have found the Rhino");
  }
  else{
    alert(rhino.getDistFromGuess(xCoord, yCoord));
  }
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
function displayFoundMessage(){
  $svg = $("#svg_gird");
  $("#grid", $svg).attr('visibility', "hidden");
  $("#rhino_pic", $svg).attr('visibility', "visible");
  $svg.attr('visibility', "hidden");
  $("#user_input").hide();
  $("#win_text").show();
  $("#playAgain").show();
}
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

$(document).ready(main);
