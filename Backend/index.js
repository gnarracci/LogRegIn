const express = require('express');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const passconfig = require('./passport-config');

const { mongoose } = require('./database');

const userRouter = require('./routes/user.routes');


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
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
    
    next();
});

//Routes
app.use('/users', userRouter);

//Starting the server

app.listen(app.get('port'), () => {
    console.log("Server listening on port" , app.get("port"));
});