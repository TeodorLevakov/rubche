const express = require('express');
const { initDB } = require('./config/database.js');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/authMiddleware.js');

const routes = require('./routes');
const app = express();
require('./config/handlebars.js')(app);

app.use('/static', express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(auth);

app.use(routes);

initDB()
    .then(() => {
        app.listen(5000, () => console.log('server is on...'));
    })
    .catch(err => {
        console.log('DB not availble:', err);
    });