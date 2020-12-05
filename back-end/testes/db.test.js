// para testar - npm test

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const db = require("../db");

afterAll(() => {
    db.close();
});

test('usuário que não existe', async () => {
    const selectUsuario = await db.selectUsuario(10);
    expect(selectUsuario).toBe(-1);
});

test('usuário que existe', async () => {
    const selectUsuario = await db.selectUsuario(4);
    expect(selectUsuario).toEqual([{"Biografia_Usuario": "Don't talk to me I'm reading", "Livros_Lidos": 1, "Nome_Exibicao": "Maria", "Nome_Usuario": "Stitch", "Paginas_Lidas": 185, "Tempo_Total_Leitura": 10, "idUsuario": 4}]);
});
