let $dog;
let $randomItem;
let $object;

$(() => {

  const $dog = $('.dog');
  const $timeContainer = $('.countdown');
  const $game = $('.game');
  const $characters = $('.characters');
  const $scoreBoard = $('.points');
  const $healthBoard = $('#health');

  let $timer = 10;
  let interval = null;
  let $score = 0;
  let $health = 3;
  let $level = 1;
  let speed = 2000;


  $(document).on('keydown', handleKeyCode);
  $('#play').click(play);
  $('#new').click(chooseCharacter);


  //***----FUNCTIONS----***

  function chooseCharacter(){
    $('.characters').css({'display': 'block'});
    $characters.click(function() {
      console.log(this.id);
    });

  }

  function play(){
    $('.characters').css({'display': 'none'});
    // levelLogic();

    setInterval(animateFall, speed);
    countdown();
    // interval = setInterval(countdown, 1000);
    $score = 10;

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
    const $randomItem = items[Math.floor(Math.random() * items.length)];
    const $box = $('<div class="box"></div>');
    $box.addClass($randomItem);
    $game.append($box);

    randomWidth($box);
    animateObjects($box);
    collision($dog, $box);
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


            if ($box.hasClass('ball-blue') || $box.hasClass('ball-pink') || $box.hasClass('ball-green') || $box.hasClass('ball-orange')|| $box.hasClass('ball-purple')) {
              console.log('yey ball!');
              $score +=10;
            // console.log($score);

            } else if ($box.hasClass('gnome')) {
              console.log('yey gnome!');
              $score -=10;
            // console.log($score);

            } else if ($box.hasClass('mushroom')) {
              console.log('yey mushroom!');
              if ($health <=3) {
                $('#health1').hide();
                // $('.health ul:last-child').hide();
                // $healthBoard($('li:last-child')).hide();
                $health --;
                console.log($health + 'health3');
              }
            // } if ($health == 2) {
            //   $('#health2').hide();
            //   $health --;
            //   console.log($health + 'health2');
            // } if ($health == 1) {
            //   $('#health3').hide();
            //   $health --;
            //   console.log($health + 'health1');
            // }

            } else if ($box.hasClass('bone')) {
              console.log('yey bone!');
              if ($health <3) {
                $health ++;
                console.log($health);
              }
            }
            score();
          }
        }
      });
  }

  function score($box){
    $scoreBoard.html($score);
    if ($score <=0) {
      gameOver($box);
    } if ($health === 0){
      gameOver($box);
    } if ($timer === 0 && $level === 1 && $score >=50){
      level1Win($box);
    } if ($level === 2 && $score >=350){
      level2Win($box);
    } if ($level === 3 && $score >=500){
      level3Win($box);
    }
  }



  function collision ($dog, $box) {
    var x1 = $dog.offset().left;
    var y1 = $dog.offset().top -35;
    var h1 = $dog.outerHeight(true);
    var w1 = $dog.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $box.offset().left -50;
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

  function countdown() {
    $timer--;
    $timeContainer.html(timer);

    if ($timer <= 0) {
      levelLogic();
      // gameOver();
    }
  }

  function levelLogic(){
    if ($level === 1)
      speed = 2000;
    if ($level === 2)
      speed = 1500;
    if ($level === 1)
      speed = 1000;
  }

  function gameOver($box){
    $('.over').css({'display': 'block'});
    $game.remove($box);
    timer = 0;

  }

  function level1Win($box){
    $('.level1').css({'display': 'block'});
    $game.remove($box);
    $level ++;
  }

  function level2Win($box){
    $('.level2').css({'display': 'block'});
    $game.remove($box);
    $level ++;
  }

  function level3Win($box){
    $('.level3').css({'display': 'block'});
    $game.remove($box);
  }

});
