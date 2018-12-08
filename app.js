const Knex = require('knex');
const morgan = require('morgan');
const express = require('express')
const cors = require('cors')
const parser = require('body-parser')
const promiseRouter = require('express-promise-router');
const knexConfig = require('./knexfile')
const registerApi = require('./routes/api');
const { Model } = require('objection');

// Initialize knex.
const knex = Knex(knexConfig.development);
// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

const router = promiseRouter();
const app = express()
    .use(cors())
    .use(parser.json())
    .use(parser.urlencoded({extended: true}))
    .use(morgan('dev'))
    .use(router)
    .set('json spaces', 2);


app.set('port', process.env.PORT || 3000)
app.set('view engine', 'hbs')

// Register our REST API.
registerApi(router);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
  } else {
    next();
  }
});

app.listen(app.get('port'))
module.exports = app;
