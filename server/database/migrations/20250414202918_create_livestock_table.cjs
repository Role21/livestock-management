exports.up = function (knex) {
    return knex.schema.createTable('livestock', function (table) {
      table.increments('id').primary();
      table.string('tag_id').notNullable().unique();
      table.integer('variant_id').unsigned().references('id').inTable('animal_variants');
      table.integer('shed_id').unsigned().references('id').inTable('sheds');
      table.integer('age').notNullable();
      table.enum('gender', ['male', 'female']).notNullable();
      table.decimal('weight', 8, 2).notNullable();
      table.date('arrival_date').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('livestock');
  };
  