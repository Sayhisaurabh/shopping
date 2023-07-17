const express = require('express')
const cors = require('cors');
const connectDB = require('./cofig');
const  authRoutes  = require('./routes/auth');
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const app = express()
require('dotenv').config()
connectDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.use('/api',authRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',reviewRoutes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))