var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('css', function () {
 var processors = [autoprefixer
 ];
 return gulp.src('./public/css/*.css')
 .pipe(postcss(processors))
 .pipe(gulp.dest('./public/css'));
});

gulp.task('default', function() {
  // place code for your default task here
});
