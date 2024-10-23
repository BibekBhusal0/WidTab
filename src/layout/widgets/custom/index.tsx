import useCurrentLayout from "@/hooks/useCurrentLayout";
import { CustomWidgetType } from "@/types/slice/widgets";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/redux/slice/layout";
import WidgetControls from "@/components/widgetControl";
import { useEffect, useState } from "react";
import MenuPopover from "@/components/popoverMenu";
import { urlPattern } from "@/components/footer/addWidget/custom";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function CustomWidget(props: CustomWidgetType) {
  const layout = useCurrentLayout();
  const showControls = !layout?.locked;

  return (
    <div className="size-full relative overflow-hidden">
      {showControls && <CustomWidgetControls {...props} />}
      <iframe src={props.url} className="size-full rounded-themed" />
    </div>
  );
}

function CustomWidgetControls(props: CustomWidgetType) {
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  return (
    <WidgetControls className="flex-center gap-3">
      <ChangeURL {...props} />

      <IconButton
        color="error"
        onClick={() =>
          dispatch(currentSpaceDeleteWidget({ type: "custom", id: props.id }))
        }>
        {delete_}
      </IconButton>
    </WidgetControls>
  );
}

function ChangeURL({ url, id }: CustomWidgetType) {
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
