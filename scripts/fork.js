const { exec } = require('child_process');

function fork(cmd) {
  const cp = exec(cmd);
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
  return cp;
}

module.exports = fork;
