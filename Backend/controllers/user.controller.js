const userCtrl = {};
const User = require('../models/users');

/*userCtrl.registerUsers = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    console.log(user);
    res.json({
        'status': 'User saved!'
    });
};*/

userCtrl.regUsers = async (req, res) => {
    const user = new User(req.body);
    
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
        password:req.body.password,
        role:req.body.role,
        country:req.body.country,
        description:req.body.description
    };
    User.findByIdAndUpdate(id, {$set:user}, {new:true});
    res.json({
        'status': 'User Updated!'
    });
};

module.exports = userCtrl;