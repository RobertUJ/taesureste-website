var gulp = require('gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');
var prefix = require('gulp-autoprefixer');

var paths = {
      js:     'js/**/*.js',
      jsDest: 'aggregated-js',
      css:    'static/css',
      styles: 'styles',
      ds:     'ds_layouts',
      panels: 'panel_layouts',
      img:    'images',
    };

var gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

/* Compile stylus */
gulp.task('stylus', function () {
  gulp.src(paths.css + '/stylus/main.styl')
    .pipe(stylus({
        //compress: true,
        'include css': true
    }))
    //.pipe(gzip(gzip_options))
    .pipe(rename({suffix: '.min'}))
    //.pipe(minifycss())
    .pipe(livereload())
    .pipe(gulp.dest(paths.css));
});

gulp.task('prefix', function () {
    gulp.src(paths.css + '/*.css')
    .pipe(prefix(["last 8 version", "> 1%", "ie 8"]))
    .pipe(gulp.dest(paths.css));
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(paths.css + '/stylus/*.styl', ['stylus']);
    /* Trigger a live reload on any Django template changes */
    gulp.watch(paths.css + '/main.min.css').on('change', livereload.changed);
    gulp.watch('*.html').on('change', livereload.changed);
});


gulp.task('default', ['stylus','prefix','watch']);

