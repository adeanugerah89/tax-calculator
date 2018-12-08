
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('tax', table => {
        table.increments('id').primary()
        table.string('tax_code')
        table.string('tax_type')
        table.boolean('refundable')
      })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('tax')
      ])
};
