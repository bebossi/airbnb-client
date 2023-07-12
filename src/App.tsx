import LoginModal from "./Components/modals/LoginModal";
import RegisterModal from "./Components/modals/RegisterModal";
import NavBar from "./Components/navbar/NavBar";
import ToasterProvider from "./Providers/ToasterProvider";
import { AuthContextComponent } from "./Components/authContext";
import Rentmodal from "./Components/modals/Rentmodal";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { UserContextProvider } from "./Components/currentUser";
import ListingPage from "./Pages/ListingPage";

const App = () => {
  return (
    <>
      <AuthContextComponent>
        <UserContextProvider>
          <div>
            <ToasterProvider />
            <Rentmodal />
            <LoginModal />
            <RegisterModal />
            <NavBar />
            <div className="pb-20 pt-28">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listing/:listingId" element={<ListingPage/>} />
              </Routes>
            </div>
          </div>
        </UserContextProvider>
      </AuthContextComponent>
    </>
  );
};

export default App;
