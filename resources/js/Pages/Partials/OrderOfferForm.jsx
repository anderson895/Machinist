import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";

import { useForm } from "@inertiajs/react";

import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderOfferForm({ offer }) {
    const [orderingOffer, setOrderingOffer] = useState(false);

    const orderOffer = () => {
        setOrderingOffer(true);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        id: offer.id,
        purchase_order: null,
    });

    const orderSubmit = (e) => {
        e.preventDefault();

        post("/order-offer", {
            forceFormData: true,
            onSuccess: () => {
                setOrderingOffer(false);
                toast.success("Offer ordered successfully!");
                reset();
            },
            onError: () => {
                toast.error("Something went wrong. Please try again.");
            },
        });
    };

    const closeModal = () => {
        setOrderingOffer(false);
        reset();
    };

    return (
        <>
            <PrimaryButton onClick={orderOffer}>Order</PrimaryButton>

            <Modal show={orderingOffer}>
                <form onSubmit={orderSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to order this offer?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        You're about to place an order based on the selected
                        offer. This action will finalize your request and
                        trigger any associated processing or fulfillment steps.
                        Please make sure the offer details are correct before
                        continuing.
                    </p>

                    <div className="mt-5">
                        <InputLabel
                            htmlFor="purchase_order"
                            value="Upload Purchase Order"
                        />

                        <FileInput
                            id="purchase_order"
                            name="purchase_order"
                            accept="application/pdf"
                            onChange={(e) =>
                                setData("purchase_order", e.target.files[0])
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.purchase_order}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            {processing ? "Placing..." : "Place Order"}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
