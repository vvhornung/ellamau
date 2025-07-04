import { Flex } from "../shared/styles/Flex.styled";
import { VerticalDivider } from "../shared/styles/VerticalDivider.styled";
import Image from "next/image";
import { cinzel_decrative } from "@/app/fonts";

function RegionSelector() {
  return (
    <Flex width={"fit-content"}>
      <Image
        src="/usa.svg"
        width={25}
        height={25}
        alt="usa"
      />
      <VerticalDivider />
      <p>English (USA)</p>
      <VerticalDivider />
      <p>USD</p>
    </Flex>
  );
}

export default RegionSelector;
