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
  // const $randomObject = [];

  console.log(typeof $ballBlue);
  console.log($ballBlue);

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
    // var refreshId = setInterval(animateFall, 2000);
    fallingTimer();
    randomWidth();
    // getRandomObject();

    $object.animate({
      top: '+=500'
    }, {
      duration: 5000,
      complete: function() {
        $( this ).after($object.remove());
      }
    });
  }


  function fallingTimer() {
    setInterval(animateFall, 3000);
  }



  function getRandomObject(){
    const items = ['ball-blue', 'ball-green', 'ball-orange', 'ball-pink', 'ball-purple', 'bone', 'gnome', 'mushroom'];
    // const items = [$ballBlue, $ballGreen, $ballOrange, $ballPink, $ballPurple, $bone, $gnome, $mushroom];
    const $randomItem = items[Math.floor(Math.random() * items.length)];
    console.log($randomItem);
    // $randomObject.push(randomItem);
    // console.log($randomObject);
    // $object.css({'width', 'height', 'background-image' : randomItem});
    // $object.css = (['width', 'height', 'background-image' : $randomItem]);

    $object.css({'class': $randomItem});
    console.log($object);

  }

});


// function chooseBall() {
//   const $ball = ['images/ball-blue.png', 'images/ball-green.png', 'images/ball-orange.png', 'images/ball-pink.png', 'images/ball-purple.png'];
// }

//set interval 2secs
//append a new div to the parent (game div)
//as you append - that div needs to have certain classes
