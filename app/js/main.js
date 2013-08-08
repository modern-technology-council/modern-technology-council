/*global $:false, jQuery:false, document:false, window:false */

$('head').append('<script src="js/circles.js"></script>');
$('head').append('<script src="js/library.js"></script>');

var screen_width = $(document).width();
var screen_height = $(document).height();
var center_x = screen_width / 2;
var center_y = screen_height / 2;
var parted = false;
var menu = [];



init_page();


function changeState() {

  var state = window.location.hash.substring(1);

  if($('#twitter-wjs')) { $('#twitter-wjs').remove(); }
  $('#div#modal').hide();

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


