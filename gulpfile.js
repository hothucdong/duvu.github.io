/*global process*/

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    browserify = require('gulp-browserify');
var cp = require('child_process');

gulp.task('styles', function() {
  return gulp.src('_sass/*.scss')
    .pipe(plumber())
    .pipe(sass({
      style: 'expanded',
      loadPath: [
        './_bower_components/foundation/scss/',
        '_sass/'
      ]
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('_js/**/*.js')
    .pipe(browserify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['css', 'js'], {read: false})
    .pipe(clean());
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: './_site'
        }
    });
});



gulp.task('jekyll-build', function (done) {
  var jekyll = (process.platform == 'win32'? 'jekyll.bat': 'jekyll');
  browserSync.notify('jekyll building...');
  return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('watch', function() {
  // Watch .sass files
  gulp.watch('_sass/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('_js/**/*.js', ['scripts']);
  gulp.watch(['*.html', '*.md', '_layouts/*.html', 'assets/**/*', '_posts/*', '_includes/*', 'js/*','css/*','device/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['styles', 'scripts', 'browser-sync', 'jekyll-build'], function() {
  gulp.start('watch');
});