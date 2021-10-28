const path = require('path')
const colors = require('colors')
const inquirer = require("inquirer")
const shell = require("shelljs")
const COLORS_DEFINATION = require('../constants/console-colors.js')

colors.setTheme(COLORS_DEFINATION)

/**
 * 定义交互式命令行的问题
 * type ${string} 交互类型
 * name ${string} 用来接收用户输入内容的key
 * message ${交互信息}
 * Document: https://www.npmjs.com/package/inquirer#examples
 */
const questions = [{
  type: 'input',
  message: '请输入文件名称:',
  name: 'FILE_NAME'
}]

module.exports.run = async () => {
  const { FILE_NAME } = await inquirer.prompt(questions)
  console.log(FILE_NAME.success)
}