//1st file

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanDB', (err) =>{
    if(!err){
        console.log('DB connection successful mylord : http://localhost:3000/employees');
    }
    else {
        console.log('Error in connection!' + err);
    }
})

    module.exports = mongoose;