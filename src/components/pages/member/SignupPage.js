import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";
import img_title from "./images/title_signup.png";

// class SignUpPage extends React.Component { }

function SignupPage() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const navigate = useNavigate();
  
  const lineStyle = {
    width: "800px",
    borderBottom: "1px solid #776E64",
    margin: "12px 0px",
  };

  useEffect(() => {
    if (username === "" || nickname === "") {
      return;
    }
    checkDuplicate();
  }, [username, nickname]);

    // 데이터베이스에서 중복 검사 수행

    async function checkDuplicate() {
      try {
        const response = await axios.get("/api/users", {
          params: {
            username,
            nickname
          }
        });
        const { isUsernameDuplicated, isNicknameDuplicated } = response.data;
        if (isUsernameDuplicated) {
          setUsernameError("이미 사용 중인 아이디입니다.");
        } else {
          setUsernameError("");
        }
        if (isNicknameDuplicated) {
          setNicknameError("이미 사용 중인 닉네임입니다.");
        } else {
          setNicknameError("");
        }
        setIsValid(!isUsernameDuplicated && !isNicknameDuplicated);
      } catch (error) {
        console.error(error);
        alert("중복 검사에 실패했습니다.");
      }
    }
    

  function checkPasswordMatch() {
    const password = document.getElementById("password").value;
    const newpassword = document.getElementById("newpassword").value;
    const confirmnewpassword =
      document.getElementById("confirmnewpassword").value;
    const passwordMatch = document.getElementById("passwordMatch");
  
    if (newpassword !== confirmnewpassword) {
      passwordMatch.innerHTML = "비밀번호가 일치하지 않습니다.";
      passwordMatch.style.color = "red";
    } else {
      passwordMatch.innerHTML = "비밀번호가 일치합니다.";
      passwordMatch.style.color = "green";
    }
  }

  

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      username !== "" && 
      nickname !== "" && 
      password !== "" && 
      isValid && 
      password === passwordMatch) 
      {
    try {

    // 회원 가입 요청
    const response = await axios.post("signup", {
      username,
      nickname,
      password,
      fullname,
      birthdate: birthday,
      phonenumber,
      email,
      address,
    });
    console.log(response.data);

    // 회원 가입 완료 메시지 띄우기
    alert("회원 가입이 완료되었습니다.");
    } catch (error) {
    console.error(error);
    alert("회원 가입에 실패했습니다.");
    }
    } else {
    console.log("누락된 정보가 있거나 비밀번호가 일치하지 않습니다.");
    }
    };


  return (
    <>
           <TitleBox>
        <div className="title">
          <img src={img_title} alt="회원 가입하기" />
        </div>
        <div style={lineStyle}></div>
      </TitleBox>

      <Formbox>
                <form>
          <table>
            <tr>
              <th>아이디</th>
              <td>
                <input
          type="text"
          placeholder="Enter ID"
          name="username"
          required={true}
                />
              </td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input
          type="text"
          placeholder="Enter Nickname"
          name="nickname"
          required={true}
                />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
        <input
         id="password"
          type="password"
          placeholder="Enter Password"
          name="password"
          required={true}
        />
              </td>
            </tr>
            <tr>
              <th>비밀번호 확인</th>
              <td>
                <input
                id="confirmnewpassword"
                type="password"
                placeholder="Enter Password"
                name="confirmnewpassword"
                required={true}
                onChange={checkPasswordMatch}
                />
                              <span id="passwordMatch"></span>
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                <input
                   type="text"
                   placeholder="Enter Name"
                   name="fullname"
                   required={true}
                />
              </td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>
                <input
                  type="date"
                  name="bday"
                />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    name="phonenumber"
                    required={true}

                />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input
           type="email"
           placeholder="Enter E-mail"
           name="E-mail"
           required={true}

                />
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  required={true}
                />
              </td>
            </tr>
          </table>
        </form>
        <div style={lineStyle}></div>
        <button
          type="submit"
          onClick={() => {
            navigate("/login");
          }}
        >
          회원가입하기
        </button>
 
      </Formbox>
      </>
  );
}

export default SignupPage;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-top: 90px;
  }
`;

const Formbox = styled.div`
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