const path = require('path');
const fs = require('fs');

const dist = path.resolve(__dirname, 'dist');
const _dist = path.resolve(__dirname, '.dist');
const _temp = path.resolve(__dirname, '.temp');
const _sym = path.resolve(__dirname, '.sym');

const sourceMap = path.resolve(__dirname, '.dist/assets/js/bundle.js.map');

fs.unlinkSync(sourceMap);

if (process.platform !== 'win32') {
  fs.symlinkSync(_dist, _sym);
  fs.renameSync(_sym, dist);
  fs.rmdirSync(_temp, {recursive: true});
}
