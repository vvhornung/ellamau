import styled from "styled-components";

export const StyledLogo = styled.div`
  text-align: center;
  line-height: 0.8;
  color: ${({ theme }) => theme.colors.logo};
  padding: 1rem;

  h1 {
    font-weight: 600;
    font-size: 3rem;
  }

  p {
    font-size: 1.2rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.8rem;
    }

    padding: 0;
  }
`;
