import React, { useEffect } from "react";
import Routes from "Routes";
import styled from "styled-components";
import { USER_STORAGE } from "Utils/constants";
import { userMockData } from "Utils/MockData";
import { saveLocalStorage } from "Utils/Storage";

// App 컴포넌트에서 setLocalStorageItem
const App = () => {
  useEffect(() => {
    saveLocalStorage(USER_STORAGE, userMockData);
  }, []);

  return (
    <Container>
      <Routes />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default App;
