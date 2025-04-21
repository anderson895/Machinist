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
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import DangerButton from "@/Components/DangerButton";

export default function UpdateInquiryForm({ inquiry }) {
    const [existingFiles, setExistingFiles] = useState(inquiry.files || []);

    const [updatingInquiry, setUpdatingInquiry] = useState(false);

    const updateInquiry = () => {
        setUpdatingInquiry(true);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        id: inquiry.id,
        description: inquiry.description,
        delivery_time: inquiry.delivery_time,
        mop: inquiry.mop,
        mod: inquiry.mod,
        files: [],
        deletedFiles: [],
    });

    useEffect(() => {
        if (updatingInquiry) {
            setData({
                id: inquiry.id,
                description: inquiry.description,
                delivery_time: inquiry.delivery_time,
                mop: inquiry.mop,
                mod: inquiry.mod,
                files: [],
                deletedFiles: [],
            });

            setExistingFiles(inquiry.files || []);
        }
    }, [updatingInquiry]);

    const onUpdateInquiry = (e) => {
        e.preventDefault();

        post("/update-inquiry", {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setUpdatingInquiry(false);
                toast.success("Inquiry updated!");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again.");
            },
        });
    };

    const deleteFile = (file) => {
        setData("deletedFiles", [...data.deletedFiles, file.id]);
        setExistingFiles(existingFiles.filter((f) => f.id !== file.id));
    };

    const closeModal = () => {
        setUpdatingInquiry(false);
    };

    return (
        <>
            <SecondaryButton onClick={updateInquiry}>Update</SecondaryButton>

            <Modal show={updatingInquiry}>
                <form
                    onSubmit={onUpdateInquiry}
                    encType="multipart/form-data"
                    className="p-6"
                >
                    <h2 className="text-lg font-medium text-gray-900">
                        Update Inquiry
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update your inquiry details and attachments.
                    </p>

                    <div>
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />

                            <TextAreaInput
                                id="description"
                                name="description"
                                className="mt-1 block w-full"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="description"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.description}
                            />
                        </div>

                        <div className="mt-5">
                            <InputLabel
                                htmlFor="delivery_time"
                                value="Delivery Date"
                            />

                            <DateTimeInput
                                id="delivery_time"
                                name="delivery_time"
                                className="mt-1 block w-full"
                                value={data.delivery_time}
                                onChange={(e) =>
                                    setData("delivery_time", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="delivery_time"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.delivery_time}
                            />
                        </div>

                        <div className="mt-5">
                            <InputLabel htmlFor="mop" value="Mode Of Payment" />

                            <SelectInput
                                id="mop"
                                name="mop"
                                value={data.mop}
                                onChange={(e) => setData("mop", e.target.value)}
                                options={[
                                    { value: "", label: "" },
                                    { value: "COD", label: "COD" },
                                    {
                                        value: "ONLINE PAYMENT",
                                        label: "ONLINE PAYMENT",
                                    },
                                ]}
                                required
                            />

                            <InputError className="mt-2" message={errors.mop} />
                        </div>

                        <div className="mt-5">
                            <InputLabel
                                htmlFor="mod"
                                value="Mode Of Delivery"
                            />

                            <SelectInput
                                id="mod"
                                name="mod"
                                value={data.mod}
                                onChange={(e) => setData("mod", e.target.value)}
                                options={[
                                    { value: "", label: "" },
                                    { value: "Pick Up", label: "Pick Up" },
                                    {
                                        value: "Deliver",
                                        label: "Deliver",
                                    },
                                ]}
                                required
                            />

                            <InputError className="mt-2" message={errors.mod} />
                        </div>

                        {existingFiles.length > 0 && (
                            <div className="mt-5">
                                <InputLabel value="Attached Files" />

                                {existingFiles.map((file) => (
                                    <div
                                        key={`file-${file.id}`}
                                        className="flex items-center gap-3"
                                    >
                                        <a
                                            href={`/uploads/${file.file_name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="m-0 mb-1 text-sm inline-block text-blue-600 hover:underline"
                                        >
                                            {file.file_name}
                                        </a>
                                        <DangerButton
                                            type="button"
                                            className="text-[10px] px-0.5 py-1 h-[10px]"
                                            onClick={() => deleteFile(file)}
                                        >
                                            Delete
                                        </DangerButton>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-5">
                            <InputLabel htmlFor="files" value="Upload files" />

                            <FileInput
                                id="files"
                                name="files"
                                accept="image/png, image/jpeg, application/pdf"
                                multiple
                                onChange={(e) =>
                                    setData("files", [...e.target.files])
                                }
                            />

                            {Object.entries(errors)
                                .filter(([key]) => key.startsWith("files."))
                                .map(([key, error]) => (
                                    <InputError
                                        key={key}
                                        className="mt-2"
                                        message={error}
                                    />
                                ))}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
