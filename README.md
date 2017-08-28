# README #


### Путь до gulp lumserv: ###
```
/var/www/virtualhosts/vcerm.lum/www
```

### Иконки лежат в: ###
```
 dist/img/icons/
```
```


### js tips:
```
    // якоря
    $('.anchor').on('click', function(event) {
        var link = $(this).attr('href');
        jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: $(link).offset().top }, 2000, 'easeInOutExpo');
        return false;
    });
```

```
    // валидация форм 
    validateFormFu($('.validate_form'));
```

```
    // маски для инпутов 
    $(".phone_number").mask("+7(999) 999-9999");
    
```


```
    // для всплытия окна с изображением(пример ссылки)
    <a href="some.img" class="popup_img">Открыть окно c изображением</a>
    // класс bigpic обязателен
    
```
