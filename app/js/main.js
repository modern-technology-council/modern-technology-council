/*global $:false, jQuery:false, document:false, window:false */


var screen_width = $(window).width();
var screen_height = $(window).height();
//var center_x = screen_width / 2;
//var center_y = screen_height / 2;
var pos_x = screen_width/2 - 300
var pos_y = screen_height/2 - 300
var center_x = 300;
var center_y = 300;
var currentState = '';
var parted = false;
var menu = [
  'Modern Technology',
  'Resources',
  'News and About',
  'Seminar Registration',
  'Minutes',
  'Schedule',
  'Stay Informed',
  'Mission'];
var resize = false;
var resizeOveride = true;

$(window).on('resize', function() {
  if(!resize && !resizeOveride && $(window).width() > 500) {
    resize=true;
    $.get('modal-bootstrap.html', function(data) {
      $(data).appendTo('body')
      .on('hidden.bs.modal', function() {
        console.log('hidden');
        document.location.reload();
      });
    });
    setTimeout(function() {
      $('#dialog-modal').modal('toggle'); 
    },1000);
  }
  else {
    screen_width = $(window).width();
    screen_height = $(window).height();
    pos_x = screen_width/2 - 300
    pos_y = screen_height/2 - 300
    $('#myCanvas').css({
      left: pos_x,
      top: pos_y
    });
    $('.left').css({left: pos_x-70+300, top: pos_y-44+300});
    $('.right').css({left: pos_x+45+300, top: pos_y-44+300});
    if (!parted) {
      redraw_menu_circles(pos_x+300, pos_y+300, 175);
    }
    else {
      var headerHeight = $('#header').height() + 10;
      var x = headerHeight;
      var y = 2;
      var i = 0;
      var number_of_circles = $('.menu-circle').length
      var step_angle = (Math.PI * 2) / number_of_circles;
      var starting_angle = (Math.PI * 2 / 360) * 18;
      $('.menu-circle').each(function(index, element) {
        var angle = starting_angle + (step_angle * i);
        var px = pos_x+300 + (Math.sin(angle) * 175);
        var py = pos_y+300 + (Math.cos(angle) * 175);
        jQuery.data(element, { top : py - 50, left: px - 50 });
        $(element).css({top:x,left:y,'z-index':1});
        x+=105;
        if(index>2 && y === 2) {
          y = $(window).width() - 105;
          x = headerHeight; 
        }
        i++;
      });
    }
  }
});



init_page();


function changeState() {

  var state = window.location.hash.substring(2).split('/')[0];
  var content;

  if(state != currentState) {
    if($('#twitter-wjs')) { $('#twitter-wjs').remove(); }
    $('div#modal').hide();
    $('#banner').fadeOut();

    console.log(state)
    switch(state) {
      case 'News_and_About':
        window.location = 'http://news.alt236.org/';
        break;
      
      case 'Seminar_Registration':
        window.location = 'http://mtcouncil-free-1.eventbrite.com/';
        break;

      case 'Minutes':
        partMenu();
        $('#modal-content').html('<iframe src="https://docs.google.com/document/d/10TKDRNRwbHY54qcdn-4vPyHChqmejl0CwinRQsgiklM/pub?embedded=true"></iframe>');
        $('#modal-content').prepend('<button><span class="glyphicon glyphicon-print"></span> Printable Version</button>')
          .on('click', function() {
            // here comes the ugly (for now)
            alert('Use Ctrl+P on the next window');
            var height = $(window).height();
            var width = $(window).width()*.8;
            window.open('https://docs.google.com/document/d/10TKDRNRwbHY54qcdn-4vPyHChqmejl0CwinRQsgiklM/pub','print',
              'height='+height+',width='+width+',top=0,left=0,toolbar=yes,location=yes');
          });
        $('div#modal').show(400);
        break;

      case 'Technology_Councils':
        $.loadPanel(state);
        break; 

      case 'Schedule':
        $.loadPanel(state);
        break;

      default:  
        // BAD!!
        // Check if file exists and load on success.
        // TODO: check if requesting file or if hashtag is empty
        $.get(state+'.html').done(function() {
          $.loadPanel(state);
        }).fail(function() {
          $('.close').parent().hide(function() {
            window.location.hash='/'; 
          });
        });
    }
  }
  currentState = state

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

$(document).ready(function() {
  var taglines = $('#mission p');
  if( !taglines.hasClass('active') ) {
    taglines.first().addClass('active');
  }
  setInterval(function() {
    taglines.each(function(index, el){

      if($(el).hasClass('active')){
        //are we at the end of the list?
        if(index == taglines.length - 1){
          $(el).fadeOut(function() {
            $(this).removeClass('active');
            $(taglines[0]).fadeIn().addClass('active');   
          });
        }else{
          $(el).fadeOut(function() {
            $(this).removeClass('active').next().fadeIn().addClass('active');
          });
        } 

      }
    });
  },8000);


});
