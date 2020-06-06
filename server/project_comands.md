
# na pasta inicial do projeto (nesse caso 'server')
 
npm init -y    //-y serve para o npm criar o projeto com as configurações padrões sem fazer as perguntas que configuram


# instalando a biblioteca express para criação de rotas

npm install express


# instalando o pacote de tipagem do express

npm install @types/express -D  //-D serve para instalar algo em ambiente de desenvolvimento


# instala o pacote que converte typscript para javascript (Node)

npm install ts-node -D


# instala o typscript no projeto

npm install typescript -D


# cria o arquivo de configuração/inicialização do typscript

npx tsc --init


# comando para executar a aplicação

npx ts-node script_path (nesse caso npx ts-node src/server.ts)


# pacote que reinicia o servidor toda vez que houver uma alteração no código

npm install ts-node-dev -D

npx ts-node-dev script_path ( nesse caso npx ts-node-dev src/server.ts) // comando para iniciar o servidor com o pacote com restart automatico


# mas para facilitar e não ter que executar o comando grander (npx ts-node-dev src/server.ts) toda as vezes                                                  #
# cria um script no arquivo packge.json com o nome de dev e o script a ser excutado (nesse caso não precisa do npx então fica só ts-node-dev src/server.ts)  #
# e no terminal para executar o servidor agora é só rodar npm run nome_script_packge.json                                                                    #

npm run dev



# biblioteca do querybuilder que vai emular o banco de dados da aplicação 

npm install knex



# pacote para se conectar e trabalhar com banco SQL

npm install sqlite3


# comando para rodar as migrations 

npx knex migrate:latest --knexfile knexfile.ts migrate:latest


# instala biblioteca CORS que controla quais aplicações web podem acessa a API

npm install cors



# instala as dependencias do CROS para o typscript

npm install @types/cors


# biblioteca para lidar com upload de imagens 

npm install multer


# pacote de dependencias do multer para typscript

npm install @types/multer


# pacote para validação

npm install celebrate


# pacote do typscript da biblioteca celebrate (ela utiliza um biblioteca chamada Joi que faz as validações realmente para ela)

npm install @types/hapi__joi