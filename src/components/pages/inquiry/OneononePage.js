import React, { useEffect, useRef } from "react";
import oneonone from "./images/title_oneonone.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OneononePage = () => {
  const navigate = useNavigate();
  const qClsRef = useRef();
  const inqSubjectRef = useRef();
  const inqContentsRef = useRef();

  const handleCancel = () => {
    navigate(-1);
  }

  const handleSave = () => {
    sessionStorage.setItem("oneononetitle", inqSubjectRef.current.value);
    sessionStorage.setItem("oneononecontent", inqContentsRef.current.value);
    alert("임시저장 되었습니다.");
  }

  const handleSubmit = () => {
    if (inqSubjectRef.current.value === "") {
      alert("제목을 입력해주세요");
      inqSubjectRef.current.focus();
      return false;
    } else if (inqContentsRef.current.value === "") {
      alert("내용을 입력해주세요");
      inqContentsRef.current.focus();
      return false;
    }

    const data = {qCls: qClsRef.current.value, inqSubject: inqSubjectRef.current.value, inqContents: inqContentsRef.current.value};
    alert("카테고리 : " + data.qCls + "\n" +
          "제목 : " + data.inqSubject + "\n" +
          "내용 : " + data.inqContents
    );
    inqSubjectRef.current.value = "";
    inqContentsRef.current.value = "";
    if (sessionStorage.getItem("oneononetitle") !== "" || sessionStorage.getItem("oneononecontent") !== "") {
      sessionStorage.removeItem("oneononetitle");
      sessionStorage.removeItem("oneononecontent");
    }
  }

  useEffect(() => {

    if(sessionStorage.getItem("oneononetitle") !== "" || sessionStorage.getItem("oneononecontent") !== "") {
      const title = sessionStorage.getItem("oneononetitle");
      const content = sessionStorage.getItem("oneononecontent");
      inqSubjectRef.current.value = title;
      inqContentsRef.current.value = content;
    }
  }, [])

  return (
    <>
    <MainBox>
      <OneononeBox id="OneononeBox">
        <h2>
          <img src={oneonone} alt="notice" />
        </h2>
        <table>
          <tr>
            <th>분 류</th>
            <td>
              <select ref={qClsRef}>
                <option value="change">배송 전 변경</option>
                <option value="refund">반품 및 환불</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>제 목</th>
            <td>
              <input type="text" ref={inqSubjectRef}/>
            </td>
          </tr>
          <tr>
            <th>내 용</th>
            <td>
              <textarea ref={inqContentsRef}></textarea>
            </td>
          </tr>
        </table>
      </OneononeBox>
      <ButtonArea id="buttonArea">
        <ButtonBox id="buttonBox">
          <div>
            <div onClick={handleCancel}>취소</div>
          </div>
          <RightBtnBox id="rightBtnBox">
            <div onClick={handleSave}>임시저장</div>
            <div onClick={handleSubmit}>등록</div>
          </RightBtnBox>
        </ButtonBox>
      </ButtonArea>
      </MainBox>
    </>
  );
};

export default OneononePage;

const MainBox = styled.div`
  min-height: 750px;
  color: #776E64;
`;

const OneononeBox = styled.div`
  width: 1000px;
  margin: 0 auto;
  h2 {
    margin: 100px 0px 50px;
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    padding: 15px 50px;
    width: 15%;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #b2a495;
    vertical-align: middle;
  }
  td select {
    border: 1px solid #776E64;
    color: #776E64;
    width: 240px;
    height: 30px;
    font-size: 20px;
  }
  td {
    padding: 15px 44px 15px 0px;
    border-bottom: 1px solid #b2a495;
  }
  input[type="text"] {
    padding: 5px;
    background-color: #F8F1E9;
    border: none;
    width: 100%;
    height: 27px;
  }
  textarea {
    padding: 5px;
    background-color: #F8F1E9;
    border: none;
    resize: none;
    width: 100%;
    height: 370px;
  }
`;

const ButtonArea = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const ButtonBox = styled.div`
  width: 800px;
  margin: 16px 0px 0px 156px;
  display: flex;
  justify-content: space-between;
  div div {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #b2a495;
    border-radius: 1000px;
    font-size: 16px;
    background-color: #fbf8f4;
  }
  div div:hover {
    cursor: pointer;
    color: #fbf8f4;
    background-color: #b2a495;
    /* text-decoration: underline; */
  }
`;

const RightBtnBox = styled.div`
  display: flex;
  gap: 27px;
  div:last-child {
    color: #776e64;
    border: 1px solid #776e64;
  }
`;
