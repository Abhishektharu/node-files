const url = require('url');
const fs = require('fs');
const express  = require('express');

const app  = express();
app.get("/", (req, res)=>{
    return res.send("hello from homepage.");
})
const http = require('http');
const myserver = http.createServer(app);
myserver.listen(8000, ()=> console.log("server started"));