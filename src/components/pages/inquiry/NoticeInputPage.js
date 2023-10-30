import React, { useEffect, useRef } from "react";
import notice from "./images/title_notice.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NoticeInputPage = () => {
  const navigate = useNavigate();
  const noticeSubjectRef = useRef();
  const noticeContentsRef = useRef();

  const handleCancel = () => {
    // if (sessionStorage.getItem("title") !== "" || sessionStorage.getItem("content") !== "") {
    //   sessionStorage.removeItem("title");
    //   sessionStorage.removeItem("content");
    // }
    navigate(-1);
  }

  const handleSave = () => {
    sessionStorage.setItem("noticeSubject", noticeSubjectRef.current.value);
    sessionStorage.setItem("noticeContents", noticeContentsRef.current.value);
    alert("임시저장 되었습니다.");
  }

  const handleSubmit = () => {
    if (noticeSubjectRef.current.value === "") {
      alert("제목을 입력해주세요");
      noticeSubjectRef.current.focus();
      return false;
    } else if (noticeContentsRef.current.value === "") {
      alert("내용을 입력해주세요");
      noticeContentsRef.current.focus();
      return false;
    }

    // FIXME: 멤버아이디 값 받아와서 넣기
    const data = {mid: "admin", noticesubject: noticeSubjectRef.current.value, noticecontents: noticeContentsRef.current.value};

    axios
    .post("http://localhost:8080/insertNotice", data)
    .then((res) => {
      // console.log(res);
      noticeSubjectRef.current.value = "";
      noticeContentsRef.current.value = "";
      if (sessionStorage.getItem("noticetitle") !== "" || sessionStorage.getItem("noticecontent") !== "") {
        sessionStorage.removeItem("noticetitle");
        sessionStorage.removeItem("noticecontent");
      }
    })
    .catch((e) => {
      console.error(e);
    })
    .then(() =>{
      navigate("/notice");
    })

  }

  useEffect(() => {
    if (sessionStorage.getItem("id") !== "admin") {
      alert("관리자 전용 페이지입니다.\n이전 페이지로 돌아갑니다.");
      navigate(-1);
    }

    if(sessionStorage.getItem("noticetitle") !== "" || sessionStorage.getItem("noticecontent") !== "") {
      const title = sessionStorage.getItem("noticetitle");
      const content = sessionStorage.getItem("noticecontent");
      noticeSubjectRef.current.value = title;
      noticeContentsRef.current.value = content;
    }
  }, [])

  return (
    <>
      <MainBox>
      <NoticeInputBox id="noticeInputBox">
        <h2>
          <img src={notice} alt="notice" />
        </h2>
        <table>
          <tr>
            <th>제 목</th>
            <td>
              <input type="text" ref={noticeSubjectRef}/>
            </td>
          </tr>
          <tr>
            <th>내 용</th>
            <td>
              <textarea ref={noticeContentsRef}></textarea>
            </td>
          </tr>
        </table>
      </NoticeInputBox>
      <ButtonArea id="buttonArea">
        <ButtonBox className="buttonBox">
          <div className="leftBtn">
            <div onClick={handleCancel}>취소</div>
          </div>
          <RightBtnBox className="rightBtn">
            <div onClick={handleSave}>임시저장</div>
            <div onClick={handleSubmit}>등록</div>
          </RightBtnBox>
        </ButtonBox>
      </ButtonArea>
      </MainBox>
    </>
  );
};

export default NoticeInputPage;

const MainBox = styled.div`
  min-height: 700px;
  color: #776E64;
`;

const NoticeInputBox = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  h2 {
    margin: 100px 0px 50px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    padding: 16px 40px;
    width: 15%;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #b2a495;
    vertical-align: middle;
  }
  td {
    padding: 16px 40px;
    border-bottom: 1px solid #b2a495;
  }
  tr:last-child th,
  tr:last-child td {
    border: none;
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
  margin-left: 200px;
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
  .leftBtn > div:hover {
    cursor: pointer;
    background-color: #b2a495;
    color: #fbf8f4;
    /* text-decoration: underline; */
  }
  .rightBtn > div:hover {
    cursor: pointer;
    background-color: #b2a495;
    color: #fbf8f4;
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
