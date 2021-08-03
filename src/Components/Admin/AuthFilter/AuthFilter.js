import React, { useState } from "react";
import styled from "styled-components";

const AuthFilter = ({ searchConditions, setSearchConditions }) => {
  const { searchType, condition } = searchConditions;

  const authFilters = [
    { type: "전체", key: "whole" },
    { type: "관리자", key: "admin" },
    { type: "선생님", key: "teacher" },
    { type: "부모님", key: "parents" },
  ];

  const changeFilter = (targetType) => {
    return targetType === "whole"
      ? // 전체 선택 클릭했을 때 나머지 false
        {
          searchType: searchType,
          condition: { whole: true, teacher: false, parents: false, admin: false },
        }
      : // 나머지를 클릭했을때 전체 선택 false 클릭대상 true
        {
          searchType: searchType,
          condition: {
            ...condition,
            whole: false,
            [targetType]: !condition[targetType],
          },
        };
  };

  const handleAuthFilter = (e) => {
    const targetType = e.target.value;
    const updatedConditions = changeFilter(targetType);
    setSearchConditions(updatedConditions);
  };

  return (
    <Wrapper>
      {authFilters.map((filter, idx) => {
        return (
          <label key={idx}>
            <input
              type="checkbox"
              id={idx}
              onChange={handleAuthFilter}
              value={filter.key}
              checked={searchConditions.condition[filter.key]}
            />
            <span>{filter.type}</span>
          </label>
        );
      })}
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
