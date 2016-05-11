const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');

const appFiles = ['*.js', './app'];

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' }
        ]
      },
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('lint:dev', () => {
  return gulp.src(appFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('build-dev', ['webpack:dev', 'static:dev', 'lint:dev']);
gulp.task('default', ['build-dev']);
