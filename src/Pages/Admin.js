import React from "react";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import DataTable from "Components/Admin/DataTable/DataTable";
import Pagination from "Components/Admin/Pagination/Pagination";

const Admin = () => {
  return (
    <div>
      {/* <Header /> */}
      {/* <NavigationBar /> */}
      <SearchBar />
      <AuthFilter />
      <DataTable />
      <Pagination />
    </div>
  );
};

export default Admin;
