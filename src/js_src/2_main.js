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

    // $('.parallax-window').parallax({imageSrc: '../img/not_main_hb.jpg'});

});