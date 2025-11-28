import { Chat, Close, Send } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Paper, TextField, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useMutationGenerateChatboxMessage } from "~/services/chatbox/hooks/mutation";
import { Message, SenderMessage } from "./types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatBox: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState("");
    const { mutateAsync: generateChatboxMessage, isPending: isLoading } = useMutationGenerateChatboxMessage();

    const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

    // ✅ Scroll to bottom whenever messages change
    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user's message
        const newUserMessage: Message = { sender: SenderMessage.USER, text: input.trim() };
        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");

        setMessages((prev) => [...prev, { sender: SenderMessage.AI, text: "__loading__" }]);

        try {
            const responseMessage = await generateChatboxMessage(input.trim());

            setMessages((prev) =>
                prev.map((msg, idx) =>
                    idx === prev.length - 1 ? { sender: SenderMessage.AI, text: responseMessage } : msg,
                ),
            );
        } catch {
            // Replace with an error bubble
            setMessages((prev) =>
                prev.map((msg, idx) =>
                    idx === prev.length - 1 ? { sender: SenderMessage.AI, text: "Something went wrong." } : msg,
                ),
            );
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Chat Button */}
            {!isOpen && (
                <IconButton
                    color="primary"
                    onClick={() => setIsOpen(true)}
                    className="text-white shadow-lg"
                    sx={{
                        bgcolor: "primary.main",
                    }}
                    size="large"
                >
                    <Chat />
                </IconButton>
            )}

            {/* Chatbox Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Paper elevation={6} className="flex h-96 w-96 flex-col overflow-hidden rounded-2xl">
                            {/* Header */}
                            <Box
                                className="flex items-center justify-between px-4 py-2 text-white"
                                sx={{
                                    bgcolor: "primary.main",
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Chat Support
                                </Typography>
                                <IconButton size="small" onClick={() => setIsOpen(false)} className="text-white">
                                    <Close />
                                </IconButton>
                            </Box>

                            <Divider />

                            {/* Messages */}
                            <Box className="flex-1 space-y-2 overflow-y-auto bg-gray-50 p-3">
                                {messages.length === 0 ? (
                                    <Typography variant="body2" className="mt-10 text-center text-gray-500">
                                        No messages yet. Start chatting!
                                    </Typography>
                                ) : (
                                    messages.map((msg, idx) => (
                                        <Box
                                            key={idx}
                                            className={`flex ${
                                                msg.sender === SenderMessage.USER ? "justify-end" : "justify-start"
                                            }`}
                                        >
                                            <Box
                                                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                                                    msg.sender === SenderMessage.USER
                                                        ? "self-end text-white"
                                                        : "self-start text-gray-800"
                                                }`}
                                                sx={{
                                                    bgcolor:
                                                        msg.sender == SenderMessage.USER
                                                            ? "primary.main"
                                                            : (theme: any) => theme.palette.grey[200],
                                                }}
                                            >
                                                {msg.text === "__loading__" ? (
                                                    <div className="flex space-x-1">
                                                        <span className="dot dot1" />
                                                        <span className="dot dot2" />
                                                        <span className="dot dot3" />
                                                    </div>
                                                ) : (
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                )}
                                            </Box>
                                            <div ref={messagesEndRef} />
                                        </Box>
                                    ))
                                )}
                            </Box>

                            <Divider />

                            {/* Input */}
                            <Box className="flex items-center bg-white p-2">
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Type a message..."
                                    fullWidth
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSend}
                                    startIcon={<Send />}
                                    className="ml-2"
                                    disabled={isLoading}
                                >
                                    Send
                                </Button>
                            </Box>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>
                {`
                    .dot {
                        width: 8px;
                        height: 8px;
                        background-color: #9ca3af; /* gray-400 */
                        border-radius: 50%;
                        display: inline-block;
                        animation: bounce 1.4s infinite ease-in-out both;
                    }
                    .dot1 {
                        animation-delay: -0.32s;
                    }
                    .dot2 {
                        animation-delay: -0.16s;
                    }
                    @keyframes bounce {
                        0%, 80%, 100% {
                        transform: scale(0);
                        }
                        40% {
                        transform: scale(1);
                        }
                    }
                    `}
            </style>
        </div>
    );
};

export default ChatBox;
