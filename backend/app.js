const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
require('./Config/db')


const app = express()
app.use(morgan('dev'))
app.use(cors())
const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
const userRoutes= require('./routes/userRoutes')
app.use('/user',userRoutes)

const upcomingMovie = require('./routes/upMovieRoutes')
app.use('/upcoming',upcomingMovie)

const moviePage = require('./routes/moviePageRoutes')
app.use('/page',moviePage)


app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})