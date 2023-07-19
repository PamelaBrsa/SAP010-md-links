const fs = require ('fs'); 
const fetch = require('cross-fetch')




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
  


function mdLinks (diretorio, option = { validate: false, stats: false}){
  return new Promise((resolver, rejeitar ) => {
    fs.promises.readFile(diretorio, 'utf8')
       .then((resultado) => {
         const links = pegarLinks (resultado, diretorio);
         if(option.validate) {
          const requisitar = links.map((link) => validarLink(link));
          Promise.all(requisitar)
            .then((validarLink)=> {
              if(option.stats) {
                const stats= pegarEstatisticas(validarLink);
                resolver({links: validarLink, stats});
              } else {
                resolver(validarLink);
              }
            })
            .catch((error) =>{
              rejeitar(error);
            });
         }else {
          if(option.stats){
            const stats = pegarEstatisticas(links);
            resolver({links, stats});
          }else {
            resolver(links)
          }
         }          
       });
      })

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

 module.exports = mdLinks
