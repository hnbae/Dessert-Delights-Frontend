import React, { useEffect, useState } from "react";
import notice from "./images/title_notice.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NoticePage = () => {
  const navigate = useNavigate();
  const [ noticeDataList, setNoticeDataList ] = useState([]);

  const getNoticeDataList = () => {
    axios.get("http://localhost:8080/getNoticeList", {})
    .then((res) => {
      // console.log(res);
      const { data } = res;
      setNoticeDataList(data);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    getNoticeDataList();
    if(sessionStorage.getItem("id") !== null) {
      if(sessionStorage.getItem("id") === "admin") {
        setIsAdmin(true);
      }
    }
  }, [])

  return (
    <>
      <MainBox>
        <NoticeBox id="noticeBox">
          <h2>
            <img src={notice} alt="notice" />
          </h2>
          <table>
            <tr>
              <th>Writer</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Views</th>
            </tr>
            {noticeDataList.map((data, index) => (
              <tr key={index}>
                <td>{data.nickname}</td>
                <td>
                  <p onClick={() => {navigate(`/notice/${data.noticeindex}`)}}>{data.noticesubject}</p>
                </td>
                <td>{data.noticedate}</td>
                <td>{data.views}</td>
              </tr>
            ))}
          </table>
        </NoticeBox>
        {isAdmin ? (<WriteAndListBox id="writeAndListBox">
          <div
            onClick={() => {
              navigate("/noticeinput");
            }}
          >
            글쓰기
          </div>
        </WriteAndListBox>) : null}
        <Pagination id="pagination">
          <div>&lt;&lt;</div>
          &nbsp;&nbsp;&nbsp;
          <div>&lt;</div>
          &nbsp;&nbsp;&nbsp;
          <div>1</div>
          &nbsp;&nbsp;&nbsp;
          <div>&gt;</div>
          &nbsp;&nbsp;&nbsp;
          <div>&gt;&gt;</div>
        </Pagination>
      </MainBox>
    </>
  );
};

export default NoticePage;

const MainBox = styled.div`
  min-height: 700px;
  color: #776e64;
`;

const NoticeBox = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  h2 {
    margin: 100px 0px 50px;
  }
  table {
    width: 1000px;
    border-collapse: collapse;
  }
  table tr:first-child {
    font-family: "Merriweather";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
  }
  /* table tr:nth-child(2) td:nth-child(-n + 2) {
    font-weight: bold;
  } */
  table p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  table tr td,
  table tr th {
    width: 100px;
    height: 50px;
    border-bottom: 1px solid #b2a495;
    vertical-align: middle;
  }
  table tr td:nth-child(2) {
    width: 500px;
  }
`;

const WriteAndListBox = styled.div`
  width: 1000px;
  margin: 32px auto 0px;
  display: flex;
  justify-content: right;
  gap: 20px;
  div {
    padding: 8px 27px;
    border: 1px solid #776e64;
    border-radius: 1000px;
    cursor: pointer;
    background-color: #fbf8f4;
  }
  div:hover {
    border: 1px solid #776e64;
    background-color: #776e64;
    color: #fbf8f4;
    /* text-decoration: underline; */
  }
`;

const Pagination = styled.div`
  width: 172px;
  margin: 26px auto 0px;
  display: flex;
  div:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
