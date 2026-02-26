import { PlusIcon, MoreVertical } from "lucide-react";
import Navbar from "../commons/Navbar.tsx";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import blueprintImg from "@/assets/home-blueprints.jpeg"

// 👉 Replace later with API data
const floorplans = [
  { id: "1", name: "Modern Home", description: "" },
  { id: "2", name: "Office Layout", description: "" },
  { id: "3", name: "Cabin Design", description: "" },
  { id: "4", name: "Cabin Design", description: "" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/input");
  };

  return (
    <>
      <Navbar mode={""} setMode={""} />

      <div className="h-full w-screen overflow-y-auto bg-slate-950 text-white">
        
        {/* ---------------- Hero Section ---------------- */}
        <div className="flex flex-col items-center justify-center text-center gap-6 py-20">
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

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
          >
            <PlusIcon size={18} />
            Create New Floor Plan
          </button>
        </div>

        {/* ---------------- Saved Floorplans ---------------- */}
        <div className="w-full px-14 pb-14">
          
          <h3 className="text-xl font-semibold mb-8">
            Your Saved Floorplans
          </h3>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {floorplans.map((plan) => (
              <div
                key={plan.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition"
              >
                
                {/* Common Placeholder Image */}
                <div className="relative">
                  <img
                    src={blueprintImg}
                    alt="floorplan"
                    className="w-full h-40 object-cover bg-white"
                  />

                  {/* 3-dot menu */}
                  <button className="absolute top-2 right-2 bg-slate-800 p-2 rounded-lg hover:bg-slate-700">
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-medium">
                    {plan.name}
                  </h4>
                  <p className="text-sm text-zinc-400">
                    {plan.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
