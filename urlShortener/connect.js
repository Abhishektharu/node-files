const mongoose = require('mongoose');

async function getConnectMongoose(url){
    return mongoose.connect(url);
}

module.exports = {getConnectMongoose}