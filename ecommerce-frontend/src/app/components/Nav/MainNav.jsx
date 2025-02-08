import { Container } from "../shared/styles/Container.styled";
import { StyledMainNav } from "./styles/MainNav.styled";
import { cinzel_decrative } from "@/app/fonts";
import Link from "next/link";
import connectDB from "@/app/lib/mongoose";
import {Category} from "@/app/models/Category";

export default async function MainNav() {

  await connectDB();
  const categories = await Category.find({parentCategory : null});
  console.log(categories)
  


  return (
    <Container width={"90%"}>
      <StyledMainNav className={cinzel_decrative.className}>
        {/* <!-- Navigation links --> */}

        <ul>
          {categories.map((category) => {
            return (
              <li key={category._id}>
                <Link href={`/category/${category._id}`}>
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

