import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import img_title from "./image/title_itemlist.png";
import no_img from "./image/no_img.png";

// 관리자 상품 목록에서 -> 상품명 클릭시 열리는 페이지
// "/adminItemDetail/:param" => 수정페이지 or 목록페이지 이동
const AdminItemDetail = () => {
  const navigate = useNavigate();
  const { param } = useParams();
  const itemPId = decodeURIComponent(param);

  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState({
    pid: "",
    category: "",
    pname: "",
    poption: "",
    pprice: 0,
    extrafee: 0,
    prate: 0.0,
    sales: 0,
    stock: 0,
    details: "",
    imgsrc: "",
    dimgsrc: "",
    pdate: "",
  });

  const getProduct = () => {
    axios
      .get(`http://localhost:8080/getProduct?pid=${param}`)
      .then((res) => {
        console.log(param);
        const { data } = res;
        setItem(data);
      })
      .catch((e) => {
        console.error(e);
        // console.log(param);
        // console.log("error!!", item);
        // console.log(typeof itemPId);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div style={{ margin: "90px 0px 45px 0px", textAlign: "center" }}>
        <img src={img_title} alt="상품목록관리" />
      </div>
      <ItemBox>
        <div className="main">
          <table>
            <tr>
              <th style={{ width: "15%" }}>상품 ID</th>
              <td style={{ width: "35%" }}>{item.pid}</td>
              <th style={{ width: "15%" }}>카테고리</th>
              <td style={{ width: "35%" }}>{item.category}</td>
            </tr>
            <tr>
              <th>상품명</th>
              <td>{item.pname}</td>
              <th>단가</th>
              <td>₩ {item.pprice}</td>
            </tr>
            <tr>
              <th>옵션</th>
              <td>{item.poption}</td>
              <th>옵션 추가금</th>
              <td>₩ {item.extrafee}</td>
            </tr>
            <tr>
              <th>썸네일</th>
              <td>
                {item.imgsrc ? (
                  <img src={item.imgsrc} alt="selected_image" width="100" />
                ) : (
                  <img src={no_img} alt="no_image" width="100" />
                )}
              </td>
              <th>썸네일 파일</th>
              <td>{item.imgsrc}</td>
            </tr>
            <tr>
              <th>상품 설명</th>
              <td>{item.details}</td>
              <th>상세페이지 파일</th>
              <td>{item.dimgsrc}</td>
            </tr>
            <tr>
              <th>판매량</th>
              <td>{item.sales}</td>
              <th>재고</th>
              <td>{item.stock} pcs</td>
            </tr>
            <tr>
              <th>리뷰 평점</th>
              <td>{item.prate}</td>
              <th>상품 등록일시</th>
              <td>{item.pdate}</td>
            </tr>
          </table>
        </div>
        <div className="btn">
          <button
            className="btn_update"
            onClick={() => navigate(`/adminUpdateItem/${item.pid}`)}
          >
            수정
          </button>
          <button
            className="btn_list"
            onClick={() => navigate("/adminItemList")}
          >
            목록
          </button>
        </div>
      </ItemBox>
    </>
  );
};

export default AdminItemDetail;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 150px;
  flex-direction: column;

  font-family: "NanumGothic";
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.5px;
  line-height: 130%;
  color: #776e64;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    width: 800px;
    border-radius: 15px;
    background-color: transparent;

    &.main {
      border: 1px solid #776e64;
    }

    &.btn {
      flex-direction: row;
    }
  }

  div > div {
    flex-direction: row;
  }

  table {
    align-items: center;
    max-width: 800px;
    width: 100%;
  }

  table th,
  table td {
    padding: 8px;
    text-align: left;
    vertical-align: middle;
    height: 50px;
    font-family: "Inter";
    font-size: 14px;
  }

  table th {
    font-weight: 600;
  }

  button {
    width: 70px;
    height: 40px;
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0px 2px;
    cursor: pointer;
    transition: 0.3s;

    &.btn_update,
    &.btn_list {
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
