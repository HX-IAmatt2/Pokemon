import success from '../../assets/img/success.png'
import styles from './alert.module.css'

const Alert = ({ done }) => {
  return (
    <div className={styles.box}>
      <div className={styles.body}>

        {done}!
        <img id={styles.img} src={success} alt='' />

      </div>
    </div>
  )
}

export default Alert
