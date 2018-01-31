#!/usr/bin/env node

// const path = require('path')
const projectName = require('../package')['name']
const {_: argv = [], ...options} = require('minimist')(process.argv.slice(2))
const spawn = require('cross-spawn')


if (argv.length === 1) {
  const args = require.resolve('../scripts/' + argv[0])
  const result = spawn.sync('node', [args], {stdio: 'inherit'})
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
      )
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
      )
    }
    process.exit(1)
  }
  process.exit(result.status)
} else {
  console.log(`
  -- The name of task must be unique, such as:
     ${projectName} start -env test

     your arguments are: , ${JSON.stringify(argv)}`)
}
