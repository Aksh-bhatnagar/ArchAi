import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="text-center max-w-lg">

        {/* 404 */}
        <h1 className="text-7xl font-bold text-blue-500 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-slate-400 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
          >
            <Home size={18} />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}