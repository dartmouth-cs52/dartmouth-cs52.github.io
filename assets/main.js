
var codepenScript='//codepen.io/assets/embed/ei.js';

function tearDownRemark() {
  $("div[class^='remark-'],div[class*=' remark-']").remove();
  $('body').removeClass('remark-container');
  $('body').removeClass('remark-presenter-mode');
  $('html').removeClass('remark-container');
  removeEvents();
}

function fixToggle() {
  var $mainContent = $('.main-content');
  var $toggleSlide = $('#floating-button, #slides-button');
  var $firstGlyph = $toggleSlide.find('.first-glyph');
  if ($mainContent.is(":visible")) {
    $firstGlyph.removeClass('fa-times').addClass('fa-coffee');
  } else {
    $firstGlyph.removeClass('fa-coffee').addClass('fa-times');
  }
}

function onSlideToggle(event) {
  if (event) event.preventDefault();

  var $mainContent = $('.main-content');
  var $pageHeader = $('.page-header');
  if ($mainContent.is(":visible")) {
    // on r - reload codepen
    $(document).on('keypress.codepen', function(event) {
          if (event.charCode === 114) {
            console.log('reloading codepen');
            reloadScript(codepenScript);
          }
    });

    $pageHeader.hide();
    $mainContent.hide();
    remark.create({
      source: $('.slide').text(),
      highlightStyle: 'tomorrow'
    });
    fixToggle();
    // looks like needs to be reattached
    setSlideToggle();

    // reload codepen so it picks up changes
    // could do this more automatically perhaps with arrivejs
    // reloadScript(codepenScript);
    
    // render the math
    var slideAreas = $('.remark-slides-area');
    if (slideAreas.length > 0) {
      slideAreas.each(function(index, area) {
        renderMathInElement(area, {delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false},
          {left: "\\[", right: "\\]", display: true},
          {left: "\\(", right: "\\)", display: false},
        ]});
      })
    }

  } else {
    $(document).off('keypress.codepen');
    $pageHeader.show();
    $mainContent.show();
    fixToggle();
    tearDownRemark();
  }
}

function setSlideToggle() {
  var $toggleSlide = $('#floating-button, #slides-button');
  $toggleSlide.off();
  $toggleSlide.on('click', onSlideToggle);
}

function reloadScript(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}


// setup toggle and convert any slide markdown left over
// this is to workaround having markdown content specficially for slides
// but wanting the slides to render regularly on the page also
$('document').ready(function() {

  // this is a hack to capture all globally added events into a list and remove them at will
  var eventList = [];
  var bodyAddEventListener = document.body.addEventListener;
  var windowAddEventListener = window.addEventListener;

  document.body.addEventListener = function() {
      eventList.push([document.body, ...arguments])
      bodyAddEventListener.apply(this, arguments);
  };
  window.addEventListener = function() {
      eventList.push([window, ...arguments])
      windowAddEventListener.apply(this, arguments);
  };
  window.listEvents = function() {
    console.log(eventList);
  }
  window.removeEvents = function() {
    eventList.forEach(function(e) {
      e[0].removeEventListener(e[1],e[2]);
    })
  }


  $('body').append('<div class="slide" markdown="0"></div>');

  // pull in slides from separate file
  $.get('index_slides.md').done(function(result){
    $('.slide').text(result);
    reloadScript(codepenScript);

    if (window.location.hash) {
      console.log('slides mode detected');
      onSlideToggle();
    }
  }).fail(function(error) {
    console.log(error);
  }).always(function(result) {
    // render the math
    var mathAreas = $('.math');
    if (mathAreas.length > 0) {
      mathAreas.each(function(index, area) {
        renderMathInElement(area, {delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false},
          {left: "\\[", right: "\\]", display: true},
          {left: "\\(", right: "\\)", display: false},
        ]});
      })
    }
  });

  // failed attempt at duplicate content
  // var md = window.markitdown();
  // $('.slide:not(.hidden)').each(function(i, src) {
  //   $(src).after(md.render($(src).text()));
  // });

  setSlideToggle();

});
