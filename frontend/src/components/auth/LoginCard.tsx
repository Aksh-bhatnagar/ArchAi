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

export default function LoginCard() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await api.post("/users/login", { email, password });
      console.log("Login Success");
      navigate("/input");
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
    <>
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
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="rust@example.com"
                  required
                  className="bg-slate-950/60
                 border-slate-700
                 text-slate-100
                 placeholder:text-slate-500
                 focus:border-sky-400
                   focus:ring-2 focus:ring-sky-400/30"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  required
                  placeholder="••••••••"
                  className="bg-slate-950/60
                   border-slate-700
                   text-slate-100
                   placeholder:text-slate-500
                   focus:border-sky-400
                     focus:ring-2 focus:ring-sky-400/30"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <button
            className="w-full!
           bg-sky-500! hover:bg-sky-400!
           text-slate-950!
            font-medium!
            shadow-lg shadow-sky-500/30!
            rounded-md! h-9! text-center! pt-1!"
            onClick={handleLogin}
          >
            Login
          </button>
        </CardFooter>
      </Card>
    </>
  );
}
