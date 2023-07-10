import LoginModal from "./Components/modals/LoginModal";
import RegisterModal from "./Components/modals/RegisterModal";
import NavBar from "./Components/navbar/NavBar";
import ToasterProvider from "./Providers/ToasterProvider";
import { AuthContextComponent } from "./Components/authContext";

function App() {
  return (
    <>
    <AuthContextComponent>
      <body>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <NavBar />
      </body>
      </AuthContextComponent>
    </>
  );
}

export default App;
