
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];


$(document).keypress(function(){
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence()
        started = true;
    } 
});


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);


    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)
});


function playSound (name) {
    var audio = new Audio ("sounds/" + name + ".mp3")
    audio.play();
};


function wrong () {
    $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

    $("#level-title").text("Game Over!, Press any key to restart");

    var wrong = new Audio ("sounds/wrong.mp3");
    wrong.play();

    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success!");


        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }

    } else {
        wrong();
    }
}


function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    
    var randomNumbers = Math.floor(Math.random() * 4);
    var randomChosenColors = buttonColors[randomNumbers];
    gamePattern.push(randomChosenColors);

    $("#" + randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColors);
};



function animatePress(currentColor)  {
    $("#" + currentColor).click(function() {
            $(this).addClass("pressed");
            setTimeout(() => {
                $(this).removeClass("pressed");
        }, 100);
    });
};




