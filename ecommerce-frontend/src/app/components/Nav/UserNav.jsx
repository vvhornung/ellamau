import { StyledUserNav } from "./styles/UserNav.styled";
import UserSvg from "../../icons/user.svg";
function UserNav() {
    return (
      <StyledUserNav>
        <a href="">
          <UserSvg/>
        </a>
        <a href="">
          <img src="/landing/icons/bag.svg" alt="Shopping Bag Icon" />
        </a>
      </StyledUserNav>
    );
}

export default UserNav;