exports.up = function (knex) {
  return knex.schema.createTable('livestock', function (table) {
    table.increments('id').primary();
    table.string('tag_id').notNullable().unique();
    table.integer('variant_id').unsigned().references('id').inTable('animal_variants').onDelete('SET NULL');
    table.integer('shed_id').unsigned().references('id').inTable('sheds').onDelete('SET NULL');
    table.integer('age').notNullable();
    table.enum('gender', ['male', 'female']).notNullable();
    table.decimal('weight', 8, 2).notNullable();
    table.date('arrival_date').notNullable();
    table.enum('status', ['active', 'sick', 'sold', 'dead']).defaultTo('active');
    table.text('health_notes').nullable();
    table.boolean('is_sold').defaultTo(false);
    table.date('sold_at').nullable();
    table.decimal('price', 10, 2).nullable(); // Optional, if sold directly

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('livestock');
};
