import styles from './index.module.css';
import { Link } from 'react-router-dom';
/*variant: 
[모달] 리뷰 남기기, 삭제하기, 취소, 변경하기, 
와인 보러가기
[헤더] 로그인(border-white), 회원가입(red)
[button] 가입하기(black, red, chacoal)
*/
type Props = {
  children?: React.ReactNode;
  to?: string;
  color?: 'black' | 'white' | 'red' | 'charcoal' | 'whiteLine';
  size?: 'stretch' | 'Wine' | 'headerIcon' | 'joinM' | 'joinS';
  className?: string;
};

export default function LinkButton({
  to = '/',
  children,
  color = 'black',
  size = 'stretch',
  className = '',
}: Props) {
  const mergedClassName = `
    ${styles.button}
    ${styles[color]}
    ${styles[size]}
    ${className}
  `;

  return (
    <Link to={to} className={mergedClassName}>
      {children}
    </Link>
  );
}
