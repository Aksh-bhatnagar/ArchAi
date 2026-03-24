import { User, Trash2, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "../commons/Navbar";
import { useState } from "react";
import ChangeNameModal from "./ChangeNameModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import ChangePassModal from "./ChangePass";
import DeleteModal from "./DeleteModal";
import { clearUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { resetFloorplans } from "@/redux/floorplanSlice";

export default function EditPage() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [changeNameModal, setChangeNameModal] = useState(false);
  const [changepassModal, setchangepassModal] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      dispatch(clearUser());
      dispatch(resetFloorplans());
      navigate("/");
    } catch (err) {
      console.log("logout Failed", err);
      toast.message("Logout Failed");
    }
  };

  return (
    <>
      <Toaster position="bottom-right"/> 
      <Navbar mode="" setMode={""} />
      <div className="flex items-center justify-center h-screen w-screen p-4 text-white">
        <Card className="w-full max-w-md bg-[#1e293b] border-none shadow-2xl text-slate-100">
          <CardHeader className="space-y-1 flex flex-col items-center">
            {/* Profile Icon Header */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-1 bg-[#0f172a]">
              <User size={40} className="text-slate-400" />
            </div>
            <div className="flex justify-center items-center gap-2">
              <CardTitle className="text-2xl font-bold tracking-tight">
                {user?.firstname} {user?.lastname ?? ""}
              </CardTitle>
              <Edit
                size={20}
                className="pt-1 cursor-pointer"
                onClick={() => setChangeNameModal(true)}
              />
            </div>
            <CardDescription className="text-slate-400">
              {user?.email}
            </CardDescription>
            <span
              className="text-xs text-blue-600 cursor-pointer hover:text-blue-400"
              onClick={() => setchangepassModal(true)}
            >
              Change Password
            </span>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator className="bg-slate-700" />
          </CardContent>

          <CardFooter>
            {/* Theme-matched Logout Button */}
            <div className="flex w-full justify-between">
              <Button className="font-bold text-lg" onClick={handleLogout}>
                <LogOut size={20} />
                Logout
              </Button>
              <Button className="bg-red-600! hover:bg-red-500! text-white!" onClick={() => setDeleteModal(true)}>
                <Trash2 size={16} />
                Delete Account
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>


      {deleteModal && (
        <DeleteModal onClose={() => setDeleteModal(false)} />
      )}      
      {changeNameModal && (
        <ChangeNameModal onClose={() => setChangeNameModal(false)} />
      )}
      {changepassModal && (
        <ChangePassModal onClose={() => setchangepassModal(false)}/>
      )}
    </>
  );
}
