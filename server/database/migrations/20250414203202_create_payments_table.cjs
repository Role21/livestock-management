exports.up = function (knex) {
    return knex.schema.createTable('payments', function (table) {
      table.increments('id').primary();
      table.integer('purchase_id').unsigned().references('id').inTable('purchases');
      table.date('payment_date').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.string('payment_method').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('payments');
  };
  