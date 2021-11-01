#!/usr/bin/env zx

require('zx/globals')
const { errorHandler } = require('../common')
const {
  INDEX_CONTENT,
  PACKAGE_CONTENT,
  CZRC_CONTENT,
  HUSKYRC_CONTENT,
  COMMITLINTRC_CONTENT,
  LINTSTAGEDRC_CONTENT,
  GIT_IGNORE_CONTENT
} = require('../../constants/defaultInit')

/**
 * 复制template目录下的所有文件到指定目录
 * @param {Object} answers 输入的信息
 */
module.exports = (answers) => {
  try {
    const { PROJECT_NAME } = answers
    const baseDir = `${process.cwd()}/${PROJECT_NAME}`
    // 创建src目录，并创建index.js文件
    fs.mkdir(`${baseDir}/src`, { recursive: true }, err => {
      if (err) {
        errorHandler({err})
        return
      }
      // 创建文件
      const files = [
        INDEX_CONTENT,
        PACKAGE_CONTENT,
        CZRC_CONTENT,
        HUSKYRC_CONTENT,
        COMMITLINTRC_CONTENT,
        LINTSTAGEDRC_CONTENT,
        GIT_IGNORE_CONTENT
      ]
      files.forEach(file => {
        const { filename, content } = file
        let fileContent = content
        // 如果是package.json，则填入相应的信息
        if (filename === 'package.json') {
          const { PROJECT_NAME, PROJECT_DESCRIPTION, PROJECT_AUTHOR } = answers
          const packageContent = {
            name: PROJECT_NAME,
            author: PROJECT_AUTHOR,
            description: PROJECT_DESCRIPTION,
            ...JSON.parse(content)
          }
          fileContent = JSON.stringify(packageContent, null, '\t')
        }
        fs.writeFile(`${baseDir}/${file.filename}`, fileContent, {
          encoding: 'utf-8'
        }, err => {
          err && errorHandler({ type: 'Create index.js failed: ', err })
        })
      })
    })
  } catch (err) {
    errorHandler({ type: 'Copy template defeat: ', err })
  }
}
