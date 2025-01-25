import styled from "styled-components";

export const StyledProductItem = styled.div`
  & > div {
    ${({ variant }) =>
      variant === "hover" &&
      `
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
      }
    `}

    ${({ border }) =>
      border === "card" &&
      `
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `}
  }
`;
