import { Container } from "../shared/styles/Container.styled";
import { Flex } from "../shared/styles/Flex.styled";
import SubCategoryItem from "./SubCategoryItem";


function SubCategoriesCarrousel({ items }) {
    return (


          <Container scroll={"true"}>
            <Flex justify={"center"} gap={'4px'} >
              {items.map((item) => (
                <SubCategoryItem
                  key={item.id}
                  product={item}
                
                  
                />
              ))}
            </Flex>
          </Container>

    );
}

export default SubCategoriesCarrousel;