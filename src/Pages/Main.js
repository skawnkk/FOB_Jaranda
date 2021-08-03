import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { USERDATA_TEMPLATE, USER_DATA_ARR } from "../Utils/constants";

const Main = () => {
  const [userInput, setUserInput] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  console.log(userInput);
  useEffect(() => {
    localStorage.setItem("TEST", JSON.stringify([]));
    setUserInput(USERDATA_TEMPLATE);
    setUserList(JSON.parse(localStorage.getItem("TEST")));
  }, []);

  useEffect(() => {
    localStorage.setItem("TEST", JSON.stringify(userList));
    setUserInput(USERDATA_TEMPLATE);
    setSelectValue("");
  }, [userList]);

  const inputUserData = (event) => {
    const {
      target: { value, name },
    } = event;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const selectAuthority = (event) => {
    const {
      target: { value },
    } = event;
    if (value) {
      setSelectValue(value);
    }
  };

  const userDataSubmit = (event) => {
    event.preventDefault();
    if (selectValue) {
      const accountObj = {
        ...userInput,
        authority: Number(selectValue),
      };
      setUserList(userList.concat(accountObj));
    }
    event.target.reset();
  };

  return (
    <div>
      <div>
        {userList &&
          userList.map((list, index) => (
            <UserInputTable key={index}>
              <InputedItem>{list.id}</InputedItem>
              <InputedItem>{list.pw}</InputedItem>
              <InputedItem>{list.name}</InputedItem>
              <InputedItem>{list.email}</InputedItem>
              <InputedItem>{list.address}</InputedItem>
              <InputedItem>{list.dateOfBirth}</InputedItem>
              <InputedItem>{list.creditCardNum}</InputedItem>
              <InputedItem>{USER_DATA_ARR[list.authority]}</InputedItem>
            </UserInputTable>
          ))}
      </div>
      <form action="#" onSubmit={userDataSubmit}>
        {INPUT_TITLE_DATA.map((title) => (
          <Input
            key={title.name}
            type={title.type}
            name={title.name}
            onChange={inputUserData}
            placeholder={title.name}
            required={title.required}
          />
        ))}
        <select name="authority" onChange={selectAuthority}>
          <option defaultChecked hidden>
            select
          </option>
          {USER_DATA_ARR.map((item, index) => (
            <option key={item} value={index}>
              {item}
            </option>
          ))}
        </select>
        <button disabled={!selectValue}>생성</button>
      </form>
    </div>
  );
};

const Input = styled.input`
  border: 1px solid black;
`;

const UserInputTable = styled.div`
  display: flex;
`;

const InputedItem = styled.div`
  width: 151px;
  text-align: left;
  border: 1px solid black;
`;

const INPUT_TITLE_DATA = [
  {
    type: "text",
    name: "id",
    required: true,
  },
  {
    type: "password",
    name: "pw",
    required: true,
  },
  {
    type: "text",
    name: "name",
    required: true,
  },
  {
    type: "email",
    name: "email",
    required: true,
  },
  {
    type: "text",
    name: "address",
    required: false,
  },
  {
    type: "text",
    name: "dateOfBirth",
    required: false,
  },
  {
    type: "text",
    name: "creditCardNum",
    required: false,
  },
];

export default Main;
