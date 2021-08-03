import React from "react";
import Routes from "Routes";
import styled from "styled-components";

const App = () => {
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
