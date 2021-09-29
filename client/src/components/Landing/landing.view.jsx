import pokeball from '../../assets/img/pokeball.png'
import title from '../../assets/img/mainTitle.png'
import serverDown from '../../assets/img/server_down.png'
import loadingImg from '../../assets/img/loading.gif'
import styles from './landing.module.css'

const LandingView = ({ login, resolve }) => {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.head}>

          {resolve.success ? <h4>Welcome to</h4> : null}

          {resolve.success || resolve.error ? <img id={styles.title} src={title} alt='' /> : <img id={styles.loading} src={loadingImg} alt='' />}

        </div>
        <div className={styles.body}>
          {!resolve.success && !resolve.error ? <h4>Loading... please wait</h4> : null}

          {resolve.success ? <img id={styles.pokeball} src={pokeball} alt='' onClick={login} /> : null}

          {resolve.error
            ? (
              <>
                <img id={styles.serverDown} src={serverDown} alt='' />
                <p>{resolve.error}</p>
              </>
              )
            : null}
        </div>

      </div>
    </div>
  )
}

export default LandingView
