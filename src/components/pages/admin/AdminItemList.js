import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import img_title from "./image/title_itemlist.png";

// 관리자 - 상품 목록 보기 페이지
// btn 신규등록: AdminInputItem
// btn 수정: AdminUpdateItem/param
// btn 삭제: handledelete;
const AdminItemList = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);

  const getAllProducts = () => {
    axios
      .get("http://localhost:8080/getAllProducts")
      .then((res) => {
        const { data } = res;
        setItemList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [itemList]);

  // 삭제
  const handleDelete = (e) => {
    console.log("e.target.id", e.target.id);
    axios
      .get(`http://localhost:8080/deleteProduct?pid=${e.target.id}`)
      .then((res) => {
        console.log("성공");
        getAllProducts();
      })
      .catch((e) => console.error(e));
  };

  // useEffect(() => {
  //   console.log(itemList);
  // }, [itemList]);

  return (
    <>
      <Title>
        <div>
          <img src={img_title} alt="상품목록관리" />
        </div>
      </Title>
      <ListBox>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>No.</th>
              <th style={{ width: "10%" }}>카테고리</th>
              <th style={{ width: "18%" }}>상품명</th>
              <th style={{ width: "12%" }}>옵션</th>
              <th style={{ width: "15%" }}>단가</th>
              <th style={{ width: "10%" }}>판매량</th>
              <th style={{ width: "15%" }}>재고</th>
              <th style={{ width: "15%" }}>
                <button
                  className="btn_new"
                  onClick={() => {
                    navigate("/adminInputItem");
                  }}
                >
                  신규등록
                </button>
              </th>
            </tr>
          </thead>
        </table>
        <div className="scroll">
          <table>
            <tbody>
              {itemList.map((item, index) => (
                <tr key={index} id={item.pid}>
                  <td style={{ width: "5%" }}>{index + 1}</td>
                  <td style={{ width: "10%" }}>{item.category}</td>
                  <td style={{ width: "18%" }} className="itemName">
                    <Link to={`/adminItemDetail/${item.pid}`}>
                      {item.pname}
                    </Link>
                  </td>
                  <td style={{ width: "12%" }}>{item.poption}</td>
                  <td style={{ width: "15%" }}>₩ {item.pprice}</td>
                  <td style={{ width: "10%" }}>{item.sales}</td>
                  <td style={{ width: "15%" }}>{item.stock} pcs</td>
                  <td>
                    <button
                      className="btn_update"
                      onClick={() => {
                        navigate(`/adminUpdateItem/${item.pid}`);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="btn_delete"
                      id={item.pid}
                      onClick={handleDelete}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ListBox>
    </>
  );
};

export default AdminItemList;

const Title = styled.div`
  display: flex;
  margin-top: 90px;
  margin-bottom: 45px;
  justify-content: center;
  align-items: center;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 150px;
  justify-content: center;
  align-items: center;

  font-family: "NanumGothic";
  letter-spacing: -0.5px;
  line-height: 130%;
  color: #776e64;

  table,
  div table {
    width: 900px;
    max-width: 900px;
    border-collapse: collapse;
  }

  div {
    &.scroll {
      width: 900px;
      height: 450px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  table th,
  table td {
    border-bottom: 1px solid #b2a495;
    padding: 8px;
    text-align: center;
    vertical-align: middle;

    &.itemName {
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  table th {
    font-size: 15px;
    font-weight: 800;
  }

  table td {
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
  }

  td > img {
    width: 100px;
    height: 100px;
  }

  button {
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0px 1px;
    transition: 0.3s;
    cursor: pointer;

    &.btn_new {
      width: 88px;
      height: 30px;
      background: #776e64;
      border: 1px solid #fbf8f4;
      border-radius: 1000px;
      font-family: "Merriweather";
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      color: #eddbc7;
      
      &:hover {
        color: #776e64;
        background: #eddbc7;
      }
    }

    &.btn_update, &.btn_delete {
      width: 50px;
      height: 30px;
      background: #eddbc7;
      border: 1px solid #fbf8f4;
      border-radius: 1000px;
      font-family: "Merriweather";
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      color: #776e64;

      &:hover {
        color: #eddbc7;
        background: #776e64;
      }
    }

`;
