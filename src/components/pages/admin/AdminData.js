import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminData() {
  // 회원 list
  const [memberlist, setMemberlist] = useState([]);
  const [member, setMember] = useState({
    id: "",
    pw: "",
    authority: "",
    name: "",
    nickname: "",
    phone: "",
    birth: "",
    email: "",
    address: "",
  });

  // const getMemberlist = () => {
  //   axios
  //     .get("/getMemberList", {})
  //     .then((res) => {
  //       console.log("res ==>", res);
  //       const { data } = res;
  //       console.log("data ==>", data);
  //       setMemberlist(data);
  //       // console.log("memberlist: ", memberlist, "0: ", memberlist[0]);
  //       if (data.length > 0) {
  //         setMember(data[0]);
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  // 상품 list
  const [productlist, setProductlist] = useState([]);
  const [product, setProduct] = useState({
    pid: "",
    category: "",
    pname: "",
    poption: "",
    pprice: 0,
    extrafee: 0,
    prate: 0.0,
    sales: 0,
    stock: 0,
    details: "",
    imgsrc: "",
    dimgsrc: "",
    pdate: "",
  });

  // 상품을 카테고리 id 기준으로 오름차순 정렬
  const getAllProducts = () => {
    axios
      .get("http://localhost:8080/getAllProducts", {})
      .then((res) => {
        const { data } = res;
        setProductlist(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(productlist);

  //새로운 상품 등록(상품 등록 성공하면 t, 아니면 f)
  // const addProduct = () => {
  //   axios
  //     .get("/addProduct", {  })
  //     .then((res) => {
  //       const { data } = res;
  //       setProduct(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  //상품 정보 수정(상품 수정 성공하면 t, 아니면 f)
  // const modifyProduct = (e) => {
  //   axios
  //     .get("/modifyProduct", { product })
  //     .then((res) => {
  //       const { data } = res;
  //       setProduct(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  // //상품 삭제
  // const deleteProduct = (e) => {
  //   axios
  //     .get("/deleteProduct", { pId: e.target.id })
  //     .then((res) => {
  //       getAllProducts();
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  return { member, memberlist, product, productlist };
}

export default AdminData;
