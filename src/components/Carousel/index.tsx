import Slider from 'react-slick'
import slide1 from '../../assets/carousel/imgs/slide1.png'
import slide2 from '../../assets/carousel/imgs/slide2.png'
import slide3 from '../../assets/carousel/imgs/slide3.png'
import slide4 from '../../assets/carousel/imgs/slide4.png'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <Slider {...settings}>
      <div className='slider-slide'>
        <img src={slide1} alt='' />
      </div>
      <div className='slider-slide'>
        <img src={slide2} alt='' />
      </div>
      <div className='slider-slide'>
        <img src={slide3} alt='' />
      </div>
      <div className='slider-slide'>
        <img src={slide4} alt='' />
      </div>
      {/* <div className='slider-slide'>
        <img src={slide1} alt='' />
      </div>
      <div className='slider-slide'>
        <img src={slide2} alt='' />
      </div>
      <div className='slider-slide'>
        <img src={slide3} alt='' />
      </div>
      <div className='slider-slide'>
        <img src={slide4} alt='' />
      </div> */}
    </Slider>
  )
}
