// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BsFillStarFill } from "react-icons/bs";
// import './MovieCard.css'

// const UserMovieCard = ({ imageUrl, rating, title, genre }) => {
//     const navigate = useNavigate();

//     return (
//         <div
//             className='moviecard'
//             onClick={() => {
               
//                     navigate(`/pages/movies/${title}`);
                
//             }}
//         >
           
//            <div className='movieimg' style={{ backgroundImage: `url(${imageUrl})` }}>
//                 <p className='rating'>
//                     <BsFillStarFill className='star' />&nbsp;&nbsp;
//                     {rating}/10
//                 </p>
//             </div>
//             <div className="details">
//                 <p className='title'>
//                     {title}
//                 </p>
//                 <p className='type'>
//                     {genre}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default UserMovieCard;

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillStarFill } from "react-icons/bs";
import './MovieCard.css'

const UserMovieCard = ({ imageUrl, rating, title, genre }) => {
    const navigate = useNavigate();
    const {id} = useParams()

    const handleClick = () => {
        // Navigate to the MoviePage component with the selected movie title
        navigate(`/movie/${encodeURIComponent(title)}`);
    };

    return (
        <div
            className='moviecard'
            onClick={handleClick}
        >
            <div className='movieimg' style={{ backgroundImage: `url(${imageUrl})` }}>
                <p className='rating'>
                    <BsFillStarFill className='star' />&nbsp;&nbsp;
                    {rating}/10
                </p>
            </div>
            <div className="details">
                <p className='title'>
                    <b>{title}</b>
                </p>
                <p className='type'>
                    {genre}
                </p>
            </div>
        </div>
    );
};

export default UserMovieCard;
