const express = require('express');
const morgan = require('morgan');
const app = express();
const CreateError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const passconfig = require('./passport-config');

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
app.use(session({
    name:'myname.id',
    resave:false,
    saveUninitialized:false,
    secret: 'secret',
    cookie:{
        maxAge: 36000000,
        httpOnly:false,
        secure:false
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/users', userRouter);

//Starting the server

app.listen(app.get('port'), () => {
    console.log("Server on port" , app.get("port"));
});