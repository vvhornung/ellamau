import { StyledLogo } from "./styles/Logo.styled";

function Logo() {
  return (
    <StyledLogo onClick={() => window.location.href = '/'}>
      <h1>Ellämäu</h1>
    </StyledLogo>

  );
}

export default Logo;
