import { StyledHeroVideo } from "./styles/HeroVideo.styled";

function HeroVideo({ src, bg }) {
  return (
    <StyledHeroVideo bg={bg}>
      <video src={src} alt="hello" autoPlay loop muted playsInline>

      </video>
    </StyledHeroVideo>
  );
}

export default HeroVideo;
