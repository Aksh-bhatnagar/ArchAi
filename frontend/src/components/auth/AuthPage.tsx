// import { useState } from "react";
// import { HouseSvg } from "./HouseSvg";
// import LoginCard from "./LoginCard";
// import SignupCard from "./SignupCard";
// import Navbar from "../commons/Navbar";
// // import { motion } from "framer-motion";

// export default function AuthPage() {
//   const [mode, setMode] = useState<"login" | "signup">("login");

//   return (
//     <>
//       <Navbar mode={mode} setMode={setMode} />

//       <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-500 text-white gap-4">
//         <div className="relative w-[650px] h-[650px]">
//           {/* Background */}
//           <HouseSvg mode={mode} />

//           {/* Overlay */}
//           <div className="absolute bottom-0 w-full flex justify-center">
//               {mode === "login" ? <LoginCard /> : <SignupCard />}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import { HouseSvg } from "./HouseSvg";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";
import Navbar from "../commons/Navbar";
import { AnimatePresence, motion } from "framer-motion";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <>
      <Navbar mode={mode} setMode={setMode} />

      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-500 text-white gap-4">
        <div className="relative w-[650px] h-[650px]">
          <HouseSvg mode={mode} />

          {/* Overlay */}
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: -30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute bottom-0 w-full flex justify-center"
                >
                  <LoginCard />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute bottom-0 w-full flex justify-center"
                >
                  <SignupCard />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        
      </div>
    </>
  );
}

