// src/components/AICopilot.jsx
import { useEffect, useState } from "react";
import { FiSend, FiBookOpen, FiMessageSquare } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const IntercomIcon = ({ color = "#000000", size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className="rounded-md"
    style={{ backgroundColor: color, borderRadius: "8px", padding: "4px" }}
  >
    <rect width="32" height="32" rx="6" fill={color} />
    <path
      fill="white"
      d="M10 10h2v8h-2zM14 10h2v8h-2zM18 10h2v8h-2zM22 10h2v8h-2z"
    />
    <path fill="white" d="M8 20c4 4 12 4 16 0l1 1c-5 5-13 5-18 0z" />
  </svg>
);

export default function AICopilot() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [finalVisible, setFinalVisible] = useState(false);
  const [finalText, setFinalText] = useState("");

  const [sourceStatus, setSourceStatus] = useState(""); // new
  const [visibleBullets, setVisibleBullets] = useState(0); // for staggered bullet points

  const fullAnswer = `To help you with your refund request, I’ll need your order ID and proof of purchase. Refunds are only available for items bought within the last 60 days and must meet our return condition policy.

Once I verify these details, I’ll send you a return QR code. Just post the item back using that, and your refund will be issued automatically.`;

  useEffect(() => {
    if (started) {
      setStep(0); // Ensure step 0 is triggered when started becomes true
    }
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const timers = [];

    if (step === 0) {
      setSourceStatus("Searching for relevant sources...");
      timers.push(setTimeout(() => setStep(1), 500)); // after 0.5s
    }

    if (step === 1) {
      setSourceStatus("Researching sources I found...");
      timers.push(setTimeout(() => setStep(2), 1000)); // after 1s
    }

    if (step === 2) {
      // Wait a bit before going to step 3, hide the sourceStatus first
      timers.push(
        setTimeout(() => {
          setSourceStatus("");
          setStep(3);
        }, 300)
      ); // short delay to hide the status smoothly
    }

    if (step === 3) {
      // Show bullets one-by-one
      [1, 2, 3].forEach((i) => {
        timers.push(setTimeout(() => setVisibleBullets(i), i * 500));
      });
      timers.push(setTimeout(() => setStep(4), 2000));
    }

    if (step === 4) {
      timers.push(
        setTimeout(() => {
          setFinalVisible(true);
          typeWriterEffect();
        }, 1500)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [step, started]);

  const typeWriterEffect = () => {
    let index = 0;
    const interval = setInterval(() => {
      setFinalText(fullAnswer.slice(0, index + 1));
      index++;
      if (index >= fullAnswer.length) clearInterval(interval);
    }, 25);
  };

  return (
    <div className="w-1/4 min-w-[400px] h-full flex flex-col border-l bg-gradient-to-t from-[#fdf4f5] via-[#f8f9fb] to-white text-sm font-sans relative">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b px-4 pt-4">
        <div className="flex gap-4">
          <button className="text-sm font-medium border-b-2 border-blue-600 text-blue-600 pb-1">
            <span className="flex items-center gap-1">
              <IntercomIcon color="#2563eb" size={16} />
              AI Copilot
            </span>
          </button>
          <button className="text-gray-500 pb-1">Details</button>
        </div>
        <button className="text-gray-500 text-lg font-bold">⧉</button>
      </div>

      {/* Chatbox */}
      <div className="flex-1 overflow-y-auto px-4 py-4 relative">
        {/* Welcome screen centered */}
        {!started && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2">
              <IntercomIcon size={32} />
              <p className="text-md font-semibold">Hi, I’m Fin AI Copilot</p>
              <p className="text-sm text-gray-500">
                Ask me anything about this conversation.
              </p>
            </div>
            <div className="absolute bottom-4 left-4">
              <button
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-xl inline-flex items-center gap-1 shadow-sm"
                onClick={() => {
                  setStarted(true);
                  setStep(0);
                }}
              >
                <span className="font-bold">Suggested:</span>💸 How do I get a
                refund?
              </button>
            </div>
          </>
        )}

        {/* Chat steps */}
        {started && (
          <div className="flex flex-col gap-4">
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-2"
              >
                <div
                  className="w-6 h-6 bg-cover rounded-full"
                  style={{
                    backgroundImage: `url(https://i.pravatar.cc/150?img=3)`,
                  }}
                />
                <div>
                  <p className="font-semibold">You</p>
                  <p>How do I get a refund?</p>
                </div>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6">
                    <IntercomIcon color="#000000" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold">Fin</p>
                    {sourceStatus && (
                      <p className="text-xs text-gray-600">{sourceStatus}</p>
                    )}

                    {step >= 4 && (
                      <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{
                          opacity: finalVisible ? 1 : [0.5, 1, 0.5, 1],
                        }}
                        transition={{
                          duration: finalVisible ? 0.3 : 1.5,
                          repeat: finalVisible ? 0 : 1,
                        }}
                        className="rounded-xl px-4 py-2 mt-2 text-sm bg-gradient-to-r from-purple-100 to-purple-200"
                      >
                        {finalVisible && (
                          <p className="text-sm font-regular text-gray-800">
                            {finalText}
                            {finalText === fullAnswer && (
                              <span className="ml-1 w-4 h-4 inline-flex items-center justify-center text-white text-xs bg-blue-900 rounded-full">
                                1
                              </span>
                            )}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {step >= 3 && (
                      <ul className="mt-2 space-y-1 text-xs">
                        {[
                          [
                            "Getting a refund",
                            <FiBookOpen size={14} color="#7c3aed" />,
                          ],
                          [
                            "Refund for an order placed by mistake",
                            <FiMessageSquare size={14} color="#3b82f6" />,
                          ],
                          [
                            "Refund for an unwanted gift",
                            <FiMessageSquare size={14} color="#3b82f6" />,
                          ],
                        ]
                          .slice(0, visibleBullets)
                          .map(([text, icon], i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-2"
                            >
                              <span className="w-5 h-5 flex items-center justify-center rounded-md bg-gray-200">
                                {icon}
                              </span>
                              <span>{text}</span>
                            </motion.li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="px-4 pb-4">
        <div className="flex items-center border rounded-full px-3 py-2 bg-white shadow-sm">
          <input
            type="text"
            placeholder="Ask a question..."
            className="flex-1 outline-none text-sm bg-transparent"
          />
          <FiSend className="text-gray-500" size={16} />
        </div>
      </div>
    </div>
  );
}
