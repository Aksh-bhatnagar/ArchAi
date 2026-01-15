import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Floorplan from "./components/viewPlan/Floorplan";
import InputWizard from "./components/viewPlan/InputWizard";
import AuthPage from "./components/auth/AuthPage";
import ProtectedRoute from "./components/commons/ProtectedRoute";
// import InputWizard from "./components/viewPlan/inputWizard";

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
        path: "/input",
        element: (
            <ProtectedRoute>
                <InputWizard />
            </ProtectedRoute>
        )
    }
])

export default router;