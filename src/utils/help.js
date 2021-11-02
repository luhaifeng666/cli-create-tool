const {program} = require("commander");
const process = require("process");

module.exports = () => {
    program.option('-v, --version', 'get the tool\'s version information')
        .option('-u, --update [version]', 'update cli-create-tool')
        .option('-c, --create', 'create an empty object')
        .parse(process.argv)
}
