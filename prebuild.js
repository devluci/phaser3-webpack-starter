const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;

const dist = path.resolve(__dirname, 'dist');
const _dist = path.resolve(__dirname, '.dist');
const _temp = path.resolve(__dirname, '.temp');
const _sym = path.resolve(__dirname, '.sym');

if (process.platform === 'win32') {
  fs.rmdirSync(_dist, {recursive: true});
} else if (fs.existsSync(_dist)) {
  execSync(`cp -r ${_dist} ${_temp}`);
  fs.symlinkSync(_temp, _sym);
  fs.renameSync(_sym, dist);
}
