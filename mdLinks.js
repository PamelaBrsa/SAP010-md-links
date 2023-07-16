#!/usr/bin/env node


const mdlinks = require('./index.js');

const caminhoArquivo = process.argv[2];
const options = {
    validate: process.argv.includes('--validate')
};

mdlinks(caminhoArquivo, options)
.then((link) => {
  link.forEach(link => {
      if(options.validate){
        console.log(`TEXTO: ${link.text}`);
        console.log(`HREF: ${link.href}`);
        console.log(`FILE: ${link.file}`);
        console.log(`STATUS: ${link.status}`);
        console.log(link.ok);
        console.log('============================');
      } else {
        console.log(link)
      }
    })
})

