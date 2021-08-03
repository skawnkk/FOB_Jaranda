import React from "react";
import styled from "styled-components";

const UserDataTable = ({ users }) => {
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
            {users.map(
              ({ id, name, email, pw, address, dateOfBirth, creditCardNum, authority }) => (
                <tr>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{pw}</td>
                  <td>{address}</td>
                  <td>{dateOfBirth}</td>
                  <td>{creditCardNum}</td>
                  <td>{authority}</td>
                  <td>
                    <select>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </td>
                  <td>
                    <button>권한수정</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default UserDataTable;

const Wrapper = styled.div`
  table {
    margin: 0 auto;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.color.borderline};
    border-collapse: collapse;
  }
`;
