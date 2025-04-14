exports.up = function (knex) {
    return knex.schema.createTable('purchases', function (table) {
      table.increments('id').primary();
      table.integer('client_id').unsigned().references('id').inTable('clients');
      table.date('purchase_date').notNullable();
      table.decimal('total_amount', 10, 2).notNullable();
      table.string('status').notNullable().defaultTo('pending');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('purchases');
  };
  