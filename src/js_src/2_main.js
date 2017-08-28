Pace.on('done', function() {
    console.log('main.js');

    $('select').wrap('<div class="selectwrap"></div>');
    $('form').validate();

    var swiper = new Swiper('.slider_wr_core', {
        pagination: '.slider_wr_core_pagination',
        paginationClickable: true,
        // autoplay:8000,
        // effect: 'flip',
        paginationBulletRender: function(swiper, index, className) {
            // return '<span class="header_' + className + index + 1 + '"></span>';
            return '<span class="slider_wr_core_pagination_bullet ' + className + '"></span>';
        }
    });


    $('.flex_blocks').masonry({
        // options
        itemSelector: '.flex_blocks_item',
        columnWidth: 16
    });


    $('.aside_secondary_menu').children('li').click(function() {
        // $('.aside_secondary_menu').children('li').removeClass('expanded');
        $(this).toggleClass('expanded');

    });

    $('.tabz').responsiveTabs({
        startCollapsed: 'accordion'
    });

    $('.popup_img').magnificPopup({
        type: 'image',
        callbacks: {
            open: function() {
                function getScrollBarWidth() {
                    var inner = document.createElement('p');
                    inner.style.width = "100%";
                    inner.style.height = "200px";

                    var outer = document.createElement('div');
                    outer.style.position = "absolute";
                    outer.style.top = "0px";
                    outer.style.left = "0px";
                    outer.style.visibility = "hidden";
                    outer.style.width = "200px";
                    outer.style.height = "150px";
                    outer.style.overflow = "hidden";
                    outer.appendChild(inner);
                    document.body.appendChild(outer);
                    var w1 = inner.offsetWidth;
                    outer.style.overflow = 'scroll';
                    var w2 = inner.offsetWidth;
                    if (w1 == w2) w2 = outer.clientWidth;

                    document.body.removeChild(outer);

                    return (w1 - w2);
                };
                $('body').css('padding-right', getScrollBarWidth() + "px");

            },
            close: function() { $('body').css('padding-right', 0); }
        },
        gallery: {
            enabled: true
        },
        removalDelay: 300,

        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade'
        // other options
    });

    // якоря
    $('.anchor').on('click', function(event) {
        var link = $(this).attr('href');
        jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: $(link).offset().top }, 2000, 'easeInOutExpo');
        return false;
    });

});