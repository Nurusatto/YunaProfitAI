import { useForm } from "react-hook-form";
import { registerSchema } from "@/shared/schema/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegister } from "@/widget/register/model/query";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "@tanstack/react-router";

import styles from "@/widget/register/style.module.scss";
import type { authType } from "./model/type";
import { useState } from "react";

export const Register = () => {
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const navigate = useNavigate({ from: "/auth" });
  const [alert, setAlert] = useState<string | undefined>("");

  const { handleSubmit, register } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(registerSchema),
  });

  const { mutate } = useRegister();

  const onSubmit = (data: authType) => {
    console.log(data);
    mutate(data, {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
        setAccessToken(data.accessToken);
        navigate({ to: "/" });
      },
      onError: (error) => {
        setAlert(error.response?.data?.message || "something went wrong");
      },
    });
  };

  return (
    <div className={styles.RegisterWrap}>
      <h1 className={styles.RegisterTitle}>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.RegisterForm}>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className={styles.RegisterInput}
        />
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className={styles.RegisterInput}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={styles.RegisterInput}
        />
        {alert && (
          <div className={styles.RegisterAlert}>
            <span className={styles.RegisterError}>{alert}</span>
          </div>
        )}

        <button type="submit" className={styles.RegisterBtn}>
          Register
        </button>
      </form>
    </div>
  );
};
