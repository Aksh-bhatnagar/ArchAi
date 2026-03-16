import { useState } from "react";
import { HouseSvg } from "./HouseSvg.tsx";
import LoginCard from "./LoginCard.tsx";
import SignupCard from "./SignupCard.tsx";
import Navbar from "../commons/Navbar.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from 'sonner';

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <>
    <Toaster 
     duration={2000}  
     position="bottom-right"
            />
      <Navbar
        mode={mode}
        setMode={ setMode }
      />

      <div className="h-screen w-screen flex flex-col items-center justify-center min-h-screen">
         <div className="relative w-[650px] h-[650px] drop-shadow-[0_0_50px_rgba(56,189,248,0.30)]">
            <div className="relative w-[650px] h-[650px] drop-shadow-[0_0_2px_rgba(66,81,111)]">

          <HouseSvg
            mode={mode}
            />

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="absolute bottom-0 w-full flex justify-center"
              >
                <LoginCard />
              </motion.div>
            ) : (
              <motion.div
              key="signup"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute bottom-0 w-full flex justify-center"
                >
                <SignupCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </>
  );
}
