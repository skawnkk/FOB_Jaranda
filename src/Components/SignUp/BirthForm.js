import React from "react";
import Input from "Components/common/Input";
import { Calendar } from "Assets/svg";
export const BirthForm = ({ value, error, handleSetFormData }) => {
  const handleBirthDate = (e) => {
    const { name, value } = e.target;
    handleSetFormData(name, value);
  };
  return (
    <Input
      name="dateOfBirth"
      value={value}
      onChange={handleBirthDate}
      placeholder="생년월일 6자리를 입력하세요"
      icon={<Calendar />}
      error={error}
      maxLength={6}
      errorMessage="생년월일을 다시 입력해 주세요"
    />
  );
};
