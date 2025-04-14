exports.up = function (knex) {
    return knex.schema.createTable('feeding_schedule', function (table) {
      table.increments('id').primary();
      table.integer('livestock_id').unsigned().references('id').inTable('livestock');
      table.integer('food_id').unsigned().references('id').inTable('food_inventory');
      table.time('feeding_time').notNullable();
      table.decimal('quantity_kg', 8, 2).notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('feeding_schedule');
  };
  