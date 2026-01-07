import { useState } from "react";
import { HouseSvg } from "./HouseSvg";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-slate-900 text-white">
      <HouseSvg mode={mode} />

      <button
        onClick={() =>
          setMode(mode === "login" ? "signup" : "login")
        }
        className="p-2 rounded-md bg-indigo-500"
      >
        Switch to {mode === "login" ? "Signup" : "Login"}
      </button>
    </div>
  );
}


