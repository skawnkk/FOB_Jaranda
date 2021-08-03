import React from "react";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import UserDataTable from "Components/Admin/UserDataTable/UserDataTable";
import Pagination from "Components/Admin/Pagination/Pagination";

const Admin = () => {
  return (
    <div>
      {/* <Header /> */}
      {/* <NavigationBar /> */}
      <div>사용자 관리</div>
      <SearchBar />
      <AuthFilter />
      <UserDataTable />
      <Pagination />
    </div>
  );
};

export default Admin;
