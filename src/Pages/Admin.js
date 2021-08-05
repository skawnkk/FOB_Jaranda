import React, { useState, useEffect, useRef } from "react";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import UserDataTable from "Components/Admin/UserDataTable/UserDataTable";
import Pagination from "Components/Admin/Pagination/Pagination";
import { userMockData } from "Utils/MockData";
import NavBar from "Components/common/NavBar";

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

  // const category = {
  //   admin: ["이용 안내", "사용자 관리"],
  //   teacher: ["이용 안내", "학생 관리", "학생 소개받기"],
  //   parent: ["이용 안내", "우리 아이 관리", "자란다 선생님 찾기"],
  // };

  return (
    <div>
      {/* <Header /> */}
      {/* 권한 별 카테고리 props 다르게 넘겨주어야 함! */}
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
