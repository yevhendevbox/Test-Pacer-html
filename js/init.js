$(document).ready(function(){
    $('.modal').modal();

    $('.parallax').parallax();
    
    $('.materialboxed').materialbox();

    $('.collapsible').collapsible();

    $('.modal').modal();

    // Smooth scrolling 
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

    // navigation toggle
      var toggler = $('.nav-toggler');
			var active = $('.toggler-active');
      var menu = $('.main-nav');
      var link = $('.nav-link');

			toggler.click(function(){
				toggler.toggleClass('toggler-active');
				menu.toggleClass('open-nav');
			});
			active.click(function(){
				toggler.removeClass('toggler-active');
				menu.removeClass('open-nav');
      });
      link.click(function(){
				toggler.removeClass('toggler-active');
				menu.removeClass('open-nav');
      });
  
  // counter script
    var show = true;
      var countbox = ".benefits__inner";
      $(window).on("scroll load resize", function () {
          if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
          var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
          var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
          var w_height = $(window).height(); // Высота окна браузера
          var d_height = $(document).height(); // Высота всего документа
          var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
          if (w_top + 650 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
              $('.benefits__number').css('opacity', '1');
              $('.benefits__number').spincrement({
                  thousandSeparator: "",
                  duration: 1200
              });
              
              show = false;
          }
      });
    
    // scrollReveal init script
      window.sr = ScrollReveal();
      sr.reveal('.nav-wrap', { 
        duration: 2000, 
        origin: 'bottom',
        mobile: false,
        useDelay: 'once'
      });
      sr.reveal('.showcase-content', { 
        duration: 2000, 
        origin: 'left',
        mobile: true,
        distance: '100px'
      });
      sr.reveal('.about-title', { 
        duration: 2000, 
        origin: 'bottom',
        mobile: true,
        distance: '50px'
      });
      sr.reveal('.advantages-title', { 
        duration: 2000, 
        origin: 'bottom',
        mobile: true,
        distance: '50px'
      });
      sr.reveal('.stages-title', { 
        duration: 2000, 
        origin: 'bottom',
        mobile: true,
        distance: '50px'
      });
      sr.reveal('.gallery-title', { 
        duration: 2000, 
        origin: 'bottom',
        mobile: true,
        distance: '50px'
      });
      sr.reveal('.contacts-title', { 
        duration: 2000, 
        origin: 'bottom',
        mobile: true,
        distance: '50px'
      });

  });

  // Active menu item on scroll

  var menu_selector = ".main-nav"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню. 
  function onScroll(){
    var scroll_top = $(document).scrollTop();
    $(menu_selector + " a").each(function(){
      var hash = $(this).attr("href");
      var target = $(hash);
      if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  }
  $(document).ready(function () {
    $(document).on("scroll", onScroll);
    $("a[href^=#]").click(function(e){
      e.preventDefault();
      $(document).off("scroll");
      $(menu_selector + " a.active").removeClass("active");
      $(this).addClass("active");
      var hash = $(this).attr("href");
      var target = $(hash);
      $("html, body").animate({
          scrollTop: target.offset().top
      }, 50, function(){
        window.location.hash = hash;
        $(document).on("scroll", onScroll);
      });
    });
  });