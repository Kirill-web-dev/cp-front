import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ResizableTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResizableTextarea({ onChange, value }: ResizableTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Сбрасываем высоту, чтобы она могла уменьшаться
      textarea.style.height = "auto";

      const nextHeight = textarea.scrollHeight;

      if (nextHeight <= 200) {
        // Если контента меньше чем на 200px, растягиваем
        textarea.style.height = `${nextHeight}px`;
        textarea.style.overflowY = "hidden"; // Скрываем скролл
      } else {
        // Если больше 200px, фиксируем высоту и разрешаем скролл
        textarea.style.height = "200px";
        textarea.style.overflowY = "auto"; // Включаем скролл внутри
      }
    }
  };

  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      ref={textareaRef}
      onInput={handleInput}
      className="resize-none overflow-y-scroll min-h-10 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0  outline-none scrollbar-hide py-3 px-2"
      rows={1}
    />
  );
}
