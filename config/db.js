const mongoose = require('mongoose');

function connection() {
    mongoose.connect(process.env.CONNECTION_STRING).then((e) => {
        console.log(
            'database connected succesfully',
            '\nHost:', e.connection.host,
            '\nPort:',e.connection.port,
            '\nname:', e.connection.name
        );
    })
}

module.exports =  connection