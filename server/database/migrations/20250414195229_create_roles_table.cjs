// create_roles_table.cjs
exports.up = function(knex) {
    return knex.schema.createTable('roles', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('roles');
  };