import styles from './page.module.css'
import Calculator from '@/components/calculator'

export default function Home() {

  return (
    <div className={styles.main}>
      <Calculator />
    </div>
  )
}
