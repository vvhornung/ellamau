import { Flex } from "./styles/Flex.styled";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import styled from "styled-components";

const StyledSocialMedia = styled(Flex)`
  svg { 
    width: 1.5rem;
    height: auto;
  }
`;

function SocialMedia() {
    return (

        <StyledSocialMedia>
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
          <FaPinterest />
        </StyledSocialMedia>

    );
}

export default SocialMedia;