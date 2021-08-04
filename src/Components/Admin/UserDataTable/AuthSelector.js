import React, { useState } from "react";
import { ADMIN } from "Utils/constants";

const AuthSelector = ({ handleOptionChange, userId }) => {
  const {
    authTitle: { choice, admin, teacher, parents },
  } = ADMIN;
  const authTitle = [choice, admin, parents, teacher];
  const [seletedAuth, setSeletedAuth] = useState(-1);

  const handleAuthChange = (e) => {
    setSeletedAuth(e.target.value);
    handleOptionChange(authTitle.indexOf(e.target.value) - 1);
  };
  return (
    <>
      <select value={seletedAuth} onChange={handleAuthChange}>
        {authTitle.map((auth) => (
          <option selected={auth === choice}>{auth}</option>
        ))}
      </select>
    </>
  );
};

export default React.memo(AuthSelector);
