import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartItemList from "./CartItemList";
import styled from "styled-components";
// import product_img from "./product_img.png";
import cart from "./images/title_cart.png";
import img_tem1 from "./images/item_tem1.png";

function CartPage() {
  // const navigate = useNavigate();
  const itemList = CartItemList().itemList;
  const [amount, setAmount] = useState(1); // 수량을 state로 관리합니다.

  // + 버튼 클릭 이벤트 핸들러
  const handlePlusClick = () => {
    setAmount(amount + 1);
  };

  // - 버튼 클릭 이벤트 핸들러
  const handleMinusClick = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  // 체크박스 클릭 이벤트 핸들러
  // const handleCheckboxClick = (e) => {
  //   const checkboxes = document.getElementsByName("checkbox");
  //   checkboxes.forEach((checkbox) => {
  //     if (checkbox !== e.target) {
  //       checkbox.checked = false;
  //     }
  //   });
  // };

  // // 삭제 버튼 클릭 이벤트 핸들러
  // const handleDeleteClick = () => {
  //   const checkbox = document.getElementsByName("checkbox")[0];
  //   if (checkbox.checked) {
  //     const cartBox = document.getElementById("CartBox");
  //     const categoryBox = document.getElementById("categoryBox");
  //     const line = document.querySelector(".line");
  //     cartBox.removeChild(categoryBox);
  //     cartBox.removeChild(line);
  //   }
  // };
  const navigate = useNavigate();
  const handleSubmit = () => {
    alert("선택상품을 주문하시겠습니까?");
    //체크된 데이터만 전송한다.
    navigate("/cartorder");
  };
  const handleAllSubmit = () => {
    //모든 데이터를 전송한다.
    alert("전체상품을 주문하시겠습니까?");
    navigate("/cartorder");
  };
  return (
    <>
      <MainBox>
        <CartBox id="CartBox">
          <h2>
            <img src={cart} alt="notice" />
          </h2>
          <ListBox>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>
                    <input type="checkbox" name="checkbox" value="checkbox" />
                  </th>
                  <th style={{ width: "20%" }}>Product Img</th>
                  <th style={{ width: "25%" }}>Item Name</th>
                  <th style={{ width: "15%" }}>Unit Price</th>
                  <th style={{ width: "15%" }}>Amount</th>
                  <th style={{ width: "15%" }}>totalprice</th>
                  <th style={{ width: "15%" }}></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itemList &&
                  itemList.map((item) => (
                    <tr key={item.num} id={item.num}>
                      <td>
                        <input
                          type="checkbox"
                          name="checkbox"
                          value="checkbox"
                        />
                      </td>
                      <td>
                        <img src={item.img || img_tem1} alt="product" />
                      </td>
                      <td> {item.name}</td>

                      <td>₩ {item.price}</td>
                      <td className="amountbutton">
                        <button onClick={handleMinusClick}>-</button>
                        <input
                          type="text"
                          name="amountcheck"
                          size="1"
                          placeholder="1"
                          value={amount}
                          // readOnly // 사용자 입력을 막습니다.
                        />
                        <button onClick={handlePlusClick}>+</button>
                      </td>
                      <td>₩{item.price * amount}</td>
                      <td></td>
                      <td>
                        <button className="btn_delete">삭제</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </ListBox>

          <Button onClick={handleAllSubmit}>전체상품주문</Button>
          <Button2 onClick={handleSubmit}>선택상품주문</Button2>
        </CartBox>
      </MainBox>
    </>
  );
}

export default CartPage;

const MainBox = styled.div`
  min-height: 850px;
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

const ListBox = styled.div`
  display: flex;
  margin-bottom: 150px;
  justify-content: center;
  align-items: center;

  font-family: "Merriweather";
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.5px;
  line-height: 130%;
  color: #776e64;

  input {
    text-align: center;
    color: #776e64;
  }

  table {
    max-width: 900px;
    border-collapse: collapse;
  }

  table th,
  table td {
    border-bottom: 1px solid #b2a495;
    padding: 8px;
    text-align: center;
    vertical-align: middle;

    &.itemName {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  table th {
    font-size: 20px;
  }

  table td {
    font-size: 15px;
  }

  td > img {
    width: 100px;
    height: 100px;
  }
  .amountbutton button {
    border: 1px solid #776e64;
    border-radius: 1000px;
    width: 20px;
    height: 20px;
    color: #776e64;
    font-size: 12px;
  }
  button {
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0px 2px;
    cursor: pointer;
    transition: 0.3s;

    &.btn_delete {
      width: 55px;
      height: 34px;
      background: #776e64;
      border: 1px solid #fbf8f4;
      border-radius: 1000px;
      font-family: "Merriweather";
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #eddbc7;

      &:hover {
        color: #776e64;
        background: #eddbc7;
      }
    }
  }
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;

  position: relative;
  width: 150px;
  height: 40px;
  left: 620px;
  top: 42px;

  cursor: pointer;

  background: #eddbc7;
  color: #776e64;

  border: 1px solid #f1e2d2;
  border-radius: 50px;
  font-size: 20px;

  &:hover {
    font-weight: bold;
    color: white;
    background: #776e64;
    transition: 0.3s;
  }
`;

const Button2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;

  position: relative;
  width: 150px;
  height: 38px;
  left: 800px;
  top: 0px;

  border: 1px solid #f1e2d2;
  border-radius: 50px;

  background: #eddbc7;
  color: #776e64;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: white;
    background: #776e64;
    transition: 0.3s;
  }
`;
