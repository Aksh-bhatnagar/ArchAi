import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import api from "@/api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignupCard() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/users/register", {
        firstname,
        lastname,
        email,
        password,
      });
      console.log("SignUp Successful");
      navigate("/input");
    } catch (error: any) {
      console.error("Signup Failed", error);

      // Backend responded with an error
      if (error.response) {
        const message = error.response.data?.message || "Unable to sign up";
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
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Start designing your first floor plan today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6 border-none">
              <div className="grid gap-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="John"
                  required
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  className="bg-slate-950/60
                 border-slate-700
                 text-slate-100
                 placeholder:text-slate-500
                 focus:border-sky-400
                   focus:ring-2 focus:ring-sky-400/30"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                  required
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  className="bg-slate-950/60
                 border-slate-700
                 text-slate-100
                 placeholder:text-slate-500
                 focus:border-sky-400
                  focus:ring-2 focus:ring-sky-400/30"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="rust@example.com"
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="bg-slate-950/60
                   border-slate-700
                   text-slate-100
                   placeholder:text-slate-500
                   focus:border-sky-400
                     focus:ring-2 focus:ring-sky-400/30"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="bg-slate-950/60
                   border-slate-700
                   text-slate-100
                   placeholder:text-slate-500
                   focus:border-sky-400
                     focus:ring-2 focus:ring-sky-400/30"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <button
            onClick={handleRegister}
            className="w-full!
           bg-sky-500! hover:bg-sky-400!
           text-slate-950!
            font-medium!
            shadow-lg shadow-sky-500/30!
            rounded-md! h-9! text-center! pt-1!"
          >
            Sign Up
          </button>
        </CardFooter>
      </Card>
    </>
  );
}
