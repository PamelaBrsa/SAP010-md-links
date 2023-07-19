#!/usr/bin/env node


const mdlinks = require('./index.js');

const caminhoArquivo = process.argv[2];
const options = {
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats')
};

mdlinks(caminhoArquivo, options)
    .then((links) => {
        if (options.validate && options.stats) {
            console.log(`TOTAL: ${links.stats.total}`);
            console.log(`EXCLUSIVO: ${links.stats.exclusivo}`);
            console.log(`QUEBRADOS: ${links.stats.quebrados}`);
            console.log('============================');
        } else if (options.stats) {
            console.log(`TOTAL: ${links.stats.total}`);
            console.log(`EXCLUSIVO: ${links.stats.exclusivo}`);
            console.log('============================');
        } else if (options.validate) {
            links.forEach((link) => {
                console.log(`${link.file}'  ${link.href} ${link.text} ${link.ok} ${link.status}`);
                console.log('================================================================');
            })
        } else {
            links.forEach((link) => {
                console.log(`TEXTO: ${link.text}`);
                console.log(`HREF: ${link.href}`);
                console.log(`FILE: ${link.file}`);
                console.log('============================');
            })
        }
    })
    .catch ((error) => {
    console.error(error);
});

