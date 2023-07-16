//biblioteca nativa do node
// const fs = require ('fs'); 
// const path = require('path');

// function mdLinks (diretorio){
//     if(path.extname(diretorio) === '.md'){
//         fs.readFile(diretorio, 'utf8', function(err, data){
//             if(data){
//                 const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
//                 const links = data.match(regex);
//                 console.log(diretorio, links); 
//             }else {
//                 return err
//             }     
//        });
//     }
// }
   
// const diretorio = './README.md'
// mdLinks(diretorio)
           

// module.exports = mdLinks
//saber extensão
// const path = require('path')
// const caminho = './arquivos/teste.md'
// const extensao = path.extname(caminho)
// console.log(extensao)
// //conteudo do diretório
// fs.readdir('./arquivos/', (err, files) => {
//    if (err) {
//     console.error(err);
//     return;
//    }
//    console.log(files)
// })

