import React, { useState } from "react";
import Input from "Components/common/Input";
import { ClosedEye, OpenedEye, Check } from "Assets/svg";
import { validator } from "Utils/validator";
import styled from "styled-components";

export const PasswordForm = ({
  pw,
  pwCheck,
  handleSetFormData,
  setPasswordCheckError,
  pwError,
  pwCheckError,
}) => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [passwordError, setPasswordError] = useState({
    pwNumber: false,
    pwEnglish: false,
    pwSpecialCharacter: false,
    pwLength: false,
  });
  const { pwNumber, pwEnglish, pwSpecialCharacter, pwLength } = passwordError;

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    handleSetFormData(name, value);
    setPasswordError({
      ...passwordError,
      pwEnglish: validator.pwEnglish(value),
      pwNumber: validator.pwNumber(value),
      pwSpecialCharacter: validator.pwSpecialCharacter(value),
      pwLength: validator.pwLength(value),
    });
  };

  const handlePasswordCheckChange = (e) => {
    const { name, value } = e.target;
    handleSetFormData(name, value);
    setPasswordCheckError(value !== pw);
  };

  const toggleEyes = () => setVisiblePassword((visible) => !visible);
  const handleVisible = visiblePassword ? "password" : "text";
  const handleIcon = visiblePassword ? (
    <ClosedEye onClick={toggleEyes} />
  ) : (
    <OpenedEye onClick={toggleEyes} />
  );

  const checkLists = [
    { type: "숫자", check: pwNumber },
    { type: "특수문자", check: pwSpecialCharacter },
    { type: "영문", check: pwEnglish },
    { type: "8자리 이상", check: pwLength },
  ];
  return (
    <>
      <Input
        name="pw"
        value={pw}
        onChange={handlePasswordChange}
        placeholder="비밀번호를 입력하세요"
        type={handleVisible}
        icon={handleIcon}
        error={pwError}
        errorMessage="비밀번호를 다시 입력해 주세요"
      />

      <PasswordPolicy>
        {checkLists.map((checkList) => (
          <PasswordCheck check={checkList.check}>
            <Check />
            {checkList.type}
          </PasswordCheck>
        ))}
      </PasswordPolicy>

      <Input
        name="pwCheck"
        value={pwCheck}
        onChange={handlePasswordCheckChange}
        placeholder="비밀번호를 다시 입력하세요"
        type={handleVisible}
        icon={handleIcon}
        error={pwCheckError}
        errorMessage="비밀번호를 다시 입력해 주세요"
      />
    </>
  );
};

const PasswordPolicy = styled.div`
  ${({ theme }) => theme.flexSet("space-around")};
`;

const PasswordCheck = styled.div`
  &::before {
    display: inline-block;
    background: url(${Check});
    content: "";
    width: 20px;
    height: 16px;
  }
  text-align: center;
  font-size: 15px;
  color: ${(props) => (props.check ? props.theme.color.green : props.theme.color.borderline)};
  font-weight: ${(props) => props.check && 600};
`;
