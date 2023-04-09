import { FC } from "react";
import { Link } from "react-router-dom";

import scan from "@/assets/img/scan.png"
import './register.css'


export const RegisterPage: FC = () => {
    return (
        <div className="container">
            <p className="title">Регистрация</p>
            <form className="flex with-full">
                <div className="scan">
                    <img src={scan} alt="scan" className="icon__scan"/>
                    <input type="text" className="input" placeholder="Фамилия"/>
                    <input type="text" className="input" placeholder="Имя"/>
                    <input type="text" className="input" placeholder="Отчество"/>
                </div>
                <div className="form">
                    <input type="text" className="input" placeholder="Логин"/>
                    <input type="password" className="input" placeholder="Пароль"/>
                    <input type="text" className="input" placeholder="Мобильный телефон"/>
                    <input type="text" className="input" placeholder="Email"/>

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
