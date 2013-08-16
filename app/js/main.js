/*global $:false, jQuery:false, document:false, window:false */

$('head').append('<script src="js/circles.js"></script>');
$('head').append('<script src="js/library.js"></script>');

var screen_width = $(document).width();
var screen_height = $(document).height();
var center_x = screen_width / 2;
var center_y = screen_height / 2;
var currentState = '';
var parted = false;
var menu = [
  'Modern Technology',
  'Resources',
  'Technology Councils',
  'Tech Tax',
  'Minutes',
  'Schedule',
  'RSVP',
  'Mission'];
var resize = false;

$(window).on('resize', function() {
  if(!resize && $(window).width() > 500) {
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
});



init_page(function() {

  /*
     $(window).resize(function() {

     var w = $(window);
     console.log(w); 
     center_x = w.width()/2;
     center_y = w.height()/2;
     $('.left').css({left: center_x-60, top: center_y-34});
     $('.right').css({left: center_x+50, top: center_y-34});
     $('#myCanvas').css({width:w.width(),height:w.height()});
     });
     */

});


function changeState() {

  var state = window.location.hash.substring(2).split('/')[0];
  var content;

  if(state != currentState) {
    if($('#twitter-wjs')) { $('#twitter-wjs').remove(); }
    $('div#modal').hide();
    $('#banner').fadeOut();

    switch(state) {
      case 'Tech_Tax':
        partMenu();
        $.get('../ma-tech-tax-twitter.html', function(data) {
          $('#modal-content').html(data);
          $('div#modal').show(400);
        });
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
