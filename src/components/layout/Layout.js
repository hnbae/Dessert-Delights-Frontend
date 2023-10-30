import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import MainBannerSlider from "../common/MainBannerSlider";
import Header from "./Header";
import RecentlyNavBar from "./RecentlyNavBar";

const Layout = ({ memberData, setMemberData }) => {
  useEffect(() => {
    // 스크롤 맨 위로 옮기기
    window.scroll({ top: 0 });
  }, []);
  const location = useLocation();
  return (
    <PageLayout className="Page">
      {/* 헤더 */}
      <HeaderLayout className="Header">
        <Header />
      </HeaderLayout>
      <MainBannerSlider path={location.pathname} />
      {/* 내용 */}
      <ContentsLayout className="Contents">
        {/* 왼쪽 여백 */}
        <LeftAsideLayout className="LeftAside" />
        {/* 페이지 섹션 */}
        <SectionLayout className="section">
          <Outlet />
        </SectionLayout>
        {/* 오른쪽 여백: Recently Viewed Product Navigation Bar */}
        <RightAsideLayout className="RightAside">
          <RecentlyNavBar />
        </RightAsideLayout>
      </ContentsLayout>
      {/* 푸터 */}
      <FooterLayout className="Footer">
        <span>©Dessert Delights</span>
      </FooterLayout>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  font-family: Merriweather;
  background: #fefcfa;

  a {
    text-decoration: none;
    color: #b2a495;
  }
`;

const HeaderLayout = styled.div`
  height: 100px;
  position: sticky;
  top: 0;
  padding: 8px 32px;
  background: #f8f1e9;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.25));
  z-index: 1;
`;

const ContentsLayout = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: baseline;
`;

const AsideLayout = styled.div`
  width: 15%;
  height: vmax;
`;
const LeftAsideLayout = styled(AsideLayout)`
  float: left;
`;
const RightAsideLayout = styled(AsideLayout)`
  float: right;
`;

const SectionLayout = styled.div`
  width: 70%;
  height: vmax;
`;

const FooterLayout = styled.div`
  height: 60px;
  background: #fefcfa;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px 32px;
  gap: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
`;

export default Layout;
