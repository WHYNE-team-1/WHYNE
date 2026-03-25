// pages/storybook/wine-taste-slider/index.tsx
import WineTasteSlider from '@/components/common/WineTasteSlider';

const sampleScores = {
  lightBold: 4,
  smoothTannic: 3,
  drySweet: 2,
  softAcidic: 5,
};

const WineTasteSliderStorybook = () => {
  return (
    <div>
      {/* 리뷰카드 부분 (그리드) */}
      <WineTasteSlider
        initialScores={sampleScores}
        variant="grid"
        labelStyle="box"
        hideLeftDesc={true}
        hideSeparator={true}
      />

      <div style={{ height: '100px' }} />

      {/* 리뷰등록 모달부분  */}
      <WineTasteSlider
        initialScores={sampleScores}
        readOnly
        variant="row"
        labelStyle="text"
      />

      <div style={{ height: '100px' }} />

      {/* 와인상세페이지 / 어떤맛이나나요? 부분 */}
      <WineTasteSlider
        initialScores={sampleScores}
        readOnly
        variant="row"
        labelStyle="box"
        hideLeftDesc={true}
      />

      <div style={{ height: '100px' }} />
      {/* 리뷰카드 부분 모바일 */}
      <WineTasteSlider
        initialScores={sampleScores}
        readOnly
        variant="row"
        labelStyle="box"
        hideLeftDesc={true}
        hideSeparator={true}
      />

      <div style={{ height: '50px' }} />
    </div>
  );
};

export default WineTasteSliderStorybook;
