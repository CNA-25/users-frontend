import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) setOpen(true);
    });
    if (window.innerWidth >= 768) setOpen(true);
  }, []);

  return (
    <div className="w-full bg-black">
      <div className="mx-auto flex flex-col max-w-screen-xl p-2 md:p-4 md:flex-row">
        <div className="flex flex-1 flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-500">BeerCraft</h1>
          <img
            className="flex md:hidden text-white w-10 h-10 mr-2"
            src="/hamburger-menu.svg"
            onClick={toggle}
          />
        </div>
        {open && (
          <div className="flex flex-1 flex-col justify-between items-center md:flex-row">
            <Link
              to="/"
              className="text-orange-500 text-2xl md:text-md hover:text-orange-800"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-orange-500 text-2xl md:text-md hover:text-orange-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-orange-500 text-2xl md:text-md hover:text-orange-800"
            >
              Register
            </Link>
            <Link
              to="/orders"
              className="text-orange-500 text-2xl md:text-md hover:text-orange-800"
            >
              Orders
            </Link>
            <Link
              to="/resetpassword"
              className="text-orange-500 text-2xl md:text-md hover:text-orange-800"
            >
              Reset password
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
