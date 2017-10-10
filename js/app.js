let $dog;

$(() => {

  const $dog = $('.dog');
  const $object = $('.object');
  const $game = $('.game');


  $(document).on('keydown', handleKeyCode);
  fallAnimate();



  //***----FUNCTIONS----***

  function handleKeyCode(e) {
    const dogLeftValue = parseInt($dog.css('left'));

    if (e.keyCode === 37 && dogLeftValue !== 0)   handlePlayerMovement('-');
    if (e.keyCode === 39 && dogLeftValue !== 500) handlePlayerMovement('+');
  }


  function handlePlayerMovement(operation) {
    $dog.animate({ 'left': `${operation}=20` }, 0);
  }

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




});
