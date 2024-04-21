const express = require("express");
const users = require("./MOCK_DATA.json");
//import fs module
const fs = require("fs");

const app = express();
const port = 8000;

//middleware
app.use(express.urlencoded({ extended: false }));

// custom middleware;
app.use((req, res, next)=>{
    fs.appendFile('log.txt', `\n${Date.now()} : ${req.method} : ${req.path} : ${req.protocol} : ${req.ip}`
    , (err, data)=>{
        next(); 
    })
})

app.get("/api/users", (req, res)=>{
    return res.send(users);
})

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "successs", id: users.length + 1 });
  });
});
//routes
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li> ${user.first_name}`).join("")}
        </ul>

    `;
  res.send(html);
});

//dynamic routes
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  

//patch ;

app.patch('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedFields = req.body;
  
    // Check if the user exists
    if (users.id === userId) {
      // Update only the provided fields
      for (const key in updatedFields) {
        if (Object.hasOwnProperty.call(updatedFields, key)) {
          users[key] = updatedFields[key];
        }
      }
      res.json({ message: 'User details updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
//listen
app.listen(port, (req, res) => console.log("app listening at port : " + port));
