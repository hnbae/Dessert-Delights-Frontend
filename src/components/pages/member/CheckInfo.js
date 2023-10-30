import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import img_title from "./images/title_checkInfo.png";
import axios from 'axios';
// import { useSession } from "react-session";

const CheckInfo = () => {
  const navigate = useNavigate();
  const lineStyle = {
    width: '800px',
    borderBottom: '1px solid #776E64',
    margin: '12px 0px',
  };

  const [memberData, setMemberData] = useState({
    id: '',
    pw: '',
    authority: '',
    name: '',
    nickname: '',
    phone: '',
    birth: '',
    email: '',
    address: '',
  });

  // const [session, setSession] = useSession();
  // const memberId = session.memberId;

  // useEffect(() => {
  //   // 정보를 호출하는 함수
  //   const fetchMemberData = async () => {
  //     try {
  //       const response = await axios.get(`/getMember/${memberId}`);
  //       const data = response.data; // 받아온 데이터
  //       setMemberData(data); // 받아온 데이터를 memberData 상태에 저장
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchMemberData(); // API를 호출해서 데이터를 가져옴
  // }, [memberId]);

  return (
    <>
      <TitleBox>
        <div className="title">
          <img src={img_title} alt="회원 정보 수정" />
        </div>
        <div style={lineStyle}></div>
      </TitleBox>
      <FormBox>
        <form>
          <table>
            <tr>
              <th>아이디</th>
              <td>
                <input
                  type="text"
                  name="id"
                  defaultValue={memberData.id}
                  readOnly
                  // onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <input
                  type="password"
                  name="pw"
                  defaultValue={memberData.pw}
                  readOnly
                  // onChange={onChange}
                />
              </td>
            </tr>
            {/* <tr>
              <th>비밀번호 확인</th>
              <td>
                <input
                  type="password"
                  readOnly
                  // checkPasswordMatch() 연결
                />
              </td>
            </tr> */}
            <tr>
              <th>이름</th>
              <td>
                <input
                  type="text"
                  name="name"
                  defaultValue={memberData.name}
                  readOnly
                  // onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input
                  type="text"
                  name="nickname"
                  defaultValue={memberData.nickname}
                  readOnly
                  // onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                  type="text"
                  name="phone"
                  defaultValue={memberData.phone}
                  readOnly
                  // onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>
                <input
                  type="date"
                  name="birth"
                  defaultValue={memberData.birth}
                  readOnly
                  // onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input
                  type="email"
                  name="email"
                  defaultValue={memberData.email}
                  readOnly
                  // onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                <input
                  type="text"
                  name="address"
                  defaultValue={memberData.address}
                  readOnly
                  // onChange={onChange}
                />
              </td>
            </tr>
          </table>
        </form>
        <div style={lineStyle}></div>
        <button
          type="submit"
          onClick={() => {
            navigate("/");
          }}
          // `/modifyInfo/${memberData.id}`
        >
          정보 수정하기
        </button>
      </FormBox>
    </>
  );
};

export default CheckInfo;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-top: 90px;
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  font-family: "Inter";
  margin-bottom: 150px;
  letter-spacing: -0.5px;
  color: #776e64;

  table {
    margin-bottom: 12px;
  }

  input {
    margin-left: 32px;
    margin-top: 12px;
    padding-left: 20px;
    width: 300px;
    height: 40px;
    border: 1px solid #b2a495;
    border-radius: 8px;
    background: transparent;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: #776e64;

    &:read-only {
      border: none !important;
      color: #b2a495;
    }
  }

  input:focus {
    outline: none !important;
    border-color: #776e64;
    box-shadow: 0 0 2px #776e64;
    transition: 0.3s;
  }

  button {
    margin-top: 32px;
    width: 200px;
    height: 40px;
    border: 1px solid #776e64;
    border-radius: 1000px;
    background: #fbf8f4;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #776e64;
    line-height: 24px;
    letter-spacing: -0.5px;
    cursor: pointer;

    &:hover {
      background-color: #776e64;
      color: #f8f1e9;
      transition: 0.3s;
    }
  }
`;
