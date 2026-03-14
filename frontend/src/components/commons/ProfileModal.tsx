import { Edit, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { clearUser } from "@/redux/userSlice";

export default function ProfileModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      dispatch(clearUser());
      closeModal();
      navigate("/");
    } catch (err) {
      console.log("Unable to Logout", err);
    }
  };

  return (
    <div className="h-70 w-50 bg-[#0F172A] absolute top-20 right-3 rounded-2xl z-10 flex flex-col justify-between p-4 items-center gap-2">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-fit group">
          <UserCircle className="size-20" />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-full"></div>

          {/* Edit icon */}
          <Edit
            className="absolute top-1/2 left-1/2 
    -translate-x-1/2 -translate-y-1/2 
    text-white opacity-0 group-hover:opacity-100 
    transition cursor-pointer"
            onClick={() => navigate("/edit")}
          />
        </div>

        {user ? (
          <>
            <p>{user.firstname}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </>
        ) : (
          <p className="text-gray-400 text-sm">Loading...</p>
        )}
      </div>

      <Button
        onClick={handleLogout}
        className="bg-red-600! hover:bg-red-500! text-white!"
      >
        Logout
      </Button>
    </div>
  );
}
