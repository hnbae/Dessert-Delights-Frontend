import React, { useEffect, useState } from "react";
import notice from "./images/title_notice.png";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const NoticeDetailPage = () => {
  const noticeId = useParams().noticeId;
  const navigate = useNavigate();
  
  const [ noticeData, setNoticeData ] = useState();

  const readNoticeData = () => {
    axios.get(`http://localhost:8080/readNotice?noticeIndex=${noticeId}`)
    .then((res) => {
      const { data } = res;
      setNoticeData(data);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  useEffect(() => {
    readNoticeData();
  }, [])
  
  return (
    <>
      <MainBox>
        <NoticeBox>
          <h2>
            <img src={notice} alt="notice" />
          </h2>
          <TitleAndDate>
            <div>{noticeData?.noticesubject}</div>
            <div>{noticeData?.nickname} | {noticeData?.noticedate}</div>
          </TitleAndDate>
          <ContentBox>{noticeData?.noticecontents}</ContentBox>
          <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
        </NoticeBox>
      </MainBox>
    </>
  );
};

export default NoticeDetailPage;

const MainBox = styled.div`
  min-height: 700px;
  color: #776e64;
`;

const NoticeBox = styled.div`
  width: 800px;
  margin: 0 auto;
  text-align: center;
  h2 {
    margin: 100px 0px 50px;
  }
`;

const TitleAndDate = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 10px;
  border-bottom: 1px solid #b2a495;
  div:first-child {
    font-size: 25px;
  }
`;

const ContentBox = styled.div`
  text-align: left;
  padding: 30px 10px;
  font-size: 14px;
`;

const BackBtn = styled.div`
  padding: 8px 27px;
  border: 1px solid #776e64;
  border-radius: 1000px;
  margin-top: 150px;
  text-align: center;
  width: 70px;
  :hover {
    cursor: pointer;
    background-color: #776e64;
    color: #fbf8f4;
    /* text-decoration: underline; */
  }
`;
