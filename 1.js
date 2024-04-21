const { error } = require('console');
const fs = require('fs');

fs.readFile("text.txt", "utf-8", (err, result)=>{
    console.log(result);
});

const file = fs.readFileSync("text.txt", "utf-8");
console.log(file);

const os = require('os');
console.log(os.cpus().length);
