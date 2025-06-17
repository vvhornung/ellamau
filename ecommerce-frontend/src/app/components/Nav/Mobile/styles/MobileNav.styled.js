"use client";

import styled from "styled-components";

export const StyledMobileNav = styled.nav`
  position: relative;
  padding-bottom: 0.5rem;
  svg {
    width: 20px;
    height: 20px;
  }

  a {
    color: black;
    font-family: "cinzel", serif;
    font-size: 1.6rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const OverlayScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;

  &.open {
    transform: translateY(0);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
  color: black;

svg {
    width: 30px;
    height: 30px;
  }
`;



export const SearchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;

  &.open {
    transform: translateY(0);
  }
`;

export const SearchForm = styled.form`
  width: 100%;
  padding: 0 20px;
  margin-top: 30px;
  position: relative;

  button {
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: black;
    font-size: 24px;
    z-index: 1001;
    svg {
      width: 30px;
      height: 30px;
    }

  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 20px 12px;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;
  background-color: transparent;
  color: black;
  font-family: "Cinzel", serif;
  transition: border-color 0.3s ease-in-out;


  &:focus {
    border-color: #000;
  }
`;
