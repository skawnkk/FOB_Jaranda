import React from "react";
import NavBar from "Components/common/NavBar";

const Admin = () => {
  const category = {
    admin: ["이용 안내", "사용자 관리", "계정 생성"],
    teacher: ["이용 안내", "학생 관리", "학생 소개받기"],
    parent: ["이용 안내", "우리 아이 관리", "자란다 선생님 찾기"],
  };

  return (
    <>
      {/* 권한 별 카테고리 props 다르게 넘겨주어야 함! */}
      <NavBar category={category.admin} />
    </>
  );
};

export default Admin;
