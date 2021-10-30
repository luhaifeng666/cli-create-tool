// 定义默认模板的提问
const DEFAULT_QUESTIONS = [{
  type: 'input',
  name: 'PROJECT_NAME',
  message: 'Project name:',
  validate: function (name) {
    const done = this.async()
    // 如果目录已经存在，提示修改目录名称
    if (fs.existsSync(name)) {
      done(`The directory "${name}" is exist!!Please reset the dirname.`, true)
      return
    }
    done(null, true)
  }
}, {
  type: 'input',
  name: 'PROJECT_DESCRIPTION',
  message: 'Project description:'
}, {
  type: 'input',
  name: 'PROJECT_AUTHOR',
  message: 'Project author:'
}]
// 定义自定义模板的提问
const CUSTOM_QUESTIONS = []

module.exports = { DEFAULT_QUESTIONS, CUSTOM_QUESTIONS }