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
      "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg";
  });

  return (
    <Container $scroll={"true"}>
      <Flex $justify={"center"} $gap={"4px"}>
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <SubCategoryItem product={category} />
          </Link>
        ))}
      </Flex>
    </Container>
  );
}

export default SubCategoriesCarrousel;
