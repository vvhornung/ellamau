"use client";

import styled from "styled-components";

export const StyledMobileNav = styled.nav`
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
  right: 0; /* Position it on the right side */
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transform: translateX(
    -100%
  ); /* Initially positioned off-screen to the right */
  opacity: 0; /* Initially transparent */
  transition:  all 0.5s ease-in-out; /* Smooth transition for sliding effect */

  svg{
    width: 30px;
    height: 30px;
  }

  /* When menu is open (controlled by parent component) */
  &.open {
    transform: translateX(0); /* Slide in from right to left */
    opacity: 1; /* Fade in */
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
  color: black;
`;
