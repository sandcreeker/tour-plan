$(document).ready(function () {
  var menuButton = document.querySelector(".menu-button");
  menuButton.addEventListener("click", function() {
  document.querySelector(".navbar-buttom").classList.toggle("navbar-buttom--active");
  document.querySelector(".navigation__item--mobile").classList.toggle("navigation__item--mobile--on");
  document.querySelector(".navigation__item--mob").classList.toggle("navigation__item--mob--on");
  });

  var hotelSlider = new Swiper('.hotel-slider', {
    loop: true,

    navigation: {
      nextEl: '.hotel-slider__button--next',
      prevEl: '.hotel-slider__button--prev',
    },
  });

  $(document).keydown(function(e){
    if (e.which == 37) {
      $('.hotel-slider__button--prev')[0].click();
    }
    if (e.which == 39) {
      $('.hotel-slider__button--next')[0].click();
    }
  });

  var myMap;

  ymaps.ready(init);

  function init () {
      myMap = new ymaps.Map('map', {
          center: [52.846448, -1.297401],
          zoom: 16
      }, {
          searchControlProvider: 'yandex#search'
      });

      myMap.geoObjects

          .add(new ymaps.Placemark([52.846448, -1.297401], {
              iconCaption: 'Hilton East Midlands Airport'
          }, {
              preset: 'islands#redDotIconWithCaption'
          }));
  }

  var reviewsSlider = new Swiper('.reviews-slider', {
    loop: true,

    navigation: {
      nextEl: '.reviews-slider__button--next',
      prevEl: '.reviews-slider__button--prev',
    },
});

  var modalButton = $("[data-toggle=modal]");
  var closeModalButton = $('.modal__close');
  var closeOverlay = $('.modal__overlay');
    modalButton.on("click", openModal);
    closeModalButton.on("click", closeModal);
    closeOverlay.on("click", closeModalOverlay);

    function openModal() {
      var modalOverlay = $(".modal__overlay");
      var modalDialog= $(".modal__dialog");
      modalOverlay.addClass('modal__overlay--visible');
      modalDialog.addClass('modal__dialog--visible');
    }

    function closeModal(event) {
      event.preventDefault();
      var modalOverlay = $(".modal__overlay");
      var modalDialog= $(".modal__dialog");
      modalOverlay.removeClass('modal__overlay--visible');
      modalDialog.removeClass('modal__dialog--visible');
    }

    function closeModalOverlay() {
      var modalOverlay = $(".modal__overlay");
      var modalDialog= $(".modal__dialog");
      modalOverlay.removeClass('modal__overlay--visible');
      modalDialog.removeClass('modal__dialog--visible');
    }
});

  $(document).keydown(function(even){
      if(event.which == 27) {
        $('.modal__close')[0].click();
      }
    });