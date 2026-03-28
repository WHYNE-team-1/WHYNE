import styles from './index.module.css';
export default function Loading() {
  return (
    <main className={styles.loadingWrap}>
      <div
        className={styles.loading}
        aria-busy="true"
        aria-label="Loading, please wait."
        data-text="WYHNE"
        role="progressbar"
      >
        <p className={styles.loadingSubTxt}>Please wait</p>
      </div>
    </main>
  );
}
