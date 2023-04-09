import { FC } from "react";
import { Link } from "react-router-dom";

import faceBig from '@/assets/img/face-big.png'
import ellipse1 from '@/assets/img/ellipse-1.png'
import ellipse2 from '@/assets/img/ellipse-2.png'
import ellipse3 from '@/assets/img/ellipse-3.png'
import ellipse4 from '@/assets/img/ellipse-4.png'

import styles from './scan.module.css'

export const ScanPage: FC = () => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={faceBig} alt="face" className={styles.logo__img}/>
                    <div className={styles.logo__title}>FACE ID</div>
                </div>
                <div className={styles.scan}/>
                <button className="btn bg-pink">Сканировать</button>

                <Link to="/" className={styles.link}>Вернуться на главную</Link>
            </div>


            <span className={styles.ellipse__birch}><img src={ellipse1} alt="ellipse-1"/></span>
            <span className={styles.ellipse__pink}><img src={ellipse2} alt="ellipse-2"/></span>
            <span className={styles.ellipse__green}><img src={ellipse3} alt="ellipse-3"/></span>
            <span className={styles.ellipse__beige}><img src={ellipse4} alt="ellipse-4"/></span>
        </div>
    )
}
