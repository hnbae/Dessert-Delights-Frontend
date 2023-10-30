import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AdminData from "./AdminData";
import img_title from "./image/title_inputitem.png";
import no_img from "./image/no_img.png";

// 신규 등록 페이지: handleInput
const AdminInputItem = () => {
  const navigate = useNavigate();
  const product = AdminData().product;

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

  const [item, setItem] = useState(product);

  const handleInput = () => {
    console.log("handleInput pIdRef => ", pIdRef.current.value);
    console.log("typeof imgSrc => ", typeof imgSrcRef.current.value);
    axios
      .post("http://localhost:8080/addProduct", {
        pid: pIdRef.current.value,
        category: categoryRef.current.value,
        pname: pNameRef.current.value,
        poption: pOptionRef.current.value,
        pprice: pPriceRef.current.value,
        extrafee: extraFeeRef.current.value,
        prate: pRateRef.current.value,
        sales: salesRef.current.value,
        stock: stockRef.current.value,
        details: detailsRef.current.value,
        imgsrc: imgSrcRef.current.value,
        dimgsrc: DimgSrcRef.current.value,
      })
      .then((res) => {
        navigate("/adminItemList");
      })
      .catch((e) => {
        console.error(e);
        alert("필수 항목*을 모두 입력하세요!");
      });
  };

  // const handleInput = () => {
  //   console.log("handleInput pIdRef => ", pIdRef.current.value);
  //   console.log("typeof imgSrc => ", typeof imgSrcRef.current.value);
  //   axios
  //     .get(
  //       `http://localhost:8080/addProduct?pId=${pIdRef.current.value}?pName=${pNameRef.current.value}?category=${categoryRef.current.value}?pOption=${pOptionRef.current.value}?pPrice=${pPriceRef.current.value}?extraFee=${extraFeeRef.current.value}?pRate=${pRateRef.current.value}?sales=${salesRef.current.value}?stock=${stockRef.current.value}?details=${detailsRef.current.value}?imgSrc=${imgSrcRef.current.value}?DimgSrc=${DimgSrcRef.current.value}`
  //     )
  //     .then((res) => {
  //       console.log("handleInput res =>", res);
  //       navigate("/adminItemList");
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setItem((prevItem) => ({
          ...prevItem,
          img: reader.result,
          imgsrc: URL.createObjectURL(file),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 상품 등록일시
  const [currentDateTime, setCurrentDateTime] = useState(moment());
  function DateTime() {
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDateTime(moment());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  }

  return (
    <>
      <div style={{ padding: "90px 0px 45px 0px", textAlign: "center" }}>
        <img src={img_title} alt="상품 등록" />
      </div>
      <InputBox>
        <form>
          <div className="main">
            <table style={{ width: "100%" }}>
              <tr>
                <th style={{ width: "15%" }}>상품 ID *</th>
                <td style={{ width: "35%" }}>
                  <input required type="text" ref={pIdRef} />
                </td>
                <th style={{ width: "15%" }}>카테고리 *</th>
                <td style={{ width: "35%" }}>
                  <select required class="select" ref={categoryRef}>
                    <option disabled selected>
                      옵션 선택
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
                <th>상품명 *</th>
                <td>
                  <input required type="text" ref={pNameRef} />
                </td>
                <th>단가 *</th>
                <td>
                  <input
                    required
                    type="number"
                    placeholder="숫자만 입력"
                    ref={pPriceRef}
                  />
                  &nbsp;&nbsp;원
                </td>
              </tr>
              <tr>
                <th>옵션 *</th>
                <td>
                  <input required type="text" ref={pOptionRef} />
                </td>
                <th>옵션 추가금 *</th>
                <td>
                  <input
                    required
                    type="number"
                    placeholder="숫자만 입력"
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
                <th>썸네일 선택</th>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    id="thumb"
                    ref={imgSrcRef}
                    onChange={handleImageUpload}
                  />
                </td>
              </tr>
              <tr>
                <th>상품 설명</th>
                <td>
                  <input type="text" ref={detailsRef} />
                </td>
                <th>상세페이지</th>
                <td>
                  <input type="file" accept="image/*" ref={DimgSrcRef} />
                </td>
              </tr>
              <tr>
                <th>판매량</th>
                <td>
                  <input required type="number" readOnly ref={salesRef} />
                </td>
                <th>재고 *</th>
                <td>
                  <input
                    required
                    type="number"
                    placeholder="숫자만 입력"
                    ref={stockRef}
                  />
                  &nbsp;&nbsp;pcs
                </td>
              </tr>
              <tr>
                <th>리뷰 평점</th>
                <td>
                  <input required type="number" readOnly ref={pRateRef} />
                </td>
                <th>상품 등록일시</th>
                <td>
                  <input
                    required
                    type="text"
                    value={currentDateTime.format("YYYY-MM-DD HH:mm:ss")}
                    ref={pDateRef}
                    readOnly
                  />
                </td>
              </tr>
            </table>
          </div>
          <div className="btn">
            <input
              type="button"
              onClick={() => navigate("/adminItemList")}
              value="취소"
            />
            <input
              type="button"
              className="inputbtn"
              onClick={handleInput}
              value="등록"
            />
            <input type="reset" value="초기화" />
          </div>
        </form>
      </InputBox>
    </>
  );
};

export default AdminInputItem;

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
    line-height: 200%;
    color: #776e64;
    text-align: left;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-top: 2px;
    padding-left: 10px;
    background-color: #f8f1e9;

    &[readonly] {
      background-color: transparent;
    }
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

  div.btn {
    flex-direction: row;
  }

  input.inputbtn {
    width: 70px;
    height: 40px;
    background-color: transparent;
    text-align: center;
    padding: 0;
    margin: 2px;
    cursor: pointer;
    transition: 0.3s;
    border: 1px solid #fbf8f4;
    border-radius: 1000px;
    font-family: "NanumGothic";
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    background: #776e64;
    color: #eddbc7;

    &:hover {
      color: #776e64;
      background: #eddbc7;
    }
  }

  div > input {
    width: 70px;
    height: 40px;
    background-color: transparent;
    text-align: center;
    padding: 0;
    margin: 2px;
    cursor: pointer;
    transition: 0.3s;
    color: #776e64;
    background: #eddbc7;
    border: 1px solid #fbf8f4;
    border-radius: 1000px;
    font-family: "NanumGothic";
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    &:hover {
      background: #776e64;
      color: #eddbc7;
    }
  }
`;
