import Button from '@/components/common/Button';
import styles from './index.module.css';
import googleIcon from '@/assets/icons/ic-google.svg';
import kakaoIcon from '@/assets/icons/ic-kakao.svg';
import leftWhite from '@/assets/icons/ic-arrow-left-white.svg';
import rightWhite from '@/assets/icons/ic-arrow-right-white.svg';
import leftBlack from '@/assets/icons/ic-arrow-left-black.svg';
import rightBlack from '@/assets/icons/ic-arrow-right-black.svg';
import filter from '@/assets/icons/ic-filter.svg';
import X from '@/assets/icons/X.svg';
import ic_X from '@/assets/icons/ic_X.svg';
import hamburger from '@/assets/icons/ic-hamburger.svg';
import arrowDown from '@/assets/icons/ic-arrow-down.svg';
import arrowUp from '@/assets/icons/ic-arrow-up.svg';
import cameraIcon from '@/assets/icons/ic-camera.svg';
import profile from '@/assets/icons/ic-default-profile.svg';
import noProfile from '@/assets/icons/ic-no-profile.svg';
import LikeButton from '@/components/common/LikeButton';

export default function buttonPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.page}>Button Storybook</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>소셜 로그인 버튼</h2>
        <div className={styles.row}>
          {/*구글로 가입하기 */}
          <Button
            leftIcon={<img src={googleIcon} alt="Google" />}
            color="white"
            size="md"
          >
            Google로 시작하기
          </Button>

          {/*카카오로 가입하기*/}
          <Button
            leftIcon={<img src={kakaoIcon} alt="Kakao" />}
            color="white"
            size="sm"
          >
            Kakao로 시작하기
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          {/*와인 등록하기*/}
          <Button color="black" size="stretch" type="submit">
            와인 등록하기
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          {/*변경하기 작은버튼*/}
          <Button color="black" size="BtnS">
            변경하기
          </Button>

          {/*변경하기, 취소*/}
          <Button color="black" size="Btn">
            변경하기
          </Button>
          <Button color="white" size="Btn">
            취소
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          {/*리뷰 남기기*/}
          <Button color="black" size="Review">
            리뷰 남기기
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          <Button color="black" size="joinM">
            가입하기
          </Button>
          <Button color="red" size="joinM">
            가입하기
          </Button>
          <Button color="charcoal" size="joinM">
            가입하기
          </Button>
          <Button color="white" size="joinS">
            가입하기
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          <Button
            size="iconBtn"
            color="charcoal"
            className="icon"
            leftIcon={<img src={leftWhite} alt="leftWhite" />}
          />
          <Button
            size="iconBtn"
            color="charcoal"
            className="icon"
            leftIcon={<img src={rightWhite} alt="rightWhite" />}
          />
          <Button
            size="iconBtn"
            color="white"
            className="icon"
            leftIcon={<img src={leftBlack} alt="leftBlack" />}
          />
          <Button
            size="iconBtn"
            color="white"
            className="icon"
            leftIcon={<img src={rightBlack} alt="rightBlack" />}
          />
          <Button
            size="iconBtn"
            color="gray"
            className="icon"
            leftIcon={<img src={leftBlack} alt="leftBlack" />}
          />
          <Button
            size="iconBtn"
            color="gray"
            className="icon"
            leftIcon={<img src={rightBlack} alt="rightBlack" />}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          <Button
            size="iconBtn"
            color="white"
            className="icon"
            leftIcon={<img src={filter} alt="filter" />}
          />
          <Button
            size="x-icon"
            color="gray2"
            leftIcon={<img src={ic_X} alt="ic_X" />}
          />
          <Button size="X" color="pure" leftIcon={<img src={X} alt="X" />} />
          <Button
            size="hamburger"
            color="pure"
            leftIcon={<img src={hamburger} alt="menu" />}
          />
          <Button
            size="upDown"
            color="pure"
            leftIcon={<img src={arrowDown} alt="arrowDown" />}
          />
          <Button
            size="upDown"
            color="pure"
            leftIcon={<img src={arrowUp} alt="arrowUp" />}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          <Button size="image" color="pureLine">
            <img src={cameraIcon} />
          </Button>

          <Button size="profile">
            <img src={profile}></img>
          </Button>

          <Button size="noProfile" color="pure">
            <img src={noProfile}></img>
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}>
          <LikeButton size="md" />
          <LikeButton size="sm" />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.row}></div>
      </section>
    </div>
  );
}
