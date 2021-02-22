require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const hbs = require('hbs');
const routes = require('./config/routes');
require('./config/db.config')

// Express config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(logger('dev'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use('/', routes);

// Error handler
app.use((req, res, next) => {
    next(createError(404));
})

app.use((erro, req, res, next) => {
    console.log(error);
    if (!error.status) {
        error = createError(500);
    } 
    res.status(error.status);
    res.render('error', error);
})

// Initialization on port
app.listen(process.env.PORT || 3000, () => console.log(`listening on port ${process.env.PORT}`));