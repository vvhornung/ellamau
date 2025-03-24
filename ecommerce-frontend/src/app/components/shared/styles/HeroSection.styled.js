"use client";

import styled from "styled-components";
import Image from "next/image";

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 80vh; /* Altura fija para pantallas grandes */
  margin: 0 auto;
  overflow: hidden;
  background-color: #000; /* Fondo negro para evitar espacios en blanco */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 60vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50vh;
  }

  button {
    padding: 10px 30px;
    font-size: 1.5rem;
    border-radius: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    button {
      padding: 10px 30px;
      font-size: 1.2rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    button {
      padding: 6px 15px;
      font-size: 0.8rem;
    }
  }
`;


export const ContentOverlay = styled.div`
  position: absolute;
  top: ${({ $positionY }) => $positionY || "50%"};
  left: ${({ $positionX }) => $positionX || "50%"};
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.1rem;
  }
`;

export const SubHeading = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 0.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.2rem;
    margin-bottom: 10px;
    white-space: normal;
  }


  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const MainHeading = styled.h3`
  font-family: "Cinzel", serif;
  font-size: 5rem;
  font-weight: 400;
  margin-bottom: 28px;
  text-transform: lowercase;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3rem;
    margin-bottom: 15px;
    white-space: normal;
  }
  @media (max-width: 663px) {
    font-size: 2.2rem;
  }
  @media (max-width: 932px) {
    font-size: 4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }

  @media (max-width: 440px) {
    font-size: 1.6rem;
  }
`;

export const Description = styled.p`
  font-family: "Public Sans", sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
    margin-bottom: 25px;
  }


  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 20px;
    padding: 0 10px;
  }
`;

export const BackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

`;