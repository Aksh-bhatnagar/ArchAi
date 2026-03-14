import { PlusIcon } from "lucide-react";
import Navbar from "../commons/Navbar.tsx";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import blueprintImg from "@/assets/home-blueprints.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { fetchFloorplans } from "@/redux/floorplanSlice";
import type { RootState } from "@/redux/store.ts";;
import type { AppDispatch } from "@/redux/store.ts";

export default function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

const { data: floorplans, loading, fetched } = useSelector(
  (state: RootState) => state.floorplans
);

  const handleCreate = () => {
    navigate("/input");
  };

useEffect(() => {
  if (!fetched) dispatch(fetchFloorplans());
}, [fetched, dispatch]);

  return (
    <>
      <Navbar mode={""} setMode={""} />

      <div className="h-full w-screen overflow-y-auto text-white">
        
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
            Generate optimized architectural layouts in minutes using AI.
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

          {loading && (
            <p className="text-zinc-400">Loading...</p>
          )}

          {/* {error && (
            <p className="text-red-500">{error}</p>
          )} */}

          {!loading && floorplans.length === 0 && (
            <p className="text-zinc-500 flex">
              You haven't generated any floorplans yet.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {floorplans.map((plan) => (
              <div
                key={plan._id}
                onClick={() => navigate(`/view/${plan._id}`)}
                className="cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition"
              >
                
                {/* ✅ Common Placeholder Image */}
                <div className="relative">
                  <img
                    src={blueprintImg}
                    alt="floorplan"
                    className="w-full h-40 object-cover bg-white"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-medium">
                    {plan.projectName}
                  </h4>

                  <p className="text-sm text-zinc-400">
                    {new Date(plan.createdAt).toLocaleDateString()}
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

