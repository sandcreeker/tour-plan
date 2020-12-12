$(document).ready(function () {
  var menuButton = document.querySelector(".menu-button");
  menuButton.addEventListener("click", function() {
  document.querySelector(".navbar-buttom").classList.toggle("navbar-buttom--active");
  document.querySelector(".navigation__mobile").classList.toggle("navigation__mobile__on");
  document.querySelector(".navigation__mob").classList.toggle("navigation__mob__on");
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

  // var myMap;

  // ymaps.ready(init);

  // function init () {
  //     myMap = new ymaps.Map('map', {
  //         center: [52.846448, -1.297401],
  //         zoom: 16
  //     }, {
  //         searchControlProvider: 'yandex#search'
  //     });

  //     myMap.geoObjects

  //         .add(new ymaps.Placemark([52.846448, -1.297401], {
  //             iconCaption: 'Hilton East Midlands Airport'
  //         }, {
  //             preset: 'islands#redDotIconWithCaption'
  //         }));
  // }
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;
 
//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [52.846448, -1.297401], // координаты центра на карте
    zoom: 16, // коэффициент приближения карты
    controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
  });
  var myPlacemarkTemp = new ymaps.Placemark([52.846448, -1.297401], {
      balloonContent: "Hilton East Midlands Airport",
  }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      iconImageHref: 'img/map-marker.png',
      // Размеры метки.
      iconImageSize: [50, 50],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-25, -50],
  });
  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту
 
  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);
 
  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function() {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.removeClass('is-active');
  });
}
 
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}
 
function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}
 
// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");
 
  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }
 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
 
// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
 
	  	// Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
 
		// Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');
 
		// Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
        });                
      }
    }
  );  
};
 
$(function() {
 
  //Запускаем основную функцию
  ymap();
 
});
  // коней карты
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

  $('.form').each(function(){
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Please specify your name"
        },
      email: {
        required: "We need your email address",
        email: "Your email address must be in the format of name@domain.com",
        },
      phone: {
        required: "Please specify your phone",
        minlength: "Enter the correct number",
        },
      subscribe: {
        required: "We need your email address to contact you",
        subscribe: "Your email address must be in the format of name@domain.com",
        },
      },
    });
  });

  $('.phone').mask('+7 (000) 000 00 00');

