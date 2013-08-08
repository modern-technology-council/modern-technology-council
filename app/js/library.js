 
function partMenu() {
  if(parted === false) {
    parted = true;
    var x = 0;
    var y = 0;
    $('.menu-circle').each(function(index, element) {
      //menu[index].top = $(element).position().top;
      //menu[index].left = $(element).position().left;
      $(element).animate({top:x,left:y});
      jQuery.data(element, { top : $(element).position().top, left: $(element).position().left });
      x+=100;
      if(index>2 && y === 0) {
        y = $(window).width() - 101;
        x = 0;
      }
    });
  }
}

function returnMenu() {
  var originalPosition;
  $('.menu-circle').each(function(index, el) {
    originalPosition = jQuery.data( el );
    $(el).animate({top:originalPosition.top, left:originalPosition.left});
  });
  parted = false;
}



function init_page() {

  setTimeout(function () {
    draw_menu_circles(center_x, center_y, 175);
  }, 4000);


  if(document.location.hash.length > 0) {
    changeState();
  }

  $('<span class="left">{</span>').appendTo('body').hide();
  $('<span class="right">}</right>').appendTo('body').hide();
  $('body').append('<canvas id="myCanvas" width="' + screen_width + '" height="' + screen_height + '" />');


  var c = $('#myCanvas')[0].getContext("2d");

  var logo_radius = 200;
  var logo_velocity = 20;
  var interval;
  var mover = 0;

  var engine = function () {
    c.clearRect(0, 0, 1000, 1000);
    c.beginPath();
    c.moveTo(center_x-1, center_y+34-mover);
    c.bezierCurveTo(center_x+47, center_y+34, center_x+47, center_y-34, center_x-1, center_y-34+mover);
    c.stroke();
    c.beginPath();
    c.moveTo(center_x, center_y+34-mover);
    c.bezierCurveTo(center_x-48, center_y+34-(mover*2), center_x-48, center_y-34+(mover*2), center_x, center_y-34+mover);
    mover+=1;
    c.stroke();
    if (mover > 35) {
      clearInterval(interval);
      $('.left').css({left: center_x-60, top: center_y-34});
      $('.right').css({left: center_x+50, top: center_y-34});
      $('span').fadeIn(700);
    }
  };



  interval = setInterval(function() { draw(); }, 50);

  var alpha = 0;

  function draw() {
    c.strokeStyle = "rgba(0, 0, 0," + alpha + ")";
    draw_circles(c, center_x, center_y, logo_radius);
    alpha+=0.1;
    if (alpha > 0.5) { alpha = 0.5; }
    if (logo_radius === 0) { 

      clearInterval(interval); 
      c.strokeStyle = "rgba(0, 0, 0, 1)";
      engine();
      interval = setInterval(engine, 25);

    }

    logo_radius = logo_radius - logo_velocity;

    if (logo_radius < 0) { logo_radius = 0; }

    logo_velocity = logo_velocity * 0.90;

    if (logo_velocity < 1) { logo_velocity = 1; }

  }


}
