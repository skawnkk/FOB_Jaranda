import React from "react";
import styled from "styled-components";
import UserDataLine from "./UserDataLine";

const UserDataTable = ({ filteredUsers, handleAuthUpdate }) => {
  return (
    <Wrapper>
      <div className="dataTable">
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <th>이름</th>
              <th>이메일</th>
              <th>pw</th>
              <th>주소</th>
              <th>생년월일</th>
              <th>신용 카드</th>
              <th colSpan="3">권한</th>
            </tr>
            <UserDataLine {...{ filteredUsers, handleAuthUpdate }} />
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default React.memo(UserDataTable);

const Wrapper = styled.div`
  table {
    margin: 0 auto;
    min-width: 1100px;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.color.borderline};
    font-size: 12px;
    padding: 5px;
  }

  tr:nth-child(odd) {
    background-color: rgba(135, 191, 68, 0.3);
  }

  tr:first-child {
    background-color: rgba(0, 0, 0, 0.2);
  }

  button {
    border: 1px solid ${({ theme }) => theme.color.borderline};
  }
`;
