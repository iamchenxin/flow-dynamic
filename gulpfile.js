/*eslint-env node */
var gulp=require('gulp');
var babel=require('gulp-babel');
var sourcemaps=require('gulp-sourcemaps');
var rename = require('gulp-rename');
var path=require('path');
//var gutil =require('gulp-util');
const fbjsConfigure = require('babel-preset-fbjs/configure');


gulp.task('lib', function() {
  return stdGulpTrans('src', 'lib');
});

gulp.task('flow', function() {
  return flowType('src', 'lib');
});

gulp.task('build', ['lib', 'flow'], function() {
  return stdGulpTrans('src/common', 'dst/common');
});

gulp.task('clean', function() {
  return rmdir([
    'lib',
    'index.js',
    'index.js.flow',
    'index.js.map',
  ] );
});

// ........functions .......
function flowType(src, dst) {
  var srcPath = [src+'/**/*.js',
    '!'+src+'/**/__tests__/**', '!'+src+'/**/__mocks__/**'];
  return gulp
    .src(srcPath)
    .pipe(rename({extname: '.js.flow'}))
    .pipe(gulp.dest(dst));
}

var fs = require('fs');
function rmdir(pathNames) {
  pathNames.forEach(function(pathName) {
    if (!fs.existsSync(pathName)) { return; }
    const stat = fs.statSync(pathName);
    if ( stat.isFile()) {
      rmfile(pathName);
    }
    if (stat.isDirectory()) {
      const subPaths = fs.readdirSync(pathName)
        .map(function(subPathName) {
          return path.resolve(pathName, subPathName);
        });
      rmdir(subPaths);
      fs.rmdirSync(pathName);
    }
  });
  function rmfile(name) {
    fs.unlinkSync(name);
  }
}

function stdGulpTrans(src, dst) {
  var sourceRoot = path.join(__dirname, src);
  var srcPath = [src+'/**/*.js',
    '!'+src+'/**/__tests__/**', '!'+src+'/**/__mocks__/**'];
  return gulp
    .src(srcPath)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        fbjsConfigure({
          autoImport: false,
          target: 'js',
        }),
      ],
    }))
    .pipe(sourcemaps.write('.', {
      includeContent: true, sourceRoot: sourceRoot, debug:true
    }))
    .pipe(gulp.dest(dst));
}
