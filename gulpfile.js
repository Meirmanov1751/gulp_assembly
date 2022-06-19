const { dest, src, watch, parallel} = require('gulp')
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
let uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
// import imagemin from 'gulp-imagemin';

function browsersync() {
  browserSync.init({
      server: {
        baseDir: 'app/'
      }
    }
  )
}
//
// function images() {
//   return  src('app/img/**/*')
//     .pipe(imagemin([
//       imagemin.gifsicle({interlaced: true}),
//       imagemin.mozjpeg({quality: 75, progressive: true}),
//       imagemin.optipng({optimizationLevel: 5}),
//       imagemin.svgo({
//         plugins: [
//           {removeViewBox: true},
//           {cleanupIDs: false}
//         ]
//       })
//     ]))
//     .pipe(dest('dist/img'))
// }
//
function script() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({outputStyle: "compressed"}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslis: ['last 10 vertion'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/font/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
    .pipe(dest('dist'))
}

function Watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/main.js', '!app/js/*.js'], script);
  watch(['app/*.html']).on('change',browserSync.reload)
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.Watching = Watching;
exports.build = build;
// exports.images= images;

exports.default = parallel(browsersync,Watching)
