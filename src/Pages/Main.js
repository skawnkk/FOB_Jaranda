import React, { useEffect } from "react";
import styled from "styled-components";
import { saveLocalStorage } from "Utils/Storage";

const Main = () => {
  useEffect(() => {
    saveLocalStorage("TEST", { id: "afda", authority: 0 });
  }, []);

  return (
    <Wrapper>
      <div>This is Main Page🔧</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.absoluteCenter()};
`;

export default Main;
