import { HeaderLinks } from "@/config/HeaderLinks";
import styles from "./style.module.scss";
import { Link } from "@tanstack/react-router";

export const HeaderDesktop = () => {
  return (
    <header className={styles.Header}>
      <ul className={styles.HeaderList}>
        {HeaderLinks.map((link) => (
          <li key={link.name} className={styles.HeaderItem}>
            <Link to={link.path} className={styles.HeaderLink}>
              <link.icon className={styles.HeaderIcon} />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};
