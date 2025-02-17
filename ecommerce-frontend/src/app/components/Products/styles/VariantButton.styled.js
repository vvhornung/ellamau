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
  transition: all ease-in-out 200ms
`;