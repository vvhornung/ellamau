import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyledHeader = styled.header`
  padding: 1rem;
  background-color: orange;
  color: white;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #f4a261;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #f4a261;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ellamau</Logo>
          <Nav>
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Products</Link>
            <Link href={"/categories"}>Categories</Link>
            <Link href={"/account"}>Account</Link>
            <Link href={"/cart"}>Cart</Link>
          </Nav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

export default Header;
