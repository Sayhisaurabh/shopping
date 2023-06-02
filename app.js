const express = require('express')
const connectDB = require('./cofig');
const  authRoutes  = require('./routes/auth');
const app = express()
require('dotenv').config()
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.use('/api',authRoutes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))