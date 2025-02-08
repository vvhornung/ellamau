import Link from "next/link";
import { Container } from "../shared/styles/Container.styled";
import { Flex } from "../shared/styles/Flex.styled";
import SubCategoryItem from "./SubCategoryItem";
import connectDB from "@/app/lib/mongoose";
import { Category } from "@/app/models/Category";

async function SubCategoriesCarrousel({ categoryId }) {
  await connectDB();
  const categories = await Category.find({ parentCategory: categoryId });

  categories.forEach((category) => {
    category.img =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvlsk-SALklbJKn7Cq58x3d_TbiXPsWcPjzQ&s";
  });

  return (
    <Container $scroll={"true"}>
      <Flex $justify={"center"} $gap={"4px"}>
        {categories.map((category) => (
          <Link key={category._id} href={`/category/${category._id}`}>
            <SubCategoryItem product={category} />
          </Link>
        ))}
      </Flex>
    </Container>
  );
}

export default SubCategoriesCarrousel;
