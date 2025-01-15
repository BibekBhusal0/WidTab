import { geminiWidgetType } from "@/types/slice/widgets";
import { Fragment, useEffect, useRef, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { APIkeyURL, getAPIKey, setAPIKey } from "@/utils/api";
import ReactMarkdown from "react-markdown";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import { cn } from "@/utils/cn";
import { useDispatch } from "react-redux";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { ScrollArea } from "@/components/scrollarea";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import useCurrentTheme from "@/hooks/useCurrentTheme";
import reactNodeToString from "react-node-to-string";
import rehypeHighlight from "rehype-highlight";
import browser from "webextension-polyfill";

// https://github.com/chathub-dev/chathub/blob/b31739fe103f24df41f75a7556ce670c1437dbff/src/app/components/Markdown/index.tsx#L8
function CustomCode(props: { children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);

  const language = useMemo(() => {
    const match = props.className?.match(/language-(\w+)/);
    return match ? match[1] : "text";
  }, [props.className]);

  const code = useMemo(
    () => reactNodeToString(props.children),
    [props.children]
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const cls = "size-5 transition-all duration-300 absolute-center";

  return (
    <div className="relative size-full flex-col">
      <div className="full-between px-4 py-2 bg-slate-700 top-0 left-0">
        {language && (
          <span className="font-medium uppercase slate-100">{language}</span>
        )}

        <Tooltip placement="left" title={copied ? "Copied" : "Copy"}>
          <Button
            variant="outlined"
            onClick={copyToClipboard}
            sx={{ minWidth: "0px", borderColor: "#cbd5e1" }}>
            <div className="size-full relative px-0 py-2 text-slate-300">
              <Icon
                icon="mingcute:copy-2-line"
                className={cn(cls, copied ? "scale-0" : "scale-100")}
              />
              <Icon
                icon="mingcute:check-fill"
                className={cn(cls, copied ? "scale-100" : "scale-0")}
              />
            </div>
          </Button>
        </Tooltip>
      </div>
      <div className="overflow-auto size-full px-5">
        <code {...props} />
      </div>
    </div>
  );
}

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
  const { mode } = useCurrentTheme();
  const setContent = (conversation: Content[]) =>
    dispatch(
      currentSpaceEditWidget({
        type: "gemini",
        values: { ...props, conversation },
      })
    );

  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const textAreaParentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(60);

  useEffect(() => {
    const h = textAreaParentRef.current?.scrollHeight;
    if (!h) return;
    if (h === height) return;
    setHeight(h);
  }, [textAreaParentRef.current?.scrollHeight, input]);

  useEffect(() => scrollBottom(), []);
  useEffect(() => scrollBottom(), [loading]);

  const scrollBottom = () =>
    mainRef.current?.scrollTo({
      top: mainRef.current.scrollHeight - mainRef.current.clientHeight,
      behavior: "smooth",
    });

  const handelModelResponse = async () => {
    if (input.trim() === "" || loading) return;
    setFocus(false);
    setInput("");
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(APIkey);
      const history = [...conversation];
      const chatSession = genAI
        .getGenerativeModel({ model })
        .startChat({ history });
      await chatSession.sendMessage(input.trim());
      setContent(history);
    } catch (error) {
      console.log("Error during API call:", error);
    } finally {
      setFocus(false);
      setLoading(false);
    }
  };

  return (
    <div className="size-full dark relative">
      <ScrollArea
        ref={mainRef}
        style={{ height: `calc(100% - ${height + 20}px)` }}>
        <div
          className={cn(
            "size-full max-w-full prose prose-pre:relative prose-pre:p-0 flex flex-col gap-4 p-4 transition-all",
            mode === "dark" && "dark:prose-invert"
          )}>
          <ReformatContent {...{ conversation, loading }} />
        </div>
      </ScrollArea>
      <div
        ref={textAreaParentRef}
        className={cn(
          "p-1 bottom-1 horizontal-center flex-center rounded-themed",
          "ring-1 ring-divider transition-all hover:ring-text-primary w-80",
          (focus || input !== "") &&
            "ring-2 ring-primary-main hover:ring-primary-main w-[80%]"
        )}
        onClick={() => textAreaRef.current?.focus()}>
        <TextareaAutosize
          autoFocus
          maxRows={5}
          minRows={1}
          onFocus={() => setFocus(true)}
          onAbort={() => setFocus(false)}
          onBlur={() => setFocus(false)}
          placeholder="Ask me anything..."
          ref={textAreaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="size-full bg-transparent p-2 outline-none resize-none text-xl"
          disabled={loading}
        />
        <IconButton
          disabled={loading}
          className="self-end"
          onClick={handelModelResponse}>
          <Icon icon="ri:send-plane-fill" className="text-2xl" />
        </IconButton>
      </div>
    </div>
  );
}

type reformatContentProps = {
  conversation: Content[];
  loading?: boolean;
};
export function ReformatContent({
  conversation,
  loading,
}: reformatContentProps) {
  const cls = "px-4 self-start";
  return (
    <>
      {conversation.map(({ parts, role }) => (
        <>
          {role === "user" && (
            <Paper
              variant="outlined"
              className="flex flex-col gap-2 max-w-[80%] self-end p-4">
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
              <ReactMarkdown
                rehypePlugins={[
                  [rehypeHighlight, { detect: true, ignoreMissing: true }],
                ]}
                className="w-full"
                components={{
                  a: ({ node, ...props }) => {
                    if (!props.title) {
                      return <a {...props} />;
                    }
                    return (
                      <Tooltip title={props.title} arrow>
                        <a
                          {...props}
                          className={cn(
                            props?.className,
                            "transition-all hover:text-primary-main"
                          )}
                          title={undefined}
                        />
                      </Tooltip>
                    );
                  },
                  code: ({ node, className, children, ...props }) => {
                    const inline =
                      typeof children === "boolean" ||
                      typeof children === "number" ||
                      (typeof children === "string" &&
                        !children.includes("\n"));

                    if (inline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <CustomCode className={className}>{children}</CustomCode>
                    );
                  },
                }}>
                {parts.map(({ text }) => text || "").join("\n")}
              </ReactMarkdown>
            </Paper>
          )}
        </>
      ))}
      {loading && (
        <Paper
          className={cn(cls, "flex flex-center gap-2 py-2")}
          variant="outlined">
          <Icon icon="svg-spinners:3-dots-bounce" className="text-3xl" />
          <div className="text-xl">Gemini Is Typing</div>
        </Paper>
      )}
    </>
  );
}

export default GeminiWidget;
