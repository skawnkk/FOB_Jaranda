import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const UserButton = (props) => {
  const isLoggedIn = props.LoggedUser;

  return <div>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>;
};

export default UserButton;
