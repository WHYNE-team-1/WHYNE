import WineType from "@/components/common/WineType";
import type { WineTypeKind } from "@/constants/WineType.constants";
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
          <WineType type="RED" isReadOnly />
          <WineType type="WHITE" isReadOnly />
          <WineType type="SPARKLING" isReadOnly />
        </div>
      </div>

      <div>
        <h2 style={{ margin: '16px' }}>등록 페이지용 - 라디오 버튼 모드</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <WineType 
            type="RED" 
            isSelected={selectedType === 'RED'} 
            onSelect={(type) => setSelectedType(type)}
          />
          
          <WineType 
            type="WHITE" 
            isSelected={selectedType === 'WHITE'} 
            onSelect={(type) => setSelectedType(type)} 
          />
          
          <WineType 
            type="SPARKLING" 
            isSelected={selectedType === 'SPARKLING'} 
            onSelect={(type) => setSelectedType(type)} 
          />
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