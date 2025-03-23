"use client";

import styled from "styled-components";

export const PromoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: ${({ textColor }) => textColor || "white"};
  padding: 20px;

  h2 {
    font-family: "Cinzel Decorative", serif;
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 10px;
    text-transform: lowercase;
  }

  p {
    font-family: "Public Sans", sans-serif;
    font-weight: 200;
    font-size: 1rem;
    margin-bottom: 20px;
  }

  button {
    font-size: 1rem;
    font-family: "Public Sans", sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    cursor: pointer;
  }

  // Ipad responsive
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    p {
      font-size: 0.9rem;
      margin-bottom: 10px;
      text-align-last: center;
    }
  }
  // MOBILE responsive
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h2 {
      font-size: 2rem;
      gap: 0rem;
      margin-bottom: 2px;
    }

    p {
      font-size: 0.8rem;
      margin-bottom: 10px;
      text-align-last: center;
    }

    button {
      font-size: 0.8rem;
    }
  }
`;
