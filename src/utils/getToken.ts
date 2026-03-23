export const getToken = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return null;

  try {
    const data = JSON.parse(auth);
    // data.accessToken이 실제 문자열인지, 혹시 객체인지 확인
    return data.accessToken || null;
  } catch (error) {
    console.error("토큰 파싱 실패:", error);
    return null;
  }
};
