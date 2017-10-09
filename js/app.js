

$(() => {

  const $dog = $('.dog');
  const $objects = $('.object');
  const $game = $('.game');


  //functionality to use arrow keys
  setInterval(moveDog, 1);
  const keys = {};
  $(document).keydown(function(e) {
    keys[e.keyCode] = true;
    console.log(keys);
  });
  $(document).keyup(function(e) {
    delete keys[e.keyCode];
  });

  //***----FUNCTIONS----***

  function moveDog() {
    const maxLeft     = $game.width() - 100;
    const dogPosition = $dog.position().left;

    for (const direction in keys) {
      if (dogPosition > 0 && dogPosition < 500) {
        if (direction == 37) {
          $dog.animate({left: '-=1'}, 0);
        } else if (direction == 39) {
          $dog.animate({left: '+=1'}, 0);
        }
      } else if (dogPosition === 500) {
        $dog.animate({left: '-=1'}, 0);
      } else {
        $dog.animate({left: '+=1'}, 0);
      }
    }
  }

  console.log($objects);
  $objects.animate({top: '+=5'}, 0);


});
