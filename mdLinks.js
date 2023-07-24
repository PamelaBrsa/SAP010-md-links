#!/usr/bin/env node

const mdlinks = require('./index.js');
const chalk = require('chalk');

const caminhoArquivo = process.argv[2];
const options = {
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats')
};

mdlinks(caminhoArquivo, options)
    .then((links) => {
        if (options.validate && options.stats) {
            console.log(chalk.magenta(`TOTAL: ${links.stats.total}`));
            console.log(chalk.yellow(`EXCLUSIVO: ${links.stats.exclusivo}`));
            console.log(chalk.red(`QUEBRADOS: ${links.stats.quebrados}`));
            console.log(chalk.black('============================'));
        } else if (options.stats) {
            console.log(chalk.magenta(`TOTAL: ${links.stats.total}`));
            console.log(chalk.yellow(`EXCLUSIVO: ${links.stats.exclusivo}`));
            console.log(chalk.black('============================'));
        } else if (options.validate) {
            links.forEach((link) => {
                console.log(chalk.cyan(`${link.file}'  ${link.href} ${link.text} ${link.ok} ${link.status}`));
                console.log(chalk.black('================================================================'));
            })
        } else {
            links.forEach((link) => {
                console.log(chalk.magenta(`TEXTO: ${link.text}`));
                console.log(chalk.yellow(`HREF: ${link.href}`));
                console.log(chalk.red(`FILE: ${link.file}`));
                console.log(chalk.black('============================'));
            })
        }
    })
    .catch ((error) => {
    console.error(error);
});

