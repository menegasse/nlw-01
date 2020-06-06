# Rota: endereço completo da requisição

# Recurso: Qual entidades estamos acessando do sistema (usuários,produtos,carrinho,etc...)


# Metodos de Requisição:

    -> GET: Buscar uma ou mais informações do back-end;

    -> POST: Criar uma nova informação no back-end;

    -> PUT: Atualizar uma informação existente no back-end;

    ->DELETE: Remover uma informação no back-end;

# Parametros de Requisição:

    -> Request Param: Parâmetros que vem na própria rota que indentificam um recurso (parametros obrigatórios da rota);
         
         - Ex: o id para listar um unico usuário do sistema URL = http://localhost:3333/users/3;
         - Ex2: nas definições de rotas se define com /:param_name ('/users/:id') e é acessado seu valor por request.param.param_name (request.param.id);

    -> Query Param: Parâmetros nomiados opcionais, que geralmente são usados para se realizar filtragens na request;

        - Ex: o parametro name em uma busca pelos usuáriso com o nome igual URL = http://localhost:3333/users?name="Hugo";
        - Ex2: nas definições de rotas é acessado seu valor por request.query.param_name (request.query.name);

    -> Rquest Body: Parêmetros para criação/atualização de informações;

        - Ex: esse parametro não aparece na URL, ele geralmente é enviado em formato de JSON;
        - Ex2: nas definições de rotas é acessado seu valor por request.body, assim tendo acesso ao obejto JSON todo;