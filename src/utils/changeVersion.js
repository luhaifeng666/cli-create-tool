const fs = require('fs')
const process = require('process')
const packageContent = require('../../package.json')
const { errorHandler } = require('../utils/common')

// 获取包名称
const packageName = packageContent.name
// 定义标签内容
const TAG_LINK_RULES = {
    node: 'node-v(.*)-green',
    [packageName]: 'cli--create--tool-v(.*)-orange'
}
// 获取命令行参数
const options = process.argv.slice(2)
let [tag, version] = options
// 如果不传tag名称，则默认设置tag为包名称
if (!version) {
    version = tag
    tag = packageName
}
// 打印修改版本的信息
console.table({
    tag,
    version
})
/**
 * 修改版本号图标
 * @param tag
 * @param version
 */
function changeVersion (tag, version) {
    const baseDir = `${process.cwd()}/README.md`
    // 获取README中的内容
    fs.readFile(baseDir, (err, data) => {
        if (err) {
            errorHandler({ type: 'Change version error: ', err })
            return
        }
        // 替换README中的图标
        const fileContent = data.toString().replace(
            new RegExp(TAG_LINK_RULES[tag], 'g'),
            TAG_LINK_RULES[tag].replace('(.*)', version)
        )
        // 重新写入README
        fs.writeFile(baseDir, fileContent, err => {
            if (err) {
                errorHandler({ type: 'Change version error when wrote version code to README.md: ', err })
                return
            }
        })
    })
}

// 修改版本号
changeVersion(tag, version)
