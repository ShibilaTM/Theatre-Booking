// import React, { useEffect, useState } from 'react';
// import './Seat.css'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const MovieTicketBooking = () => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const { id } = useParams();
//   const [movieDetails, setMovieDetails] = useState(null);

//   useEffect(() => {
//     axios.get(`http://127.0.0.1:4000/page/movie/${id}`)
//       .then((res) => {
//         setMovieDetails(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching movie details:", error);
//       });
//   }, [id]);

//   const handleSeatChange = (seatId) => {
//     const selectedSeatIndex = selectedSeats.indexOf(seatId);
//     if (selectedSeatIndex === -1) {
//       setSelectedSeats([...selectedSeats, seatId]);
//       setTotalAmount((prevAmount) => prevAmount + 200);
//     } else {
//       const updatedSeats = [...selectedSeats];
//       updatedSeats.splice(selectedSeatIndex, 1);
//       setSelectedSeats(updatedSeats);
//       setTotalAmount((prevAmount) => prevAmount - 200);
//     }
//   };

  
//   const renderSeats = () => {
//     const seats = [];
//     for (let i = 0; i < 59; i++) {
//       const isBooked = Math.floor(Math.random() * 2) === 1;
//       seats.push(
//           <div key={`s${i + 2}`} className={`seat ${isBooked ? 'booked' : ''}`}>
//             <input
//               type="checkbox"
//               name="tickets"
//               id={`s${i + 2}`}
//               onChange={() => handleSeatChange(`s${i + 2}`)}
//             />
//             <label htmlFor={`s${i + 2}`}></label>
//           </div>

//       );
//     }
//     return seats;
//   };


//   return (
//     <div className="center">
//       <div className="tickets">
//         <div className="ticket-selector">
//           {movieDetails ? ( // Check if movieDetails is not null
//             <>
//               <div className="head">
//                 <div className="title">{movieDetails.title}</div>
//               </div>
//               <div className="seats">
//                 <div className="status">
//                   <div className="item">Available</div>
//                   <div className="item">Booked</div>
//                   <div className="item">Selected</div>
//                 </div>
//                 <div className="all-seats">{renderSeats()}</div>
//               </div>
//               <div className="timings">
//               <div className="times">
//                     {movieDetails.screens &&
//                       movieDetails.screens.map((screen, index) => (
//                         <div key={index}>
//                           {screen.showTime.map((time, timeIndex) => (
//                             <div key={timeIndex} className="time-option">
//                               <input
//                                 type="radio"
//                                 name={`time${index + 1}`}
//                                 id={`t${index + 1}_${timeIndex + 1}`}
//                               />
//                               <label htmlFor={`t${index + 1}_${timeIndex + 1}`} className="time">
//                                 {time}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                   </div>
//               </div>
//             </>
//           ) : (
//             <div>Loading movie details...</div>
//           )}
//         </div>
//         <div className="price">
//           <div className="total">
//             <span>
//               <span className="count">{selectedSeats.length}</span> Tickets
//             </span>
//             <div className="amount">{totalAmount}</div>
//           </div>
//           <button type="button">Book</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieTicketBooking;

import React, { useEffect, useState } from 'react';
import './Seat.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieTicketBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0); // Assuming the default selected screen is the first one

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/page/movie/${id}`)
      .then((res) => {
        setMovieDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  const handleSeatChange = (seatId) => {
    const selectedSeatIndex = selectedSeats.indexOf(seatId);
    if (selectedSeatIndex === -1) {
      setSelectedSeats([...selectedSeats, seatId]);
      setTotalAmount((prevAmount) => prevAmount + 200);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(selectedSeatIndex, 1);
      setSelectedSeats(updatedSeats);
      setTotalAmount((prevAmount) => prevAmount - 200);
    }
  };

  const handleScreenChange = (index) => {
    setSelectedScreenIndex(index);
  };

  const handleBooking = async () => {
    try {
      const selectedScreen = movieDetails.screens[selectedScreenIndex];
      const response = await axios.post('http://127.0.0.1:4000/page/booktickets', {
        movieId: id,
        screenId: selectedScreen._id,
        showTime: selectedScreen.showTime[0], // Assuming the first show time is selected
        seats: selectedSeats.map((seatId) => ({
          number: seatId.replace('s', ''),
          price: 200,
        })),
        userEmail: 'aang@gmail.com',
      });

      console.log(response.data); // Log the response from the backend

      // Handle success or show a success message to the user
    } catch (error) {
      console.error('Error booking ticket:', error);
      // Handle the error or show an error message to the user
    }
  };
  // const handleBooking = async () => {
  //   try {
  //     const selectedScreen = movieDetails.screens[selectedScreenIndex];
  //     const bookingData = {
  //       movieId: id,
  //       screenId: selectedScreen._id,
  //       showTime: selectedScreen.showTime[0],
  //       seats: selectedSeats.map((seatId) => ({
  //         number: seatId.replace('s', ''),
  //         price: 200,
  //       })),
  //       userEmail: 'shibilaang@gmail.com',
  //     };
  
  //     console.log('Booking Data:', bookingData); // Log the data before making the request
  
  //     const response = await axios.post('http://127.0.0.1:4000/page/booktickets', bookingData);
  
  //     console.log(response.data); // Log the response from the backend
  
  //     // Handle success or show a success message to the user
  //   } catch (error) {
  //     console.error('Error booking ticket:', error);
  //     // Handle the error or show an error message to the user
  //   }
  // };
  
  const renderSeats = () => {
    const selectedScreen = movieDetails.screens[selectedScreenIndex];
    const seats = [];
    for (let i = 0; i < 59; i++) {
      const isBooked = selectedScreen.bookedSeats.includes(`s${i + 2}`);
      seats.push(
        <div key={`s${i + 2}`} className={`seat ${isBooked ? 'booked' : ''}`}>
          <input
            type="checkbox"
            name="tickets"
            id={`s${i + 2}`}
            onChange={() => handleSeatChange(`s${i + 2}`)}
            disabled={selectedScreen.bookedSeats.includes(`s${i + 2}`)}
          />
          <label htmlFor={`s${i + 2}`}></label>
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="center">
      <div className="tickets">
        <div className="ticket-selector">
          {movieDetails ? ( // Check if movieDetails is not null
            <>
              <div className="head">
                <div className="title">{movieDetails.title}</div>
              </div>
              <div className="seats">
                <div className="status">
                  <div className="item">Available</div>
                  <div className="item">Booked</div>
                  <div className="item">Selected</div>
                </div>
                <div className="all-seats">{renderSeats()}</div>
              </div>
              <div className="timings">
                <div className="times">
                  {movieDetails.screens &&
                    movieDetails.screens.map((screen, index) => (
                      <div key={index}>
                        {screen.showTime.map((time, timeIndex) => (
                          <div key={timeIndex} className="time-option">
                            <input
                              type="radio"
                              name={`time${index + 1}`}
                              id={`t${index + 1}_${timeIndex + 1}`}
                              onChange={() => handleScreenChange(index)}
                              checked={selectedScreenIndex === index}
                            />
                            <label htmlFor={`t${index + 1}_${timeIndex + 1}`} className="time">
                              {time}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <div>Loading movie details...</div>
          )}
        </div>
        <div className="price">
          <div className="total">
            <span>
              <span className="count">{selectedSeats.length}</span> Tickets
            </span>
            <div className="amount">{totalAmount}</div>
          </div>
          <button type="button" onClick={handleBooking}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieTicketBooking;
