import icon from '@/assets/icons/X.svg';
import styles from './XBtn2.module.css';

type Props = {
  onClick?: () => void;
};

export default function XBtn2({ onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      <img className={styles.icon} src={icon} alt="X" />
    </button>
  );
}
