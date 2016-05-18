const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const cp = require('child_process');
const protractor = require('gulp-protractor').protractor;
var children = [];

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

gulp.task('lint:dev', () => {
  return gulp.src(appFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('static:dev', () => {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('start:server', () => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
});

gulp.task('protractor', ['build:dev', 'start:server'], () => {
  return gulp.src(['./src/tests/db-spec.js'])
    .pipe(protractor({
      configFile: 'test/integration/config.js'
    }))
      .on('end', () => {
      children.forEach((child) => {
      child.kill('SIGTERM');
    });
  });
});

gulp.task('build:dev', ['lint:dev', 'webpack:dev', 'static:dev']);
gulp.task('default', ['protractor']);
