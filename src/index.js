const express = require('express');
const { initDB } = require('./config/database.js');


const routes = require('./routes');
const app = express();
require('./config/handlebars.js')(app);

app.use('/static', express.static('public'));

app.use(express.urlencoded({extended: false}));

app.use(routes);

initDB()
    .then(() => {
        app.listen(5000, () => console.log('server is on...'));
    })
    .catch(err => {
        console.log('DB not availble:', err);
    });