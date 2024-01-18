import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import slide_image_1 from '../../assets/image1.jpg';
import slide_image_4 from '../../assets/neru.avif';
import UserMovieCard from './UserMovieCard';
import './UserMovieCard'
const UseMovieCarousel = () => {

    const movies=[
        {
            title: "Ozler",
            imageUrl: slide_image_1,
            _id: '3',
            rating: '8.5',
            type: 'investigation thriller'
        },
        {
            title: "Neru",
            imageUrl: slide_image_4,
            _id: '4',
            rating: '8.5',
            type: 'Court drama'
        },
        {
            title: "Ozler",
            imageUrl: slide_image_1,
            _id: '3',
            rating: '8.5',
            type: 'investigation thriller'
        },
        {
            title: "Neru",
            imageUrl: slide_image_4,
            _id: '4',
            rating: '8.5',
            type: 'Court drama'
        },        {
            title: "Ozler",
            imageUrl: slide_image_1,
            _id: '3',
            rating: '8.5',
            type: 'investigation thriller'
        },
        {
            title: "Neru",
            imageUrl: slide_image_4,
            _id: '4',
            rating: '8.5',
            type: 'Court drama'
        },        {
            title: "Ozler",
            imageUrl: slide_image_1,
            _id: '3',
            rating: '8.5',
            type: 'investigation thriller'
        },
        {
            title: "Neru",
            imageUrl: slide_image_4,
            _id: '4',
            rating: '8.5',
            type: 'Court drama'
        },
    ];

    return (
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
                className="mySwiper"
            >
                {movies.map((Movie) => (
                    <div key={Movie._id}>
                        <SwiperSlide>
                            <UserMovieCard {...Movie} />
                        </SwiperSlide>
                    </div>
                ))}
            </Swiper>
        </div>
    );
};
 

export default UseMovieCarousel
