const mdLinks = require('../index');


const testes = [
  {
    href: "https://www.youtube.com/",
    text: "TESTE",
    file: './teste1.md',
  },
  {
    href: "https://github.com/PamelaBrsa",
    text: "TESTE2",
    file: './teste2.md',
  },
  {
    href: "https://www.laboratoria.",
    text: "TESTE3",
    file: './teste3.md',
  },
];


describe('mdLinks', () => {

  it('retorna um array de objetos', () => {
    const testar = mdLinks('./teste1.md')
    expect(testar).resolves.toEqual(testes)
  });
});

describe('mdLinks', () => {
  test('retorna array sem links', () => {
    const caminhoVazio = './arquivos/testevazio.md'
    const options = { validate: true, stats: true }

    return mdLinks(caminhoVazio, options)
      .then((resulado) => {
        expect(resulado).toEqual({ links: [], stats: { quebrados: 0, total: 0, exclusivos: 0 } })
      })
  })
})