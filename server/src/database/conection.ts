//importa o querybuilder
import knex from 'knex';

//biblioteca nativa do Node para mexer com paths (por causa dos SOs diferentes)
import path from 'path';

const connection = knex({
    client : 'sqlite3',
    connection: {
        //__dirname variavel global que retorna o caminho do arquivo que esta sendo executado
        // cria o arquivo database.slqite para realizar a conexão com o banco
        filename: path.resolve(__dirname,'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;