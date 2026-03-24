import AuthLayout from "@/components/layout/AuthLayout";

export default function Signin() {
  return (
    <AuthLayout
      bottomText="계정이 없으신가요?"
      bottomLinkText="회원가입 하기"
      bottomLinkTo="/signup"
    >
      <div style={{ padding: "50px", textAlign: "center", backgroundColor: "#ffebee" }}>
        로그인 폼 들어갈 자리
      </div>
    </AuthLayout>
  );
}