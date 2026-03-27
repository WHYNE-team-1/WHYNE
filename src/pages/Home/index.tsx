import LinkButton from '@/components/common/LinkButton';
import styles from './index.module.css';
import logo from '@/assets/icons/ic-logo-white.svg';
import cn from 'classnames';
function Home() {
  return (
    <div className={styles.homeAllWrap}>
      <div className={styles.homeTop}>
        <div className={styles.txtWrap}>
          <p className={styles.bigTxt}>
            당신의 잔에 담긴 이야기,
            <br />
            <img src={logo} alt="WHYNE" />
            에서 완성하세요.
          </p>
          <p className={styles.smTxt}>
            수만 개의 진솔한 리뷰와 평점으로 실패 없는 와인 선택을 도와드립니다.
            <br />
            <b>나만의 인생 와인</b>을 찾고 기록해 보세요.
          </p>
          <LinkButton to="/wines" color="red" size="Wine">
            와인 보러가기
          </LinkButton>
        </div>
        <div className={styles.keyVisualImgWrap}>
          <img
            className={styles.keyVisualImg}
            src="/public/assets/images/img-keyVisual.png"
            alt=""
          />
        </div>
      </div>
      <div className={styles.homeBottom}>
        <div className={cn(styles.feat, styles.feat01)}>
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
              src="/public/assets/images/img-landing01.png"
              alt="직관적인 리뷰 시스템 이미지"
            />
          </div>
        </div>
        <div className={cn(styles.feat, styles.feat02)}>
          <div className={styles.imgWrap}>
            <img
              src="/public/assets/images/img-landing02.png"
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
        <div className={cn(styles.feat, styles.feat03)}>
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
              src="/public/assets/images/img-landing03.png"
              alt="새롭게 만나는 와인 추천 콘텐츠 이미지"
            />
          </div>
        </div>
        <LinkButton to="/wines" color="red" size="Wine">
          와인 보러가기
        </LinkButton>
      </div>
    </div>
  );
}

export default Home;
