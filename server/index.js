const http = require("http");
const fs  = require("fs");

// const myserver = http.createServer((req, res)=>{
//     console.log(Date.now());
//     res.end(Date.now() + " " + " server created successfully")
// });

//creating log file 
const myserver = http.createServer((req, res)=>{
    // console.log(Date.now());
    const log = `${Date.now()} new request \n`;
    fs.appendFile('log.txt', log, (err, data)=>{
        switch (req.url) {
            case "/":
                res.end("Homepage")
                break;
        
            default:
                res.end("404 error page not found.")
                break;
        }
    })
    res.end(Date.now() + " " + " server created successfully")
});
myserver.listen(8000, ()=> console.log("server started"));