import React from 'react'
import Footer from './Footer'
import Home from './components/screen/Home';
import Nav from './components/Nav'
import Login from './components/Login'
import Signup from './components/Signup';
import "./styles/Carousal.scss"
import "./styles/Home.scss"
import "./styles/Cart.scss"
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
        <Nav/>
        <div>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={<Signup/>} />
            </Routes>
        </div>
        <Footer/>
    </Router>
  );
}

export default App
