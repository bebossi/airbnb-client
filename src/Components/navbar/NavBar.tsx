import { useContext, useEffect, useState } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { AuthContext } from "../authContext";
import { User } from "../../interfaces/UserInterface";

interface NavBarProps {
  currentUser?: User;
}

const NavBar: React.FC<NavBarProps> = () => {
  const {user} = useContext(AuthContext)

  useEffect(() => {

  }, [user])
  console.log(user)

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={user} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
