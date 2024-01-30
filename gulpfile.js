const gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    fs = require('fs'),
    srcDir = './src',
    destDir = './public';

gulp.task('clean-resources', function () {
    return del(destDir + '/images');
});

gulp.task('copy-resources', function () {
    return gulp.src(srcDir + '/images/**')
        .pipe(gulp.dest(destDir + '/images'));
});

gulp.task('update-resources', gulp.series('clean-resources', 'copy-resources'));

gulp.task('build-html', function () {
    const variablesFileContent = fs.readFileSync('./src/variables.example.json', 'utf8');
    const variables = JSON.parse(variablesFileContent);

    return gulp.src(srcDir + '/*.html')
        .pipe(nunjucksRender({
            path: srcDir,
            envOptions: {
                throwOnUndefined: true,
                noCache: true,
            },
            data: variables,
        }))
        .pipe(gulp.dest(destDir));
});

gulp.task('build', gulp.series('update-resources', 'build-html'));

function watchFiles() {
    gulp.watch(srcDir + '/images/**', gulp.series('update-resources'));
    gulp.watch(srcDir + '/**/*.html', gulp.series('build-html'));
}

gulp.task('watch', watchFiles);

gulp.task('reload', function () {
    browserSync.init({
        server: {
            baseDir: destDir,
        },
        open: false,
    });

    gulp.watch(destDir).on('change', browserSync.reload);

    watchFiles();
});

gulp.task('default', gulp.series('build'));
