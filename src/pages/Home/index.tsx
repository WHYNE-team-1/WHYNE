import LinkButton from '@/components/common/LinkButton';
import styles from './index.module.css';
import logo from '@/assets/icons/ic-logo-white.svg';
import cn from 'classnames';
import { useScrollAnimate } from '@/hooks/useScrollAnimate.ts';
function Home() {
  const bigTxtRef = useScrollAnimate<HTMLParagraphElement>({
    inAnimation: { opacity: [0, 1] },
    outAnimation: { opacity: 0 },
    inDuration: 1500,
  });
  const smTxtRef = useScrollAnimate<HTMLParagraphElement>({
    inAnimation: { opacity: [0, 1] },
    outAnimation: { opacity: 0 },
    inDelay: 400,
    inDuration: 1500,
  });
  const topBtnRef = useScrollAnimate<HTMLDivElement>({
    inAnimation: { opacity: [0, 1] },
    outAnimation: { opacity: 0 },
    inDelay: 800,
    inDuration: 1500,
  });

  // ---- feat 섹션 ref (오른쪽/왼쪽/오른쪽에서 등장) ----
  const feat01Ref = useScrollAnimate<HTMLDivElement>({
    inAnimation: { opacity: [0, 1], translateX: [80, 0] }, // 오른쪽에서 들어옴
    outAnimation: { opacity: 0, translateX: 80 }, // 오른쪽으로 나감
  });

  const feat02Ref = useScrollAnimate<HTMLDivElement>({
    inAnimation: { opacity: [0, 1], translateX: [-80, 0] }, // 왼쪽에서 들어옴
    outAnimation: { opacity: 0, translateX: -80 }, // 왼쪽으로 나감
  });

  const feat03Ref = useScrollAnimate<HTMLDivElement>({
    inAnimation: { opacity: [0, 1], translateX: [80, 0] }, // 오른쪽에서 들어옴
    outAnimation: { opacity: 0, translateX: 80 }, // 오른쪽으로 나감
  });

  // ---- 하단 버튼 ref (fade only) ----
  const bottomBtnRef = useScrollAnimate<HTMLDivElement>({
    inAnimation: { opacity: [0, 1], translateY: [30, 0] }, // 아래에서 올라옴
    outAnimation: { opacity: 0, translateY: 30 }, // 아래로 내려감
  });

  return (
    <div className={styles.homeAllWrap}>
      <div className={styles.homeTop}>
        <div className={styles.txtWrap}>
          {/* opacity 0으로 시작, useEffect에서 애니메이션 */}
          <p ref={bigTxtRef} className={styles.bigTxt} style={{ opacity: 0 }}>
            당신의 잔에 담긴 이야기,
            <br />
            <img src={logo} alt="WHYNE" />
            에서 완성하세요.
          </p>
          <p ref={smTxtRef} className={styles.smTxt} style={{ opacity: 0 }}>
            수만 개의 진솔한 리뷰와 평점으로 실패 없는 와인 선택을 도와드립니다.
            <br />
            <b>나만의 인생 와인</b>을 찾고 기록해 보세요.
          </p>
          <div ref={topBtnRef} style={{ opacity: 0 }}>
            <LinkButton to="/wines" color="red" size="Wine">
              와인 보러가기
            </LinkButton>
          </div>
        </div>
        <div className={styles.keyVisualImgWrap}>
          <img
            className={styles.keyVisualImg}
            src="/assets/images/img-keyVisual.png"
            alt=""
          />
        </div>
      </div>

      <div className={styles.homeBottom}>
        {/* feat01 - 오른쪽에서 등장 */}
        <div
          ref={feat01Ref}
          className={cn(styles.feat, styles.feat01)}
          style={{ opacity: 0 }}
        >
          <div className={styles.txtwrap}>
            <p className={styles.mainTxt}>
              직관적인
              <br />
              리뷰 시스템
            </p>
            <p className={styles.subTxt}>
              더 구체화된 리뷰 시스템으로
              <br />
              쉽고 빠르게 와인 리뷰를 살펴보세요.
            </p>
          </div>
          <div className={styles.imgWrap}>
            <img
              src="/assets/images/img-landing01.png"
              alt="직관적인 리뷰 시스템 이미지"
            />
          </div>
        </div>

        {/* feat02 - 왼쪽에서 등장 */}
        <div
          ref={feat02Ref}
          className={cn(styles.feat, styles.feat02)}
          style={{ opacity: 0 }}
        >
          <div className={styles.imgWrap}>
            <img
              src="/assets/images/img-landing02.png"
              alt="다양한 필터 이미지"
            />
          </div>
          <div className={styles.txtwrap}>
            <p className={styles.mainTxt}>
              다양한 필터로 찾는
              <br />내 맞춤 와인
            </p>
            <p className={styles.subTxt}>
              와인 타입, 가격, 평점으로
              <br />
              나에게 맞는 와인을 쉽게 검색해요.
            </p>
          </div>
        </div>

        {/* feat03 - 오른쪽에서 등장 */}
        <div
          ref={feat03Ref}
          className={cn(styles.feat, styles.feat03)}
          style={{ opacity: 0 }}
        >
          <div className={styles.txtwrap}>
            <p className={styles.mainTxt}>
              매달 새롭게 만나는
              <br />
              와인 추천 콘텐츠
            </p>
            <p className={styles.subTxt}>매달 다양한 인기 와인을 만나보세요.</p>
          </div>
          <div className={styles.imgWrap}>
            <img
              src="/assets/images/img-landing03.png"
              alt="새롭게 만나는 와인 추천 콘텐츠 이미지"
            />
          </div>
        </div>

        {/* 하단 버튼 - 아래에서 올라옴 */}
        <div ref={bottomBtnRef} style={{ opacity: 0 }}>
          <LinkButton to="/wines" color="red" size="Wine">
            와인 보러가기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Home;
