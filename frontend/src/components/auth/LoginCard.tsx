import { useState } from "react";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";

export default function LoginCard() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await api.post("/users/login", { email, password });
      console.log("Login Success");
      const res = await api.get("/users/getuser");

      dispatch(setUser(res.data.data));
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      console.log("Login Failed", error);

      if (!email || !password) {
        toast.warning("Email and password are required");
        return;
      }

      if (error.response) {
        const message = error.response.data?.message || "Invalid credentials";
        toast.error(message);
      } else if (error.request) {
        toast.error("Server not responding. Try again later.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <Card className="w-full max-w-sm bg-transparent text-white border-none shadow-none z-10">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6 border-none">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="rust@example.com"
                required
                className="bg-slate-950/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  placeholder="••••••••"
                  className="bg-slate-950/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 pr-10"
                  onChange={(e) => setpassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400! hover:text-white! bg-transparent!"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <button onClick={handleLogin} className="w-full">
          Login
        </button>
      </CardFooter>
    </Card>
  );
}
