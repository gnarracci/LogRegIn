const mongoose = require('mongoose');

const URI = 'mongodb://localhost/LogRegIn';

mongoose.connect(URI)
    .then(db => console.log('DB is connected!!!'))
    .catch(err => console.log(err));

module.exports = mongoose;