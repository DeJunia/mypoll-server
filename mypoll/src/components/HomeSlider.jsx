import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false, 
  };

  // Array of image URLs
  const images = [
    "https://ichef.bbci.co.uk/news/1024/branded_pidgin/16f8/live/f3f945d0-777a-11ef-b282-4535eb84fe4b.png",
    "https://issafrica.s3.amazonaws.com/site/images/banners/1718270000108-2024-06-13-iss-today-ghana-elections-banner.png",
    "https://thevaultznews.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-17-at-4.59.55-PM.jpeg",
    "https://i0.wp.com/www.asaaseradio.com/wp-content/uploads/2024/09/EC-AGAINST.webp?fit=743%2C424&ssl=1"
  ];

  return (

      <div className="slider-container">
      <Slider {...settings} className="slider">
        {images.map((url, index) => (
          <div className="slider-item" key={index}>
            <img src={url} alt={`Slide ${index + 1}`}  />
          </div>
        ))}
      </Slider>
      <div className="sliderTxt">
        <h2>How do I vote during the Elections</h2>
        <p>Want to know more about the upcoming elections? </p>
        <a href='https://ec.gov.gh/'>Click here to learn more</a>
      </div>
    </div>

    
  );
};

export default HomeSlider;
