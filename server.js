const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(cors());
const dbconfig = require('./config/dbconfig');
require('dotenv').config();
// User Route
const userRoute = require('./routes/userRoute');

app.get("/",(req, res) => {
    res.send("works")
})
app.use(express.json());
// app.use(bodyParser.json());

app.use('/api/user',userRoute);
// Middleware 

app.listen(port , ()=> console.log(`node server started ${port}`));