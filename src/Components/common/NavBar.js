import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CATEGORY } from "Utils/constants";
import { userAuthority } from "Utils/Storage";

const NavBar = () => {
  const userAuth = userAuthority("TEST");

  const checkAuthMenu = (userAuth) => {
    switch (userAuth) {
      case 0:
        return CATEGORY.admin;
      case 1:
        return CATEGORY.teacher;
      case 2:
        return CATEGORY.parent;
      case null:
        return CATEGORY.allUser;
    }
  };

  return (
    <Wrapper>
      <ul>
        {checkAuthMenu(userAuth).map((item, i) => (
          <li key={i}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  margin-top: 20px;
  padding: 10px 100px;

  > ul {
    padding: 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.color.green};

    li {
      display: inline-block;
      color: ${({ theme }) => theme.color.fontWhite};
    }

    li + li {
      margin-left: 50px;
    }
  }
`;

export default NavBar;
