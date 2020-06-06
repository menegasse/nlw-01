import Knex from 'knex';

//metodo Up será executado quando o migration for rodado (fazer a alteração necessária no banco)
export async function up(knex: Knex){
    //criando tabela no banco
    return knex.schema.createTable('points_items', table => {
    /*          regra para criar a coluna:                     */
    /*          tabela.typo_coluna('name_coluna', tamanho do campo).constraint   */
        table.increments('id').primary();
        table.integer('point_id')
             .notNullable()
             .references('id')
             .inTable('points');

        table.integer('item_id')
             .notNullable()
             .references('id')
             .inTable('items');
    });
}

//metodo Down será executado para desfazer a o que metodo Up fez no banco
export async function down(knex: Knex){
    return knex.schema.dropTable('points_items');
}