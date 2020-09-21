const { static } = require('express');
const express = require('express');
const app = express();
const port = "3000";

const morgan = require('morgan');
const path = require('path');

//settings
app.set('port', process.env.PORT || port);

//midlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/task',require('./routes/task.routes'));

//static files
app.use(express.static(path.join(__dirname,'public')));

//server
app.listen(app.get('port'),()=>{
    console.log('server on port: '+ app.get('port'));
});