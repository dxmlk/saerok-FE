import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

interface ImgCarouselProps {
    imgUrls: string[];
}

const ImgCarousel = ({ imgUrls }: ImgCarouselProps) => {

    return (
        <div className='h-[343px] w-full '>
            <Swiper 
                    modules={[Pagination]} 
                    spaceBetween={0} 
                    slidesPerView={1} 
                    loop={true} 
                    pagination={{clickable: true, bulletClass: 'swiper-pagination-bullet', bulletActiveClass: 'swiper-pagination-bullet-active',}} 
                    className='h-[343px]'
                >
                {imgUrls.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <img src={img} className='w-full h-full object-cover' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}
export default ImgCarousel;
