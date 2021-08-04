import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const modalRoot = document.getElementById("modal-root");
const ModalPortal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);
  return ReactDOM.createPortal(
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>,
    elRef.current
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  height: 300px;

  box-shadow: rgba(0, 0, 0, 0.08) 0 4px 2px -2px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.green};
`;

export default ModalPortal;
