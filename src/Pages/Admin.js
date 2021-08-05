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
import { MODAL_TYPE } from "Utils/constants";
import Modal from "Components/common/Modal/Modal";
import styled from "styled-components";
import { userMockData } from "Utils/MockData";
import { ADMIN } from "Utils/constants";

const Admin = () => {
  const { PAGE_SIZE } = ADMIN;
  const searchKeywordRef = useRef("");
  const [pageNum, setPageNum] = useState(0);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUsers(userMockData);
    setFilteredUsers(users);
  }, [users]);

  const [dividedState, setDividedState] = useState([]);
  const [searchConditions, setSearchConditions] = useState({
    searchType: "name",
    condition: { whole: true, teacher: false, parents: false, admin: false },
  });
  const [isSearch, setIsSearch] = useState(false);
  const [wholePages, setWholePages] = useState(1);

  const handleAuthUpdate = (selectedId, auth) => {
    console.log(auth, "update"); // ! test
    if (auth === -1) return; // ! test부분
    console.log("updating"); // ! test

    const updatedUsers = users.map((user) =>
      user.id === selectedId ? { ...user, authority: auth } : user
    );
    setUsers(updatedUsers); //TODO: updatedUsers를 local로 setItem
    const updateAuthFilteredUsers = filteredUsers.map((user) =>
      user.id === selectedId ? { ...user, authority: auth } : user
    );
    setFilteredUsers(updateAuthFilteredUsers);
  };

  useEffect(() => {
    setUsers(userMockData);
    const paginatedUsers = dividedPageUsers(users) || [];
    setDividedState(paginatedUsers);
    setFilteredUsers(dividedState[pageNum]);
  }, []);

  const dividedPageUsers = (users) => {
    if (!users.length) return [];
    const pageGroupUsers = [];
    for (let i = 0; i < users.length; i += PAGE_SIZE) {
      const pageUsers = users.slice(i, i + PAGE_SIZE);
      pageGroupUsers.push(pageUsers);
    }
    return pageGroupUsers; // [[1,2,3], [3,4,5], [6,7,8]]
  };

  //TODO: Refactor const pipe = (f, g) = (x) => f(g(x))
  useEffect(() => {
    const searchedTotalPages = dividedPageUsers(search()).length;
    setWholePages(searchedTotalPages);
    setFilteredUsers(dividedPageUsers(search())[pageNum] || []);
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
    <AdminWrapper>
      <NavBar category={category.admin} />
      <SearchContainer>
        <ModalBox>
          <CreateAccountButton onClick={() => setIsOpen(!isOpen)}>계정 생성</CreateAccountButton>
          <Modal
            isOpen={isOpen}
            toggleModal={() => setIsOpen(!isOpen)}
            modalType={MODAL_TYPE.account}
          />
        </ModalBox>
        <SearchBar {...{ searchKeywordRef, setSearchConditions, handleSearchClick }} />
      </SearchContainer>
      <AuthFilter {...{ searchConditions, setSearchConditions }} />
      <UserDataTable {...{ filteredUsers, handleAuthUpdate }} />
      <Pagination {...{ pageNum, setPageNum, wholePages }} />
    </AdminWrapper>
  );
};

const AdminWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 66.5%;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(0, -50%);
`;

const CreateAccountButton = styled.button`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  border-radius: 30px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.fontWhite};

  &:hover {
    background-color: ${({ theme }) => theme.color.buttonHover};
  }
`;

export default React.memo(Admin);
