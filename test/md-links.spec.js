const {mdlinks, pegarLinks, validarLink, pegarEstatisticas  } = require('../index');
const fetch = require('cross-fetch')

jest.mock('cross-fetch', () => jest.fn());


describe ('pegarLinks', () => {
  it('retorna array de objetos com os links', () => {
    const data = `
    [Google](https://www.google.com).
    `;
    const file = 'example.md';
    const esperado = [
      {
        text: 'Google',
        href: 'https://www.google.com',
        file: 'example.md',
      }
    ];

    const links = pegarLinks(data,file);
    expect(links).toEqual(esperado);
  });
});



describe('mdLinks', () => {

  it('retorna diretório válido', () => {
    const path = 'arquivos/teste.md/'
    const options = {};
    const resultado = mdlinks(path, options);
    return resultado.then((links) => {
      links.forEach((link) => {
       expect(link).toHaveProperty('href');
       expect(link).toHaveProperty('text');
       expect(link).toHaveProperty('file');
      })
    })
  });
  it ('rejeita promise inválida', () => {
    const caminhoArquivo = '/arquivos/testes.md';
    const options = {invalidOption: true};

    expect(mdlinks(caminhoArquivo, options)).rejects.toThrow('opção inválida');
  });

  it('retorna matrix de links com estatísticas', () => {
    const caminho = './arquivos/teste.md';
    const options = { stats: true };
    return mdlinks(caminho, options)
      .then((resultado) => {
        expect(Array.isArray(resultado.links)).toBe(true);
      });
  });

  it('retorna array vazio', () => {
    const file = './arquivos/testevazio.md';
    const options = {};
    return mdlinks(file, options)
      .then((result) => {
        expect(result.length).toBe(0);
      });
  });
});

describe('validador', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn();
    fetch.mockImplementation(mockFetch);
  });

  describe('validador', () => {
    it('Deve validar corretamente os links md', () => {
      const links = { text: 'Markdown', href: 'http://test.md', file: 'README.md' };

      mockFetch.mockResolvedValueOnce({
        status: 200,
        ok: true,
      });

      return validarLink(links).then((result) => {
        expect(result).toEqual(
          { text: 'Markdown', href: 'http://test.md', file: 'README.md', status: 200, ok: 'OK' },
        );
      });
    });
  });

  it('Deve retornar o status "fail" quando a requisição falhar', () => {
    const url = {
      href: 'http://test.md',
    };

    mockFetch.mockRejectedValueOnce(('Request failed'));

    return validarLink(url).then((result) => {
      expect(result).toEqual({
        ...url,
        status: 'Request failed',
        ok: 'FAIL',
      });
    });
  });
})

describe('pegarEstatisticas', () => {
  it('deve retornar as estatísticas corretas para uma lista de links', () => {
    const links = [
      { href: 'https://www.exemplo1.com', ok: 'success' },
      { href: 'https://www.exemplo2.com', ok: 'success' },
      { href: 'https://www.exemplo3.com', ok: 'fail' },
      { href: 'https://www.exemplo4.com', ok: 'success' },
      { href: 'https://www.exemplo4.com', ok: 'fail' },
    ];

    const resultado = pegarEstatisticas(links);

    expect(resultado.total).toBe(5);
    expect(resultado.exclusivo).toBe(4);
    expect(resultado.quebrados).toBe(0);
  });
})