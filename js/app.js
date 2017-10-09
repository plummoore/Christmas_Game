

$(() => {

  const $dog = $('.dog');
  const $object = $('.object');
  const $game = $('.game');
  const $document = $(document);


  $document.keydown(function(e){
    // const dogPosition = $dog.position().left;
    // console.log(dogPosition);
    // if (dogPosition > 0 && dogPosition < 500) {
    switch (e.which){
      case 37:    //left arrow key
        $dog.animate({ left: '-=50'});
        break;
      case 39:    //right arrow key
        $dog.finish().animate({left: '+=50'});
        break;
    }
  });






  // setInterval(moveDog, 1);
  // const keys = {};
  // $(document).keydown(function(e) {
  //   keys[e.keyCode] = true;
  //   console.log(keys);
  // });
  // $(document).keyup(function(e) {
  //   delete keys[e.keyCode];
  // });

  //***----FUNCTIONS----***

  // function moveDog() {
  //   const maxLeft     = $game.width() - 100;
  //   const dogPosition = $dog.position().left;
  //
  //   if (dogPosition > 0 && dogPosition < 500) {
  //     if (keydown == 37) {
  //       $dog.animate({left: '-=1'}, 0);
  //     } else if (keydown == 39) {
  //       $dog.animate({left: '+=1'}, 0);
  //     }
  //   } else if (dogPosition === 500) {
  //     $dog.animate({left: '-=1'}, 0);
  //   } else {
  //     $dog.animate({left: '+=1'}, 0);
  //   }
  // };



  // function moveDog() {
  // const maxLeft     = $game.width() - 100;
  // const dogPosition = $dog.position().left;

  // if (dogPosition > 0 && dogPosition < 500) {
  //   if (e.which == 37) {
  //   $dog.animate({left: '-=1'}, 0);
  // } else if (e.which == 39) {
  //   $dog.animate({left: '+=1'}, 0);
  // }
  // } else if (dogPosition === 500) {
  //   $dog.animate({left: '-=1'}, 0);
  // } else {
  //   $dog.animate({left: '+=1'}, 0);
  // }



  // function fallingObject(){
  //   const randomStart = Math.floor(Math.random()*600);
  //   $object.css({'margin-left': randomStart});

  function fallAnimate(){
    const randomWidth = Math.floor(Math.random()*545);
    $object.css({'margin-left': randomWidth});

    $object.animate({
      top: '+=500'
    }, {
      duration: 5000,
      complete: function() {
        $( this ).after($object.remove());
      }
    });
  }

  fallAnimate();


});
