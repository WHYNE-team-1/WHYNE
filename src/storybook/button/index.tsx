import LoginBtn from "@/components/common/button/loginBtn";
import GoogleLoginBtn from "@/components/common/button/social-login/GoogleLoginBtn";
import KakaoLoginBtn from "@/components/common/button/social-login/KakaoLoginBtn";
import JoinBtn from "@/components/common/button/joinBtn";
import AddReviewBtn from "@/components/common/button/AddReviewBtn";

export default function buttonPage() {
  return (
    <div>
      <GoogleLoginBtn />
      <KakaoLoginBtn />
      <GoogleLoginBtn size="S" />
      <KakaoLoginBtn size="S" />
      <LoginBtn />
      <JoinBtn />
      <AddReviewBtn />
    </div>
  );
}
