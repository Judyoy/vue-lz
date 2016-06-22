var gulp = require('gulp');
var ftp = require('gulp-ftp');
var gutil = require('gulp-util');

gulp.task('ftp', function () {
  return gulp.src('dist/static/*')
    .pipe(ftp({
      host: '210.14.152.194',
      port: 30000,
      user: 'yunying',
      pass: 'D8E*#h!1a9rH',
      remotePath: '/kfc'
    }))
    .pipe(gutil.noop());
});
