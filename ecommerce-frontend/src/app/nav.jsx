'use client';
import MainNav from "./components/Nav/MainNav";
import OfferNav from "./components/Nav/OfferNav";
import SearchNav from "./components/Nav/SearchNav";
import UserNav from "./components/Nav/UserNav";
function Nav() {
    return (
      <div>
        <OfferNav />
        <UserNav />
        <SearchNav />
        <MainNav />
      </div>
    );
}

export default Nav;