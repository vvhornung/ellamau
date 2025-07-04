"use client";

import styled from "styled-components";

export const StyledCarrouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: ${({ width }) => width || "100%"};
  min-width: ${({ $product }) => ($product ? "0" : "250px")};
  max-width: 400px;
  height: clamp(500px, 50vw, 550px);
  position: relative;
  font-family: "Public Sans", sans-serif;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  color: #000;
  font-weight: 200;
  margin: 0 auto;
  text-align: left;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  span {
    font-size: clamp(0.9rem, 2vw, 1rem);
    font-weight: 500;
  }

  button {
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.5rem 1rem;
    font-size: clamp(0.7rem, 2vw, 1rem);
  }

  & > div {
    padding: 1rem;
    background-color: ${({ $bg }) => $bg || "white"};
    z-index: 2;
    width: 100%;
    text-align: center;
  }
`;
