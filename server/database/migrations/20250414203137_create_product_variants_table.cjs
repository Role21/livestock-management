exports.up = function (knex) {
    return knex.schema.createTable('product_variants', function (table) {
      table.increments('id').primary();
      table.integer('product_id').unsigned().references('id').inTable('products');
      table.string('variant_name').notNullable();
      table.decimal('variant_price', 10, 2).notNullable();
      table.integer('stock_quantity').notNullable().defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('product_variants');
  };
  