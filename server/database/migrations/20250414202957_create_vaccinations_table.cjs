exports.up = function (knex) {
    return knex.schema.createTable('vaccinations', function (table) {
      table.increments('id').primary();
      table.integer('livestock_id').unsigned().references('id').inTable('livestock');
      table.integer('vaccine_id').unsigned().references('id').inTable('vaccine_variants');
      table.date('date_administered').notNullable();
      table.date('next_due_date').nullable();
      table.integer('staff_id').unsigned().references('id').inTable('staff');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('vaccinations');
  };
  