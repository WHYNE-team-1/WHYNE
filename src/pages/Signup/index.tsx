import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { apiFetch } from '@/apis/fetchClient';
import AuthLayout from '@/components/layout/AuthLayout';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

// 검사 규칙 생성
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일은 필수 입력입니다.' })
      .email({ message: '이메일 형식으로 작성해 주세요.' }),
    nickname: z
      .string()
      .min(1, { message: '닉네임은 필수 입력입니다.' })
      .max(20, { message: '닉네임은 최대 20자까지 가능합니다.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호는 필수 입력입니다.' })
      .min(8, { message: '비밀번호는 최소 8자 이상입니다.' })
      .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, {
        message: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
      }),
    passwordConfirm: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

// 생성한 스키마로 타입스크립트 타입 생성
type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const result = await apiFetch('/auth/signUp', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          nickname: data.nickname,
          password: data.password,
          passwordConfirmation: data.passwordConfirm,
        }),
      });

      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      setLogin(result.user);

      navigate('/');
    } catch (error: any) {
      const errorMessage = error.message;

      if (errorMessage.includes('이메일')) {
        setError('email', {
          type: 'server',
          message: errorMessage,
        });
      } else if (errorMessage.includes('닉네임')) {
        setError('nickname', {
          type: 'server',
          message: errorMessage,
        });
      }
    }
  };

  return (
    <AuthLayout
      bottomText="계정이 이미 있으신가요?"
      bottomLinkText="로그인하기"
      bottomLinkTo="/signin"
    >
      {/* 폼 제출 시 handleSubmit으로 검사한 뒤 통과 시에만 onSubmit 실행 */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsGroup}>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register('email')}
            status={errors.email ? 'error' : 'default'}
            errorMessage={errors.email?.message}
          />
          <Input
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요"
            {...register('nickname')}
            status={errors.nickname ? 'error' : 'default'}
            errorMessage={errors.nickname?.message}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
            {...register('password')}
            status={errors.password ? 'error' : 'default'}
            errorMessage={errors.password?.message}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            {...register('passwordConfirm')}
            status={errors.passwordConfirm ? 'error' : 'default'}
            errorMessage={errors.passwordConfirm?.message}
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
