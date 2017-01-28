$(document).keydown(function numTrigger(e) {
  // Allow: backspace, delete, tab, escape, enter and .
  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl+A, Command+A
    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right, down, up
    (e.keyCode >= 35 && e.keyCode <= 40)) {
    // let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
});

var problems = [
  ["6 * 6 - 27", 6 * 6 - 27],
  ["1 * 10 - 1", 1 * 10 - 1],
  ["2 + 5 * 1", 2 + 5 * 1],
  ["5 * 10 - 42", 5 * 10 - 42],
  ["8 + 6 - 7", 8 + 6 - 7],
  ["(1 - 1) * 20", (1 - 1) * 20],
  ["4 * 3 - 6", 4 * 3 - 6],
  ["98 - 95", 98 - 95],
  ["16 - 8", 16 - 8],
  ["(5 + 9) / 2", (5 + 9) / 2],
  ["(21 + 19) / 5", (21 + 19) / 5],
  ["(4 - 3) * 7", (4 - 3) * 7],
  ["(7 - 1) / 2", (7 - 1) / 2],
  ["(8 + 2) / 5", (8 + 2) / 5],
  ["(6 * 12) / 8", (6 * 12) / 8],
  ["22 - 18", 22 - 18],
  ["7 + 2 - 3", 7 + 2 - 3],
  ["24 / 4 + 2", 24 / 4 + 2],
  ["19 - 14 + 1", 19 - 14 + 1],
  ["(3 * 2) + 2", (3 * 2) + 2],
  ["(20 * 20) / 50", (20 * 20) / 50],
  ["20 - 14", 20 - 14],
  ["36 - 29", 36 - 29],
  ["78 - 69", 78 - 69],
  ["63 - 58", 63 - 58],
  ["55 - 49", 55 - 49],
  ["47 - 41", 47 - 41],
  ["91 - 84", 91 - 84],
  ["2 + 6", 2 + 6],
  ["3 + 6", 3 + 6],
  ["4 + 3", 4 + 3],
  ["16 / 2", 16 / 2],
  ["16 / 4", 16 / 4],
  ["42 / 7", 42 / 7],
  ["63 / 9", 63 / 9],
  ["95 / 19", 95 / 19],
  ["(2 * 2) + 3", (2 * 2) + 3],
  ["(1 * 6) + 2", (1 * 6) + 2],
  ["(2 * 4) + 1", (2 * 4) + 1],
  ["(5 * 1) + 4", (5 * 1) + 4],
  ["(0 * 74) + 0", (0 * 74) + 0],
  ["(23 * 2) - 39", (23 * 2) - 39],
  ["(56 * 2) - 110", (56 * 2) - 110],
  ["(72 * 2) - 139", (72 * 2) - 139],
  ["(66 * 2) - 127", (66 * 2) - 127],
  ["(40 * 1) - 32", (40 * 1) - 32],
  ["(8 * 5) / 5", (8 * 5) / 5],
  ["(9 * 4) / 6", (9 * 4) / 6],
  ["(4 * 8) / 8", (4 * 8) / 8],
  ["(6 * 6) / 6", (6 * 6) / 6],
  ["(8 * 7) / 8", (8 * 7) / 8]
];

//Gets the problem div from HTML
var problem = document.getElementById('problem');

var randomProblem;
var probAnswer;


function runThatProb() {
  // Random array generator
  var rng = Math.floor(Math.random() * problems.length);

  //Picks a random problem from the array
  randomProblem = problems[rng][0];

  //Answer to the problem
  probAnswer = problems[rng][1];

  console.log(probAnswer);
}

runThatProb();

// Current/Final Score
var score = 0;

var probAnswered = 0;

var myTimer;

var delay = 1000;

$('.button-start').on('click', function(){
  $('.play').css('display', 'block');
  /*id = setInterval(function() {
    counter--;
    if (counter < 0) {
      clearInterval(id);
       unprocessing();
    } else {
      newElement.innerHTML = counter.toString();
    }
  }, 1000);*/
  myTimer = window.setTimeout(timerCmd, 10000);
});

function timerCmd() {
  window.clearTimeout(myTimer);
  unprocessing();
  myTimer = window.setTimeout(timerCmd, 10000);
}

function resetTimer() {
  window.clearTimeout(myTimer);
  myTimer = window.setTimeout(timerCmd, 10000);
}

function endGame(){
  if (probAnswered === 10) {
    processing = null;
    unprocessing = null;
    $('.play').css('display', 'none');
    setInterval(function(){
      $('.end').css('display', 'block');
    },1);
  }
}

/*function timer(){
  //clearInterval(myInterval);
  myTimer = window.setTimeout(timerCmd, 10000);
}*/



// processes everything
function processing(){
  resetTimer();
  score++;
  probAnswered++;
  endGame();
  //$('#loading').css('animation-delay', '1s');
  $('span').removeClass('loading');
  $('.right').css('opacity', '1');
  setTimeout(function(){
    runThatProb();
    $('#problem').empty();
    $('#problem').html(randomProblem);
    $('.right').css('opacity', '0.1');
    $('#progressbar span').addClass('loading');
  }, delay);
  //console.log(probAnswered);
}

function unprocessing(){
  resetTimer();
  probAnswered++;
  endGame();
  //$('#loading').css('animation-delay', '1s');
  $('span').removeClass('loading');
  $('.wrong').css('opacity', '1');
  setTimeout(function(){
    runThatProb();
    $('#problem').empty();
    $('#problem').html(randomProblem);
    $('.wrong').css('opacity', '0.1');
    $('#progressbar span').addClass('loading');
  },delay);
  //console.log(probAnswered);
}

// When the user presses a key..

$(document).on("keypress", function(e) {
  
  if (e.which === 48 && 0 === probAnswer) {
    processing();
  } else if (e.which === 49 && 1 === probAnswer) {
    processing();
  } else if (e.which === 50 && 2 === probAnswer) {
    processing();
  } else if (e.which === 51 && 3 === probAnswer) {
    processing();
  } else if (e.which === 52 && 4 === probAnswer) {
    processing();
  } else if (e.which === 53 && 5 === probAnswer) {
    processing();
  } else if (e.which === 54 && 6 === probAnswer) {
    processing();
  } else if (e.which === 55 && 7 === probAnswer) {
    processing();
  } else if (e.which === 56 && 8 === probAnswer) {
    processing();
  } else if (e.which === 57 && 9 === probAnswer) {
    processing();
  } else {
    unprocessing();
  }
  
  //Updates score
  document.getElementById('finalScore').innerHTML = score;
});

//Adds the random 


var displayProblem = problem.innerHTML += randomProblem;

/// Timer ///

/*var timer = document.getElementById("timer");
var counter = 10;
var newElement = document.createElement("h3");
newElement.innerHTML = '10';
var id;

timer.parentNode.replaceChild(newElement, timer);*/

$('.button-end').on('click', function(){
  location.reload();
});
