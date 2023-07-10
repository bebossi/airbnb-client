import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback, useEffect, useContext } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../Hooks/useRegisterModal";
import useLoginModal from "../../Hooks/useLoginModal";
import { AuthContext } from "../authContext";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  console.log(user);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = () => {
    document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
  };

  useEffect(() => {}, [user]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block ">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:vw-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <hr />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
