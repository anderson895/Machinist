import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import PostOfferForm from "./Partials/PostOfferForm";
import OfferComponent from "./Partials/OfferComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PostInquiryForm from "./Partials/PostInquiryForm";
import InquiryComponent from "./Partials/InquiryComponent";
import { useState } from "react";

export default function OfferThread() {
    const user = usePage().props.auth.user;

    const thread = usePage().props.thread;

    const inquiry = thread.inquiry;
    const offers = thread.offers;

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
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Offer Thread
                </h2>
            }
        >
            <Head title="Offer Thread" />

            <div className="pb-5">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div
                        key={"inquiry-" + inquiry.id}
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg mt-7"
                    >
                        <div className="flex flex-col md:flex-row gap-6 p-6 text-gray-900">
                            <div className="w-full md:w-[50%]">
                                <div>
                                    <div className="text-sm font-bold">
                                        {inquiry.user.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {new Date(
                                            inquiry.created_at
                                        ).toLocaleString()}
                                    </div>
                                </div>

                                <div className="mt-5 text-xs">
                                    {inquiry.description}
                                </div>

                                <div className="mt-5">
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
                                <div className="text-sm mb-2">
                                    Attached Files:
                                </div>

                                {Object.entries(
                                    groupFilesByLabel(inquiry.files)
                                ).map(([label, files]) => (
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
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h1 className="text-xl font-bold text-center mb-3 mt-10">
                            Offers
                        </h1>

                        {offers.map((offer) => (
                            <div
                                key={`offer-${offer.id}-component`}
                                className="mt-3"
                            >
                                <OfferComponent
                                    offer={offer}
                                    offeredByUser={
                                        offer.is_inquirer == true
                                            ? inquiry.user
                                            : thread.user
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {user.role !== "admin" &&
                        thread?.user &&
                        inquiry.user &&
                        (user.id === thread.user.id ||
                            user.id === inquiry.user.id) && (
                            <div className="mt-5 text-end">
                                <PostOfferForm
                                    inquiry={inquiry}
                                    threadId={thread.id}
                                />
                            </div>
                        )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
