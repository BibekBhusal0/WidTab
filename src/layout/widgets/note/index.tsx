import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { SelectIconMenu } from "@/components/select-icon";
import { ScrollArea } from "@/components/scrollarea";
import { noteType } from "@/types/slice/notes";
import { transparentInput } from "../todo";
import { changeNoteContent } from "@/redux/slice/note";

function Note({ id, title, text, icon }: noteType) {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [textareaHeight, setTextareaHeight] = useState(200);

  useEffect(() => {
    if (textRef.current) {
      setTextareaHeight(textRef.current.scrollHeight);
    }
  }, [text]);

  const titleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter") {
      e.preventDefault();
      textRef.current?.focus();
    }
  };
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeNoteContent({ content: "title", id, value: e.target.value })
    );
  };

  const iconChangeHandler = (icon: string) => {
    dispatch(changeNoteContent({ id, content: "icon", value: icon }));
  };
  const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeNoteContent({ content: "text", id, value: e.target.value }));
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2 px-3 h-12 icon-xl">
        <SelectIconMenu
          icon={icon}
          setIcon={iconChangeHandler}
          buttonProps={{ sx: { p: 0.7, m: 0, flexGrow: 0 } }}
        />
        <input
          ref={titleRef}
          onKeyDown={titleKeyDown}
          className={cn(transparentInput, "text-3xl")}
          type="text"
          autoFocus={title.trim() === ""}
          placeholder="Title Here"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <ScrollArea className="w-full h-5/6">
        <textarea
          ref={textRef}
          className={cn(
            transparentInput,
            "text-xl w-full px-4",
            !textRef.current && "overflow-hidden"
          )}
          placeholder="Note Here"
          value={text}
          onChange={textChangeHandler}
          style={{ height: `${textareaHeight}px` }}
        />
      </ScrollArea>
    </>
  );
}

export default Note;
