import React, { useEffect, useRef } from 'react'
import faq from "./images/title_faq.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const FAQInputPage = () => {
    const navigate = useNavigate();
    const categoryRef = useRef();
    const faqSubjectRef = useRef();
    const faqAnswerRef = useRef();

    const handleCancel = () => {
        navigate(-1);
      }

    const handleSave = () => {
    sessionStorage.setItem("faqSubject", faqSubjectRef.current.value);
    sessionStorage.setItem("faqAnswer", faqAnswerRef.current.value);
    alert("임시저장 되었습니다.");
    }

    const handleSubmit = () => {
      if (faqSubjectRef.current.value === "") {
        alert("제목을 입력해주세요");
        faqSubjectRef.current.focus();
        return false;
      } else if (faqAnswerRef.current.value === "") {
        alert("내용을 입력해주세요");
        faqAnswerRef.current.focus();
        return false;
      }
      
      let qclsText = "";
      if(categoryRef.current.value === "shipping") {
        qclsText = "배송";
      } else if (categoryRef.current.value === "exchange") {
        qclsText = "교환/반품";
      } else if (categoryRef.current.value === "payment") {
        qclsText = "결제";
      } else if (categoryRef.current.value === "change") {
        qclsText = "배송 전 변경";
      } else {
        qclsText = "기타";
      }
      const data = {qcls: qclsText, faqsubject: faqSubjectRef.current.value, faqanswer: faqAnswerRef.current.value};
      axios
      .post("http://localhost:8080/insertFaq", data)
      .then((res) => {
        faqSubjectRef.current.value = "";
        faqAnswerRef.current.value = "";
        if (sessionStorage.getItem("faqSubject") !== "" || sessionStorage.getItem("faqAnswer") !== "") {
          sessionStorage.removeItem("faqSubject");
          sessionStorage.removeItem("faqAnswer");
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .then(() => {
        navigate("/FAQ");
      })
    }

    useEffect(() => {
      if (sessionStorage.getItem("id") !== "admin") {
        alert("관리자 전용 페이지입니다.\n이전 페이지로 돌아갑니다.");
        navigate(-1);
      }
  
      if(sessionStorage.getItem("faqSubject") !== "" || sessionStorage.getItem("faqAnswer") !== "") {
        const title = sessionStorage.getItem("faqSubject");
        const content = sessionStorage.getItem("faqAnswer");
        faqSubjectRef.current.value = title;
        faqAnswerRef.current.value = content;
      }
    }, [])

  return (
    <>
        <MainBox>
            <FAQInputBox>
                <h2>
                    <img src={faq} alt="faq" />
                </h2>
                <table>
                    <tr>
                        <th>카 테 고 리</th>
                        <td>
                            <select ref={categoryRef}>
                                <option value="shipping">배송</option>
                                <option value="exchange">교환/반품</option>
                                <option value="payment">결제</option>
                                <option value="change">배송 전 변경</option>
                                <option value="etc">기타</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>제 목</th>
                        <td><input type="text" ref={faqSubjectRef}></input></td>
                    </tr>
                    <tr>
                        <th>내 용</th>
                        <td><textarea ref={faqAnswerRef}></textarea></td>
                    </tr>
                </table>
            </FAQInputBox>
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
  )
}

export default FAQInputPage

const MainBox = styled.div`
    min-height: 750px;
    color: #776E64;
`;

const FAQInputBox = styled.div`
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
    width: 20%;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #b2a495;
    vertical-align: middle;
    }
    td {
        width: 85%;
    padding: 15px 44px 15px 0px;
    border-bottom: 1px solid #b2a495;
    }
    td select {
    border: 1px solid #776E64;
    color: #776E64;
    width: 240px;
    height: 30px;
    font-size: 20px;
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
