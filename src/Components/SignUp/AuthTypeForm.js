import React from "react";
import Radio from "Components/common/Radio";
import { AUTH_LEVEL } from "Utils/constants";

const AuthTypeForm = ({ value, onChange, errors = false }) => {
  const AuthTypes = [
    { value: AUTH_LEVEL.teacher, label: "선생님" },
    { value: AUTH_LEVEL.parent, label: "부모님" },
  ];

  return (
    <Radio
      name="authority"
      value={value}
      onChange={onChange}
      data={AuthTypes}
      error={errors}
      errorMessage="원하시는 계정 유형을 선택해 주세요."
    />
  );
};
export default AuthTypeForm;
