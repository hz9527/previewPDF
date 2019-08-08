const {src, dest, task} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const minifyCSS = require('gulp-csso');
const uglify = require('gulp-uglify');

function clean() {
  if (require('fs').existsSync('./dist')) {
    require('child_process').execSync('rm -rf ./dist/*')
  }
}

function html() {
  return src('src/*.html')
    .pipe(htmlmin({ minifyCSS: true, minifyJS: true, collapseWhitespace: true }))
    .pipe(dest('dist'))
}

function css() {
  return src('src/**/*.css')
    .pipe(minifyCSS())
    .pipe(dest('dist'))
}

function js() {
  return src('src/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist'))
}

function assets() {
  return src('src/**/*.+(svg|png|bcmap)')
    .pipe(dest('dist'))
}

clean()
html()
css()
js()
assets()

