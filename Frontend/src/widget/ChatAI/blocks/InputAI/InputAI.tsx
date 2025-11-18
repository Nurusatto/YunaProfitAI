import type { InputAi } from "../../model/type";
import styles from "./style.module.scss";
import { ArrowUp } from "lucide-react";

export const InputAI = ({ value, onChange, onSubmit }: InputAi) => {
  return (
    <div className={styles.Wrapper}>
      <input
        type="text"
        value={value}
        className={styles.Input}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSubmit} className={styles.Button}>
        <ArrowUp />
      </button>
    </div>
  );
};
