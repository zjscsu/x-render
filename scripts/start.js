const path = require('path');
const { exec } = require('child_process');

function fork(cmd) {
  const cp = exec(cmd);
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
  return cp;
}

const frRoot = path.resolve(__dirname, '../packages/form-render-next');
fork(`cd ${frRoot} && NODE_ENV=development father-build --watch --colors`);
