import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import AdminData from "./AdminData";
import img_title from "./image/title_updateitem.png";
import no_img from "./image/no_img.png";

const AdminItemUpdate = () => {
  const navigate = useNavigate();
  const { param } = useParams();

  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState({
    pid: "",
    category: "",
    pname: "",
    poption: "",
    pprice: null,
    extrafee: null,
    prate: null,
    sales: null,
    stock: null,
    details: "",
    imgsrc: "",
    dimgsrc: "",
    pdate: "",
  });

  const getProduct = () => {
    axios
      .get(`http://localhost:8080/getProduct?pid=${param}`)
      .then((res) => {
        const { data } = res;
        setItem(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // const [itemList, setItemList] = useState([]);
  // const [item, setItem] = useState({
  //   pid: "",
  //   category: "",
  //   pname: "",
  //   poption: "",
  //   pprice: 0,
  //   extrafee: 0,
  //   prate: 0.0,
  //   sales: 0,
  //   stock: 0,
  //   details: "",
  //   imgsrc: "",
  //   dimgsrc: "",
  //   pdate: "",
  // });

  // const getProduct = () => {
  //   axios
  //     .get(`http://localhost:8080/getProduct?pid=${param}`)
  //     .then((res) => {
  //       console.log(param);
  //       const { data } = res;
  //       setItem(data);
  //       console.log(item);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       console.log(param);
  //       console.log("error!!", item);
  //       console.log(typeof itemPId);
  //     });
  // };

  useEffect(() => {
    getProduct();
  }, []);

  const pIdRef = useRef();
  const categoryRef = useRef();
  const pNameRef = useRef();
  const pOptionRef = useRef();
  const pPriceRef = useRef();
  const extraFeeRef = useRef();
  const pRateRef = useRef();
  const salesRef = useRef();
  const stockRef = useRef();
  const detailsRef = useRef();
  const imgSrcRef = useRef();
  const DimgSrcRef = useRef();
  const pDateRef = useRef();

  // 선택한 썸네일 사진 (+미리보기)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setItem({
        ...item,
        imgsrc: reader.result,
      });
    };
  };
  // 선택한 상세페이지 사진
  const handleDetailImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setItem({
        ...item,
        dimgsrc: reader.result,
      });
    };
  };

  const handleUpdate = () => {
    axios
      .post("http://localhost:8080/modifyProduct", {
        category: categoryRef.current.value,
        pname: pNameRef.current.value,
        poption: pOptionRef.current.value,
        pprice: pPriceRef.current.value,
        extrafee: extraFeeRef.current.value,
        stock: stockRef.current.value,
        details: detailsRef.current.value,
        imgsrc: item.imgsrc,
        dimgsrc: item.dimgsrc,
        pid: pIdRef.current.value,
      })
      .then((res) => {
        // console.log("handleUpdate res => ", res);
        navigate(`/adminItemDetail/${item.pid}`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div style={{ padding: "90px 0px 45px 0px", textAlign: "center" }}>
        <img src={img_title} alt="상품 수정" />
      </div>
      <InputBox>
        <form>
          <div className="main">
            <table style={{ width: "100%" }}>
              <tr>
                <th style={{ width: "15%" }}>상품 ID</th>
                <td style={{ width: "35%" }}>
                  <input type="hidden" value={item.pid} ref={pIdRef} />
                  {item.pid}
                </td>
                <th style={{ width: "15%" }}>카테고리</th>
                <td style={{ width: "35%" }}>
                  <select required class="select" ref={categoryRef}>
                    <option disabled selected>
                      {item.category}
                    </option>
                    <option value="cake">cake</option>
                    <option value="beverage">beverage</option>
                    <option value="cupcake">cupcake</option>
                    <option value="doughnut">doughnut</option>
                    <option value="macaron">macaron</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>상품명</th>
                <td>
                  <input type="text" defaultValue={item.pname} ref={pNameRef} />
                </td>
                <th>단가</th>
                <td>
                  <input
                    type="nubmer"
                    placeholder="숫자만 입력"
                    defaultValue={item.pprice}
                    ref={pPriceRef}
                  />
                  &nbsp;&nbsp;원
                </td>
              </tr>
              <tr>
                <th>옵션</th>
                <td>
                  <input
                    type="text"
                    defaultValue={item.poption}
                    ref={pOptionRef}
                  />
                </td>
                <th>옵션 추가금</th>
                <td>
                  <input
                    type="number"
                    placeholder="숫자만 입력"
                    defaultValue={item.extrafee}
                    ref={extraFeeRef}
                  />
                  &nbsp;&nbsp;원
                </td>
              </tr>
              <tr>
                <th>
                  썸네일
                  <br />
                  미리보기
                </th>
                <td>
                  {item.imgsrc ? (
                    <img src={item.imgsrc} alt="selected_image" width="100" />
                  ) : (
                    <img src={no_img} alt="no_image" width="100" />
                  )}
                </td>
                <th>
                  썸네일
                  <br />
                  <br />
                  썸네일 변경
                </th>
                <td>
                  <input
                    type="text"
                    value={item.imgsrc} // 파일업로드 기능필요
                    style={{ marginBottom: "12px" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    // ref={imgSrcRef}
                  />
                </td>
              </tr>
              <tr>
                <th>상품 설명</th>
                <td>
                  <input
                    type="text"
                    defaultValue={item.details}
                    ref={detailsRef}
                  />
                </td>
                <th>
                  상세페이지
                  <br />
                  <br />
                  상세페이지 변경
                </th>
                <td>
                  <input
                    type="text"
                    value={item.dimgsrc} // 파일업로드 기능필요
                    style={{ marginBottom: "12px" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDetailImageUpload}
                    // ref={dimgSrcRef}
                  />
                </td>
              </tr>
              <tr>
                <th>판매량</th>
                <td>
                  <input type="hidden" value={item.sales} ref={salesRef} />
                  {item.sales}
                </td>
                <th>재고</th>
                <td>
                  <input
                    type="number"
                    placeholder="숫자만 입력"
                    defaultValue={item.stock}
                    ref={stockRef}
                  />
                  &nbsp;&nbsp;pcs
                </td>
              </tr>
              <tr>
                <th>리뷰 평점</th>
                <td>
                  <input type="hidden" value={item.prate} ref={salesRef} />
                  {item.prate}
                </td>
                <th>상품 등록일시</th>
                <td ref={pDateRef} readOnly>
                  {item.pdate}
                </td>
              </tr>
            </table>
          </div>
          <div className="btn">
            <input type="button" onClick={handleUpdate} value="수정" />
            <input
              type="button"
              onClick={() => navigate("/adminItemList")}
              value="목록"
            />
          </div>
        </form>
      </InputBox>
    </>
  );
};

export default AdminItemUpdate;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 150px;
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
    background-color: transparent;

    &.main {
      border: 1px solid #776e64;
      border-radius: 15px;
    }
    &.btn {
      flex-direction: row;
    }
  }

  table {
    align-items: center;
    max-width: 800px;
    width: 100%;
  }

  select::-ms-expand {
    display: none;
  }

  .select {
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  select {
    width: 213px;
    height: 33px;
    font-family: "NanumGothic";
    font-style: normal;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.5px;
    line-height: 200%;
    color: #776e64;
    text-align: left;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-top: 2px;
    padding-left: 10px;
    background-color: #f8f1e9;
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

  input {
    width: 200px;
    height: 28px;
    font-family: "NanumGothic";
    font-style: normal;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.5px;
    line-height: 180%;
    color: #776e64;
    text-align: left;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-top: 2px;
    padding-left: 10px;
    background-color: #f8f1e9;
  }

  input[type="file"]::file-selector-button {
    height: 20px;
    font-family: "NanumGothic";
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.5px;
    color: #776e64;
    background: #fbf8f4;
    border: 1px solid #b2a495;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: #776e64;
      color: #f8f1e9;
      transition: 0.3s;
    }
  }

  input[type="button"] {
    width: 70px;
    height: 40px;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    margin: 0 2px;
    transition: 0.3s;
    background: #776e64;
    border: 1px solid #fbf8f4;
    border-radius: 1000px;
    font-family: "Merriweather";
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    color: #eddbc7;

    &:hover {
      color: #776e64;
      background: #eddbc7;
    }
  }
`;
