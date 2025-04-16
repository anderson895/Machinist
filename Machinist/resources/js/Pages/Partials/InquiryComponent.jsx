import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import DateTimeInput from "@/Components/DateTimeInput";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import FileInput from "@/Components/FileInput";

import { useForm, router } from "@inertiajs/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function InquiryComponent({ inquiry }) {
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

                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
}
