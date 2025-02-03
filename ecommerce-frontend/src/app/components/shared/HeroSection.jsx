import React from "react";
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
  image$positionX = "50%",
  image$positionY = "50%",
  brightness = 1,
}) => {
  return (
    <Section>
      <ContentOverlay $positionX={image$positionX} $positionY={image$positionY}>
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
