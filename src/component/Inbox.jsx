import { FiChevronDown, FiClock } from "react-icons/fi";
import { FaArrowLeft, FaTicketAlt } from "react-icons/fa";

export default function Inbox({ activeId, onSelect }) {
  const chats = [
    {
      id: 1,
      name: "Luis - Github",
      message: "Hey! I have a questio...",
      time: "45m",
      iconText: "L",
      iconBg: "bg-blue-500",
      active: true,
    },
    {
      id: 2,
      name: "Ivan - Nike",
      message: "Hi there, I have a qu...",
      time: "3min",
      iconText: "I",
      iconBg: "bg-red-700",
      showClock: true,
    },
    {
      id: 3,
      name: "Lead from New York",
      message: "Good morning, let me...",
      time: "40m",
      iconText: "L",
      iconBg: "bg-black",
    },
    {
      id: 4,
      name: "Booking API problems",
      message: "Bug report",
      sub: "Luis - Small Crafts",
      time: "45m",
      icon: <FaTicketAlt size={14} className="text-white" />,
      iconBg: "bg-indigo-700",
    },
    {
      id: 5,
      name: "Miracle - Exemplary Bank",
      message: "Hey there, I’m here to...",
      time: "45m",
      icon: <FaArrowLeft size={14} className="text-gray-700" />,
      iconBg: "bg-gray-300",
    },
  ];

  return (
    <div className="w-full sm:w-1/4 h-full bg-white border-r text-sm flex flex-col">
      {/* Header */}
      <div className="p-4 font-medium flex justify-between items-center border-b">
        <span className="text-lg font-bold">Your inbox</span>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <span>5 Open</span>
          <span className="flex items-center text-gray-500">
            Waiting longest <FiChevronDown />
          </span>
        </div>
      </div>

      {/* Chat list */}
      <div className="overflow-y-auto flex-1 max-h-[calc(100vh-120px)]">
        {" "}
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`px-4 py-3 flex gap-3 items-start cursor-pointer ${
              chat.id === activeId ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
            onClick={() => onSelect(chat.id)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${chat.iconBg}`}
            >
              {chat.iconText ? chat.iconText : chat.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">
                {chat.name}
              </div>
              <div className="text-gray-500 text-xs truncate">
                {chat.message}
              </div>
              {chat.sub && (
                <div className="text-gray-400 text-xs truncate">{chat.sub}</div>
              )}
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap mt-1 flex items-center gap-1">
              {chat.showClock ? (
                <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <FiClock size={12} />
                  {chat.time}
                </span>
              ) : (
                <span>{chat.time}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="block md:hidden p-4 border-t text-xs text-gray-500 flex items-center gap-2">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
}
