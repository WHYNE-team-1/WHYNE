import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiFetch } from '@/apis/fetchClient';
import { useAuthStore } from '@/store/useAuthStore';

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  const isRequesting = useRef(false);

  useEffect(() => {
    // 인가코드 가져오기
    const code = searchParams.get('code');

    // 코드가 없거나, 이미 API 요청 중이면 리턴
    if (!code || isRequesting.current) {
      return;
    }

    const processKakaoLogin = async () => {
      isRequesting.current = true; // 중복 요청 방지

      try {
        const response = await apiFetch('/auth/signIn/KAKAO', {
          method: 'POST',
          body: JSON.stringify({
            token: code,
            state: 'kakao',
            redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          }),
        });

        // 토큰정보와 유저정보 저장
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        setLogin(response.user);

        // 홈으로 보냄 (뒤로가기 방지 포함)
        navigate('/', { replace: true });
      } catch (error) {
        if (error instanceof Error) {
          console.error('로그인 실패:', error.message);
        } else {
          alert('로그인에 실패했습니다.');
          navigate('/signin', { replace: true });
        }
      }
    };

    processKakaoLogin();
  }, [searchParams, navigate, setLogin]);

  // 임시 로딩 화면
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2>카카오 로그인 처리 중입니다...</h2>
    </div>
  );
}
