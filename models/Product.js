const { Model } = require('objection')

class Product extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'product';
  }

}

module.exports = Product;
