$(() => {

  const $dog = $('.dog');
  const $grass = $('.grass');

  // $(document).keyup(function (e) {
  //   if (e.keyCode === 37) {
  //     console.log('left');
  //     $dog.animate({'left': '+=20'}, 'slow');
  //   } else if (e.keyCode === 39) {
  //     console.log('right');
  //     $dog.animate({'right': '+=20'}, 'slow');
  //   }
  // });

  setInterval(moveDog, 20);
  var keys = {};

  $(document).keydown(function(e) {
    keys[e.keyCode] = true;
  });

  $(document).keyup(function(e) {
    delete keys[e.keyCode];
  });

  function moveDog() {

    const maxLeft = $grass.width();
    const dogPosition = $dog.position().left;

    for (const direction in keys) {
      if (!keys.hasOwnProperty(direction)) continue;

      if (direction == 37) {
        if (dogPosition > maxLeft) {
          $dog.animate({left: '-=5'}, 0);
        }
      }else if (direction == 39) {
        $dog.animate({left: '+=5'}, 0);
      }


      //
      // if (dogPosition.left <= 500) {
      //   console.log('Im still working');

      // $dog.each( function(){
      //   var dogPos = $(this).position();
      //   $grass.each( function(){
      //     var grassPos = $(this).position();
      //     if( dogPos.left === grassPos.left){
      //       console.log('hit');
      //     }
      //     console.log(dogPos);
      //     console.log(grassPos);
      //   });
      // });

    }
  }

});

// $dog.each( function(){
//   var dogOffset = $(this).offset();
//   $grass.each( function(){
//     var grassOffset = $(this).offset();
//     if( dogOffset.left === grassOffset.left){
//       console.log('hit');
//       console.log(dogOffset);
//     }
//   });
// });
