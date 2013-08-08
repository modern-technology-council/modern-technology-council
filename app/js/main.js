/*global $:false, jQuery:false, document:false, window:false */

$('head').append('<script src="js/circles.js"></script>');
$('head').append('<script src="js/library.js"></script>');

var screen_width = $(document).width();
var screen_height = $(document).height();
var center_x = screen_width / 2;
var center_y = screen_height / 2;
var parted = false;
var menu = [];



init_page(function() {

// RESERVED 
/*
 var w = $(window);
 var removed = false;
 var added = false;
 w.resize(function() {
  console.log( w.height() + ':' + w.width() );
  if(!removed && !added) {
    if($('link[href="/css/responsive-medium.css"]').length > 0) {
      added = true;
    }else{
      removed = true;
    }
  }
  if(w.width() <= 1100 && !added) {
    $('<link href="/css/responsive-medium.css" rel="stylesheet">').appendTo('head');
    added = true;
    removed = false;
  }
  if(w.width() >= 1101 && !removed) {
    $('link[href="/css/responsive-medium.css"]').remove();
    removed = true;
    added = false;
  }
 }); 
 */
});


function changeState() {

  var state = window.location.hash.substring(1);

  if($('#twitter-wjs')) { $('#twitter-wjs').remove(); }
  $('div#modal').hide();
  $('#banner').fadeOut();


  switch(state) {
    case '/Tech_Tax':
      partMenu();
      $.get('../ma-tech-tax-twitter.html', function(data) {
        $('#modal-content').html(data);
        $('div#modal').show(400);
      });
      break;

    case '/Minutes':
      partMenu();
      $('#modal-content').html('<iframe src="https://docs.google.com/document/d/10TKDRNRwbHY54qcdn-4vPyHChqmejl0CwinRQsgiklM/pub?embedded=true"></iframe>');
      $('div#modal').show(400);
      break;

    case '/Technology_Councils':
      var content = '<div><h2>Collaborative efforts in progress.</h2></div>';
      $('#banner')
        .hide()
        .html(content)
        .fadeIn(800); 
      break; 

    default:  
      $('.close').parent().hide(function() {
        window.location.hash='/'; 
      });
  }

}

$(window).on('hashchange', function() { changeState(); });

$('.close').on('click', function() {
  $('.close').parent().hide(function() {
    document.location.hash='/'; 
  });
  returnMenu();
});


$('#modal-content').on('click', function(e) {
  e.stopPropagation();
});


