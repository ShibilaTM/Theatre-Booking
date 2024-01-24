
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MovieCard from './MovieCard';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import './MovieCard.css';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/page/latestget');
        console.log('Received data from backend:', response.data);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='moviecard-container'>
      <h1 className='moviecard-title'>Recommended Movies</h1>
      <div className='sliderout'>
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 2,
            },
            750: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 2,
            },
          }}
          modules={[Pagination]}
          className='mySwiper'
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <MovieCard {...movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieCarousel;
