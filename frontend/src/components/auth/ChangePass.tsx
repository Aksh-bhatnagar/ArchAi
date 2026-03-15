import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type DeleteModalProps = {
  onClose: () => void;
};

export default function DeleteModal({ onClose }: DeleteModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!password) {
      toast.error("Password can't be empty");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users/delete-account", {
        data: { password },
      });

      toast.success("Account deleted successfully");
      navigate("/auth");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 h-screen w-screen z-25 flex justify-center items-center backdrop-blur-xs">
      <div className="bg-slate-900 h-52 w-80 rounded-2xl shadow-2xl shadow-black p-4 flex flex-col justify-between">

        <div>
          <Label className="text-slate-300 font-medium py-2">
            Confirm Password
          </Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white pr-10"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <p className="text-xs text-rose-400 mt-3">
            This action is permanent. Your account will be deleted.
          </p>
        </div>

        <div className="flex justify-between">
          <Button
            className="text-rose-500! bg-transparent!"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="bg-rose-600 hover:bg-rose-700"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>

      </div>
    </div>
  );
}

