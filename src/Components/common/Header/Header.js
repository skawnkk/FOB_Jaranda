import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserButton from "./UserButton";
import logo from "Assets/img/logo.png";

const Header = () => {
  return (
    <Wrapper>
      <Link to="/">
        <h1>
          <img src={logo} alt="자란다 로고" />
        </h1>
      </Link>
      <UserButton LoggedUser={false} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("space-between")}
  background-color: ${({ theme }) => theme.color.background};
  padding: 10px 100px;
  box-shadow: rgba(0, 0, 0, 0.08) 0 4px 2px -2px;
`;

export default Header;
