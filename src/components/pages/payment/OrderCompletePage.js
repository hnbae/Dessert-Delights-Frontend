import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import product_img from "./product_img.png";
import ordercomplete from "./images/title_ordercomplete.png";

function OrderCompletePage() {
  const navigate = useNavigate();
  const handleMypage = () => {
    //마이페이지로 결제 데이터를 전송한다.
    navigate("/mypage");
  };
  const handleMain = () => {
    //메인페이지로 이동한다.
    navigate("/");
  };
  const handleReview = () => {
    //후기작성페이지로 이동한다.
    navigate("/review");
  };

  return (
    <>
      <MainBox>
        <CartBox id="CartBox">
          <h2>
            <img src={ordercomplete} alt="notice" />
          </h2>

          <OrderBox id="OrderBox">
            <div>
              <table class="orderlable">
                <tr>
                  <td>주문번호</td>
                  <td>2023030311494821</td>
                </tr>

                <tr>
                  <td>배송지정보</td>
                  <td>관리자</td>
                </tr>

                <tr>
                  <td>전화번호</td>
                  <td>01012345678</td>
                </tr>

                <tr>
                  <td>주소</td>
                  <td>서울특별시 마포구 상암동</td>
                </tr>

                <tr>
                  <td>결제금액</td>
                  <td>10,000원</td>
                </tr>

                <tr>
                  <td>결제수단</td>
                  <td>신용카드</td>
                </tr>
              </table>
            </div>
          </OrderBox>

          <Line>
            <div className="line"></div>
          </Line>
          <OrderBox2>
            <table>
              <tr class="order_img">
                <td>
                  <img src={product_img} alt="productimg" />
                </td>
                <td>
                  <div class="orderframe">
                    <div class="order_pname">[DOUGHNUT]Anna</div>
                    <div class="order_pname2">option:shining</div>&nbsp;
                    <div class="order_krw">KRW 10,000</div>
                  </div>
                </td>
              </tr>
            </table>
            <Button3 onClick={handleReview}>리뷰작성하기</Button3>
          </OrderBox2>
          <Line2>
            <div className="line"></div>
          </Line2>

          <Button onClick={handleMypage}>마이페이지</Button>
          <Button2 onClick={handleMain}>메인으로</Button2>
        </CartBox>
      </MainBox>
    </>
  );
}

export default OrderCompletePage;

const MainBox = styled.div`
  min-height: 950px;
  color: #776e64;
`;
const CartBox = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  h2 {
    margin: 100px 0px;
  }
`;

const OrderBox = styled.div`
  text-align: left;
  display: flex;
  justify-content: center;
  gap: 87px;
  width: 1000px;
  height: 26px;
  left: 354px;
  top: 344px;
  font-family: "Merriweather";
  font-style: normal;
  font-size: 22px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  table {
    border-collapse: separate;
    border-spacing: 25px;
  }
`;

const OrderBox2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;

  font-size: 19px;
  img {
    padding: 20px 80px 0 0;
    margin-left: 0px;
    margin-bottom: 20px;
    width: 140px;
    height: 140px;
  }
  td {
    vertical-align: middle;
  }
  table {
    border-collapse: separate;
    border-spacing: 25px;
  }
`;
const Line = styled.div`
  margin-top: 300px;
  margin-bottom: 10px;
  border: 1px solid #b2a495;
  top: 100px;
`;
const Line2 = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #b2a495;
  top: 100px;
`;

const Button = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;

  position: relative;
  width: 200px;
  height: 40px;
  left: 225px;
  top: 80px;

  background: #f1e2d2;
  border: 1px solid #f1e2d2;
  border-radius: 50px;
  color: #776e64;
  cursor: pointer;

  font-size: 20px;

  &:hover {
    font-weight: bold;

    background-color: #776e64;
    color: #f8f1e9;
    transition: 0.3s;
  }
`;
const Button2 = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;

  position: relative;
  width: 200px;
  height: 40px;
  left: 585px;
  top: 40px;

  background: #f1e2d2;
  border: 1px solid #f1e2d2;
  border-radius: 50px;
  color: #776e64;
  cursor: pointer;

  font-size: 20px;

  &:hover {
    font-weight: bold;

    background-color: #776e64;
    color: #f8f1e9;
    transition: 0.3s;
  }
`;

const Button3 = styled.div`
  box-sizing: border-box;
  font-size: 17px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;

  position: relative;
  width: 150px;
  height: 40px;
  left: 170px;
  top: 80px;

  background: #f1e2d2;
  border: 1px solid #f1e2d2;
  border-radius: 50px;
  color: #776e64;
  cursor: pointer;

  font-size: 20px;
  &:hover {
    font-weight: bold;

    background-color: #776e64;
    color: #f8f1e9;
    transition: 0.3s;
  }
`;
