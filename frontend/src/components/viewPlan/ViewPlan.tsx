import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api/api";
import Navbar from "../commons/Navbar";
import ViewPlanError from "./ViewPlanError";
import { Edit2, Trash2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import RenameModal from "./RenameModal";
import { useDispatch } from "react-redux";
import { removeFloorplan, renameFloorplan } from "@/redux/floorplanSlice";
import type { AppDispatch } from "@/redux/store";

export default function View() {
  const { id } = useParams();
  const [svg, setSvg] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showRenameModal, setshowRenameModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 🧠 Zoom + Pan State
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });

  // 🧼 SVG CLEANER (VERY IMPORTANT)
  const sanitizeSvg = (raw: string) => {
    return raw
      .replace(/```svg|```/g, "")
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .replace(
        "<svg",
        `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"`
      )
      .replace(/stroke="none"/g, 'stroke="black"');
  };

  // 📦 FETCH
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/architech/${id}`);
        const cleanSvg = sanitizeSvg(res.data.data.svg);

        setSvg(cleanSvg);
        setProjectName(res.data.data.projectName);
      } catch (err) {
        console.error(err);
        setSvg(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // 🔍 ZOOM HANDLER (mouse wheel)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  // ✋ PAN HANDLERS
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    panStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPosition({
      x: e.clientX - panStart.current.x,
      y: e.clientY - panStart.current.y,
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  // 🎯 CONTROLS
  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));
  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // 🗑 DELETE
  const handleDelete = async () => {
    try {
      await api.delete(`/architech/${id}/delete`);
      if (id) dispatch(removeFloorplan(id));
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/dashboard");
    }
  };

  // ⬇ DOWNLOAD
  const handleDownload = async () => {
    try {
      const res = await api.get(`/architech/${id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${projectName}.svg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };
  

  if (loading) return null;
  if (!svg) return <ViewPlanError />;

  return (
    <>
      <Navbar mode="" setMode={() => {}} />

      <div className="h-screen w-screen pt-24 px-6 flex justify-center">
        <div className="w-full max-w-7xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 h-[85vh] flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 items-center">
              <h1 className="text-white text-xl font-semibold">
                {projectName || "Untitled"}
              </h1>
              <Edit2
                onClick={() => setshowRenameModal((p) => !p)}
                className="cursor-pointer text-blue-400"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={zoomIn}><ZoomIn /></button>
              <button onClick={zoomOut}><ZoomOut /></button>
              <button onClick={resetView}><RotateCcw /></button>
              <button onClick={handleDownload}>Download</button>
              <button onClick={handleDelete} className="bg-rose-600! px-2 rounded">
                <Trash2 />
              </button>
            </div>
          </div>

          {/* VIEWER */}
          <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="flex-1 bg-white rounded-xl overflow-hidden cursor-grab active:cursor-grabbing relative"
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "0 0",
              }}
              className="w-full h-full flex justify-center items-center"
            >
              <div
                className="[&>svg]:w-full [&>svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RENAME MODAL */}
      {showRenameModal && id && (
        <RenameModal
          id={id}
          onClose={() => setshowRenameModal(false)}
          onRenameSuccess={(newName) => {
            setProjectName(newName);
            dispatch(renameFloorplan({ id, name: newName }));
          }}
        />
      )}
    </>
  );
}