import AuthLayout from "@/components/layout/AuthLayout";

export default function Signup() {
  return (
    <AuthLayout
      bottomText="계정이 이미 있으신가요?"
      bottomLinkText="로그인 하기"
      bottomLinkTo="/signin"
    >
      <div style={{ padding: "50px", textAlign: "center", backgroundColor: "#ffebee" }}>
        회원가입 폼 들어갈 자리
      </div>
    </AuthLayout>
  );
}