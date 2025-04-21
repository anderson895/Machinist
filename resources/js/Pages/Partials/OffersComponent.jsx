import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

import { useForm, router, usePage, Link } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function OffersComponent({ inquiry }) {
    const [viewingOffer, setViewingOffer] = useState(false);

    const offerTreads = inquiry.offer_threads ?? [];

    const viewOffer = () => {
        setViewingOffer(true);
    };

    const closeModal = () => {
        setViewingOffer(false);
    };

    return (
        <>
            <SecondaryButton onClick={viewOffer}>View Offers</SecondaryButton>

            <Modal show={viewingOffer}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Offers
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Click to view this offer and see all the details,
                        including pricing and delivery options.
                    </p>

                    <div className="mt-5">
                        {(offerTreads == null || offerTreads.length === 0) && (
                            <div className="text-gray-500">
                                No available offer.
                            </div>
                        )}

                        {offerTreads.map((offerThread) => (
                            <Link
                                href={route("offer-thread", {
                                    threadId: offerThread.id,
                                })}
                                key={`offer-thread-${offerThread.id}`}
                            >
                                <div className="bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                                    <div className="text-sm font-bold">
                                        {offerThread.user.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {new Date(
                                            offerThread.created_at
                                        ).toLocaleString()}
                                    </div>
                                    <div className="text-sm my-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                        {offerThread.offers[0].description}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Close
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
