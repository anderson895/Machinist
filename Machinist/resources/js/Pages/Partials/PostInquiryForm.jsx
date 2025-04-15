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

export default function PostInquiryForm({ user }) {
    const [postingInquiry, setPostingInquiry] = useState(false);

    const postInquiry = () => {
        setPostingInquiry(true);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        description: "",
        delivery_time: "",
        mop: "",
        mod: "",
        files: [],
    });

    const onPostInquiry = (e) => {
        e.preventDefault();

        post("/post-inquiry", {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setPostingInquiry(false);
                toast.success("Inquiry posted!");
                reset();
            },
            onError: () => {
                toast.error("Something went wrong. Please try again.");
            },
        });
    };

    const closeModal = () => {
        setPostingInquiry(false);
    };

    return (
        <>
            <PrimaryButton onClick={postInquiry}>Post Inquiry</PrimaryButton>

            <Modal show={postingInquiry}>
                <form
                    onSubmit={onPostInquiry}
                    encType="multipart/form-data"
                    className="p-6"
                >
                    <h2 className="text-lg font-medium text-gray-900">
                        Post Inquiry
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Submit your inquiry along with any relevant details and
                        attachments.
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

                        <div className="mt-5">
                            <InputLabel htmlFor="files" value="Upload files" />

                            <FileInput
                                id="files"
                                name="files"
                                accept="image/png, image/jpeg, application/pdf"
                                multiple
                                onChange={(e) =>
                                    setData("files", e.target.files)
                                }
                                required
                            />

                            <InputError
                                className="mt-2"
                                message={errors.files}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3">Post</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
