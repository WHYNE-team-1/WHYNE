import styles from "./index.module.css";

/*variant: 
[모달] 리뷰 남기기, 삭제하기, 취소, 변경하기, 리뷰 등록하기, 
와인 보러가기
[헤더] 로그인(border-white), 회원가입(red)
[button] 가입하기(black, red, chacoal)
*/
type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  color?: "black" | "white" | "red";
  size?: "stretch" | "s" | "m" | "l";
};
