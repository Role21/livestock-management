// ✅ 2. create_admins_table.cjs
exports.up = function(knex) {
    return knex.schema.createTable('admins', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('admins');
  };