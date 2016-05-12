const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const exec = require('child_process').exec;
const protractor = require('gulp-protractor').protractor;

const appFiles = ['*.js', './app'];

gulp.task('webpack:dev', () => {
  return gulp.src('app/js/entry.js')
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
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('lint:dev', () => {
  return gulp.src(appFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('start:server', () => {
  exec('node server.js');
  exec('webdriver-manager start');
});

gulp.task('protractor', () => {
  return gulp.src(['./src/tests/*.js'])
    .pipe(protractor({
      configFile: 'test/integration/config.js'
    }));
});

gulp.task('build-dev', ['lint:dev', 'webpack:dev', 'static:dev', 'start:server', 'protractor']);
gulp.task('default', ['build-dev']);
