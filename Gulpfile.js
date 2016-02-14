var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    babelify   = require('babelify'),
    babel      = require('gulp-babel');


gulp.task('scripts', function () {

    // gulp.src(['app/KNN.js'])
    //     .pipe(browserify({
    //         debug: true,
    //         transform: ['reactify', 'babelify']
    //     }))
    //     .pipe(gulp.dest('./public/'));

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
