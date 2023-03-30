import { Route, Routes } from "react-router-dom";
import './App.css';
import FormCreateUser from "./components/FormCreateUser";

import NavBar from "./components/NavBar";
import Login from "./pages/auth/Login"
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
    <NavBar />

    <Routes>

      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/user/create-user" element={<FormCreateUser />}></Route>

    </Routes>
      
    </div>
  );
}

export default App;
