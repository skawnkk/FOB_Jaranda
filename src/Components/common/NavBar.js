import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = ({ category }) => {
  return (
    <Wrapper>
      <ul>
        {category.map((item, i) => (
          <li key={i}>
            <Link to="/admin">{item}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
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
