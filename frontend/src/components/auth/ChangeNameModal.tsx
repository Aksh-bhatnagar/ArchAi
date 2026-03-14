import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/userSlice";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

type ChangeNameModalProps  = {
  onClose: () => void;
}

export default function ChangeNameModal({
  onClose,
}: ChangeNameModalProps) {
const user = useSelector((state: RootState) => state.user.user);
const dispatch = useDispatch<AppDispatch>();

const [firstname, setFirstname] = useState(user?.firstname || "");
const [lastname, setLastname] = useState(user?.lastname || "");
const [loading, setLoading] = useState(false); 
const unchanged =
  firstname === user?.firstname && lastname === user?.lastname;

useEffect(() => {
  if (user) {
    setFirstname(user.firstname || "");
    setLastname(user.lastname || "");
  }
}, [user]);

const handleUpdate = async () => {
  try {
    setLoading(true);

    await api.patch("/users/update-account", {
      firstname,
      lastname,
    });

    dispatch(updateUser({ firstname, lastname }));

    onClose();
  } catch (error) {
    console.error("Update failed:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="absolute top-0 h-screen w-screen z-25 flex justify-center items-center backdrop-blur-xs">
      <div className="bg-slate-900 h-64 w-80 rounded-2xl shadow-2xl shadow-black p-4 flex flex-col justify-between">
        <div>
          <Label className="text-slate-300 font-medium py-2">
            First Name <span className="text-red-400">*</span>
          </Label>

          <Input
            placeholder="John"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white"
          />

          <Label className="text-slate-300 font-medium py-2 mt-3">
            Last Name
          </Label>

          <Input
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="bg-slate-900/50 border-slate-600 text-white"
          />
        </div>

        <div className="flex justify-between">
          <Button className="text-rose-500! bg-transparent!" onClick={onClose}>
            Cancel
          </Button>

         <Button onClick={handleUpdate} disabled={loading || unchanged}>
                Update
          </Button>
        </div>
      </div>
    </div>
  );
}
