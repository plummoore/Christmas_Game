let $box;
let counter;
let falling;
let $dogImg;
let $allBoxes;
let $dog;
let $timeContainer;
let $game;
let $scoreBoard;
let $currentLevel;
let $play;
let $newGame;
let $playOn;
let $characters;
let $gameOver;
let $endOfLevel;
let $winner;
let $restart;
let $levelsTitle;
let $levels;
let $howTo;
let $instructionsTitle;
let $bone;

function setup() {

  $dog = $('.dog');
  $dogImg = $('.dog img');
  // $dogImg = $('.slider');
  $timeContainer = $('.countdown');
  $game = $('.game');
  $scoreBoard = $('.currentpoints');
  $currentLevel = $('.currentlevel');
  $play = $('.play');
  $newGame = $('.new');
  $playOn = $('.continue');
  $characters = $('.characters');
  $gameOver = $('.over');
  $endOfLevel = $('.complete');
  $winner = $('.winner');
  $restart =$('.restart');
  $instructionsTitle = $('.howto-title');
  $levelsTitle = $('.levels-title');
  $levels = $('.levels');
  $howTo =$('.howto');
  $bone = $('.bone');

  $(document).on('keydown', handleKeyCode);
  $($game).on('mousedown', handleMouseDown);
  // let int;
  // $($game).mousedown(function(e){
  //   console.log('mousedown');
  //   int = setInterval(handleMouseClick(e), 800);
  // });
  // $($game).mouseup(function(){
  //   console.log('mouseup');
  //   clearInterval(int);
  // });


  $play.click(play);
  $newGame.click(chooseCharacter);
  $playOn.click(playOn);
  $restart.click(restart);
  $levelsTitle.on('click', showLevels);
  $instructionsTitle.on('click', showInstructions);
}

let $timer = 30;
let $score = 10;
let $health = 3;
let level = 0;
let speed = 1000;


function chooseCharacter(){
  $characters.fadeIn(400);
  $characters.on('click',function (e) {
    const selectedDog = $(e.target).attr('src');
    $($dogImg).attr('src', selectedDog);
    new Audio('sounds/dog.wav').play();
    $($dogImg).attr('class', 'animated tada');
  });
}

function play(){
  $characters.css({'display': 'none'});
  level =1;
  $currentLevel.html(level);
  showLevels();
  falling = setInterval(animateFall, speed);
  $scoreBoard.html($score);
  counter = setInterval(timer, 1000);
  function timer() {
    $timer--;
    if ($timer === 0){
      clearInterval(counter);
      clearInterval(falling);
      $timeContainer.html('');
      endOfGame();
    }
    $timeContainer.html($timer);
  }
}

function playOn(){
  level ++;
  $currentLevel.html(level);
  $score =10;
  $health =3;
  $bone.show();
  $game.show($box);
  showLevels();
  $endOfLevel.css({'display': 'none'});
  falling = setInterval(animateFall, speed);
  $scoreBoard.html($score);
  $timer =30;
  const counter=setInterval(timer, 1000);
  function timer() {
    $timer--;
    if ($timer === 0){
      clearInterval(counter);
      clearInterval(falling);
      $timeContainer.html('');
      endOfGame();
    }
    $timeContainer.html($timer);
  }
}

function handleKeyCode(e) {
  const dogLeftValue = parseInt($dog.css('left'));

  if (e.keyCode === 37 && dogLeftValue !== 0)   handlePlayerMovement('-');
  if (e.keyCode === 39 && dogLeftValue !== 500) handlePlayerMovement('+');
}

function handleMouseDown(e) {
  const dogLeftValue = parseInt($dog.css('left'));

  if (e.offsetX <= 300 && dogLeftValue !== 0) handleMobilePlayerMovement('-');
  if (e.offsetX > 300 && dogLeftValue !== 500) handleMobilePlayerMovement('+');
}

function handlePlayerMovement(operation) {
  $dog.animate({ 'left': `${operation}=20` }, 0);
}

function handleMobilePlayerMovement(operation) {
  $dog.animate({ 'left': `${operation}=50` }, 0).transition = 'all 2s';
}

function randomWidth($box) {
  const randomWidth = Math.floor(Math.random()*500);
  $box.css({'margin-left': randomWidth});
  $box.css({'margin-top': -50});
}

function animateFall(){
  const items = ['ball-blue', 'ball-green', 'ball-orange', 'ball-pink', 'ball-purple', 'bone', 'gnome', 'mushroom'];
  const $randomItem = items[Math.floor(Math.random() * items.length)];
  const $box = $('<div class="box"></div>');
  $box.addClass($randomItem);
  $game.append($box);

  randomWidth($box);
  animateObjects($box);
  collision($dog, $box);
  $allBoxes = $('.box');
}

function animateObjects($box) {
  $box.animate({'top': '550px'},
    {
      easing: 'linear',
      duration: 5000,
      complete: function() {
        $( this ).after($box.remove());
      },
      step: function() {
        if (collision($dog, $box)) {
          $box.stop().fadeOut();
          setTimeout(() => {
            $box.remove();
          }, 500);

          $scoreBoard.html($score);

          if ($box.attr('class').split(' ')[1].split('-')[0] === 'ball') {
            new Audio('sounds/balls.wav').play();
            $score +=10;
            $scoreBoard.html($score);
          }

          if ($box.hasClass('gnome')) {
            new Audio('sounds/gnome.wav').play();
            $score -=10;
            $scoreBoard.html($score);
            if ($score <=0){
              gameOver();
            }

          } else if ($box.hasClass('mushroom')) {
            $health--;
            new Audio('sounds/mushroom.wav').play();
            $($('.bone')[$health]).addClass('animated shake').fadeOut(1000);
            if ($health === 0) {
              gameOver();
              $box.stop();
            }

          } else if ($box.hasClass('bone')) {
            new Audio('sounds/dog.wav').play();
            if ($health !== 3) {
              $($('.bone')[$health]).addClass('animated shake').fadeIn(1000);
              $health++;
            }
          }
        }
      }
    });
}

function endOfGame(){
  clearInterval(counter);
  clearInterval(falling);

  $game.hide($box);
  $gameOver.css({'display': 'none'});

  if (level === 1 && $score >=100) {
    $endOfLevel.css({'display': 'block'});
    $currentLevel.html(level);
    speed = 600;


  } else if (level === 2 && $score >=150) {
    $endOfLevel.css({'display': 'block'});
    $currentLevel.html(level);
    speed = 400;

  } else if (level === 3 && $score >=250) {
    $winner.css({'display': 'block'});
    $currentLevel.html(level);

  } else gameOver();
}

function collision ($dog, $box) {
  var x1 = $dog.offset().left;
  var y1 = $dog.offset().top -35;
  var h1 = $dog.outerHeight(true);
  var w1 = $dog.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $box.offset().left -90;
  var y2 = $box.offset().top;
  var h2 = $box.outerHeight(true);
  var w2 = $box.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
    return false;
  }
  return true;
}

function gameOver(){
  $($allBoxes).stop();
  clearInterval(counter);
  clearInterval(falling);
  new Audio('sounds/gnome.wav').play();
  $gameOver.css({'display': 'block'});
  $endOfLevel.css({'display': 'none'});
}

function restart(){
  $gameOver.hide();
  $endOfLevel.hide();
  $winner.hide();
  $timer = 30;
  $health =3;
  $bone.show();
  level =0;
  $currentLevel.html(level);
  $score =10;
  $scoreBoard.html($score);
  $health =3;
  showInstructions();
  clearInterval(counter);
  clearInterval(falling);
  $timeContainer.html('');

  $('.box').hide();
  $game.show($box);
  $characters.css({'display': 'block'});
}

function showLevels(){
  $levels.show();
  $howTo.hide();
}

function showInstructions(){
  $howTo.show();
  $levels.hide();
}

$(setup);
