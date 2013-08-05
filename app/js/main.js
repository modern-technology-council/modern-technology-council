/*global $:false, jQuery:false, document:false, window:false */

function draw_circles(c, x, y, set_radius) {


  c.clearRect(0, 0, $(window).width(), $(window).height() );


  var circle_radius = 35;
  var number_of_circles = 8;

  var step_angle = ( Math.PI * 2 ) / number_of_circles;
  var starting_angle = ( Math.PI * 2 / 360 ) * 18;


  // centers of circles

  for (var i = 0; i < number_of_circles; i++) {

    var angle = starting_angle + ( step_angle * i );

    var px = x + ( Math.sin(angle) * set_radius );
    var py = y + ( Math.cos(angle) * set_radius );

    c.lineWidth = 7;
    c.beginPath();
    c.arc(px, py, circle_radius, 0, Math.PI*2, true);
    c.closePath();
    c.stroke();

  }

}

function init_page() {
  $('span').hide();
  var screen_width = $(document).width();
  var screen_height = $(document).height();
  $('body').append('<canvas id="myCanvas" width="' + screen_width + '" height="' + screen_height + '" />');

  var center_x = screen_width / 2;
  var center_y = screen_height / 2;

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



init_page();


