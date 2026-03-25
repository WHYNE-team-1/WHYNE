import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import logoBlackIcon from '@/assets/icons/ic-logo-black.svg';

interface AuthLayoutProps {
  children: ReactNode;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkTo: string;
}

export default function AuthLayout({
  children,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
}: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoWrapper}>
          <img src={logoBlackIcon} alt="WHYNE 로고" className={styles.logo} />
        </Link>

        <div className={styles.content}>{children}</div>

        <div className={styles.bottom}>
          <span className={styles.bottomText}>{bottomText}</span>
          <Link to={bottomLinkTo} className={styles.link}>
            {bottomLinkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
