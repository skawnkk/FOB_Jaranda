import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import { ReactComponent as Mail } from "Assets/svg/mail.svg";
import { ReactComponent as ClosedEye } from "Assets/svg/eye_closed.svg";
import { loadLocalStorage } from "Utils/Storage";
import { USER_STORAGE } from "Utils/constants";

import bcrypt from "bcryptjs";

const Login = () => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    pw: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    id: { error: false, message: "" },
    email: { error: false, message: "" },
    pw: { error: false, message: "" },
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onChangeErrorMsgHandler = (key, message) => {
    setErrorMsg({
      ...formData,
      [key]: { error: true, message },
    });
  };

  const isEmail = (checkString) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(checkString);
  };

  const validateCheck = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, pw } = loadLocalStorage(USER_STORAGE);
    const isPasswordMatched = bcrypt.compareSync(formData.pw, pw);
    console.log(isPasswordMatched);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="이메일을 입력하세요"
          icon={<Mail />}
          error={errorMsg.email.error}
          errorMessage={errorMsg.email.message}
        />

        <Input
          type="password"
          name="pw"
          value={formData.pw}
          onChange={onChangeHandler}
          placeholder="비밀번호를 입력하세요"
          icon={<ClosedEye />}
          error={errorMsg.pw.error}
          errorMessage={errorMsg.pw.message}
        />

        <Button type="submit" value="로그인" marginTop="10px" />
      </Form>
      <NavLink to="/signup">
        <p>
          자란다 계정이 없으신가요? <span>회원가입</span>
        </p>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")}
  width: 100%;
  height: calc(100% - 72px);
  background-color: ${({ theme }) => theme.color.fontWhite};
`;

const Form = styled.form`
  ${({ theme }) => theme.flexSet("space-between", "center", "column")}
  width: 450px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.borderline};

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 0;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.color.fontGray};
  margin-top: 20px;
  p {
    color: ${({ theme }) => theme.color.fontGray};

    span {
      color: ${({ theme }) => theme.color.green};
      margin-left: 10px;
      font-weight: 600;
      text-decoration: underline;
    }
  }
`;

export default Login;
