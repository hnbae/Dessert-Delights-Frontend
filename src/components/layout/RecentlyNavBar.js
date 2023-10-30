import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const RecentlyNavBar = () => {
  const RecentlyPageInfo = [
    {
      pageorder: 0,
      path: "/",
      imgSrc: "image/Recently_Img1.png",
    },
    {
      pageorder: 1,
      path: "/",
      imgSrc: "image/Recently_Img2.png",
    },
    {
      pageorder: 2,
      path: "/",
      imgSrc: "image/Recently_Img3.png",
    },
  ];

  const [recentlyData, setRecentlyData] = useState([]);

  const getProductData = () => {
    if (sessionStorage.getItem("recentlyProducts") !== null) {
      const { pid } = JSON.parse(sessionStorage.getItem("recentlyProducts"));
      axios.get(`http://localhost:8080/getProduct?pId=${pid}`, )
      .then((res) => {
        const { data } = res;
        setRecentlyData(...recentlyData, data);
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }

  // useEffect(() => {
  //   getProductData();
  // }, [sessionStorage.getItem("recentlyProducts")])

  // console.log(recentlyData);

  return (
    <RecentlyViewedPage className="recently-viewed">
      <h1>Recently Viewed</h1>
      <ul className="aside-menu">
        {RecentlyPageInfo.map((page) => {
          return (
            <li key={page.pageorder}>
              <Link to={page.path}>
                <img alt="no data" src={page.imgSrc} />
              </Link>
            </li>
          );
        })}
      </ul>
    </RecentlyViewedPage>
  );
};

const RecentlyViewedPage = styled.div`
  float: left;
  margin: 15px;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 20px;

  position: sticky;
  width: 120px;
  right: 42px;
  top: 130px;

  background: #f8f1e9;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  font-family: Inter;
  font-style: normal;
  text-align: center;
  font-weight: 400;
  letter-spacing: -0.5px;
  font-size: 0.9rem;
  color: #776e64;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ul {
    margin-top: 10px;
  }

  img {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    height: 100px;
    margin: 10px auto;
    width: 90px;
    height: 90px;
  }
`;

export default RecentlyNavBar;
