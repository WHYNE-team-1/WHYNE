import WineType from "@/components/common/WineType";
import { WINE_TYPE_KEYS, type WineTypeKind } from "@/constants/WineType.constants";
import { useState } from "react";

export default function WineTypeTestPage() {
  const [selectedType, setSelectedType] = useState<WineTypeKind | null>(null);

  return (
    <div>
      <h1>WineType 컴포넌트 테스트</h1>
      <h2>컴포넌트의 두가지 모드를 이런식으로 사용하시면 됩니다.</h2>
      <div>
        <h2 style={{ margin: '16px' }}>상세 페이지용 - 칩 모드</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          {WINE_TYPE_KEYS.map((type) => (
            <WineType key={type} type={type} isReadOnly />
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ margin: '16px' }}>등록 페이지용 - 라디오 버튼 모드</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          {WINE_TYPE_KEYS.map((type) => (
            <WineType
              key={type}
              type={type}
              isSelected={selectedType === type}
              onSelect={setSelectedType}
            />
          ))}
        </div>

        <p style={{ margin: '16px', fontSize: '14px' }}>
          데이터 전송 결과 : 
          <span>
            {selectedType ? `${selectedType} 선택됨` : '선택 안함'}
          </span>
        </p>

      </div>
    </div>
  );
}