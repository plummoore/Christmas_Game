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
  var keys = {}

  $(document).keydown(function(e) {
    keys[e.keyCode] = true;
  });

  $(document).keyup(function(e) {
    delete keys[e.keyCode];
  });

  function moveDog() {

    for (const direction in keys) {
      if (!keys.hasOwnProperty(direction)) continue;
      if (direction == 37) {
        $dog.animate({left: '-=5'}, 0).stop({left: '==0'});
    
      }
      if (direction == 39) {
        $dog.animate({left: '+=5'}, 0).stop({right: '==500'});
      }
    }
  }





});
