
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product').del()
    .then(function () {
      // Inserts seed entries
      return knex('product').insert([
        {product_name: 'Lucky Stretch', product_price: 1000, tax_code: 2},
        {product_name: 'Big Mac', product_price: 1000, tax_code: 1},
        {product_name: 'Movie', product_price: 150, tax_code: 3}
      ]);
    });
};
