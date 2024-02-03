const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const movieModel= require('../model/moviePage')
const latestMovie = require('../model/LatestmovieSchema')
router.use(cors())
const emailService = require('../utilities/emailService')

//To add the latest movie to home pages
// router.post('/latestadd',async(req,res)=>{
//     try {
//         const data = req.body
//         const newLatestMovie = await latestMovie(data)
//         const savedMovie = await newLatestMovie.save()
//         res.status(200).json({savedMovie })
//     } catch (error) {
//         res.status(400).json({ error });
//     }
// })

router.post('/latestadd', async (req, res) => {
    try {
        const data = req.body;
        const newLatestMovie = await latestMovie(data);
        const savedMovie = await newLatestMovie.save();

        // Fetch the latest movies with sorting by the creation date in descending order
        const latestMovies = await latestMovie.find().sort({ createdAt: -1 });

        res.status(200).json({ latestMovies });
    } catch (error) {
        res.status(400).json({ error });
    }
});

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
      
        const newMovie = new movieModel({title,description,potraitImgUrl,landScapeImgUrl,rating,genre,languages,type,duration,releasedate})
        const savedData= await newMovie.save()
        res.status(200).json({savedData})
    
    } catch (error) {
        res.status(500).json({ error });
    }
});


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

//To create the screen
router.post('/screen', async (req, res) => {
    try {
      const { movieId, screens } = req.body;
      if (!movieId) {
        return res.status(400).json({ message: "Missing movieId in request body" });
      }
      const movie = await movieModel.findById(movieId);
  
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      if (!screens || !Array.isArray(screens)) {
        return res.status(400).json({ message: "Invalid or missing screen array in request body" });
      }
      const newScreens = screens.map(({ name, screenType, showTime, seatsAvailable, bookedSeats }) => ({
        name,
        screenType,
        showTime,
        seatsAvailable: seatsAvailable || [],  // Default to an empty array if not provided
        bookedSeats: bookedSeats || [],        // Default to an empty array if not provided
      }));
      movie.screens.push(...newScreens);
      await movie.save();
  
      return res.status(200).json({ message: "Screens added successfully" });
    } catch (error) {
      console.error("Error adding screens to movie:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
//booking tickets

router.post('/booktickets', async (req, res) => {
    try {
        const { movieId, screenId, showTime, seats, userEmail } = req.body;

        const movie = await movieModel.findById(movieId);
    
        if (!movie) {
          console.error('Movie not found');
          return res.status(404).json({ error: 'Movie not found' });
        }
    
        const screen = movie.screens.find((s) => s._id.toString() === screenId);
    
        if (!screen) {
          console.error('Screen not found');
          return res.status(404).json({ error: 'Screen not found' });
        }
    
  
        const availableSeats = screen.seatsAvailable.filter((seat) => !seats.includes(seat));

        if (seats.length > availableSeats.length) {
          return res.status(400).json({ error: 'Seats not available' });
        }
    
        // Book the seats
        const booking = {
        //   screenName,
          showTime,
          seats,
          userEmail,
        };
    
        movie.bookings.push(booking);
    
        // Update seatsAvailable and bookedSeats in the MovieBooking model
        screen.seatsAvailable = availableSeats;
        screen.bookedSeats.push(...seats);
    
        await movie.save();
    
        // Send email confirmation
        await emailService.sendConfirmationEmail(userEmail, booking);
    
        res.json({ message: 'Booking successful', booking });
      } catch (error) {
        console.error('Error booking ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });



//To get the screens
router.get('/screen/:movieId', async (req, res) => {
    try {
      const { movieId } = req.params;
  
      if (!movieId) {
        return res.status(400).json({ message: "Missing movieId in request params" });
      }
  
      const movie = await movieModel.findById(movieId);
  
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      const screens = movie.screens || [];
  
      return res.status(200).json({ screens });
    } catch (error) {
      console.error("Error fetching screens:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// To get one screen
router.get('/screen/:screenId/:movieId', async (req, res) => {
    try {
        const { movieId, screenId } = req.params;

        if (!movieId || !screenId) {
            return res.status(400).json({ message: "Missing movieId or screenId in request params" });
        }

        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const screen = movie.screens.find(s => s._id.toString() === screenId);

        if (!screen) {
            return res.status(404).json({ message: "Screen not found in the movie schedule" });
        }

        return res.status(200).json({ screen });
    } catch (error) {
        console.error("Error fetching screen:", error);
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

//To get one movie
router.get('/movie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ message: "Invalid movie ID format" });
        }

        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});


  //To get the movie schedules
  router.get('/movieschedules/:movieId', async (req, res) => {
    try {
      const { movieId } = req.params;
  
      if (!movieId) {
        return res.status(400).json({ message: "Missing movieId in request params" });
      }
  
      const movie = await movieModel.findById(movieId);
  
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      const movieSchedules = movie.movieSchedules || [];
  
      return res.status(200).json({ movieSchedules });
    } catch (error) {
      console.error("Error fetching screens:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Movie Schedules
router.post('/addmoviescheduletoscreen', async (req, res) => {
    try {
        const { movieId, screenId, movieSchedules } = req.body;

        if (!screenId) {
            return res.status(400).json({ message: "Missing screenId in request body" });
        }

        // Find the movie by ID
        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Find the screen within the "screens" array in the movie document
        const screen = movie.screens.find((s) => s._id.toString() === screenId);

        if (!screen) {
            return res.status(404).json({ message: `Screen with ID ${screenId} not found` });
        }

        if (!movieSchedules || !Array.isArray(movieSchedules)) {
            return res.status(400).json({ message: "Invalid or missing movieSchedules array in request body" });
        }

        const newMovieSchedule = movieSchedules.map(({ showTime, showDate, notavailableseats }) => ({
            showTime,
            showDate,
            notavailableseats
        }));

        movie.movieSchedules.push(...newMovieSchedule);
        await movie.save();

        return res.status(200).json({ message: "Movie schedules added successfully" });
    } catch (error) {
        console.error("Error adding movie schedules to movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



//Buy tickets routes

// router.post('/buytickets', async (req, res) => {
//     try {
//         const { movieId, bookMovie } = req.body;

//         if (!movieId) {
//             return res.status(400).json({ message: "Missing movieId in request body" });
//         }

//         const movie = await movieModel.findById(movieId);

//         if (!movie) {
//             return res.status(404).json({ message: "Movie not found" });
//         }

//         if (!bookMovie || !Array.isArray(bookMovie)) {
//             return res.status(400).json({ message: "Invalid or missing cast array in request body" });
//         }

//         // Assuming all celebrities are of type "cast"
//         const newBooking = bookMovie.map(({ showTime, showDate,screens, seats , availability,totalPrice,numberofTickets,userId }) => ({
//                 showTime,
//                 showDate,
//                 screens,
//                 seats: seats.map(seat => ({
//                     row: seat.row,
//                     col: seat.col,
//                     seat_id: seat.seat_id,
//                     price: seat.price
//                 })),
//                 availability,
//                 totalPrice,
//                 numberofTickets,
//                 userId,
//         }));

//         movie.bookMovie.push(...newBooking);
//         await movie.save();

//         return res.status(200).json({ message: "tickets buyed successfully" });
//     } catch (error) {
//         console.error("Error in booking movie:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

router.get('/schedule/:screenName/:date/:movieId', async (req, res) => {
    try {
        const screenName = req.params.screenName;
        const date = req.params.date;
        const movieId = req.params.movieId;

        const screen = await movieModel.findOne({
            screens: {
                $elemMatch: { name: screenName, showTime: { $exists: true, $ne: [] } }
            }
        });

        if (!screen) {
            return res.status(404).json({
                success: false,
                message: 'Screen not found',
                data: null
            });
        }

        const movieSchedules = screen.movieSchedules.filter(schedule => {
            let showDate = new Date(schedule.showDate);
            let bodyDate = new Date(date);
            if (
                showDate.getDate() === bodyDate.getDate() &&
                showDate.getMonth() === bodyDate.getMonth() &&
                showDate.getFullYear() === bodyDate.getFullYear() &&
                schedule.movieId == movieId
            ) {
                return true;
            }
        });

        if (!movieSchedules || movieSchedules.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Movie Schedule not found',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'Movie Schedule retrieved successfully',
            data: {
                screenId: screen._id,
                movieSchedulesforDate: movieSchedules
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

router.get('/screen/:screenId/:movieId/:date', async (req, res) => {
    try {
        const { movieId, screenId, date } = req.params;

        if (!movieId || !screenId || !date) {
            return res.status(400).json({ message: "Missing movieId, screenId, or date in request params" });
        }

        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const screen = movie.screens.find(s => s._id.toString() === screenId);

        if (!screen) {
            return res.status(404).json({ message: "Screen not found in the movie schedule" });
        }

        // console.log("Movie:", movie); // Add this line to check the value of 'movie'
        
        if (!movie.movieSchedules) {
            return res.status(404).json({ message: "Movie schedules not found for the movie" });
        }

        const filteredSchedules = movie.movieSchedules.filter(schedule => {
            let showDate = new Date(schedule.showDate);
            let bodyDate = new Date(date);
        
            // Set time components to zero
            showDate.setHours(0, 0, 0, 0);
            bodyDate.setHours(0, 0, 0, 0);
        
            console.log("showDate:", showDate);
            console.log("bodyDate:", bodyDate);
            
            console.log("Comparison:", showDate.getTime(), bodyDate.getTime(), showDate.getTime() === bodyDate.getTime(), schedule.movieId == movieId);
        
            return (
                showDate.getTime() === bodyDate.getTime() &&
                schedule.movieId == movieId
            );
        });
        
        
        
        

        return res.status(200).json({ screenId: screen, movieSchedules: filteredSchedules } );
    } catch (error) {
        console.error("Error fetching screen:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router
