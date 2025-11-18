import { useEffect, useRef, useState } from "react";
import type { Message } from "./model/type";
import styles from "./style.module.scss";

import { MessageList } from "./blocks/MessageList/MessageList";
import { InputAI } from "./blocks/InputAI/InputAI";
import { useQueryAI } from "./model/query";
import { v4 as uuidv4 } from "uuid";
import { LoadingDots } from "@/shared/ui/loaderDot";

export const ChatAi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const queryAI = useQueryAI();
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, queryAI.isPending]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      sender: "user",
    };

    setMessages([...messages, userMessage]);
    setInput("");

    queryAI.mutate(input, {
      onSuccess: (data) => {
        const aiMessage: Message = {
          id: uuidv4(),
          content: data.choices[0].message.content,
          sender: "ai",
        };
        setMessages((prev) => [...prev, aiMessage]);
      },
    });
  };

  return (
    <div className={styles.AiInner}>
      <div ref={messageRef} className={styles.AiWrap}>
        <MessageList messages={messages} />
        {queryAI.isPending && <LoadingDots />}
      </div>
      <InputAI value={input} onChange={setInput} onSubmit={handleSubmit} />
    </div>
  );
};
