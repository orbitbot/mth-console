var gulp        = require('gulp-help')(require('gulp'), { hideDepsMessage: true });
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var KarmaServer = require('karma').Server;

var paths = {
  js  : 'src/**/*.js',
  src : 'src/**'
};

var config = {
  eslint : 'config/eslint.conf',
  karma  : require('./config/karma.conf'),
};


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