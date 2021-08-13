import React, { useCallback } from "react";
import styled from "styled-components";

const SearchBar = ({ searchKeywordRef, setSearchType, setIsSearch }) => {
  const notifySearchChange = () => setIsSearch((prev) => !prev);

  const handleSearchKind = useCallback((e) => setSearchType(e.target.value), []);

  const onKeyPress = useCallback((e) => {
    if (e.key === "Enter") notifySearchChange();
  }, []);

  const clearSearchKeyword = useCallback(() => {
    searchKeywordRef.current.value = "";
    notifySearchChange();
  }, []);

  return (
    <Wrapper>
      <div className="searchBar">
        <select onChange={handleSearchKind}>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <input
          className="searchInput"
          onKeyPress={onKeyPress}
          placeholder="검색 입력"
          ref={searchKeywordRef}
        />
        <button onClick={clearSearchKeyword}>X</button>
        <button className="searchButton" onClick={notifySearchChange}>
          검색
        </button>
      </div>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  .searchBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 470px;
    padding: 0 10px;
    border: 1px solid ${({ theme }) => theme.color.borderline};
    border-radius: 30px;
    background-color: ${({ theme }) => theme.color.inputBackground};

    & > select {
      background-color: ${({ theme }) => theme.color.inputBackground};
      border: 1px solid ${({ theme }) => theme.color.borderline};
      border-radius: 10px;
    }

    .searchInput {
      height: 50px;
      width: 300px;
      margin: 0 10px;
    }

    button {
      border-radius: 10px;
      background-color: ${({ theme }) => theme.color.button};
      color: ${({ theme }) => theme.color.fontWhite};
    }
  }
`;
