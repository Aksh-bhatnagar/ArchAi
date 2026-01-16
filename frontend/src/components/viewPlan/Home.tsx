import { Flag, PlusIcon } from "lucide-react";
import Navbar from "../commons/Navbar";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";
import InputWizard from "./InputWizard";

export default function Home() {
const [wizard, setwizard] = useState(false)


  return (
    <>
      <Navbar mode={""} setMode={""}/>
    <div className="h-full w-screen">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <h2 className="text-4xl md:text-5xl font-medium">
          <Typewriter
      words={[
        "Design Smart Floor Plans",
        "AI-Powered Layouts",
        "Optimized Homes",
        "Vastu-Aligned Designs",
      ]}
      loop={0}
      cursor
      cursorStyle="|"
      typeSpeed={50}
      deleteSpeed={50}
      delaySpeed={1500}
    />
        </h2>
        <p className="max-w-xl text-zinc-400 text-lg">
          Generate optimized architectural layouts in minutes using AI-driven workflows.
        </p>
        <button onClick={() => setwizard(true)}
          className="flex justify-center items-center gap-1">
          <PlusIcon />
          Create New Floor Plan
        </button>
      </div>

      {/* Saved Floor Plans */}

      {/* input wizard */}
    { wizard && <InputWizard />}

    </div>


    
    </>
  );
}

