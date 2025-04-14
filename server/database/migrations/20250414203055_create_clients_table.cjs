exports.up = function (knex) {
    return knex.schema.createTable('clients', function (table) {
      table.increments('id').primary();
      table.string('full_name').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone').nullable();
      table.string('address').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('clients');
  };
  