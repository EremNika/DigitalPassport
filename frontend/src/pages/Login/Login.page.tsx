import './login.styles.css'

import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emotionSmile from '@/assets/img/emotion-smile.png'
import faceSmile from '@/assets/img/face.png'
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "@/config";
import { fetchUser, selectUser, setUser, UserState } from "@/store/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { toast } from "react-toastify";


interface FormLoginPayload {
    login: string;
    password: string
}

export const LoginPage: FC = () => {
    const { register, handleSubmit, reset, formState: {isValid, isDirty} } = useForm<FormLoginPayload>({
        mode: 'onChange'
    })
    const navigate = useNavigate()
    const {login} = useAppSelector(selectUser)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (login) {
            navigate('/')
        }
    }, [])

    const onSubmit = async (data: FormLoginPayload) => {
        try {
            const res = await axios.post<UserState>(`${BASE_URL}/users/sign-in`, data)
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
        <div className="container page__registration">
            <div className="wrapper">
                <div className="wrapper__form">
                    <p className="title text-center">Цифровой паспорт</p>

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Логин ..." className="input" {...register('login', {required: true})}/>
                        <div>
                            <input type="password" placeholder="Пароль ..."
                                   className="input" {...register('password', {required: true})}/>
                            <Link to="#" className="reset_password">Забыли пароль?</Link>
                        </div>
                        <button type="submit" className="btn bg-pink" disabled={!isDirty || !isValid}>Вход</button>
                    </form>
                    <div className="wrapper__actions">
                        <p className="sub-title">Впервые у нас?</p>
                        <Link to="/register">Зарегистрироваться</Link>
                    </div>
                </div>
                <div className="wrapper__image">
                    <img src={emotionSmile} alt="emotion smile"/>
                    <div className="wrapper__image_action">
                        <Link to="/scan">
                            <button className="btn face__action">
                                FACE ID
                            </button>
                        </Link>
                        <div className="icon__face">
                            <img src={faceSmile} alt="face"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
