exports.up = function (knex) {
    return knex.schema.createTable('suppliers', function (table) {
      table.increments('id').primary();
      table.string('company_name').notNullable();
      table.string('contact_person').nullable();
      table.string('email').nullable();
      table.string('phone').nullable();
      table.string('address').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('suppliers');
  };
  