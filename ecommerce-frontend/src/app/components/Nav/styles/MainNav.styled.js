'use client'

import styled from 'styled-components';

export const StyledMainNav = styled.nav`
  width: 70%;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
  }

  li {
    a {
      color: #333;
      text-decoration: none;
      text-transform: capitalize;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.16em;
      color: black;
      transition: all 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none
  }
`;