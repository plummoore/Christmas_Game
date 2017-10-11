let $box;
let counter;
let falling;
let $dogImg;
let $allBoxes;

$(() => {

  let $dog = $('.dog');
  $dogImg = $('.dog img');
  const $timeContainer = $('.countdown');
  const $game = $('.game');
  const $characters = $('.characters');
  const $scoreBoard = $('.points');
  const $currentLevel = $('.currentlevel');

  console.log($dogImg);


  let $timer = 30;
  let $score = 10;
  let $health = 3;
  let level = 0;
  let speed = 1000;



  $(document).on('keydown', handleKeyCode);
  $('.play').click(play);
  $('#new').click(chooseCharacter);
  $('.continue').click(playOn);

  //***----FUNCTIONS----***

  function chooseCharacter(){
    $('.characters').css({'display': 'block'});
    // $characters.click(function() {
    //   console.log(this.id);
    $('.characters').on('click',function (e) {
      const selectedDog = $(e.target).attr('src');
      $($dogImg).attr('src', selectedDog);




      // $(this).addClass($dog);
      // console.log($dog);

      // $dog = (`../images/${e.target.id}.png`);
      // console.log($dog);
    });
    // });

  }

  function play(){
    $('.characters').css({'display': 'none'});
    level ++;
    $currentLevel.html(level);
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
    $score =10;
    $health =3;
    $game.show($box);
    $('.complete').css({'display': 'none'});
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

  function handlePlayerMovement(operation) {
    $dog.animate({ 'left': `${operation}=20` }, 0);

  }

  function randomWidth($box) {
    const randomWidth = Math.floor(Math.random()*500);
    $box.css({'margin-left': randomWidth});
    $box.css({'margin-top': -50});
  }

  function animateFall(){
    const items = ['ball-blue', 'ball-green', 'ball-orange', 'ball-pink', 'ball-purple', 'bone', 'gnome', 'mushroom'];
    // const items = ['gnome', 'mushroom'];
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
            $box.remove();

            $scoreBoard.html($score);

            if ($box.hasClass('ball-blue') || $box.hasClass('ball-pink') || $box.hasClass('ball-green') || $box.hasClass('ball-orange')|| $box.hasClass('ball-purple')) {

              console.log('ball ' + $score);
              $score +=10;
              $scoreBoard.html($score);
            } if ($box.hasClass('gnome')) {
              console.log('gnome ' + $score);
              $score -=10;
              $scoreBoard.html($score);
              if ($score <=0){
                gameOver();
              }


            } else if ($box.hasClass('mushroom')) {
              console.log('mushroom');
              $health--;
              console.log($health);
              $($('.bone')[$health]).hide();
              if ($health === 0) {
                console.log('game over');
                gameOver();
                $box.stop();
              }
            } else if ($box.hasClass('bone')) {
              console.log('bone');
              if ($health !== 3) {
                $($('.bone')[$health]).show();
                $health++;
              }
            }
            // $scoreBoard.html($score);
          }
        }
      });
  }

  function endOfGame(){
    clearInterval(counter);
    clearInterval(falling);

    $game.hide($box);
    $('.over').css({'display': 'none'});

    console.log('end of game logic triggered');

    if (level === 1 && $score >=100) {
      $('.complete').css({'display': 'block'});
      $currentLevel.html(level);
      speed = 600;


    } else if (level === 2 && $score >=150) {
      $('.complete').css({'display': 'block'});
      $currentLevel.html(level);
      speed = 400;

    } else if (level === 3 && $score >=300) {
      $('.winner').css({'display': 'block'});
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
    var x2 = $box.offset().left -100;
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
    console.log('Im triggered');
    $($allBoxes).stop();
    clearInterval(counter);
    clearInterval(falling);
    $('.over').css({'display': 'block'});
    $('.complete').css({'display': 'none'});


  }



});
