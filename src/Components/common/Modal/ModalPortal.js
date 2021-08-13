import { useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalPortal = ({ toggleModal, modalType, children }) => {
  const ref = useRef(null);
  const handleClick = (e) => {
    if (ref.current === e.target && modalType !== "success") toggleModal();
  };

  const elRef = document.getElementById("modalDom");
  return ReactDOM.createPortal(
    <Wrapper ref={ref} onClick={handleClick}>
      {children}
    </Wrapper>,
    elRef
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
export default ModalPortal;
