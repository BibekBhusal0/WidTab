import { EditorBubble } from "novel";
import { NodeSelector } from "./../selectors/node-selector";
import { LinkSelector } from "./../selectors/link-selector";
import { ColorSelector } from "./../selectors/color-selector";
import { TextButtons } from "./../selectors/text-buttons";
import Divider from "@mui/material/Divider";
// import { AIIcon, Icon2RN } from "@/theme/icons";
// import { useState } from "react";
// import Button from "@mui/material/Button";
// import ListItemButton from "@mui/material/ListItemButton";
// import { ScrollArea } from "@/components/scrollarea";
// import {
//   Command,
//   CommandInput,
//   CommandGroup,
//   CommandItem,
//   CommandSeparator,
// } from "@/components/command";
// import { MarkdownPreview } from "../advanced-editor";

export const Bubble = () => {
  //   const [aiOpen, setAiOpen] = useState(false);

  return (
    <EditorBubble
      className="bg-background-default w-fit max-w-[90vw] overflow-hidden"
      //   tippyOptions={{
      //     placement: aiOpen ? "bottom-start" : "top",
      //     onHidden: () => {
      //       setAiOpen(false);
      //       //   editor.chain().unsetHighlight().run();
      //     },
      //   }}
    >
      {/* {aiOpen ? (
        <AISelector onOpenChange={setAiOpen} open={aiOpen} />
      ) : ( */}
      <div className="flex">
        <div className="flex-center flex-col">
          <TextButtons />
          <Divider orientation="horizontal" flexItem />
          <div className="flex-center w-full">
            <NodeSelector />
            <Divider orientation="vertical" flexItem />
            <LinkSelector />
            <Divider orientation="vertical" flexItem />
            <ColorSelector />
          </div>
        </div>
        {/*
          <Divider orientation="vertical" flexItem />
          <ListItemButton
            sx={{ padding: "0", margin: "0" }}
            onClick={() => setAiOpen(true)}>
            <div className="flex-center flex-col px-2 text-transparent bg-linear-to-l from-[#7A69F9] to-[#F5833F] via-[#F26378] bg-clip-text">
              <AIIcon className="size-8" />
              <div className="font-semibold">Ask AI</div>
            </div>
          </ListItemButton> */}
      </div>
      {/* )} */}
    </EditorBubble>
  );
};

// interface AISelectorProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const fetchAIResponse = (prompt: string): Promise<string> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`As a **Large Language Model** I am useless and I can't help you with it but you can ask me \`Anything Else\`

// \`\`\`
// export const useCompletion = (onError?: (error: unknown) => void) => {
// const [isLoading, setIsLoading] = useState<boolean>(false);
// const [completion, setCompletion] = useState<string>("");
// const complete = async (prompt: string): Promise<void> => {
//   setIsLoading(true);
//   try {
//     const result = await fetchAIResponse(prompt);
//     setCompletion(result);
//   } catch (err) {
//       onError?.(err)
//   } finally {
//     setIsLoading(false);
//   }
// };
// return {  isLoading,  completion, complete, onError};
// };
// \`\`\`

//         `);
//     }, 10);
//   });
// };

// export const useCompletion = (onError?: (error: unknown) => void) => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [completion, setCompletion] = useState<string>("");

//   const complete = async (prompt: string): Promise<void> => {
//     setIsLoading(true);

//     try {
//       const result = await fetchAIResponse(prompt);
//       setCompletion(result);
//     } catch (err) {
//       onError?.(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isLoading, completion, complete, onError };
// };

// export function AISelector({ onOpenChange }: AISelectorProps) {
//   const { editor } = useEditor();

//   const [inputValue, setInputValue] = useState("");

//   const { completion, complete, isLoading } = useCompletion();

//   const hasCompletion = completion.length > 0;

//   if (!editor) return null;
//   return (
//     <Command className="w-[350px]">
//       {hasCompletion && (
//         <div className="flex max-h-[400px]">
//           <ScrollArea viewPortProps={{ className: "max-h-[200px]" }}>
//             <MarkdownPreview value={completion} />
//           </ScrollArea>
//         </div>
//       )}

//       {isLoading && (
//         <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
//           AI is thinking
//           <div className="ml-2 mt-1">
//             loading
//             {/* <CrazySpinner /> */}
//           </div>
//         </div>
//       )}
//       {!isLoading && (
//         <>
//           <div className="relative">
//             <CommandInput
//               value={inputValue}
//               onValueChange={setInputValue}
//               autoFocus
//               placeholder={
//                 hasCompletion
//                   ? "Tell AI what to do next"
//                   : "Ask AI to edit or generate..."
//               }
//               //   onFocus={() => addAIHighlight(editor)}
//             />
//             <Button
//               //   size="icon"
//               className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
//               onClick={() => {
//                 if (completion) {
//                   return complete(inputValue).then(() => setInputValue(""));
//                 }
//                 //   return complete(completion, {
//                 //     body: { option: "zap", command: inputValue },
//                 //   }).then(() => setInputValue(""));

//                 const slice = editor.state.selection.content();
//                 const text = editor.storage.markdown.serializer.serialize(
//                   slice.content
//                 );

//                 complete(text).then(() => setInputValue(""));
//               }}>
//               {/* <ArrowUp className="h-4 w-4" /> */}
//             </Button>
//           </div>
//           {hasCompletion ? (
//             <AICompletionCommands
//               onDiscard={() => {
//                 // editor.chain().unsetHighlight().focus().run();
//                 onOpenChange(false);
//               }}
//               completion={completion}
//             />
//           ) : (
//             <AISelectorCommands onSelect={(value) => complete(value)} />
//           )}
//         </>
//       )}
//     </Command>
//   );
// }

// const colors = ["#3BC4F2", "#7A69F9", "#F26378", "#F5833F"];
// const icons = [
//   { title: "Fix Grammer", icon: "fluent:text-grammar-wand-24-filled" },
//   { title: "Summarize", icon: "fluent:fluent:pen-sparkle-48-filled" },
//   { title: "Make Longer", icon: "fluent:draw-text-20-filled" },
//   {
//     title: "Continue Writing",
//     icon: "fluent:text-grammar-lightning-20-filled",
//   },
// ];

// const options = [
//   {
//     value: "improve",
//     label: "Improve writing",
//     icon: "fluent:text-grammar-wand-24-filled",
//   },
//   {
//     value: "fix",
//     label: "Fix grammar",
//     icon: "fluent:fluent:pen-sparkle-48-filled",
//   },
//   {
//     value: "shorter",
//     label: "Make shorter",
//     icon: "fluent:fluent:pen-sparkle-48-filled",
//   },
//   {
//     value: "longer",
//     label: "Make longer",
//     icon: "fluent:draw-text-20-filled",
//   },
// ];

// interface AISelectorCommandsProps {
//   onSelect: (value: string, option: string) => void;
// }

// const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
//   const { editor } = useEditor();

//   if (!editor) return null;
//   return (
//     <>
//       <CommandGroup heading="Edit or review selection">
//         {options.map((option) => (
//           <CommandItem
//             onSelect={(value) => {
//               const slice = editor.state.selection.content();
//               const text = editor.storage.markdown.serializer.serialize(
//                 slice?.content
//               );
//               onSelect(text, value);
//             }}
//             className="flex gap-2 px-4"
//             key={option.value}
//             value={option.value}>
//             <Icon2RN icon={option.icon} className="h-4 w-4 text-purple-500" />
//             {/* <option.icon /> */}
//             {option.label}
//           </CommandItem>
//         ))}
//       </CommandGroup>
//       <CommandSeparator />
//       <CommandGroup heading="Use AI to do more">
//         <CommandItem
//           onSelect={() => {
//             // const pos = editor.state.selection.from;
//             // // const text = getPrevText(editor, pos);
//             // // onSelect(text, "continue");
//           }}
//           value="continue"
//           className="gap-2 px-4">
//           {/* <StepForward className="h-4 w-4 text-purple-500" /> */}
//           Continue writing
//         </CommandItem>
//       </CommandGroup>
//     </>
//   );
// };

// const AICompletionCommands = ({
//   completion,
//   onDiscard,
// }: {
//   completion: string;
//   onDiscard: () => void;
// }) => {
//   const { editor } = useEditor();
//   if (!editor) return null;

//   return (
//     <>
//       <CommandGroup>
//         <CommandItem
//           className="gap-2 px-4"
//           value="replace"
//           onSelect={() => {
//             const selection = editor.view.state.selection;

//             editor
//               .chain()
//               .focus()
//               .insertContentAt(
//                 {
//                   from: selection?.from,
//                   to: selection?.to,
//                 },
//                 completion
//               )
//               .run();
//           }}>
//           {/* <Check className="h-4 w-4 text-muted-foreground" /> */}
//           Replace selection
//         </CommandItem>
//         <CommandItem
//           className="gap-2 px-4"
//           value="insert"
//           onSelect={() => {
//             const selection = editor.view.state.selection;
//             editor
//               .chain()
//               .focus()
//               .insertContentAt(selection.to + 1, completion)
//               .run();
//           }}>
//           {/* <TextQuote className="h-4 w-4 text-muted-foreground" /> */}
//           Insert below
//         </CommandItem>
//       </CommandGroup>
//       <CommandSeparator />

//       <CommandGroup>
//         <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
//           {/* <TrashIcon className="h-4 w-4 text-muted-foreground" /> */}
//           Discard
//         </CommandItem>
//       </CommandGroup>
//     </>
//   );
// };
