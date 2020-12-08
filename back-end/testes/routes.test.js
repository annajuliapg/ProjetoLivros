require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const request = require("supertest");
const app = require('../index');

const db = require("../db");

afterAll(() => {
    db.close();
});

describe('Caso de Teste 1', () => {
    
    test('URL de usuários que não existe', async () => {
        const res = await request(app).get('/usu');
    
        expect(res.statusCode).toEqual(404);
    });
    
    test('Lista de Usuários', async () => {
        const res = await request(app).get('/usuarios');
    
        expect(res.statusCode).toEqual(200);
    });
});

describe('Caso de Teste 2', () => {
    
    test('URL de livros que não existe', async () => {
        const res = await request(app).get('/livro');
    
        expect(res.statusCode).toEqual(404);
    });
    
    test('Lista de Livros', async () => {
        const res = await request(app).get('/livros');
    
        expect(res.statusCode).toEqual(200);
    });
});

describe('Caso de Teste 3', () => {
    
    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        const res = await request(app).get('/novos-livros/abc');
    
        expect(res.statusCode).toEqual(400);
        expect(res.text).toContain('Código de usuário inválido');
    });
    
    test('URL com id de usuário válido', async () => {
        const res = await request(app).get('/novos-livros/1');
    
        expect(res.statusCode).toEqual(200);
    });
});
