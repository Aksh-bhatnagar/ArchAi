// import { UserCircle } from "lucide-react";
// import { Button } from "../ui/button";
// import api from "@/api/api";
// import { useNavigate } from "react-router-dom";

// export default function ProfileModal({
//   user,
//   setUser
// }: {
//   user: User | null
//   setUser: React.Dispatch<React.SetStateAction<User | null>>
// }) {
//   const navigate = useNavigate();

// const handleLogout = async () => {
//   try {
//     await api.post("/users/logout");
//     setUser(null);
//     navigate("/");
//   } catch (err) {
//     console.log("Unable to Logout", err);
//   }
// };

//   return (
//     <div className="h-70 w-50 bg-[#0F172A] absolute top-20 right-3 rounded-2xl z-10 flex flex-col justify-between p-4 items-center gap-2">
      
//       <div className="flex flex-col justify-center items-center">
//         <UserCircle className="size-20" />
//         <p>{user?.firstname}</p>
//         <p className="text-sm text-gray-400">{user?.email}</p>
//       </div>

//       <Button 
//       onClick={handleLogout}
//       className="bg-red-600 text-white">
//         Logout
//       </Button>

//     </div>
//   );
// }

import { UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";

interface User {
  firstname: string;
  email: string;
}

export default function ProfileModal({
  user,
  setUser,
  closeModal
}: {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  closeModal: () => void;
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
      closeModal();
      navigate("/");
    } catch (err) {
      console.log("Unable to Logout", err);
    }
  };

  return (
    <div className="h-70 w-50 bg-[#0F172A] absolute top-20 right-3 rounded-2xl z-10 flex flex-col justify-between p-4 items-center gap-2">

      <div className="flex flex-col justify-center items-center">
        <UserCircle className="size-20" />

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