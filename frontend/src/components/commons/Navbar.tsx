import React from "react";
import { useLocation } from "react-router-dom";

type Props = {
  mode: "login" | "signup";
  setMode: React.Dispatch<React.SetStateAction<"login" | "signup">>;
};

export default function Navbar({ mode, setMode }: Props) {
  const location = useLocation();

  return (
    <div className="bg-gray-900 h-18 w-screen top-0 flex absolute z-20 justify-between">
      <h3 className="text-3xl p-4 font-bold text-blue-50">ArchAi</h3>

      {location.pathname === "/auth" && (
        <button
          className="!bg-blue-50 text-black w-25 m-3"
          onClick={() =>
            setMode(mode === "login" ? "signup" : "login")
          }
        >
          {mode === "login" ? "Signup" : "Login"}
        </button>
      )}
    </div>
  );
}

