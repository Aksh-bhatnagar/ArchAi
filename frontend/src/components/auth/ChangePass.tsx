import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type ChangePassModalProps = {
  onClose: () => void;
};

export default function ChangePassModal({ onClose }: ChangePassModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Fields can't be empty");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users/change-password", {
        oldPassword: currentPassword,
        newPassword,
      });
      onClose();
      toast.message("Password change successfully");
    } catch (err: any) {
      toast.message("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 h-screen w-screen z-25 flex justify-center items-center backdrop-blur-xs">
      <div className="bg-slate-900 h-60 w-80 rounded-2xl shadow-2xl shadow-black p-4 flex flex-col justify-between">
        <div>
          <Label className="text-slate-300 font-medium py-2">
            Current Password
          </Label>

          <div className="relative">
            <Input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white pr-10"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowCurrent((prev) => !prev)}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <Label className="text-slate-300 font-medium py-2 mt-3">
            New Password
          </Label>

          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white pr-10"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowNew((prev) => !prev)}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <Button className="text-rose-500! bg-transparent!" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
