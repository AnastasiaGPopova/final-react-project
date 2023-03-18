import styles from "../Error/Error.module.css";


function Error(){

 return(
    <section>
      <div className={styles.notfoundpagecontainer}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
      </div>
    </section>
 )
    
}


export default Error