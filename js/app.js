let $dog;
let $ball;
let $randomObject = [];

$(() => {

  const $dog = $('.dog');
  const $object = $('.object');
  const $game = $('.game');
  //Objects in game
  const $ballBlue = $('.ball-blue');
  const $ballGreen = $('.ball-green');
  const $ballOrange = $('.ball-orange');
  const $ballPink = $('.ball-pink');
  const $ballPurple = $('.ball-purple');
  const $bone = $('.bone');
  const $gnome = $('.gnome');
  const $mushroom = $('.mushroom');


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

  function randomWidth() {
    const randomWidth = Math.floor(Math.random()*500);
    $object.css({'margin-left': randomWidth});
  }


  function animateFall(){
    randomWidth();
    animateObjects();
    getRandomObject();
  }

  function animateObjects() {


    $object.animate({
      top: '+=500'
    }, {
      duration: 5000,
      complete: function() {
        $( this ).after($object.remove());
      }
    });
  }



  function getRandomObject(){
    const items = ['ball-blue', 'ball-green', 'ball-orange', 'ball-pink', 'ball-purple', 'bone', 'gnome', 'mushroom'];
    // const items = [$ballBlue, $ballGreen, $ballOrange, $ballPink, $ballPurple, $bone, $gnome, $mushroom];
    const $randomItem = items[Math.floor(Math.random() * items.length)];
    console.log($randomItem);

  }



});



//set interval 2secs
//append a new div to the parent (game div)
//as you append - that div needs to have certain classes
