import styled from "styled-components";

export const VariantButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border: 1px solid ${(props) => (props.$selected ? "#000" : "#ddd")};
  background: ${(props) => (props.$selected ? "#000" : "#fff")};
  color: ${(props) => (props.$selected ? "#fff" : "#000")};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? "0.5" : "1")};
  border-radius: 4px;
  transition: all ease-in-out 200ms;
  position: relative;

  ${(props) =>
    props.$disabled &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom left, transparent calc(50% - 1px),rgba(0, 0, 0, 0.5), transparent calc(50% + 1px));
      pointer-events: none;
    }
  `}
`;
