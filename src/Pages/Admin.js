import React, { useState, useEffect, useRef } from "react";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import UserDataTable from "Components/Admin/UserDataTable/UserDataTable";
import Pagination from "Components/Admin/Pagination/Pagination";
import { MODAL_TYPE } from "Utils/constants";
import Modal from "Components/common/Modal/Modal";
import CreateAccount from "Components/Admin/CreateAccount/CreateAccount";
import styled from "styled-components";
import { userMockData } from "Utils/MockData";
import { ADMIN, USER_STORAGE } from "Utils/constants";
import { loadLocalStorage, saveLocalStorage } from "Utils/Storage";

const Admin = () => {
  const { PAGE_SIZE } = ADMIN;
  const searchKeywordRef = useRef("");
  const [pageNum, setPageNum] = useState(0);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  // 회원가입후 가입된 사람 검색했을 때 안나오는 이슈 , 관리자페이지에서 계정생성후 검색안됨
  // useEffect(() => {
  //   //userMockData
  //   setUsers(userMockData);
  //   setFilteredUsers(users);
  // }, [users]);

  const [dividedState, setDividedState] = useState([]);
  const [searchConditions, setSearchConditions] = useState({
    searchType: "name",
    condition: { whole: true, teacher: false, parents: false, admin: false },
  });
  const {
    searchType,
    condition: { whole, teacher, parents, admin },
  } = searchConditions;

  const [isSearch, setIsSearch] = useState(false);
  const [wholePages, setWholePages] = useState(1);

  const handleAuthUpdate = (selectedId, auth) => {
    if (auth === -1) return;

    const updatedUsers = users.map((user) =>
      user.id === selectedId ? { ...user, authority: auth } : user
    );
    setUsers(updatedUsers);
    saveLocalStorage(USER_STORAGE, updatedUsers);

    const updateAuthFilteredUsers = filteredUsers.map((user) =>
      user.id === selectedId ? { ...user, authority: auth } : user
    );
    setFilteredUsers(updateAuthFilteredUsers);
  };

  /*
  ! 원랜없는 로직 TEST용
  * localStoage에 유저데이터가 없으면 mockData불러오기, 아니면 localStorage그대로 사용하기
  */

  useEffect(() => {
    setUsers(loadLocalStorage(USER_STORAGE)); //isCreated가되면 불러올 친구
    const dividedUsers = dividedPageUsers(search());
    setWholePages(dividedUsers.length);
    setFilteredUsers(dividedUsers[pageNum] || []);
    console.log("isCreated!");
    // setUsers(loadLocalStorage(USER_STORAGE)); //isCreated가되면 불러올 친구
    // const paginatedUsers = dividedPageUsers(users) || []; //users에서 쪼개진 친구
    // setDividedState(paginatedUsers);
    // setFilteredUsers(dividedState[pageNum]);
  }, [isCreateAccount]);

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

  const handleSearchClick = () => setIsSearch((prev) => !prev);

  return (
    <AdminWrapper>
      <Modal isOpen={isOpen} toggleModal={() => setIsOpen(!isOpen)}>
        <CreateAccount setIsCreateAccount={setIsCreateAccount} />
      </Modal>
      <SearchContainer>
        <CreateAccountButton onClick={() => setIsOpen(!isOpen)}>계정 생성</CreateAccountButton>
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
