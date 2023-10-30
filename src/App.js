import "./assets/styles/font.css";
import "./assets/styles/reset.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainPage from "./components/pages/main/MainPage";
import LoginPage from "./components/pages/member/LoginPage";
import SignupPage from "./components/pages/member/SignupPage";
import Mypage from "./components/pages/member/MyPage";
import CheckInfo from "./components/pages/member/CheckInfo";
import ModifyInfo from "./components/pages/member/ModifyInfo";
import CartPage from "./components/pages/payment/CartPage";
import CartOrderPage from "./components/pages/payment/CartOrderPage";
import OrderCompletePage from "./components/pages/payment/OrderCompletePage";
import NoticePage from "./components/pages/inquiry/NoticePage";
import FAQPage from "./components/pages/inquiry/FAQPage";
import NoticeInputPage from "./components/pages/inquiry/NoticeInputPage";
import OneononePage from "./components/pages/inquiry/OneononePage";
import ProductDetailPage from "./components/pages/product/ProductDetailPage";
import ReviewPage from "./components/pages/product/ReviewPage";
import ProductPage from "./components/pages/product/ProductPage";
import NoticeDetailPage from "./components/pages/inquiry/NoticeDetailPage.js";
import FAQDetailPage from "./components/pages/inquiry/FAQDetailPage.js";
import FAQInputPage from "./components/pages/inquiry/FAQInputPage";
import AdminItemList from "./components/pages/admin/AdminItemList";
import AdminItemDetail from "./components/pages/admin/AdminItemDetail";
import AdminInputItem from "./components/pages/admin/AdminInputItem";
import AdminUpdateItem from "./components/pages/admin/AdminUpdateItem";
import ProductSearch from "./components/pages/product/ProductSearch";

function App() {
  //  회원 데이터: 필요한 경우 데이터 추가 필요
  const [memberData, setMemberData] = useState({
    id: "",
    pw: "",
    authority: false,
    name: "Guest",
    nickname: "",
    phone: "",
    birth: "",
    email: "",
    address: "",
  });

  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout memberData={memberData} setMemberData={setMemberData} />
          }
        >
          <Route index element={<MainPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                memberData={memberData}
                setMemberData={setMemberData}
              />
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/checkInfo" element={<CheckInfo />} />
          <Route path="/modifyInfo" element={<ModifyInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cartorder" element={<CartOrderPage />} />
          <Route path="/ordercomplete" element={<OrderCompletePage />} />
          <Route path="/product/:category" element={<ProductPage />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="/product/detail/:pname" element={<ProductDetailPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/notice/:noticeId" element={<NoticeDetailPage />} />
          <Route path="/noticeInput" element={<NoticeInputPage />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path="/FAQ/:category/:faqId" element={<FAQDetailPage />} />
          <Route path="/faqInput" element={<FAQInputPage />} />
          <Route path="/OneonOne" element={<OneononePage />} />
          <Route path="/adminItemList" element={<AdminItemList />} />
          <Route path="/adminItemDetail/:param" element={<AdminItemDetail />} />
          <Route path="/adminInputItem" element={<AdminInputItem />} />
          <Route path="/adminUpdateItem/:param" element={<AdminUpdateItem />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
