$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = (function (el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

! function (window) {
  var $q = function (q, res) {
      if (document.querySelectorAll) {
        res = document.querySelectorAll(q);
      } else {
        var d = document,
          a = d.styleSheets[0] || d.createStyleSheet();
        a.addRule(q, 'f:b');
        for (var l = d.all, b = 0, c = [], f = l.length; b < f; b++)
          l[b].currentStyle.f && c.push(l[b]);

        a.removeRule(0);
        res = c;
      }
      return res;
    },
    addEventListener = function (evt, fn) {
      window.addEventListener ?
        this.addEventListener(evt, fn, false) :
        (window.attachEvent) ?
        this.attachEvent('on' + evt, fn) :
        this['on' + evt] = fn;
    },
    _has = function (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };

  function loadImage(el, fn) {
    var img = new Image(),
      src = el.getAttribute('data-src');
    img.onload = function () {
      if (!!el.parent)
        el.parent.replaceChild(img, el)
      else
        el.src = src;

      fn ? fn() : null;
    }
    img.src = src;
  }

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect()

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  var images = new Array(),
    query = $q('[lazy]'),
    processScroll = function () {
      for (var i = 0; i < images.length; i++) {
        if (elementInViewport(images[i])) {
          loadImage(images[i], function () {
            images.splice(i, i);
          });
        }
      };
    };
  // Array.prototype.slice.call is not callable under our lovely IE8 
  for (var i = 0; i < query.length; i++) {
    images.push(query[i]);
  };

  processScroll();
  addEventListener('scroll', processScroll);

}(this)

$(window).resize( function(){
  if(!isMobile()){
    closeNav();
  }
  
})
// check if is mobile view or not 
function isMobile() {
  if($( window ).width()<812){
    return true;
  }
  return false;
}

$('.MainNav .nav-navbar li, .card, .tab, .indentImg img,.bubbles img,.logo').hover(function () {
  if(isMobile()){
    return;
  }
  $(this).animateCss('pulse');
});

function closeNav(){
  if($('body').hasClass('show-overlay')){
    $('.nav-navbar').animateCss('wobble');
    setTimeout(function(){
      $('.nav-navbar').removeClass('show');
      $('body').removeClass('show-overlay'); 
      $('.nav-navbar').removeClass('animated wobble')
    },100)
  }

}
$('body').on('click',".overlay", function(){ 
  if(!isMobile()){
    return;
  }
  closeNav();

});
$('body').on('click','[data-toggle]', function(){
  if(!isMobile()){
    return;
  }
  var classSelector = $(this).attr('data-toggle');
  $('.'+classSelector).toggleClass('show');
  $('.nav-navbar').animateCss('bounceInRight');
  $('body').toggleClass('show-overlay');

})