import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Floorplan from "./components/viewPlan/Floorplan";
import AuthPage from "./components/auth/authPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <HomePage />
        )
    },
    {
        path: "/view",
        element: (
            <Floorplan />
        )
    },
    {
        path: "/auth",
        element: (
            <AuthPage />
        )
    }
])

export default router;