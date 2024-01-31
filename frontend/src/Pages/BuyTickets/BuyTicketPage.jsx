import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-horizontal-datepicker";
import './BuyTicketPage.css'

// Inside your BuyTicketPage component
const BuyTicketPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/page/movie/${id}`)
      .then((res) => {
        setMovieDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  // Check if movie details are still loading
  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  const selectedDay = (val) => {
    console.log(val);
  };

  return (
    <div className='buytickets'>
      <div className="s1">
        <div className="head">
          <h1>{movieDetails.title}</h1>
          <h4>{movieDetails.languages}</h4>
          <h5>{movieDetails.genre}</h5>
        </div>
        <DatePicker
          getSelectedDay={selectedDay}
          endDate={100}
          selectDate={new Date("2024-01-31")}
          labelFormat={"MMMM"}
          color={"rgb(252, 110, 28)"}
        />
      </div>
      <div className="screens">
        {movieDetails.screens && movieDetails.screens.length > 0 ? (
          movieDetails.screens.map((screen, index) => (
            <div className="screen" key={index}>
              
              <div className="screen-info">
          <h2>{screen.name}</h2>
          <h3>{screen.screenType}</h3>
        </div>
                <button className='btn1'><Link to={`/buytickets/${id}/screen`}>Select</Link></button>
             
            </div>
          ))
        ) : (
          <p>Loading screens...</p>
        )}
      </div>
    </div>
  );
};

export default BuyTicketPage;




  
  
