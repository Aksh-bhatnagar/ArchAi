import api from '@/api/api';
import Navbar from '../commons/Navbar'
import { useNavigate, useParams } from 'react-router-dom'

export default function ViewPlanError() {
    const { id } = useParams()
    const navigate = useNavigate();
    
    const handleBack = async () => {
    try {
      await api.delete(`/architech/${id}/delete`);
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Navbar mode="" setMode={""} />
      <div className="w-screen h-screen flex items-center justify-center">

  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl p-10 w-[420px] text-center">

    <h1 className="text-2xl font-semibold text-white mb-2">
      Floorplan Not Available
    </h1>

    <p className="text-slate-400 text-sm mb-8">
      We couldn’t load the requested floorplan. It may have been removed or there was a network issue.
    </p>

    <button onClick={handleBack} className="w-full transition-all duration-300 text-white py-3 rounded-lg font-medium shadow-lg">
      Go Back
    </button>

  </div>
</div>
</>
  )
}
