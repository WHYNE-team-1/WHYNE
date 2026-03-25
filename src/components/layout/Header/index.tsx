import styles from './index.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import logoIcon from '@/assets/icons/ic-logo-white.svg';
import DefaultProfile from '@/assets/icons/ic-default-profile.svg';
import LinkButton from '@/components/common/LinkButton';
import Dropdown from '@/components/common/Dropdown';
import type { DropdownOption } from '@/components/common/Dropdown';

export default function Header() {
  const { isLoggedIn, user, setLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogout();
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const profileOptions: DropdownOption[] = [
    {
      label: '마이페이지',
      onClick: () => navigate('/'), // TODO: 경로 확정 시 추후 수정 필요
    },
    {
      label: '로그아웃',
      onClick: handleLogout,
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img src={logoIcon} alt="WHYNE 로고" className={styles.logo} />
        </Link>

        {isLoggedIn ? (
          <Dropdown
            trigger={
              <img
                src={user?.image || DefaultProfile}
                alt="프로필 메뉴 열기"
                className={styles.profileImage}
              />
            }
            options={profileOptions}
            offset={18}
          />
        ) : (
          <div className={styles.authButtons}>
            <LinkButton to="/signin" color="whiteLine" size="headerIcon">
              로그인
            </LinkButton>
            <LinkButton to="/signup" color="red" size="headerIcon">
              회원가입
            </LinkButton>
          </div>
        )}
      </div>
    </header>
  );
}
