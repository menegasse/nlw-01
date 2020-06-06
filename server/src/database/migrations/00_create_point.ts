//para se referir a um Tipo para o typscrip auxilixar tem que criar com letra Maiuscula 
import Knex from 'knex';

//metodo Up será executado quando o migration for rodado (fazer a alteração necessária no banco)
export async function up(knex: Knex){
    //criando tabela no banco
    return knex.schema.createTable('points', table => {
    /*          regra para criar a coluna:                     */
    /*          tabela.typo_coluna('name_coluna', tamanho do campo).constraint   */
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('latitude').notNullable();
        table.string('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
    });
}

//metodo Down será executado para desfazer a o que metodo Up fez no banco
export async function down(knex: Knex){
    return knex.schema.dropTable('points');
}