import { useEffect, useState, useRef } from "react";
import { FiSend, FiBookOpen, FiMessageSquare, FiEdit } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import TooltipDialog from "./TooltipDialog";
import { HiOutlineBookOpen } from "react-icons/hi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const IntercomIcon = ({ color = "#000000", size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className="rounded-md"
    style={{ backgroundColor: color, borderRadius: "6px" }}
  >
    <rect width="32" height="32" rx="6" fill={color} />
    <g transform="scale(1.2) translate(-2.7, -2.7)">
      <path
        fill="white"
        d="M10 10h2v8h-2zM14 10h2v8h-2zM18 10h2v8h-2zM22 10h2v8h-2z"
      />
      <path fill="white" d="M8 20c4 4 12 4 16 0l1 1c-5 5-13 5-18 0z" />
    </g>
  </svg>
);

export default function AICopilot({ setInput }) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [finalVisible, setFinalVisible] = useState(false);
  const [finalText, setFinalText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [sourceStatus, setSourceStatus] = useState("");
  const [visibleBullets, setVisibleBullets] = useState(0);
  const tooltipRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const fullAnswer = `To help you with your refund request, I’ll need your order ID and proof of purchase. Refunds are only available for items bought within the last 60 days and must meet our return condition policy.

Once I verify these details, I’ll send you a return QR code. Just post the item back using that, and your refund will be issued automatically.`;

  useEffect(() => {
    if (started) setStep(0);
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timers = [];

    if (step === 0) {
      setSourceStatus("Searching for relevant sources...");
      timers.push(setTimeout(() => setStep(1), 500));
    }
    if (step === 1) {
      setSourceStatus("Researching sources I found...");
      timers.push(setTimeout(() => setStep(2), 1000));
    }
    if (step === 2) {
      timers.push(
        setTimeout(() => {
          setSourceStatus("");
          setStep(3);
        }, 300)
      );
    }
    if (step === 3) {
      [1, 2, 3].forEach((i) =>
        timers.push(setTimeout(() => setVisibleBullets(i), i * 500))
      );
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
    }, 10);
  };

  return (
<div className="w-full sm:w-1/2 lg:w-1/4 min-w-[300px] h-[30vh] sm:h-full flex flex-col border-l bg-gradient-to-t from-[#fdf4f5] via-[#f8f9fb] to-white text-sm relative">      <div className="flex items-center justify-between border-b px-4 pt-4">
        <div className="flex gap-4">
          <button className="text-sm font-medium border-b-2 border-blue-600 text-blue-600 pb-1">
            <span className="flex items-center gap-1">
              <IntercomIcon color="#2563eb" size={16} />
              AI Copilot
            </span>
          </button>
          <button className="text-gray-500 pb-1">Details</button>
        </div>
        <button className="text-black text-lg font-bold">
          <MdOutlineSpaceDashboard className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 relative">
        {!started && (
          <>
            <div className="absolute hidden md:block inset-0 flex flex-col items-center justify-center text-center gap-2">
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
                        initial={{ opacity: 0.5, height: 120 }}
                        animate={{
                          opacity: finalVisible ? 1 : [0.5, 1, 0.5, 1],
                          height: finalVisible ? "auto" : 120,
                        }}
                        transition={{
                          duration: finalVisible ? 0.3 : 1.5,
                          repeat: finalVisible ? 0 : 1,
                        }}
                        className="rounded-xl px-4 py-2 mt-2 text-sm bg-gradient-to-r from-purple-100 to-purple-200 overflow-hidden w-full"
                      >
                        {finalVisible ? (
                          <div className="text-sm relative font-semibold text-gray-800 w-full">
                            <span>{finalText}</span>
                            {finalText === fullAnswer && (
                              <div
                                ref={tooltipRef}
                                className="relative inline-block ml-1 w-4 h-4"
                                onMouseEnter={() => {
                                  const rect =
                                    tooltipRef.current?.getBoundingClientRect();
                                  if (rect) {
                                    setTooltipPos({
                                      top: rect.top + rect.height / 2,
                                      left: rect.left,
                                    });
                                  }
                                  setShowTooltip(true);
                                }}
                                onMouseLeave={() => setShowTooltip(false)}
                              >
                                <span className="w-4 h-4 inline-flex items-center justify-center text-white text-xs bg-blue-900 rounded-full">
                                  1
                                </span>
                                {showTooltip && (
                                  <div
                                    className="fixed z-[9999] w-72 rounded-xl shadow-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 space-y-3"
                                    style={{
                                      top: `${tooltipPos.top}px`,
                                      left: `${Math.max(
                                        tooltipPos.left - 280,
                                        8
                                      )}px`,
                                      transform: "translateY(-50%)",
                                    }}
                                  >
                                    <div className="text-base font-semibold">
                                      Getting a refund
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                      <HiOutlineBookOpen className="w-4 h-4" />
                                      <span>Public article</span> •{" "}
                                      <span>Amy Adams</span> •{" "}
                                      <span>1d ago</span>
                                    </div>
                                    <div className="text-sm border-l-2 border-gray-200 pl-3 text-gray-700 leading-snug">
                                      We understand that sometimes a purchase
                                      may not meet your expectations, and you
                                      may need to request a refund. This guide
                                      outlines the simple steps to help you
                                      navigate the refund process and ensure a
                                      smooth resolution to your concern.
                                    </div>
                                    <button
                                      onClick={() => setInput?.(finalText)}
                                      className="w-full mt-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-1.5 text-sm font-medium hover:bg-gray-50"
                                    >
                                      <FiEdit className="w-4 h-4" />
                                      Add to composer
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            {finalText === fullAnswer && (
                              <button
                                onClick={() => setInput?.(finalText)}
                                className="w-full mt-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-1.5 text-sm font-medium hover:bg-gray-50"
                              >
                                <FiEdit className="w-4 h-4" />
                                Add to composer
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <motion.div
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-gray-800 text-sm w-full text-center"
                            >
                              Generating response...
                            </motion.div>
                          </div>
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
