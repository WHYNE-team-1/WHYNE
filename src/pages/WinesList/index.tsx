import WineListCard from '@/components/list/WineListCard';

const MOCK_WINE = {
  id: 1,
  name: 'Sentinel Carbernet Sauvignon 2016',
  imageUrl: '/assets/images/profile-01.jpg',
  rating: 4.5,
  reviewCount: 47,
  type: 'RED' as const,
  price: 55000,
  latestReview: {
    content:
      '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요. 입 안을 가득 채우는 묵직한 바디감과 함께, 오미자',
  },
};

function WinesList() {
  return (
    <div>
      와인 리스트
      <WineListCard {...MOCK_WINE} />
    </div>
  );
}

export default WinesList;
