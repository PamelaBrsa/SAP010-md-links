const fs = require('fs');
const fetch = require('cross-fetch')
const path = require('path');




function validarCaminho (file) {
  const validar = path.resolve(file);
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, conteudo) => {
      if(error) {
        if(!file.endsWith(".md")){
          reject(new Error("Não foi encontrado um caminho md"));
        } else {
          reject(new Error("Erro ao ler o arquivo)"));
        }
        return
        }

        const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
        const capturarRegex = [...conteudo.matchAll(regex)];
        const resultado = capturarRegex.map((match) => ({
          text: match[1],
          href: match[2],
          file: validar,
      
        }));
        resolve(resultado);
      });
    });
  }

  
  function validarLink (url,text, file) {

    return fetch(url)
    .then((response) => ({
      href: url,
      text: text,
      file: file,
      status: response.status ? "ok" : "error",
      ok: response.ok ? "ok" : "fail",
    }))
    .catch((error) => ({
      href: url,
      text: text,
      file: file,
      status: "error",
      ok: "fail",
    }));
  }


function mdlinks(file, options  = { validate: false }) {
  const validar = path.resolve(file);
  return validarCaminho(validar)
     .then((links)=> {
      if(options.validate){
        let promises = links.map(link => validarLink(link.href, link.text, link.file));
        return Promise.all(promises);
      }else {
        return links;
      }
     })
     .catch ((error) => {
      console.error(error)
     });
}

  

   

                module.exports = { mdlinks, validarLink, validarCaminho }
