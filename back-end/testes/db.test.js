
require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const db = require("../db");

test('usuário que não existe', async () => {
    const selectUsuario = await db.selectUsuario(5);
    expect(selectUsuario).toBe(1);
});