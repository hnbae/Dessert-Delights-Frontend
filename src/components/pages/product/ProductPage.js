import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ItemSlider from "../../common/ItemSlider";
import axios from "axios";

const ProductPage = () => {
  const [ productList, setProductList ] = useState([]);
  const navigate = useNavigate();

  const params = useParams();
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  const lowCategory = params.category.charAt(0).toLowerCase() + params.category.slice(1);

  const getProductList = () => {
    axios.get(`http://localhost:8080/getCategorizedProducts?category=${category}`, {})
    .then((res) => {
      // console.log(res);
      const { data } = res;
      setProductList(data);
    })
    .catch((e) => {
      console.error(e);
    });
  };
  // const getProductList = () => {
  //   console.log(category);
  //   axios.post(`http://localhost:8080/getCategorizedProducts`, category)
  //   .then((res) => {
  //     console.log(res);
  //     const { data } = res;
  //     setProductList(data);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });
  // };

  useEffect(() => {
    getProductList();
  }, [params])

  const ProductClickHandler = (item) => {
    const { pid, pname } = item;
    const nextLink = "/product/detail/" + pname.split(' ').join('') + "/";
    sessionStorage.setItem("getProduct", JSON.stringify(item));
    navigate(nextLink);
  };

  return (
    <>
      <MainBox>
        <TitleBox>
          {category}
        </TitleBox>
        <HotItemsBox>
          <h1>Hot Items</h1>
          <ItemSlider itemList={productList} ></ItemSlider>
        </HotItemsBox>
        <ProductsBox>
          <h1>Products</h1>
          <ProductItems>
          {productList.map((item, index) => (
            <ProductItem key={index}  padding={"10px"} onClick={() => ProductClickHandler(item)}>
            <img src={item.imgsrc} alt={item.pname} />
            <p value={index} >
              [{item.category}] {item.pname}
            </p>
            <p>{item.pprice} &#8361;</p>
          </ProductItem>
          ))}
          </ProductItems>
        </ProductsBox>
      </MainBox>
    </>
  )
};

export default ProductPage;


const MainBox = styled.div`
  width: 100%;
  min-height: 800px;
`;

const TitleBox = styled.div`
  text-align: center;
  margin: 80px 0px 100px 0px;
  font-family: 'Merriweather';
  font-style: italic;
  font-weight: 400;
  font-size: 30px;
  color: #B2A495;
`;

const HotItemsBox = styled.div`
  margin-bottom: 80px;
  h1 {
    font-family: 'Merriweather';
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    color: #B2A495;
  }
`;

const ProductsBox = styled.div`
  width: 100%;
  margin-bottom: 100px;
  h1 {
    margin-bottom: 10px;
    font-family: 'Merriweather';
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    color: #B2A495;
  }
`;

const ProductItems = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ProductItem = styled.div`
  padding: 15px;
  img {
    width: 230px;
    height: 250px;
    position: relative;
    cursor: pointer;
  }
  p {
    cursor: pointer;
  }
`;