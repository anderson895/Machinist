import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm, router } from "@inertiajs/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function OrderOfferForm({ offer, className = "" }) {
    const [orderingOffer, setOrderingOffer] = useState(false);

    const orderOffer = () => {
        setOrderingOffer(true);
    };

    const orderSubmit = (e) => {
        e.preventDefault();

        router.post(
            "/order-offer",
            { id: offer.id },
            {
                onSuccess: () => {
                    setOrderingOffer(false);
                    toast.success("Offer ordered successfully!");
                },
                onError: () => {
                    toast.error("Something went wrong. Please try again.");
                },
            }
        );
    };

    const closeModal = () => {
        setOrderingOffer(false);
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

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3">Place Order</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
