import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.$fullscreen ? "100vh" : "100%")};
  width: 100%;
`;

const SpinnerElement = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #767676;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const Spinner = ({ fullscreen }) => {
  return (
    <SpinnerContainer $fullscreen={fullscreen}>
      <SpinnerElement />
    </SpinnerContainer>
  );
};

export default Spinner;
