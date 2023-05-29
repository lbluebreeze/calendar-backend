const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
        throw new Error('Database connection error');
    }
};

module.exports = {
    dbConnection
};