import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/common/Input";
import Button from "@/components/common/button";
import styles from "./index.module.css";
import KakaoIcon from "@/assets/icons/ic-kakao.svg";

export default function Signin() {
  return (
    <AuthLayout
      bottomText="계정이 없으신가요?"
      bottomLinkText="회원가입 하기"
      bottomLinkTo="/signup"
    >
      <form className={styles.form}>
        
        <div className={styles.inputGroup}>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button type="submit" color="black" size="stretch">
            로그인
          </Button>
          
          <Button
            type="button"
            color="white"
            size="stretch"
            leftIcon={<img src={KakaoIcon} alt="카카오 로고" />}
          >
            kakao로 시작하기
          </Button>
        </div>
        
      </form>
    </AuthLayout>
  );
}