let $dog;
let $randomItem;
let $object;

$(() => {

  const $dog = $('.dog');
  // const $object = $('.object');
  const $game = $('.game');


  $(document).on('keydown', handleKeyCode);

  animateFall();


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
  }


  function animateFall(){
    const items = ['ball-blue', 'ball-green', 'ball-orange', 'ball-pink', 'ball-purple', 'bone', 'gnome', 'mushroom'];
    const $randomItem = items[Math.floor(Math.random() * items.length)];
    const $box = $('<div class="box"></div>');
    $box.addClass($randomItem);
    $game.append($box);
    // getRandomObject($randomItem);
    console.log($randomItem);
    randomWidth($box);
    animateObjects($box);

  }

  function animateObjects($box) {
    console.log($box);
    $box.animate({
      top: '+=500'
    }, {
      duration: 5000,
      complete: function() {
        $( this ).after($box.remove());
      }
    });
    console.log('working');
  }



  // function getRandomObject(){
  //   const items = ['ball-blue', 'ball-green', 'ball-orange', 'ball-pink', 'ball-purple', 'bone', 'gnome', 'mushroom'];
  //   const $randomItem = items[Math.floor(Math.random() * items.length)];
  //
  //
  // }



});



//set interval 2secs
//append a new div to the parent (game div)
//as you append - that div needs to have certain classes
