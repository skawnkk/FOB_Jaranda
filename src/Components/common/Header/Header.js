import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { LOGGEDIN_USER } from "Utils/constants";
import { loadLocalStorage } from "Utils/Storage";
import logo from "Assets/img/logo.png";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [logged, setLogged] = useState(false);
  // const [userData, setUserData] = useState(loadLocalStorage(LOGGEDIN_USER));
  const userData = loadLocalStorage(LOGGEDIN_USER);

  useEffect(() => {
    userData ? setLogged(true) : setLogged(false);
  }, [userData]);

  return (
    <Wrapper>
      <Link to="/">
        <h1>
          <img src={logo} alt="자란다 로고" />
        </h1>
      </Link>
      {/* <UserButton LoggedUser={logged} /> */}
      {logged ? <LogoutButton /> : <LoginButton />}
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
