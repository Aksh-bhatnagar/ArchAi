import { useLocation, Navigate } from "react-router-dom";

export default function View() {
  const { state } = useLocation();
  const svg = state?.svg;

  if (!svg) {
    // user refreshed page or accessed directly
    return <Navigate to="/" replace />;
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

