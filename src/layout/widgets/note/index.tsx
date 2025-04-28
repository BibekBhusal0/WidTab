import { useDispatch } from "react-redux";
import { cn } from "@/utils/cn";
import { SelectIconMenu } from "@/components/select-icon";
import { noteType } from "@/types/slice/notes";
import { transparentInput } from "../todo";
import { changeNoteContent } from "@/redux/slice/note";
import Editor from "@/components/editor/advanced-editor";
import { ScrollArea } from "@/components/scrollarea";

function Note({ id, title, text, icon }: noteType) {
  const dispatch = useDispatch();
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeNoteContent({ content: "title", id, value: e.target.value }));
  };
  const iconChangeHandler = (icon: string) => {
    dispatch(changeNoteContent({ id, content: "icon", value: icon }));
  };
  const textChangeHandler = (value: string) => {
    dispatch(changeNoteContent({ content: "text", id, value }));
  };

  return (
    <div className="editor relative flex size-full flex-col gap-2">
      <div className="icon-xl flex items-center justify-start gap-2 px-3">
        <SelectIconMenu icon={icon} setIcon={iconChangeHandler} />
        <input
          className={cn(transparentInput, "w-[calc(100%-92px)] text-3xl")}
          type="text"
          autoFocus={title.trim() === ""}
          placeholder="Title Here"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <ScrollArea scrollBarProps={{ className: "w-2" }}>
        <Editor value={text} onChange={textChangeHandler} />
      </ScrollArea>
    </div>
  );
}

export default Note;
