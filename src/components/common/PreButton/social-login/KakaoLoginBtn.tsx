import styles from './LoginBtn.module.css';
import kakaoIcon from '@/assets/icons/ic-kakao.svg';

type Props = {
  size?: 'S' | 'L';
};

export default function KakaoLoginBtn({ size = 'L' }: Props) {
  return (
    <button className={size === 'L' ? styles.socialL : styles.socialS}>
      <img src={kakaoIcon} alt="Kakao" />
      <span className={size === 'L' ? styles.textL : styles.textS}>
        Kakao로 시작하기
      </span>
    </button>
  );
}
