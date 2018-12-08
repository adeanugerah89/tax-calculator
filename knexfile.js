// Update with your config settings.
module.exports = {

  development: {
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        database : 'shopee',
        user : 'postgres',
        password: '',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }

};
