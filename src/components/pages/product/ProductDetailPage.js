import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";
import axios from "axios";

const ProductDetailPage = () => {
  const [Expanded, setExpansion] = useState(false);
  const [ExpandBtn, setExpandBtn] = useState(<FaChevronDown />);
  const [productData, setProductData] = useState();
  const navigate = useNavigate();
  const expansion = useRef("");
  const onClickExpand = () => {
    if (Expanded) {
      expansion.current.style.height = "250px";
      expansion.current.style.overflow = "hidden";
      setExpansion(false);
      setExpandBtn(<FaChevronDown />);
    } else {
      expansion.current.style.height = "fit-content";
      expansion.current.style.overflow = "default";
      setExpansion(true);
      setExpandBtn(<FaChevronUp />);
    }
  };
  const expandReview = (e) => {
    const reviewDetail = e.currentTarget.parentElement.nextSibling;
    if (!reviewDetail.style.display || reviewDetail.style.display === "none") {
      reviewDetail.style.display = "table-row";
    } else {
      reviewDetail.style.display = "none";
    }
  };

  const getProductData = () => {
    const { pid } = JSON.parse(sessionStorage.getItem("getProduct"));
    axios
      .get(`http://localhost:8080/getProduct?pid=${pid}`)
      .then((res) => {
        const { data } = res;
        setProductData(data);
        // console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  const goCartHandler = () => {
    // db에 추가하는 작업 후
    navigate("/cart");
  };

  const buyHandler = () => {
    // db에 추가하는 작업 후
    navigate("/cartorder");
  };

  console.log(productData);
  return (
    <MainBox>
      <div className="product-tree">
        <Link
          to={"/product/" + productData?.category}
          className="category-link"
        >
          {productData?.category}
        </Link>
        <h1>&nbsp;&gt; {productData?.pname} </h1>
      </div>
      <div className="product-summary">
        <div className="product-mainImage">
          <img alt={productData?.pid} src={productData?.imgsrc} />
        </div>
        <div className="product-info">
          <div className="flex-position-top">
            <div className="product-title">
              <h1>
                [{productData?.category}]{productData?.pname}
              </h1>
              <p>{productData?.details}</p>
            </div>
            <div className="product-priceNscore">
              <div className="product-score">
                <span>
                  누적 판매량(
                  {productData?.sales
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  )
                </span>
                <br />
                <span id="total-rank">
                  <StarRating rating={productData?.prate} />
                </span>
                <span>
                  &nbsp;
                  {productData?.prate.toFixed(1)}
                </span>
              </div>
              <div className="product-price">
                <h2>
                  {productData?.pprice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  &#8361;
                </h2>
              </div>
            </div>
            <select
              className="purchase-select"
              aria-label="Default select example"
              defaultValue={"none"}
            >
              <option value={"none"}>[옵션] 선택 안함</option>
              {dummyData.pOption.map((option, index) =>
                option.stock === 0 ? (
                  <option key={index} value={option} disabled>
                    {option.optname}(품절)
                  </option>
                ) : (
                  <option key={index} value={option}>
                    {option.optname}(잔여수량: {option.stock})
                  </option>
                )
              )}
            </select>
            <div className="buyingList">
              <table className="buyingtbl">
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div className="flex-position-bottom">
            <div className="product-purchase-btn">
              <button
                className="goCartBtn"
                type="submit"
                onClick={goCartHandler}
              >
                장바구니 담기
              </button>
              <button className="buyBtn" type="submit" onClick={buyHandler}>
                바로 구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail">
        <h1 id="detail-h1">Detail</h1>
        <div className="expansion" ref={expansion}>
          <img alt="detailImg" src={productData?.dimgsrc} />
        </div>
        <button onClick={onClickExpand}>{ExpandBtn}</button>
      </div>
      <div className="product-review">
        <h2 className="product-review-title">
          REVIEW ({dummyData.reviews.length})
        </h2>
        <table className="product-review-tbl">
          {dummyData.reviews.map((review, index) => (
            <tbody key={index} className="product-review-list">
              <tr>
                <td>
                  <StarRating rating={review.rate} rowSpan={2} />
                </td>
                <td className="review-title" onClick={expandReview}>
                  {review.title}
                </td>
                <td className="review-nickname" rowSpan={2}>
                  {review.nickname}{" "}
                </td>
                <td className="review-date" rowSpan={2}>
                  {review.revwDate}
                </td>
              </tr>
              <tr className="review-detail">
                <td>{review.comments}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </MainBox>
  );
};

export default ProductDetailPage;

const dummyData = {
  pId: "cupcake123",
  category: "CupCake",
  pName: "초코 컵케이크1",
  details: "달콤하고 맛있는 컵케이크~",
  imgSrc: "/image/Cupcake.png",
  DImgSrc: "/image/Cupcake.png",
  pPrice: 8000,
  pOption: [
    { optname: "S", stock: 9 },
    { optname: "M", stock: 25 },
    { optname: "L", stock: 0 },
  ],
  sales: 2100,
  pRate: 4.7,
  reviews: [
    {
      rate: 5,
      title: "정말 맛있어요",
      comments: "입에 넣었는데 감쪽같이 사라지더라구요!",
      revwDate: "2023.02.24",
      mId: "Lee1",
      nickname: "논현동 물주먹",
    },
    {
      rate: 4,
      title: "기대만큼은 아니네요",
      comments: "동네 빵집에서 먹는게 더 나은 것 같아요",
      revwDate: "2023.02.25",
      mId: "Choi2",
      nickname: "배부른 코끼리",
    },
    {
      rate: 2,
      title: "존노맛",
      comments: "설탕을 안넣은건지 단 맛이 하나도 안나네",
      revwDate: "2023.02.26",
      mId: "Park3",
      nickname: "맛알못",
    },
  ],
};

const MainBox = styled.div`
  position: relative;
  height: 100%;

  .product-tree {
    position: absolute;
    display: flex;
    /* $-beige-700 */
    color: #776e64;
    font-size: 1rem;
    top: 60px;
    left: 10px;
  }

  .product-summary {
    width: 100%;
    min-width: 769px;
    max-height: 580px;
    white-space: break-spaces;
    padding-top: 100px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
  }

  .product-mainImage {
    min-width: 346px;
    width: 45%;
  }

  .product-mainImage > img {
    width: 100%;
    max-height: 580px;
  }

  .product-info {
    width: 45%;
    min-width: 346px;
    max-height: 580px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    /* $-beige-800 */
    color: #3b3732;
    letter-spacing: -0.5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-info * {
    margin-bottom: 10px;
  }

  .product-title {
    width: auto;
  }

  .product-title h1 {
    font-size: 2rem;
    line-height: 130%;
  }

  .product-priceNscore {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-score {
    line-height: 150%;
    width: fit-content;
  }

  #total-rank svg {
    margin-bottom: 0;
  }

  .product-price {
    width: fit-content;
    font-size: 1.5rem;
  }

  .purchase-option {
    width: 100%;
  }

  .purchase-select {
    margin-top: 20px;
    width: 100%;
    height: 38px;

    /* $-beige-700 */
    border: 1px solid #776e64;
    border-radius: 4px;

    font-family: "NanumGothic";
    font-style: normal;
    font-size: 20px;
    line-height: 130%;
    letter-spacing: 2px;

    /* $-beige-800 */
    color: #3b3732;
  }

  .buyingList {
    width: 100%;
  }

  .product-purchase-btn {
    width: 100%;
    height: fit-content;
    float: bottom;
  }

  .goCartBtn {
    width: 100%;
    height: 38px;
    background: #f8f1e9;
    /* $-beige-700 */

    border: 1px solid #f8f1e9;
    border-radius: 4px;

    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 130%;
    letter-spacing: 2px;

    /* $-beige-200 */
    color: #776e64;
    :hover {
      background: #776e64;
      color: #f8f1e9;
      border: 1px solid #776e64;
      cursor: pointer;
    }
  }

  .buyBtn {
    width: 100%;
    height: 38px;

    /* $-beige-200 */
    background: #f8f1e9;
    /* $-beige-200 */
    border: 1px solid #f8f1e9;
    border-radius: 4px;

    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 130%;
    letter-spacing: 2px;

    /* $-beige-700 */
    color: #776e64;
    :hover {
      background: #776e64;
      color: #f8f1e9;
      border: 1px solid #776e64;
      cursor: pointer;
    }
  }

  .product-detail {
    margin: 100px auto;
    width: 100%;
  }

  .product-detail > #detail-h1 {
    font-size: 3rem;
    text-align: center;
    font-style: italic;
    margin-bottom: 50px;
    /* $-beige-700 */
    color: #776e64;
  }

  .expansion {
    height: 250px;
    overflow: hidden;
  }

  .expansion > img {
    width: 100%;
    box-shadow: 0px 8px 5px rgba(0, 0, 0, 0.25);
  }

  .product-detail button {
    width: 100%;
    height: 42px;

    /* $-beige-100 */

    background: #fbf8f4;
    /* $-beige-100 */

    border: 1px solid #fbf8f4;
    border-radius: 4px;
    box-shadow: 0px 8px 5px rgba(0, 0, 0, 0.25);
  }

  .product-detail button:hover {
    cursor: pointer;
  }

  .product-review {
    width: 100%;
    margin-bottom: 100px;
  }

  .product-review-title {
    font-size: 1.5rem;
    line-height: 150%;
    margin-bottom: 5px;
  }
  .product-review-tbl {
    width: 100%;
    border-top: 1px solid #3b3732;
  }

  .product-review-tbl tbody tr {
    width: 100%;
    border-bottom: 1px solid #3b3732;
  }

  .product-review-tbl tbody td {
    color: "#776E64";
    display: inline-block;
    width: fit-content;
    padding: 10px;
    margin: 10px;
    border-left: 10px solid #ffffff00;
    border-right: 10px solid #ffffff00;
    vertical-align: middle;
    line-height: 100%;
  }

  .review-title {
    width: auto;
  }

  .review-title:hover {
    cursor: pointer;
  }

  .review-date {
    float: right;
  }

  .review-nickname {
    min-width: 100px;
    max-width: 100px;
    float: right;
  }

  .review-detail {
    display: none;
  }
`;
