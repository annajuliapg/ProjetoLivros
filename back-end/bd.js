const mysql = require('mysql2');

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Syst3mSyst3m',
        database: 'shelf'
    });

async function conectar() {
    
    con.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
    })

    //return con;
}

async function terminar() {
    con.end((err) => {
        if(err) {
            console.log('Erro to finish connection...', err)
            return 
        }
        console.log('The connection was finish...')
    })
}

/* USUARIO */

//SELECT
async function selectUsuario(idUsuario) {
    
    conectar();

    con.query("SELECT * FROM usuario WHERE idUsuario = ?;", idUsuario, (err, rows) => {
        if (err) throw err

        else if (!rows.length) return -1
        else return rows;
    }
    );
}

console.log(selectUsuario(1));
/*
conectar();

con.query("SELECT * FROM usuario WHERE idUsuario = ?;", 1, (err, rows) => {
    if (err) throw err

    console.log(rows);
}
);
*/

