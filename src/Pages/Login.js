import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import { ReactComponent as Mail } from "Assets/svg/mail.svg";
import { ReactComponent as ClosedEye } from "Assets/svg/eye_closed.svg";
import { ReactComponent as OpenedEye } from "Assets/svg/eye_opened.svg";
import { loadLocalStorage, saveLocalStorage } from "Utils/Storage";
import { USER_STORAGE, LOGGEDIN_USER } from "Utils/constants";
import { compareSync } from "Utils/bcrypt";
import { isEmail } from "Utils/validator";

const Login = () => {
  const userData = loadLocalStorage(LOGGEDIN_USER);
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    pw: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    pw: false,
  });
  const [passwordHide, setPasswordHide] = useState(true);
  const [unknownUser, setUnknownUser] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validator = {
    email: (email) => isEmail(email),
    pw: (pw) => pw.length,
  };

  const isAllValid = (form) => {
    for (const name in form) {
      const value = form[name];
      const validateFunction = validator[name];
      if (!validateFunction(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: true,
        }));
        return false;
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAllValid(formData)) {
      const userData = loadLocalStorage(USER_STORAGE);
      if (!userData) return setUnknownUser(true);

      const existUser = userData.find(
        (user) => user.email === formData.email && compareSync(formData.pw, user.pw)
      );
      if (!existUser) return setUnknownUser(true);

      saveLocalStorage(LOGGEDIN_USER, existUser);
      setUnknownUser(false);
      history.push("/");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <h4>로그인</h4>
        <Input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="이메일을 입력하세요"
          icon={<Mail />}
          error={errors.email}
          errorMessage="이메일을 다시 확인해 주세요."
        />
        <Input
          type={passwordHide ? "password" : "text"}
          name="pw"
          value={formData.pw}
          onChange={onChangeHandler}
          placeholder="비밀번호를 입력하세요"
          icon={
            passwordHide ? (
              <ClosedEye onClick={() => setPasswordHide(!passwordHide)} />
            ) : (
              <OpenedEye onClick={() => setPasswordHide(!passwordHide)} />
            )
          }
          error={errors.pw}
          errorMessage="비밀번호를 다시 입력해 주세요"
        />
        {unknownUser && <p>로그인 또는 패스워드를 다시 확인해주세요</p>}
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
  h4 {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 500;
  }
  ${({ theme }) => theme.flexSet("space-between", "center", "column")}
  width: 450px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.borderline};

  p {
    color: ${({ theme }) => theme.color.red};
    font-weight: 600;
  }

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
