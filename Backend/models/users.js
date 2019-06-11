const mongoose = require('mongoose');
const { Schema } = mongoose;

new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    
})