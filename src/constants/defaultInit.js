// 定义index.js内容
const INDEX_CONTENT = {
    filename: 'src/index.js',
    content: ''
}
// 定义package.json内容
const PACKAGE_CONTENT = {
    filename: 'package.json',
    content: JSON.stringify({
        "version": "1.0.0",
        "main": "index.js",
        "scripts": {
            "ca": "git add -A && git-cz -av",
            "commit": "git-cz"
        },
        "keywords": [],
        "license": "ISC",
        "devDependencies": {
            "husky": "^5.0.9",
            "commitizen": "^4.2.3",
            "cz-conventional-changelog": "^3.3.0",
            "lint-staged": "^10.5.4"
        }
    })
}

// 定义.czrc内容
const CZRC_CONTENT = {
    filename: '.czrc',
    content: '{ "path": "cz-conventional-changelog" }'
}
// 定义.huskyrc内容
const HUSKYRC_CONTENT = {
    filename: '.huskyrc.yml',
    content: `hooks:
      pre-commit: lint-staged
      commit-msg: 'commitlint -E HUSKY_GIT_PARAMS'
    `
}
// 定义.commitlintrc内容
const COMMITLINTRC_CONTENT = {
    filename: '.commitlintrc.yml',
    content: `extends:
      - '@commitlint/config-conventional'
    `
}
// 定义.lintstagedrc内容
const LINTSTAGEDRC_CONTENT = {
    filename: '.lintstagedrc.yml',
    content: `'**/*.{js, jsx, vue}':
      - 'eslint --fix'
      - 'git add'
    '**/*.{less, md}':
      - 'prettier --write'
      - 'git add'
    `
}

// 定义.gitignore
const GIT_IGNORE_CONTENT = {
    filename: '.gitignore',
    content: '/node_modules'
}

module.exports = {
    INDEX_CONTENT,
    PACKAGE_CONTENT,
    CZRC_CONTENT,
    HUSKYRC_CONTENT,
    COMMITLINTRC_CONTENT,
    LINTSTAGEDRC_CONTENT,
    GIT_IGNORE_CONTENT
}
