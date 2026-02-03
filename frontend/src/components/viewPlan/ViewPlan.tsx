import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/api";

export default function View() {
  const { id } = useParams();
  const [svg, setSvg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setSvg(res.data.data.svg);
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
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div
        className="bg-white p-4 rounded"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
