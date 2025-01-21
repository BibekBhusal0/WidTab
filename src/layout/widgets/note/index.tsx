import { useDispatch } from "react-redux";
import { cn } from "@/utils/cn";
import { SelectIconMenu } from "@/components/select-icon";
import { noteType } from "@/types/slice/notes";
import { transparentInput } from "../todo";
import { changeNoteContent } from "@/redux/slice/note";
import Editor from "@/components/editor/advanced-editor";

function Note({ id, title, text, icon }: noteType) {
  const dispatch = useDispatch();
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeNoteContent({ content: "title", id, value: e.target.value })
    );
  };
  const iconChangeHandler = (icon: string) => {
    dispatch(changeNoteContent({ id, content: "icon", value: icon }));
  };
  const textChangeHandler = (value: string) => {
    dispatch(changeNoteContent({ content: "text", id, value }));
  };

  return (
    <div className="size-full flex flex-col gap-2 relative editor">
      <div className="flex justify-start items-center gap-2 px-3 icon-xl">
        <SelectIconMenu icon={icon} setIcon={iconChangeHandler} />
        <input
          className={cn(transparentInput, "text-3xl w-[calc(100%-92px)]")}
          type="text"
          autoFocus={title.trim() === ""}
          placeholder="Title Here"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <Editor value={text} onChange={textChangeHandler} />
    </div>
  );
}

export default Note;
