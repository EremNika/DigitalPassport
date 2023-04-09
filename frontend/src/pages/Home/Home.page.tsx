import {FC} from "react";
import docsImg from '@/assets/img/docs.png'
import notificationImg from '@/assets/img/notification.png'
import cardsImg from '@/assets/img/cards.png'
import scanImg from '@/assets/img/avatar-default.png'
import menuImg from '@/assets/img/menu.png'
import gerbImg from '@/assets/img/gerb.png'

import './home.styles.css'

export const HomePage: FC = () => {
    return (
        <main>
            <div className="container">
                <h1 className="title">Личный кабинет</h1>

                <div className="wrapper">
                    <div className="documents">
                        <div className="documents_title">Документы</div>
                        <img src={docsImg} alt="docs" className="documents_img"/>
                    </div>

                    <div className="info">
                        <div className="info_title">
                            <span className="info_title__text">
                            Паспорт гражданина
                            Российской Федерации
                            </span>
                            <img src={gerbImg} alt="gerbImg" className="info_title__img"/>
                        </div>
                        <div className="info_about">
                            <img src={scanImg} alt="scanImg" className="info_about__img"/>
                        </div>
                        <div className="info_fio">
                            <div className="info_fio__text">
                                <div>Фамилия:</div>
                                <div>Имя:</div>
                                <div>Отчество:</div>
                            </div>

                            <img src={menuImg} alt="menuImg" className="info_fio__img"/>
                        </div>
                    </div>

                    <div className="notification">
                        <img src={notificationImg} alt="notificationImg" className="widget_notification"/>
                        <img src={cardsImg} alt="cardsImg" className="widget_cards"/>
                    </div>
                </div>
            </div>
        </main>
    )
}
