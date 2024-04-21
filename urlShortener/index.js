const express = require('express')
const path = require('path');
const os = require('os');
const app = express()
const port = 8001


const urlRoute = require('./routes/url');

//database connection
const {getConnectMongoose} = require('./connect');
const URL = require('./model/url')

getConnectMongoose('mongodb://localhost:27017/url-shortener')
.then(()=> console.log("Mongoose connected successfully."));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.set("view engine", "ejs" );
app.set("views", path.resolve("./views"));


app.use(express.json());

app.use('/url',urlRoute );

//get request to home 
app.get('/home', async(req, res)=>{
  const myurls = await URL.find({});
  // console.log(myurls);

  //display all the shortId
  return res.render('home',{
    //passing variable to ejs for render
    urls: myurls,
    
  } );
})
//design get route whenever user goes to shorturl 
app.get('/url/:shortId', async(req, res)=>{
  const shortId = req.params.shortId;
  //find the visitedHistory empty array from database;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: {
          timeStamp: Date.now()
        }
      }
    }
  )
  res.redirect(entry?.redirectURL);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})