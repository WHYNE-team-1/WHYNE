import redWineIcon from '@/assets/icons/ic-wine-red.svg';
import whiteWineIcon from '@/assets/icons/ic-wine-white.svg';
import sparklingWineIcon from '@/assets/icons/ic-wine-sparkling.svg';

// 와인 타입 별 데이터 객체
// 화면에 표시할 라벨, 아이콘 이미지
export const WINE_TYPES = {
  RED: { 
    label: 'Red', 
    image: redWineIcon,
  },
  WHITE: { 
    label: 'White', 
    image: whiteWineIcon,
  },
  SPARKLING: { 
    label: 'Sparkling', 
    image: sparklingWineIcon,
  },
} as const; // 'as const'를 붙여주면 '상수'임을 확실히 하며 타입 추론이 더 잘 됨.

// 와인 타입(Key)들만 모아놓은 배열
// map()을 돌리기 위함.
export const WINE_TYPE_KEYS = Object.keys(WINE_TYPES) as WineTypeKind[]; // 'as WineTypeKind[]'를 통해 '와인 타입 배열'임을 명시함.

// 와인 타입(Key)에 대한 타입 정의
// WINE_TYPES 객체의 키값들을 추출하여 타입으로 만듦.
export type WineTypeKind = keyof typeof WINE_TYPES;