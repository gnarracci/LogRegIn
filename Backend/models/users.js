const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true},
    country: { type: String, required: true },
    description: { type: String, required: true },
    creation_dt: { type: Date, require: true }
});

UserSchema.statics.hashpassword = function hashpassword(password) {
    return bcrypt.hashSync(password,10);
}

UserSchema.methods.isValid = function(hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('users', UserSchema);