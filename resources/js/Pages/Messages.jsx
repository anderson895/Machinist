import { FaArrowRight } from "react-icons/fa";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";

export default function Messages() {
    var props = usePage().props;
    var messages = props.messages;

    console.log(props);
    console.log(messages);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Messages
                </h2>
            }
        >
            <Head title="Messages" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {messages.map((message) => (
                        <Link
                            key={`message-${message.user.id}`}
                            href={route("view-message", {
                                id: message.user.id,
                            })}
                        >
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-sm p-3 mt-1 cursor-pointer">
                                <div className="flex justify-between text-xs">
                                    <span>{message.user.name}</span>
                                    <span>
                                        {new Date(
                                            message.messages[
                                                message.messages.length - 1
                                            ]?.created_at
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <div className="text-sm flex justify-between items-center mt-3">
                                    <span>
                                        {
                                            message.messages[
                                                message.messages.length - 1
                                            ]?.content
                                        }
                                    </span>
                                    <span className="ml-1 text-green-600">
                                        <FaArrowRight />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
