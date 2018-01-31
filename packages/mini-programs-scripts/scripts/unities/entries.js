const glob = require('glob')
const path = require('path')
const {join} = path

const getEntriesByPath = (srcRoot, dirPath) => {
  return glob.sync('*/', {
    cwd: join(srcRoot, dirPath),
  }).reduce((entries, dir) => {
    const js = glob.sync(join(dirPath, dir, '*.js'), {
      cwd: srcRoot
    })
    if (js.length === 1) {
      return Object.assign(entries, {[join(dirPath, dir, dir).replace(/\/$/, '')]: `./${srcRoot}/${js[0]}`})
    } else {
      console.log(`-- The directory of ${join(dirPath, dir)} must be unique --`)
      return entries
    }
  }, {})
}

const getEntries = (srcRoot, paths) => Object.assign({},
  ...paths.map(path => getEntriesByPath(srcRoot, path))
)

module.exports = {
  getEntries,
}


