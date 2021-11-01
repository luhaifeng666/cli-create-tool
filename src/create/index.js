#!/usr/bin/env zx

require('zx/globals')
const inquirer = require('inquirer')
const { DEFAULT_QUESTIONS, CUSTOM_QUESTIONS } = require('../constants/questions')
const defaultCreateHandler = require('./default')
const customCreateHandler = require('./custom')

/**
 * 定义交互式命令行的问题
 * type ${string} 交互类型
 * name ${string} 用来接收用户输入内容的key
 * message ${交互信息}
 * Documentation: https://www.npmjs.com/package/inquirer#examples
 */
const questions = [{
  type: 'confirm',
  name: 'USE_DEFAULT',
  message: 'Use default template?'
}]

module.exports.run = async () => {
  try {
    // 获取输入的信息
    const { USE_DEFAULT } = await inquirer.prompt(questions)
    USE_DEFAULT ? await defaultCreateHandler(DEFAULT_QUESTIONS) : await customCreateHandler(CUSTOM_QUESTIONS)
    console.log(chalk.green('CreationCompleted! Enjoy yourself!'))
  } catch (error) {
    console.log(chalk.red(`Create objet defeat: ${error}`))
  }
}
