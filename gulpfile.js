var gulp        = require('gulp-help')(require('gulp'), { hideDepsMessage: true });
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();


var paths = {
  js  : 'src/**/*.js',
  src : 'src/**'
};

var config = {
  eslint : 'config/eslint.conf'
};


gulp.task('lint', 'Run eslint on javascript files', function() {
  gulp.src(paths.js)
    .pipe($.eslint(config.eslint))
    .pipe($.eslint.format());
});

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


gulp.task('develop', 'Serve src/ folder, running tests and updating whenever a file is changed', ['devServer', 'watch']);