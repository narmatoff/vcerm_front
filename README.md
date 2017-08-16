# README #


### Путь до gulp lumserv: ###
```
/var/www/virtualhosts/dym.lumserv.ru/www
```

### Иконки лежат в: ###
```
 dist/img/icons/
```
```
 Надо прописать в head правильные пути
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
    // для всплытия окна с ajax содержимым(пример ссылки)
    <a href="some.html" class="ajax_popup">Открыть окно c ajax содержимым</a>
    // класс ajax_popup обязателен
    
```

```
    // для всплытия окна с изображением(пример ссылки)
    <a href="some.img" class="bigpic">Открыть окно c изображением</a>
    // класс bigpic обязателен
    
```

```
    // зумер для картинок
    //html
    <img src="some.img" alt="" class="imgClass">
    <div class="zoomContainer"></div>
    // js
    zoomerInit(document.querySelector('.imgClass'), document.querySelector('.zoomContainer'));
    // при наведении на картинку - увеличенный экземпляр будет рендерится в .zoomContainer
    
```
