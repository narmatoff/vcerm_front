"use strict";
////////////////////////////////////////consts
const gulp = require('gulp'),
    // less = require('gulp-less'),
    // concatCss = require('gulp-concat-css'),
    // minifyCss = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    fs = require('fs'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    notify = require("gulp-notify"),
    path = require('path'),
    // uncss = require('gulp-uncss'),
    concat = require('gulp-concat'),
    // LessPluginCleanCSS = require('less-plugin-clean-css'),
    // cleancss = new LessPluginCleanCSS({
    //     advanced: true
    // }),
    // LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    // autoprefix = new LessPluginAutoPrefix({
    //     browsers: ["last 14 versions"]
    // }),
    pug = require('gulp-pug'),
    connect = require('gulp-connect'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    image = require('gulp-image'),
    pngquant = require('imagemin-pngquant'),
    csso = require('gulp-csso'),
    merge = require('gulp-merge'),
    svgmin = require('gulp-svgmin'),
    spritesmith = require('gulp.spritesmith'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    jsmin = require('gulp-jsmin'),
    sourcemaps = require('gulp-sourcemaps'),
    // svgSprite = require("gulp-svg-sprites"),
    wiredep = require('wiredep').stream,
    combineMq = require('gulp-combine-mq'),
    size = require('gulp-filesize'),
    changed = require('gulp-changed'),
    realFavicon = require('gulp-real-favicon'),
    FAVICON_DATA_FILE = 'faviconData.json';


// gulp.task('html', function () {
//     return gulp.src('app/*.html')
//         .pipe(useref())
//         .pipe(gulpif('*.js'))
//         .pipe(gulpif('*.css'))
//         .pipe(gulp.dest('dist'));
// });



// pug
gulp.task('pug', function() {
    const YOUR_LOCALS = {};
    gulp.src('src/pug/*.pug')
        .pipe(changed('dist/'))
        // .pipe(plumber())
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(pug({
            locals: YOUR_LOCALS,
            pretty: '    ',
            paths: [path.join(__dirname, 'src/pug/includes')]
        }).on('error', gutil.log))
        .pipe(connect.reload())
        .pipe(livereload())
        .pipe(gulp.dest('dist/'));
    // .pipe(notify("pug готов!"));
});

// fonts
gulp.task('fonts', function() {
    return gulp.src([
            'src/fonts/*.*'
        ])
        // .pipe(changed('dist/css/fonts'))
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        // .pipe(notify("fonts Done!"))
        .pipe(gulp.dest('dist/css/fonts'));
});


// css
// gulp.task('css', function() {
//     // gulp.src('dist/css/bundle.min.css')
//     gulp.src('src/css/noncompld/*.css')
//         .pipe(plumber())
//         .pipe(minifyCss({
//             compatibility: 'ie8'
//         }))
//     .pipe(autoprefixer({
//             browsers: ['last 14 versions'],
//             cascade: false
//         }))
//         //
//         // "delete unuseble selectors from scc file"
//         // .pipe(uncss({
//         //     html: ['dist/*.html']
//         // }))
//         // .pipe(cmq({
//         //     log: true
//         // })) // проверить работоспособность!
//         .pipe(rename('main.css'))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(livereload())
//         .pipe(notify("Css готов!"));
// });
gulp.task('lint_mainjs', function() {
    return gulp.src('src/js_src/*.js')
        .pipe(changed('dist/js'))
        .pipe(size())
        .pipe(concat('all.js'))
        // .pipe(plumber())
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(jshint())
        .pipe(jshint.reporter('fail'))
        .pipe(connect.reload())
        .pipe(livereload())
        .pipe(jsmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(size());
    // .pipe(notify("js готов!"));
});
// gulp.task('lint_mainjs', function() {
//     return gulp.src('src/js_src/paceoptions.js')
//         .pipe(plumber())
//         .pipe(jshint())
//         .pipe(jshint.reporter('fail'))
//         .pipe(connect.reload())
//         .pipe(livereload())
//         .pipe(jsmin())
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest('dist/js'));
//     // .pipe(notify("js готов!"));
// });
// gulp.task('lint_customplgnsjs', function() {
//     return gulp.src('src/js_src/custom_plgns.js')
//         .pipe(plumber())
//         // .pipe(jshint())
//         // .pipe(jshint.reporter('fail'))
//         .pipe(connect.reload())
//         .pipe(livereload())
//         .pipe(jsmin())
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest('dist/js'));
//     // .pipe(notify("js готов!"));
// });
// sass
gulp.task('sass', function() {
    gulp.src('src/sass/main.scss')
        .pipe(changed('dist/css'))

    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(size())
        // .pipe(plumber())
        // .pipe(sourcemaps.init())
        .pipe(sass({
            // paths: [path.join(__dirname, 'src/sass/includes')],
            includePaths: ['.'],
            outputStyle: 'compressed'
                // outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 30 versions'],
            cascade: false
        }))
        // компановка медиа запросов
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(csso())
        // .pipe(uncss({
        //     html: ['dist/*.html']
        // }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(size())
        .pipe(connect.reload())
        .pipe(livereload());
    // .pipe(notify("sass готов!"));
});
// спрайты











// generate favicons by http://realfavicongenerator.net
gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: 'src/images/favicon_master_picture.png',
        dest: 'dist/img/icons/',
        iconsPath: 'dist/img/icons/',
        design: {
            ios: {
                pictureAspect: 'backgroundAndMargin',
                backgroundColor: '#ffffff',
                margin: '35%',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'whiteSilhouette',
                backgroundColor: '#b91d47',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: true,
                    windows10Ie11EdgeTiles: {
                        small: true,
                        medium: true,
                        big: true,
                        rectangle: true
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    name: 'Дымоходы Вулкан',
                    display: 'browser',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#5bbad5'
            }
        },
        settings: {
            compression: 3,
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
    return gulp.src(['src/pug/includes/favicons.pug'])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('src/pug/includes/favicons.pug'));
});


// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
    const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});

// END generate favicons by http://realfavicongenerator.net


















gulp.task('sprite', function() {
    // Generate our spritesheet
    const spriteData = gulp.src('src/images/forsprts/*.png')
        // .pipe(changed('dist/img'))

    // .pipe(plumber())
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(spritesmith({
            imgName: 'sprite.png',
            imgPath: "../img/sprite.png",
            cssName: '_sprite.scss',
            cssFormat: "scss",
            // padding: "2",

            // top-down left-right  diagonal    alt-diagonal    binary-tree
            algorithm: "top-down"
        }));
    // Pipe image stream through image optimizer and onto disk
    const imgStream = spriteData.img
        // .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
    // Pipe CSS stream through CSS optimizer and onto disk
    const cssStream = spriteData.css
        // .pipe(csso())
        .pipe(gulp.dest('src/sass'));
    // .pipe(size());
    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream)
        .pipe(connect.reload())
        .pipe(livereload());
    // .pipe(notify("sprite готов!"));
});
// svgsprites
// gulp.task('svgsprites', function() {
//     return gulp.src('src/images/forsvgsprts/*.svg')
//         .pipe(svgSprite({
//             cssFile: "src/sass/_svgsprite.scss",
//             sprite: "svgsprite.svg"
//         }))
//         .pipe(gulp.dest("dist/img/svg"))
//         .pipe(connect.reload())
//         .pipe(livereload());
// });
// imagemin
gulp.task('imagemin', function() {
    return gulp.src('src/images/*')
        .pipe(changed('dist/img'))
        .pipe(size())
        // .pipe(plumber())
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: true }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(size())
        .pipe(connect.reload())
        .pipe(livereload());
    // .pipe(notify("imagemin готов!"));
});

// image
gulp.task('image', function() {
    // gulp.src('src/images/*')
    // смотреть все подряд
    gulp.src('src/images/**/*')
        .pipe(changed('dist/img'))

    .pipe(size())
        // .pipe(plumber())
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(image({
            pngquant: true,
            optipng: true,
            zopflipng: true,
            advpng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(size())
        .pipe(connect.reload())
        .pipe(livereload());
    // .pipe(notify("image done"));
});

// svgmin
gulp.task('svgmin', function() {
    return gulp.src('src/images/svg/**/*.svg')
        .pipe(changed('dist/img/svg'))

    .pipe(size())
        // .pipe(plumber())
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDoctype: true
            }, {
                removeComments: true
            }]
        }).on('error', gutil.log))
        .pipe(gulp.dest('dist/img/svg'))
        .pipe(size());
    // .pipe(notify("svgmin готов!"));
});
// bower
gulp.task('bower', function() {
    return gulp
        .src('src/pug/includes/**/*.pug')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(wiredep({
            directory: "dist/components/",
            // игнорируем путь для относительности путей(если стили и библиотеки не подключились)
            ignorePath: '../../../dist/',
        }).on('error', gutil.log))
        .pipe(gulp.dest('src/pug/includes/'))
        .pipe(connect.reload())
        .pipe(livereload());
    // .pipe(notify("bower готов!"));
});

// connect
gulp.task('connect', function() {
    connect.server({
        livereload: true,
        host: '0.0.0.0'
    });
});





// ftp deploy
// gulp.task('deploy', function() {

//     const conn = ftp.create({
//         host: 'bitrix266.timeweb.ru',
//         user: 'devlum',
//         password: 'u4XVdvu1fakS',
//         // parallel: 10,
//         parallel: 1,
//         maxConnections: 1,
//         log: gutil.log
//     });

//     const globs = [
//         // 'src/**',
//         'dist/**',
//         // 'js/**',
//         // 'fonts/**',
//         // 'index.html'
//     ];

//     // using base = '.' will transfer everything to /public_html correctly 
//     // turn off buffering in gulp.src for best performance 

//     return gulp.src(globs, { base: './dist/', buffer: false })
//         .pipe(conn.newer('/vulkan/public_html/templates/dymohod/dist/')) // only upload newer files 
//         .pipe(conn.dest('/vulkan/public_html/templates/dymohod/dist/'));

// });






// less
// gulp.task('less', function() {
//     return gulp
//         .src('src/less/main.less')
//         .pipe(plumber())
//         .pipe(less({
//             paths: [path.join(__dirname, 'src/less/includes')]
//         }).on('error', gutil.log))
//         .pipe(less({
//             plugins: [cleancss, autoprefix]
//         }))
//         .pipe(rename('bundle.min.css'))
//         .pipe(connect.reload())
//         .pipe(livereload())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(notify("less готов!"));
// });

// html
// gulp.task('html', function() {
//     gulp.src('*.html')
//         .pipe(connect.reload())
//         .pipe(livereload())
//         .pipe(notify("html готов!"));
// });
// strip
// gulp.task('strip', function() {
//     gulp.src('dist/js/*.js')
//         .pipe(strip())
//         .pipe(gulp.dest('dist/js'));
// });
// Watch
gulp.task('watch', function() {
    gulp.watch('src/images/favicon_master_picture.png', ['generate-favicon', 'inject-favicon-markups']);
    gulp.watch('src/images/forsprts/**/*.png', ['sprite']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch('src/pug/**/*.pug', ['pug']);
    // gulp.watch('src/css/noncompld/*.css', ['css']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/fonts/**/*.*', ['fonts']);
    gulp.watch('src/js_src/*.js', ['lint_mainjs']);
    // gulp.watch('src/js_src/paceoptions.js', ['lint_mainjs']);
    // gulp.watch('src/js_src/custom_plgns.js', ['lint_customplgnsjs']);
    // gulp.watch('src/images/master_picture.png', ['inject-favicon-markups']);
    // gulp.watch('src/images/forsvgsprts/*.svg', ['svgsprites']);
    gulp.watch('src/images/*', ['imagemin']);
    gulp.watch('src/images/svg/*', ['svgmin']);
    // gulp.watch('src/less/**/*.less', ['less']);
    // gulp.watch('src/coffee/*.coffee', ['coffee']);
    livereload.listen();
});



// default
gulp.task('default', ['generate-favicon', 'inject-favicon-markups', 'sprite', 'pug', 'fonts', 'sass', 'bower', 'lint_mainjs', 'image', 'svgmin', 'watch', 'connect']);
