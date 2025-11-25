import { Link, useNavigate } from "@tanstack/react-router";
import styles from "./style.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/shared/schema/login";
import type { authType } from "./model/type";
import { useLogin } from "@/widget/autorization/model/query";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";

export const Auth = () => {
  const { mutate } = useLogin();
  const [alert, setAlert] = useState("");
  const navigate = useNavigate({ from: "/auth" });
  const setInitial = useUserStore((state) => state.setIsInitialized);
  const setToken = useUserStore((s) => s.setAccessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: authType) =>
    mutate(data, {
      onSuccess: (data) => {
        console.log(data, "succes");
        setInitial(true);
        setToken(data.accessToken);
        setTimeout(() => navigate({ to: "/" }), 1);
      },
      onError: (data) => {
        setAlert(data.response?.data?.message || "Something went wrong");
      },
    });

  return (
    <div className={styles.Auth}>
      <h1 className={styles.AuthTitle}>Login</h1>
      <form className={styles.AuthForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Почта"
          className={styles.AuthInput}
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.AuthInput}
          {...register("password")}
        />
        <div className={styles.AuthAlert}>
          {alert && <span className={styles.AuthError}>{alert}</span>}
          {errors.email && (
            <span className={styles.AuthError}>{errors.email.message}</span>
          )}
          {errors.password && (
            <span className={styles.AuthError}>{errors.password.message}</span>
          )}
        </div>
        <button className={styles.AuthButton} type="submit">
          Login
        </button>
      </form>
      <Link to="/register" className={styles.AuthLink}>
        No account?Join us
      </Link>
    </div>
  );
};
