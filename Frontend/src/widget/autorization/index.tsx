import { Link } from "@tanstack/react-router";
import styles from "./style.module.scss";

export const Auth = () => {
  return (
    <div className={styles.Auth}>
      <h1 className={styles.AuthTitle}>Login</h1>
      <form action="" className={styles.AuthForm}>
        <input
          type="text"
          placeholder="Username"
          className={styles.AuthInput}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.AuthInput}
        />
        <button className={styles.AuthButton}>Login</button>
      </form>
      <Link to="/register" className={styles.AuthLink}>
        No account?Join us
      </Link>
    </div>
  );
};
