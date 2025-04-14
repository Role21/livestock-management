exports.up = function (knex) {
    return knex.schema.createTable('expenses', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').nullable();
      table.decimal('amount', 10, 2).notNullable();
      table.date('expense_date').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('expenses');
  };
  