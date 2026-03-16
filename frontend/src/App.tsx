import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/redux/userSlice";
import api from "@/api/api";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

useEffect(() => {
  const restoreUser = async () => {
    console.log("Auth check started");

    try {
      const res = await api.get("/users/getuser");
      console.log("User fetched:", res.data);

      dispatch(setUser(res.data.data));
    } catch (err) {
      console.log("Auth failed:", err);
      dispatch(setUser(null));
    } finally {
      console.log("Auth finished");
      dispatch(setLoading(false));
    }
  };

  restoreUser();
}, [dispatch]);

  return <Outlet />;
}

export default App;