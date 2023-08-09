#!/usr/bin/env node

const {mdlinks} = require('./index.js');
const chalk = require('chalk');

const caminhoArquivo = process.argv[2];
const options = {
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats')
   
};

function mdLinks(options, links){
    
        if (options.validate && options.stats) {
            const { total, exclusivo, quebrados} = pegarEstatisticas(links);
            console.log(chalk.magenta(`TOTAL: ${total}`));
            console.log(chalk.yellow(`EXCLUSIVOS: ${exclusivo}`));
            console.log(chalk.red(`QUEBRADOS: ${quebrados}`));
            console.log(('============================'));
        } else if (options.stats) {
            const { total, exclusivo} = pegarEstatisticas(links);
            console.log(chalk.magenta(`TOTAL: ${total}`));
            console.log(chalk.yellow(`EXCLUSIVOS: ${exclusivo}`));
            console.log(('============================'));
        } else if (options.validate) {
            links.forEach((link) => {
                console.log(chalk.cyan(`${link.file}'  ${link.href} ${link.text} ${link.ok} ${link.status}`));
                console.log(('================================================================'));
            })
        } else {
            links.forEach((link) => {
                console.log(chalk.magenta(`TEXTO: ${link.text}`));
                console.log(chalk.yellow(`HREF: ${link.href}`));
                console.log(chalk.red(`FILE: ${link.file}`));
                console.log(chalk.black('============================'));
            })
        }
}

function pegarEstatisticas(links){
  const total = links.length;
  const exclusivo = [...new Set(links.map((link) => link.href))].length;
  const quebrados = links.filter((link) => link.ok === 'FAIL').length;

   return {
    total: total,
    exclusivo: exclusivo,
    quebrados: quebrados
  };
}

mdlinks(caminhoArquivo, options)
 .then((resultado)=> {
     mdLinks(options, resultado);
 })