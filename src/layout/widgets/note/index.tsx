import { useDispatch } from "react-redux";
import { useRef } from "react";
import { cn } from "@/utils/cn";
import { SelectIconMenu } from "@/components/select-icon";
import { noteType } from "@/types/slice/notes";
import { transparentInput } from "../todo";
import { changeNoteContent } from "@/redux/slice/note";

function Note({ id, title, text, icon }: noteType) {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

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
      <div className="flex justify-start items-center gap-2 px-3 h-12 icon-xl">
        <SelectIconMenu icon={icon} setIcon={iconChangeHandler} />
        <input
          ref={titleRef}
          onKeyDown={titleKeyDown}
          className={cn(transparentInput, "text-3xl w-[calc(100%-92px)]")}
          type="text"
          autoFocus={title.trim() === ""}
          placeholder="Title Here"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <textarea
        ref={textRef}
        className={cn(
          transparentInput,
          "text-xl w-full px-2 h-[calc(100%-48px)]",
          !textRef.current && "overflow-hidden"
        )}
        placeholder="Note Here"
        value={text}
        onChange={textChangeHandler}
      />
    </>
  );
}

export default Note;
