
import React, { useState } from 'react'
import { BsShare } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const MoviePage = () => {
    const [moviePage,setMoviePage] = useState([])
    



  return (
    <div className='moviepage'>
      <div className='c1' style = {{
        backgroundImage:`url(${landScapeImgUrl})`
      }}>
          <div className='c11'>
              <div className='left'>
                <div className='movie_poster'
                    style={{
                        backgroundImage:`url(${potraitImgUrl})`
                    }}>
                      <p>In Cinemas</p>
              </div>

              <div className="movie_details">
                    <p className="title">
                      {title}
                    </p>
                    <p className="rating">
                      <BsFillStarFill className='star'/>&nbsp;&nbsp;
                      {rating}/10
                    </p>
                   
                    <div className="movie_languages">
                    <p className='languages'>
                      {moviePage.languages.map((language,index)=>{
                        return(
                          <span key={index}>{language}</span>
                        )
                      })}
                    </p>
                    </div>
                    <p className="duration_type_releasedat">
                      <span className="duration">
                        {duration}
                      </span>
                      <span>.</span>
                      <span className="type">
                        {genre.join(',')}
                      </span>
                      <span>.</span>
                      <span className="category">
                      {category}
                    </span>
                    <span>.</span>
                    <span className="releasedat">
                      {releasedate}
                    </span>
                    </p>
                    <Link to={'/buytickets'} className='linkstylenone'>
                      <button className='bookbtn'>Book Tickets</button>
                    </Link>
              </div>
            </div>  
              <div className='right'>
                <button className='sharebtn'><BsShare className='shareicon' />Share</button>
              </div>
          </div>
        </div>
        <div className="c2">
          <h1>About The Movie</h1>
          <p>{description}</p>
          {
                            movie.cast.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Cast</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.cast.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        {
                            movie.crew.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Crew</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.crew.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        <div className='line'></div>
                        <h1>Your might also like</h1>
                        <MovieCarousel />
                    </div>
        </div>
   
  )
}

export default MoviePage
