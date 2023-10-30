import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import img_title from "./images/title_mypage.png";
import img_search from "./images/btn_search.png";
import axios from "axios";
// import { useSession } from "react-session";

function MyPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  // const [session, setSession] = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const period = event.target.period.value;
    const status = event.target.status.value;
    // console.log(period);
    // console.log(status);
  };

  //    const response = await fetch(
  //      `/api/orders?period=${period}&status=${status}`
  //    );
  //    const data = await response.json();

  const getOrderList = () => {
    axios
      .get(
        `http://localhost:8080/getOrderList?mid=${sessionStorage.getItem(
          "id"
        )}`,
        {}
      )
      .then((res) => {
        const { data } = res;
        setOrders(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // const getAllProduct = () => {
  //   axios
  //     .get("http://localhost:8080/getAllProducts", {})
  //     .then((res) => {
  //       const { data } = res;
  //       setProductlist(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  // 배송중인 건과 배송완료된 건으로 나누어 보여줌
  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  );
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div>
      <Title>
        <div className="title">
          <img src={img_title} alt="마이페이지" />
        </div>
      </Title>

      <Subtitle>
        <div onClick={() => navigate("/modifyinfo")}>회원정보 확인/수정</div>
      </Subtitle>

      <main>
        <OrderInquiry style={{ paddingTop: "40px" }}>
          <h2>주문 조회</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="period">Search by Period:</label>
            <select id="period" name="period">
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
            </select>
            <label htmlFor="status">Search by Status:</label>
            <select id="status" name="status">
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
            </select>
            <button
              type="submit"
              style={{ border: "none", background: "none" }}
            >
              <img src={img_search} alt="Search" />
            </button>
            <h3>* 취소/교환/반품 신청은 배송완료일 기준 7일까지 가능합니다.</h3>
          </form>
        </OrderInquiry>

        {/* 배송중인 건과 배송완료된 건으로 나누어 보여줌 */}
        <div>
          <TitleBox>배송준비중</TitleBox>
          <Mainbox>
            {processingOrders.map((order) => (
              <div key={order.id}>
                <p>{order.product}</p>
                <p>{order.order_date}</p>
                <p>{order.price}</p>
              </div>
            ))}
          </Mainbox>
        </div>
        <div>
          <TitleBox>배송완료</TitleBox>
          <Mainbox>
            {deliveredOrders.map((order) => (
              <div key={order.id}>
                <p>{order.product}</p>
                <p>{order.order_date}</p>
                <p>{order.price}</p>
              </div>
            ))}
          </Mainbox>
        </div>
      </main>
    </div>
  );
}

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75px;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  width: 55%;
  margin: 50px 0px 0px 45%;
  div:first-child {
    width: 130px;
  }
  div {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #b2a495;
    border-radius: 1000px;
    font-size: 12px;
    background-color: #fbf8f4;
  }
  div:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const OrderInquiry = styled.div`
  font-family: "Merriweather";
  font-style: normal;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
  /* identical to box height, or 24px */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* $-beige-600 */
  color: #b2a495;
  margin-bottom: 30px;



  h2 {
    font-size: 25px;
    color : #3B3732;
  }

  h3 {
    margin-top : 10px;
    font-size: 15px;,
  }
`;

const TitleBox = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 20px;
  text-align: left;
  color: #3b3732;
  border-bottom: 1px solid #b2a495;
  height: 40px;
  line-height: 40px;
`;

const Mainbox = styled.div`
margin-top : 10px;
font-size: 15px;,
margin-bottom: "15px"
height: 40px;
line-height: 40px;
`;

export default MyPage;
