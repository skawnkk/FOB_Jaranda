import React from "react";
import Input from "Components/common/Input";
import { Person } from "Assets/svg";
export const NameForm = ({ value, handleSetFormData, error }) => {
  const handleNameInput = (e) => {
    const { name, value } = e.target;
    handleSetFormData(name, value);
  };
  return (
    <Input
      name="name"
      value={value}
      onChange={handleNameInput}
      placeholder="이름을 입력하세요"
      icon={<Person />}
      error={error}
      errorMessage="이름을 입력해 주세요"
    />
  );
};
