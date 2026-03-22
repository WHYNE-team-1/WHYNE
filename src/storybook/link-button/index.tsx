import styles from "./index.module.css";
import LinkButton from "@/components/common/LinkButton";

export default function linkButtonPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.page}>Link Button Storybook</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>모달</h2>
        <div className={styles.row}>
          <LinkButton to="/" color="black" size="stretch">
            리뷰 남기기
          </LinkButton>

          <LinkButton to="/" color="black" size="stretch">
            변경하기
          </LinkButton>

          <LinkButton to="/" color="black" size="stretch">
            삭제하기
          </LinkButton>

          <LinkButton to="/" color="white" size="stretch">
            취소
          </LinkButton>
        </div>
      </section>

      <section className={styles.section}>
        <LinkButton to="/" color="red" size="Wine">
          와인 보러가기
        </LinkButton>
      </section>

      <section className={styles.section2}>
        <h2 className={styles.sectionTitle2}>헤더</h2>
        <LinkButton to="/" color="red" size="headerIcon">
          회원가입
        </LinkButton>

        <LinkButton to="/" color="whiteLine" size="headerIcon">
          로그인
        </LinkButton>
      </section>

      <section className={styles.section}>
        <LinkButton to="/" color="red" size="joinM">
          가입하기
        </LinkButton>

        <LinkButton to="/" color="black" size="joinM">
          가입하기
        </LinkButton>

        <LinkButton to="/" color="charcoal" size="joinM">
          가입하기
        </LinkButton>

        <LinkButton to="/" color="white" size="joinS">
          가입하기
        </LinkButton>
      </section>
    </div>
  );
}
