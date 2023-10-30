import React, { useEffect, useState } from "react";
import faq from "./images/title_faq.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FAQPage = () => {
  // const faqData = {
  //   shipping: [
  //     {
  //       faqindex: 0,
  //       faqsubject: "언제 배송 되나요?",
  //       faqanswer: "발송 후 1~2일 정도 소요됩니다.",
  //     },
  //     {
  //       faqindex: 1,
  //       faqsubject: "배송조회는 어떻게 하나요?",
  //       faqanswer: "택배사 송장번호로 검색하시면 됩니다.",
  //     },
  //     {
  //       faqindex: 2,
  //       faqsubject: "배송이 되었다는 문자를 받았는데 배송조회가 되지 않아요.",
  //       faqanswer: "아직 택배사에 전달되기 전 입니다.",
  //     },
  //     {
  //       faqindex: 3,
  //       faqsubject: "상품을 한번에 묶음배송 받고 싶어요.",
  //       faqanswer: "고객센터에 전화 부탁드립니다.",
  //     },
  //     {
  //       faqindex: 4,
  //       faqsubject: "주문번호 확인 할 수 있나요?",
  //       faqanswer: "1:1 문의 남겨주세요.",
  //     },
  //     {
  //       faqindex: 5,
  //       faqsubject: "상품수령을 못했는데 배송완료 되었어요.",
  //       faqanswer: "1:1 문의 남겨주시면 확인 해드리겠습니다.",
  //     },
  //   ],
  //   exchange: [
  //     {
  //       faqindex: 0,
  //       faqsubject: "교환/반품 하고싶어요.",
  //       faqanswer: "배송 전이면 가능합니다.",
  //     },
  //     {
  //       faqindex: 1,
  //       faqsubject: "교환/반품 배송비와 환불은 어떻게 처리되나요?",
  //       faqanswer: "고객센터에 전화 부탁드립니다.",
  //     },
  //     {
  //       faqindex: 2,
  //       faqsubject: "교환/반품 불가한 경우가 있나요?",
  //       faqanswer: "판매상품 특성 상 어렵습니다.",
  //     },
  //   ],
  //   payment: [
  //     {
  //       faqindex: 0,
  //       faqsubject: "무통장 입금 결제방법으로 주문 후 입금했는데 확인되지 않아요.",
  //       faqanswer: "1:1 문의 남겨주세요.",
  //     },
  //     {
  //       faqindex: 1,
  //       faqsubject: "여러가지 상품을 따로 주문하였는데 한꺼번에 입금해도 되나요?",
  //       faqanswer: "네 가능합니다.",
  //     },
  //     {
  //       faqindex: 2,
  //       faqsubject: "실수로 주문금액보다 더(혹은 덜) 입금했어요.",
  //       faqanswer: "감사합니다.",
  //     },
  //     {
  //       faqindex: 3,
  //       faqsubject: "현금영수증 신청은 어떻게 하나요?",
  //       faqanswer: "1:1 문의 남겨주세요.",
  //     },
  //     {
  //       faqindex: 4,
  //       faqsubject: "휴대폰/실시간계좌이체 부분취소 환불은 왜 안되나요?",
  //       faqanswer: "통신사에 문의 바랍니다.",
  //     },
  //   ],
  //   change: [
  //     {
  //       faqindex: 0,
  //       faqsubject: "배송 전인데 상품을 변경하고 싶어요.",
  //       faqanswer: "1:1 문의 남겨주세요.",
  //     },
  //     {
  //       faqindex: 1,
  //       faqsubject: "배송 전인데 주소를 변경하고 싶어요.",
  //       faqanswer: "1:1 문의 남겨주세요.",
  //     },
  //     {
  //       faqindex: 2,
  //       faqsubject: "배송 전인데 주문취소하고 싶어요.",
  //       faqanswer: "주문취소 요청 해주세요.",
  //     },
  //     {
  //       faqindex: 3,
  //       faqsubject: "배송 전인데 상품을 추가하고 싶어요.",
  //       faqanswer: "추가주문 해주세요.",
  //     },
  //   ],
  //   etc: [
  //     {
  //       faqindex: 0,
  //       faqsubject: "방문수령 또는 퀵으로 받아 볼 수 있나요?",
  //       faqanswer: "1:1 문의 남겨주세요.",
  //     },
  //     {
  //       faqindex: 1,
  //       faqsubject: "구매 적립금/후기 적립금이 궁금해요.",
  //       faqanswer: "적립금은 현금처럼 사용 가능합니다. 인출은 안돼요.",
  //     },
  //   ],
  // };
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isShown, setIsShown] = useState({
    shipping: "show",
    exchange: "noshow",
    payment: "noshow",
    change: "noshow",
    etc: "noshow",
  });

  const onClick = (name) => {
    const showReset = {
      shipping: "noshow",
      exchange: "noshow",
      payment: "noshow",
      change: "noshow",
      etc: "noshow",
    };
    const nowShow = { ...showReset, [name]: "show" };
    setIsShown(nowShow);
  };

  const [faqData, setFaqData] = useState({});

  const getFaqData = () => {
    axios.get("http://localhost:8080/getFaqs")
    .then((res) => {
      const { data } = res;
      setFaqData({shipping: data["배송"], exchange: data["교환/반품"], payment: data["결제"], change: data["배송 전 변경"], etc: data["기타"]});
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    getFaqData();
    if(sessionStorage.getItem("id") !== null) {
      if(sessionStorage.getItem("id") === "admin") {
        setIsAdmin(true);
      }
    }
  }, [isShown]);

  // console.log(Object.keys(faqData).length);
  // console.log(faqData);

  return (
    <>
      <MainBox>
        <FaqBox id="FaqBox">
          <h2>
            <img src={faq} alt="notice" />
          </h2>
          <CategoryBox id="categoryBox">
            <div onClick={() => onClick("shipping")}>
              <a href="#!">배송</a>
            </div>
            |
            <div onClick={() => onClick("exchange")}>
              <a href="#!">교환/반품</a>
            </div>
            |
            <div onClick={() => onClick("payment")}>
              <a href="#!">결제</a>
            </div>
            |
            <div onClick={() => onClick("change")}>
              <a href="#!">배송 전 변경</a>
            </div>
            |
            <div onClick={() => onClick("etc")}>
              <a href="#!">기타</a>
            </div>
          </CategoryBox>
          <CategoryNoticeBox id="categoryNoticeBox">
            {isShown.shipping === "show" && (
              Object.keys(faqData).length !== 0 ? (
              <div>
                {faqData.shipping.map((data, index) => (
                  <div key={index}>
                    <p onClick={() => {navigate(`/faq/shipping/${data.faqindex}`)}}>{data.faqsubject}</p>
                  </div>
                ))}
              </div>
              ) : (
                <></>
              )
            )}
            {isShown.exchange === "show" && (
              Object.keys(faqData).length !== 0 ? (
              <div>
                {faqData.exchange.map((data, index) => (
                  <div key={index}>
                    <p onClick={() => {navigate(`/faq/exchange/${data.faqindex}`)}}>{data.faqsubject}</p>
                  </div>
                ))}
              </div>
              ) : (
                <></>
              )
            )}
            {isShown.payment === "show" && (
              Object.keys(faqData).length !== 0 ? (
              <div>
                {faqData.payment.map((data, index) => (
                  <div key={index}>
                    <p onClick={() => {navigate(`/faq/payment/${data.faqindex}`)}}>{data.faqsubject}</p>
                  </div>
                ))}
              </div>
              ) : (
                <></>
              )
            )}
            {isShown.change === "show" && (
              Object.keys(faqData).length !== 0 ? (
              <div>
                {faqData.change.map((data, index) => (
                  <div key={index}>
                    <p onClick={() => {navigate(`/faq/change/${data.faqindex}`)}}>{data.faqsubject}</p>
                  </div>
                ))}
              </div>
              ) : (
                <></>
              )
            )}
            {isShown.etc === "show" && (
              Object.keys(faqData).length !== 0 ? (
              <div>
                {faqData.etc.map((data, index) => (
                  <div key={index}>
                    <p onClick={() => {navigate(`/faq/etc/${data.faqindex}`)}}>{data.faqsubject}</p>
                  </div>
                ))}
              </div>
              ) : (
                <></>
              )
            )}
          </CategoryNoticeBox>
          <OneononeAndWriteBox>
            <div
              onClick={() => {
                navigate("/oneonone");
              }}
            >
              1:1 문의하기
            </div>
            {isAdmin ? (<div onClick={() => {navigate("/faqInput")}}>글쓰기</div>) : null}
          </OneononeAndWriteBox>
        </FaqBox>
      </MainBox>
    </>
  );
};

export default FAQPage;

const MainBox = styled.div`
  min-height: 700px;
  color: #776e64;
`;

const FaqBox = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  h2 {
    margin: 100px 0px;
  }
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const CategoryNoticeBox = styled.div`
  > div {
    margin: 40px 0px 0px;
    border-top: 1px solid #b2a495;
  }
  div div {
    margin: 0;
    text-align: left;
    padding: 16px 40px;
    border-bottom: 1px solid #b2a495;
  }
  p {
    color: #b2a495;
  }
  p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const OneononeAndWriteBox = styled.div`
  width: 55%;
  margin: 50px 0px 0px 45%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  div:first-child {
    width: 130px;
  }
  div {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #b2a495;
    border-radius: 1000px;
    font-size: 16px;
    background-color: #fbf8f4;
  }
  div:hover {
    cursor: pointer;
    color: #fbf8f4;
    background-color: #b2a495;
    /* text-decoration: underline; */
  }
`;
