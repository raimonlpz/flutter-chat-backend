const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('db online');

    } catch (err) {
        console.log(err);
        throw new Error('error en la base de datos - hable con el admin');
    }
}

module.exports = {
    dbConnection
}