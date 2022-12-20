import { ReactNode } from "react";

import styles from "../styles/mainContainer.module.css";

export default function MainContainer({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
