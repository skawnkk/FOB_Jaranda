import React, { useState, useEffect, useRef } from "react";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import UserDataTable from "Components/Admin/UserDataTable/UserDataTable";
import Pagination from "Components/Admin/Pagination/Pagination";
import { userMockData } from "Utils/MockData";

const Admin = () => {
  const searchKeywordRef = useRef("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setUsers(userMockData);
    setFilteredUsers(users);
  }, [users]);

  const [searchConditions, setSearchConditions] = useState({
    searchType: "name",
    condition: { whole: true, teacher: false, parents: false, admin: false },
  });

  useEffect(() => {
    setFilteredUsers(search());
  }, [searchConditions.condition]);

  const search = (searchKeyword = searchKeywordRef.current.value) => {
    const {
      searchType,
      condition: { whole, teacher, parents, admin },
    } = searchConditions;

    if (searchKeyword)
      return users.filter((item) => {
        return (
          ((item.authority === 2 && parents) ||
            (item.authority === 1 && teacher) ||
            (item.authority === 0 && admin) ||
            whole) &&
          item[searchType] === searchKeyword
        );
      });
    // 클릭이 아무것도 안되었을 때, 전체로 set
    else {
      //검색어가 입력안된 경우
      return users.filter(
        (item) =>
          (item.authority === 2 && parents) ||
          (item.authority === 1 && teacher) ||
          (item.authority === 0 && admin) ||
          whole
      );
    }
  };

  const handleSearchClick = (searchKeyword) => {
    const searchedUsers = search(searchKeyword);
    setFilteredUsers(searchedUsers);
  };

  return (
    <div>
      {/* <Header /> */}
      {/* <NavigationBar /> */}
      <div>사용자 관리</div>
      <SearchBar
        searchKeywordRef={searchKeywordRef}
        setSearchConditions={setSearchConditions}
        handleSearchClick={handleSearchClick}
      />
      <AuthFilter searchConditions={searchConditions} setSearchConditions={setSearchConditions} />
      <UserDataTable filteredUsers={filteredUsers} />
      <Pagination />
    </div>
  );
};

export default Admin;
