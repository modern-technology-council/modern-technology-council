/* global $, document */


$.loadPanel = function(state,callback) {
  partMenu();
  $.get(state+'.html', function(data) {
    $('#banner')
    .hide()
    .html(data)
    .css({
      'z-index': 1,
      'height': $(document).height()*0.8
    })
  .fadeIn(function() {
    $(document).trigger( 'panelReady' );
    if(callback) { callback(); }
  });
  });
}; 

function partMenu() {
  if(parted === false) {
    parted = true;
    var headerHeight = $('#header').height() + 10;
    var x = headerHeight;
    var y = 2;
    $('.menu-circle').each(function(index, element) {
      $(element).animate({top:x,left:y,'z-index':1});
      jQuery.data(element, { top : $(element).position().top, left: $(element).position().left });
      x+=105;
      if(index>2 && y === 2) {
        y = $(window).width() - 105;
        x = headerHeight; 
      }
    });
  }
}

function returnMenu() {
  var originalPosition;
  $('.menu-circle').each(function(index, el) {
    originalPosition = jQuery.data( el );
    $(el).animate({top:originalPosition.top, left:originalPosition.left,'z-index':'-1'});
  });
  parted = false;
}

var drawTiles = function(list, callback) {
  var state = window.location.hash.substring(2).split('/');
  $.each(list, function(index,obj) {
    var link = '';
    if(obj.link.length>0) {
      link = '  <a href="'+obj.link+'"><span class="glyphicon glyphicon-link"></span></a>  ';
    }
    var tile = $('<div class="well col-3 tech-tile" data-popout="' + obj.dataPopover + '"><h5 class="clearfix">'+obj.name+link+'</h5></div>');
    tile.draggable({
      helper: 'clone',
      revert: true,
      start: function(e) {
        $('.ui-draggable-dragging').off('click')
        $('.ui-draggable-dragging').width(tile.width());
        $('.ui-draggable-dragging').data('title', obj.name);
        $('.ui-draggable-dragging').data('link', '#/' + state[0] + '/' +obj.name.replace(/\s/g, '_'))
      }
    });
    var clicker = function(e) {
      tile.off('click')
      console.log('clicked');
      window.location.hash = '#/' + state[0] + '/' + obj.name.replace(/\s/g, '_')
      _gaq.push(['_trackEvent', 'Panel', obj.name, 'Show More in Ma Tech Tax']);
      e.stopPropagation();
      var self = $(this);
      $(document).off('.popout-remove');
      $('.popout').html($('.popout').data('origHtml'));
      $('.popout').animate($('.popout').data('origCss'), function(){
        $(this).remove();
      });   
      var moveDiv = $('<div class="popout well">');
      moveDiv.html($(this).html());
      var exit = $('<span class="glyphicon glyphicon-remove popout-remove">');
      exit.on('click', function(){
        window.location.hash = '#/' + state[0]
        $(document).off('.popout-remove');
        $('.popout').html($('.popout').data('origHtml'));
        $('.popout').animate($('.popout').data('origCss'), function(){
          $(this).remove();
        });   
      });
      moveDiv.append(exit);
      moveDiv.data('origHtml', $(this).html());
      var extra = $(obj.dataPopover).html();
      $('body').append(moveDiv);
      var origCss = {
        left: self.position().left,
        top: self.position().top,
        width: self.outerWidth(),
        height: self.outerHeight()
      };
      moveDiv.css(origCss);
      moveDiv.data('origCss', origCss);
      var size = (-5/264) * $(window).width() + 950/11
      size = ((size > 75) ? 75 : size)
      size = ((size < 50) ? 50 : size)
      moveDiv.animate({width: size + '%', height: size + '%', top: ((100 - size)/2) + '%', left: ((100-size)/2) + '%'}, function() {
          tile.on('click', clicker);
          $(this).append(extra);
          var max = $(this).find('.panel-heading').outerHeight();
          $(this).find('.panel-heading').outerHeight(max);
          console.log(max);
          $(this).find('.panel-body').css({top: max});
          $(window).on('resize', function() {
            var size = (-5/264) * $(window).width() + 950/11
            size = ((size > 75) ? 75 : size)
            size = ((size < 50) ? 50 : size)
            moveDiv.css({width: size + '%', height: size + '%', top: ((100 - size)/2) + '%', left: ((100-size)/2) + '%'});
          });
          $(document).on('click.popout-remove', function(){
            console.log('click');
            window.location.hash = '#/' + state[0]
            $('.popout').html(self.html());
            $('.popout').animate(origCss, function(){
              $(this).remove();
            });
            $(document).off('.popout-remove');
          });
        });
      moveDiv.on('click', function(e){
        e.stopPropagation();
      });
    }
    tile.appendTo('#current-technology')
    .on('click', clicker)
    .find('a').on('click',function(e) {
      e.stopPropagation();
      document.location.href=$(this).attr('href');
    });  
    if(obj.name.replace(/\s/g, '_') === state[1]) {
      $(document).on('tileResized', function() {
          tile.click();
      });
    }
    $(window).on('hashchange', function() {
       var state = window.location.hash.substring(2).split('/');
       if(state[1] === obj.name.replace(/\s/g, '_'))
         tile.click();
    });
  });
  if(callback){
    //$('.tech-tile h5').ready(callback);
  }
  $(document).on('panelReady', function() {
    var max = $('.tech-tile').height() + 25*2;
    console.log(max);
    $('.tech-tile').outerHeight(max)
    $(document).trigger('tileResized');
  });
};
function validate(target) {
  //$('input').data('intervalRunning', false);
  //If you're fast enough, you can submit with empties. ;)
  $(target + ' :input').each(function () {
    if ($(this).val() === '' && !$(this).data('intervalRunning')) {
      $.validated = false;
      var i = 255;
      var ease = 0;
      var j = 0;
      var eain = true;
    $(this).data('intervalRunning', true);
  var self = this;
  var it = setInterval(function () {
    $(self).css('background', 'rgb(255, 255,' + i + ')');
      ease = -0.5 * (j * j) + 50;
      if (ease < 1) { ease = 1; }
      if (eain) { 
        i = Math.round(i - ease);
      }else{
        i = Math.round(i + ease);
      }
      j++;
      if (i < 0) {
        $(self).css('background', 'rgb(255, 255, 0)');
        eain = false;
        ease = 0;
        j = 0;
        i = 0;
      } else if (i > 255) {
        $(self).css('background', 'rgb(255, 255, 255)');
        $(self).data('intervalRunning', false);
        clearTimeout($(self).data('it'));

      }
      }, 110);
    $(this).data('it', it);
    } else if ($(this).data('intervalRunning') && $(this).val() !== '') {
      clearTimeout($(this).data('it'));
      $(this).css('background', 'rgb(255, 255, 255)');
      $(this).data('intervalRunning', false);
    }
  });
}

function getFavorites() {
  var favString = localStorage["favorites"];
  if(favString != undefined || favString != null)
    return JSON.parse(localStorage["favorites"]);
  else
    return [];
}

function addFavorite(title, link) {
  var favorites = getFavorites();
  var exists = false;
  var added = false;
  for (i in favorites) {
    if (favorites[i].link === link)
    {
      exists = true;
      break;
    }
  }
  console.log(favorites);
  if (!exists && link != undefined && title != undefined)
  {
    favorites.push({link: link, title: title});
    added = true;
  }
  console.log(favorites);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  return added;
}


function removeFavorite(loc) {
  var favorites = getFavorites();
  favorites.splice(loc, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function prepFavorites() {
  var favorites = getFavorites();
  if (favorites.length > 0) {
    var $favorites = $('#favorites');
    $favorites.on('click', function(){
      var self = $(this);
      $(document).off('.popout-remove');
      $('.popout').html($('.popout').data('origHtml'));
      $('.popout').animate($('.popout').data('origCss'), function(){
        $(this).remove();
      });   
    });
    $favorites.show();
    $favorites.find('ul').html('');
    $.each(favorites, function(key){
      console.log(this);
      var self = this;
      var link = $('<li><a>' + self.title + '<span class="glyphicon glyphicon-remove pull-right fav-glyph"></span></a></li>');
      link.find('a').on('click', function(e) {
        console.log('in here');
        window.location = self.link; 
      });
      link.find('.glyphicon').on('click', function(e) {
        e.stopPropagation();
        removeFavorite(key);
        prepFavorites();
      });
      $favorites.find('ul').append(link);
    });
  } else {
    $('#favorites').hide();
  }
}

function init_page() {

  setTimeout(function () {
    draw_menu_circles(center_x, center_y, 175, function() {
      if(document.location.hash.length > 2) {
        setTimeout(function() {
          parted=false;
          partMenu();
        },2000);
      } 
    });
  }, 4000);


  if(document.location.hash.length > 0) {
    changeState();
  }

  $('<span class="left brackets">{</span>').appendTo('body').hide();
    $('<span class="right brackets">}</right>').appendTo('body').hide();
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

  prepFavorites();

  $('#header').droppable({
    tolerance: 'touch',
    drop: function(e) {
      var data = $(e.toElement).data();
      $(e.toElement).remove();
      var added = addFavorite(data.title, data.link);
      if (added) {
        prepFavorites();
        $('#favorites button').effect('highlight', 1000);
      }
    }
  });

}
