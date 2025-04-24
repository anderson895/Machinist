import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import DateTimeInput from "@/Components/DateTimeInput";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import FileInput from "@/Components/FileInput";
import TextInput from "@/Components/TextInput";

import { useForm } from "@inertiajs/react";

import { useState } from "react";

import toast from "react-hot-toast";

export default function PostOfferForm({ inquiry, threadId }) {
    const [postingOffer, setPostingOffer] = useState(false);

    const postOffer = () => {
        setPostingOffer(true);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        thread_id: threadId,
        inquiry_id: inquiry.id,
        description: "",
        price: 0,
        delivery_time: "",
        mop: "",
        mod: "",
        files: [],
    });

    const onPostOffer = (e) => {
        e.preventDefault();

        post("/post-offer", {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setPostingOffer(false);
                toast.success("Offer posted!");
                reset();
            },
            onError: () => {
                toast.error("Something went wrong. Please try again.");
            },
        });
    };

    const closeModal = () => {
        setPostingOffer(false);
    };

    return (
        <>
            <PrimaryButton onClick={postOffer}>Offer</PrimaryButton>

            <Modal show={postingOffer}>
                <form
                    onSubmit={onPostOffer}
                    encType="multipart/form-data"
                    className="p-6"
                >
                    <h2 className="text-lg font-medium text-gray-900">
                        Post an Offer
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Submit your offer along with any relevant details and
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
                            <InputLabel htmlFor="price" value="Price" />

                            <TextInput
                                id="price"
                                name="price"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="price"
                                type="number"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.price}
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
                            Post
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
