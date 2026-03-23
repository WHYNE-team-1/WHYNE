import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { apiFetch } from "@/apis/fetchClient";

export default function AuthTest() {
  // 상태 관리 훅
  const { isLoggedIn, user } = useAuthStore();
  const [apiResult, setApiResult] = useState<string>("API 테스트 대기 중...");

  // 통신 테스트 함수
  const handleApiTest = async () => {
    try {
      setApiResult("서버에 요청 중...");
      const data = await apiFetch("/users/me");
      setApiResult(JSON.stringify(data, null, 2));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiResult(`🚨 에러 발생: ${error.message}\n(F12를 눌러 로컬 스토리지에 accessToken이 있는지 또는 토큰이 만료되지 않았는지 확인하세요!)`);
      } else {
        setApiResult(`🚨 알 수 없는 에러가 발생했습니다.`);
      }
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>테스트 페이지</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* UI 마크업용 */}
        <div style={{ flex: 1, padding: "20px", border: "2px solid #aaa" }}>
          <h3>UI용 (Zustand 사용)</h3>
          <p>서버 통신 없이 useAuthStore의 목업 데이터로 UI를 그립니다.</p>
          <hr />
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img 
                src={user?.image || ""} 
                alt="프로필" 
                style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#ccc" }} 
              />
              <div>
                <strong>{user?.nickname}</strong> 님<br />
                <small>{user?.email}</small>
              </div>
            </div>
          ) : (
            <p>로그아웃 상태입니다.</p>
          )}
        </div>

        {/* API 연동용 */}
        <div style={{ flex: 1, padding: "20px", border: "2px solid #aaa" }}>
          <h3>API용 (fetchClient 사용)</h3>
          <p>로컬 스토리지에 토큰을 넣고 apiFetch로 진짜 데이터를 부릅니다.</p>
          <hr />
          <button 
            onClick={handleApiTest}
            style={{ padding: "8px 16px", cursor: "pointer", background: "#e0f0b3", border: "none", borderRadius: "4px" }}
          >
            데이터 가져오기 버튼
          </button>
          
          <pre style={{ background: "#222", color: "#0f0", padding: "10px", marginTop: "10px", borderRadius: "4px", overflowX: "auto", fontSize: "13px" }}>
            {apiResult}
          </pre>
        </div>

      </div>
    </div>
  );
}