const userCtrl = {};
const User = require('../models/users');
const passport = require('passport');

userCtrl.regUsers = async (req, res) => {
    const user = new User({
        username:req.body.username,
        name:req.body.name,
        password:User.hashpassword(req.body.password),
        role:req.body.role,
        country:req.body.country,
        description:req.body.description,
        creation_dt:Date.now()
    });
    await user.save();
    res.json({
        'status': 'User saved!'
    });
};

userCtrl.logUsers = async (req, res, next) => {
    passport.authenticate('local', function(err,user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
            if (err) { return res.status(501).json(err); }
            return res.status(201).json( { message:'Login Success!'});
        });
    })(req, res, next);
};

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        username:req.body.username,
        name:req.body.name,
        password:User.hashpassword(req.body.password),
        role:req.body.role,
        country:req.body.country,
        description:req.body.description,
        creation_dt:Date.now()
    };
    await User.findByIdAndUpdate(id, {$set:user}, {new:true});
    res.json({
        'status': 'User Updated!'
    });
};

userCtrl.delUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    res.json({
        'status': 'User Deleted!'
    });
};

userCtrl.logOut = async (req, res, next) => {
    req.logOut();
    return res.status(200).json({ message: 'Logout Success!' });
};

userCtrl.notiMessage = (req, res) => {
    return res.status(200).json(req.user);
};

userCtrl.isValidUser = (req, res, next) => {
    res.json({
        'status':'Aqui estoy!'
    });

    /*if(req.isAuthenticated()) next();
    else return res.status(401).json( { message: 'Unauthorized Request'} );*/
};

module.exports = userCtrl;