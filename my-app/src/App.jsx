import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Myorder from "./screens/Myorder";

function App() {
  return (
    <div className="bg-gray-900 w-full h-full">
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={1600} 
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Myorder />} /> *
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
