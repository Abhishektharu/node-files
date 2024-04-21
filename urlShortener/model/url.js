//database;

const mongoose = require('mongoose');

//define schema 
const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,

    },

    redirecedURL:{
        type: String,
        required: true,
    },

    //visit history;
    visitedHistory: [{
        timestamp: {type: Number}
    }]

    
},
{timestamp:true}
);

const URL = mongoose.model("url", urlSchema );

module.exports = URL;