const fs = require('fs')
const path = require('path')

const dirPath = path.resolve(__dirname, '../src/scripts')

const defaultMd = `# 爬虫和脚本 Crawler & Script

`

let mdStr = defaultMd

fs.readdirSync(dirPath).forEach(filename => {
  const readmeFilePath = path.resolve(dirPath, filename, 'README.md')

  if (fs.existsSync(readmeFilePath)) {
    const readme = fs.readFileSync(readmeFilePath, 'utf8')
    mdStr += readme
  }
})

fs.writeFileSync(path.resolve(__dirname, '../README.md'), mdStr)
