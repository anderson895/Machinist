import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";

import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

import { IoMdSend } from "react-icons/io";

import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

import { useState, useEffect, useRef } from "react";

import toast from "react-hot-toast";

export default function ViewMessage() {
    var props = usePage().props;

    var user = props.auth.user;
    var chatMate = props.chatMate;
    var messages = props.messages;

    const [sendingMessage, setSendingMessage] = useState(false);
    const messagesEndRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        receiver_id: chatMate.id,
        content: "",
    });

    const onSentMessage = (e) => {
        e.preventDefault();

        if (!data.content) {
            toast.error("please write message before sending.");
            return;
        }

        setSendingMessage(true);

        post("/send-message", {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setSendingMessage(false);
                setData("content", "");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again.");
                setSendingMessage(false);
                setData("content", "");
            },
        });
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {chatMate.name}
                </h2>
            }
        >
            <Head title="Message" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white h-[70vh] flex flex-col">
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
                            {messages.map((message) => (
                                <div
                                    key={`message-${message.id}`}
                                    className={`p-2 rounded-md max-w-xs ${
                                        message.sender_id === user.id
                                            ? "bg-blue-400 text-white self-end ml-auto"
                                            : "bg-gray-200 text-black self-start mr-auto"
                                    }`}
                                >
                                    {message.content}
                                </div>
                            ))}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t p-5 bg-white">
                            <form onSubmit={onSentMessage}>
                                <div className="flex items-center gap-2">
                                    <TextInput
                                        className="w-full"
                                        value={data.content}
                                        onChange={(e) =>
                                            setData("content", e.target.value)
                                        }
                                        placeholder="Type your message..."
                                    />
                                    <PrimaryButton
                                        disabled={sendingMessage || processing}
                                    >
                                        <IoMdSend className="text-xl" />
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
