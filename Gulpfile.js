var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    babelify   = require('babelify'),
    babel      = require('gulp-babel');


gulp.task('scripts', function () {

    gulp.src(['app/main.js'])
        .pipe(browserify({
            debug: true,
            transform: ['reactify', 'babelify']
        }))
        .pipe(gulp.dest('./public/'));

    gulp.src(['app/submit.js'])
        .pipe(browserify({
            debug: true,
            transform: ['reactify', 'babelify']
        }))
        .pipe(gulp.dest('./public/'));

    gulp.src('app/machineLearning/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('app/machineLearning/dist'));

});

gulp.task('default', ['scripts']);

// var gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
// var browserify = require('browserify');
// var watchify = require('watchify');
// var babel = require('babelify');
//
// function compile(watch) {
//   var bundler = watchify(browserify('app/main.js', { debug: true }).transform(babel));
//
//   function rebundle() {
//     bundler.bundle()
//       .on('error', function(err) { console.error(err); this.emit('end'); })
//       .pipe(source('build.js'))
//       .pipe(buffer())
//       .pipe(sourcemaps.init({ loadMaps: true }))
//       .pipe(sourcemaps.write('./'))
//       .pipe(gulp.dest('./public/'));
//   }
//
//   if (watch) {
//     bundler.on('update', function() {
//       console.log('-> bundling...');
//       rebundle();
//     });
//   }
//
//   rebundle();
// }
//
// function watch() {
//   return compile(true);
// }
//
// gulp.task('build', function() { return compile(); });
// gulp.task('watch', function() { return watch(); });
//
// gulp.task('default', ['watch']);
