#!/usr/bin/env zx

require('zx/globals')
const inquirer = require('inquirer')
const initObject = require('../utils/default')
const {
  PACKAGE_CONTENT,
  CZRC_CONTENT,
  HUSKYRC_CONTENT,
  COMMITLINTRC_CONTENT,
  LINTSTAGEDRC_CONTENT,
  GIT_IGNORE_CONTENT
} = require('../constants/defaultInit')

module.exports = async questions => {
  try {
    // 获取输入的信息
    const answers = await inquirer.prompt(questions)
    // 创建新的目录
    await $`mkdir ${answers.PROJECT_NAME}`
    // 初始化
    await initObject(answers, [
      PACKAGE_CONTENT,
      CZRC_CONTENT,
      HUSKYRC_CONTENT,
      COMMITLINTRC_CONTENT,
      LINTSTAGEDRC_CONTENT,
      GIT_IGNORE_CONTENT
    ])
    // 跳转至目录
    cd(answers.PROJECT_NAME)
    // 执行安装命令
    await $`yarn`
  } catch (error) {
    console.log(chalk.red(`Create objet defeat! The error message is: ${error}`))
  }
}
