var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
const { html } = require('../../gulp/gulpfile');
var browsersync = require('browser-sync').create();

/*tasks */

gulp.task('welcome-message',async function(){
    return console.log('helo world');

});
gulp.task('copy-files',function(){
    return gulp.src('src/css/*')
    .pipe(gulp.dest('dist/css'));

});

// compile sass file 
gulp.task('sass',function(){
    return gulp.src('src/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browsersync.stream());

});

// js file
gulp.task('minify-js',function(){
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

});


// html 
gulp.task('html', function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('./dist/'));
});

// concat
gulp.task('concat-js',function(){
    return gulp.src('src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

});

//watcher function
gulp.task('watch',function(){
    gulp.watch('src/js/*.js', gulp.series('concat-js'));
    gulp.watch('src/css/*.scss',gulp.series('sass'));
});


// browser Sync.....
gulp.task('browser-sync',function(){

    browsersync.init({
       server: './dist'
    });
    
    gulp.watch('./src/*.html', gulp.series('html')).on('change',browsersync.reload);
    gulp.watch('./src/css/*.scss', gulp.series('sass')).on('change',browsersync.reload);

});

// Default

gulp.task('default',gulp.series('sass','html','browser-sync'));


