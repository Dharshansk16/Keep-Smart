"use client";

import { HTMLAttributes, FC, useState } from "react";
import { cn } from "@/lib/utils";
import TextAreaAutoSize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { Message } from "@/lib/validators/message";

//extends HTMLAttrtibutes<HTMLDivElement> allows all the html attributes that are applicable
//to <div> to be passed as props.Here for example <ChatInput /> component can recieve any
//Html Attribute for example <ChatInput ClassName="" /> here className is a Html attribute passed

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [inputText, setInputText] = useState<string>("");

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "hello" }),
      });
      return response.body;
    },
    onSuccess: () => {
      console.log("Success");
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      {/* cn is used to combine the existing 
    className with the className passed as props */}
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextAreaAutoSize
          rows={2}
          maxRows={4}
          value={inputText}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: inputText,
              };
              sendMessage(message);
            }
          }}
          onChange={(e) => setInputText(e.target.value)}
          autoFocus // user don't need manually click on inputarea to place the cursor
          placeholder="Write a message..."
          className="peer disabled:opacity-50 pr-14 resize-none block placeholder:pl-1 
           w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ChatInput;
