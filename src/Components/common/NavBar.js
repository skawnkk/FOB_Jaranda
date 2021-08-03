import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = ({ category }) => {
  return (
    <Wrapper>
      <nav>
        <ul>
          {category.map((item, i) => (
            <li key={i}>
              <Link to="/admin">{item}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 100px;

  > nav {
    ul {
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
  }
`;

export default NavBar;
