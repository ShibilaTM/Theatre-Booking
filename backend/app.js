const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
require('./Config/db')
const userRoutes= require('./routes/userRoutes')

const app = express()
app.use(morgan('dev'))
app.use(cors())
const PORT = process.env.PORT
app.use('/user',userRoutes)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})