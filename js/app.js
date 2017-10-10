let $dog;
let $randomItem;
let $object;

$(() => {

  const $dog = $('.dog');
  const $timeContainer = $('.countdown');
  const $game = $('.game');
  let timer = 10;
  let interval = null;


  $(document).on('keydown', handleKeyCode);



  $('#new').click(function() {
    $('.characters').css({'display': 'block'});
  });

  $('#play').click(play);


  function play(){
    $('.characters').css({'display': 'none'});
    setInterval(animateFall, 2000);
    countdown();
    interval = setInterval(countdown, 1000);
  }

  //***----FUNCTIONS----***

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


            // if box should be collected

            // else
            // lose life
          }

        }
      });
  }



  function collision ($dog, $box) {
    var x1 = $dog.offset().left;
    var y1 = $dog.offset().top -35;
    var h1 = $dog.outerHeight(true);
    var w1 = $dog.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $box.offset().left;
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
    timer--;
    $timeContainer.html(timer);

    if (timer <= 0) {
      clearInterval(interval);
    // gameOver();
    }
  }

});



//set interval 2secs
//append a new div to the parent (game div)
//as you append - that div needs to have certain classes
