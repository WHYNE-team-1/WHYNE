import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.css';
import WineTasteSlider from '@/components/common/WineTasteSlider';
import LikeButton from '@/components/common/LikeButton';
import Dropdown from '@/components/common/Dropdown';
import { ReviewAroma } from '@/components/common/Aroma';
import type { ReviewListItem } from '@/pages/WineDetail/WineDetail.types';
import ReviewModal from '@/components/ReviewModal';
import ConfirmModal from '../ModalConfirm';
import StarRatingBadge from '@/components/common/StarRatingBadge';
import IconArrowUp from '@/assets/icons/ic-arrow-up.svg';
import IconArrowDown from '@/assets/icons/ic-arrow-down.svg';

const cx = classNames.bind(styles);

interface User {
  id: number;
}

const FLAVOR_CONFIG = [
  { id: 'lightBold' },
  { id: 'smoothTannic' },
  { id: 'drySweet' },
  { id: 'softAcidic' },
] as const;

type FlavorId = (typeof FLAVOR_CONFIG)[number]['id'];

interface ReviewCardProps {
  loginUser: User;
  data: ReviewListItem;
  type: 'detail' | 'profile';
  isMyReview?: boolean;
  time?: string;
  flavorScores?: Record<FlavorId, number>;
  likeCount?: number;
  wineData: { id: number; name: string; image: string; region: string };
  onEdit?: () => void;
  onDelete?: () => void;
  onLike?: () => void;
}

export default function ReviewCard({
  loginUser,
  data,
  type,
  time,
  flavorScores,
  likeCount,
  wineData,
  onDelete,
  onEdit,
  onLike,
}: ReviewCardProps) {
  // 맛 슬라이더 펼치고 접는 스위치 (누가 구현했는지는 모르겠음)
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isMyReview = loginUser?.id === data.user?.id;
  const currentFlavorScores = flavorScores || {
    lightBold: data.lightBold || 0,
    smoothTannic: data.smoothTannic || 0,
    drySweet: data.drySweet || 0,
    softAcidic: data.softAcidic || 0,
  };
  // profile은 항상 슬라이더가 보이고, detail는 화살표를 눌렀을 때만 보임
  const showTasteSliders = type === 'profile' || isExpanded;

  // 드롭다운 메뉴 옵션
  const dropdownOptions = [
    { label: '수정하기', onClick: () => setIsOpen(true) },
    { label: '삭제하기', onClick: () => setIsConfirmOpen(true) },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cx('card')}>
        <div className={cx('header')}>
          <div className={cx('headerTopRow')}>
            {/* 뱃지 + 시간 */}
            <div className={cx('badgeGroup')}>
              <StarRatingBadge rating={data.rating} />
              {type === 'profile' && (
                <span className={cx('timeProfile')}>{time}</span>
              )}
            </div>

            {/* 드롭다운(점 3개) */}
            {isMyReview && (
              <Dropdown
                trigger={<span className={cx('kebabIcon')}>⋮</span>}
                options={dropdownOptions}
                offset={10}
              />
            )}
          </div>

          {type === 'profile' ? (
            // 마이페이지용 와인 정보 (수정해야함)
            <div className={cx('profileInfo')}>
              <img
                src={wineData.image}
                alt="와인"
                className={cx('wineImage')}
              />
              <div className={cx('textGroup')}>
                <h3 className={cx('wineName')}>{wineData.name}</h3>
                <p className={cx('wineRegion')}>{wineData.region}</p>
              </div>
            </div>
          ) : (
            // 상세페이지용 유저정보 + 시간  (수정해야함))
            <div className={cx('profileInfo')}>
              <img
                src={data.user.image || '/default-profile.png'}
                alt="프로필"
                className={cx('userImage')}
              />
              <div className={cx('textGroup')}>
                <span className={cx('nickname')}>{data.user.nickname}</span>
                <span className={cx('timeDetail')}>{time}</span>
              </div>
            </div>
          )}
        </div>

        <div className={cx('body')}>
          {/* 향 태그 detail에만 */}
          {data.aroma && data.aroma.length > 0 && (
            // <div className={cx('aromaTags')}>{aromaTags.join(' · ')}</div>
            <ReviewAroma selectedAromaIds={data.aroma} />
          )}

          <p className={cx('content')}>{data.content}</p>

          {/* 슬라이더 표시 로직  */}
          {showTasteSliders && (
            <div className={cx('tasteSliders')}>
              <WineTasteSlider readOnly initialScores={currentFlavorScores} />
            </div>
          )}
        </div>

        <div className={cx('footer', { detailFooter: type === 'detail' })}>
          <LikeButton
            initialLiked={data.isLiked}
            count={likeCount}
            size="md"
            /*  onClick={onLike}  나중에수정, 지금 오류남 */
          />

          {/* detail일 때만 더보기 화살표 */}
          {type === 'detail' && (
            <button
              className={cx('expandBtn')}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <img src={IconArrowUp} alt="접기" />
              ) : (
                <img src={IconArrowDown} alt="더보기" />
              )}
            </button>
          )}
        </div>
      </div>
      <ReviewModal
        type="edit" // mode → type으로 수정
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
        title="리뷰 수정"
        wineData={wineData} // 그대로 내려줌
        reviewData={data}
        onSuccess={() => onEdit?.()} // 수정 후 목록 갱신용, 부모에서 onEdit 콜백 받아서 쓰는 게 더 좋음
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={async () => {
          await onDelete?.();
          setIsConfirmOpen(false);
        }}
        title="정말 리뷰를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
