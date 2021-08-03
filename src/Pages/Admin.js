import React, { useState, useEffect } from "react";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import UserDataTable from "Components/Admin/UserDataTable/UserDataTable";
import Pagination from "Components/Admin/Pagination/Pagination";
import { userMockData } from "Utils/MockData";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userMockData); // url: /admin/pageNumber
  }, []);

  return (
    <div>
      {/* <Header /> */}
      {/* <NavigationBar /> */}
      <div>사용자 관리</div>
      <SearchBar />
      <AuthFilter />
      <UserDataTable users={users} />
      <Pagination />
    </div>
  );
};

export default Admin;
