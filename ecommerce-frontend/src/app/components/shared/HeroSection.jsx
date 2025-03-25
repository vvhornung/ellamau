"use client";

import React from "react";
import ActionButton from "./styles/Button.styled";
import { useState, useEffect } from "react";
import {
  SubHeading,
  ContentOverlay,
  Section,
  Description,
  MainHeading,
  BackgroundImage,
} from "./styles/HeroSection.styled";
import Link from "next/link";

const HeroSection = ({
  heading,
  subHeading,
  text,
  buttonText,
  imageSrc,
  desktopImageSrc,
  tabletImageSrc,
  mobileImageSrc,
  image$positionX = "50%",
  image$positionY = "50%",
  brightness = 1,
  href = "/",
}) => {
  // Use the most specific image available, falling back to imageSrc
  const getResponsiveImage = () => {
    if (typeof window === "undefined") return imageSrc; // SSR fallback

    const width = window.innerWidth;

    if (width <= 768 && mobileImageSrc) return mobileImageSrc;
    if (width <= 1024 && tabletImageSrc) return tabletImageSrc;
    if (desktopImageSrc) return desktopImageSrc;

    return imageSrc; // Default fallback
  };

  // Use React's useState and useEffect for client-side rendering
  const [currentImage, setCurrentImage] = useState(imageSrc);

  useEffect(() => {
    // Set initial image
    setCurrentImage(getResponsiveImage());

    // Update image on window resize
    const handleResize = () => {
      setCurrentImage(getResponsiveImage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageSrc, desktopImageSrc, tabletImageSrc, mobileImageSrc]);

  return (
    <Section>
      <ContentOverlay $positionX={image$positionX} $positionY={image$positionY}>
        <SubHeading>{heading.toUpperCase()}</SubHeading>
        <MainHeading>{subHeading}</MainHeading>
        <Description>{text}</Description>
        <Link href={href}>
          <ActionButton className="outline secondary">{buttonText}</ActionButton>
        </Link>
      </ContentOverlay>
      <BackgroundImage
        filterpercentagecentage={brightness}
        src={currentImage}
        alt="Background"
        width={1800}
        height={1800}
      />
    </Section>
  );
};

export default HeroSection;
