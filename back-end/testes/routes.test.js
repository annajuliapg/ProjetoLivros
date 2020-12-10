require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const request = require("supertest");
const app = require('../index');

const db = require("../db");

afterAll(async ()=> {
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
    });
    
    test('URL com id de usuário válido', async () => {
        const res = await request(app).get('/novos-livros/1');
    
        expect(res.statusCode).toEqual(200);
    });
});

describe('Caso de Teste 4', () => {

    test('URL de usuário inválido', async () => {
        const res = await request(app).get('/perfil/abc');

        expect(res.statusCode).toEqual(400);
        expect(res.text).toContain('Código de usuário inválido');
    });

    test('Usuário que existe', async () => {
        const res = await request(app).get('/perfil/1');

        expect(res.statusCode).toEqual(200);
    });
});

describe('Caso de Teste 5', () => {

    test('URL da avaliação não existe', async () => {
        const res = await request(app).get('/perfil/avaliacoes/abc');

        expect(res.statusCode).toEqual(400);
    });

    test('Lista de Avaliações de um usuário', async () => {
        const res = await request(app).get('/perfil/avaliacoes/1');

        expect(res.statusCode).toEqual(200);
    });
});

describe('Caso de Teste 6', () => {

    test('URL da lista "Para Ler" não existe', async () => {
        const res = await request(app).get('/para-ler/abc');

        expect(res.statusCode).toEqual(400);
    });

    test('Lista de livros com Status "Para Ler"', async () => {
        const res = await request(app).get('/para-ler/1');

        expect(res.statusCode).toEqual(200);
    });
});

describe('Caso de Teste 7', () => {

    test('URL da lista de "Lendo" não existe', async () => {
        const res = await request(app).get('/lendo-agora/abc');

        expect(res.statusCode).toEqual(400);
    });

    test('Lista de livros com Status "Lendo"', async () => {
        const res = await request(app).get('/lendo-agora/1');

        expect(res.statusCode).toEqual(200);
    });
});

describe('Caso de Teste 8', () => {

    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        const res = await request(app).get('/lidos/abc');

        expect(res.statusCode).toEqual(400);
    });

    test('Lista de livros com Status "Lendo"', async () => {
        const res = await request(app).get('/lidos/1');

        expect(res.statusCode).toEqual(200);
    });
});

describe('Caso de Teste 9', () => {

    test('Dados incompletos', async () => {
        let json = {
             id: 1
        };
        const res = await request(app).post("/para-ler/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Livro inserido corretamente na lista', async () => {
        let json = {
             idLivro: 5
        };
        const res = await request(app).post("/para-ler/6").send(json);
        expect(res.statusCode).toEqual(200);
    });

    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        let json = {
            idLivro: 9
        };
        const res = await request(app).post('/para-ler/abc').send(json);
        expect(res.statusCode).toEqual(400);
    });

    test('Livro ja adicionado na lista', async () => {
        let json = {
             idLivro: 5
        };
        const res = await request(app).post("/para-ler/6").send(json);
        expect(res.statusCode).toEqual(409);
    });
});

describe('Caso de Teste 10', () => {

    test('Dados incompletos - ID errado', async () => {
        let json = {
             id: 1,
             Data_Inicio_Leitura: "2020-10-10"
        };
        const res = await request(app).post("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Data Errada', async () => {
        let json = {
            idLivro: 1,
            Data_Inicio: "2020-10-10"
        };
        const res = await request(app).post("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Ambos errados', async () => {
        let json = {
             id: 1,
             Data_Inicio: "2020-10-10"
        };
        const res = await request(app).post("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Livro inserido corretamente na lista', async () => {
        let json = {
             idLivro: 6,
             Data_Inicio_Leitura: "2020-10-10"
        };
        const res = await request(app).post("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(200);
    });

    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        let json = {
            idLivro: 9,
            Data_Inicio_Leitura: "2020-10-10"
        };
        const res = await request(app).post('/lendo-agora/abc').send(json);
        expect(res.statusCode).toEqual(400);
    });

    test('Livro ja adicionado na lista', async () => {
        let json = {
             idLivro: 6,
             Data_Inicio_Leitura: "2020-10-10"
        };
        const res = await request(app).post("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(409);
    });
});

describe('Caso de Teste 11', () => {

    test('Dados incompletos - ID errado', async () => {
        let json = {
             id: 1,
             Data_Inicio_Leitura : "2020-10-10",
             Data_Termino_Leitura : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Data_Inicio_Leitura errada', async () => {
        let json = {
             idLivro: 1,
             Data_Inicio : "2020-10-10",
             Data_Termino_Leitura : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Data_Termino_Leitura errada', async () => {
        let json = {
             idLivro: 1,
             Data_Inicio_Leitura : "2020-10-10",
             Data_Termino : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - ID errado e Data_Inicio_Leitura errada', async () => {
        let json = {
             id: 1,
             Data_Inicio : "2020-10-10",
             Data_Termino_Leitura : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - ID errado e Data_Termino_Leitura errada', async () => {
        let json = {
             id: 1,
             Data_Inicio_Leitura : "2020-10-10",
             Data_Termino : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Data_Inicio_Leitura errada e Data_Termino_Leitura errada', async () => {
        let json = {
             idLivro: 1,
             Data_Inicio : "2020-10-10",
             Data_Termino : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Todos errados', async () => {
        let json = {
             id: 1,
             Data_Inicio : "2020-10-10",
             Data_Termino : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Livro inserido corretamente na lista', async () => {
        let json = {
             idLivro: 7,
             Data_Inicio_Leitura : "2020-10-10",
             Data_Termino_Leitura : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(200);
    });

    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        let json = {
            idLivro: 9,
            Data_Inicio_Leitura : "2020-10-10",
            Data_Termino_Leitura : "2020-10-20"
        };
        const res = await request(app).post('/lidos/abc').send(json);
        expect(res.statusCode).toEqual(400);
    });

    test('Livro ja adicionado na lista', async () => {
        let json = {
             idLivro: 7,
             Data_Inicio_Leitura : "2020-10-10",
             Data_Termino_Leitura : "2020-10-20"
        };
        const res = await request(app).post("/lidos/6").send(json);
        expect(res.statusCode).toEqual(409);
    });
});

describe('Caso de Teste 12', () => {

    test('Dados incompletos - ID errado', async () => {
        let json = {
             id: 1,
             Data_Inicio_Leitura: "2020-10-10"
        };
        const res = await request(app).patch("/para-ler/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Data Errada', async () => {
        let json = {
            idLivro: 1,
            Data_Inicio: "2020-10-10"
        };
        const res = await request(app).patch("/para-ler/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Ambos errados', async () => {
        let json = {
             id: 1,
             Data_Inicio: "2020-10-10"
        };
        const res = await request(app).patch("/para-ler/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Livro inserido corretamente na lista', async () => {
        let json = {
             idLivro: 5,
             Data_Inicio_Leitura: "2020-10-10"
        };
        const res = await request(app).patch("/para-ler/6").send(json);
        expect(res.statusCode).toEqual(200);
    });

    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        let json = {
            idLivro: 9,
            Data_Inicio_Leitura: "2020-10-10"
        };
        const res = await request(app).patch("/para-ler/abc").send(json);
        expect(res.statusCode).toEqual(400);
    });
    //falha aqui
    test('Livro ja atualizado', async () => {
        let json = {
             idLivro: 5,
             Data_Inicio_Leitura: "2020-10-10"
        };
        const res = await request(app).patch("/para-ler/6").send(json);
        expect(res.statusCode).toEqual(409);
    });    
});

describe('Caso de Teste 13', () => {

    test('Dados incompletos - ID errado', async () => {
        let json = {
             id: 1,
             Data_Termino_Leitura: "2020-10-20"
        };
        const res = await request(app).patch("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Data Errada', async () => {
        let json = {
            idLivro: 1,
            Data_Termino: "2020-10-20"
        };
        const res = await request(app).patch("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Ambos errados', async () => {
        let json = {
             id: 1,
             Data_Termino: "2020-10-20"
        };
        const res = await request(app).patch("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Livro inserido corretamente na lista', async () => {
        let json = {
             idLivro: 6,
             Data_Termino_Leitura: "2020-10-20"
        };
        const res = await request(app).patch("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(200);
    });

    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        let json = {
            idLivro: 6,
            Data_Termino_Leitura: "2020-10-20"
        };
        const res = await request(app).patch('/lendo-agora/abc').send(json);
        expect(res.statusCode).toEqual(400);
    });
    //falha aqui
    test('Livro ja atualizado', async () => {
        let json = {
             idLivro: 6,
             Data_Termino_Leitura: "2020-10-20"
        };
        const res = await request(app).patch("/lendo-agora/6").send(json);
        expect(res.statusCode).toEqual(409);
    });    
});

describe('Caso de Teste 14', () => {

    test('Dados incompletos - ID errado', async () => {
        let json = {
            id: 1,
            Avaliacao: 10
        };
        const res = await request(app).patch("/perfil/avaliacoes/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Avaliacao Errada', async () => {
        let json = {
            idLivro: 1,
            Avaliacoes: 10
        };
        const res = await request(app).patch("/perfil/avaliacoes/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Dados incompletos - Ambos errados', async () => {
        let json = {
            id: 1,
            Avaliacoes: 10
        };
        const res = await request(app).patch("/perfil/avaliacoes/6").send(json);
        expect(res.statusCode).toEqual(422);
    });

    test('Avaliacao do livro atualizada corretamente', async () => {
        let json = {
            idLivro: 6,
            Avaliacao: 10
        };
        const res = await request(app).patch("/perfil/avaliacoes/6").send(json);
        expect(res.statusCode).toEqual(200);
    });

    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        let json = {
            idLivro: 6,
            Avaliacao: 10
        };
        const res = await request(app).patch("/perfil/avaliacoes/abc").send(json);
        expect(res.statusCode).toEqual(400);
    });
    //falha aqui
    test('Avaliacao do livro ja atualizada', async () => {
        let json = {
            idLivro: 6,
            Avaliacao: 10
        };
        const res = await request(app).patch("/perfil/avaliacoes/6").send(json);
        expect(res.statusCode).toEqual(409);
    });    
});

describe('Caso de Teste 15', () => {

    test('URL com id de usuário inválido - NOT A NUMBER', async () => {
        const res = await request(app).delete("/remover/5/abc");
        expect(res.statusCode).toEqual(400);
    });

    test('URL com id de livro inválido - NOT A NUMBER', async () => {
        const res = await request(app).delete("/remover/abc/6");
        expect(res.statusCode).toEqual(400);
    });

    test('URL com ambos inválidos - NOT A NUMBER', async () => {
        const res = await request(app).delete("/remover/abc/def");
        expect(res.statusCode).toEqual(400);
    });
    
    test('Livro 5 deletado corretamente', async () => {
        const res = await request(app).delete("/remover/5/6");
        expect(res.statusCode).toEqual(200);
    });

    test('Livro 6 deletadoa corretamente', async () => {
        const res = await request(app).delete("/remover/6/6");
        expect(res.statusCode).toEqual(200);
    });

    test('Livro 7 deletado corretamente', async () => {
        const res = await request(app).delete("/remover/7/6");
        expect(res.statusCode).toEqual(200);
    });

    //falha aqui
    test('Remocao do livro ja realizada', async () => {
        const res = await request(app).delete("/remover/7/6");
        expect(res.statusCode).toEqual(409);
    }); 
});