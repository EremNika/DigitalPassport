import '@/styles/global.css'

import { type FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "@/pages/Home";
import { LoginPage } from "@/pages/Login";
import { ScanPage } from "@/pages/Scan";
import { RegisterPage } from "@/pages/Register";

const router = createBrowserRouter([
    { path: '/', element: <HomePage/> },
    { path: '/login', element: <LoginPage/> },
    { path: '/register', element: <RegisterPage/> },
    { path: '/scan', element: <ScanPage/> },
])

export const App: FC = () => {
    return <RouterProvider router={router}/>
}
