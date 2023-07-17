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
  


function mdLinks (diretorio, option = { validate: false}){
  return new Promise((resolver, rejeitar ) => {
    fs.promises.readFile(diretorio, 'utf8')
       .then((resultado) => {
         const links = pegarLinks (resultado, diretorio);
         console.log({option})
         if(option.validate) {
          const requisitar = links.map((link) => validarLink(link));
          Promise.all(requisitar)
            .then((validarLink)=>{
               resolver(validarLink);
            })
            .catch((error) =>{
              rejeitar(error);
            });
         }else {
          resolver(links);
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
//  mdLinks('./arquivos/teste.md', {validate: true})    

module.exports = mdLinks
// module.exports = validarLink