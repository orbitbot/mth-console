var gulp        = require('gulp-help')(require('gulp'), { hideDepsMessage: true });
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var KarmaServer = require('karma').Server;

var paths = {
  build : 'src/**/!(*spec).js',
  js    : 'src/**/*.js',
  src   : 'src/**'
};

var config = {
  eslint : 'config/eslint.conf',
  karma  : require('./config/karma.conf'),
};


gulp.task('build', 'Generate a build from sources', function() {
  return gulp.src(paths.build)
    .pipe($.plumber())
    .pipe($.concat('mth-console.js'))
    .pipe($.msx({ harmony: true }))
    .pipe($.size({ title: 'mth-console.js', showFiles: true }))
    .pipe(gulp.dest('dist/'))
    .pipe($.uglify())
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.size({ title: 'mth-console.min.js', showFiles: true }))
    .pipe(gulp.dest('dist/'));
});


gulp.task('lint', 'Run eslint on javascript files', function() {
  gulp.src(paths.js)
    .pipe($.plumber())
    .pipe($.eslint(config.eslint))
    .pipe($.eslint.format());
});


// Tests

gulp.task('unit', 'Run unit tests', function() {
  new KarmaServer(config.karma).start();
});

gulp.task('karma-ci', false, function() {
  config.karma.singleRun = false;
  config.karma.autoWatch = true;
  new KarmaServer(config.karma).start();
});


// Development setup

gulp.task('watch', false, function() {
  gulp.watch(paths.js, ['lint']);
});

gulp.task('devServer', false, function(done) {
  browserSync.init({
    server: {
      baseDir : 'src',
      routes  : {
        '/node_modules': 'node_modules'
      }
    },
    files : paths.src,
    open  : false,
    logConnections: true
  }, done);
});


gulp.task('develop', 'Serve src/ folder, running tests and updating whenever a file is changed', ['devServer', 'karma-ci', 'watch']);