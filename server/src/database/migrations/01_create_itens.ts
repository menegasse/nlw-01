import Knex from 'knex';

//metodo Up será executado quando o migration for rodado (fazer a alteração necessária no banco)
export async function up(knex: Knex){
    //criando tabela no banco
    return knex.schema.createTable('items', table => {
    /*          regra para criar a coluna:                     */
    /*          tabela.typo_coluna('name_coluna', tamanho do campo).constraint   */
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

//metodo Down será executado para desfazer a o que metodo Up fez no banco
export async function down(knex: Knex){
    return knex.schema.dropTable('items');
}