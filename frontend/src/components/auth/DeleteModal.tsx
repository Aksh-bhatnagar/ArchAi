import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import api from "@/api/api"
import { toast } from "sonner"
import { Loader2, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Props = {
  onClose: (value: boolean) => void
}

export default function DeleteModal({ onClose }: Props) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

const handleDelete = async () => {
  if (!password) {
    toast.error("Please enter your password")
    return
  }

  try {
    setLoading(true)

    await api.post("/users/delete-account", {
      password
    })

    toast.success("Account deleted successfully")
    navigate("/auth")
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || "Failed to delete account"
    )
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="absolute top-0 h-screen w-screen z-25 flex justify-center items-center backdrop-blur-xs">

      <div className="bg-slate-900 w-[420px] rounded-xl shadow-xl p-6 relative space-y-5 border-2 border-slate-700">

        {/* Title */}
        <h2 className="text-xl font-semibold text-red-600">
          Delete Account
        </h2>

        {/* Warning */}
        <p className="text-sm text-gray-600">
          This action cannot be undone. Enter your password to permanently delete your account.
        </p>

        {/* Password Input */}
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">

          <Button
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600!"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Delete Account"
            )}
          </Button>

        </div>

      </div>
    </div>
  )
}

