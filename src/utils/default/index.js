#!/usr/bin/env zx

require('zx/globals')
const { copyDir, errorHandler } = require('../common')

/**
 * 复制template目录下的所有文件到指定目录
 * @param {Object} dirInfo 新建的目录信息
 * @param {Object} answers 输入的信息
 */
module.exports = (dirInfo, answers) => {
  try {
    const { stdout } = dirInfo
    const baseDir = process.cwd()
    const targetDir = stdout.replace('\n', '')
    // 复制template到指定目录
    copyDir(path.resolve(baseDir, 'src/template'), targetDir, () => {
      // 修改package.json文件中的内容
      const {
        PROJECT_NAME,
        PROJECT_DESCRIPTION,
        PROJECT_AUTHOR
      } = answers
      fs.readFile(`${targetDir}/package.json`, { encoding: 'utf-8'}, (err, data) => {
        const content = JSON.parse(data)
        content.name = PROJECT_NAME
        content.description = PROJECT_DESCRIPTION
        content.author = PROJECT_AUTHOR
        fs.writeFileSync(`${targetDir}/package.json`, JSON.stringify(content, null, '\t'))
      })
    })
  } catch (err) {
    errorHandler({
      type: 'Copy template defeat: ',
      err
    })
  }
}
