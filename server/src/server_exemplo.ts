import  express from 'express';

//inicia a aplicação
const app = express();

// o metodo use configura funcionalidades na aplicação
// neste caso configura a aplicação para manipular e entender o formato JSON
app.use(express.json());


const users = [
    'Hugo',
    'Jéssica',
    'teste'
];

 /*--------------------------------------------------------------------------------*\
|*------------------------------  CRIANDO AS ROTAS ---------------------------------*|
 \*--------------------------------------------------------------------------------*/

 //rota para listar o usuários
app.get('/users',(request,response) => {
    const name = String(request.query.name);

    const filteredUsers =  users.filter(user => user.includes(name));

    response.json(filteredUsers);
});

//rota para retornar um unico usuário
app.get('/users/:id',(request,response) => {

    //é preciso converter o parametro id para Number, pois ele vem como string do request
    const id = Number(request.params.id);

    const user = users[id];

    response.json(user);
});

//rota para criar um usuário
app.post('/users',(request,response) => {
    const data = request.body;

    const user = {
        name: data.name,
        email: data.email
    };

    return response.json(user);
});

app.listen(3333);