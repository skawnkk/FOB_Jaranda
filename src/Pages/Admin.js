// import React from "react";
// import { userAuthority } from "../Utils/Storage";

// const Admin = () => {
//   const isAdmin = userAuthority();
//   return !isAdmin && <div>Admin now</div>;
import React, { useState, useEffect, useRef } from "react";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import UserDataTable from "Components/Admin/UserDataTable/UserDataTable";
import Pagination from "Components/Admin/Pagination/Pagination";
import NavBar from "Components/common/NavBar";
import { userMockData } from "Utils/MockData";

//TODO: 상수 관리
export const PAGE_SIZE = 3;

const Admin = () => {
  const searchKeywordRef = useRef("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [dividedState, setDividedState] = useState([]);
  const [searchConditions, setSearchConditions] = useState({
    searchType: "name",
    condition: { whole: true, teacher: false, parents: false, admin: false },
  });
  const [isSearch, setIsSearch] = useState(false);
  const [wholePages, setWholePages] = useState(1);

  useEffect(() => {
    setUsers(userMockData);
    const paginatedUsers = dividPageUsers(users) || [];
    setDividedState(paginatedUsers);
    setFilteredUsers(dividedState[pageNum]);
  }, [users]);

  const dividPageUsers = (users) => {
    const pageGroupUsers = [];
    for (let i = 0; i < users.length; i += PAGE_SIZE) {
      const pageUsers = users.slice(i, i + PAGE_SIZE);
      pageGroupUsers.push(pageUsers);
    }
    return pageGroupUsers; // [[1,2,3], [3,4,5],[6,7,8]]
  };

  //TODO: Refactor const pipe = (f, g) = (x) => f(g(x))
  useEffect(() => {
    const searchedTotalPages = dividPageUsers(search()).length;
    setWholePages(searchedTotalPages);
    setFilteredUsers(dividPageUsers(search())[pageNum] || []);
  }, [searchConditions.condition, pageNum, wholePages, isSearch]);

  useEffect(() => setPageNum(0), [searchConditions.condition, isSearch]);

  const search = (searchKeyword = searchKeywordRef.current.value) => {
    const {
      searchType,
      condition: { whole, teacher, parents, admin },
    } = searchConditions;

    if (searchKeyword)
      return users.filter(
        (item) =>
          ((item.authority === 2 && parents) ||
            (item.authority === 1 && teacher) ||
            (item.authority === 0 && admin) ||
            whole) &&
          item[searchType] === searchKeyword
      );
    return users.filter(
      (item) =>
        (item.authority === 2 && parents) ||
        (item.authority === 1 && teacher) ||
        (item.authority === 0 && admin) ||
        whole
    );
  };

  const handleSearchClick = (searchKeyword) => setIsSearch((prev) => !prev);

  const category = {
    admin: ["이용 안내", "사용자 관리"],
    teacher: ["이용 안내", "학생 관리", "학생 소개받기"],
    parent: ["이용 안내", "우리 아이 관리", "자란다 선생님 찾기"],
  };

  return (
    <>
      <NavBar category={category.admin} />
      <SearchBar {...{ searchKeywordRef, setSearchConditions, handleSearchClick }} />
      <AuthFilter {...{ searchConditions, setSearchConditions }} />
      <UserDataTable filteredUsers={filteredUsers} />
      <Pagination {...{ pageNum, setPageNum, wholePages }} />
    </>
  );
};

export default Admin;
