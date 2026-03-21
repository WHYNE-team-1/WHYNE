import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.css';

const cx = classNames.bind(styles);

const FLAVOR_CONFIG = [
  { id: 'body', label: '바디감', descL: '가벼워요', descR: '진해요' },
  { id: 'tannin', label: '탄닌', descL: '부드러워요', descR: '떫어요' },
  { id: 'sweetness', label: '당도', descL: '드라이해요', descR: '달아요' },
  { id: 'acidity', label: '산미', descL: '안셔요', descR: '많이셔요' },
] as const;

type FlavorId = (typeof FLAVOR_CONFIG)[number]['id'];

const MAX_LEVEL = 6;


// 외부로부터 받을 수 있는 설정값들의 목록을 정의
interface WineTasteSliderProps {
  // 배치 스타일 (Layout Variant)
  // 'row'(가로, 기본값) | 'stacked'(라벨이 위에 있는 세로형, 피그마 Row 1 우측) | 'compact'(라벨과 슬라이더만 있는 형태, 맨 아랫줄)
  variant?: 'row' | 'stacked' | 'compact';

  // 라벨 스타일 (Label Style)
  // 'box'(회색 박스 배경, 기본값) | 'text'(텍스트만 있는 형태, 피그마 Row 1 좌측)
  labelStyle?: 'box' | 'text';

  // 상태 제어
  readOnly?: boolean; // true면 사용자가 클릭못함 
  
  // 데이터
  // initialScores: 처음에 보여줄 점수들 (readOnly일 때 필수)
  initialScores?: Record<FlavorId, number>; 

  onChange?: (scores: Record<FlavorId, number>) => void; // 점수가 바뀔 때 실행
}


const WineTasteSlider: React.FC<WineTasteSliderProps> = ({
  variant = 'row', // 기본값은 가로형
  labelStyle = 'box', // 기본값은 박스 스타일
  readOnly = false, // 기본은 클릭 가능
  initialScores, // 상세페이지 등에서 전달받은 초기값
  onChange,
}) => {
  
  const DEFAULT_SCORES: Record<FlavorId, number> = { body: 0, tannin: 0, sweetness: 0, acidity: 0 };

  // 상태 관리: 만약 initialScores가 Props로 들어왔다면 그걸 쓰고, 없으면 기본값 0을 씁니다.
  const [flavorScores, setFlavorScores] = useState<Record<FlavorId, number>>(
    initialScores || DEFAULT_SCORES
  );

  const handleScoreChange = (flavorId: FlavorId, score: number) => {
    //  만약 읽기 전용 모드라면 점수를 바꾸지 않고 함수를 끝냅니다.
    if (readOnly) return;

    const newScores = {
      ...flavorScores,
      [flavorId]: score,
    };
    setFlavorScores(newScores);

    if (onChange) {
      onChange(newScores);
    }
  };

  return (
    // classNames/bind (cx)를 사용해서 Props 값에 따라 CSS 클래스를 동적으로 붙여줍니다.
    // variant, labelStyle 값이 그대로 클래스명이 됩니다. 예: styles.row, styles.box, styles.readOnly
    <div className={cx('container', variant, { readOnly: readOnly })}>
      
      {FLAVOR_CONFIG.map((item) => (
        <div key={item.id} className={styles.sliderRow}>
          
          {/* 라벨 섹션 (variant가 compact일 때는 라벨의 형태가 또 다를 수 있으니 variant 클래스도 같이 붙여줍니다.) */}
          <div className={cx('labelSection', labelStyle, variant)}>
            <span className={styles.mainLabel}>{item.label}</span>
          </div>

          {/* 왼쪽 설명 (compact형일 때는 안 보여줍니다.) */}
          {variant !== 'compact' && (
            <span className={cx('descText', 'descL')}>{item.descL}</span>
          )}

          {/* 슬라이더 트랙 */}
          <div className={cx('sliderTrack', variant)}>
            {[...Array(MAX_LEVEL)].map((_, index) => {
              const currentSegmentScore = index + 1;

              return (
                <div
                  key={currentSegmentScore}
                  className={cx('segment', {
                    filled: currentSegmentScore <= flavorScores[item.id],
                  })}
                  // 클릭 이벤트 핸들러는 readOnly가 false일 때만 작동하도록 위에서 처리
                  onClick={() => handleScoreChange(item.id, currentSegmentScore)}
                />
              );
            })}
          </div>

          {/* 오른쪽설명 (compact형일 때는 안 보여줌) */}
          {variant !== 'compact' && (
            <span className={cx('descText', 'descR')}>{item.descR}</span>
          )}
          
        </div>
      ))}
    </div>
  );
};

export default WineTasteSlider;