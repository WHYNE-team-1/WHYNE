import { Outlet } from 'react-router-dom';
import styles from './index.module.css';
import Header from '@/components/layout/Header';

function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.contentWrap}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
