const { Model } = require('objection')

class Tax extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tax';
  }

}

module.exports = Tax;
