import ProfileSmall from "@/components/common/ProfileSmall";

// 프로파일 스몰 컴포넌트 스토리북 페이지
export default function ProfileSmallTestPage() {
  return (
    <div style={{ display: "grid", gap: 24, padding: 40 }}>
      <section>
        <h2>프로필 이미지 있음</h2>
        <ProfileSmall
          imageUrl="/assets/images/profile-01.jpg"
          nickname="주말에 와인"
          timeAgo="10"
        />
      </section>

      <section>
        <h2>디폴트 이미지(없음)</h2>
        <ProfileSmall imageUrl="" nickname="와인고르는 중" timeAgo="3" />
      </section>

      <section>
        <h2>닉네임 기본값</h2>
        <ProfileSmall timeAgo="1" />
      </section>

      <section>
        <h2>시간 다양한 케이스</h2>
        <ProfileSmall nickname="와인러버" timeAgo="  1" />
      </section>
    </div>
  );
}
