import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { USERDATA_TEMPLATE, USER_DATA_OBJ } from "Utils/constants";
import { loadLocalStorage, saveLocalStorage } from "Utils/Storage";

const CreateAccount = ({ toggleModal }) => {
  const [userInput, setUserInput] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    // saveLocalStorage("TEST", []);
    setUserInput(USERDATA_TEMPLATE);
    setUserList(loadLocalStorage("TEST"));
  }, []);

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
        // id: autoId(),
        authority: Number(selectValue),
      };
      saveLocalStorage("TEST", [...userList, accountObj]);
    }
    event.target.reset();
    toggleModal();
  };

  return (
    <FormWrapper>
      <FormContainer action="#" onSubmit={userDataSubmit}>
        {INPUT_TITLE_DATA.map((title) => (
          <Input
            key={title.name}
            type={title.type}
            name={title.name}
            onChange={inputUserData}
            placeholder={title.placeholder}
            required={title.required}
          />
        ))}
        <AuthSelect name="authority" onChange={selectAuthority}>
          <option defaultChecked hidden>
            권한을 선택 해 주세요
          </option>
          {USER_DATA_OBJ.map((item) => (
            <option key={item.name} value={item.authLevel}>
              {item.selectName}
            </option>
          ))}
        </AuthSelect>
        <SubmitButton disabled={!selectValue}>생성</SubmitButton>
      </FormContainer>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  border-radius: 4px;
  padding-left: 4px;

  &:focus {
    border-color: ${({ theme }) => theme.color.green};
    box-shadow: ${({ theme }) => theme.color.green} 0 4px 2px -2px;
    transition: box-shadow 0.5s ease-in-out;
  }

  &::placeholder {
    padding-left: 4px;
  }
`;

const AuthSelect = styled.select`
  padding-left: 4px;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  border-radius: 4px;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.6);

  &:focus {
    border-color: ${({ theme }) => theme.color.green};
    outline: none;
  }
`;

const SubmitButton = styled.button`
  margin-top: 15px;
  padding: 7px;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.buttonHover};
  color: ${({ theme }) => theme.color.fontWhite};

  &:disabled {
    background-color: ${({ theme }) => theme.color.button};
  }
`;

const INPUT_TITLE_DATA = [
  {
    type: "email",
    name: "email",
    required: true,
    placeholder: "Email",
  },
  {
    type: "password",
    name: "pw",
    required: true,
    placeholder: "패스워드",
  },
  {
    type: "text",
    name: "name",
    required: true,
    placeholder: "이름",
  },
  {
    type: "text",
    name: "address",
    required: false,
    placeholder: "주소",
  },
  {
    type: "text",
    name: "dateOfBirth",
    required: false,
    placeholder: "생년월일",
  },
  {
    type: "text",
    name: "creditCardNum",
    required: false,
    placeholder: "신용카드 번호",
  },
];

export default CreateAccount;
