import React from "react";
import styled from "styled-components";

const AuthFilter = ({ filterType, setFilterType }) => {
  const authFilters = [
    { type: "전체", key: "whole" },
    { type: "관리자", key: "admin" },
    { type: "선생님", key: "teacher" },
    { type: "부모님", key: "parents" },
  ];

  const activeWholeFilter = () => ({
    whole: true,
    teacher: true,
    parents: true,
    admin: true,
  });

  const toggleAuthFilter = (choicedAuth) => ({
    ...filterType,
    whole: false,
    [choicedAuth]: !filterType[choicedAuth],
  });

  const activeOtherFilters = (choicedAuth) => {
    const toggledAuthFilter = toggleAuthFilter(choicedAuth);
    const { parents, teacher, admin } = toggledAuthFilter;

    const isAllUnChecked = !teacher && !parents && !admin;
    const isAllChecked = teacher && parents && admin;

    if (isAllUnChecked || isAllChecked) return activeWholeFilter();
    return toggledAuthFilter;
  };

  const changeFilter = (choicedAuth) =>
    choicedAuth === "whole" ? activeWholeFilter() : activeOtherFilters(choicedAuth);

  const handleAuthFilter = (e) => {
    const choicedAuth = e.target.value;
    setFilterType(changeFilter(choicedAuth));
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
              checked={filterType[filter.key]}
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
