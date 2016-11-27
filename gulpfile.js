// @flow
/*eslint-env node */
const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const { paths } = require('./config/base.js');
const scripts = require('init-scripts');
const { utils } = scripts;

gulp.task('lib', function() {
  const babelJson = utils.readRC(paths.babelrc);
  // src -> lib
  return scripts.gulpscripts.compileJS(paths.src, paths.dst, babelJson);
});

gulp.task('flow', function() {
  return scripts.gulpscripts.outputFlowJS(paths.src, paths.dst);
});

gulp.task('clean', function(done) {
  utils.rmdir([
    paths.dst,
    'index.js',
    'index.js.flow',
    'index.js.map',
  ] );
  done();
});

gulp.task('build', gulp.series('clean', gulp.parallel('lib', 'flow'),
function(done) {
  const rsrc = path.relative(__dirname, paths.src);
  const rdst = path.relative(__dirname, paths.dst);
  gutil.log('Compile Javascript Files...');
  gutil.log(`From: './${rsrc}' To: './${rdst}'`);
  done();
  //gutil.log(`To: './${rdst}'`);
}));
