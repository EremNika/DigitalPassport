import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import scan from "@/assets/img/scan.png"
import './register.css'
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store";
import axios from "axios";
import { setUser, UserState } from "@/store/slices/user.slice";
import { BASE_URL } from "@/config";
import { toast } from "react-toastify";


export interface FormRegisterPayLoad {
    login: string
    password: string
    email: string
    phone: string
    surname: string
    name: string
    patronymic: string
}

export const RegisterPage: FC = () => {
    const { register, handleSubmit, reset } = useForm<FormRegisterPayLoad>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data: FormRegisterPayLoad) => {
        try {
            const res = await axios.post<UserState>(`${BASE_URL}/users/sign-up`, data)
            localStorage.setItem('token', res.data.tokens.access)
            dispatch(setUser(res.data))
            navigate('/')
        } catch (err) {
            toast.error('Возникла ошибка', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset()
        }
    }

    return (
        <div className="container">
            <p className="title">Регистрация</p>
            <form className="flex with-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="scan">
                    <img src={scan} alt="scan" className="icon__scan"/>
                    <input type="text" className="input" placeholder="Фамилия" {...register('surname')}/>
                    <input type="text" className="input" placeholder="Имя" {...register('name')}/>
                    <input type="text" className="input" placeholder="Отчество" {...register('patronymic')}/>
                </div>
                <div className="form">
                    <input type="text" className="input" placeholder="Логин" {...register('login')}/>
                    <input type="password" className="input" placeholder="Пароль" {...register('password')}/>
                    <input type="text" className="input" placeholder="Мобильный телефон" {...register('phone')}/>
                    <input type="text" className="input" placeholder="Email" {...register('email')}/>

                    <button type="submit" className="btn bg-transparent btn_submit">Регистрация</button>

                    <p className="agree">
                        Нажимая “Регистрация”, вы соглашаетесь с
                        Условиями использования
                        и Политикой конфиденциальности
                    </p>

                    <Link to="/" className="form__link">На главную</Link>
                </div>
            </form>
        </div>
    )
}
