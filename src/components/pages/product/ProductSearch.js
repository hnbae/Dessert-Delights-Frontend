import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import cakeImg from "./image/cake.png";
import cupcakeImg from "./image/cupcake.png";
import doughnutImg from "./image/doughnut.png";
import macaronImg from "./image/macaron.png";
import coffeeandteaImg from "./image/coffeeandtea.png";
import axios from "axios";

const ProductSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchProducts, setSearchProducts] = useState([]);
  const [paramsText, setparamsText] = useState("");

  const getSearchProduct = () => {
    axios
      .get(
        `http://localhost:8080/getSearchProduct?keyword=${searchParams.get(
          "query"
        )}`
      )
      .then((res) => {
        const { data } = res;
        // console.log(res);
        setSearchProducts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setparamsText(searchParams.get("query"));
    getSearchProduct();
  }, [searchParams]);

  const ProductClickHandler = (e) => {
    const nextlink =
      "/product/detail/" + e.target.alt.split(" ").join("") + "/";
    sessionStorage.setItem("getProductpId", e.target.id);
    navigate(nextlink);
  };

  return (
    <>
      <MainBox>
        <TitleBox>Search</TitleBox>
        <ProductsBox>
          <h1>Products</h1>
          <ProductItems>
            {searchProducts.length === 0 ? (
              <>
                <NosearchBox>
                  <NosearchText>
                    {searchParams.get("query")}에 대한 검색결과가 없습니다.
                  </NosearchText>
                  <SuggestText>추천</SuggestText>
                  <SuggestItems>
                    <SuggestItem onClick={() => navigate("/search?query=Cake")}>
                      케이크
                    </SuggestItem>
                    <SuggestItem
                      onClick={() => navigate("/search?query=Cupcake")}
                    >
                      컵케이크
                    </SuggestItem>
                    <SuggestItem
                      onClick={() => navigate("/search?query=Doughnut")}
                    >
                      도넛
                    </SuggestItem>
                    <SuggestItem
                      onClick={() => navigate("/search?query=Macaron")}
                    >
                      마카롱
                    </SuggestItem>
                    <SuggestItem
                      onClick={() => navigate("/search?query=Beverage")}
                    >
                      커피&차
                    </SuggestItem>
                  </SuggestItems>
                </NosearchBox>
              </>
            ) : (
              searchProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  padding={"10px"}
                  onClick={ProductClickHandler}
                >
                  <img src={item.imgsrc} alt={item.pname} id={item.pid} />
                  <p value={index}>
                    [{item.category}] {item.pname}
                  </p>
                  <p>{item.pprice} &#8361;</p>
                </ProductItem>
              ))
            )}
          </ProductItems>
        </ProductsBox>
      </MainBox>
    </>
  );
};

export default ProductSearch;

const MainBox = styled.div`
  width: 100%;
  float: left;
  min-height: 800px;
`;

const TitleBox = styled.div`
  text-align: center;
  margin: 80px 0px 100px 0px;
  font-family: "Merriweather";
  font-style: italic;
  font-weight: 400;
  font-size: 30px;
  color: #b2a495;
`;

const ProductsBox = styled.div`
  width: 100%;
  margin-bottom: 100px;
  h1 {
    margin-bottom: 10px;
    font-family: "Merriweather";
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    color: #b2a495;
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
    width: 250px;
    height: 280px;
    position: relative;
    cursor: pointer;
  }
  p {
    cursor: pointer;
  }
`;

const NosearchBox = styled.div`
  font-family: "Merriweather";
  color: #b2a495;
`;

const NosearchText = styled.p`
  padding: 20px;
  margin-bottom: 100px;
  font-size: 20px;
`;

const SuggestText = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const SuggestItems = styled.div`
  display: flex;
  gap: 15px;
`;

const SuggestItem = styled.div`
  cursor: pointer;
`;
