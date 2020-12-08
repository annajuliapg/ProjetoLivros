const request = require("supertest");
const app = require('../index');

describe('Caso de Teste 1', () => {
    
    test('URL de usuários que não existe', async () => {
        const res = await request(app).get('/usu');
    
        expect(res.statusCode).toEqual(404);
    })
    
    test('Lista de Usuários', async () => {
        const res = await request(app).get('/usuarios');
    
        expect(res.statusCode).toEqual(200);
    })
})

describe('Caso de Teste 2', () => {
    
    test('URL de livros que não existe', async () => {
        const res = await request(app).get('/livro');
    
        expect(res.statusCode).toEqual(404);
    })
    
    test('Lista de Livros', async () => {
        const res = await request(app).get('/livros');
    
        expect(res.statusCode).toEqual(200);
    })
})

// test('acessa a rota /tdd e então será apresentada a seguinte defiição de tdd:', async () => {
//     const response = await request(server).get('/TDD');
//     expect(response.status).toEqual(200);
//     expect(response.text).toContain('<h4>no tdd primeiro fazemos os testes e depois desenvolvemos o sistema para que ele passe nos testes</h4>');
//  });
