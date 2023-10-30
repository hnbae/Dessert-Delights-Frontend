import React, { useEffect, useState } from "react";
import faq from "./images/title_faq.png";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FAQDetailPage = () => {

  const params = useParams();
  const { category, faqId } = params;
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState({});

  const getFaqData = () => {
    axios.post(`http://localhost:8080/getFaq`, {faqindex: parseInt(faqId)})
    .then((res) => {
      const { data } = res;
      // console.log(data);
      setFaqData(data);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  useEffect(() => {
    getFaqData();
  }, []);

  // console.log(Object.keys(faqData).length);

  return (
    <>
      <MainBox>
        <FAQBox>
          <h2>
            <img src={faq} alt="notice" />
          </h2>
          <TitleBox>
            {Object.keys(faqData).length !== 0 && faqData.faqsubject}
          </TitleBox>
          <ContentBox>
            {Object.keys(faqData).length !== 0 && faqData.faqanswer}
          </ContentBox>
          <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
        </FAQBox>
      </MainBox>
    </>
  );
};

export default FAQDetailPage;

const MainBox = styled.div`
  min-height: 700px;
  color: #776e64;
`;

const FAQBox = styled.div`
  width: 800px;
  margin: 0 auto;
  text-align: center;
  h2 {
    margin: 100px 0px 50px;
  }
`;

const TitleBox = styled.div`
  border-bottom: 1px solid #776e64;
  text-align: left;
  font-size: 25px;
  padding: 0px 10px 10px;
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
    color: #fbf8f4;
    background-color: #776e64;
    /* text-decoration: underline; */
  }
`;
