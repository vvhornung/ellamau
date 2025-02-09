import Link from "next/link";
import { StyledLogo } from "./styles/Logo.styled";

function Logo() {
  return (
    <Link href="/">
      <StyledLogo>
        <h1>Ellämäu</h1>
      </StyledLogo>
    </Link>
  );
}

export default Logo;
