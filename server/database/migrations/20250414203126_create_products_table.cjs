exports.up = function (knex) {
    return knex.schema.createTable('products', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.text('description').nullable();
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock_quantity').notNullable().defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products');
  };
  