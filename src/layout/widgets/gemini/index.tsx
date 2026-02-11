import { geminiWidgetType } from "@/types/slice/widgets";
import { Fragment, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { APIkeyURL, getAPIKey, setAPIKey } from "@/utils/api";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { cn } from "@/utils/cn";
import { useDispatch } from "react-redux";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { ScrollArea } from "@/components/scrollarea";
import browser from "webextension-polyfill";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { MarkdownPreview } from "@/components/editor/advanced-editor";
import { useTost } from "@/components/tost";

function GeminiWidget(props: geminiWidgetType) {
  const [input, setInput] = useState("");
  const [key, setKey] = useState<string | undefined | null>(null);
  const hasKey = typeof key === "string";

  useEffect(() => {
    const onStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      namespace: string
    ) => {
      if (namespace === "local" && changes.gemini) {
        setKey(changes.gemini.newValue as string);
      }
    };
    getAPIKey("gemini").then((key) => setKey(key));
    browser.storage.onChanged.addListener(onStorageChange);
    return () => {
      browser.storage.onChanged.removeListener(onStorageChange);
    };
  }, []);
  const handleClick = async () => {
    const i = input.trim();
    if (i === "") return;
    setAPIKey("gemini", i);
    setInput("");
  };

  return (
    <div className="size-full p-2 pt-0">
      {hasKey ? (
        <AIChat APIkey={key} {...props} />
      ) : (
        <div className="flex-center size-full flex-col gap-4 text-xl">
          <TextField
            label="API KEY"
            placeholder="API KEY"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <Button
            onClick={handleClick}
            size="large"
            variant="outlined"
            disabled={input.trim() === ""}>
            Set API KEY
          </Button>
          <Link href={APIkeyURL.gemini} target="_blank">
            Get Gemini API Key
          </Link>
        </div>
      )}
    </div>
  );
}

type aiChatProp = { APIkey: string } & geminiWidgetType;
export function AIChat({ ...props }: aiChatProp) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative flex size-full flex-col justify-between gap-2">
      <AIChatContent {...{ loading }} {...props} />
      <AIChatInput {...{ loading, setLoading }} {...props} />
    </div>
  );
}

function AIChatContent({ loading, conversation }: aiChatProp & { loading: boolean }) {
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => scrollBottom(), [loading]);

  const scrollBottom = () =>
    mainRef.current?.scrollTo({
      top: mainRef.current.scrollHeight - mainRef.current.clientHeight,
      behavior: "smooth",
    });

  return (
    <ScrollArea ref={mainRef}>
      <div
        className={cn(
          "prose dark:prose-invert prose-pre:p-0 prose-pre:border prose-pre:border-divider flex size-full max-w-full flex-col gap-4 p-4 transition-all"
        )}>
        <ReformatContent {...{ conversation, loading }} />
      </div>
    </ScrollArea>
  );
}
function AIChatInput({
  setLoading,
  loading,
  APIkey,
  ...props
}: aiChatProp & {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { showTost } = useTost();

  const { conversation, model } = props;
  const setContent = (conversation: Content[]) =>
    dispatch(
      currentSpaceEditWidget({
        type: "gemini",
        values: { ...props, conversation },
      })
    );

  const expand = input.trim() !== "";
  const handleModelResponse = async () => {
    if (input.trim() === "" || loading) return;
    setInput("");
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(APIkey);
      const history = [...conversation];
      const chatSession = genAI.getGenerativeModel({ model }).startChat({ history });
      await chatSession.sendMessage(input.trim());
      setContent(history);
    } catch (error) {
      console.log("Error during API call:", error);
      showTost({
        children: "Error During API call check console for more info",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <OutlinedInput
      autoFocus
      multiline
      maxRows={5}
      minRows={1}
      size="small"
      placeholder="Ask me anything..."
      sx={{
        width: expand ? "80%" : "320px",
        "&.Mui-focused": { width: "80%" },
        transition: "all 0.3s ease",
        alignSelf: "center",
      }}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      disabled={loading}
      endAdornment={
        <InputAdornment className="self-end" position="end">
          <IconButton disabled={loading} onClick={handleModelResponse}>
            <Icon icon="ri:send-plane-fill" className="text-2xl" />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

type reformatContentProps = {
  conversation: Content[];
  loading?: boolean;
};
export function ReformatContent({ conversation, loading }: reformatContentProps) {
  const cls = "px-4 self-start";
  return (
    <>
      {conversation.map(({ parts, role }, index) => (
        <Fragment key={index}>
          {role === "user" && (
            <Paper variant="outlined" className="flex max-w-[80%] flex-col gap-2 self-end p-4">
              {parts.map(({ text }, i) => (
                <Fragment key={i}>
                  {text?.split("\n").map((t, i) => (
                    <div key={i}>{t}</div>
                  ))}
                </Fragment>
              ))}
            </Paper>
          )}
          {role === "model" && (
            <Paper className={cn(cls, "max-w-[90%]")} variant="outlined">
              <MarkdownPreview value={parts.map(({ text }) => text || "").join("\n")} />
            </Paper>
          )}
        </Fragment>
      ))}
      {loading && (
        <Paper className={cn(cls, "flex-center flex gap-2 py-2")} variant="outlined">
          <Icon icon="svg-spinners:3-dots-bounce" className="text-3xl" />
          <div className="text-xl">Gemini Is Typing</div>
        </Paper>
      )}
    </>
  );
}

export default GeminiWidget;
