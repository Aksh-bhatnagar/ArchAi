import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/api";
import Navbar from "../commons/Navbar";

export default function View() {
  const { id } = useParams();
  const [svg, setSvg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/floorplans/${id}`);
        setSvg(res.data.data.svg);
        console.log("FLOORPLAN RESPONSE:", res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading floorplan...
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Failed to load floorplan
      </div>
    );
  }

  return (
    <>
      <Navbar mode="" setMode={""} />
      {/* <div className="h-screen w-screen bg-slate-950 flex justify-center items-center p-6">
        <div 
          className="bg-white p-4 rounded"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div> */}
        <div className="h-screen w-screen bg-slate-950 overflow-auto flex justify-center items-center">
    <div
      className="bg-white rounded shadow-xl"
      style={{
        width: "90vw",
        height: "90vh",
      }}
    >
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  </div>
    </>
  );
}
