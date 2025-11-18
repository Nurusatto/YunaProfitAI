export type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
};

export type InputAi = {
  value: string;
  onChange: (newValue: string) => void;
  onSubmit?: () => void;
};
