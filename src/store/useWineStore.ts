import { create } from 'zustand';

// 와인 필터와 관련된 상태들의 타입 정의
interface WineFilterState {
  keyword: string; // 이름 검색어
  selectedTypes: string[]; // 선택된 와인 타입 리스트
  priceRange: number[]; // 가격 슬라이더 범위 [최소, 최대]
  selectedRatings: string[]; // 선택된 평점 구간 리스트

  // 상태를 변경하는 함수들
  setKeyword: (keyword: string) => void;
  setSelectedTypes: (types: string[]) => void;
  setPriceRange: (range: number[]) => void;
  setSelectedRatings: (ratings: string[]) => void;
  resetFilters: () => void; // 태블릿/모바일 필터 모달의 초기화 버튼용
}

export const useWineStore = create<WineFilterState>((set) => ({
  // 초기값 설정
  keyword: '',
  selectedTypes: [],
  priceRange: [0, 1000000],
  selectedRatings: ['전체'],

  // 상태 업데이트 로직 : 개별 필터 변경 시 호출
  setKeyword: (keyword) => set({ keyword }),
  setSelectedTypes: (selectedTypes) => set({ selectedTypes }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSelectedRatings: (selectedRatings) => set({ selectedRatings }),

  // 필터 초기화 : 모든 필터 상태를 리셋
  resetFilters: () =>
    set({
      keyword: '',
      selectedTypes: [],
      priceRange: [0, 1000000],
      selectedRatings: ['전체'],
    }),
}));
