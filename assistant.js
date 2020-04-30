const fs = require('fs');
const argv = require('yargs').argv;

function assistant() {
    const folderLists = fs.readdirSync("./assets", { withFileTypes: true })
    .filter(folder =>  folder.isDirectory())
    .map(folder => folder.name);

    if(folderLists.indexOf( argv.landing ) === -1) {
        console.error(`\x1b[31mЛендинга с названием ${argv.landing} не существует`);
        process.exit(-1);
    }
}

module.exports = assistant;
