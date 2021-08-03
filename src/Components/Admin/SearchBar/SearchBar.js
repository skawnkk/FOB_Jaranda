import React, { useRef } from "react";
import styled from "styled-components";

const SearchBar = () => {
  const handleSearchClick = () => {
    //console.log(searchKeyword.current.value);
  };
  const handleSearchKind = (e) => {
    // console.log(e.target.value);
  };
  const searchKeyword = useRef("");

  return (
    <Wrapper>
      <div className="searchBar">
        <select onChange={handleSearchKind}>
          <option value="email">Email</option>
          <option value="name">Name</option>
        </select>
        <input className="searchInput" placeholder="검색 입력" ref={searchKeyword}></input>
        <button className="searchButton" onClick={handleSearchClick}>
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
    min-width: 470px;
    justify-content: space-between;
    align-items: center;
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
