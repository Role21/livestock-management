// ✅ 3. create_staff_table.cjs
exports.up = function(knex) {
    return knex.schema.createTable('staff', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone').notNullable();
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('staff');
  };
  