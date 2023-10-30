import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img_title from "./images/title_modifyInfo.png";
// import { useSession } from "react-session";

const ModifyInfo = () => {
  const navigate = useNavigate();
  const lineStyle = {
    width: "800px",
    borderBottom: "1px solid #776E64",
    margin: "12px 0px",
  };

  // const SESSION_KEY = "userId";
  // const [session, setSession] = useSession();

  // 바뀌기 전 회원의 정보를 불러오는
  // const getMemberData = async (memberData) => {
  //   try {
  //     const response = await axios.get("getMember", {
  //       params: {
  //         id: session[SESSION_KEY],
  //       },
  //     });
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if (session[SESSION_KEY]) {
  //     getMemberData()
  //       .then((data) => {
  //         setMemberData(data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

  // 정보 변화를 입력하는, 값변경될때 상태값 업데이트 위해
  // const updateMemberData = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/modifyInfo/${memberData.id}`,
  //       memberData
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // 변경 적용
  // const handleUpdate = (event) => {
  //   event.preventDefault();

  //   updateMemberData(memberData)
  //     .then(() => {
  //       navigate("/checkInfo");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // 값을 변경할 때마다 상태값을 업데이트합니다.
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setMemberData({
  //     ...memberData,
  //     [name]: value,
  //   });
  // };

  const idRef = useRef();
  const pwRef = useRef();
  const nicknameRef = useRef();
  const birthRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const [memberData, setMemberData] = useState({
    id: "",
    pw: "",
    name: "",
    nickname: "",
    phone: "",
    birth: "",
    email: "",
    address: "",
  });

  const getMemberData = () => {
    axios.get(`http://localhost:8080/getMember?id=${sessionStorage.getItem("id")}`)
    .then((res) => {
      const { data } = res;
      setMemberData(data);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  const handleUpdate = () => {
    const updateData = {id: idRef.current.value, pw: pwRef.current.value, nickname: nicknameRef.current.value, birth: birthRef.current.value, email: emailRef.current.value, phone: phoneRef.current.value, address: addressRef.current.value};
    // console.log(updateData);
    axios.post("http://localhost:8080/modifyInfo", updateData)
    .then((res) => {
      const { data } = res;
      // console.log(res);
      if(data === true) {
        alert("개인정보 수정완료");
        navigate("/mypage");
      } else {
        alert("개인정보 수정실패");
      }
    })
    .catch((err) => {
      console.error(err);
    })
  };

  useEffect(() => {
    getMemberData()   
  }, []);

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
                  ref={idRef}
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
                  ref={pwRef}
                  defaultValue={memberData.pw}
                  // onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>비밀번호 확인</th>
              <td>
                <input
                  type="password"
                  // checkPasswordMatch() 연결
                />
              </td>
            </tr>
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
                  ref={nicknameRef}
                  defaultValue={memberData.nickname}
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
                  ref={phoneRef}
                  defaultValue={memberData.phone}
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
                  ref={birthRef}
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
                  ref={emailRef}
                  defaultValue={memberData.email}
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
                  ref={addressRef}
                  defaultValue={memberData.address}
                  // onChange={onChange}
                />
              </td>
            </tr>
          </table>
        </form>
        <div style={lineStyle}></div>
        <button type="button" onClick={handleUpdate}>
  변경사항 적용
</button>
      </FormBox>
    </>
  );
};

export default ModifyInfo;

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
