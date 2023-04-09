import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

import { type FC, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Oval } from 'react-loader-spinner'

import { useAppDispatch, useAppSelector } from "@/store";

import { HomePage } from "@/pages/Home";
import { LoginPage } from "@/pages/Login";
import { ScanPage } from "@/pages/Scan";
import { RegisterPage } from "@/pages/Register";
import { fetchUser, selectUser } from "@/store/slices/user.slice";

const router = createBrowserRouter([
    { path: '/', element: <HomePage/> },
    { path: '/login', element: <LoginPage/> },
    { path: '/register', element: <RegisterPage/> },
    { path: '/scan', element: <ScanPage/> },
])

export const App: FC = () => {
    const dispatch = useAppDispatch()
    const {isLoading} = useAppSelector(selectUser)


    useEffect(() => {
        dispatch(fetchUser())
    }, [])


    if (isLoading) return  <h1>Загрузка</h1>
    return <RouterProvider router={router}/>
}
