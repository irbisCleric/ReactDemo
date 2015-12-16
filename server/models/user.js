var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    desc: {type: String}
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('User', userSchema);