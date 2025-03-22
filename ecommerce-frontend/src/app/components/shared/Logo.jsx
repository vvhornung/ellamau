import Link from "next/link";
import { StyledLogo } from "./styles/Logo.styled";



function Logo() {
  return (
    <Link href="/">
      <StyledLogo>
        <h1 >Ell<span className="umlaut">a</span>m<span className="umlaut">a</span>u</h1>
      </StyledLogo>
    </Link>
  );
}

export default Logo;
