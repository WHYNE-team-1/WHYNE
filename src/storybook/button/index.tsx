import GoogleLoginBtn from "@/components/common/button/social-login/GoogleLoginBtn";
import KakaoLoginBtn from "@/components/common/button/social-login/KakaoLoginBtn";
export default function buttonPage() {
  return (
    <div>
      <GoogleLoginBtn />
      <KakaoLoginBtn />
      <GoogleLoginBtn size="S" />
      <KakaoLoginBtn size="S" />
    </div>
  );
}
