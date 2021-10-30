#!/usr/bin/env zx

require('zx/globals')
const inquirer = require('inquirer')

module.exports = async questions => {
  try {
    // 获取输入的信息
    const {
      PROJECT_NAME,
      PROJECT_DESCRIPTION,
      PROJECT_AUTHOR
    } = await inquirer.prompt(questions)
    // 创建新的目录
    await $`mkdir ${PROJECT_NAME}`
    // 创建package.json, 并替换对应信息
    await fs.createFile(`${PROJECT_NAME}/package.json`)
    // 创建src目录，并在其中创建index.js
    await $`mkdir ${PROJECT_NAME}/src`
    fs.createFile(`${PROJECT_NAME}/src/index.js`)
  } catch (error) {
    console.log(chalk.red(`Create objet defeat! The error message is: ${error}`))
  }
}