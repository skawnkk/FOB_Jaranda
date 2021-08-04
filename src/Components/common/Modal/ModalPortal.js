import { useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalPortal = ({ toggleModal, children }) => {
  const dropdownRef = useRef(null);
  const handleClick = (e) => {
    if (dropdownRef.current === e.target) {
      toggleModal();
    }
  };

  const elRef = document.getElementById("modalDom");
  return ReactDOM.createPortal(
    <Wrapper ref={dropdownRef} onClick={handleClick}>
      {children}
    </Wrapper>,
    elRef
  );
};

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
