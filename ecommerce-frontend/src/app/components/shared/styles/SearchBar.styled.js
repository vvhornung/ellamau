import styled from "styled-components";

export const StyledSearchBar = styled.div`
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input {
    border: none;
    background-color: transparent;
    outline: none;
    padding: 0.6rem;
    color: #333;
  }

  svg {
    width: 1rem;
    height: auto;
    opacity: 0.7;
  }
`;
