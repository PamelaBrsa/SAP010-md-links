const fs = require ('fs'); 
const fetch = require('cross-fetch')
const path = require('path');




function pegarLinks(data, diretorio) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturarRegex = [...data.matchAll(regex)];
  const resultado = capturarRegex.map((match) => ({
    text: match[1],
    href: match[2],
    file: diretorio
    
  }));
  return resultado;
  }
  
  function arquivo(file) {
    return new Promise((resolve, reject) => {
      fs.promises.stat(file)
        .then((stats) => resolve(stats.isDirectory()))
        .catch(() => resolve(false));
    });
  }
  
  function mdlinks(file, options) {
    return new Promise((resolve, reject) => {
      arquivo(file)
        .then((isDir) => {
          if (isDir) {
            fs.promises.readdir(file)
              .then((files) => {
                const promises = files.map((filename) => {
                  const caminho = path.join(file, filename);
                  return mdlinks(caminho, options);
                });
                Promise.all(promises)
                  .then((resultados) => {
                    const todosLinks = resultados.reduce((acc, links) => acc.concat(links), []);
                    if (options.stats) {
                      const stats = pegarEstatisticas(todosLinks);
                      resolve({ links: todosLinks, stats });
                    } else {
                      resolve(todosLinks);
                    }
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            const validarCaminho = path.extname(file).toLowerCase();
            if (validarCaminho === '.md') {
              fs.promises.readFile(file, 'utf-8')
                .then((result) => {
                  const links = pegarLinks(result, file);
                  if (options.validate) {
                    const solicitar = links.map((link) => validarLink(link));
                    Promise.all(solicitar)
                      .then((validatedLinks) => {
                        if (options.stats) {
                          const stats = pegarEstatisticas(validatedLinks);
                          resolve({ links: validatedLinks, stats });
                        } else {
                          resolve(validatedLinks);
                        }
                      })
                  } else {
                    if (options.stats) {
                      const stats = pegarEstatisticas(links);
                      resolve({ links, stats });
                    } else {
                      resolve(links);
                    }
                  }
                })
                .catch(() => {
                  console.log('caminho inexistente');
                });
            } else {
              console.log('não é um caminho .md');
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  


  
  function validarLink (link) {
    //requisiçãp http para validar
    
    return fetch (link.href)

    .then((resposta) =>{
      link.status = resposta.status;
      link.ok = 'OK';
      if(link.status >= 400){
        link.ok = 'FAIL';
      }
      return link;
    })
    .catch((erro)=> {
      link.status = erro;
      link.ok = 'FAIL';
      return link;
    })
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




//  mdLinks('./arquivos/teste.md', {validate: true})    

 module.exports = {mdlinks, pegarLinks, validarLink, pegarEstatisticas}
