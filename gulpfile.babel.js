import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import watch from 'gulp-watch';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import nodemon from 'gulp-nodemon';
import autoprefixer from 'gulp-autoprefixer';



const postcssPlugins = [
    cssnano({
        core: false, // true for minified output
        autoprefixer: {
            add: true,
            browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
        }
    })
];


const server = browserSync.create();

///////////////////
// Scripts
///////////////////
gulp.task('scripts1', () => {
    var b = browserify({
        entries: './src/js/logon.js',
        debug: true,
        transform: [babelify.configure({
            presets: ['es2015']
        })]
    });

    return b.bundle()
        .pipe(source('./src/js/logon.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // Add other gulp transformations (eg. uglify) to the pipeline here.
        //.on('error', util.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});




gulp.task('scripts2', () =>
    browserify('./src/js/dashboard.js', {
        standalone: 'dashboard'
    })
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
        console.error(err);
        this.emit('end')
    })
    .pipe(source('dashboard.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'))
);

//gulp.task('scripts', ['scripts1', 'scripts2']);


//////////////////
// Sass
//////////////////
gulp.task('styles1', () =>
    gulp.src('./src/scss/logon.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css/logon.css'))
    .pipe(server.stream({ match: '**/*.css' }))
);

gulp.task('styles2', () =>
    gulp.src('./src/scss/dashboard.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css/dashboard.css'))
    .pipe(server.stream({ match: '**/*.css' }))
);

//gulp.task('styles', ['styles1', 'styles2']);






//gulp.task('start', ['browser-sync'], function() {});

// gulp.task('browser-sync', ['nodemon'], function() {
//    browserSync.init(null, {
//        proxy: "https://localhost:8443",
//        files: ["public/**/*.*"],
//        port: 7000,
//    });
//}); 

gulp.task('style', () =>
    gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    //.pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'))
    .pipe(server.stream({ match: '**/*.css' }))
);

gulp.task('js', () =>
    browserify('./src/js/app.js', {
        standalone: 'app'
    })
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
        console.error(err);
        this.emit('end')
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js'))
);

gulp.task('html', () =>{
    gulp.src('./src/views/*.html')
        .pipe(gulp.dest('./build/'));
});

gulp.task('build', gulp.parallel('style', 'html', 'js'));

function reload() {
    browserSync.reload();
}

gulp.task('serve', function() {
    browserSync.init({
        server: "./build"
    });
    gulp.watch('./css/*.css').on('change', function () {
        browserSync.reload();
    });
    watch('./src/scss/**/*.scss', 'style');
    watch('./src/js/**/*.js', 'js');
    watch('./src/views/*.html', 'html');
    watch("./build/**/*.*", reload);
});



gulp.task('nodemon', function(cb) {

    var started = false;


    watch('./src/scss/**/*.scss', () => gulp.start('style', browserSync.reload()));
    watch('./src/views/*.html', () => gulp.start('html', browserSync.reload()));
    watch('./src/js/**/*.js', () => gulp.start('js', browserSync.reload()));
    //watch('./src/examples/**/*.pug', () => gulp.start('pug', browserSync.reload()));

    return nodemon({
        script: 'server.js'
    }).on('start', function() {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});