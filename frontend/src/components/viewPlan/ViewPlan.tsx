import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api/api";
import Navbar from "../commons/Navbar";
import ViewPlanError from "./ViewPlanError";
import { Edit2, Trash2, X } from "lucide-react";
import RenameModal from "./RenameModal";

export default function View() {
  const { id } = useParams();
  const [svg, setSvg] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showRenameModal, setshowRenameModal] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/architech/${id}/delete`);
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/dashboard");
    }
  };

  const handleDownload = async () => {
    try {
      const res = await api.get(`/architech/${id}/download`, {
        responseType: "blob",
      });

      const contentDisposition = res.headers["content-disposition"];
      let fileName = `${projectName}.svg`;

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match?.[1]) {
          fileName = match[1];
        }
      }

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/architech/${id}`);
        setSvg(res.data.data.svg);
        setProjectName(res.data.data.projectName);
        console.log("FLOORPLAN RESPONSE:", res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
  //       Loading floorplan...
  //     </div>
  //   );
  // }

  if (!svg) {
    return <ViewPlanError />;
  }

  return (
    <>
      <Navbar mode="" setMode={() => {}} />

      <div className="h-screen w-screen pt-25 px-6 flex justify-center overflow-x-hidden">
        <div className="w-full max-w-7xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 h-[85vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="gap-4 flex items-center">
              <h1 className="text-xl font-semibold text-white">
                {projectName || "Untitled Project"}
              </h1>
              <Edit2
                onClick={() => setshowRenameModal((prev) => !prev)}
                className="cursor-pointer text-blue-400 hover:text-blue-600"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-lg transition shadow-lg"
              >
                Download
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 flex bg-rose-600! hover:bg-rose-500! rounded-lg transition"
              >
                <Trash2 />
              </button>
            </div>
          </div>

          {/* Viewer Container */}
          <div className="rounded-xl bg-white flex-1 overflow-auto flex justify-center custom-scrollbar">
            <div className="p-6">
              <div
                className="[&>svg]:block [&>svg]:max-w-full"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </div>
        </div>
      </div>

      {showRenameModal && id && (
        <RenameModal
          id={id}
          onClose={() => setshowRenameModal(false)}
          onRenameSuccess={(newName) => setProjectName(newName)}
        />
      )}
    </>
  );
}
