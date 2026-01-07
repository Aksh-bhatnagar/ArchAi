import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Floorplan from "./components/viewPlan/Floorplan";
import Navbar from "./components/commons/Navbar";
import InputWizard from "./components/viewPlan/InputWizard";
import AuthPage from "./components/auth/AuthPage";
// import InputWizard from "./components/viewPlan/inputWizard";

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
    },
    {
        path: "/input",
        element: (
            [
                <Navbar />,
            <InputWizard />
            ]
        )
    }
])

export default router;