import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import FileInput from "@/Components/FileInput";

import { useForm } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProofOfDeliveryUpload({ order_id }) {
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: order_id,
        proof_of_delivery: null,
    });

    const openModal = () => {
        setUploading(true);
    };

    const closeModal = () => {
        setUploading(false);
        reset();
        setSelectedFile(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setData("proof_of_delivery", file);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!data.proof_of_delivery) {
            toast.error("Please select an image first");
            return;
        }

        post("/upload-pod", {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                closeModal();
                toast.success("Proof Uploaded Successfully!");
            },
            onError: () => {
                toast.error("Upload failed. Please try again.");
            },
        });
    };

    return (
        <>
            <PrimaryButton onClick={openModal}>
                Upload Proof of Delivery
            </PrimaryButton>

            <Modal show={uploading} onClose={closeModal}>
                <form onSubmit={onSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Upload Proof of Delivery
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Please upload a clear image of proof of delivery.
                    </p>

                    <div className="mt-5">
                        <InputLabel
                            htmlFor="proof_of_delivery"
                            value="Proof of Delivery/Pick Up (Image)"
                        />

                        <FileInput
                            id="proof_of_delivery"
                            name="proof_of_delivery"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileChange}
                            required
                        />

                        {selectedFile && (
                            <div className="mt-2 text-sm text-gray-600">
                                Selected file: {selectedFile.name}
                            </div>
                        )}

                        <InputError
                            className="mt-2"
                            message={errors.proof_of_delivery}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton
                            type="button"
                            onClick={closeModal}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton
                            className="ms-3"
                            disabled={processing || !selectedFile}
                        >
                            {processing ? "Uploading..." : "Upload"}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
