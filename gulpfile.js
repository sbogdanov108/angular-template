'use strict';

var gulp      = require( 'gulp' ),
    notify    = require( 'gulp-notify' ),
    //webserver = require( 'gulp-webserver' ),
    sass      = require( 'gulp-sass' ),
    concat    = require( 'gulp-concat' ),
    csso      = require( 'gulp-csso' ); // минифицирование css

var bc = './bower_components/';

// отслеживание всех js файлов в проекте
gulp.task( 'js', function()
{
    gulp.src( 'builds/development/app/**/*.js' )
        .pipe( concat( 'app.js' ) )
        .pipe( gulp.dest( 'builds/dist/app/' ) )
} );

// отслеживание всех html файлов в проекте
gulp.task( 'html', function()
{
    gulp.src( 'builds/development/**/*.html' )
        .pipe( gulp.dest( 'builds/dist/' ) )
} );

// отслеживание шрифтов в директории
gulp.task( 'fonts', function()
{
    gulp.src( 'builds/development/fonts/**/*' )
        .pipe( gulp.dest( 'builds/dist/fonts/' ) );
} );

// отслеживание всех sass файлов в директории
gulp.task( 'sass', function()
{
    gulp.src( 'builds/development/sass/**/*' )
        .pipe( sass().on( 'error', notify.onError(
            {
                message: "<%= error.message %>",
                title  : "Error!"
            } ) )
        )
        .pipe( concat( 'style.min.css' ) )
        .pipe( csso() )
        .pipe( gulp.dest( 'builds/dist/css/' ) )
        .pipe( notify( 'Good work!' ) );
} );

gulp.task( 'img', function()
{
    gulp.src( 'builds/development/img/**/*' )
        .pipe( gulp.dest( 'builds/dist/img/' ) );
} );

gulp.task( 'watch', function()
{
    gulp.watch( 'builds/development/app/**/*.js', [ 'js' ] );
    gulp.watch( 'builds/development/sass/**/*.scss', [ 'sass' ] );
    gulp.watch( 'builds/development/**/*.html', [ 'html' ] );
    gulp.watch( 'builds/development/img/**/*', [ 'img' ] );
} );

// вытащить нужные библиотеки из bower в билд
gulp.task( 'libs', function()
{
    gulp.src( bc + 'jquery/dist/jquery.js' )
        .pipe( gulp.dest( './builds/dist/libs/jquery/' ) );

    gulp.src( bc + 'bootstrap/dist/**/*.*' )
        .pipe( gulp.dest( './builds/dist/libs/bootstrap/' ) );

    gulp.src( bc + 'bootstrap-material-design/dist/**/*.*' )
        .pipe( gulp.dest( './builds/dist/libs/bootstrap-material-design/' ) );

    gulp.src( [
        bc + 'angular/angular.js',
        bc + 'angular-animate/angular-animate.js',
        bc + 'angular-cookies/angular-cookies.js',
        bc + 'angular-i18n/angular-locale_ru-ru.js',
        bc + 'angular-loader/angular-loader.js',
        bc + 'angular-resource/angular-resource.js',
        bc + 'angular-route/angular-route.js',
        bc + 'angular-sanitize/angular-sanitize.js',
        bc + 'angular-touch/angular-touch.js',
        bc + 'firebase/firebase.js',
        bc + 'angularfire/dist/angularfire.js'
    ] )
        .pipe( concat( 'angular.concat.js' ) )
        .pipe( gulp.dest( './builds/dist/libs/angular/' ) );
} );

/*gulp.task( 'webserver', function()
{
    gulp.src( 'builds/dist/' )
        .pipe( webserver( {
            livereload: true,
            open      : true,
            port: 8001
        } ) );
} );*/

gulp.task( 'default', [
    'libs',
    'html',
    'img',
    'js',
    'sass',
    //'webserver',
    'watch'
] );
