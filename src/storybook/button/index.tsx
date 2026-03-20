import LoginBtn from "@/components/common/button/LoginBtn";
import GoogleLoginBtn from "@/components/common/button/social-login/GoogleLoginBtn";
import KakaoLoginBtn from "@/components/common/button/social-login/KakaoLoginBtn";
import JoinBtn from "@/components/common/button/JoinBtn";
import ModalBtn from "@/components/common/button/Modal/ModalBtn";
import AddReviewBtn from "@/components/common/button/Modal/AddReviewBtn";
import XBtn from "@/components/common/button/IconBtn/XBtn";
import XBtn2 from "@/components/common/button/IconBtn/XBtn2";

export default function buttonPage() {
  return (
    <div>
      <GoogleLoginBtn size="L" />
      <KakaoLoginBtn size="L" />
      <GoogleLoginBtn size="S" />
      <KakaoLoginBtn size="S" />
      <LoginBtn />
      <JoinBtn />
      <AddReviewBtn />
      <ModalBtn variant="cancel">취소</ModalBtn>
      <ModalBtn variant="danger">삭제하기</ModalBtn>
      <ModalBtn variant="primary">변경하기</ModalBtn>
      <XBtn />
      <XBtn2 />
    </div>
  );
}
