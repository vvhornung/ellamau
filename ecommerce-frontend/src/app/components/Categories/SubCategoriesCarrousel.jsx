import Link from "next/link";
import { Container } from "../shared/styles/Container.styled";
import { Flex } from "../shared/styles/Flex.styled";
import SubCategoryItem from "./SubCategoryItem";
import connectDB from "@/app/lib/mongoose";
import { Category } from "@/app/models/Category";

async function SubCategoriesCarrousel({ categoryId }) {
  await connectDB();
  const categories = await Category.find({ parentCategory: categoryId });

  return (
    <Container
      $scroll={"true"}
      style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "0 10px" }}
    >
      {" "}
      <Flex $justify={"flex-start"} $gap={"0px"} $wrap={"nowrap"}>
        {categories.reverse().map((category) => (
          <Link
            key={category._id}
            href={`/category/${encodeURIComponent(category.name)}`}
          >
            <SubCategoryItem category={category} />
          </Link>
        ))}
      </Flex>
    </Container>
  );
}

export default SubCategoriesCarrousel;
