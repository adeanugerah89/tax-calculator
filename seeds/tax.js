
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tax').del()
    .then(function () {
      // Inserts seed entries
      return knex('tax').insert([
        {id: 1, tax_code: '1', tax_type: 'Food & Beverage', refundable: true},
        {id: 2, tax_code: '2', tax_type: 'Tobacco', refundable: false},
        {id: 3, tax_code: '3', tax_type: 'Entertainment', refundable: false}
      ]);
    });
};
