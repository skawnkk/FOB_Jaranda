import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import UserDataTable from "Components/Admin/UserDataTable/UserDataTable";
import Pagination from "Components/Admin/Pagination/Pagination";
import Modal from "Components/common/Modal/Modal";
import CreateAccount from "Components/Admin/CreateAccount/CreateAccount";
import { loadLocalStorage, saveLocalStorage } from "Utils/Storage";
import { ADMIN, USER_STORAGE } from "Utils/constants";

const Admin = () => {
  const { PAGE_SIZE } = ADMIN;
  const searchKeywordRef = useRef("");
  const [pageNum, setPageNum] = useState(0);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isAddAccount, setAddAccount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wholePages, setWholePages] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [searchType, setSearchType] = useState("name");
  const [filterType, setFilterType] = useState({
    whole: true,
    teacher: false,
    parents: false,
    admin: false,
  });
  const { whole, teacher, parents, admin } = filterType;

  const handleAuthUpdate = (selectedId, auth) => {
    if (auth === -1) return;
    const updateUserInfo = (users) =>
      users.map((user) => (user.id === selectedId ? { ...user, authority: auth } : user));

    //원본데이터 로컬수정
    setUsers(updateUserInfo(users));
    saveLocalStorage(USER_STORAGE, users);

    //보여지는 뷰만 수정
    setFilteredUsers(updateUserInfo(filteredUsers));
  };

  //페이지 초기로딩 & 계정생성시
  useEffect(() => setUsers(loadLocalStorage(USER_STORAGE)), [isAddAccount]);
  useEffect(() => setPageNum(0), [filterType, isSearch]);

  const dividedPageUsers = (users) => {
    if (!users.length) return [];
    const pageGroupUsers = [];
    for (let i = 0; i < users.length; i += PAGE_SIZE) {
      const pageUsers = users.slice(i, i + PAGE_SIZE);
      pageGroupUsers.push(pageUsers);
    }
    return pageGroupUsers;
  };

  useEffect(() => {
    const searchedTotalPages = dividedPageUsers(search());
    setWholePages(searchedTotalPages.length);
    setFilteredUsers(searchedTotalPages[pageNum] || []);
  }, [users, filterType, pageNum, isSearch]);

  const isSameAuth = (item) =>
    (item.authority === 2 && parents) ||
    (item.authority === 1 && teacher) ||
    (item.authority === 0 && admin) ||
    whole;

  const search = (searchKeyword = searchKeywordRef.current.value) => {
    if (searchKeyword)
      return users.filter((item) => isSameAuth(item) && item[searchType] === searchKeyword);
    return users.filter((item) => isSameAuth(item));
  };

  const handleModal = () => setIsOpen(!isOpen);

  return (
    <AdminWrapper>
      <SearchContainer>
        <CreateAccountButton onClick={handleModal}>계정 생성</CreateAccountButton>
        <SearchBar {...{ searchKeywordRef, setSearchType, setIsSearch }} />
      </SearchContainer>
      <AuthFilter {...{ filterType, setFilterType }} />
      <UserDataTable {...{ filteredUsers, handleAuthUpdate }} />
      <Pagination {...{ pageNum, setPageNum, wholePages }} />

      <Modal isOpen={isOpen} toggleModal={handleModal}>
        <CreateAccount setAddAccount={setAddAccount} toggleModal={handleModal} />
      </Modal>
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
  margin: 30px;
  width: 66.5%;
`;

const CreateAccountButton = styled.button`
  position: absolute;
  top: 8px;
  right: 11px;
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
