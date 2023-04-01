// number - число
// string = "", '' строка
// true/false булевые переменные
//null 
//undefined
// let obj = {
//     name: "apple",
//     color: "green",
//     wieght: 200
// }
// Symbol - новый тип данных
// number = 4;
// alert()
// console.log(number); - вывод в консоль
// confirm("dfdfd"); - сайт задает вопрос
//let answer = promt("dsdsd?", "");
// let isCheked = true,
//     isClose = true; - инициализация двух переменных
// if (2*4 == 8*1) {} else {} - условия как в си
// for (let i = 1; i < 8; i++) {...}
// function logging(a, b) {
//     console.log(a + b);
// }
// logging(3, 5);

// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         slidesToShow: 1,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" ></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" ></button>',
//         responsive: [
//             {
//                 breakpoint: 992, // действует от 0px до 768px
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             }
//         ]
//       });
//   });

$(document).ready(function(){
    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    // верхний - слайдер
    document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
    });

    document.querySelector('.next').addEventListener('click', function () {
        slider.goTo('next');
        });
    // верхние два - кнопки
    
    $('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });
        // верхний - табы
    function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault(); //отменяем дефолтное поведение браузера (откидывание вверх)
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    //Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow'); //fadeOut/On - медленно убирает и появляет элементы с указанными айди или классами
    });
   
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function validateForms(form){
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожайлуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправельно введен адрес почты"
                }
              }
        });
    }
    validateForms("#consultation-form");
    validateForms("#consultation form");
    validateForms("#order form");

    $('input[name=phone]').mask("+7 (999) 999-99-99");
    $('form').submit(function(e){
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    })


    //scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});