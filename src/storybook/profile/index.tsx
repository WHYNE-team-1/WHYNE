import { useState } from "react";
import ProFile from "@/components/common/ProFile";

// 프로파일 컴포넌트 스토리북 페이지
export default function ProFileTestPage() {
  const [image, setImage] = useState(""); // 초기값을 빈 문자열로 설정 (디폴트 이미지 노출)
  const [nickname, setNickname] = useState("주말에 와인");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (imageUrl: string, file?: File) => {
    setImage(imageUrl);
    console.log("이미지 변경됨:", { imageUrl, fileName: file?.name });
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
    console.log("닉네임 변경:", newNickname);
  };

  const handleSave = async () => {
    setIsLoading(true);
    // API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("저장됨:", { nickname, image });
    setIsLoading(false);
  };

  return (
    <div>
      <section>
        <h2>이벤트 핸들러 포함 (인터랙티브)</h2>
        <ProFile
          imageUrl={image}
          nickname={nickname}
          onImageChange={handleImageChange}
          onNicknameChange={handleNicknameChange}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </section>

      <section>
        <h2>읽기 전용 (핸들러 없음)</h2>
        <ProFile imageUrl="" nickname="와인고르는 중" />
      </section>

      <section>
        <h2>현재 상태</h2>
        <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px" }}>
          {JSON.stringify({ nickname, hasImage: !!image, isLoading }, null, 2)}
        </pre>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          💡 콘솔(F12)에서 이미지/닉네임 변경, 저장 로그를 확인할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
