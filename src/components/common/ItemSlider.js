import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ItemSlider.css";
import { useNavigate } from "react-router-dom";
import noimg from "./no_img.png";

const ItemSlider = ({ itemList }) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    // slidesToScroll: 3,
    swipeToSlide: true,
    variableWidth: true,
  };

  const ProductClickHandler = (item) => {
    const { pname } = item;
    const nextLink = "/product/detail/" + pname.split(" ").join("") + "/";
    sessionStorage.setItem("getProduct", JSON.stringify(item));
    // sessionStorage.setItem("recentlyProducts", JSON.stringify(item));
    navigate(nextLink);
  };

  return (
    <Slider {...settings} className="item-slider">
      {itemList.map((item, index) =>
        item.imgsrc ? (
          <div
            key={index}
            padding={"10px"}
            onClick={() => ProductClickHandler(item)}
          >
            <img
              className="slider_image"
              src={item.imgsrc}
              alt={item.pname}
              id={item.pid}
              width={"290px"}
              height={"320px"}
              position={"relative"}
              style={{ cursor: "pointer" }}
            />
            <p
              className="item-name"
              style={{ cursor: "pointer" }}
              value={index}
            >
              [{item.category}] {item.pname}
            </p>
            <p className="item-price">{item.pprice} &#8361;</p>
          </div>
        ) : (
          <div
            key={index}
            padding={"10px"}
            onClick={() => ProductClickHandler(item)}
          >
            <img
              className="slider_image"
              src={noimg}
              alt={item.pname}
              id={item.pid}
              width={"290px"}
              height={"320px"}
              position={"relative"}
              style={{ cursor: "pointer" }}
            />
            <p
              className="item-name"
              style={{ cursor: "pointer" }}
              value={index}
            >
              [{item.category}] {item.pname}
            </p>
            <p className="item-price">{item.pprice} &#8361;</p>
          </div>
        )
      )}
    </Slider>
  );
};

export default ItemSlider;
