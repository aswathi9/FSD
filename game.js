var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level=0;
function newSequence()
{
  var randomChosenColour=buttonColours[Math.round(Math.random()*3+0)];
  userClickedPattern=[];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level "+level);
  level=level+1;
}
$(".btn").click(function()
{
  var userChosenColour=$(this).attr("id");
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour)
{
$("#"+currentColour).addClass('pressed');
setTimeout(function()
{
  $("#"+currentColour).removeClass('pressed')
},100);
}

$(document).keypress(function (event)
{
  if (level===0)
  {
    newSequence();
  }
});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
    setTimeout(function()
    {
      newSequence();
    },1000);
    }
  }
    else
    {
      console.log('wrong');
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}
function startOver()
{
  level=0;
  gamePattern=[];
}