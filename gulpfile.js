const gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    fs = require('fs'),
    mergician = require('mergician'),
    srcDir = './src',
    destDir = './public';

gulp.task('clean-resources', function () {
    del(destDir + '/scripts');

    return del(destDir + '/images');
});

gulp.task('copy-resources', function () {
    gulp.src(srcDir + '/scripts/**')
        .pipe(gulp.dest(destDir + '/scripts'));

    return gulp.src(srcDir + '/images/**')
        .pipe(gulp.dest(destDir + '/images'));
});

gulp.task('update-resources', gulp.series('clean-resources', 'copy-resources'));

gulp.task('build-html', function () {
    let variables = JSON.parse(fs.readFileSync('./src/variables.json', 'utf8'));
    const localVariables = fs.existsSync('./src/variables.local.json')
        ? JSON.parse(fs.readFileSync('./src/variables.local.json', 'utf8'))
        : {};

    variables = mergician.mergician(variables, localVariables);

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

gulp.task('watch', function () {
    gulp.watch([srcDir + '/scripts/**', srcDir + '/images/**'], gulp.series('update-resources'));
    gulp.watch(srcDir + '/**/*.html', gulp.series('build-html'));
});

gulp.task('reload', function () {
    gulp.series('build')();

    browserSync.init({
        server: {
            baseDir: destDir,
        },
        open: false,
    });

    gulp.watch(destDir).on('change', browserSync.reload);
    gulp.series('watch')();
});

gulp.task('default', gulp.series('build'));
