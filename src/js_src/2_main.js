Pace.on('done', function() {
    console.log('main.js');

    $('select').wrap('<div class="selectwrap"></div>');
    $('form').validate();

});