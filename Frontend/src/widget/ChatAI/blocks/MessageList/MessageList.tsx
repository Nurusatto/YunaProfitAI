import type { Message } from "@/widget/ChatAI/model/type";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";

export const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <>
      <div className={styles.MessageList}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user" ? styles.MessageUser : styles.MessageAI
            }
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </>
  );
};
