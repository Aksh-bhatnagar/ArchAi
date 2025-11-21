// import React, { useState } from 'react'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
// import { Label } from '@radix-ui/react-label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import toast, { Toaster } from "react-hot-toast"; 

// export default function RegisterPage() {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: ""
//   })

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       const response = await fetch("http://localhost:8080/api/v1/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       })

//       const data = await response.json()


//       if (!response.ok) {
//         toast.error(data.message || "Login failed");
//       } else {
//         toast.success("Logged in successfully!");
//         setTimeout(() => {
//           navigate("/view");
//         }, 800);
//       }
//     } catch (err) {
//       setError("Unable to register")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//     <Toaster position="top-right" />
//     <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
//       <Card className="w-full max-w-sm bg-gray-800 text-white">
//         <CardHeader>
//           <CardTitle>Create your account</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="firstname">Firstname</Label>
//                 <Input
//                   id="firstname"
//                   type="text"
//                   placeholder="Tyler"
//                   required
//                   value={formData.firstname}
//                   onChange={handleChange}
//                   />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="lastname">Lastname (optional)</Label>
//                 <Input
//                   id="lastname"
//                   type="text"
//                   placeholder="Durden"
//                   value={formData.lastname}
//                   onChange={handleChange}
//                   />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="bob@gmail.com"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   />
//               </div>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           {error && <p className="text-red-500">{error}</p>}
//           <Button type="submit" onClick={handleSubmit} className="w-full !bg-blue-500 text-white" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   </>
//   )
// }


import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import FallingStars from '../commons/Fallingstar'
import "../../index.css"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8080/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()


      if (!response.ok) {
        toast.error(data.message || "Login failed");
      } else {
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate("/view");
        }, 800);
      }
    } catch (err) {
      setError("Unable to register")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="relative h-screen w-screen flex justify-center items-center bg-slate-950 overflow-hidden">
        <FallingStars />
        <Card className="w-full max-w-sm bg-gray-800 text-white z-10 border-gray-700">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">Firstname</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Tyler"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Lastname (optional)</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Durden"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="bob@gmail.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" onClick={handleSubmit} className="w-full !bg-white text-black hover:!bg-gray-200" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
