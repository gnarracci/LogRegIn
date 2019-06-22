const express = require('express');
const morgan = require('morgan');
const app = express();
const CreateError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const { mongoose } = require('./database');

const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));

//Routes
app.use('/users', userRouter);

//Starting the server

app.listen(app.get('port'), () => {
    console.log("Server on port" , app.get("port"));
});