
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('product', table => {
        table.increments('id').primary()
        table.string('product_name')
        table.string('tax_code')
        table.decimal('product_price',22,2)
      })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('product')
      ])
};
