'use strict';

let gulp = require('gulp');
let merge = require('merge-stream');
let plug = require('gulp-load-plugins')();
let log = plug.util.log;

let config = require('./gulp.config.json');

gulp.task('help', plug.taskListing);

gulp.task('build', ['vendorjs', 'js', 'vendorcss', 'css'], Build);
function Build() {
    log('Injecting to index.html');

    let index = config.build + '/index.html';

    return gulp
        .src(index)
        .pipe(inject('/css/vendor.min.css', 'inject-vendor'))
        .pipe(inject('/css/app.min.css'))
        .pipe(inject('/js/vendor.min.js', 'inject-vendor'))
        .pipe(inject('/js/app.min.js'))
        .pipe(gulp.dest(config.build));

    function inject(path, name) {
        let pathGlob = config.build + path;
        let options = {
            ignorePath: config.build.substring(1)
        };
        if (name) {
            options.name = name;
        }
        return plug
            .inject(
                gulp.src(pathGlob, {read:false}),
                options
            );
    }

}

gulp.task('vendorjs', BundleVendorJS);
function BundleVendorJS() {
    log('Bundling the vendor JavaScript');

    return gulp
        .src(config.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.bytediff.start())
        .pipe(plug.uglify())
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(config.buildJS));
}

gulp.task('js', BundleJS);
function BundleJS() {
    log('Bundling and minifying the app JavaScript');

    return gulp
        .src(config.js)
        .pipe(plug.concat('app.min.js'))
        .pipe(plug.babel({ presets: ['es2015'] }))
        .pipe(plug.bytediff.start())
        .pipe(plug.uglify().on('error', log))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(config.buildJS));
}

gulp.task('vendorcss', BundleVendorCSS);
function BundleVendorCSS() {
    log('Bundling and minifying the vendor CSS');

    return gulp
        .src(config.vendorcss)
        .pipe(plug.concat('vendor.min.css'))
        .pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(config.buildCSS));
}

gulp.task('css', BundleCSS);
function BundleCSS() {
    log('Bundling and minifying the app CSS');

    return gulp
        .src(config.css)
        .pipe(plug.concat('app.min.css'))
        .pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(config.buildCSS));
}

gulp.task('watch', WatchFiles);
function WatchFiles() {
    log('Watching all files');

    let css = ['gulpfile.js'].concat(config.css, config.vendorcss);
    let js = ['gulpfile.js'].concat(config.js, config.vendorjs);

    gulp
        .watch(css, ['css', 'vendorcss'])
        .on('change', logWatch);

    gulp
        .watch(js, ['js', 'vendorjs'])
        .on('change', logWatch);

    function logWatch (event) {
        log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
}

/*
 * Formatter for bytediff to display the size changes after processing
 */
function bytediffFormatter (data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/*
 * Format a number as a percentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}