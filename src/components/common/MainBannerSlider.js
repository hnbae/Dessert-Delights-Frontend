import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideImg1 from "../../assets/images/slider_cupcake.png";
import SlideImg2 from "../../assets/images/slider_doughnut.png";
import SlideImg3 from "../../assets/images/slider_tea.png";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
const sliderImages = [SlideImg1, SlideImg2, SlideImg3];
const MainBannerSlider = () => {
  const location = useLocation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div
        style={{
          height: "50px",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    location.pathname === "/" && (
      <SliderBox className="main-slider">
        <Slider {...settings} id="main-slider">
          {sliderImages.map((sliderimg, index) => (
            <div key={index}>
              <img
                className="slider_image"
                src={sliderimg}
                alt={index}
                width={"100%"}
                height={"400px"}
              />
            </div>
          ))}
        </Slider>
      </SliderBox>
    )
  );
};

const SliderBox = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  .slick-arrow {
    display: none;
  }
`;

export default MainBannerSlider;
