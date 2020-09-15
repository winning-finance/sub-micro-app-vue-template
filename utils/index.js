
const spawn = require('child_process').spawn

/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.installDependencies = function installDependencies (
  cwd,
  color
) {
  console.log(`\n\n# ${color('Installing project dependencies ...')}`)
  console.log('# ========================\n')
  return runCommand('lerna', ['bootstrap'], {
    cwd
  })
}

/**
 * Spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
function runCommand (cmd, args, options) {
  return new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true
        },
        options
      )
    )

    spwan.on('exit', () => {
      resolve()
    })
  })
}

/**
 * Prints the final message with instructions of necessary next steps.
 * @param {Object} data Data from questionnaire.
 */
exports.printMessage = function printMessage (data, { green, yellow }) {
  const message = `
# ${green('micro sub app initialization finished!')}
# =================================================
To get started:
  ${green(
    `${data.autoInstall ? '' : 'lerna bootstrap'}\n  yarn serve`
  )}
`
  console.log(message)
}
