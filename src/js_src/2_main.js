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

});