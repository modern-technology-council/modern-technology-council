
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

function draw_menu_circles(x, y, set_radius, callback) {

  var number_of_circles = 8;
  var step_angle = (Math.PI * 2) / number_of_circles;
  var starting_angle = (Math.PI * 2 / 360) * 18;

  function addMenuCircleTransition(element) {
    $(this).addClass('menu-circle-transition');   
    $(this).on('click', function() {
      document.location.href = $(this).find('a').attr('href');
    });
  }
  //
  // centers of circles
  for (var i = 0; i < number_of_circles; i++) {

    var angle = starting_angle + (step_angle * i);

    var px = x + (Math.sin(angle) * set_radius);
    var py = y + (Math.cos(angle) * set_radius);


    $('<div class="menu-circle" id="menu-'+i+'"><a href="/#/' + menu[i].replace(/ /g,'_')+ '">'+menu[i]+'</a></div>')
      .css({
        top: (pos_y - 50 + 300) + 'px',
        left: (pos_x - 50 + 300) + 'px'})
      .appendTo('body').animate({
        top: (py - 50) + 'px',
      left: (px - 50) + 'px',
      opacity: 1
      }, 1000, addMenuCircleTransition);
  }
  if(callback){
    callback();
  }
}


function redraw_menu_circles(x, y, set_radius, callback) {
  var number_of_circles = $('.menu-circle').length
  var step_angle = (Math.PI * 2) / number_of_circles;
  var starting_angle = (Math.PI * 2 / 360) * 18;
  var i = 0
  // centers of circles
  $('.menu-circle').each( function(){

    var angle = starting_angle + (step_angle * i);

    var px = x + (Math.sin(angle) * set_radius);
    var py = y + (Math.cos(angle) * set_radius);


   $(this) 
      .css({
        top: (py - 50) + 'px',
      left: (px - 50) + 'px',
      opacity: 1
      }, 1000);
  i++;
  });
  if(callback){
    callback();
  }
}
