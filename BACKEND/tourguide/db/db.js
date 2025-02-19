


const mongoose = require('mongoose');

module.exports.connectToMongoDB = async () => {
    mongoose.set('strictQuery', false);
    console.log('Connecting to MongoDB at:', process.env.URL_MONGO);

    mongoose.connect(process.env.URL_MONGO)
    .then(()=>
    {
        console.log("🚀Connected to DB🚀");

    }
    ).catch((err) => {console.log("❌",err)});
    };
