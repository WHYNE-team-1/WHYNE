import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AuthLayout from '@/components/layout/AuthLayout';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import styles from './index.module.css';
import KakaoIcon from '@/assets/icons/ic-kakao.svg';
import { apiFetch } from '@/apis/fetchClient';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

// 검사 규칙 생성
const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수 입력입니다.' })
    .email({ message: '이메일 형식으로 작성해 주세요.' }),
  password: z.string().min(1, { message: '비밀번호는 필수 입력입니다.' }),
});

// 생성한 스키마로 타입스크립트 타입 생성
type SigninFormValues = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // React Hook Form 세팅
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SigninFormValues) => {
    try {
      const result = await apiFetch('/auth/signIn', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      setLogin(result.user);

      navigate('/');
    } catch (error: any) {
      setError('email', {
        type: 'server',
        message: '이메일 혹은 비밀번호를 확인해주세요.',
      });
      setError('password', {
        type: 'server',
        message: '이메일 혹은 비밀번호를 확인해주세요.',
      });
    }
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 소셜 로그인 연동
  };

  return (
    <AuthLayout
      bottomText="계정이 없으신가요?"
      bottomLinkText="회원가입 하기"
      bottomLinkTo="/signup"
    >
      {/* 폼 제출 시 handleSubmit으로 검사한 뒤 통과 시에만 onSubmit 실행 */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register('email')}
            status={errors.email ? 'error' : 'default'}
            errorMessage={errors.email?.message}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password')}
            status={errors.password ? 'error' : 'default'}
            errorMessage={errors.password?.message}
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
            onClick={handleKakaoLogin}
          >
            kakao로 시작하기
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
