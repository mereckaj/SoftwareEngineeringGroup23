var gridSizeX = 5;
var gridSizeY = 5;
var rhino;
var grid;
var realDots;

/**
  * Rhino Object
  *
  */
function Rhino(){
  var rhino = this;
  var xPos = Math.floor(Math.random() * (gridSizeX));  //generate a random X position for the rhino in the 2D array
  var yPos = Math.floor(Math.random() * (gridSizeY));  //generate a random Y position for the rhino in the 2D array
  var found = false;

  rhino.sayPos = function(){    //alerts user with the co ordinates of the rhino;
    alert(xPos);
    alert(yPos);
  };

  rhino.move = function(){    //moves the rhino to new co-ordinates
    xPos = Math.floor(Math.random() * (gridSizeX));
    yPos = Math.floor(Math.random() * (gridSizeY));
  };

  rhino.checkPos = function(xGuess, yGuess){  //compares the co-ordinates of user guess with those of rhino
    if(xGuess === xPos && yGuess === yPos){
      found = true;
    }
  };

  rhino.isFound = function(){ //checks if the rhino has been found
    return found;
  };

  rhino.getDistFromGuess = function(xGuess, yGuess){ //returns the number of blocks the rhino is from the guess
    var blocks = 0;

    return ("The Rhino is " + blocks + " blocks away");
  };
};

function City(){
  var city = this;
  var grid = new Array(gridSizeX);
  for(var i=0; i<gridSizeX; i++){
    grid[i] = new Array(gridSizeY);
  }
}


var main = function(){
  rhino = new Rhino();
  grid = new City();

  var guessButton = document.getElementById('makeGuess');     //gets the button by ID *allows us to check if the button is pressed*
  guessButton.addEventListener('click', makeGuess, false);    //when the button is pressed the makeGuess() function is called
  guessButton.disabled = false;

  realDots = document.getElementByClassName('dot');

}

function makeGuess(){
  var userInput;
  var xCoord;
  var yCoord;

  while(true){
    xCoord = getNumber("Enter an x co-ordinate!");
    if(!isNaN(xCoord) && xCoord != null){
      if(xCoord < 0){
        alert("x co-ordinate is out of range! range:0-" + (gridSizeX-1));
      }else if(xCoord > gridSizeX-1){
        alert("x co-ordinate is out of range! range:0-" + (gridSizeX-1));
      }
      break;
    }
  }

  while(true){
    yCoord = getNumber("Enter a y co-ordinate!");
    if(!isNaN(yCoord) && yCoord != null){
      if(yCoord < 0){
        alert("y co-ordinate is out of range! range:0-" + (gridSizeY-1));
      }else if(yCoord > gridSizeY-1){
        alert("y co-ordinate is out of range! range:0-" + (gridSizeY-1));
      }
      break;
    }
  }

  rhino.checkPos(xCoord, yCoord);
  if(rhino.isFound === true){
    alert("You have found the Rhino");
  }
  else{
    alert(rhino.getDistFromGuess(xCoord, yCoord));
    markDot(xCoord, yCoord);
  }
}

function getNumber(text){     //Converts the String that the user enters into an int
  var res = prompt(text);

  while(isNaN(res)) {
    alert("Please enter a valid number!");
    res = prompt(text);
  }

  return res;
};

function markDot(iX, iY){ //test function, not working yet
  var offset = (gridSizeX * iY) + iX;
  realDots[offset].setAttribute("fill", "green");
};

$(document).ready(main);
