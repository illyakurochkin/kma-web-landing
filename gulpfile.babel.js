const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

gulp.task('styles', function(){
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(concat('index.css'))
    .pipe(gulp.dest('output'));
});

gulp.task('scripts', function(){
  return gulp.src(['src/scripts/**/*.js'])
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('output'));
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('output/images/'));
});

gulp.task('watch', function(){
  gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
  gulp.watch('src/scripts/**/*.js', gulp.series('scripts'));
  gulp.watch('src/images/*', gulp.series('images'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'images'));
