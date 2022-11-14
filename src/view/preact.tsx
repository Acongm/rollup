import { h } from 'preact';
import styles from './style.module.css';
const View = () => {
  const a = [1, 2, 3, 4, 5111];
  const b = [...a, 88];

  return (
    <div className={styles.container} style={{ color: 'red' }}>
      hello preact
      {JSON.stringify(b)}
    </div>
  );
};
export default View;
