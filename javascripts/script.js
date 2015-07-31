(function($) {
  $(document).ready(function(){

  // putting lines by the pre blocks
  $("pre").each(function(){
    var pre = $(this).text().split("\n");
    var lines = new Array(pre.length+1);
    for(var i = 0; i < pre.length; i++) {
      var wrap = Math.floor(pre[i].split("").length / 70)
      if (pre[i]==""&&i==pre.length-1) {
        lines.splice(i, 1);
      } else {
        lines[i] = i+1;
        for(var j = 0; j < wrap; j++) {
          lines[i] += "\n";
        }
      }
    }
    $(this).before("<pre class='lines'>" + lines.join("\n") + "</pre>");
  });

  var headings = [];

  var collectHeaders = function(){
    headings.push({"top":$(this).offset().top - 15,"text":$(this).text()});
  }

  if($(".markdown-body h1").length > 1)
    $(".markdown-body h1").each(collectHeaders)
  else if($(".markdown-body h2").length > 1)
    $(".markdown-body h2").each(collectHeaders)
  else if($(".markdown-body h3").length > 1)
    $(".markdown-body h3").each(collectHeaders)

  $(window).scroll(function(){
    if(headings.length==0) return true;
    var scrolltop = $(window).scrollTop() || 0;
    if(headings[0] && scrolltop < headings[0].top) {
      $(".current-section").css({"opacity":0,"visibility":"hidden"});
      return false;
    }
    $(".current-section").css({"opacity":1,"visibility":"visible"});
    for(var i in headings) {
      if(scrolltop >= headings[i].top) {
        $(".current-section .name").text(headings[i].text);
      }
    }
  });

  $(".current-section a").click(function(){
    $(window).scrollTop(0);
    return false;
  });

  (function() {
    $(function() {
      return $("#invitationForm").on("submit", function(e) {
        var serialized, xhr;
        e.preventDefault();
        $("#invitationFormSuccess").hide();
        $("#invitationFormFail").hide();
        serialized = $("#invitationForm").serialize();
        $("#invitationForm").find("input").prop("disabled", "disabled");
        xhr = $.post("https://ancient-bayou-8275.herokuapp.com/invitations", serialized);
        xhr.done(function() {
          return $("#invitationFormSuccess").show();
        });
        xhr.fail(function() {
          return $("#invitationFormFail").show();
        });
        return xhr.always(function() {
          return $("#invitationForm").find("input").prop("disabled", "");
        });
      });
    });
  }).call(this);

  $("#invitationFormSuccess").hide();
  $("#invitationFormFail").hide();

  if ($(window).width() > 805) {
  // $(window).resize(function() {
    // if ($(this).width() > 768) {
      // console.log($(this).width());
      if ($('.main-header').length > 0) {
        var mainbottom = $('.main-header').offset().top + $('.main-header').height();
        $(window).on('scroll', function() {
          console.log('scolling');
          var stopWindow = Math.round($(window).scrollTop()) + $('.menu-area').outerHeight();
          conditionNavbar(stopWindow, mainbottom);
        });
      }
    // } else {
      // $(window).on('scroll', function() {});
    }
  // });

  //Check Navbar Show
  if ($('.main-header').length > 0) {
    var mainbottom = $('.main-header').offset().top + $('.main-header').height();
    var stopWindow = Math.round($(window).scrollTop()) + $('.menu-area').outerHeight();
    conditionNavbar(stopWindow, mainbottom);
  }

  //animate jump to anchor
  // $('.link-inpage').click(function(e) {
  //   var target = this.hash, $target = $(target);
  //   $('html, body').stop().animate({
  //     'scrollTop': $target.offset().top - ($('.menu-area').outerHeight() - 1)
  //   }, 1500, 'easeInOutExpo', function() {
  //       //window.location.hash = target;
  //     });
  //   return false;
  // });

  //Animate jump to #top
  $('.back-to-top').click(function() {
    $('html, body').stop().animate({
      'scrollTop': 0
    }, 1500, 'easeInOutExpo', function() {
    });
    return false;
  });

  //Condition Navbar
  function conditionNavbar(stopWindow, mainbottom) {
    if (stopWindow > mainbottom)
      $('.menu-area').addClass('nav-fixed');
    else
      $('.menu-area').removeClass('nav-fixed nav-white-bg');
    
    // if ((stopWindow) > $('.menu-area').outerHeight())
    //   $('.menu-area').addClass('nav-white-bg');
  }

  if (window.location.hash) {
    // $('.link-inpage[href="' + window.location.hash + '"]').first().trigger('click');
    $('.segment').hide();
    $('.segment_'+window.location.hash.substr(1)).show()
  } else {
    $('.segment').hide();
    $('.segment_home').show()
  }

  $('.link-inpage').click(function(e) {
    $('.segment').hide();
    $('.segment_'+$(this).attr('href').substr(1)).show()
  });
  
});
})(jQuery);