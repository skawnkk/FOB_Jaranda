import React, { useState } from "react";
import AuthSelector from "Components/Admin/UserDataTable/AuthSelector";
import { ADMIN } from "Utils/constants";
import styled from "styled-components";
export const UserDataLine = ({ filteredUsers, handleAuthUpdate }) => {
  const {
    authTitle: { choice, admin, teacher, parents },
  } = ADMIN;
  const authTitle = [choice, admin, teacher, parents];
  const [choicedAuth, setChoicedAuth] = useState(-1);

  const handleOptionChange = (auth) => {
    console.log(auth);
    if (auth === -1) return;
    setChoicedAuth(auth);
  };

  return filteredUsers.length > 0 ? (
    filteredUsers.map(({ id, name, email, pw, address, dateOfBirth, creditCardNum, authority }) => {
      const authType = authTitle.slice(1)[authority];
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{pw}</td>
          <td>{address}</td>
          <td>{dateOfBirth}</td>
          <td>{creditCardNum}</td>
          <td>{authType}</td>
          <td>
            <AuthSelector handleOptionChange={handleOptionChange} authTitle={authTitle} />
          </td>
          <td>
            <button type="button" onClick={() => handleAuthUpdate(id, choicedAuth)}>
              수정
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <EmptyData>
      <td colSpan="8">일치하는 데이터가 없습니다. 🤢</td>
    </EmptyData>
  );
};

export default UserDataLine;

const EmptyData = styled.tr`
  height: 50px;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  td {
    text-align: center;
    padding-top: 20px;
  }
`;
