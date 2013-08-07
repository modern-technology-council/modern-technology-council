/*global $:false, jQuery:false, document:false, window:false */

var screen_width = $(document).width();
var screen_height = $(document).height();
var center_x = screen_width / 2;
var center_y = screen_height / 2;

function changeState() {

  var state = location.hash.substring(1);

  if($('#twitter-wjs')) $('#twitter-wjs').remove();

  switch(state) {
    case '/Tech_Tax':
      $.get('../ma-tech-tax-twitter.html', function(data) {
        $('#modal-content').html(data);
        $('div#modal').show(400);
      });
      break;

    case '/Minutes':
      $('#modal-content').html('<iframe src="https://docs.google.com/document/d/10TKDRNRwbHY54qcdn-4vPyHChqmejl0CwinRQsgiklM/pub?embedded=true"></iframe>');
      $('div#modal').show(400);
      break;

    default:  
      $('.close').parent().hide(function() {
        location.hash='/'; 
      });
  }

}

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

  console.log(document.location.hash);

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

function draw_menu_circles(x, y, set_radius) {

  var menu = [
    '&#8734',
  '&#8734',
  '&#8734',
  'Tech Tax',
  'Minutes',
  '&#8734',
  '&#8734',
  '&#8734'];

  var number_of_circles = 8;
  var step_angle = (Math.PI * 2) / number_of_circles;
  var starting_angle = (Math.PI * 2 / 360) * 18;

  function addMenuCircleTransition(element) {
    $(element).addClass('menu-circle-transition');   
  }
  //
  // centers of circles
  for (var i = 0; i < number_of_circles; i++) {

    var angle = starting_angle + (step_angle * i);

    var px = x + (Math.sin(angle) * set_radius);
    var py = y + (Math.cos(angle) * set_radius);


    $('<a href="/#/'+menu[i].replace(' ','_')+'" class="menu-circle" id="menu-' + i + '">' + menu[i] + '</a>')
      .css({
        top: (center_y - 50) + 'px',
        left: (center_x - 50) + 'px'})
      .appendTo('body').animate({
        top: (py - 50) + 'px',
      left: (px - 50) + 'px',
      opacity: 1
      }, 1000, addMenuCircleTransition(this));
  }
}

init_page();


setTimeout(function () {
  draw_menu_circles(center_x, center_y, 175);
}, 4000);

$(window).on('hashchange', function() { changeState(); });

$('.close').on('click', function() {
  $('.close').parent().hide(function() {
    document.location.hash='/'; 
  });
});

$(document).on('click', function() {
  $('div#modal').hide(function() {
    document.location.hash='/';
  });
});

$('#modal-content').on('click', function(e) {
  e.stopPropagation();
});

/*
$('#modal-content').on('click', function(e) {
  console.log('stopProgagation()');
  $(e).stopProgagation();
});
*/
