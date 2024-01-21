
// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import './styles.css';
// import slide_image_1 from '../assets/image1.jpg';
// import slide_image_2 from '../assets/image2.jpg';
// import slide_image_3 from '../assets/image3.jpg';
// import slide_image_4 from '../assets/neru.avif';
// import slide_image_5 from '../assets/miller.avif';
// import slide_image_6 from '../assets/hanuman.avif';
// import { EffectCoverflow, Pagination } from 'swiper/modules';

// const HomeSlider = () => {
//   const [banners, setBanners] = useState([
//     { imageUrl: slide_image_1 },
//     { imageUrl: slide_image_2 },
//     { imageUrl: slide_image_3 },
//     { imageUrl: slide_image_4 },
//     { imageUrl: slide_image_5 },
//     { imageUrl: slide_image_6 },
//   ]);

//   return (
//     <>
//       <Swiper
//         effect={'coverflow'}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={'auto'}
//         coverflowEffect={{
//           rotate: 50,
//           stretch: 0,
//           depth: 100,
//           modifier: 1,
//           slideShadows: true,
//         }}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 200, disableOnInteraction: false }} // Adjust the delay as needed
//         speed={5000} // Adjust the speed as needed
//         modules={[EffectCoverflow, Pagination]}
//         className="mySwiper"
//       >
//         {banners.map((banner, index) => (
//           <SwiperSlide key={index}>
//             <img src={banner.imageUrl} alt={`slide image ${index + 1}`} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// };

// export default HomeSlider;



import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './styles.css';
import axios from 'axios';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const HomeSlider = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:4000/upcoming/getall').then((res) => {
      setBanners(res.data); // Set the entire array as the new state
      console.log(banners);
    })
  }, []);

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 200, disableOnInteraction: false }} // Adjust the delay as needed
        speed={5000} // Adjust the speed as needed
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner.imageUrl} alt={`slide image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeSlider;