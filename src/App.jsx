import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import SignUp from "./pages/signUp/SignUp"
import Avatars from "./pages/avatar/Avatars"
import Loader from "./components/Loader";
import Image from "./pages/Images/Image"
import { UserContext } from "./components/context/UserContext"

function App() {


  return (
  <div className="App">
    <UserContext>
    <Router>
      <Routes>
        <Route path="home/*" element = {<Home/>}/>
        <Route path="login" element = {<Login/>}/>
        <Route path="signUp" element = {<SignUp/>}/>
        <Route path ="avatar" element = {<Avatars/>}/>
        <Route path = "loader" element ={<Loader/>}/>
        <Route path="image" element = {<Image/>}/>
      </Routes>
    </Router>
    </UserContext>
   
  </div>
  )
}

export default App
