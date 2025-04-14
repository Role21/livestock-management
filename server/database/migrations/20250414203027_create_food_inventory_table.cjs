exports.up = function (knex) {
    return knex.schema.createTable('food_inventory', function (table) {
      table.increments('id').primary();
      table.integer('variant_id').unsigned().references('id').inTable('feed_variants');
      table.decimal('quantity_kg', 8, 2).notNullable();
      table.date('date_added').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('food_inventory');
  };
  