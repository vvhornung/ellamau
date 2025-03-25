import { Container } from "../shared/styles/Container.styled";
import { StyledMainNav } from "./styles/MainNav.styled";
import Link from "next/link";
import connectDB from "@/app/lib/mongoose";
import { Category } from "@/app/models/Category";

export default async function MainNav({ categories }) {
  return (
    <Container width={"90%"}>
      <StyledMainNav>
        <ul>
          {categories.map((category) => {
            return (
              <li key={category._id}>
                <Link
                  href={`/category/${encodeURIComponent(category.name)}`}
                  passHref
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </StyledMainNav>
    </Container>
  );
}
