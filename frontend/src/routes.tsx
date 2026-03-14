import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/home/HomePage.tsx";
import AuthPage from "./components/auth/AuthPage.tsx";
import ProtectedRoute from "./components/commons/ProtectedRoute.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import InputFields from "./components/fields/InputFields.tsx";
import ViewPlan from "./components/viewPlan/ViewPlan.tsx";
import EditPage from "./components/auth/EditPage.tsx";

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
        path: "/view/:id",
        element: (
            <ProtectedRoute>
                <ViewPlan />
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
    },
    {
        path: "/edit",
        element: (
            <ProtectedRoute>
                <EditPage />
            </ProtectedRoute>
                
        )
    }
])

export default router;