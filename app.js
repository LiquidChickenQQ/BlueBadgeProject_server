require('dotenv').config();
var express=require('express')
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser');

/*********CONTROLLERS******* */
var user = require('./controllers/user-controller');
var login = require('./controllers/login-controller');
var log = require('./controllers/log-controller');


sequelize.sync(); //////// user {force:true} when changing column or data structure

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

/****EXPOSED****/
app.use('/api/user', user);  // creates a user 
app.use('/api', login);  // allows an already existing user to login

/****MIDDLEWARE****/
app.use(require('./middleware/validate-session'))

/****PROTECTED ROUTES****/
app.use('/api/log', log);



app.listen(process.env.PORT, () => {
    
    console.log(`App is listening on port ${process.env.PORT}`)
});