"use client";

import styled from "styled-components";
import Image from "next/image";

export const Section = styled.section`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  button {
    padding: 10px 30px;
    font-size: 1.5rem;
    border-radius: 0;
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
`;

export const SubHeading = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 0.2rem;
`;

export const MainHeading = styled.h3`
  font-family: "Cinzel", serif;
  font-size: 5rem;
  font-weight: 400;
  margin-bottom: 28px;
  text-transform: lowercase;
  white-space: nowrap;
`;

export const Description = styled.p`
  font-family: "Public Sans", sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 40px;
`;

export const BackgroundImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: brightness(
    ${({ filterpercentagecentage }) => filterpercentagecentage || "100%"}
  );
`;
