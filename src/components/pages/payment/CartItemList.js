import React, { useState } from "react";
import img_tem1 from "./images/item_tem1.png";
import img_tem2 from "./images/item_tem2.png";
import img_tem3 from "./images/item_tem3.png";

function CartData() {
  const [itemList, setItemList] = useState([
    {
      num: 1,
      img: img_tem1,
      name: "[DOUGHNUT] Anna",
      option: ["[옵션1]", "[옵션2]"],
      price: 10000,
      amount: "",
    },
    // {
    //   num: 2,
    //   img: img_tem2,
    //   name: "[CAKE] Strawberry",
    //   option: ["[옵션1]", "[옵션2]", "[옵션3]"],
    //   price: 20000,
    //   amount: "",
    // },
    // {
    //   num: 3,
    //   img: img_tem3,
    //   name: "[MACAROON] Juice",
    //   option: [""],
    //   price: 32000,
    //   amount: "",
    // },
  ]);

  const [item, setItem] = useState({
    num: 0,
    img: "",
    name: "",
    option: [],
    detail: "",
    price: "",
    amount: "",
  });

  return {
    itemList,
    setItemList,
    item,
    setItem,
  };
}

export default CartData;
