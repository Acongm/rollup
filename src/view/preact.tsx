import { h } from 'preact';
import styles from './style.module.css';
const View = () => {
  return (
    <div className={styles.container} style={{ color: 'red' }}>
      hello preact 123
    </div>
  );
};
export default View;
