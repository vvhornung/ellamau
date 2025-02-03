"use client";

import styled from "styled-components";

export const StyledCarrouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-end;
  width: ${({ width }) => width || "100%"};
  min-width: 200px;
  height: 550px;
  position: relative;
  font-family: "Public Sans", sans-serif;
  font-size: 0.9rem;
  color: #000;
  font-weight: 200;
  margin: 0;
  text-align: left;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
  }

  span {
    font-size: 1rem;
    font-weight: 500;
  }

  button {
    text-transform: uppercase;
    font-weight: 500;
  }

  & > div {
    padding: 1rem;
    background-color: ${({ $bg }) => $bg || "white"};
    z-index: 2;
  }
`;
