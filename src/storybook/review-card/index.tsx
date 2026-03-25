import ReviewCard from '@/components/common/ReviewCard'; // 경로 확인해주세요!

const sampleFlavorScores = {
  lightBold: 4,
  smoothTannic: 3,
  drySweet: 2,
  softAcidic: 1,
};

const sampleContent =
  '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요. 오크통 숙성에서 오는 은은한 바닐라와 초콜릿 향이 더해져 복합미가 뛰어납니다. 여운도 길고, 스테이크랑 정말 잘 어울렸습니다!';

const ReviewCardStorybook = () => {
  return (
    <div>
      <ReviewCard
        type="profile"
        isMyReview={true}
        rating={4.5}
        time="10시간 전"
        aromaTags={[]}
        content={sampleContent}
        flavorScores={sampleFlavorScores}
        likeCount={24}
        isLiked={false}
        wineImage="https://randomuser.me/api/portraits/women/44.jpg"
        wineName="Sentinel Cabernet Sauvignon 2016"
        wineRegion="Western Cape, South Africa"
        onEdit={() => alert('수정 클릭!')}
        onDelete={() => alert('삭제 클릭!')}
        onLike={() => alert('좋아요 클릭!')}
      />

      <ReviewCard
        type="detail"
        isMyReview={false}
        rating={4.0}
        time="3일 전"
        aromaTags={['체리', '오크', '카라멜', '시트러스', '꽃']}
        content={sampleContent}
        flavorScores={sampleFlavorScores}
        likeCount={156}
        isLiked={true}
        userImage="https://randomuser.me/api/portraits/women/44.jpg"
        userNickname="와인러버"
        onLike={() => alert('좋아요 클릭!')}
      />

      <ReviewCard
        type="detail"
        isMyReview={true}
        rating={5.0}
        time="방금 전"
        aromaTags={['자두', '바닐라']}
        content="내가 남긴 완벽한 리뷰입니다!"
        flavorScores={sampleFlavorScores}
        likeCount={0}
        isLiked={false}
        userImage="https://randomuser.me/api/portraits/women/44.jpg"
        userNickname="성준"
        onEdit={() => alert('수정')}
        onDelete={() => alert('삭제 ')}
        onLike={() => alert('좋아요 ')}
      />
    </div>
  );
};

export default ReviewCardStorybook;
