/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../styles/footer.module.css";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.content}></div>
    </footer>
  );
}
