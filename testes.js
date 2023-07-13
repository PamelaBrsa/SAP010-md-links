//biblioteca nativa do node
const fs = require ('fs'); 
fs.readFile('./README.md', 'utf-8', (err, data) => {
  if(err) {
      console.error(err);
      return
  } 
  //impime os links com caracteres
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
  const links = data.match(regex);
  console.log(links);  
});           
//saber extensão
const path = require('path')
const caminho = './arquivos/teste.md'
const extensao = path.extname(caminho)
console.log(extensao)
//conteudo do diretório
fs.readdir('./arquivos/', (err, files) => {
   if (err) {
    console.error(err);
    return;
   }
   console.log(files)
})

