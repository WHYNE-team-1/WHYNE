import ProFile from "@/components/common/ProFile";

// 프로파일 컴포넌트 스토리북 페이지
export default function ProFileTestPage() {
  return (
    <div>
      <section>
        <h2>프로필 이미지 있음</h2>
        <ProFile
          imageUrl="/assets/images/profile-01.jpg"
          nickname="주말에 와인"
        />
      </section>

      <section>
        <h2>디폴트 이미지(없음)</h2>
        <ProFile imageUrl="" nickname="와인고르는 중" />
      </section>
    </div>
  );
}
