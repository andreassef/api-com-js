class LivrosDao {
    constructor(db) {
        this._db = db;
    }

    index() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM livros',
                (erro, resultados)=>{
                    if(erro) return reject('Não foi possível listar os livros!');
                    return resolve(resultados);
                })
        });
    }

    create(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            INSERT INTO LIVROS (
                titulo,
                preco,
                descricao
            ) values (?, ?, ?)
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao
            ],
            function (err) {
                if (err) {
                    console.log(err);
                    return reject('Não foi possível adicionar o livro ao banco de dados')
                }
                resolve();
            }
            )
        });
    }
}

module.exports = LivrosDao;