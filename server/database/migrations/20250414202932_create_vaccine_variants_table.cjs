exports.up = function (knex) {
    return knex.schema.createTable('vaccine_variants', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.text('description').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('vaccine_variants');
  };
  