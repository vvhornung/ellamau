import { Container } from "../shared/styles/Container.styled";
import { Flex } from "../shared/styles/Flex.styled";
import { StyledMainNav } from "./styles/MainNav.styled";
import { cinzel_decrative } from "@/app/fonts";
import Link from "next/link";

function MainNav() {
  return (
    <Container width={"90%"}>
      <StyledMainNav className={cinzel_decrative.className}>
        {/* <!-- Navigation links --> */}

        <ul>
          {/* <!-- Navigation link to the Lingerie section --> */}
          <li>
            <Link href={"/category/lingerie"}>Lingerie</Link>
          </li>
          {/* <!-- Navigation link to the Swimwear section --> */}
          <li>
            <Link href={"/category/swimwear"}>Swimwear</Link>
          </li>
          {/* <!-- Navigation link to the Sportswear section --> */}
          <li>
            <Link href={"/category/sportwear"}>Sportwear</Link>
          </li>
          {/* <!-- Navigation link to the Beauty section --> */}
          <li>
            <Link href={"/category/beauty"}>Beauty</Link>
          </li>
        </ul>
      </StyledMainNav>
    </Container>
  );
}

export default MainNav;
