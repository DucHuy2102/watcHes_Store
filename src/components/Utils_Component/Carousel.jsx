import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
const Carousel = () => {
    return (
        <div className='px-10 mt-5'>
            <Swiper
                loop={true}
                spaceBetween={0}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 4000 }}
                className='h-[90vh] shadow-lg mb-5'
            >
                <SwiperSlide>
                    <img src={'../assets/slide_01.jpg'} alt='Image' className={styleImage} />
                </SwiperSlide>
                <SwiperSlide className='bg-black'>
                    <video autoPlay={true} controls>
                        <source src={'../assets/video_01.mp4'} type='video/mp4' />
                    </video>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={'../assets/slide_02.jpg'} alt='Image' className={styleImage} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={'../assets/image.webp'} alt='Image' className={styleImage} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Carousel;
const styleImage = 'w-full h-full object-cover';
