const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const movieModel= require('../model/moviePage')
const latestMovie = require('../model/LatestmovieSchema')
router.use(cors())

//To add the latest movie to home pages
router.post('/latestadd',async(req,res)=>{
    try {
        const data = req.body
        const newLatestMovie = await latestMovie(data)
        const savedMovie = await newLatestMovie.save()
        res.status(200).json({savedMovie })
    } catch (error) {
        res.status(400).json({ error });
    }
})

//To get the latest movies
router.get('/latestget',async(req,res)=>{
    try {
        const getLatestMovie = await latestMovie.find()
        res.status(200).json(getLatestMovie)
    } catch (error) {
        res.status(400).json({ error });
    }
})

//Posting the details of movie page
router.post('/createmovie', async (req, res) => {
    try {
        const {title,description,potraitImgUrl,landScapeImgUrl,rating,genre,languages,type,duration,releasedate} = req.body
        // if (typeof category !== 'string') {
        //     return res.status(400).json({ error: 'Category must be a string' });
        // }
        const newMovie = new movieModel({title,description,potraitImgUrl,landScapeImgUrl,rating,genre,languages,type,duration,releasedate})
        const savedData= await newMovie.save()
        res.status(200).json({savedData})
    
    } catch (error) {
        res.status(500).json({ error });
    }
});

// //To add cast
// router.post('/addcelebtomovie',async(req,res)=>{
//     try{
//     const {movieId,celebType,celebName,celebRole,celebImage}=req.body
//     const movie = await movieModel.findById(movieId)
//     if(!movie){
//         return res.status(404).json({message:"Movie not found"})
//     }
//     const newCeleb ={
//         celebType,
//         celebName,
//         celebRole,
//         celebImage
//     }
//     if (celebType==="cast"){
//         movie.cast.push(newCeleb)
//     }
//     await movie.save();
//     res.status(200).json({message:"Celeb addaed successfully"})
// }catch(error){
//     res.status(400).json({ error });
// }
// })
// To add cast
router.post('/addcelebtomovie', async (req, res) => {
    try {
        const { movieId, cast } = req.body;

        if (!movieId) {
            return res.status(400).json({ message: "Missing movieId in request body" });
        }

        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (!cast || !Array.isArray(cast)) {
            return res.status(400).json({ message: "Invalid or missing cast array in request body" });
        }

        // Assuming all celebrities are of type "cast"
        const newCelebs = cast.map(({ celebName, celebRole, celebImage }) => ({
            celebType: "cast",
            celebName,
            celebRole,
            celebImage
        }));

        movie.cast.push(...newCelebs);
        await movie.save();

        return res.status(200).json({ message: "Celebs added successfully" });
    } catch (error) {
        console.error("Error adding celebs to movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//To get the details of movie 

router.get('/movies',async(req,res)=>{
    try {
        const moviedata = await movieModel.find()
        res.status(200).json(moviedata)
    } catch (error) {
        res.status(400).json({ error });
    }
})

router.get('/movies/:id',async(req,res)=>{
    try {
        const movieId = req.params.movieId
        const movie = await movieModel.findById(movieId)
        if(!movie){
            res.status(404).json({message:"Movie not found"})
        }
        res.status(200).json({message:"Movie retrieved successfully"})
    } catch (error) {
        res.status(400).json({ error });
    }

})




module.exports = router
