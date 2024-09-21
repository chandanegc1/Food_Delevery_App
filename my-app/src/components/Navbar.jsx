import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "../Utils/Modal";
import Cart from "../screens/Cart";
import { FaCartFlatbed } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  const cart = useSelector((state) => state.cart.cart);

  const auth = localStorage.getItem("authToken");
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signup");
  };

  return (
    <nav className="bg-red-600 py-3 px-12 flex justify-between place-items-center">
      <Link
        className="md:text-3xl text-lg font-bold uppercase text-white md:block hidden"
        to={"/"}
      >
        Cloud Kitchen.
      </Link>
      <div className="flex place-items-center gap-4 text-xl font-medium ">
        {auth ? (
          <>
            <Link to={"/"} className="text-white hover:text-black/60">
              Home
            </Link>
            <Link
              to={"orders"}
              className="text-white hover:text-black/60 text-lg"
              aria-current="page"
            >
              My Orders
            </Link>
            <div
              className="cursor-pointer flex text-white hover:text-black/60 md:w-20 w-16 gap-2 cart-logo"
              onClick={() => setCartView(true)}
            >
              <FaCartFlatbed size={28} />
              <span className="bg-white w-6 h-6 grid place-items-center font-bold text-sm rounded-full text-red-700 ">
                {cart.length}
              </span>
            </div>
            {cartView && (
              <Modal onClose={() => setCartView(false)}>
                <Cart />
              </Modal>
            )}
            <Link
              to={"/signup"}
              className="bg-white text-red-700 py-[0.3rem] px-3 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </>
        ) : isLoginPage ? (
          <Link to={"/signup"} className="text-white hover:text-black/60">
            SignUp
          </Link>
        ) : isSignupPage ? (
          <Link to={"/login"} className="text-white hover:text-black/60">
            Login
          </Link>
        ) : (
          <>
            <Link to={"/login"} className="text-white hover:text-black/60">
              Login
            </Link>
            <Link to={"/signup"} className="text-white hover:text-black/60">
              SignUp
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
