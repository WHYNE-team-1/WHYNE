import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routers/Router';
import { useAuthStore } from './store/useAuthStore';
import { apiFetch } from './apis/fetchClient';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);

  const redirectPath = useAuthStore((state) => state.redirectPath);
  const setRedirectPath = useAuthStore((state) => state.setRedirectPath);

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
      setRedirectPath(null);
    }
  }, [redirectPath, navigate, setRedirectPath]);

  useEffect(() => {
    // 토큰은 있는데, 새로고침해서 zustand의 user 정보 날아간 상태면
    if (isLoggedIn && !user) {
      const restoreUser = async () => {
        try {
          // 유저정보 요청해서 zustand에 다시 넣음
          const userData = await apiFetch('/users/me');

          setLogin(userData);
        } catch {
          setLogout();
        }
      };

      restoreUser();
    }
  }, [isLoggedIn, user, setLogin, setLogout]);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
