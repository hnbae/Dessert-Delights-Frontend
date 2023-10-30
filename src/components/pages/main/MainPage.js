import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemSlider from "../../common/ItemSlider";
import axios from "axios";

const MainPage = () => {
  // const ItemList = [
  //   { category: "Cupcake", name: "초코 컵케익1", price: "4,000", imgSrc: "" },
  //   { category: "Cupcake", name: "초코 컵케익2", price: "4,000", imgSrc: "" },
  //   { category: "Cupcake", name: "초코 컵케익3", price: "4,000", imgSrc: "" },
  //   { category: "Cupcake", name: "초코 컵케익4", price: "4,000", imgSrc: "" },
  //   { category: "Cupcake", name: "초코 컵케익5", price: "4,000", imgSrc: "" },
  //   { category: "Cupcake", name: "초코 컵케익6", price: "4,000", imgSrc: "" },
  //   { category: "Doughnut", name: "도넛 4종1", price: "8,000", imgSrc: "" },
  //   { category: "Doughnut", name: "도넛 4종2", price: "8,000", imgSrc: "" },
  //   { category: "Doughnut", name: "도넛 4종3", price: "8,000", imgSrc: "" },
  //   { category: "Doughnut", name: "도넛 4종4", price: "8,000", imgSrc: "" },
  //   { category: "Doughnut", name: "도넛 4종5", price: "8,000", imgSrc: "" },
  //   { category: "Doughnut", name: "도넛 4종6", price: "8,000", imgSrc: "" },
  // ];
  // const hotItemImages = require.context(
  //   "../../../assets/images/HotItems",
  //   false,
  //   /\.(png|jpe?g|svg)$/
  // );
  // const HotItemImgNames = hotItemImages.keys();
  // HotItemImgNames.map(
  //   (name, index) => (ItemList[index].imgSrc = hotItemImages(name))
  // );
  const [ hotItems, setHotItems] = useState([]);
  const [ newArrivals, setNewArrivals] = useState([]);
  const getHotItemList = () => {
    axios.get("http://localhost:8080/getHotItems")
    .then((res) => {
      const { data } = res;
      setHotItems(data);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  const getNewArrivals = () => {
    axios.get("http://localhost:8080/getNewArrivals")
    .then((res) => {
      const { data } = res;
      setNewArrivals(data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    getHotItemList();
    getNewArrivals();
  }, [])

  // console.log(hotItems);
  // console.log(newArrivals);

  return (
    <ContainerBox className="main-page">
      <article className="HotItems">
        <h1>Hot Items</h1>
        <div className="slidebox">
          <ItemSlider itemList={hotItems} />
        </div>
      </article>
      <article className="NewArrivals">
        <h1>New Arrivals</h1>
        <div className="slidebox">
          <ItemSlider itemList={newArrivals} />
        </div>
      </article>
    </ContainerBox>
  );
};

const ContainerBox = styled.div`
  padding: 40px;

  article {
    margin-bottom: 120px;
  }

  h1 {
    width: 100%;

    font-family: "Merriweather";
    font-style: italic;
    font-weight: 400;
    font-size: 2rem;
    line-height: 130%;

    display: flex;
    align-items: center;
    letter-spacing: -0.5px;

    /* $-beige-600 */

    color: #b2a495;
  }
`;

export default MainPage;
