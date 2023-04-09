import './login.styles.css'

import { FC } from "react";
import { Link } from "react-router-dom";
import emotionSmile from '@/assets/img/emotion-smile.png'
import faceSmile from '@/assets/img/face.png'


export const LoginPage: FC = () => {
    return (
        <div className="container page__registration">
            <div className="wrapper">
                <div className="wrapper__form">
                    <p className="title text-center">Цифровой паспорт</p>

                    <form action="#" className="form">
                        <input type="text" placeholder="Логин ..." className="input"/>
                        <div>
                            <input type="password" placeholder="Пароль ..." className="input"/>
                            <Link to="#" className="reset_password">Забыли пароль?</Link>
                        </div>
                        <button type="submit" className="btn bg-pink">Вход</button>
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
