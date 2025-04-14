exports.up = function (knex) {
    return knex.schema.createTable('sheds', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.integer('capacity').notNullable();
      table.string('location').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('sheds');
  };
  