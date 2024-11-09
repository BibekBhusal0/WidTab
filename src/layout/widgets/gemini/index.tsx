import { geminiWidgetType } from "@/types/slice/widgets";
import { Fragment, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { APIkeyURL, getAPIKey, setAPIKey } from "@/utils/api";
import ReactMarkdown from "react-markdown";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { cn } from "@/utils/cn";
import { useDispatch } from "react-redux";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { ScrollArea } from "@/components/scrollarea";

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
        setKey(changes.gemini.newValue);
      }
    };
    getAPIKey("gemini").then((key) => setKey(key));
    chrome.storage.onChanged.addListener(onStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(onStorageChange);
    };
  }, []);
  const handleClick = async () => {
    const i = input.trim();
    if (i === "") return;
    setAPIKey("gemini", i);
    setInput("");
  };

  return (
    <div className="size-full p-2">
      {hasKey ? (
        <AIChat APIkey={key} {...props} />
      ) : (
        <div className="size-full flex-center flex-col gap-4 text-xl">
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

export function AIChat({
  APIkey,
  ...props
}: { APIkey: string } & geminiWidgetType) {
  const { conversation, model } = props;
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const setContent = (content: Content[]) =>
    dispatch(
      currentSpaceEditWidget({
        type: "gemini",
        values: { ...props, conversation: content },
      })
    );

  const [focus, setFocus] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  const textEmpty = input.trim() === "";
  const minH = 30;
  const maxH = 150;
  const [height, setHeight] = useState(minH);

  useEffect(() => {
    if (!textAreaRef.current || !mirrorRef.current) return;
    mirrorRef.current.innerHTML = input;
    const { scrollHeight } = mirrorRef.current;
    setHeight(Math.min(Math.max(scrollHeight, minH), maxH));
  }, [input]);

  const scrollBottom = () =>
    mainRef.current?.scrollTo({
      top: mainRef.current.scrollHeight - mainRef.current.clientHeight,
      behavior: "smooth",
    });

  const handelModelResponse = async () => {
    if (input.trim() === "") return;
    const genAI = new GoogleGenerativeAI(APIkey);
    const history = [...conversation];
    const chatSession = genAI
      .getGenerativeModel({ model })
      .startChat({ history });
    setInput("");
    await chatSession.sendMessage(input.trim());
    setContent(history);
    scrollBottom();
  };

  return (
    <div className="size-full dark relative">
      <ScrollArea
        ref={mainRef}
        style={{ height: `calc(100% - ${height + 40}px)` }}>
        <div className="size-full max-w-full prose prose-orange dark:prose-invert flex flex-col gap-4 p-4">
          <ReformatContent content={conversation} />
        </div>
      </ScrollArea>
      <div
        className={cn(
          "p-1 bottom-1 horizontal-center w-80 flex-center rounded-themed",
          "ring-1 ring-divider transition-all hover:ring-text-primary",
          (focus || !textEmpty) &&
            "ring-2 ring-primary-main hover:ring-primary-main w-[80%]"
        )}
        onClick={() => textAreaRef.current?.focus()}
        //
      >
        <textarea
          style={{ height: `${height + 18}px`, maxHeight: `${maxH}px` }}
          onFocus={() => setFocus(true)}
          onAbort={() => setFocus(false)}
          onBlur={() => setFocus(false)}
          placeholder="Ask me anything..."
          ref={textAreaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="size-full bg-transparent p-2 outline-none resize-none text-xl"
        />
        <IconButton className="self-end" onClick={handelModelResponse}>
          <Icon icon="ri:send-plane-fill" className="text-2xl" />
        </IconButton>
      </div>
      <div
        ref={mirrorRef}
        className="absolute invisible whitespace-pre-wrap break-words overflow-hidden text-xl"
        style={{ width: textAreaRef.current?.offsetWidth, height: 0 }}
      />
    </div>
  );
}

export function ReformatContent({ content }: { content: Content[] }) {
  return (
    <>
      {content.map(({ parts, role }) => (
        <>
          {role === "user" && (
            <Paper
              variant="outlined"
              className="flex flex-col gap-2 max-w-[80%] self-end p-4 text-right">
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
            <Paper className="px-6 max-w-[80%] self-start" variant="outlined">
              <ReactMarkdown className="w-full">
                {parts.map(({ text }) => text || "").join("\n")}
              </ReactMarkdown>
            </Paper>
          )}
        </>
      ))}
    </>
  );
}

export default GeminiWidget;
