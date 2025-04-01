import useCurrentLayout from "@/hooks/useCurrentLayout";
import { CustomWidgetType } from "@/types/slice/widgets";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { useEffect, useState } from "react";
import MenuPopover from "@/components/popoverMenu";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { getUrlFromString } from "@/utils/url";

function CustomWidget(props: CustomWidgetType) {
  return <iframe src={props.url} className="rounded-themed size-full" />;
}

export function URLChange({ id }: { id: number }) {
  const layout = useCurrentLayout();
  if (!layout) return null;
  const { widgets } = layout;
  const widget = widgets.find((w) => w.type === "custom" && w.values.id === id);
  if (!widget || widget.type !== "custom") return null;
  const props = { url: widget.values.url, id: widget.values.id };
  return <ChangeURL {...props} />;
}

export function ChangeURL({ url, id }: CustomWidgetType) {
  const dispatch = useDispatch();
  const { edit } = useCurrentIcons();
  const [text, setText] = useState(url);
  const [helperText, setHelperText] = useState("");
  useEffect(() => {
    setText(url);
  }, [url]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (helperText) setHelperText("");
  };

  const add = () => {
    if (!text || text.trim().length === 0) {
      setHelperText("URL is required");
      return;
    }
    if (text === url) {
      setHelperText("URL not changed");
      return;
    }
    const extractedUrl = getUrlFromString(text);
    if (!extractedUrl) {
      setHelperText("Invalid URL");
      return;
    }
    if (extractedUrl === url) {
      setHelperText("URL not changed");
      return;
    }

    dispatch(
      currentSpaceEditWidget({
        type: "custom",
        values: { id: id, url: extractedUrl },
      })
    );
  };
  return (
    <MenuPopover icon={edit}>
      <div className="flex-center flex-col gap-4 p-4">
        <TextField
          error={!!helperText}
          helperText={helperText}
          autoFocus
          placeholder="Widget URL"
          label="Widget URL"
          value={text}
          onChange={handleTextChange}
        />

        <Button onClick={add}>Done</Button>
      </div>
    </MenuPopover>
  );
}

export default CustomWidget;
