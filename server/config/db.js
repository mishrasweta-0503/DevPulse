const mongoose = require('mongoose');

//uses mongoose to establish the connection when the server boots up
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1); // Exit process with failure    
    }
}

module.exports = connectDb;