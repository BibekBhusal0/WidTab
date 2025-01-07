import useCurrentLayout from "@/hooks/useCurrentLayout";
import { CustomWidgetType } from "@/types/slice/widgets";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { useEffect, useState } from "react";
import MenuPopover from "@/components/popoverMenu";
import { urlPattern } from "@/components/footer/addWidget/custom";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function CustomWidget(props: CustomWidgetType) {
  return <iframe src={props.url} className="size-full rounded-themed" />;
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
  const [extractedUrl, setExtractedUrl] = useState(url);
  useEffect(() => {
    setText(url);
  }, [url]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);

    const matchedUrl = inputValue.match(urlPattern);
    setExtractedUrl(matchedUrl ? matchedUrl[0] : "");
  };

  const valid = extractedUrl !== "";
  const add = () => {
    if (valid && extractedUrl !== url) {
      dispatch(
        currentSpaceEditWidget({
          type: "custom",
          values: { id: id, url: extractedUrl },
        })
      );
    }
  };
  return (
    <MenuPopover icon={edit}>
      <div className="p-4 flex-center flex-col gap-4">
        <TextField
          error={!valid}
          helperText={!valid ? "URL not valid" : ""}
          autoFocus
          placeholder="Widget URL"
          label="Widget URL"
          value={text}
          onChange={handleTextChange}
        />

        <Button
          disabled={extractedUrl === "" || extractedUrl === url}
          onClick={add}>
          Done
        </Button>
      </div>
    </MenuPopover>
  );
}

export default CustomWidget;
