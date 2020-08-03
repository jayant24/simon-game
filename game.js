var gamePattern = [];
var userClickedPattern = [];
var toogle = false;
var level = 0;
var buttonsColor = ["red", "blue", "green", "yellow"];

// first key


$(document).keypress(function() {
  if (!toogle) {
    $("#level-title").html("level " + level);
    nextSequence();
    toogle = true;
  }
});

// user input


$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// check answer

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('win');
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    console.log('wrong');
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game over,Press any key to restart");
    StartOver();
  }
}


// sequence of computer

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonsColor[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}




// play sound

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animation

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  })
}


//StartOver
function StartOver() {
  toogle = false;
  gamePattern = [];
  level = 0;
}
