import { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { FiCalendar } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";

import { BoltIcon } from "@heroicons/react/24/solid";
import { Bookmark, Smile } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { MdChat } from "react-icons/md";

export default function Chat({ chat, onSend, input, setInput }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  if (!chat) {
    return (
      <div className="w-full md:w-3/4 h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-2 px-4">
          <h2 className="text-2xl font-bold text-gray-700">
            Welcome to your inbox
          </h2>
          <p className="text-gray-500">
            Select a conversation to view messages
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4 flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b font-semibold text-lg">{chat.name}</div>

      <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto text-sm">
        <AnimatePresence initial={false}>
          {chat.messages.map((msg, idx) => {
            const isUser = msg.from === "user";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  isUser ? "justify-start" : "justify-end"
                } items-end gap-2`}
              >
                {/* Avatar */}
                {isUser && (
                  <div
                    className={`w-6 h-6 rounded-full ${chat.iconBg} text-white text-xs flex items-center justify-center`}
                  >
                    {chat.iconText}
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`${
                    isUser
                      ? "bg-gray-100 text-black"
                      : "bg-purple-100 text-black"
                  } px-4 py-3 rounded-lg max-w-[80%] leading-relaxed tracking-wide`}
                >
                  {msg.text}
                  <div
                    className={`flex items-center gap-1 text-xs mt-2 ${
                      isUser ? "text-gray-500" : "text-black justify-end"
                    }`}
                  >
                    {isUser && <FiCalendar size={12} />}
                    {isUser ? "1min" : "Seen • 1min"}
                  </div>
                </div>

                {/* Receiver Avatar */}
                {!isUser && (
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="agent"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {/* Dummy div to scroll to */}
        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-full md:max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium text-sm flex items-center gap-1">
            <MdChat className=" w-4 h-4 text-black" />
            <span>Chat</span>
            <svg
              className="w-3 h-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="pt-3 border-t">
          {/* Input Bar with Send Button */}
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Use ⌘K for shortcuts"
            className="flex-1 w-full px-1 py-2 text-sm rounded-md focus:outline-none resize-none"
            minRows={1}
            maxRows={6}
          />

          {/* Icons */}
          <div className="flex items-center gap-4 text-black text-[20px] mt-3 flex-wrap">
            {/* Icons group */}
            <div className="flex items-center gap-4">
              {/* Solid black lightning */}
              <button className="p-1">
                <BoltIcon className="w-5 h-5" />
              </button>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-800" />

              {/* Bookmark icon */}
              <button className="p-1">
                <Bookmark className="w-5 h-5" />
              </button>

              {/* Smiley icon */}
              <button className="p-1">
                <Smile className="w-5 h-5 stroke-black" />
              </button>
            </div>

            {/* Send button pushed to right */}
            <button
              onClick={handleSend}
              className="ml-auto text-zinc-500 px-4 py-1 text-sm rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
