const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
// import gulp from 'gulp';
// import autoprefixer from 'gulp-autoprefixer';
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('live-server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles-sass', function() {
    return gulp.src("src/sass/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min"
              }))
            // .pipe(autoprefixer({
            //     cascade: false
            // }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel('styles-sass'))
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'live-server', 'styles-sass'));