import styles from "./style.module.scss";
import type { ReactNode } from "react";

type prop = {
  children: ReactNode;
};

export const MainLayout = ({ children }: prop) => {
  return <div className={styles.MainLayout}>{children}</div>;
};
