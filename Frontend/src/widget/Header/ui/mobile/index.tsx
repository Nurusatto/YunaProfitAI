import { Link } from "@tanstack/react-router";
import styles from "./style.module.scss";
import { HeaderLinks } from "@/config/HeaderLinks";
import clsx from "clsx";
import { useState } from "react";

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.Header}>
      <div className={`${styles.HeaderInner} container`}>
        <button
          type="button"
          className={styles.HeaderBurger}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span
            className={clsx(styles.HeaderBurgerLine, open && styles.isActive)}
          ></span>
          <span
            className={clsx(styles.HeaderBurgerLine, open && styles.isActive)}
          ></span>
          <span
            className={clsx(styles.HeaderBurgerLine, open && styles.isActive)}
          ></span>
        </button>
        <ul className={clsx(styles.HeaderList, open && styles.isActive)}>
          {HeaderLinks.map((link) => (
            <li key={link.name} className={styles.HeaderItem}>
              <Link to={link.path} className={styles.HeaderLink}>
                <link.icon className={styles.HeaderIcon} />
                <h1>{link.name}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
