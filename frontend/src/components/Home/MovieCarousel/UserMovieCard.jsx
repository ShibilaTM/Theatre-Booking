import React from 'react';
import { useNavigate } from 'react-router-dom';
import slide_image_1 from '../../assets/image1.jpg';
import slide_image_4 from '../../assets/neru.avif';
import { BsFillStarFill } from "react-icons/bs";
import './MovieCard.css'

const UserMovieCard = ({ title, imageUrl, rating, type}) => {
    const navigate = useNavigate();

    const movies = [
        {
            title: "Ozler",
            imageUrl: slide_image_1,
            _id: '1',
            rating: '8.5',
            type: 'investigation thriller'
        },
        {
            title: "Neru",
            imageUrl: slide_image_4,
            _id: '2',
            rating: '8.5',
            type: 'Court drama'
        },
               {
            title: "Ozler",
            imageUrl: slide_image_1,
            _id: '1',
            rating: '8.5',
            type: 'investigation thriller'
        },
        {
            title: "Neru",
            imageUrl: slide_image_4,
            _id: '2',
            rating: '8.5',
            type: 'Court drama'
        },
    ];

    const movie = movies.find(movie => movie.title === title);

    return (
        <div
            className='moviecard'
            onClick={() => {
                if (movie) {
                    navigate(`/pages/kerala/movies/${movie.title}`);
                }
            }}
        >
           
           <div className='movieimg' style={{ backgroundImage: `url(${movie.imageUrl})` }}>
                <p className='rating'>
                    <BsFillStarFill className='star' />&nbsp;&nbsp;
                    {movie.rating}/10
                </p>
            </div>
            <div className="details">
                <p className='title'>
                    {movie.title}
                </p>
                <p className='type'>
                    {movie.type}
                </p>
            </div>
        </div>
    );
};

export default UserMovieCard;