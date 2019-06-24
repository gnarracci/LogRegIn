const userCtrl = {};
const User = require('../models/users');

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

module.exports = userCtrl;