import React from "react";
import { useNavigate, Link } from "react-router-dom";
// import "./CartPage.css";
import styled from "styled-components";
import product_img from "./product_img.png";
import order from "./images/title_order.png";

function CartOrderPage() {
  const navigate = useNavigate();
  const handleOrderSubmit = () => {
    //결제 데이터를 전송한다.
    alert("결제가 완료되었습니다.");

    navigate("/ordercomplete");
  };

  return (
    <>
      <MainBox>
        <CartBox id="CartBox">
          <h2>
            <img src={order} alt="notice" />
          </h2>
          <CategoryBox id="categoryBox">
            <table>
              <tr>
                <td></td>
                <td>
                  <div className="product">Product</div>
                </td>
                <td></td>
                <td>
                  <div className="unitprice">Unit Price</div>
                </td>
                <td>
                  <div className="amount">Amount</div>
                </td>
                <td>
                  <div className="totalprice">Total Price</div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <img src={product_img} alt="d" />
                </td>
                <td>
                  <div className="pname">[DOUGHNUT]Anna</div>
                  <div className="pname2">option:shining</div>
                </td>
                <td>
                  <div className="krw">KRW 10,000</div>
                </td>
                <td>1</td>
                <td>
                  <div className="krw2">KRW 10,000</div>
                </td>
              </tr>
            </table>
          </CategoryBox>
          <Line>
            <div className="line"></div>
          </Line>
          <Line2>
            <div className="line2"></div>
          </Line2>
          <TotalPrice>
            <div class="total">Total : </div>&nbsp;
            <div class="finalprice">KRW 10,000</div>
          </TotalPrice>

          <Line3>
            <div className="line3"></div>
          </Line3>

          <h3>배송지정보</h3>

          <DeliverCateBox>
            <div>
              <table class="deliverlable">
                <tr>
                  <td>주문자</td>
                  <td class="input_id">
                    <input type="text" placeholder="관리자" />
                  </td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td class="input_tel">
                    <input type="text" placeholder="010-1234-5678" />
                  </td>
                </tr>
                <tr>
                  <td>주소</td>
                  <td class="input_addr">
                    <input type="text" placeholder="서울특별시 마포구 상암동" />
                  </td>
                </tr>
                <tr>
                  <td>요청사항</td>
                  <td>
                    <select>
                      <optgroup label="배송시 요청사항">
                        <option> 부재 시 경비실에 맡겨주세요.</option>
                        <option> 문앞에 놓아주세요.</option>
                        <option> 전화부탁드립니다.</option>
                        <option> 기타</option>
                      </optgroup>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
          </DeliverCateBox>
          <Line4>
            <div className="line3"></div>
          </Line4>
          <h4>결제수단</h4>
          <PaymentBox>
            <table class="finalpay">
              <td>
                <input type="radio" name="radio" value="credit" />
                신용카드
              </td>
              <td>
                <input type="radio" name="radio" value="phone" />
                휴대폰
              </td>
              <td>
                <input type="radio" name="radio" value="cash" />
                무통장입금
              </td>
              <br />
            </table>
          </PaymentBox>
          <Button onClick={handleOrderSubmit}>결제하기</Button>
        </CartBox>
      </MainBox>
    </>
  );
}

export default CartOrderPage;

const MainBox = styled.div`
  min-height: 1050px;
  color: #776e64;
  h3 {
    padding: 20px 0 0 0;
    font-size: 20px;
    display: flex;
    justify-content: flex-end;
    margin-right: 700px;
    font-weight: bold;
  }
  h4 {
    padding: 20px 0 0px 0;
    font-size: 20px;
    display: flex;
    justify-content: flex-end;
    margin-right: 720px;
    font-weight: bold;
  }
`;
const CartBox = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  h2 {
    margin: 100px 0px;
  }
`;
const CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 87px;
  width: 1200px;
  height: 26px;
  margin-left: -100px;
  top: 344px;
  font-family: "Merriweather";
  font-style: normal;
  font-size: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  td {
    vertical-align: middle;
  }
  table {
    border-collapse: separate;
    border-spacing: 60px;
  }
`;
const Line = styled.div`
  margin-top: 60px;
  margin-bottom: 10px;
  border: 1px solid #b2a495;
`;
// const ProductBox = styled.div`
//   width: 1000px;
//   display: flex;
//   gap: 52px;
//   justify-content: center;
// `;
const Line2 = styled.div`
  margin-top: 200px;
  margin-bottom: 10px;
  border: 1px solid #b2a495;
`;

const TotalPrice = styled.div`
  display: flex;
  padding: 10px 0 10px 0;
  margin-left: 300px;
  width: 680px;
  height: 31px;
  justify-content: flex-end;
  align-items: center;
  top: 698px;
  font-size: 20px;
`;
const Line3 = styled.div`
  margin-top: 0px;
  margin-bottom: 10px;
  border: 1px solid #b2a495;
`;
const DeliverCateBox = styled.div`
  position: relative;
  display: flex;
  width: 624px;
  height: 232px;
  left: 200px;
  top: 20px;
  text-align: left;
  font-size: 17px;
  .input_id input {
    font-size: 16px;
    height: 20px;
    width: 100px;
  }
  .input_id input {
    font-size: 16px;
    height: 20px;
    width: 100px;
  }
  .input_tel input {
    font-size: 16px;
    height: 20px;
    width: 150px;
  }
  .input_addr input {
    font-size: 16px;
    height: 20px;
    width: 300px;
  }
  select {
    font-size: 16px;
    height: 25px;
    width: 350px;
  }
  table {
    width: 500px;
    height: 200px;
    border-collapse: separate;
    border-spacing: 15px;
  }
`;
const Line4 = styled.div`
  margin-top: 0px;
  margin-bottom: 10px;
  border: 1px solid #b2a495;
`;
const PaymentBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 373px;
  font-size: 18px;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 10px;
  table {
    border-collapse: separate;
    border-spacing: 35px;
  }
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
  left: 800px;
  top: 30px;

  font-size: 20px;

  color: #776e64;
  cursor: pointer;

  background: #f1e2d2;
  border: 1px solid #f1e2d2;
  border-radius: 50px;
  &:hover {
    font-weight: bold;
    background-color: #776e64;
    color: #f8f1e9;
    transition: 0.3s;
  }
`;
