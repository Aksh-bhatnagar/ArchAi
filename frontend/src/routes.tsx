import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Floorplan from "./components/viewPlan/Floorplan";
import AuthPage from "./components/auth/RegisterPage";
import { LoginPage } from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import Navbar from "./components/commons/Navbar";
import { Children } from "react";
import InputWizard from "./components/viewPlan/InputWizard";
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
        path: "/login",
        element: (
            [<Navbar />,
             <LoginPage />
            ]
        )
    },
    {
        path: "/register",
        element: (
            [<Navbar />,
            <RegisterPage />
            ]
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