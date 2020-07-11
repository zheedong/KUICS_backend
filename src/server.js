const Express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handleError = require('./lib/errorHandler');
const activateSwagger = require('./lib/swagger');
const { logger, stream } = require('./lib/logger');

const api = require('./api');

const app = Express();

const { NODE_ENV } = process.env;

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

if (NODE_ENV === 'production') {
    app.use(morgan('combined', { stream }));
} else {
    app.use(morgan('dev', { stream }));
}

app.use('/api', api);

app.use(handleError);

activateSwagger(app);

const models = require('../models');

models.sequelize
    .sync({ alter: true })
    .then(() => {
        logger.debug('DB sync process succeed');
    })
    .catch((err) => {
        logger.error(err);
        logger.error('DB sync process failed');
    });

module.exports = app;