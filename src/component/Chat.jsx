import { FiCalendar } from "react-icons/fi";

export default function Chat({ chat }) {
  if (!chat) return <div className="w-3/4 h-full flex items-center justify-center">Select a chat to start</div>;

  return (
    <div className="w-3/4 flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b font-semibold text-lg">{chat.name}</div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto text-sm">
        {chat.messages.map((msg, idx) => {
          const isUser = msg.from === "user";

          return (
            <div
              key={idx}
              className={`flex ${isUser ? "justify-start" : "justify-end"} items-end gap-2`}
            >
              {/* Avatar */}
              {isUser && (
                <div className="w-6 h-6 rounded-full bg-gray-300 text-white text-xs flex items-center justify-center">
                  L
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`${
                  isUser ? "bg-gray-100 text-gray-900" : "bg-blue-100 text-blue-900"
                } px-4 py-3 rounded-lg max-w-[80%] leading-relaxed tracking-wide`}
              >
                {msg.text}
                <div
                  className={`flex items-center gap-1 text-xs text-gray-500 mt-2 ${
                    isUser ? "" : "justify-end"
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
            </div>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded">Send</button>
      </div>
    </div>
  );
}
