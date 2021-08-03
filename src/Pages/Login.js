import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import { ReactComponent as Mail } from "Assets/svg/mail.svg";
import { ReactComponent as ClosedEye } from "Assets/svg/eye_closed.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: { error: false, message: null },
    password: { error: false, message: null },
  });

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const isEmail = (checkString) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(checkString);
  };

  const validateCheck = () => {
    if (!email || !isEmail(email)) {
      setErrors({
        ...errors,
        email: { error: true, message: "이메일을 다시 확인해주세요" },
      });
    }

    if (!password) {
      setErrors({
        ...errors,
        password: { error: true, message: "패스워드를 다시 확인해주세요" },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateCheck();
    //*로컬스토리지에서 id, pw 일치하는 사람 있는지
    //if
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일을 입력하세요"
          icon={<Mail />}
          error={errors.email.error}
          errorMessage={errors.email.message}
        />

        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호를 입력하세요"
          icon={<ClosedEye />}
          error={errors.password.error}
          errorMessage={errors.password.message}
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
