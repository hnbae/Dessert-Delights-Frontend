import React, { useState } from "react";
import styled from "styled-components";
import img_title from "./images/title_login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useSession } from "react-session";

const LoginPage = () => {
  const navigate = useNavigate();
  const lineStyle = {
    width: "400px",
    borderBottom: "1px solid #776E64",
    marginTop: "20px",
  };

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const SESSION_KEY = "userId";
// const [session, setSession] = useSession();

const handleLogin = (e) => {
  e.preventDefault();
  // console.log(userId);
  // console.log(userPw);
  axios
    .post(
      "http://localhost:8080/login",
      {
        id: userId,
        pw: userPw,
      },
    )
    .then((res) => {
      const { data } = res;
      if (data === true) {
        sessionStorage.setItem("id", userId);
        navigate("/");
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    })
    .catch((error) => {
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    });
};

return (
<>
<TitleBox>
<div>
<img src={img_title} alt="로그인" />
</div>
<div style={lineStyle}></div>
</TitleBox>

<form onSubmit={handleLogin}>
<LoginBox>
<div>
<label>
<b>아이디</b>
</label>
<br />
<input
type="text"
placeholder="아이디"
name="userid"
value={userId}
onChange={(e) => setUserId(e.target.value)}
required
/>
</div>
<div>
<label>
<b>비밀번호</b>
<br />
</label>
<input
type="password"
placeholder="비밀번호"
name="userpw"
value={userPw}
onChange={(e) => setUserPw(e.target.value)}
required
/>
</div>
</LoginBox>



<BtnBox2>
{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
<button type="submit">로그인</button>

    <button
      className="btn_join"
      onClick={() => {
        navigate("/signup");
      }}
    >
      회원가입
    </button>
  </BtnBox2>
  </form>
</>
);
};

export default LoginPage;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "NanumGothicCoding";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: -0.5px;
  color: #776e64;

  div {
    margin-top: 25px;
  }

  input {
    margin-top: 12px;
    padding-left: 20px;
    width: 380px;
    height: 40px;
    border: 1px solid #b2a495;
    background: transparent;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: #776e64;
  }

  input:focus {
    outline: none !important;
    border-color: #776e64;
    box-shadow: 0 0 2px #776e64;
    transition: 0.3s;
  }
`;

const BtnBox1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  button {
    margin: 0px 25px;
    font-family: "NanumGothicCoding";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    letter-spacing: -0.5px;
    color: #776e64;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }
`;

const BtnBox2 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 150px;

  button {
    margin: 10px 0px;
    width: 200px;
    height: 40px;
    border-radius: 1000px;
    background: #fbf8f4;
    font-family: "NanumGothicCoding";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    letter-spacing: -0.5px;
    cursor: pointer;

    &.btn_login {
      border: 1px solid #776e64;
      color: #776e64;
    }

    &.btn_join {
      border: 1px solid #b2a495;
      color: #b2a495;
    }

    &:hover {
      background-color: #776e64;
      color: #f8f1e9;
      transition: 0.3s;
    }
  }
`;
