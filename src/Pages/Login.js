import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Input from "Components/common/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("aa");
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일을 입력하세요"
          error={email.length ? true : false}
          errorMessage="이메일을 입력하세요"
        />

        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호를 입력하세요"
          error={password === "123" ? true : false}
          errorMessage="비밀번호를 입력하세요"
        />

        <button
          type="submit"
          style={{ height: "50px", backgroundColor: "#78e08f", width: "100%", color: "white" }}>
          로그인
        </button>
      </Form>
      <NavLink to="/signup">
        자란다 계정이 없으신가요? <span>회원가입</span>
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

  span {
    color: ${({ theme }) => theme.color.green};
    margin-left: 10px;
    font-weight: 600;
    text-decoration: underline;
  }
`;

export default Login;
