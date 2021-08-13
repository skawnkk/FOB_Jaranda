import React, { useState } from "react";
import styled from "styled-components";
import Button from "Components/common/Button";
import Input from "Components/common/Input";
import { Mail } from "Assets/svg";
import { validator } from "Utils/validator";
import { USER_STORAGE, SIGNUP_EMAIL_STATUS } from "Utils/constants";
import { loadLocalStorage } from "Utils/Storage";
const EmailForms = ({
  value,
  onChange,
  errors,
  setErrors,
  emailDuplicateStatus,
  setEmailDuplicateStatus,
  emailDuplicateChecked,
  setEmailDuplicateChecked,
}) => {
  const { invalidType, unConfirmed, confirmedFailure, confirmedSuccess } = SIGNUP_EMAIL_STATUS;

  const handleClickDuplicateCheck = () => {
    setEmailDuplicateChecked(true);
    //이메일 형식 체크
    if (!validator.email(value)) {
      setErrors({ ...errors, email: true });
      setEmailDuplicateStatus(invalidType);
      return;
    }
    //중복 체크
    const userData = loadLocalStorage(USER_STORAGE);
    const searchSameEmail = userData.filter((user) => user.email === value);
    if (searchSameEmail.length) {
      setErrors({ ...errors, email: true });
      setEmailDuplicateStatus(confirmedFailure);
    } else {
      setErrors({ ...errors, email: false });
      setEmailDuplicateStatus(confirmedSuccess);
    }
  };

  const getEmailStatusMessage = (status) => {
    let message = errors.email ? "이메일을 입력하세요" : "";
    if (status === invalidType) message = "이메일 형식을 확인해주세요";
    else if (status === unConfirmed) message = "중복 검사를 진행해주세요";
    else if (status === confirmedFailure) message = "중복된 이메일 입니다.";
    return message;
  };

  return (
    <EmailWrapper>
      <Input
        name="email"
        value={value}
        onChange={onChange}
        error={errors}
        placeholder="이메일을 입력하세요"
        errorMessage={getEmailStatusMessage(emailDuplicateStatus)}
        successMessage={emailDuplicateChecked && "사용 가능한 이메일 입니다"}
        width="75%"
        icon={<Mail />}
      />
      <Button value="중복확인" width="20%" onClick={handleClickDuplicateCheck} />
    </EmailWrapper>
  );
};

export default EmailForms;

const EmailWrapper = styled.div`
  ${({ theme }) => theme.flexSet("space-between")};
`;
