import React from "react";
import styled from "styled-components";
import ActionButton from "./styles/ActionButton.styled";
import {
  SubHeading,
  ContentOverlay,
  Section,
  Description,
  MainHeading,
  BackgroundImage,
} from "./styles/HeroSection.styled";

const HeroSection = ({
  heading,
  subHeading,
  text,
  buttonText,
  imageSrc,
  onButtonClick,
  imagepositionx = "50%",
  imagepositiony = "50%",
  brightness = 1,
}) => {
  return (
    <Section>
      <ContentOverlay positionx={imagepositionx} positiony={imagepositiony}>
        <SubHeading>{heading}</SubHeading>
        <MainHeading>{subHeading}</MainHeading>
        <Description>{text}</Description>
        <ActionButton onClick={onButtonClick}>{buttonText}</ActionButton>
      </ContentOverlay>
      <BackgroundImage
        filterpercentagecentage={brightness}
        src={imageSrc}
        alt="Background"
        width={1800}
        height={1800}
      />
    </Section>
  );
};

export default HeroSection;
