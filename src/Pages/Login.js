import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Input from "Components/common/Input";
import { ReactComponent as Mail } from "Assets/svg/mail.svg";
import { ReactComponent as ClosedEye } from "Assets/svg/eye_closed.svg";

const Login = () => {
  const [validate, setValidate] = useState(false);
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
    setValidate(true);
    //* email, password validation 성공하면 false로 수정
    // setValidate(false);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일을 입력하세요"
          icon={<Mail />}
          error={validate && !email}
          errorMessage="이메일을 입력하세요"
        />

        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호를 입력하세요"
          icon={<ClosedEye />}
          error={validate && !password}
          errorMessage="비밀번호를 입력하세요"
        />

        <button
          type="submit"
          style={{ height: "50px", backgroundColor: "#78e08f", width: "100%", color: "white" }}>
          로그인
        </button>
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
