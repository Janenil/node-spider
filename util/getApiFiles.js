const fs = require('fs')
const path = require('path')

module.exports = () => {
  let files = fs.readdirSync(path.join(__dirname, '../server/controllers'))
  let jsFiles = files.filter((f) => {
    return f.endsWith('.js')
  }, files)
  return jsFiles
}