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




// function mdLinks () {
//   console.log("banana")
// }
//  mdLinks()

// module.exports =  mdLinks;  
