import AuthLayout from '@/components/layout/AuthLayout';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import styles from './index.module.css';

export default function SignupPage() {
  return (
    <AuthLayout
      bottomText="계정이 이미 있으신가요?"
      bottomLinkText="로그인하기"
      bottomLinkTo="/signin"
    >
      <form className={styles.form}>
        <div className={styles.inputsGroup}>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
          <Input
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button type="submit" color="black" size="stretch">
            가입하기
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
