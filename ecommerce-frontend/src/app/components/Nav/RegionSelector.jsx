import { Flex } from "../shared/styles/Flex.styled";
import { VerticalDivider } from "../shared/styles/VerticalDivider.styled";
import Image from "next/image";
import { cinzel_decrative } from "@/app/fonts";

function RegionSelector() {
  return (
    <Flex justify={"start"} width={"fit-content"} className={cinzel_decrative.className}>
      <Image src="http://127.0.0.1:5500/landing/icons/usa.svg" width={25} height={25}  alt="" />
      <VerticalDivider />
      <p>english ( usa )</p>
      <VerticalDivider />
      <p>usd</p>
    </Flex>
  );
}

export default RegionSelector;
