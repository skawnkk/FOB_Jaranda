import React, { useState, useEffect } from "react";
import styled from "styled-components";

const UserDataTable = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    // 사용자 Mock 데이터 가져오기
  }, []);

  return (
    <Wrapper>
      <div className="dataTable">
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <th>pw</th>
              <th>이름</th>
              <th>이메일</th>
              <th>주소</th>
              <th>생년월일</th>
              <th>신용 카드</th>
              <th colSpan="3">권한</th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>1</td>
              <td>alalal</td>
              <td>넝담곰</td>
              <td>1fff</td>
              <td>1sss</td>
              <td>1sss</td>
              <td>1sss</td>

              <td>1sss</td>
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
            <tr>
              <td>1</td>
              <td>alalal</td>
              <td>넝담곰</td>
              <td>1fff</td>
              <td>1sss</td>
              <td>1sss</td>
              <td>1sss</td>

              <td>1sss</td>
              <td>
                <select>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </td>
              <td>
                <button>권한수정</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};
// id pw name email address dateofbirth creditCardnum authority
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
