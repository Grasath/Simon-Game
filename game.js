var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#'+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $('h1').text('Level '+level);
  console.log(gamePattern);
  userClickedPattern = [];
}
$('.btn').on('click',function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var currentValue = userClickedPattern.length-1;
  checkAnswer(currentValue);
});
function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){
  $('#'+ currentColour).addClass('pressed');
  setTimeout(function(){
    $('#'+ currentColour).removeClass('pressed');
  },100);
}
var start = [];
$(document).on('keydown',function(){
  start.push(event.key);
  if (start.length === 1){
     setTimeout(nextSequence,100);
  }
});
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]==userClickedPattern[currentLevel] && gamePattern.length == userClickedPattern.length){
    setTimeout(nextSequence,1000) ;
  }else if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log(userClickedPattern[currentLevel]);
  }else{
    $('body').addClass('game-over');
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  level = 0;
  start = [];
}
