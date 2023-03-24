import styles from '../Footer/Footer.module.css';


function Footer(){
    return(
    <footer>
        <div className={styles.footercontent}>
            <h3>Author: Anastasia Popova</h3>
            <p>We are here to enjoy the music!</p>
            <ul className={styles.socials}>
                <li><a href="/"><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href="/"><i className="fa-regular fa-envelope"></i></a></li>
                <li><a href="/"><i className="fa-brands fa-instagram"></i></a></li>
            </ul>
            <h4>Copyright &copy;2023</h4>
        </div>
    </footer>
    )
}

export default Footer