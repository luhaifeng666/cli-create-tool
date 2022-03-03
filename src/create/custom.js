#!/usr/bin/env zx

require('zx/globals')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const initObject = require('../utils/default')
const {
	CZRC_CONTENT,
	HUSKYRC_CONTENT,
	COMMITLINTRC_CONTENT,
	LINTSTAGEDRC_CONTENT,
	GIT_IGNORE_CONTENT
} = require('../constants/defaultInit')
const { errorHandler } = require("../utils/common");

module.exports = async questions => {
	try {
		// 获取输入的信息
		const answers = await inquirer.prompt(questions)
		const { PROJECT_NAME, PROJECT_TYPE, PROJECT_AUTHOR, PROJECT_DESCRIPTION } = answers
		// 根据选择执行相应的命令
		switch (PROJECT_TYPE) {
			case 'vue2.x':
				await $`vue create ${PROJECT_NAME}`
				break
			case 'vue3.x':
				await $`yarn create vite ${PROJECT_NAME} --template vue`
				break
			default: break
		}
		// 初始化配置文件
		initObject(answers, [
			CZRC_CONTENT,
			HUSKYRC_CONTENT,
			COMMITLINTRC_CONTENT,
			LINTSTAGEDRC_CONTENT,
			GIT_IGNORE_CONTENT
		])
		// 跳转到新目录
		cd(PROJECT_NAME)
		// 安装插件
		await $`yarn add -D husky commitizen cz-conventional-changelog lint-staged`
		// 往package.json文件添加自定义内容
		const baseUrl = path.resolve(process.cwd(), 'package.json')
		fs.readFile(baseUrl, {
			encoding: 'utf-8'
		}, (err, data) => {
			if (err) {
				errorHandler({ type: 'Create objet defeat! The error message is: ', err })
			} else {
				const origin = JSON.parse(data)
				// 添加脚本
				origin.scripts = {
					...origin.scripts,
					"ca": "git add -A && git-cz -av",
					"commit": "git-cz"
				}
				// 设置基本信息
				const content = {
					name: PROJECT_NAME,
					author: PROJECT_AUTHOR,
					description: PROJECT_DESCRIPTION,
					...origin
				}
				// 将内容重新写入package.json
				fs.writeFile(baseUrl, JSON.stringify(content, null, '\t'), {
					encoding: 'utf-8'
				}, err => {
					err && errorHandler({ type: 'Create objet defeat! The error message is: ', err })
				})
			}
		})
	} catch (error) {
		errorHandler({ type: 'Create objet defeat! The error message is: ', error })
	}
}
