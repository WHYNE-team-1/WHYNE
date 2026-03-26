import styles from './index.module.css';
import React from 'react';
/*
variant:
[social-login] 구글로 시작하기, 카카오로 시작하기 (sm, md,) (white)
[모달] 와인 등록하기(black)(stretch)
[] 변경하기(black)(BtnS)
[Btn] 취소, 변경하기(white, black) (Btn)
[] 리뷰 남기기(black) (review)
[] 가입하기(black, red, charcoal) (joinM)
  가입하기(white) (joinS)

[아이콘 버튼] x버튼, 좌우 화살표 버튼, 더보기(...)버튼, 필터 버튼 
[프로필 사진 추가 버튼] 카메라 버튼
[와인 사진 추가 버튼] 카메라 버튼
*/

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'danger' | 'cancel' | 'primary';
  color?:
    | 'black'
    | 'red'
    | 'white'
    | 'charcoal'
    | 'gray'
    | 'gray2'
    | 'pure'
    | 'pureLine';
  size?:
    | 'stretch'
    | 'sm'
    | 'md'
    | 'Btn'
    | 'BtnS'
    | 'Review'
    | 'joinM'
    | 'joinS'
    | 'iconBtn'
    | 'x-icon'
    | 'X'
    | 'hamburger'
    | 'upDown'
    | 'image'
    | 'profile'
    | 'noProfile'
    | 'wineTypeSelect'
    | 'wineAddRed';
  leftIcon?: React.ReactNode;
  className?: string;
  form?: string;
};

export default function Button({
  children,
  onClick,
  disabled = false,
  type = 'button',
  color = 'black',
  size = 'md',
  leftIcon,
  className = '',
  form = '',
}: Props) {
  const mergedClassName = `
    ${styles.button}
    ${styles[color]}
    ${styles[size]}
    ${className}
  `;

  return (
    <button
      type={type}
      className={mergedClassName}
      onClick={onClick}
      disabled={disabled}
      form={form}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
}
