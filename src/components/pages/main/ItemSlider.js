import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ItemSlider.css";

const ItemSlider = ({ itemList }) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    // slidesToScroll: 3,
    swipeToSlide: true,
    variableWidth: true,
  };

  const onclickImg = (e) => {
    const nextlink = "product/" + itemList[e.target.alt].category + "/";
    console.log(nextlink);
  };
  const onclickName = (e) => {
    const nextlink =
      "product/" +
      itemList[e.currentTarget.previousElementSibling.alt].category +
      "/";
    console.log(nextlink);
  };

  return (
    <Slider {...settings} className="item-slider">
      {itemList.map((item, index) => (
        <div key={index} padding={"10px"}>
          <img
            className="slider_image"
            src={item.imgSrc}
            alt={index}
            width={"290px"}
            height={"320px"}
            position={"relative"}
            onClick={onclickImg}
            style={{ cursor: "pointer" }}
          />
          <p
            className="item-name"
            style={{ cursor: "pointer" }}
            value={index}
            onClick={onclickName}
          >
            [{item.category}] {item.name}
          </p>
          <p className="item-price">{item.price} &#8361;</p>
        </div>
      ))}
    </Slider>
  );
};

export default ItemSlider;
