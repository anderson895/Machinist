import SecondaryButton from "@/Components/SecondaryButton";

import PostOfferForm from "./PostOfferForm";
import OffersComponent from "./OffersComponent";
import UpdateInquiryForm from "./UpdateInquiryForm";

import { usePage, Link } from "@inertiajs/react";

export default function InquiryComponent({ inquiry, userList }) {
    const user = usePage().props.auth.user;

    const myThread = inquiry.offer_threads.find(
        (thread) => thread.user_id === user.id
    );

    const groupFilesByLabel = (files) => {
        return files.reduce((acc, file) => {
            if (!acc[file.label]) {
                acc[file.label] = [];
            }
            acc[file.label].push(file);
            return acc;
        }, {});
    };

    return (
        <>
            <div
                key={"inquiries-" + inquiry.id}
                className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
            >
                <div className="flex flex-col md:flex-row gap-6 p-6 text-gray-900">
                    <div className="w-full md:w-[50%]">
                        <div>
                            <div className="text-lg font-bold">
                                {inquiry.user.name}
                                {inquiry.user.role == "manufacturer" && (
                                    <span className="ml-1">
                                        -
                                        <span className="ml-1 text-sm">
                                            {inquiry.user.contact_person}
                                        </span>
                                    </span>
                                )}
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(inquiry.created_at).toLocaleString()}
                            </div>
                        </div>

                        <div className="mt-5 text-sm">
                            {inquiry.description}
                        </div>

                        <div className="mt-5">
                            <div className="text-xs color-green-100">
                                Targer Price: {inquiry.price}
                            </div>
                            <div className="text-xs color-green-100">
                                Targer Quantity: {inquiry.qty}
                            </div>
                            <div className="text-xs color-green-100">
                                Delivery Date:{" "}
                                {new Date(
                                    inquiry.delivery_time
                                ).toLocaleString()}
                            </div>
                            <div className="text-xs color-green-100">
                                Delivery Type : {inquiry.mod}
                            </div>
                            <div className="text-xs color-green-100">
                                Payment: {inquiry.mop}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[40%]">
                        <div className="text-sm mb-2">Attached Files:</div>

                        {Object.entries(groupFilesByLabel(inquiry.files)).map(
                            ([label, files]) => (
                                <div key={label} className="mb-3">
                                    <div className="text-xs font-bold m-0">
                                        {label.toUpperCase()}:
                                    </div>
                                    <ul>
                                        {files.map((file) => (
                                            <div key={`file-${file.id}`}>
                                                <a
                                                    href={`/uploads/${file.file_name}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="m-0 mb-1 text-xs inline-block text-blue-600 hover:underline"
                                                >
                                                    {file.file_name}
                                                </a>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="p-6 text-gray-900 flex gap-1">
                    <div className="flex gap-1">
                        {user.role === "manufacturer" &&
                            user.id !== inquiry.user.id &&
                            !myThread && <PostOfferForm inquiry={inquiry} />}

                        {user.role === "manufacturer" && myThread && (
                            <Link
                                href={route("offer-thread", {
                                    threadId: myThread.id,
                                })}
                            >
                                <SecondaryButton>View My Offer</SecondaryButton>
                            </Link>
                        )}

                        {(user.role === "admin" ||
                            user.id === inquiry.user.id) && (
                            <OffersComponent inquiry={inquiry} />
                        )}

                        {user.role != "admin" && user.id == inquiry.user.id && (
                            <>
                                <UpdateInquiryForm
                                    inquiry={inquiry}
                                    userList={userList}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
