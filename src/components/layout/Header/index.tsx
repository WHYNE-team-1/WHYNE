import styles from "./index.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.headerWrap}>
        <h1 className={styles.logo}>헤더헤더</h1>
      </nav>
    </header>
  );
}
export default Header;
