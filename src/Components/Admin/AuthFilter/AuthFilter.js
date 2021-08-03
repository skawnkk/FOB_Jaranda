import React, { useState } from "react";
import styled from "styled-components";

const AuthFilter = () => {
  const [authFilters, setAuthFilters] = useState([
    { type: "전체", isChecked: false },
    { type: "선생님", isChecked: false },
    { type: "부모님", isChecked: false },
    { type: "관리자", isChecked: false },
  ]);

  const changeFilter = (targetType) => {
    let updateAuthFilters;
    if (targetType === "전체") {
      updateAuthFilters = authFilters.map((filter) =>
        filter.type === targetType
          ? { ...filter, isChecked: true }
          : { ...filter, isChecked: false }
      );
    } else {
      updateAuthFilters = authFilters.map((filter) => {
        if (filter.type === "전체") return { ...filter, isChecked: false };
        return filter.type === targetType ? { ...filter, isChecked: !filter.isChecked } : filter;
      });
    }
    setAuthFilters(updateAuthFilters);
  };

  const handleAuthFilter = (e) => {
    const targetType = e.target.value;
    changeFilter(targetType);
  };

  return (
    <Wrapper>
      {authFilters.map((filter, idx) => (
        <label key={idx}>
          <input
            type="checkbox"
            id={idx}
            onChange={handleAuthFilter}
            value={filter.type}
            checked={filter.isChecked}
          />
          <span>{filter.type}</span>
        </label>
      ))}
    </Wrapper>
  );
};

export default AuthFilter;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 10px 0;

  label {
    margin-right: 10px;

    span {
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
  }
`;
