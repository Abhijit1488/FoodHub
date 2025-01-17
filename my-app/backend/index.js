 
const express = require('express')
const app = express()
const port = 5000
const MongoDb = require("./db")
const cors = require('cors');
// require('events').EventEmitter.defaultMaxListeners = 20;

MongoDb();
app.use(cors());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})



app.use(express.json())
app.use('/api',require('./Routes/UserCreate'))
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})