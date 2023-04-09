import {FC} from "react";
import docsImg from '../../assets/img/docs.png'
import notificationImg from '../../assets/img/notification.png'
import cardsImg from '../../assets/img/cards.png'
import scanImg from '../../assets/img/scan.png'
import menuImg from '../../assets/img/menu.png'
import gerbImg from '../../assets/img/gerb.png'

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
                            <div className="info_about__data">
                                <div>Дата рождения:</div>
                                <div className="info_about__data_inject">00.00.0000</div>

                                <div>Номер серия:</div>
                                <div className="info_about__data_inject">00 00 000000</div>

                                <div>Подпись:</div>
                                <div className="info_about__data_rosp">
                                    <svg width="129" height="83" viewBox="0 0 129 83" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_7_121)">
                                            <path
                                                d="M128.054 32.8078C121.752 33.686 115.41 34.2698 109.048 34.5293C106.035 34.654 103.302 34.9335 100.679 33.2369C99.1826 32.2689 98.1665 31.77 96.4397 32.6232C94.2172 33.721 92.195 35.5023 90.1578 36.9194C87.9054 38.4862 85.6279 40.0181 83.2303 41.3553C80.2221 43.0319 70.942 47.9668 68.7146 42.6127C68.5394 42.1886 68.0639 41.8842 67.6134 42.1637C64.4349 44.1346 61.1163 45.8312 57.6225 47.1734C54.8045 48.2562 50.7951 49.7581 48.3625 47.1485C48.0822 46.8491 47.5866 46.879 47.3013 47.1485C43.5272 50.7311 39.4929 54.0194 35.1832 56.9384C33.1209 58.3355 31.0036 59.7427 28.7712 60.8604C27.1845 61.6587 25.4576 62.3373 23.6507 62.3373C22.7697 62.3373 21.8837 62.0829 21.0028 62.1178C25.9732 54.713 30.9936 47.3381 36.1442 40.058C40.1486 34.3946 44.248 28.796 48.4726 23.2923C55.5853 16.3116 62.3376 8.96666 68.6996 1.29238C69.2151 0.673643 68.5694 -0.354252 67.7886 0.114788C60.9962 4.21639 56.1559 11.1123 51.3107 17.2247C49.9792 18.9013 48.6628 20.5879 47.3564 22.2894C44.3681 25.2234 41.3198 28.0975 38.2015 30.8918C32.9808 35.5722 27.625 40.2077 21.9338 44.3093C18.5952 46.7143 3.38366 56.9384 1.47159 49.1444C1.24134 48.2113 -0.205232 48.6055 0.0250179 49.5435C1.76691 56.639 11.5375 52.1732 15.5218 50.1024C22.2191 46.6245 28.0955 41.5799 33.8117 36.7198C36.5697 34.3746 39.2726 31.9646 41.9355 29.5146C39.9133 32.249 37.9111 35.0033 35.939 37.7727C29.9225 46.2253 24.0961 54.8128 18.3249 63.4351C17.6191 64.0987 16.9934 64.8921 16.4128 65.5158C14.8211 67.2124 13.2644 68.9388 11.8278 70.7651C9.15493 74.1731 7.0126 77.8705 5.93643 82.0819C5.7212 82.9202 6.84242 83.3593 7.30792 82.6607C11.2973 76.688 15.2666 70.7002 19.2609 64.7324C20.272 63.8443 21.193 63.6746 22.6696 63.7794C23.6607 63.8542 24.6167 63.8393 25.5928 63.6397C29.8874 62.7665 33.8768 59.7127 37.3856 57.2428C41.0696 54.6481 44.5433 51.779 47.8269 48.7053C50.0243 50.5365 53.0976 50.2371 55.7555 49.4238C59.9501 48.1414 63.9744 46.1305 67.7185 43.8552C69.4554 46.5696 73.1544 46.7493 76.1777 45.9958C81.8438 44.5837 86.9293 41.011 91.6344 37.7178C92.9409 36.8046 94.2323 35.8765 95.5487 34.9784C96.5298 34.3097 96.8201 34.0902 98.1265 34.1002C99.513 34.1102 99.488 34.3347 100.484 34.9534C102.621 36.2807 105.149 36.1659 107.572 36.0861C114.564 35.8616 121.532 35.2229 128.459 34.2599C129.41 34.1251 129.005 32.6831 128.059 32.8178L128.054 32.8078ZM62.8482 5.85303C60.8861 8.10343 58.8989 10.3289 56.8717 12.5194C58.7437 10.1842 60.7059 7.89884 62.8482 5.85303Z"
                                                fill="#18006D"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_7_121">
                                                <rect width="129" height="83" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
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