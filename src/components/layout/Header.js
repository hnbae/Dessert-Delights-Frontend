import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title_Logo from "../../assets/images/title_logo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");

  const handleLogout = (e) => {
    sessionStorage.removeItem("id");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("id") === null ) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      setLoginId(sessionStorage.getItem("id"));
    }
  }, [sessionStorage.getItem("id")])

  // const member = {
  //   id: "",
  //   pw: "",
  //   authority: "member",
  //   name: "",
  //   nickname: "",
  //   phone: "",
  //   birth: "",
  //   email: "",
  //   address: "",
  // };

  return (
    <header className="layout-header">
      {isLoggedIn ? (
        loginId === "admin" ? (
          <RightTopNav className="right-top-menu">
            <Link to="/" onClick={handleLogout}>
              logout
            </Link>
            <Link to="/mypage">mypage</Link>
            <Link to="/adminItemList">items</Link>
          </RightTopNav>
        ) : (
          <RightTopNav className="right-top-menu">
            <Link to="/" onClick={handleLogout}>
              logout
            </Link>
            <Link to="/mypage">mypage</Link>
            <Link to="/cart">cart</Link>
          </RightTopNav>
        )
      ) : (
        <RightTopNav className="right-top-menu">
          <Link to="/login">login</Link>
          <Link to="/signup">signup</Link>
          <Link to="/cart">cart</Link>
        </RightTopNav>
      )}
      <Title className="header-title">
        <Link to={"/"}>
          <img alt="desert" src={Title_Logo} />
        </Link>
      </Title>
      <MainNav className="main-nav">
        <SubNavLinks
          name="shop"
          pages={["Cake", "Cupcake", "Doughnut", "Macaron", "Beverage"]}
        />
        <Link to="/notice">notice</Link>
        <Link to="/FAQ">FAQ</Link>
      </MainNav>
      <SearchBar className="search-bar" />
    </header>
  );
};

const SubNavLinks = ({ name, pages }) => {
  // shop 위에 마우스를 올렸을 때 submenu가 나타나게 하는 기능
  const [isSubLinkOpen, setIsSubLinkOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseOver = () => {
    setIsSubLinkOpen(true);
  };

  const handleMouseOut = () => {
    setIsSubLinkOpen(false);
  };

  return (
    <SubNav
      className="SubNavBox"
      onMouseOver={handleMouseOver}
      on
      onMouseOut={handleMouseOut}
    >
      <span>{name}</span>
      <ul>
        {isSubLinkOpen &&
          pages.map((page, index) => {
            return (
              <li key={index}>
                <Link to={"/product/" + page}>{page}</Link>
              </li>
            );
          })}
      </ul>
    </SubNav>
  );
};

const SearchBar = () => {
  const query = useRef("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${query.current.value}`);
  };
  return (
    <SearchBarBox className="search-bar" onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        className="input-search"
        defaultValue={""}
        ref={query}
      />
      <SearchButton className="input-search-submit" type="submit">
        Search
      </SearchButton>
    </SearchBarBox>
  );
};

const RightTopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 260px;
  right: 40px;
  top: 10px;
  a {
    padding: 10px;
    font-weight: 700;
    font-size: 1rem;
    :hover {
      color: black;
    }
  }
`;

const Title = styled.div`
  font-family: "Caramel";
  font-style: normal;
  font-weight: 400;
  font-size: 5rem;
  padding-top: 10px;
  text-align: center;
  letter-spacing: 0.02rem;
  /* $-beige-700 */

  color: #776e64;
`;

const MainNav = styled.div`
  display: flex;
  align-items: baseline;
  padding: 0px;
  gap: 40px;

  position: absolute;
  height: 44px;
  left: 40px;
  top: 60px;
  /* identical to box height, or 24px */
  /* $-beige-600 */

  color: #b2a495;
  a,
  span {
    font-family: "Merriweather";
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 100%;
    width: 100px;
    text-align: center;
  }
  > a:hover {
    color: black;
  }
`;

const SubNav = styled.div`
  font-size: 1.5rem;
  left: 0;
  text-align: center;
  align-items: center;
  width: 100px;
  :hover {
    span {
      color: black;
    }
    ul {
      border: 1.5px solid #776e64;
    }
  }
  span:hover {
    cursor: default;
  }
  ul {
    margin-top: 10px;
    background-color: #f8f1e9;
  }
  li {
    padding: 5px 0;
    :hover {
      background-color: #b2a495;
      a {
        color: white;
      }
    }
  }
  a {
    font-size: 1rem;
  }
`;

const SearchBarBox = styled.form`
  position: absolute;
  height: 25px;
  right: 40px;
  top: 64px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 20px;
`;

const SearchInput = styled.input`
  width: 150px;
  height: 1.4rem;

  /* $-beige-50 */

  background: #fefcfa;
  border: 1px solid #fefcfa;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 999px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;

  width: 82px;

  /* $-beige-400 */

  background: #f1e2d2;
  border: 1px solid #f1e2d2;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;

  /* Inside auto layout */

  font-family: "Merriweather";
  font-style: italic;
  font-weight: 300;
  font-size: 1rem;
  line-height: 24px;
  letter-spacing: 0.5px;

  /* $-beige-600 */
  color: #b2a495;
  cursor: pointer;

  :hover {
    background-color: #b2a495;
    border-color: #b2a495;
    color: white;
  }
`;

export default Header;
