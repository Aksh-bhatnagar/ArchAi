// import { LucideUserCircle } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ProfileModal from "./ProfileModal.js";
// import api from "@/api/api.js";

// interface User {
//   firstname: string;
//   email: string;
// }

// type Props = {
//   mode: "login" | "signup" | "";
//   setMode: React.Dispatch<React.SetStateAction<"login" | "signup">> | "";
// };

// export default function Navbar({ mode, setMode }: Props) {
//   const location = useLocation();
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [profileModal, setprofileModal] = useState(false);
//   const navigate = useNavigate();
//   const [user, setUser] = useState<User | null>(null);


// useEffect(() => {
//   const getMe = async () => {
//     try {
//       const res = await api.get("/users/getuser");
//       setUser(res.data.data);
//     } catch (err) {
//       setUser(null);
//     }
//   };

//   if (profileModal) {
//     getMe();
//   }
// }, [profileModal]);

//   const handleTransform = () => {
//     if (isDisabled) return;
//     setIsDisabled(true);

//     setTimeout(() => {
//       setIsDisabled(false);
//     }, 1500);

//     if (typeof setMode === "function") {
//       setMode(mode === "login" ? "signup" : "login");
//     }
//   };

//   const handleLogo = () => navigate("/dashboard");

//   return (
//     <div className="bg-[#0F172A] text-[#E5E7EB] h-18 w-screen top-0 flex absolute z-20 justify-between">
//       <div className="flex">
//         <h3
//           className="text-3xl py-4 pl-4 font-bold text-white cursor-pointer"
//           onClick={handleLogo}
//         >
//           Arch
//         </h3>
//         <h3
//           className="text-3xl py-4 pr-4 font-bold text-sky-400 cursor-pointer"
//           onClick={handleLogo}
//         >
//           AI
//         </h3>
//       </div>

//       <div className="flex justify-center items-center">
//         {location.pathname === "/auth" && (
//           <span
//             className={`bg-gray-700 px-5 py-2 rounded-md text-white w-full m-3 ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} hover:bg-gray-600`}
//             onClick={handleTransform}
//           >
//             {mode === "login" ? "Signup" : "Login"}
//           </span>
//         )}

//         {location.pathname != "/auth" && (
//           <span
//             onClick={() => setprofileModal((prev) => !prev)}
//             className="rounded-full cursor-pointer p-4"
//           >
//             <LucideUserCircle className="size-10" />
//           </span>
//         )}
//       </div>
//       {profileModal && (
//         <>
//         <div
//           className="absolute h-screen w-screen z-1"
//           onClick={() => setprofileModal((prev) => !prev)}
//           >
//         </div>
//         <ProfileModal user={user} setUser={setUser}/>
//           </>
//       )}
//     </div>
//   );
// }

import { LucideUserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import api from "@/api/api";

interface User {
  firstname: string;
  email: string;
}

type Props = {
  mode: "login" | "signup" | "";
  setMode: React.Dispatch<React.SetStateAction<"login" | "signup">> | "";
};

export default function Navbar({ mode, setMode }: Props) {
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await api.get("/users/getuser");
        setUser(res.data.data);
      } catch {
        setUser(null);
      }
    };

    getMe();
  }, []);

  const handleTransform = () => {
    if (isDisabled) return;

    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 1500);

    if (typeof setMode === "function") {
      setMode(mode === "login" ? "signup" : "login");
    }
  };

  const handleLogo = () => navigate("/dashboard");

  return (
    <div className="bg-[#0F172A] text-[#E5E7EB] h-18 w-screen top-0 flex absolute z-20 justify-between">

      <div className="flex">
        <h3
          className="text-3xl py-4 pl-4 font-bold text-white cursor-pointer"
          onClick={handleLogo}
        >
          Arch
        </h3>
        <h3
          className="text-3xl py-4 pr-4 font-bold text-sky-400 cursor-pointer"
          onClick={handleLogo}
        >
          AI
        </h3>
      </div>

      <div className="flex justify-center items-center">

        {location.pathname === "/auth" && (
          <span
            className={`bg-gray-700 px-5 py-2 rounded-md text-white w-full m-3 ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } hover:bg-gray-600`}
            onClick={handleTransform}
          >
            {mode === "login" ? "Signup" : "Login"}
          </span>
        )}

        {location.pathname !== "/auth" && (
          <span
            onClick={() => setProfileModal((prev) => !prev)}
            className="rounded-full cursor-pointer p-4"
          >
            <LucideUserCircle className="size-10" />
          </span>
        )}

      </div>

      {profileModal && (
        <>
          {/* overlay for closing modal */}
          <div
            className="absolute h-screen w-screen z-10"
            onClick={() => setProfileModal(false)}
          ></div>

          <ProfileModal
            user={user}
            setUser={setUser}
            closeModal={() => setProfileModal(false)}
          />
        </>
      )}
    </div>
  );
}
