#!/usr/bin/env zx

require('zx/globals')
const inquirer = require('inquirer')
const initObject = require('../utils/default')

module.exports = async questions => {
  try {
    // 获取输入的信息
    const answers = await inquirer.prompt(questions)
    // 创建新的目录
    await $`mkdir ${answers.PROJECT_NAME}`
    // 跳转到新目录
    // cd(answers.PROJECT_NAME)
    // 输出新目录的路径信息，并对其进行初始化
    // const res = await $`pwd`
    await initObject(answers)
    // 返回目录名称
    return answers.PROJECT_NAME
  } catch (error) {
    console.log(chalk.red(`Create objet defeat! The error message is: ${error}`))
  }
}
