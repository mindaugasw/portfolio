const gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    browserSync = require('browser-sync').create(),
    srcDir = './src',
    destDir = './public';

gulp.task('build', function () {
    return gulp.src(srcDir + '/*.html')
        .pipe(nunjucksRender({
            path: srcDir,
        }))
        .pipe(gulp.dest(destDir));
});

gulp.task('watch', function () {
    gulp.watch(srcDir + '/*.html', gulp.series('build'));
})

gulp.task('reload', function () {
    browserSync.init({
        server: {
            baseDir: destDir,
        },
        open: false,
    });
    gulp.watch(destDir + '/*.html').on('change', browserSync.reload);
    gulp.watch(srcDir + '/*.html', gulp.series('build'));
})

gulp.task('default', gulp.series('build'));
