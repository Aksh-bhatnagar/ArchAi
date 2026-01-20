import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/home/HomePage.tsx";
import Floorplan from "./components/viewPlan/Floorplan.tsx";
import AuthPage from "./components/auth/AuthPage.tsx";
import ProtectedRoute from "./components/commons/ProtectedRoute.tsx";
import Dashboard from "./components/viewPlan/Dashboard.tsx";
import InputFields from "./components/viewPlan/InputFields.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        )
    },
    {
        path: "/view",
        element: (
            <ProtectedRoute>
                <Floorplan />
            </ProtectedRoute>
        )
    },
    {
        path: "/auth",
        element: (
            <AuthPage />
        )
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    },
    {
        path: "/input",
        element: (
            <ProtectedRoute>
                <InputFields />
            </ProtectedRoute>
        )
    }
])

export default router;