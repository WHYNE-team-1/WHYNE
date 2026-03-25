import styles from './LoginBtn.module.css';
import googleIcon from '@/assets/icons/ic-google.svg';

type Props = {
  size?: 'S' | 'L';
};

export default function GoogleLoginBtn({ size = 'L' }: Props) {
  return (
    <button className={size === 'L' ? styles.socialL : styles.socialS}>
      <img src={googleIcon} alt="Google" />
      <span className={size === 'L' ? styles.textL : styles.textS}>
        Google로 시작하기
      </span>
    </button>
  );
}
