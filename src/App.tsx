import Modal from "./Components/modals/Modal"
import RegisterModal from "./Components/modals/RegisterModal"
import NavBar from "./Components/navbar/NavBar"
import ToasterProvider from "./Providers/ToasterProvider"

function App() {


  return (
    <>
      <body>
        <ToasterProvider/>
    <RegisterModal/>
    <NavBar/>
     </body>
    </>
  )
}

export default App
