import icon from '@/assets/icons/ic_X.svg';
import styles from './XBtn.module.css';

type Props = {
  onClick?: () => void;
};

export default function XBtn({ onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      <img className={styles.icon} src={icon} alt="ic_X" />
    </button>
  );
}
