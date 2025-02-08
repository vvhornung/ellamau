'use client';

import styled from "styled-components";

export const StyledCategoryItem = styled.div`
  flex: 0 0 calc(100% / 6 - 20px);
  text-align: center;
  margin: 0 10px;
  overflow: hidden;
  gap: 0;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  p {
    font-family: "Public Sans", sans-serif;
    font-size: 14px;
    color: #000;
    font-weight: bold;
    text-transform: uppercase;
    padding: 1rem;
    width: 100%;
    background-color: white;
    z-index: 2;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;
