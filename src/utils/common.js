#!/usr/bin/env zx

require('zx/globals')

/**
 * 错误处理
 * @param type 错误描述
 * @param err 错误对象
 */
const errorHandler = ({type = 'Error: ', err = {}}) => {
  console.log(chalk.red(type, '>>>>', err.message))
}

/**
 * 拷贝文件夹
 * @param {String} 源路径
 * @param {String} 目标路径
 */
const copyDir = (from, to, cb) => {
  // 判断from是否存在
  fs.access(from, err => {
    if (err) {
      errorHandler({ err })
      return
    }
  })
  // 获取from下所有的文件
  try {
    fs.readdir(from, (err, paths) => {
      if (err) throw new Error(err)
      paths.forEach(path => {
        // 判断是否是文件夹
        fs.stat(`${from}/${path}`, (err, stat) => {
          if (err) {
            errorHandler({ type: 'Fs-stat error: ', err })
            return
          } else {
            if (stat.isDirectory()) {
              // 如果是目录，则在目标路径下创建新的同名目录
              fs.mkdir(`${to}/${path}`, { recursive: true }, err => {
                if (err) {
                  errorHandler({ type: 'Copy directory error: ', err })
                  return
                } else {
                  copyDir(`${from}/${path}`, `${to}/${path}`)
                }
              })
            } else {
              // 如果是文件，则把文件直接复制到目标目录下
              fs.copyFile(`${from}/${path}`, `${to}/${path}`, err => {
                if (err) {
                  errorHandler({ type: 'Copy file error: ', err })
                  return
                }
                // 如果是package.json文件，则将创建时填入的信息写入其中
                if (path === 'package.js') cb()
              })
            }
          }
        })
      })
    })
  } catch(err) {
    errorHandler({ err })
  }
  // 遍历所有的文件
}

module.exports = { copyDir, errorHandler }
