import React, { useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  mode: "login" | "signup";
  setMode: React.Dispatch<React.SetStateAction<"login" | "signup">>;
};

export default function Navbar({ mode, setMode }: Props) {
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if(isDisabled) return;

    setIsDisabled(true)

    setTimeout(() => {
      setIsDisabled(false);
    }, 1500)

    setMode(mode === "login" ? "signup" : "login")
  }

  return (
    <div className="bg-[#0F172A] text-[#E5E7EB] h-18 w-screen top-0 flex absolute z-20 justify-between">
      <div className="flex">
        <h3 className="text-3xl py-4 pl-4 font-bold text-white">Arch</h3>
        <h3 className="text-3xl py-4 pr-4 font-bold text-sky-400">AI</h3>
      </div>

      <div className="flex justify-center items-center">
        {location.pathname === "/auth" && (
        <span
          className={`bg-gray-700 px-5 py-2 rounded-md text-white w-full m-3 ${ isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer" } hover:bg-gray-600`}
          onClick= {handleClick}
        >
          {mode === "login" ? "Signup" : "Login"}
        </span>
      )}
      </div>
    </div>
  );
}