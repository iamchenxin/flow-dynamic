// @flow
const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp);

const paths = {
  packageJson: resolveApp('package.json'),
  nodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  babelrc: resolveApp('.babelrc'),
  nodePaths: nodePaths,
  // ---
  src: resolveApp('src'),
  dst: resolveApp('lib'),
};

module.exports = {
  paths: paths,
};
