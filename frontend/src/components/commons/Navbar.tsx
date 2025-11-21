import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className="bg-gray-900 h-18 w-screen top-0 flex justify-between absolute z-50">
          <h3 className="text-3xl p-4 font-bold text-blue-50">
            ArchAi
          </h3>
          <div className="w-30 p-4">
            {location.pathname === "/login" && (
              <Link to="/register">
                <Button className="!bg-blue-50 text-black">Sign Up</Button>
              </Link>
            )}
            {location.pathname === "/register" && (
              <Link to="/login">
                <Button className="!bg-blue-50 text-black">Login</Button>
              </Link>
            )}
          </div>
      </div>
    </>
  );
}
