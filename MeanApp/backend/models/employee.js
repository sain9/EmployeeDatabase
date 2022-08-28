//3rd file

const mongoose = require('mongoose');

//defining the schema:
const Employee = mongoose.model('Employee',{
    name :  {type: String},
    position : {type: String},
    dept : {type: String}
});

    module.exports = Employee;