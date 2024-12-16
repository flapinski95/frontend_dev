import styles from "./page.module.css"; // Import pliku CSS (CSS Modules)

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>{children}</body>
    </html>
  );
}
