import useCurrentLayout from "@/hooks/useCurrentLayout";
import { CustomWidgetType } from "@/types/slice/widgets";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/redux/slice/layout";
import WidgetControls from "@/components/widgetControl";
import useCurrentRoundness from "@/hooks/useCurrentRoundness";
import { useEffect, useState } from "react";
import MenuPopover from "@/components/popoverMenu";
import { urlPattern } from "@/components/footer/addWidget/custom";
import { HiPencilAlt } from "react-icons/hi";

function CustomWidget(props: CustomWidgetType) {
  const layout = useCurrentLayout();
  const borderRadius = useCurrentRoundness();
  const showControls = !layout?.locked;

  return (
    <Box className="size-full relative overflow-hidden">
      {showControls && <CustomWidgetControls {...props} />}
      <iframe style={{ borderRadius }} src={props.url} className="size-full" />
    </Box>
  );
}

function CustomWidgetControls(props: CustomWidgetType) {
  const dispatch = useDispatch();
  return (
    <WidgetControls className="flex-center gap-3">
      <ChangeURL {...props} />

      <IconButton
        color="error"
        onClick={() =>
          dispatch(currentSpaceDeleteWidget({ type: "custom", id: props.id }))
        }>
        <DeleteIcon />
      </IconButton>
    </WidgetControls>
  );
}

function ChangeURL({ url, id }: CustomWidgetType) {
  const dispatch = useDispatch();
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

  const add = () => {
    if (extractedUrl !== "" && extractedUrl !== url) {
      dispatch(
        currentSpaceEditWidget({
          type: "custom",
          values: { id: id, url: extractedUrl },
        })
      );

      setText("");
      setExtractedUrl("");
    }
  };
  return (
    <MenuPopover icon={<HiPencilAlt />}>
      <div className="p-4 flex-center flex-col gap-4">
        <div className="flex flex-col gap-2">
          <TextField
            autoFocus
            placeholder="Widget URL"
            label="Widget URL"
            value={text}
            onChange={handleTextChange}
          />
          <Box sx={{ color: "error.main" }}>
            {extractedUrl === ""
              ? text.trim() === ""
                ? ""
                : "Invalid URL"
              : ""}
          </Box>
        </div>

        <Button
          disabled={extractedUrl === "" || extractedUrl === url}
          onClick={add}>
          {" "}
          Done{" "}
        </Button>
      </div>
    </MenuPopover>
  );
}

export default CustomWidget;
