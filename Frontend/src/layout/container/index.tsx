import type { ReactNode } from "react";
import styles from "./style.module.scss";
import { Header } from "@/widget/Header";

type prop = {
  children: ReactNode;
};

export const ContainerLayout = ({ children }: prop) => {
  return <div className={styles.container}>
    <Header/>
    {children}
  </div>;
};
