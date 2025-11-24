import { useForm } from "react-hook-form";
import { registerSchema } from "@/shared/schema/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegister } from "@/widget/register/model/query";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "@tanstack/react-router";

import styles from "@/widget/register/style.module.scss";

export const Register = () => {
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const navigate = useNavigate({ from: "/auth" });

  const { handleSubmit, register } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(registerSchema),
  });

  const { mutate } = useRegister();

  const onSubmit = (data: any) => {
    console.log(data);
    mutate(data, {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
        setAccessToken(data.accessToken);
        navigate({ to: "/" });
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
        <div className={styles.RegisterAlert}></div>
        <button type="submit" className={styles.RegisterBtn}>
          Register
        </button>
      </form>
    </div>
  );
};
