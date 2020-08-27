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

    update(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if(erro) {
                    return reject('Não foi possível atualizar a tupla')
                }
                resolve();
            })
        })
    }

    find(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM LIVROS WHERE id=?`, 
            [id],
            (err, livro) => {
                if(err) {
                    console.log(err);
                    return reject('Livro nao encontrado')
                }
                return resolve(livro);
            })
        })
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = LivrosDao;